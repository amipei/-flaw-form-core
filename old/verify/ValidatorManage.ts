import systemRule from "./rule/index";
import local from "./locale"
import { createValidator } from "./createValidator";
import { isFunction, isObject, isString } from "lodash-es";

//校验规则集合


class ValidatorManage {
  lang: string = 'zh'
  validators: any = {}

  constructor () {
    this.initSystemValidator()
  }

  setLanguage(lang: string) {
    this.lang = lang
    this.initSystemValidator()
  }
  initSystemValidator() {
    for (const name in systemRule) {
      if (Object.prototype.hasOwnProperty.call(systemRule, name)) {
        const rule = systemRule[name];
        this.validators[name] = (message?: Function|string, condition?: any) => {
          const msg = message??local[this.lang][name]
          return createValidator(rule, msg, condition)
        }
      }
    }
  }
  getValidatorByOpts(ruleOrOpts: any){
    // 对纯字符串的检查
    if (isString(ruleOrOpts)) {
      const validator = this.validators[ruleOrOpts]
      if (!validator) {
        throw new Error('该校验器不存在内置校验器上')
      }
      return validator();
    }
    // 对函数检查
    if (isFunction(ruleOrOpts)) {
      throw new Error("使用自定义规则，需要传入一个对象，带有message属性");
    }
    //对选项进行检查
    if (!(isObject(ruleOrOpts) as any && 'format' in ruleOrOpts)) {
      throw new Error("校验选项出错/或不存在format属性");
    }

    if (isString(ruleOrOpts.format)) {
      const validator = this.validators[ruleOrOpts.format]
      if (!validator) {
        throw new Error('该校验器不存在内置校验器上')
      }
      return validator(ruleOrOpts.message, ruleOrOpts);
    }

    if (isFunction(ruleOrOpts.format)) {
      if (ruleOrOpts?.msg) {
        throw new Error("使用自定义规则,需要带有message属性");
      }
      return createValidator(ruleOrOpts.format, ruleOrOpts.msg, ruleOrOpts);
    }
  }
  registerValidator(){
    
  }
}

export default new ValidatorManage();
