
import { ValidateRule } from "..";
import { isEmptyValue } from "../utils";

const pattern: ValidateRule = function  (context, conditions){
  if (isEmptyValue(context.value)) {
    return true;
  }
  const value: string = context.value;

  return conditions.regex.test(value);
}

export default pattern;