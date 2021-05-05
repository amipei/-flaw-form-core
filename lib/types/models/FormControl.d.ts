import AbstractControl, { AbstractControlOptions, UIStatus } from "../shared/AbstractControl";
export interface FormStateBoxedValue<T> {
    value: T | null;
    status: UIStatus;
}
export declare type FormState<T> = T | FormStateBoxedValue<T> | null;
declare class FormControl<V> extends AbstractControl {
    #private;
    /**
     * 存储控件的值，默认下为null。
     */
    value: V | null;
    constructor(formState?: FormState<V>, opts?: AbstractControlOptions);
    /**
     * 设置一个新值到表单控件。
     *
     * @param value 控件的新值
     * @param options 确定控件在变化时的传播方法。
     *
     * `emitModelToViewChange`: 该值为true/默认时，
     * 每次更改都会触发onChange存放的订阅，用于更新视图。
     */
    setValue(value: V, options?: {
        emitModelToViewChange?: boolean;
        emitEvent?: boolean;
    }): void;
    enable(options?: {
        emitEvent?: boolean;
    }): void;
    inactivate(status: UIStatus, options?: {
        emitEvent?: boolean;
    }): void;
    notify(emitEvent: boolean): void;
    getControl(name: string): AbstractControl;
    /**
     * 注册值改变的订阅
     * @param fn
     */
    registerOnChange(fn: Function): Function;
    private _unregisterOnChange;
    _forEachChild(cb: Function): void;
    private _applyFormState;
    private _isBoxedValue;
}
export default FormControl;
