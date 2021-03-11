import { ValidateRule } from "..";
import { isEmptyValue } from "../utils";

const max: ValidateRule = function (context, conditions){
  if (isEmptyValue(context.value) || isEmptyValue(conditions.max)) {
    return true;
  }
  const value = parseFloat(context.value);


  return !isNaN(value) && value > conditions.max ? false : true;
}

export default max;