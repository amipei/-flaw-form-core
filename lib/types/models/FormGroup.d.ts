import AbstractControl, { AbstractControlOptions, FormStatus } from "../shared/AbstractControl";
declare class FormGroup extends AbstractControl {
    controls: any;
    queue: any[];
    waiting: boolean;
    status: {
        [key: string]: FormStatus;
    };
    constructor(controls: any, opts?: AbstractControlOptions);
    setValue(value: {
        [key: string]: any;
    }, options?: Object): void;
    notify(emitEvent: boolean): void;
    _forEachChild(cb: (v: any, k: string) => void): void;
    private _setControls;
    flush(): void;
    reset(): void;
}
export default FormGroup;
