import StateSubject from "../notify";
import { AbstractControl, AbstractControlOptions } from "../shared/AbstractControl";


class FormGroup extends AbstractControl {

  private controls!: any
  stateSubject: any;
  value: any = {};
  errors: any = {};
  status: any = {};

  constructor(
    controls: any, 
    opts: AbstractControlOptions<AbstractControl> = {}
  ) {
    super();
    //设置好策略
    this._setStrategy(opts);
    //初始化通知
    this._initNotify();
    //进行控制设置
    this._setControls(controls);
    
  }
  private _initNotify() {
    this.stateSubject = new StateSubject<any>(['value', 'errors', 'status'], ['errors'])
  }
  private _setControls(controls) {
    this.controls = controls;
    Object.keys(controls).forEach(name => {
      const control = controls[name];
      control.subscribe((state => {
        this.queue.push({ state: state, name: name})
        if (!this.waiting) {
          this.waiting = true;
          setTimeout(() => {
            this.flush()
          });
        }
      }))
    })
  }

  notify() {
    const salaStatus = Object.assign({}, {
      value: {...this.value},
      errors: {...this.errors},
      status: {...this.status},
    })
    this.stateSubject.notify(salaStatus);
  }
  subscribe(subscriber: Function, subscription: any) {
    return this.stateSubject.subscribe(subscriber as any, subscription)
  }

  queue:any[] = []
  waiting = false

  flush() {
    this.queue.forEach(job => {
      const { name, state } = job;
      this.value[name] = state.value;
      this.errors[name] = state.errors;
      this.status[name] = state.status;
    })
    this.reset();
    this.notify();
  }
  reset() {
    this.queue = [];
    this.waiting = false;
  }
}


export default FormGroup;