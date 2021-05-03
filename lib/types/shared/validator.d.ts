import AbstractControl from "./AbstractControl";
import type { TriggerType } from "./AbstractControl";
export declare const validate: (context: any, validators: any[]) => {} | null;
export declare const validateFirst: (context: any, validators: any[]) => any;
export declare const asyncValidate: (context: any, validators: any[]) => Promise<unknown>;
export declare const asyncValidateFirst: (context: any, validators: any[]) => Promise<unknown>;
export declare const filterByTrigger: (map: Map<any, any>, currentTrigger: string) => any[];
/**
 * @description
 * 定义验证程序失败返回的结果格式。(结果应该是一个普通对象)
 *
 * @publicApi
 */
export declare type ValidationErrors = {
    [key: string]: any;
    then: never;
    catch: never;
    finally: never;
};
/**
 * @description
 * 这是一个同步接受控件并且返回 validation errors/ null 的函数。
 *
 * @publicApi
 */
export interface ValidatorFn {
    (control: AbstractControl): ValidationErrors | null;
}
/**
 * @description
 * 这是一个异步接受控件并且返回 validation errors/ null 的函数。
 *
 * @publicApi
 */
export interface AsyncValidatorFn {
    (control: AbstractControl): Promise<ValidationErrors | null>;
}
export declare type GeneralValidator<Type> = Type | {
    validator: Type;
    trigger: TriggerType;
} | Type[] | {
    validator: Type;
    trigger: TriggerType;
}[] | null;
export interface Validator {
    run(control: AbstractControl, subscriber: Function, options?: Object): void;
}
export declare const Validator: {
    new (validators: GeneralValidator<ValidatorFn>, asyncValidators: GeneralValidator<AsyncValidatorFn>, defaultTrigger: TriggerType): Validator;
    readonly prototype: Validator;
};
