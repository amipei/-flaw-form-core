import AbstractControl, { AbstractControlOptions, FORM_STATUS, TriggerType, UIStatus } from "../shared/AbstractControl";
import { removeListItem } from "../shared/utils";

export interface FormStateBoxedValue<T> {
  value: T
  //TODO：实现状态属性
  status: UIStatus
}

export type FormState<T> = T | FormStateBoxedValue<T> | null;

export interface ValueChangeFn<T> {
  (value: T | null): void
}

class FormControl<T> extends AbstractControl {
  /**
   * 默认值为 null
   */
  value!: T | null;
  /**
  * 存放值改变时的回调函数。
  */
  #onChange: ValueChangeFn<T>[] = [];

  constructor(
    formState: FormState<T> = null,
    opts: AbstractControlOptions = {}
  ) {
    super(opts);
    this._applyFormState(formState);
    // 初始化通知
    this._initNotify(this.getState());
  }
  
  setValue(value: T | null, options: {
    emitModelToViewChange?: boolean
  }): void {
    this.value = value;

    if (this.#onChange.length && options.emitModelToViewChange !== false) {
      this.#onChange.forEach((changeFn) => changeFn(this.value));
    }

    //TODO: 校验
    this.validity();
  }

  enable(options: { emitEvent?: boolean } = {}): void {
    this.status = FORM_STATUS.VALID;
    this.uiStatus = null;
    this.errors = null;

    
    if (this.selfValidate) {
      this.validity(options);
    }
  }

  inactivate(uiStatus: UIStatus, options: { emitEvent?: boolean } = {}): void {
    this.status = FORM_STATUS.INACTIVATED;
    this.uiStatus = uiStatus;
    this.errors = null;

    if (options.emitEvent !== false) {
      this.notify()
    }
  }

  /**
   * 注册值改变时调用的回调函数
   * @param fn 
   * @returns 
   */
  registerOnChange(fn: ValueChangeFn<T>): Function {
    this.#onChange.push(fn);

    return () => {
      this._unregisterOnChange(fn);
    }
  }

  private _unregisterOnChange(fn: ValueChangeFn<T>): void {
    removeListItem(this.#onChange, fn);
  }

  _allControlsInactivated(): boolean {
    return this.inactivated;
  }

  private _applyFormState(formState: FormState<T>): void {
    if (this._isBoxedValue(formState)) {
      this.value = formState.value;
      this.inactivate(formState.status, { emitEvent: false });
    } else {
      this.value = formState;
      this.enable({ emitEvent: false });
    }
  }

  private _isBoxedValue(formState: FormState<T>): formState is FormStateBoxedValue<T> {
    return typeof formState === 'object' && formState !== null &&
      Object.keys(formState).length === 2 && 'value' in formState && 'status' in formState;
  }

  _updateValue(): void { }

  _setInitialStatus(): void { }
}

export default FormControl;