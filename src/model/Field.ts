
/******************
 * Field类型声明  *
 *****************/

import StateSubject, { SubscriberFn } from "../shared/StateSubject";
import filterFieldState from "../strategy/filterFieldState";
import { removeListItem, toObservable } from "../strategy/shared";
import ValidatorManage, { asyncValidators, coAsyncValidators, coValidators, validators } from "../verify";

/**
 * 字段的状态类型
 */
enum FieldState {
  VALID = 'VALID',       //表示字段处于校验通过或者还没校验阶段。
  INVALID = 'INVALID',   //表示字段处于校验失败阶段.
  PENDING = 'PENDING',   //表示字段处于异步校验阶段.
  DISABLED = 'DISABLED', //表示字段处于禁用阶段。
  PREVIEW = 'PREVIEW',   //表示字段处于预览阶段。
  HIDDEN = 'HIDDEN'      // 表示字段处于隐藏阶段。
}

const modelInactive = [FieldState.DISABLED, FieldState.HIDDEN, FieldState.PREVIEW]
type InactiveState = Exclude<FieldState, FieldState.VALID | FieldState.PENDING | FieldState.INVALID>;

/**
 * 初始化字段与包装值字段的类型接口
 */
interface FieldStatusBoxedValue<T> {
  value: T
  inactive: InactiveState
};

type FieldStatus<T> = T | FieldStatusBoxedValue<T> | null;

type FieldMode = 'change' | 'blur' | 'submit';

interface FieldOptions {
  updateOn?: FieldMode;
  validateFirst?: boolean;
  initValidate?: boolean;
  validator?: any
  asyncValidators?: any
}

interface ValueChange<T> {
  (value: T | null): void
}

function isOptionsObj(opts: any) {
  return opts != null && !Array.isArray(opts) && typeof opts === 'object';
}



class Field<T> {
  value!: T | null;

  state!: FieldState;

  errors!: any;

  _updateOn!: FieldMode;
  _validateFirst!: boolean;
  _initValidate!: boolean;
  _stateSubject!: StateSubject<any, "value">;
  _asyncValidationSubscription!: any;
  _hasOwnPendingAsyncValidator!: boolean;

  constructor(fieldStatus: FieldStatus<T> = null, opts: FieldOptions) {
    //初始化校验系统
    this._initializeValidate(opts)
    //申请字段状态
    this._applyFieldStatus(fieldStatus);
    //设置策略（更新策略和校验策略）
    this._setUpdateAndVerifyStrategy(opts);
    //初始化通知系统
    this._initNotify();
    //进行校验
    if (this._initValidate) {
      this.validity()
    }
  }
  get enabled () {
    return !modelInactive.includes(this.state);
  }
  validity(opts: any = {}) {
    if (this.enabled) {
      this._cancelExistingSubscription();
      this.errors = this._runValidator();
      this.state = this._calculateStatus();

      if (this.state === FieldState.VALID || this.state === FieldState.PENDING) {
        this._runAsyncValidator();
      }
    }
    if (opts.emitEvent !== false) {
      this._stateSubject.notify(this.safeState);
    }
  }
  private _calculateStatus(): FieldState {
    if(this.errors) return FieldState.INVALID;
    if(this._hasOwnPendingAsyncValidator) return FieldState.PENDING;
    return FieldState.VALID
  }
  private _runValidator(): any {
    return this._composedValidatorFn ? this._composedValidatorFn(this) : null
  }
  private _runAsyncValidator() {
    if(this._composedAsyncValidatorFn) {
      this.state = FieldState.PENDING;
      this._hasOwnPendingAsyncValidator = true;
      const obs = toObservable(this._composedAsyncValidatorFn(this));
      this._asyncValidationSubscription = obs.subscribe((errors: any) => {
        this._hasOwnPendingAsyncValidator = false;

        this.setErrors(errors);
      });
    }
  }
  setErrors(errors: any) {
    this.errors = errors;
    this._stateSubject.notify(this.safeState)
  }
  private _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
      this._hasOwnPendingAsyncValidator = false;
    }
  }
  /**
     *  Sets a new value for the field.
     * @param value The new value for the field
     * @param opts  
     */
  setValue(value: T | null, opts: {
    emitModelToViewChange?: boolean
  } = {}): void {
    this.value = value;
    if (this._valueChange.length && opts.emitModelToViewChange !== false) {
      this._valueChange.forEach(
        (changeFn) => changeFn(this.value));
    }
  }
  /**
 * 存储value改变时，调用的回调，用于 model->view的改变
 */
  _valueChange: ValueChange<T>[] = [];

  registerOnChange(fn: ValueChange<T>) {
    this._valueChange.push(fn);

    return () => {
      this._unregisterOnChange(fn)
    }
  }
  _unregisterOnChange(fn: ValueChange<T>): void {
    removeListItem(this._valueChange, fn);
  }

  /**
   * 启用字段
   */
  enable(_opts: { emitEvent?: boolean } = {}): void {
    this.state = FieldState.VALID;

    //todo启用后通知检查
    if(this._initValidate) {
      this.validity()
    }
  }
  /**
   * 使字段失活
   */
  inactivate(state: InactiveState, opts: { emitEvent?: boolean } = {}): void {
    this.state = state;
    this.errors = null;

    if (opts.emitEvent !== false) {
      //TODO通知
      this._stateSubject.notify(this.safeState);
    }
  }

  subscribe(
    subscriber: SubscriberFn<any>,
    deps: any[],
    onlyOnce: boolean = false
  ) {
    if (!subscriber) {
      throw new Error('No callback given.');
    }
    if (!deps) {
      throw new Error('没有传入依赖?')
    }

    if (onlyOnce) {
      const safeState = this.safeState;
      StateSubject.notifySubscriber<any, any>({
        subscriberFn: subscriber,
        deps,
        notified: false
      }, safeState, safeState, filterFieldState, true)
      return;
    }


    const cancelFn = this._stateSubject.subscribe({
      subscriberFn: subscriber,
      deps,
      notified: false
    })
    const safeState = this.safeState;
    StateSubject.notifySubscriber<any, any>({
      subscriberFn: subscriber,
      deps,
      notified: false
    }, safeState, safeState, filterFieldState, true)

    return cancelFn
  }

  get safeState() {
    return {
      value: this.value,
      errors: this.errors,
      state: this.state
    }
  }

  /*************
  *  申请状态  *
  *************/
  private _applyFieldStatus(fieldStatus: FieldStatus<T>): void {
    if (this._isBoxedValue(fieldStatus)) {
      this.value = fieldStatus.value
      this.inactivate(fieldStatus.inactive, { emitEvent: false });
    } else {
      this.value = fieldStatus;
    }
  }
  private _isBoxedValue(fieldStatus: FieldStatus<T>): fieldStatus is FieldStatusBoxedValue<T> {
    return typeof fieldStatus === 'object' && fieldStatus !== null &&
      Object.keys(fieldStatus).length === 2 && 'value' in fieldStatus && 'inactive' in fieldStatus;
  }
  /**
   * 设置更新和校验策略
   */
  private _setUpdateAndVerifyStrategy(opts: any) {
    if (!isOptionsObj(opts)) return;

    this._updateOn = opts?.updateOn ?? 'blur';
    this._validateFirst = opts?.validateFirst ?? true;
    this._initValidate = opts?.initValidate ?? false;
  }

  _rawValidators: any;
  _rawAsyncValidators: any;
  _composedValidatorFn: any;
  _composedAsyncValidatorFn: any;

  /**
   * 初始化校验
   */
  private _initializeValidate(opts: FieldOptions) {
    this._rawValidators = opts?.validator ?? null;
    this._rawAsyncValidators = opts?.asyncValidators ?? null;

    if (Array.isArray(this._rawValidators)) {
      const validatorArr = this._rawValidators.map(ValidatorManage.getValidatorByOpts.bind(ValidatorManage));
      this._composedValidatorFn = this._validateFirst ? validators(...validatorArr) : coValidators(...validatorArr)
    } else {
      this._composedValidatorFn = this._rawValidators ? ValidatorManage.getValidatorByOpts(this._rawValidators) : null
    }

    if (Array.isArray(this._rawAsyncValidators)) {
      const validators = this._rawAsyncValidators.map(ValidatorManage.getValidatorByOpts.bind(ValidatorManage));
      this._composedAsyncValidatorFn = this._validateFirst ? asyncValidators(...validators) : coAsyncValidators(...validators)
    } else {
      this._composedAsyncValidatorFn = this._rawAsyncValidators ? ValidatorManage.getValidatorByOpts(this._rawAsyncValidators) : null
    }
  }
  /**
   * 初始化通知体系
   */
  private _initNotify() {
    this._stateSubject = new StateSubject<any, 'value'>(filterFieldState);
  }
}

export default Field