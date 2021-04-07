import { isFunction, isObject } from "../shared/utils";
import { asyncValidate, asyncValidateFirst, filterByTrigger, validate, validateFirst } from "../shared/validateStrategy";

const DEFAULT_TRIGGER = 'change';

const createValidatorMeta = (validatorFnOrOpts: any, trigger = DEFAULT_TRIGGER): any => {
  if (isFunction(validatorFnOrOpts)) {
    return [validatorFnOrOpts, trigger];
  }
  if (isObject(validatorFnOrOpts) as any && 'format' in validatorFnOrOpts) {
    return createValidatorMeta(validatorFnOrOpts.format, validatorFnOrOpts.trigger)
  }
  return null;
}

const coerceToValidatorMap = (validator: any) => {
  const validatorMap = new Map()
  if (Array.isArray(validator)) {
    validator.forEach(v => {
      const meta = createValidatorMeta(v)
      if (meta) { validatorMap.set(meta[0], meta[1]) }
    })
  } else {
    const meta = createValidatorMeta(validator);
    if (meta) {
      validatorMap.set(meta[0], meta[1])
    }
  }
  return validatorMap;
}

class Validator {
  private _validatorMap: any;
  private _asyncValidatorMap: any;

  private _cancelFn: any

  constructor(validators: any, asyncValidators: any) {
    this._validatorMap = coerceToValidatorMap(validators);
    this._asyncValidatorMap = coerceToValidatorMap(asyncValidators);
  }

  run(context: any, opts: any) {
    if (this._cancelFn) {
      this._cancelFn();
      this._cancelFn = null;
    }

    return new Promise((resolve, reject) => {
      this._cancelFn = () => reject(null)

      const optTrigger = opts?.trigger ?? 'all';
      const optValidationAll = opts?.validationAll ?? false;

      if (this._validatorMap.size) {
        const fns = filterByTrigger(this._validatorMap, optTrigger);

        const errors = optValidationAll ? validate(context, fns) : validateFirst(context, fns);

        if (errors) {
          resolve(errors)
          return
        }
      }

      if (this._asyncValidatorMap.size) {
        const fns = filterByTrigger(this._asyncValidatorMap, optTrigger);

        optValidationAll ? asyncValidate(context, fns).then(errors => resolve(errors))
          : asyncValidateFirst(context, fns).then(errors => resolve(errors));
      }
    })
  }
}

export default Validator;