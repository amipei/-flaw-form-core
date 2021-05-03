import AbstractControl from "../shared/AbstractControl";

class FormArray extends AbstractControl {
  
  controls!: any[];

  
  setValue(value: any[], options?: Object): void {
    value.forEach((newValue: any, index: number) => {
      if (this.controls[index]) {
        this.controls[index].setValue(newValue, {});
      }
    })
    // TODO: 触发模型的校验
    // this.validaity(options);
  }

  notify(emitEvent: boolean): void {
    throw new Error("Method not implemented.");
  }
  _forEachChild(cb: Function): void {
    throw new Error("Method not implemented.");
  }
}

export default FormArray;