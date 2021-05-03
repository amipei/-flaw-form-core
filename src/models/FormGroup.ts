import AbstractControl, { AbstractControlOptions, FormStatus } from "../shared/AbstractControl";

class FormGroup extends AbstractControl {
  queue: any[] = []
  waiting = false

  status!: { [key: string]: FormStatus };
  constructor(
    public controls: any,
    opts: AbstractControlOptions = {}
  ) {
    super();
    //设置好策略
    this._setStrategy(opts);
    //初始化通知
    this._initNotify();
    //进行控制设置
    this._setControls(controls);
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
  notify(emitEvent: boolean): void {
    if (emitEvent) {
      this.stateSubject.notify({
        value: { ...this.value },
        errors: { ...this.errors },
        status: { ...this.status }
      });
    }
  }
  _forEachChild(cb: (v: any, k: string) => void): void {
    Object.keys(this.controls).forEach(k => cb(this.controls[k], k));
  }

  private _setControls(controls) {
    this.controls = controls;
    Object.keys(controls).forEach(name => {
      const control = controls[name];
      control.subscribe((state => {
        this.queue.push({ state: state, name: name })
        if (!this.waiting) {
          this.waiting = true;
          setTimeout(() => {
            this.flush()
          });
        }
      }))
    })
  }

  flush() {
    this.queue.forEach(job => {
      const { name, state } = job;
      this.value[name] = state.value;
      this.errors = this.errors ? { ...this.errors, [name]: state.errors } : { [name]: state.errors }
      this.status[name] = state.status;
    })
    this.reset();
    this.notify(true);
  }
  reset() {
    this.queue = [];
    this.waiting = false;
  }
}

export default FormGroup;