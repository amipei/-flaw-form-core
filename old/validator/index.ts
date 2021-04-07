import { isFunction, isObject } from "lodash";
import { isString } from "lodash-es";
import { validators } from "../verify";
import { getMessage } from "./message";
import defaultRules from './rules'
validators('required')
validators(()=>{})
validators([{
  rule: 'required', message: '2333', trigger: 'update'
}, {
  rule: ()=>{}, message: ()=>{}
}])

//校验规则集合
const ValidatorRules = {} as any

//模板引擎
export function template(message: any, context: any): string {
  if(isString(message)) {
    return message.replace(/\{\{\s*([\w.]+)\s*\}\}/g, function(_, $0) {
      return context[$0]
    })
  } else {
    return message
  }
}

const createValidatorFn = (rule: any, message: any, opts: any = {}) => {
  if (!isFunction(rule)) {
    throw new Error("校验规则必须是返回布尔值的函数");
  }
  if (!(isString(message) || isFunction(message))) {
    throw new Error("校验提示必须是字符串或者返回字符串的函数");
  }

  return (context: any) => {
    const isPassOrPromise = rule(context, opts);
    const messageContext = { ...context, ...opts };
    const errorType = opts?.name || rule.name; // 错误类型/名称 默认娶函数名

    if (isPromise(isPassOrPromise)) {
      const msg = template(message, messageContext)
      return isPassOrPromise.then((isPass: boolean) => isPass ? null : { [errorType]: msg })
    }
    if (!isPassOrPromise) {
      const msg = template(message, messageContext)
      return { [errorType]: msg } 
    }
    return null
  }
}

const definedMode = 'change';

class FormValidator {
  constructor(validator, asyncValidator) {

  }

  static a(validators: any) {
    //是数组嘛
  }

  static transformValidatorMeta(rule: any, message: any, opts: any) {
    if (isString(rule)) {
      if(!ValidatorRules[rule]) {
        throw new Error(`找不到对应的校验规则(${rule})`);
      }
      return [createValidatorFn(ValidatorRules[rule], getMessage(message || rule), opts), opts.trigger || definedMode];
    }

    if (isFunction(rule)) {
      return [createValidatorFn(rule, getMessage(message || rule.name), opts), opts.trigger || definedMode];
    }
  }

  static transformValidator(validators: any): any {
    if (isObject(validators)) {
      return FormValidator.transformValidatorMeta()
    }
    if (Array.isArray(validators)) {

    }

    if (isObject(rules as any)) {
      if (rules.rule) {
        return this.transformRules(rules.rule, rules.message, rules)
      }
    }

    if (Array.isArray(rules)) {
      return rules.reduce((buf: any, rule) => {
        return buf.concat(this.transformRules(rule))
      }, [])
    }
    return null
  }

  static registerRules(rules: any) {
    for (const key in rules) {
      if (isFunction(rules[key])) {
        ValidatorRules[key] = rules[key];
      }
    }
  }
}

FormValidator.registerRules(defaultRules);