import AbstractContainerControl from "../shared/AbstractContainerControl";
import AbstractControl, { AbstractControlOptions, UIStatus } from "../shared/AbstractControl";
declare class FormArray extends AbstractContainerControl {
    controls: AbstractControl[];
    value: unknown;
    constructor(controls?: AbstractControl[], opts?: AbstractControlOptions);
    enable(options?: Object): void;
    inactivate(uiStatus: UIStatus, options?: Object): void;
    _allControlsInactivated(): boolean;
    _updateValue(): void;
    _setInitialStatus(): void;
}
export default FormArray;
