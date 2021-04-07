import { ValidateRule } from "../types";
import { isEmptyValue } from "../utils";

const min: ValidateRule = function (context, conditions){
  if (isEmptyValue(context.value) || isEmptyValue(conditions.min)) {
    return true;
  }
  const value = parseFloat(context.value);


  return !isNaN(value) && value < conditions.min ? false : true;
}

export default min;