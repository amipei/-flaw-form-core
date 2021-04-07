import { isRegExp, isString } from "lodash";
import { ValidateRules } from "./types"

const isEmptyValue = (value: null | undefined | string | Array<any>): boolean => {
   return value == null || (isString(value) && value.trim().length === 0) || (Array.isArray(value) && !value.length);
}

/**
 * 是否为有效长度
 */
export function hasValidLength(value: any): boolean {
   // non-strict comparison is intentional, to check for both `null` and `undefined` values
   return value != null && typeof value.length === 'number';
}

const rules: ValidateRules = {
   required: function (context) {
      return !isEmptyValue(context.value);
   },
   max: function (context, opts = {}) {
      if (isEmptyValue(context.value)) {
         return true;
      }
      const max = Number(opts.max)
      const value = parseFloat(context.value);

      return !isNaN(value) && !isNaN(max) && !(value > max)
   },
   min: function (context, opts = {}) {
      if (isEmptyValue(context.value)) {
         return true;
      }
      const min = Number(opts.min)
      const value = parseFloat(context.value);

      return !isNaN(value) && !isNaN(min) && !(value < min)
   },
   maxLength: function (context, opts = {}) {
      const maxLength = Number(opts.maxLength);
      if (isNaN(maxLength)) return true;

      return hasValidLength(context.value) && !(context.value.length > maxLength);
   },
   minLength: function (context, opts = {}) {
      if (isEmptyValue(context.value) || !hasValidLength(context.value)) {
         return true;
      }
      const minLength = Number(opts.minLength);
      if (isNaN(minLength)) return true;
      return !(context.value.length < minLength);
   },
   pattern: function (context, opts = {}) {
      if (isEmptyValue(context.value)) {
         return true;
      }
      const value = context.value;
      if(!isRegExp(opts.regex)) return true;

      return opts.regex.test(value)
   }
}

export default rules