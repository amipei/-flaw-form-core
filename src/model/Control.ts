// value、state：disabled、hidden、preview
// 校验: 同步/异步校验函数

import StateSubject from "../notify";
import { FormStatus, AbstractControl, FORM_STATUS } from "../shared/AbstractControl";
import { FormTrigger, FormState, UIStatus, FormStateBoxedValue, FormOptions } from "../types";
import Validation from "../validator";


type ValidationTrigger = 'change' | 'blur' | 'submit' | 'all';

interface State<T> {
  value: T
  status: FormStatus
  errors: any;
}

interface valueChangelistener<T> {
  (valur: T | null): void
}

class FormControl<T> implements AbstractControl {
  value!: T | null;

  status!: FormStatus;

  errors: any;

  trigger!: FormTrigger;
  validateAll!: boolean;
  selfValidate!: boolean;
  validation: any;
  statusSubject: any;

  stateSubject!: StateSubject<State<T>>;
  currentTrigger: any;

  constructor(formState: FormState<T> = null, opts: any = {}) {
    //申请表单状态
    this._applyFormState(formState);
    //设置校验策略
    this._setStrategy(opts);
    
    //初始化校验
    this._initValidator(opts);
    //初始化通知
    this._initNotify();

    if (this.selfValidate) {
      this.validity();
    }
  }

  /**
   * 值改变订阅器
   */
  valueChangelisteners: valueChangelistener<T>[] = [];
  /**
   * 注册值订阅器
   * @param listener 
   * @returns 
   */
  registerValueChange(listener: valueChangelistener<T>) {
    this.valueChangelisteners.push(listener);

    return () => {
      const index = this.valueChangelisteners.indexOf(listener);
      if (index > -1) {
        this.valueChangelisteners.splice(index, 1);
      }
    }
  }

  /**
   * 设置控件值
   * @param value 
   * @param opts 
   */
  setValue(value: T, opts: {
    emitModelToViewChange?: boolean
    trigger?: any
  } = {}) {
    this.value = value;

    this.currentTrigger = opts?.trigger ?? 'all';

    if (this.valueChangelisteners.length && opts.emitModelToViewChange !== false) {
      this.valueChangelisteners.forEach((listener) => listener(this.value));
    }
    this.validity();
  }
  
  get enabled() {
    return ['VALID', 'INVALID', 'VALIDATING'].includes(this.status);
  }

  getState() {
    return {
      value: this.value,
      errors: this.errors,
      status: this.status
    }
  }

  /**
   * 启用表单控件
   * @param  
   */
  public enable() {
    this.status = FORM_STATUS.VALID;
    this.errors = null;
  }
  /**
   * 使表单控件失活（禁用/只读/隐藏）
   * @param  
   */
  public inactivate(status: UIStatus) {
    this.status = FORM_STATUS[status.toUpperCase() as FormStatus];
    this.errors = null;
  }


  public validity() {
    if (this.enabled) {
      this.status = FORM_STATUS.VALIDATING;

      this.validation.run(this.getState(), {
        subscriber: (errors: any) => {
          this.errors = errors;
          this.status = this.errors ? FORM_STATUS.INVALID : FORM_STATUS.VALID;
          this.notify();
        }
      })
      this.notify();
    }
  }

  notify() {
    const salaStatus = Object.assign({}, {
      value: this.value as T,
      errors: this.errors,
      status: this.status
    })
    this.stateSubject.notify(salaStatus);
  }
  subscribe(subscriber: Function, subscription: any) {
    return this.statusSubject.subscribe(subscriber, subscription)
  }

  private _applyFormState(formState: FormState<T>): void {
    if (this._isBoxedValue(formState)) {
      this.value = formState.value;
      this.inactivate(formState.status);
    } else {
      this.value = formState;
      this.enable();
    }
  }

  private _isBoxedValue(formState: FormState<T>): formState is FormStateBoxedValue<T> {
    return typeof formState === 'object' && formState !== null &&
      Object.keys(formState).length === 2 && 'value' in formState && 'status' in formState;
  }

  private _setStrategy(opts: FormOptions) {
    this.trigger = opts?.trigger ?? 'change';
    this.validateAll = opts?.validateAll ?? false;
    this.selfValidate = opts?.selfValidate ?? false;
  }

  private _initValidator(opts: FormOptions) {
    this.validation = new Validation(opts.validator as any, opts.asyncValidator as any, 'change')
  }

  private _initNotify() {
    this.stateSubject = new StateSubject<State<T>>(['value', 'errors', 'status'], ['errors'])
  }
}

export default FormControl;