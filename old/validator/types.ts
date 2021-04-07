//export type ValidateRules = 'required' | ''

export interface ValidateRuleContext {
  value: any
}

export interface ValidateRuleOptions {
  max?: number
  min?: number
  maxLength?: number
  minLength?: number
  regex?: string|RegExp
}

interface ValidateRuleFn {
  (context: ValidateRuleContext, opts: ValidateRuleOptions): boolean;
}

export interface ValidateRules {
  [key: string]: ValidateRuleFn
}