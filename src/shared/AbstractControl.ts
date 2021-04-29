import {  FormTrigger } from "../types";
import { AsyncValidatorFn, GeneralValidator, ValidatorFn } from "../validator";

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
false
type ValueOf<T> = T[keyof T];
export type FormStatus = ValueOf<typeof FORM_STATUS>;

/**
 * 提供给 'AbstractControl' 的选项接口
 * @publicApi
 */
export interface AbstractControlOptions<Context> {
  /**
   * @description
   * 触发控件更新状态的事件名。
   */
  trigger?: FormTrigger
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
  validator?: GeneralValidator<ValidatorFn<Context>, FormTrigger>
  /**
   * @description
   * 控件的异步校验器列表
   */
  asyncValidator?: GeneralValidator<AsyncValidatorFn<Context>, FormTrigger>
}


export abstract class AbstractControl {
  constructor(){
  }

  /**
   * 表示当前 AbstractControl 的触发策略（表示控件用来更新自身状态的事件）。
   * 预期的值有 'change'|'blur'|'submit'，默认值的'change'。
   * 值的来源来自父控件初始化的trigger值或用户初始值（初始化后只读）。
   */
  protected trigger!: FormTrigger;

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
   * 设置控件的行为策略，包括：校验触发策略、校验过程策略、控件启用时校验策略
   * @param opts 
   */
  protected _setStrategy(opts: AbstractControlOptions<AbstractControl>) {
    this.trigger = opts?.trigger ?? 'change';
    this.validateAll = opts?.validateAll ?? false;
    this.selfValidate = opts?.selfValidate ?? false;
  }
}