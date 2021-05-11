import StateSubject from "../notify";
import { isObject } from "../shared/utils";
import { GeneralValidator, ValidatorFn, AsyncValidatorFn, Validator, ValidationErrors } from "../shared/validator";

export type TriggerType = 'change' | 'blur' | 'sbumit';

export interface AbstractControlOptions {
  /**
   * @description
   * 控制是否走完全部校验过程（即得到全部的errors）。
   */
  validateAll?: boolean
  /**
   * @description
   * 控制控件启用时是否进行校验。
   */
  selfValidate?: boolean
  /**
   * @description
   * 控件的同步校验器列表
   */
  validator?: GeneralValidator<ValidatorFn>
  /**
   * @description
   * 控件的异步校验器列表
   */
  asyncValidator?: GeneralValidator<AsyncValidatorFn>
}

export const FORM_STATUS = {
  VALID: 'VALID',
  INVALID: 'INVALID',
  PENDING: 'PENDING',
  INACTIVATED: 'INACTIVATED'
} as const;

type ValueOf<T> = T[keyof T];
export type FormStatus = ValueOf<typeof FORM_STATUS>;
export type UIStatus = 'disabled' | 'readonly' | 'hiddden';

abstract class AbstractControl {
  /**
   * 控件的当前值
   * 
   * 对于一个 FormControl 是当前值。
   * 对于一个 FormGroup 是它启用的子控件的键值对值对象。
   * 对于一个 FormArray 是它启用的子控件的值数组。
   */
  abstract value: unknown;

  /**
   * 控件的ui状态，默认为 null 表示正常。
   */
  uiStatus!: UIStatus | null;

  /**
   * 控件的当前错误
   */
  errors!: ValidationErrors | null;

  /**
   * 校验器
   */
  validator!: Validator;

  /**
   * 通知
   */
  stateSubject!: StateSubject<any>;

  /**
   * 表示当前 AbstractControl 的校验策略（是否走完全部校验流程）。
   * 预期的值有 false（错误直接停止校验）和 true（错误不停止校验）,默认值为 false。
   */
  protected validateAll!: boolean;

  /**
   * 表示当前 AbstractControl 的初始化/启用后是否校验。
   * 预期的值有 false（启用后不校验）和 true（启用后校验）,默认值为 false。
   */
  protected selfValidate!: boolean;

  constructor(opts: AbstractControlOptions) {
    this._initValidator(opts);
    this._setStrategy(opts);
  }

  /**
   * 控件更新时的触发事件， 默认为 null。
   */
  #currentTrigger: TriggerType | null = null;

  /**
  * #currentTrigger的访问控制
  * 每次获取#currentTrigger后会被重置为null。
  */
  set currentTrigger(trigger: TriggerType | null) {
    this.#currentTrigger = trigger
  }

  get currentTrigger(): TriggerType | null {
    const temp = this.#currentTrigger;
    this.#currentTrigger = null;
    return temp
  }

  public status!: FormStatus;

  get valid(): boolean {
    return this.status === FORM_STATUS.VALID;
  }

  get invalid(): boolean {
    return this.status === FORM_STATUS.INVALID;
  }

  get pending(): boolean {
    return this.status == FORM_STATUS.PENDING;
  }

  get inactivated(): boolean {
    return this.status === FORM_STATUS.INACTIVATED;
  }

  get enabled(): boolean {
    return this.status !== FORM_STATUS.INACTIVATED;
  }

  validity(options: { emitEvent?: boolean } = {}): void {
    this._setInitialStatus();
    this._updateValue();
    if (this.enabled) {
      this.status = FORM_STATUS.PENDING;

      this.validator.run(this, (errors) => {
        this.errors = errors;
        this.status = this.errors ? FORM_STATUS.INVALID : FORM_STATUS.VALID;
        if (options.emitEvent !== false) {
          this.notify();
        }
      }, {
        trigger: this.currentTrigger,
        validationAll: this.validateAll
      })
    }

    if (options.emitEvent !== false) {
      this.notify();
    }
  }

  getState() {
    return {
      value: isObject(this.value) ? { ...this.value } : this.value,
      errors: this.errors ? { ...this.errors } : this.errors,
      status: this.status,
      disabled: this.uiStatus === 'disabled',
      hidden: this.uiStatus === 'hiddden',
      readonly: this.uiStatus === 'readonly'
    }
  }

  notify(): void {
    this.stateSubject.notify(
      this.getState()
    )
  }

  subscribe(subscriber: Function, subscription: any = [], silent?: boolean) {
    return this.stateSubject.subscribe(subscriber as any, subscription, silent)
  }

  private _initValidator(opts: AbstractControlOptions = {}) {
    this.validator = new Validator(
      opts?.validator ?? null,
      opts?.asyncValidator ?? null,
      'change'
    )
  }
  /**
    * 设置控件的行为策略，包括：校验触发策略、校验过程策略、控件启用时校验策略
    * @param opts 
    */
  private _setStrategy(opts: AbstractControlOptions) {
    this.validateAll = opts?.validateAll ?? false;
    this.selfValidate = opts?.selfValidate ?? false;
  }

  protected _initNotify(initialValue: any) {
    this.stateSubject = new StateSubject(['value', 'errors', 'status', 'readonly', 'disabled', 'hidden'], ['errors'], initialValue)
  }
  /**
  * 更新控件的值
  */
  abstract _updateValue(): void;

  /**
  * 设置控件的初始状态
  */
  abstract _setInitialStatus(): void;

  abstract _allControlsInactivated(): boolean;

  /**
   * @param options 
   */
  abstract enable(options?: Object): void;

  /**
   * @param uiStatus 
   * @param options 
   */
  abstract inactivate(uiStatus: UIStatus, options?: Object): void;
}

export default AbstractControl;