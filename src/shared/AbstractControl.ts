import { FormTrigger } from "../types";

/**
 * 表单状态：包括表单控件组和表单控件。
 * VALID:      表单处于合法状态
 * INVALID:    表单处于非法状态（即校验失败）
 * VALIDATING: 表单处于校验中
 * DISABLED:   表单处于禁用状态
 * READONLY:   表单是否可编辑 readonly
 * HIDDEN:     表单是否处于隐藏
 */
export const FORM_STATUS = {
  VALID: 'VALID',
  INVALID: 'INVALID',
  VALIDATING: 'VALIDATING',
  DISABLED: 'DISABLED',
  READONLY: 'READONLY',
  HIDDEN: 'HIDDEN'
} as const;
false
type ValueOf<T> = T[keyof T];
export type FormStatus = ValueOf<typeof FORM_STATUS>;

export interface AbstractControl {
  status: FormStatus

  errors: any;

  trigger: FormTrigger

  validateAll: boolean

  selfValidate: boolean
}