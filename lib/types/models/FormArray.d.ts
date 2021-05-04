import AbstractControl from "../shared/AbstractControl";
declare class FormArray extends AbstractControl {
    enable(options: {
        emitEvent?: boolean | undefined;
    }): void;
    inactivate(status: "disabled" | "readonly" | "hidden", options: {
        emitEvent?: boolean | undefined;
    }): void;
    controls: any[];
    setValue(value: any[], options?: Object): void;
    notify(emitEvent: boolean): void;
    _forEachChild(cb: Function): void;
}
export default FormArray;
