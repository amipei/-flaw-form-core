import { isFunction, isString } from "lodash-es";
import { getMessage, isPromise } from "./utils";
import ValidatorManage from "./ValidatorManage";

export default ValidatorManage;

/**
 * ValidateRule: 校验规则
 * 1、校验规则传入两个参数：context用于校验所需要的值， conditions用于校验所需要的条件
 * 2、校验规则返回布尔值， true为通过校验，false为没通过。
 * 3、除必填外的校验规则都要通过空值校验。
 * @param context {object} 校验时所需要的值对象
 * @param conditions {object} 用于校验所需要的条件
 * @returns {boolean}
 */
 export interface ValidateRule {
  (context: { [key: string]: any }, conditions?: any): boolean
}

export function createValidator(rule: ValidateRule, message: any, condition: any) {
  if (!isFunction(rule)) {
    throw new Error("校验规则必须是返回布尔值的函数");
  }
  if (!(isString(message) || isFunction(message))) {
    throw new Error("校验提示必须是字符串或者返回字符串的函数");
  }

  return (context: any) => {
    const isPassOrPromise = rule(context, condition);
    const messageContext = { ...context, ...condition };
    const errorType = condition?.name || rule.name; // 错误类型/名称 默认娶函数名

    if (isPromise(isPassOrPromise)) {
      return isPassOrPromise.then((isPass: boolean) => isPass ? null : { [errorType]: getMessage(message, messageContext) })
    }
    if (!isPassOrPromise) {
      return { [errorType]: getMessage(message, messageContext) } 
    }
    return null
  }
}

export function validators (...validators: any[]) {
  return (context: any) => {
    for (let validator of validators) {
      if (!isFunction(validator)) {
        throw new Error('validator rule must be function')
      }
      const result = validator(context);
      if (result !== null) return result;
    }
    return null
  }
}

export function asyncValidators(...validators: any[]) {
  /**
   * @param {any} value 接收的数据
   * @return {Promise<string | null>}
   */
  return async (context: any) => {
    if (!validators.length) return null
    for (const validator of validators) {
      const result = await validator(context);
      if(result) {
        return result
      }
    }
  }
}

/**
 * 并行验证器
 * 
 * @param {array<validator>} instances 一些验证器
 * @return {function}
 */
export function coValidators(...validators: any[]) {
  /**
   * @param {any} value 接收的数据
   * @return {null | Array<string> | Promise<Array<string> | null>}
   */
  return (context: any) => {
    if(validators.length === 0) return null;
    let errors = {}
    for (let validator of validators) {
      if (!isFunction(validator)) {
        throw new Error('validator rule must be function')
      }
      const result = validator(context);
      if (result !== null) errors = { ...errors, ...result }
    }
    return errors;
  }
}

export function coAsyncValidators(...validators: any[]) {
  /**
   * @param {any} value 接收的数据
   * @return {null | Array<string> | Promise<Array<string> | null>}
   */
  return async (context: any) => {
    if(validators.length === 0) return null;
    let errors = {}
    for (const validator of validators) {
      const result = await validator(context);
      if(result) {
        errors = { ...errors, ...result }
      }
    }
    return errors;
  }
}
