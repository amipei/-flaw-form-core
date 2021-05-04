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
export declare const FORM_STATUS: {
    readonly VALID: "VALID";
    readonly INVALID: "INVALID";
    readonly VALIDATING: "VALIDATING";
    readonly DISABLED: "DISABLED";
    readonly READONLY: "READONLY";
    readonly HIDDEN: "HIDDEN";
};
declare type ValueOf<T> = T[keyof T];
export declare type FormStatus = ValueOf<typeof FORM_STATUS>;
export declare type UIStatus = `${Lowercase<Extract<FormStatus, 'DISABLED' | 'READONLY' | 'HIDDEN'>>}`;
export declare type TriggerType = 'change' | 'blur' | 'sbumit';
export interface AbstractControlOptions {
    /**
     * @description
     * 控制是否走完全部校验过程（即得到全部的errors）。
     */
    validateAll?: boolean;
    /**
     * @description
     * 控制控件启用时是否进行校验。
     */
    selfValidate?: boolean;
    /**
     * @description
     * 控件的同步校验器列表
     */
    validator?: GeneralValidator<ValidatorFn>;
    /**
     * @description
     * 控件的异步校验器列表
     */
    asyncValidator?: GeneralValidator<AsyncValidatorFn>;
}
/**
 *  这是 `FormControl`,`FormGroup`,`FormArray`的抽象基类。
 */
declare abstract class AbstractControl {
    #private;
    /**
       * 表示当前 AbstractControl 的校验策略（是否走完全部校验流程）。
       * 预期的值有 false（错误直接停止校验）和 true（错误不停止校验）,默认值为 false。
       * 值的来源同 trigger 属性。
       */
    protected validateAll: boolean;
    /**
     * 表示当前 AbstractControl 的初始化/启用后是否校验。
     * 预期的值有 false（启用后不校验）和 true（启用后校验）,默认值为 false。
     * 值的来源同 trigger 属性。
     */
    protected selfValidate: boolean;
    /**
     * 存放校验程序
     */
    validator: Validator;
    /**
     * 控件当前状态
     */
    status: any;
    /**
     * 错误
     */
    errors: {
        [key: string]: any;
    } | null;
    value: any;
    stateSubject: StateSubject<any>;
    constructor();
    /**
     * currentTrigger 存取器，用于校验时取出相关事件的校验器。
     */
    set currentTrigger(trigger: TriggerType | null);
    get currentTrigger(): TriggerType | null;
    get enabled(): boolean;
    /**
       * 启用表单控件
       * @param
       */
    abstract enable(options: {
        emitEvent?: boolean;
    }): void;
    /**
     * 使表单控件失活（禁用/只读/隐藏）
     * @param
     */
    abstract inactivate(status: UIStatus, options: {
        emitEvent?: boolean;
    }): void;
    validity(options?: {
        emitEvent?: boolean;
    }): void;
    subscribe(subscriber: Function, subscription?: any): () => void;
    /**
    * 设置控件的行为策略，包括：校验触发策略、校验过程策略、控件启用时校验策略
    * @param opts
    */
    protected _setStrategy(opts: AbstractControlOptions): void;
    protected _initValidator(opts?: AbstractControlOptions): void;
    protected _initNotify(): void;
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
export default AbstractControl;
