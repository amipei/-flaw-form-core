import AbstractContainerControl from "../shared/AbstractContainerControl";
import AbstractControl, { AbstractControlOptions, UIStatus } from "../shared/AbstractControl";
import Batcher from "../shared/Batcher";
declare class FormGroup extends AbstractContainerControl {
    controls: {
        [key: string]: AbstractControl;
    };
    /**
     * 存储子控件的value属性
     */
    value: {
        [key: string]: any;
    };
    /**
     * 批处理类
     */
    batcher: Batcher;
    constructor(controls: {
        [key: string]: AbstractControl;
    }, opts?: AbstractControlOptions);
    enable(options?: {
        emitEvent?: boolean;
    }): void;
    inactivate(uiStatus: UIStatus, options?: {
        emitEvent?: boolean;
    }): void;
    private _registerControlChange;
    _updateValue(): void;
    _setInitialStatus(): void;
    _allControlsInactivated(): boolean;
}
export default FormGroup;
