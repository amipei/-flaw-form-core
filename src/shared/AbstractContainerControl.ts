import castPath, { toKey } from "./castPath";
import AbstractControl from "./AbstractControl";

abstract class AbstractContainerControl extends AbstractControl {
  abstract controls: { [key: string]: AbstractControl } | Array<AbstractControl>;
  /**
   * 根据路径获取指定控件
   * @param path 
   */
  get(path: string | string[]): AbstractControl {
    //获取路径数组
    path = castPath(path, this.controls);
    //取出数组首个值
    const currentProp = path.shift();
    //从 controls 里获取控件
    const currentControl = this.controls[toKey(currentProp)]
    //如果控件不存在抛出错误
    if (!currentControl) {
      throw new Error("路径所指向的控件不存在");
    }
    //控件存在检查数组是否为空
    if (path.length === 0) {
      return currentControl
    } else if (currentControl instanceof AbstractContainerControl) {
      return currentControl.get(path);
    } else {
      throw new Error("路径所指向的控件不是容器控件");
    }
    //空数组直接返回，否则调用控件的get
  }
}

export default AbstractContainerControl;