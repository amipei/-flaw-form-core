import { cloneDeep } from "lodash";
import StatusSubject from "../notify";
import { removeListItem, toObservable } from "../shared/util";
import { ModelState } from "../type"; 
import ValidatorManage, { asyncValidators, coAsyncValidators, coValidators, validators } from "../verify";

/**
 * 筛选出不活跃的状态
 */
type InactiveState = Exclude<ModelState, ModelState.VALID | ModelState.PENDING | ModelState.INVALID>;

/**
 * 初始化字段与包装值字段的类型接口
 */
interface FieldStatusBoxedValue<T> {
  value: T
  inactive: InactiveState
};

type FieldStatus<T> = T | FieldStatusBoxedValue<T> | null;

interface FieldOptions {
  updateMode?: string;
  validationAll?: boolean;
  selfInspection?: boolean;
  validators?: any;
  asyncValidators?: any;
}

function isOptionsObj(opts: any) {
  return opts != null && !Array.isArray(opts) && typeof opts === 'object';
}

function coerceToValidator(validator: any, validationAll: boolean) {
  if (Array.isArray(validator)) {
    const validatorArr = validator.map(ValidatorManage.getValidatorByOpts.bind(ValidatorManage));
    return validationAll ? validators(...validatorArr) : coValidators(...validatorArr)
  } else {
    return validator ? ValidatorManage.getValidatorByOpts(validator) : null;
  }
}

function coerceToAsyncValidator(asyncValidator: any, validationAll: boolean) {
  if (Array.isArray(asyncValidator)) {
    const validators = asyncValidator.map(ValidatorManage.getValidatorByOpts.bind(ValidatorManage));
    return validationAll ? asyncValidators(...validators) : coAsyncValidators(...validators)
  } else {
    return asyncValidator ? ValidatorManage.getValidatorByOpts(asyncValidator) : null
  }
}

const inactiveState = [ModelState.DISABLED, ModelState.HIDDEN, ModelState.PREVIEW]

class Field<T> {
  value!: T | null;

  state!: ModelState;

  _updateMode!: string;
  _validationAll!: boolean;
  _selfInspection!: boolean;

  _rawValidators: any;
  _rawAsyncValidators: any;
  _composeValidator: any;
  _composeAsyncValidator: any;

  errors: null;

  statusSubject!: StatusSubject;

  _asyncValidationSubscription: any;
  _hasOwnPendingAsyncValidator!: boolean;

  constructor(status: any, opts: FieldOptions = {}) {
    //申请字段状态
    this._applyFieldStatus(status);
    //设置校验策略
    this._setStrategy(opts);
    //初始化校验器
    this._initValidator(opts);
    //初始化通知
    this._initNotify();

    if (!this.inactive) {
      this.enable()
    }
  }

  subscribe(subscriber: Function, subscription: any) {
    return this.statusSubject.subscribe(subscriber, subscription)
  }
  /**
   *  Sets a new value for the field.
   * @param value The new value for the field
   * @param opts  
   */
   setValue(value: T | null, opts: {
    emitModelToViewChange?: boolean,
    emitEvent?: boolean
  } = {}): void {
    this.value = value;
    if (this._valueChange.length && opts.emitModelToViewChange !== false) {
      this._valueChange.forEach(
        (changeFn) => changeFn(this.value));
    }
    this.updateValidity(opts)
  }

  /**
   * 存储value改变时，调用的回调，用于 model->view的改变
   */
  _valueChange: any[] = [];

  registerOnChange(fn: Function) {
    this._valueChange.push(fn);

    return () => {
      this._unregisterOnChange(fn)
    }
  }
  _unregisterOnChange(fn: Function): void {
    removeListItem(this._valueChange, fn);
  }

  get updateMode() {
    return this._updateMode ? this._updateMode : 'change';
  }
  get validationAll() {
    return this._validationAll != null ? this._validationAll : false;
  }
  /**
   * Reports the self Inspection validate strategy of the `Field`
   * value of true indicates that validation is performed a
   * fter initialization or enabling, and false is the opposite
   * Possible values: `true | false`
   * Default value: `false`
   */
  get selfInspection() {
    return this._selfInspection != null ? this._selfInspection : false;
  }

  get inactive() {
    return inactiveState.includes(this.state)
  }
  get enabled() {
    return !inactiveState.includes(this.state)
  }

  get validator() {
    return this._composeValidator;
  }
  get asyncValidator() {
    return this._composeAsyncValidator;
  }
  updateValidity(opts: { emitEvent?: boolean } = {}) {
    if (this.enabled) {
      this._cancelExistingSubscription();
      this.errors = this._runValidator();
      this.state = this._calculateStatus()

      if (this.state === ModelState.VALID || this.state === ModelState.PENDING) {
        this._runAsyncValidator(opts.emitEvent);
      }
    }

    if (opts.emitEvent !== false) {
      this.notify()
    }
  }
  private _runAsyncValidator(emitEvent?: boolean) {
    if (this.asyncValidator) {
      this.state = ModelState.PENDING;
      this._hasOwnPendingAsyncValidator = true;
      const obs = toObservable(this.asyncValidator(this));
      this._asyncValidationSubscription = obs.subscribe((errors: any) => {
        this._hasOwnPendingAsyncValidator = false;
        // This will trigger the recalculation of the validation status, which depends on
        // the state of the asynchronous validation (whether it is in progress or not). So, it is
        // necessary that we have updated the `_hasOwnPendingAsyncValidator` boolean flag first.
        this.setErrors(errors, { emitEvent });
      });
    }
  }
  setErrors(errors: any, opts: { emitEvent?: boolean } = {}) {
    this.errors = errors;
    if (opts.emitEvent !== false) {
      this.notify()
    }
  }
  private _calculateStatus(): ModelState {
    if (this.errors) return ModelState.INVALID;
    if (this._hasOwnPendingAsyncValidator) return ModelState.PENDING;
    return ModelState.VALID;
  }
  private _runValidator(): any {
    return this.validator ? this.validator(this) : null;
  }
  private _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
      this._hasOwnPendingAsyncValidator = false;
    }
  }

  notify() {
    const salaStatus = cloneDeep({
      value: this.value,
      errors: this.errors,
      state: this.state
    })
    this.statusSubject.notify(salaStatus);
  }

  inactivate(inactive: InactiveState, opts: { emitEvent?: boolean } = {}) {
    this.state = inactive;
    this.errors = null

    if (opts.emitEvent !== false) {
      this.notify()
    }
  }

  enable(opts: { emitEvent?: boolean } = {}) {
    this.state = ModelState.VALID;

    if (this.selfInspection) {
      this.updateValidity({ emitEvent: opts.emitEvent })
    } else if (opts.emitEvent !== false) {
      this.notify()
    }
  }

  private _applyFieldStatus(status: FieldStatus<T>): void {
    if (this._isBoxedValue(status)) {
      this.value = status.value
      //使其不活动
      this.inactivate(status.inactive, { emitEvent: false })
    } else {
      this.value = status;
    }
  }

  private _isBoxedValue(status: FieldStatus<T>): status is FieldStatusBoxedValue<T> {
    return typeof status === 'object' && status !== null &&
      Object.keys(status).length === 2 && 'value' in status && 'inactive' in status;
  }

  private _setStrategy(opts: FieldOptions): void {
    if (!isOptionsObj(opts)) return;

    if (opts.updateMode != null) {
      this._updateMode = opts.updateMode!;
    }
    if (opts.validationAll != null) {
      this._validationAll = opts.validationAll!;
    }
    if (opts.selfInspection != null) {
      this._selfInspection = opts.selfInspection!;
    }
  }

  private _initValidator(opts: FieldOptions) {
    this._rawValidators = opts?.validators ?? null;
    this._rawAsyncValidators = opts?.asyncValidators ?? null;

    this._composeValidator = coerceToValidator(this._rawValidators, this.validationAll);
    this._composeAsyncValidator = coerceToAsyncValidator(this._rawAsyncValidators, this.validationAll);
  }

  private _initNotify() {
    this.statusSubject = new StatusSubject(['value', 'errors', 'state'])
  }
}

export default Field;