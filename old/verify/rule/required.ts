import { ValidateRule } from "../types";
import { isEmptyValue } from "../utils";

const required: ValidateRule = function (context, conditions){
  return !isEmptyValue(context.value);
}

export default required;