import { ValidateRule } from "../types";
import { hasValidLength, isEmptyValue } from "../utils";


const minLength: ValidateRule = function (context, conditions){
  if (isEmptyValue(context.value) || !hasValidLength(context.value)) {
    return true;
  }

  return context.value.length < conditions.minLength ? false : true;
}

export default minLength;