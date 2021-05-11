import AbstractContainerControl from "../shared/AbstractContainerControl";
import AbstractControl, { AbstractControlOptions, FormStatus, FORM_STATUS, UIStatus } from "../shared/AbstractControl";
import Batcher from "../shared/Batcher";

class FormGroup extends AbstractContainerControl {
  /**
   * 存储子控件的value属性
   */
  value!: { [key: string]: any; };

  /**
   * 批处理类
   */
  batcher!: Batcher;

  constructor(
    public controls: { [key: string]: AbstractControl },
    opts: AbstractControlOptions = {}
  ) {
    super(opts);
    this.batcher = new Batcher(this.validity.bind(this));
    //订阅子组件的值变化
    this._registerControlChange();
    //询问子控件的初始值
    if (this.selfValidate) {
      this.validity({ emitEvent: false })
    } else {
      this._updateValue();
      this._setInitialStatus();
    }
    //初始化通知
    this._initNotify(this.getState());
  }

  enable(options: { emitEvent?: boolean } = {}): void {
    Object.keys(this.controls).forEach(name => {
      this.controls[name].enable(options)
    })
  }
  inactivate(uiStatus: UIStatus, options: { emitEvent?: boolean } = {}): void {
    Object.keys(this.controls).forEach(name => {
      this.controls[name].inactivate(uiStatus, options)
    })
  }

  private _registerControlChange() {
    Object.keys(this.controls).forEach(name => {
      const currentControl = this.controls[name];
      //订阅控件更新
      currentControl.subscribe(state => {
        this.batcher.push(() => { })
      }, ['value', 'status'], false)
    })
  }

  _updateValue(): void {
    this.value = Object.keys(this.controls).reduce((previous, currentName) => {
      const currentControl = this.controls[currentName];

      return currentControl.enabled || this.inactivated
        ? { ...previous, [currentName]: currentControl.value }
        : previous
    }, {})
  }
  _setInitialStatus(): void {
    this.status = this._allControlsInactivated() ? FORM_STATUS.INACTIVATED : FORM_STATUS.VALID;
  }
  _allControlsInactivated(): boolean {
    for (const controlName of Object.keys(this.controls)) {
      if (this.controls[controlName].enabled) {
        return false;
      }
    }
    return Object.keys(this.controls).length > 0 || this.inactivated;
  }
}

export default FormGroup


