import AbstractControl from "./AbstractControl";
declare abstract class AbstractContainerControl extends AbstractControl {
    abstract controls: {
        [key: string]: AbstractControl;
    } | Array<AbstractControl>;
    /**
     * 根据路径获取指定控件
     * @param path
     */
    get(path: string | string[]): AbstractControl;
}
export default AbstractContainerControl;
