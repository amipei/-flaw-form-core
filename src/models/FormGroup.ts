import AbstractControl, { AbstractControlOptions, FormStatus, FORM_STATUS, UIStatus } from "../shared/AbstractControl";
import FormArray from "./FormArray";

class FormGroup extends AbstractControl {

  /**
   * 缓存订阅响应状态
   */
  stateQueue: any[] = [];
  /**
   * 是否处于等待中
   */
  waiting: boolean = false

  status!: { [key: string]: FormStatus };

  constructor(
    public controls: { [key: string]: AbstractControl },
    opts: AbstractControlOptions = {}
  ) {
    super();
    //设置好策略
    this._setStrategy(opts);
    //初始化校验
    this._initValidator(opts);
    //初始化通知
    this._initNotify();
    //进行控制设置
    this._setControls();
  }

  setValue(value: { [key: string]: any }, options?: Object): void {
    Object.keys(value).forEach(name => {
      if (this.controls[name]) {
        this.controls[name].setValue(value[name], {});
      }
    })

    // TODO: 触发模型的校验
    this.validity(options);
  }

  enable(options: { emitEvent?: boolean } = {}): void {
    this._forEachChild((control: AbstractControl) => {
      control.enable(options);
    });
  }
  inactivate(status: UIStatus, options: { emitEvent?: boolean } = {}): void {
    this._forEachChild((control: AbstractControl) => {
      control.inactivate(status, options);
    });
  }

  notify(emitEvent: boolean): void {
    if (emitEvent) {
      this.stateSubject.notify({
        value: { ...this.value },
        errors: { ...this.errors },
        status: { ...this.status }
      });
    }
  }

  getControl(name: string): AbstractControl|null {
    let control: AbstractControl|null = null;
    Object.keys(this.controls).forEach(currentName => {
      //const control = this.controls[currentName];
      if (currentName === name) {
        control = this.controls[currentName];
      }
    })
    return control;
  }

  _forEachChild(cb: (v: any, k: string) => void): void {
    Object.keys(this.controls).forEach(k => cb(this.controls[k], k));
  }

  private _setControls() {
    Object.keys(this.controls).forEach(name => {
      const control = this.controls[name];

      control.subscribe((state: any) => {
        this.stateQueue.push({ name, state });
        if (!this.waiting) {
          this.waiting = true;
          setTimeout(() => this._executeTask());
        }
      })
    })
  }

  private _executeTask() {
    this.stateQueue.forEach(task => {
      const { name, state } = task;
      this.value = { ...this.value, [name]: state.value };
      this.status = { ...this.status, [name]: state.status };
      this.errors = this.errors
        ? { ...this.errors, [name]: state.errors }
        : { [name]: state.errors };
    })

    this._resetQueue();
    this.notify(true);
  }

  private _resetQueue() {
    this.stateQueue = [];
    this.waiting = false;
  }
}

export default FormGroup;