import { isFunction, isString } from "lodash";
import template from "./template";

/**
 * 检查是否空值
 * @param value 
 */
 export function isEmptyValue(value: string | null | undefined | Array<any>) {
  return value == null || (isString(value) && value.trim().length === 0) || (Array.isArray(value) && !value.length);
}

/**
 * 检查是否是Promise对象
 * @param obj 
 * @returns 
 */
export function isPromise(obj: any): obj is Promise<any> {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * 获取提示信息
 * @param msg 
 * @param context 
 * @returns 
 */
 export function getMessage(msg: Function|string, context: any) {
  return isFunction(msg) ? msg(context) : template(msg, context);
}

/**
 * 是否为有效长度
 */
export function hasValidLength(value: any): boolean {
  // non-strict comparison is intentional, to check for both `null` and `undefined` values
  return value != null && typeof value.length === 'number';
} 