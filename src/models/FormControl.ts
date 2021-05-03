import AbstractControl, { AbstractControlOptions, UIStatus } from "../shared/AbstractControl";
import { removeListItem } from "../shared/utils";

export interface FormStateBoxedValue<T> {
  value: T | null
  status: UIStatus
}

export type FormState<T> = T | FormStateBoxedValue<T> | null;

class FormControl<V> extends AbstractControl {
  /**
   * 存储控件的值，默认下为null。
   */
  value!: V | null;

  /**
   * 存放订阅值改变的订阅者
   */
  #onChange: Function[] = [];
  constructor(
    formState: FormState<V> = null,
    opts: AbstractControlOptions = {}
  ) {
    super();
    //申请表单状态
    this._applyFormState(formState);
    //设置策略
    this._setStrategy(opts);
    //初始化校验
    this._initValidator(opts);
    //初始化通知
    this._initNotify();

    if (this.selfValidate) {
      this.validity();
    }
  }

  /**
   * 设置一个新值到表单控件。
   * 
   * @param value 控件的新值
   * @param options 确定控件在变化时的传播方法。
   * 
   * `emitModelToViewChange`: 该值为true/默认时，
   * 每次更改都会触发onChange存放的订阅，用于更新视图。
   */
  setValue(value: V, options: {
    emitModelToViewChange?: boolean,
    emitEvent?: boolean
  } = {}): void {
    this.value = value;

    // 触发模型到视图的响应
    if (this.#onChange.length && options.emitModelToViewChange !== false) {
      this.#onChange.forEach(
        (changeFn) => changeFn(this.value)
      );
    }

    // TODO: 触发模型的校验
    this.validity(options);
  }

  notify(emitEvent: boolean): void {
    if (emitEvent) {
      this.stateSubject.notify({
        value: this.value,
        errors: this.errors,
        status: this.status
      })
    }
  }

  /**
   * 注册值改变的订阅
   * @param fn 
   */
  registerOnChange(fn: Function): Function {
    this.#onChange.push(fn);

    return () => {
      this._unregisterOnChange(fn);
    }
  }

  private _unregisterOnChange(fn: Function): void {
    removeListItem(this.#onChange, fn);
  }

  _forEachChild(cb: Function): void {};


  private _applyFormState(formState: FormState<V>): void {
    if (this._isBoxedValue(formState)) {
      this.value = formState.value;
      this.inactivate(formState.status, { emitEvent: false });
    } else {
      this.value = formState;
      this.enable({ emitEvent: false });
    }
  }

  private _isBoxedValue(formState: FormState<V>): formState is FormStateBoxedValue<V> {
    return typeof formState === 'object' && formState !== null &&
      Object.keys(formState).length === 2 && 'value' in formState && 'status' in formState;
  }
}

export default FormControl;