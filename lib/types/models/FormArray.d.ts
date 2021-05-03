import AbstractControl from "../shared/AbstractControl";
declare class FormArray extends AbstractControl {
    controls: any[];
    setValue(value: any[], options?: Object): void;
    notify(emitEvent: boolean): void;
    _forEachChild(cb: Function): void;
}
export default FormArray;
