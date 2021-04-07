/**
 * ValidateRule: 校验规则
 * 1、校验规则传入两个参数：context用于校验所需要的值， conditions用于校验所需要的条件
 * 2、校验规则返回布尔值， true为通过校验，false为没通过。
 * 3、除必填外的校验规则都要通过空值校验。
 * @param context {object} 校验时所需要的值对象
 * @param conditions {object} 用于校验所需要的条件
 * @returns {boolean}
 */
export interface ValidateRule {
  (context: { [key: string]: any }, conditions?: any): boolean
}
