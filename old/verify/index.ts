import { isFunction } from "lodash-es";
import ValidatorManage from "./ValidatorManage";

export default ValidatorManage;

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