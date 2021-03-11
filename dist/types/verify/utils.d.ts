/**
 * 检查是否空值
 * @param value
 */
export declare function isEmptyValue(value: string | null | undefined | Array<any>): boolean;
/**
 * 检查是否是Promise对象
 * @param obj
 * @returns
 */
export declare function isPromise(obj: any): obj is Promise<any>;
/**
 * 获取提示信息
 * @param msg
 * @param context
 * @returns
 */
export declare function getMessage(msg: Function | string, context: any): any;
/**
 * 是否为有效长度
 */
export declare function hasValidLength(value: any): boolean;
