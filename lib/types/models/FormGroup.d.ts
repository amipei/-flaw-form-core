import AbstractControl, { AbstractControlOptions, FormStatus, UIStatus } from "../shared/AbstractControl";
declare class FormGroup extends AbstractControl {
    controls: {
        [key: string]: AbstractControl;
    };
    /**
     * 缓存订阅响应状态
     */
    stateQueue: any[];
    /**
     * 是否处于等待中
     */
    waiting: boolean;
    status: {
        [key: string]: FormStatus;
    };
    constructor(controls: {
        [key: string]: AbstractControl;
    }, opts?: AbstractControlOptions);
    setValue(value: {
        [key: string]: any;
    }, options?: Object): void;
    enable(options?: {
        emitEvent?: boolean;
    }): void;
    inactivate(status: UIStatus, options?: {
        emitEvent?: boolean;
    }): void;
    notify(emitEvent: boolean): void;
    _forEachChild(cb: (v: any, k: string) => void): void;
    private _setControls;
    private _executeTask;
    private _resetQueue;
}
export default FormGroup;
