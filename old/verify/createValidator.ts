import { isFunction, isString } from "lodash";

import { ValidateRule } from "./types";
import { getMessage, isPromise } from "./utils";


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
