declare class ValidatorManage {
    lang: string;
    validators: any;
    constructor();
    setLanguage(lang: string): void;
    initSystemValidator(): void;
    getValidatorByOpts(ruleOrOpts: any): any;
    registerValidator(): void;
}
declare const _default: ValidatorManage;
export default _default;
