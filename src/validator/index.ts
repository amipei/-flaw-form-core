
import { isFunction, isObject } from '../shared/utils';
import { toObservable } from './toObservable';
import { asyncValidate, asyncValidateFirst, validate, validateFirst } from './utils';


/**
 * 校验失败的错误结果(应是一个普通对象，而不是promise对象)
 */
interface ValidationErrors {
  then: never
  catch: never
  finally: never
  [key: string]: any
}

interface ValidatorFn<Context> {
  (context: Context): ValidationErrors | null
}

interface AsyncValidatorFn<Context> {
  (context: Context): Promise<ValidationErrors | null>
}

type GeneralValidatorMeta<ValidatorType, Trigger> = {
  validator: ValidatorType,
  trigger: Trigger
}

type GeneralValidator<ValidatorType, Trigger> =
  ValidatorType | GeneralValidatorMeta<ValidatorType, Trigger> |
  Array<ValidatorType | GeneralValidatorMeta<ValidatorType, Trigger>> | null;


class Validation<Context, Trigger> {
  #validatorMap: Map<ValidatorFn<Context>, Trigger> = new Map();

  #asyncValidatorMap: Map<AsyncValidatorFn<Context>, Trigger> = new Map();

  #DEFAULT_TRIGGER!: Trigger


  constructor(
    validators: GeneralValidator<ValidatorFn<Context>, Trigger>,
    asyncValidators: GeneralValidator<AsyncValidatorFn<Context>, Trigger>,
    defaultTrigger: Trigger
  ) {
    this.#DEFAULT_TRIGGER = defaultTrigger;
    this.#validatorMap = this._coerceToValidatorMap<ValidatorFn<Context>>(validators);
    this.#asyncValidatorMap = this._coerceToValidatorMap<AsyncValidatorFn<Context>>(asyncValidators);
  }

  private _coerceToValidatorMap<ValidatorType>(validator: GeneralValidator<ValidatorType, Trigger>) {
    const map = new Map()
    if (Array.isArray(validator)) {
      validator.forEach(v => {
        const meta = this._transformValidatorMeta<ValidatorFn<Context>>(v);
        if (meta) { map.set(meta.validator, meta.trigger) }
      })
    } else {
      const meta = this._transformValidatorMeta<AsyncValidatorFn<Context>>(validator);
      if (meta) { map.set(meta.validator, meta.trigger) }
    }
    return map
  }
  private _transformValidatorMeta<ValidatorType>(
    validatorFnOrMeta: any,
    trigger: Trigger = this.#DEFAULT_TRIGGER
  ) {
    if (isFunction(validatorFnOrMeta)) {
      return { validator: validatorFnOrMeta, trigger };
    }
    if (isObject(validatorFnOrMeta) as any && 'validator' in validatorFnOrMeta && 'trigger' in validatorFnOrMeta) {
      return this._transformValidatorMeta(validatorFnOrMeta.validator, validatorFnOrMeta.trigger);
    }
    return null
  }

  private _filterByTrigger(map: Map<any, any>, trigger: Trigger) {
    return Array.from(map)
      .filter(meta => {
        return meta[1] === trigger || (!trigger)
      })
      .map(meta => meta[0])
  }

  #asyncSubscription!: Function | null;

  public run(context: Context, subscriber: Function, opts: {
    trigger: Trigger, validationAll: boolean
  }) {
    //取消上次的异步订阅
    if (this.#asyncSubscription) {
      this.#asyncSubscription();
      this.#asyncSubscription = null;
    }

    //检查是否存在同步校验器
    if (this.#validatorMap.size) {
      const filterValidors = this._filterByTrigger(this.#validatorMap, opts.trigger);

      const errors = opts.validationAll ? validate(context, filterValidors) : validateFirst(context, filterValidors);

      if (errors) {
        subscriber(errors)
        return
      }
    }

    if (this.#asyncValidatorMap.size) {
      const filterValidors = this._filterByTrigger(this.#asyncValidatorMap, opts.trigger);

      const result = opts.validationAll ? asyncValidate(context, filterValidors) : asyncValidateFirst(context, filterValidors)
      this.#asyncSubscription = toObservable(result).subscribe({ next: (errors: any) => subscriber(errors) })
    }
  }
}

export default Validation;


