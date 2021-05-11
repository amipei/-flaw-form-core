import StateSubject from "../notify";
import { GeneralValidator, ValidatorFn, AsyncValidatorFn, Validator, ValidationErrors } from "../shared/validator";
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
export declare const FORM_STATUS: {
    readonly VALID: "VALID";
    readonly INVALID: "INVALID";
    readonly PENDING: "PENDING";
    readonly INACTIVATED: "INACTIVATED";
};
declare type ValueOf<T> = T[keyof T];
export declare type FormStatus = ValueOf<typeof FORM_STATUS>;
export declare type UIStatus = 'disabled' | 'readonly' | 'hiddden';
declare abstract class AbstractControl {
    #private;
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
    uiStatus: UIStatus | null;
    /**
     * 控件的当前错误
     */
    errors: ValidationErrors | null;
    /**
     * 校验器
     */
    validator: Validator;
    /**
     * 通知
     */
    stateSubject: StateSubject<any>;
    /**
     * 表示当前 AbstractControl 的校验策略（是否走完全部校验流程）。
     * 预期的值有 false（错误直接停止校验）和 true（错误不停止校验）,默认值为 false。
     */
    protected validateAll: boolean;
    /**
     * 表示当前 AbstractControl 的初始化/启用后是否校验。
     * 预期的值有 false（启用后不校验）和 true（启用后校验）,默认值为 false。
     */
    protected selfValidate: boolean;
    constructor(opts: AbstractControlOptions);
    /**
    * #currentTrigger的访问控制
    * 每次获取#currentTrigger后会被重置为null。
    */
    set currentTrigger(trigger: TriggerType | null);
    get currentTrigger(): TriggerType | null;
    status: FormStatus;
    get valid(): boolean;
    get invalid(): boolean;
    get pending(): boolean;
    get inactivated(): boolean;
    get enabled(): boolean;
    validity(options?: {
        emitEvent?: boolean;
    }): void;
    getState(): {
        value: unknown;
        errors: {
            [x: string]: any;
            then: never;
            catch: never;
            finally: never;
        } | null;
        status: FormStatus;
        disabled: boolean;
        hidden: boolean;
        readonly: boolean;
    };
    notify(): void;
    subscribe(subscriber: Function, subscription?: any, silent?: boolean): () => void;
    private _initValidator;
    /**
      * 设置控件的行为策略，包括：校验触发策略、校验过程策略、控件启用时校验策略
      * @param opts
      */
    private _setStrategy;
    protected _initNotify(initialValue: any): void;
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
