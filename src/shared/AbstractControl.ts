import StateSubject from "../notify";
import { AsyncValidatorFn, GeneralValidator, Validator, ValidatorFn } from "./validator";

/**
 * 表单状态：包括表单控件组和表单控件。
 * VALID:      表单处于合法状态
 * INVALID:    表单处于非法状态（即校验失败）
 * VALIDATING: 表单处于校验中
 * DISABLED:   表单处于禁用状态
 * READONLY:   表单是否可编辑 readonly
 * HIDDEN:     表单是否处于隐藏
 */
export const FORM_STATUS = {
  VALID: 'VALID',
  INVALID: 'INVALID',
  VALIDATING: 'VALIDATING',
  DISABLED: 'DISABLED',
  READONLY: 'READONLY',
  HIDDEN: 'HIDDEN'
} as const;

type ValueOf<T> = T[keyof T];
export type FormStatus = ValueOf<typeof FORM_STATUS>;
export type UIStatus = `${Lowercase<Extract<FormStatus, 'DISABLED' | 'READONLY' | 'HIDDEN'>>}`

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

/**
 *  这是 `FormControl`,`FormGroup`,`FormArray`的抽象基类。
 */
abstract class AbstractControl {
  /**
   * 存储每次更新时的 触发事件，默认为null。
   */
  #currentTrigger: TriggerType | null = null;

  /**
     * 表示当前 AbstractControl 的校验策略（是否走完全部校验流程）。
     * 预期的值有 false（错误直接停止校验）和 true（错误不停止校验）,默认值为 false。
     * 值的来源同 trigger 属性。
     */
  protected validateAll!: boolean;

  /**
   * 表示当前 AbstractControl 的初始化/启用后是否校验。
   * 预期的值有 false（启用后不校验）和 true（启用后校验）,默认值为 false。
   * 值的来源同 trigger 属性。
   */
  protected selfValidate!: boolean;


  /**
   * 存放校验程序
   */
  public validator!: Validator

  /**
   * 控件当前状态
   */
  status!: any;

  /**
   * 错误
   */
  errors!: { [key: string]: any } | null;


  value: any;

  stateSubject!: StateSubject<any>;


  constructor() {

  }

  /**
   * currentTrigger 存取器，用于校验时取出相关事件的校验器。
   */
  set currentTrigger(trigger: TriggerType | null) {
    this.#currentTrigger = trigger
  }

  get currentTrigger(): TriggerType | null {
    const temp = this.#currentTrigger;
    this.#currentTrigger = null;
    return temp
  }

  get enabled() {
    return ['VALID', 'INVALID', 'VALIDATING'].includes(this.status);
  }


/**
   * 启用表单控件
   * @param  
   */
  public enable(options: { emitEvent?: boolean} = {}): void {
    this.status = FORM_STATUS.VALID;
    this.errors = null;

    this._forEachChild((control: AbstractControl) => {
      control.enable(options);
    });

    this.validity(options);
  }
  /**
   * 使表单控件失活（禁用/只读/隐藏）
   * @param  
   */
  public inactivate(status: UIStatus, options: {
    emitEvent?: boolean
  } = {}): void {
    this.status = FORM_STATUS[status.toUpperCase() as FormStatus];
    this.errors = null;

    this._forEachChild((control: AbstractControl) => {
      control.inactivate(status, options);
    });

    //this.validity(options);
  }


  public validity(options: {
    emitEvent?: boolean
  } = {}) {
    if (this.enabled) {
      this.status = FORM_STATUS.VALIDATING;

      this.validator.run(this, (errors) => {
        this.errors = errors;
        this.status = this.errors ? FORM_STATUS.INVALID : FORM_STATUS.VALID;
        this.notify(options.emitEvent !== false);
      }, {
        trigger: this.#currentTrigger,
        validationAll: this.validateAll
      })
    }

    this.notify(options.emitEvent !== false);
  }

  public subscribe(subscriber: Function, subscription: any) {
    return this.stateSubject.subscribe(subscriber as any, subscription)
  }

  /**
  * 设置控件的行为策略，包括：校验触发策略、校验过程策略、控件启用时校验策略
  * @param opts 
  */
  protected _setStrategy(opts: AbstractControlOptions) {
    this.validateAll = opts?.validateAll ?? false;
    this.selfValidate = opts?.selfValidate ?? false;
  }

  protected _initValidator(opts: AbstractControlOptions = {}) {
    this.validator = new Validator(
      opts?.validator ?? null,
      opts?.asyncValidator ?? null,
      'change'
    )
    console.log(this.validator)
  }

  protected _initNotify() {
    this.stateSubject = new StateSubject(['value', 'errors', 'status'], ['errors'])
  }
  /**
   * 设置控件的值，这是一个抽象方法。
   */
  abstract setValue(value: any, options?: Object): void;

  /**
   * 抽象通知方法
   */
  abstract notify(emitEvent: boolean): void;


  abstract _forEachChild(cb: Function): void;
}

export default AbstractControl