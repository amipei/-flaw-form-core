import { ValidateRule } from "../types";
import { isEmptyValue } from "../utils";

const EMAIL_REGEXP =
/^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;

const email: ValidateRule = function (context, conditions){
  if (isEmptyValue(context.value)) {
    return true;
  }

  return EMAIL_REGEXP.test(context.value)
}

export default email;