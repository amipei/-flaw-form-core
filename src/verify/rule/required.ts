
import { ValidateRule } from "..";
import { isEmptyValue } from "../utils";

const required: ValidateRule = function (context){
  return !isEmptyValue(context.value);
}

export default required;