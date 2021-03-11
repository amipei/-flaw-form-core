/******************
 * Field类型声明  *
 *****************/
import StateSubject, { SubscriberFn } from "../shared/StateSubject";
/**
 * 字段的状态类型
 */
declare enum FieldState {
    VALID = "VALID",
    INVALID = "INVALID",
    PENDING = "PENDING",
    DISABLED = "DISABLED",
    PREVIEW = "PREVIEW",
    HIDDEN = "HIDDEN"
}
declare type InactiveState = Exclude<FieldState, FieldState.VALID | FieldState.PENDING | FieldState.INVALID>;
/**
 * 初始化字段与包装值字段的类型接口
 */
interface FieldStatusBoxedValue<T> {
    value: T;
    inactive: InactiveState;
}
declare type FieldStatus<T> = T | FieldStatusBoxedValue<T> | null;
declare type FieldMode = 'change' | 'blur' | 'submit';
interface FieldOptions {
    updateOn?: FieldMode;
    validateFirst?: boolean;
    initValidate?: boolean;
    validator?: any;
    asyncValidators?: any;
}
interface ValueChange<T> {
    (value: T | null): void;
}
declare class Field<T> {
    value: T | null;
    state: FieldState;
    errors: any;
    _updateOn: FieldMode;
    _validateFirst: boolean;
    _initValidate: boolean;
    _stateSubject: StateSubject<any, "value">;
    _asyncValidationSubscription: any;
    _hasOwnPendingAsyncValidator: boolean;
    constructor(fieldStatus: FieldStatus<T> | undefined, opts: FieldOptions);
    get enabled(): boolean;
    validity(opts?: any): void;
    private _calculateStatus;
    private _runValidator;
    private _runAsyncValidator;
    setErrors(errors: any): void;
    private _cancelExistingSubscription;
    /**
       *  Sets a new value for the field.
       * @param value The new value for the field
       * @param opts
       */
    setValue(value: T | null, opts?: {
        emitModelToViewChange?: boolean;
    }): void;
    /**
   * 存储value改变时，调用的回调，用于 model->view的改变
   */
    _valueChange: ValueChange<T>[];
    registerOnChange(fn: ValueChange<T>): () => void;
    _unregisterOnChange(fn: ValueChange<T>): void;
    /**
     * 启用字段
     */
    enable(_opts?: {
        emitEvent?: boolean;
    }): void;
    /**
     * 使字段失活
     */
    inactivate(state: InactiveState, opts?: {
        emitEvent?: boolean;
    }): void;
    subscribe(subscriber: SubscriberFn<any>, deps: any[], onlyOnce?: boolean): (() => void) | undefined;
    get safeState(): {
        value: T | null;
        errors: any;
        state: FieldState;
    };
    /*************
    *  申请状态  *
    *************/
    private _applyFieldStatus;
    private _isBoxedValue;
    /**
     * 设置更新和校验策略
     */
    private _setUpdateAndVerifyStrategy;
    _rawValidators: any;
    _rawAsyncValidators: any;
    _composedValidatorFn: any;
    _composedAsyncValidatorFn: any;
    /**
     * 初始化校验
     */
    private _initializeValidate;
    /**
     * 初始化通知体系
     */
    private _initNotify;
}
export default Field;
