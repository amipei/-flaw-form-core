import StatusSubject from "../notify";
import Validator from "./Validator";

class Control {
  status: any;
  errors: any;
  value!: any;
  valueChange: any[] = [];
  validation!: Validator;
  currentTrigger: any;
  statusSubject: StatusSubject;

  constructor(value: any, opts: any){
    this.validation = new Validator(opts.validator, opts.asyncValidator)
    this.statusSubject = new StatusSubject(['value', 'errors', 'status'])
  }

  setValue(value: any, opts: any = { }) {
    this.value = value;
    this.currentTrigger = opts?.trigger ?? 'all';

    if (this.valueChange.length && opts.emitModelToViewChange !== false) {
      this.valueChange.forEach((changeFn) => changeFn(this.value));
    }
    this.verify();
  }

  verify() {
    //TODO: 修改状态
    this.status = 'PENDING';

    //开始运行校验器
    this.validation.run(this, { trigger: this.currentTrigger }).then((errors) => {
      if (errors) {
        this.errors = errors;
        this.status = 'INVALID';
      } else {
        this.errors = null;
        this.status = 'VALID';
      }
      this.notify()
    }).catch(()=>{})

    //TODO: 开始通知
    this.notify()
  }

  notify() {
    const salaStatus = Object.assign({}, {
      value: this.value,
      errors: this.errors,
      status: this.status
    })
    this.statusSubject.notify(salaStatus);
  }
  subscribe(subscriber: Function, subscription: any) {
    return this.statusSubject.subscribe(subscriber, subscription)
  }
  registerValueChange(fn: Function) {
    this.valueChange.push(fn);

    return () => {
      const index = this.valueChange.indexOf(fn);
      if (index > -1) {
        this.valueChange.splice(index, 1);
      }
    }
  }
}

export default Control;