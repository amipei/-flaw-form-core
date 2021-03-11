import { ValidateRule } from "..";
import { hasValidLength } from "../utils";


const maxLength: ValidateRule = function (context, conditions){
  return hasValidLength(context.value) && context.value.length > conditions.maxLength ? false : true;
}

export default maxLength;