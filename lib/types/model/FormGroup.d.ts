import { AbstractControl, AbstractControlOptions } from "../shared/AbstractControl";
declare class FormGroup extends AbstractControl {
    private controls;
    stateSubject: any;
    value: any;
    errors: any;
    status: any;
    constructor(controls: any, opts?: AbstractControlOptions<AbstractControl>);
    private _initNotify;
    private _setControls;
    notify(): void;
    subscribe(subscriber: Function, subscription: any): any;
    queue: any[];
    waiting: boolean;
    flush(): void;
    reset(): void;
}
export default FormGroup;
