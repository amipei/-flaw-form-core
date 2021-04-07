import { ValidateRule } from "../types";
import { isEmptyValue } from "../utils";

const requiredTrue: ValidateRule = function (context, conditions){
  return context.value === true;
}

export default requiredTrue;