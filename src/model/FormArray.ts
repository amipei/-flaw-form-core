import AbstractContainerControl from "../shared/AbstractContainerControl";
import AbstractControl, { AbstractControlOptions, UIStatus } from "../shared/AbstractControl";


class FormArray extends AbstractContainerControl {
  value: unknown;

  
  constructor(
    public controls: AbstractControl[] = [],
    opts: AbstractControlOptions = {}
  ) {
    super(opts);
  }
  
  enable(options?: Object): void {
    throw new Error("Method not implemented.");
  }
  inactivate(uiStatus: UIStatus, options?: Object): void {
    throw new Error("Method not implemented.");
  }
  _allControlsInactivated(): boolean {
    throw new Error("Method not implemented.");
  }
  _updateValue(): void {
    throw new Error("Method not implemented.");
  }
  _setInitialStatus(): void {
    throw new Error("Method not implemented.");
  }
}

export default FormArray