import type { FormStatus } from "./shared/AbstractControl";

export type UIStatus = `${Lowercase<Extract<FormStatus, 'DISABLED' | 'READONLY' | 'HIDDEN'>>}`
export interface FormStateBoxedValue<T> {
  value: T | null
  status: UIStatus
}

export type FormState<T> = T | FormStateBoxedValue<T> | null;
 
export type FormTrigger = 'change' | 'blur' | 'sbumit';

export interface FormOptions {
  trigger?: FormTrigger
  validateAll?: boolean
  selfValidate?: boolean
  validator?: Array<any>
  asyncValidator?: Array<any>
}