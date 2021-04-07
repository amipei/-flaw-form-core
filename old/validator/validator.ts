import { isFunction, isObject, isString } from "lodash";
import { isPromise } from "../shared/util";
import { getMessage } from "./message";
import rules from "./rules";


const ValidatorRules = {} as any;

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


class FormValidator {
  private validator: any;
  private asyncValidator: any;

  constructor(rules: any, asyncRules: any, opts: any) {
    this.validator = FormValidator.transformRules(rules)
    this.asyncValidator = FormValidator.transformRules(asyncRules);
    
  }
  static transformRules(rules: any, message: any = undefined, opts: any = {}): any {
    if (isString(rules)) {
      if(!ValidatorRules[rules]) {
        throw new Error(`找不到对应的校验规则(${rules})`);
      }
      return createValidatorFn(ValidatorRules[rules], getMessage(message || rules), opts);
    }

    if (isFunction(rules)) {
      return createValidatorFn(rules, getMessage(message || rules.name), opts);
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
  runValidator() {

  }
  runAsyncValidator () {

  }
  
}

export default FormValidator;