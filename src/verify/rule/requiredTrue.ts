import { ValidateRule } from "..";


const requiredTrue: ValidateRule = function (context){
  return context.value === true;
}

export default requiredTrue;