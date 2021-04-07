import { BehaviorSubject } from "rxjs";
import { ModelState } from "../type";
/**
 * 筛选出不活跃的状态
 */
declare type InactiveState = Exclude<ModelState, ModelState.VALID | ModelState.PENDING | ModelState.INVALID>;
interface FieldOptions {
    updateMode?: string;
    validationAll?: boolean;
    selfInspection?: boolean;
    validators?: any;
    asyncValidators?: any;
}
declare class Field<T> {
    value: T | null;
    state: ModelState;
    _updateMode: string;
    _validationAll: boolean;
    _selfInspection: boolean;
    _rawValidators: any;
    _rawAsyncValidators: any;
    _composeValidator: any;
    _composeAsyncValidator: any;
    statusSource$: BehaviorSubject<any>;
    errors: null;
    constructor(status: any, opts?: FieldOptions);
    get updateMode(): string;
    get validationAll(): boolean;
    /**
     * Reports the self Inspection validate strategy of the `Field`
     * value of true indicates that validation is performed a
     * fter initialization or enabling, and false is the opposite
     * Possible values: `true | false`
     * Default value: `false`
     */
    get selfInspection(): boolean;
    updateValidity(opts: any): void;
    notify(): void;
    inactivate(inactive: InactiveState, opts?: {
        emitEvent?: boolean;
    }): void;
    enable(opts?: {
        emitEvent?: boolean;
    }): void;
    private _applyFieldStatus;
    private _isBoxedValue;
    private _setStrategy;
    private _initValidator;
    private _initNotify;
}
export default Field;
