import AbstractControl, { AbstractControlOptions, UIStatus } from "../shared/AbstractControl";
export interface FormStateBoxedValue<T> {
    value: T;
    status: UIStatus;
}
export declare type FormState<T> = T | FormStateBoxedValue<T> | null;
export interface ValueChangeFn<T> {
    (value: T | null): void;
}
declare class FormControl<T> extends AbstractControl {
    #private;
    /**
     * 默认值为 null
     */
    value: T | null;
    constructor(formState?: FormState<T>, opts?: AbstractControlOptions);
    setValue(value: T | null, options: {
        emitModelToViewChange?: boolean;
    }): void;
    enable(options?: {
        emitEvent?: boolean;
    }): void;
    inactivate(uiStatus: UIStatus, options?: {
        emitEvent?: boolean;
    }): void;
    /**
     * 注册值改变时调用的回调函数
     * @param fn
     * @returns
     */
    registerOnChange(fn: ValueChangeFn<T>): Function;
    private _unregisterOnChange;
    _allControlsInactivated(): boolean;
    private _applyFormState;
    private _isBoxedValue;
    _updateValue(): void;
    _setInitialStatus(): void;
}
export default FormControl;
