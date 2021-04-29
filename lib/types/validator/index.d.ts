/**
 * 校验失败的错误结果(应是一个普通对象，而不是promise对象)
 */
interface ValidationErrors {
    then: never;
    catch: never;
    finally: never;
    [key: string]: any;
}
export interface ValidatorFn<Context> {
    (context: Context): ValidationErrors | null;
}
export interface AsyncValidatorFn<Context> {
    (context: Context): Promise<ValidationErrors | null>;
}
declare type GeneralValidatorMeta<ValidatorType, Trigger> = {
    validator: ValidatorType;
    trigger: Trigger;
};
export declare type GeneralValidator<ValidatorType, Trigger> = ValidatorType | GeneralValidatorMeta<ValidatorType, Trigger> | Array<ValidatorType | GeneralValidatorMeta<ValidatorType, Trigger>> | null;
declare class Validation<Context, Trigger> {
    #private;
    constructor(validators: GeneralValidator<ValidatorFn<Context>, Trigger>, asyncValidators: GeneralValidator<AsyncValidatorFn<Context>, Trigger>, defaultTrigger: Trigger);
    private _coerceToValidatorMap;
    private _transformValidatorMeta;
    private _filterByTrigger;
    run(context: Context, subscriber: Function, opts: {
        trigger: Trigger;
        validationAll: boolean;
    }): void;
}
export default Validation;
