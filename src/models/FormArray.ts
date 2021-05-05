import AbstractControl from "../shared/AbstractControl";

class FormArray extends AbstractControl {
  getControl(name: string): AbstractControl {
    throw new Error("Method not implemented.");
  }
  constructor(c: any, cc: any){
    super();
  }
  enable(options: { emitEvent?: boolean | undefined; }): void {
    throw new Error("Method not implemented.");
  }
  inactivate(status: "disabled" | "readonly" | "hidden", options: { emitEvent?: boolean | undefined; }): void {
    throw new Error("Method not implemented.");
  }
  
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