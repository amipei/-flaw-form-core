import AbstractControl from "./AbstractControl";
import type { TriggerType } from "./AbstractControl";
import { isFunction, isObject } from "./utils";
import { toObservable } from "./toObservable";

export const validate = (context: any, validators: any[]) => {
  const errors = {}
  validators.forEach(validator => Object.assign(errors, validator(context)))

  return Object.keys(errors).length ? errors : null;
}

export const validateFirst = (context: any, validators: any[]) => {
  for (const validator of validators) {
    const result = validator(context)
    if (result) return result;
  }

  return null;
}

export const asyncValidate = (context: any, validators: any[]) => {
  //let cancelFn;

  const resultPromise = new Promise((resolve, reject) => {
    //cancelFn = () => reject(null);
    Promise.allSettled(validators.map(validator => validator(context)))
      .then(results => {
        const errors = {};
        results.forEach(result => {
          if (result.status === 'fulfilled' && result.value !== null) {
            Object.assign(errors, result.value);
          }
        })
        Object.keys(errors).length === 0 ? resolve(null) : resolve(errors)
      })
  })

  return resultPromise
  //resultPromise.then(cb);

  //return cancelFn;
}


export const asyncValidateFirst = (context: any, validators: any[]) => {
  //let cancelFn;

  const resultPromise = new Promise(async (resolve, reject) => {
    //cancelFn = () => reject(null);
    const validatorsPromise = validators.map(validator => validator(context))
    let errors = null;
    for await (const error of validatorsPromise) {
      if (error) {
        errors = error;
        break;
      }
    }
    resolve(errors);
  })

  return resultPromise
  //resultPromise.then(cb);

  //return cancelFn;
}

export const filterByTrigger = (map: Map<any, any>, currentTrigger: string) => {
  const validators = [] as any[];
  if (currentTrigger === 'all') {
    map.forEach((trigger, validator) => { validators.push(validator) })
    return validators;
  }
  map.forEach((trigger, validator) => {
    if (currentTrigger === trigger) {
      validators.push(validator)
    }
  })

  return validators;
}

/**
 * @description
 * 定义验证程序失败返回的结果格式。(结果应该是一个普通对象)
 * 
 * @publicApi
 */
export type ValidationErrors = {
  [key: string]: any
  then: never
  catch: never
  finally: never
}

/**
 * @description
 * 这是一个同步接受控件并且返回 validation errors/ null 的函数。
 * 
 * @publicApi
 */
export interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}

/**
 * @description
 * 这是一个异步接受控件并且返回 validation errors/ null 的函数。
 * 
 * @publicApi
 */
export interface AsyncValidatorFn {
  (control: AbstractControl): Promise<ValidationErrors | null>;
}

export type GeneralValidator<Type> =
  Type | { validator: Type, trigger: TriggerType } |
  Type[] | { validator: Type, trigger: TriggerType }[] | null

export interface Validator {
  run(control: AbstractControl, subscriber: Function, options?: Object): void;
}

/**
 * 内部实现的校验程序
 */
class Validator_ implements Validator {
  /**
   * 存储同步校验器的Map
   */
  #validatorMap!: Map<ValidatorFn, TriggerType>;

  /**
   * 存储异步校验器的Map
   */
  #asyncValidatorMap!: Map<AsyncValidatorFn, TriggerType>;

  /**
   * 存储默认的触发条件
   */
  readonly #defaultTrigger!: TriggerType;

  #asyncSubscription!: Function | null;

  constructor(
    validators: GeneralValidator<ValidatorFn>,
    asyncValidators: GeneralValidator<AsyncValidatorFn>,
    defaultTrigger: TriggerType
  ) {
    this.#defaultTrigger = defaultTrigger;
    this.#validatorMap = this._coerceToValidatorMap<ValidatorFn>(validators);
    this.#asyncValidatorMap = this._coerceToValidatorMap<AsyncValidatorFn>(asyncValidators);
  }

  run(control: AbstractControl, subscriber: Function, options: {
    trigger: TriggerType,
    validationAll: boolean
  }): void {
    if (this.#asyncSubscription) {
      this.#asyncSubscription();
      this.#asyncSubscription = null;
    }

    //检查是否存在同步校验器
    if (this.#validatorMap.size) {
      const filterValidors = this._filterByTrigger(this.#validatorMap, options.trigger);

      const errors = options.validationAll ? validate(control, filterValidors) : validateFirst(control, filterValidors);

      if (errors) {
        subscriber(errors)
        return
      }
    }

    if (this.#asyncValidatorMap.size) {
      const filterValidors = this._filterByTrigger(this.#asyncValidatorMap, options.trigger);

      const result = options.validationAll ? asyncValidate(control, filterValidors) : asyncValidateFirst(control, filterValidors)
      this.#asyncSubscription = toObservable(result).subscribe({ next: (errors: any) => subscriber(errors) })

      return
    }

    subscriber(null);
  }

  private _coerceToValidatorMap<ValidatorFnType>(validator: GeneralValidator<ValidatorFnType>) {
    const map = new Map()
    if (Array.isArray(validator)) {
      validator.forEach(v => {
        const meta = this._transformValidatorMeta(v);
        if (meta) { map.set(meta.validator, meta.trigger) }
      })
    } else {
      const meta = this._transformValidatorMeta(validator);
      if (meta) { map.set(meta.validator, meta.trigger) }
    }
    return map
  }

  private _transformValidatorMeta(
    validatorFnOrMeta: any,
    trigger: TriggerType = this.#defaultTrigger
  ) {
    if (isFunction(validatorFnOrMeta)) {
      return { validator: validatorFnOrMeta, trigger };
    }
    if (isObject(validatorFnOrMeta) as any && 'validator' in validatorFnOrMeta && 'trigger' in validatorFnOrMeta) {
      return this._transformValidatorMeta(validatorFnOrMeta.validator, validatorFnOrMeta.trigger);
    }
    return null
  }

  private _filterByTrigger(map: Map<any, any>, trigger: TriggerType) {
    return Array.from(map)
      .filter(meta => {
        return meta[1] === trigger || (!trigger)
      })
      .map(meta => meta[0])
  }
}


export const Validator: {
  new(
    validators: GeneralValidator<ValidatorFn>,
    asyncValidators: GeneralValidator<AsyncValidatorFn>,
    defaultTrigger: TriggerType
  ): Validator;
  readonly prototype: Validator;
} = Validator_;