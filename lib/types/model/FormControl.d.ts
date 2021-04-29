import StateSubject from "../notify";
import { FormStatus, AbstractControl, AbstractControlOptions } from "../shared/AbstractControl";
import { FormState, UIStatus } from "../types";
interface State<T> {
    value: T;
    status: FormStatus;
    errors: any;
}
interface valueChangelistener<T> {
    (valur: T | null): void;
}
declare class FormControl<T> extends AbstractControl {
    value: T | null;
    status: FormStatus;
    errors: any;
    validation: any;
    statusSubject: any;
    stateSubject: StateSubject<State<T>>;
    currentTrigger: any;
    constructor(formState?: FormState<T>, opts?: AbstractControlOptions<AbstractControl>);
    add(path: string, control: AbstractControl): void;
    getControl(path: string): void;
    /**
     * 值改变订阅器
     */
    valueChangelisteners: valueChangelistener<T>[];
    /**
     * 注册值订阅器
     * @param listener
     * @returns
     */
    registerValueChange(listener: valueChangelistener<T>): () => void;
    /**
     * 设置控件值
     * @param value
     * @param opts
     */
    setValue(value: T, opts?: {
        emitModelToViewChange?: boolean;
        trigger?: any;
    }): void;
    get enabled(): boolean;
    getState(): {
        value: T | null;
        errors: any;
        status: FormStatus;
    };
    /**
     * 启用表单控件
     * @param
     */
    enable(): void;
    /**
     * 使表单控件失活（禁用/只读/隐藏）
     * @param
     */
    inactivate(status: UIStatus): void;
    validity(): void;
    notify(): void;
    subscribe(subscriber: Function, subscription: any): () => void;
    private _applyFormState;
    private _isBoxedValue;
    private _initValidator;
    private _initNotify;
}
export default FormControl;
