import { get, merge } from 'lodash'
import { globalThisPolyfill } from '../shared/global'
import locales from './locale'


const globals: any = globalThisPolyfill

const getBrowserlanguage = () => {
  if(!globals.navigator) {
    return 'zh'
  }
  return globals.navigator.browserlanguage || globals.navigator.language || 'zh'
}

const LOCALE = {
  messages: {},
  lang: getBrowserlanguage()
}


export const setValidationLocale = (locale: any) => {
  LOCALE.messages = merge(LOCALE.messages, locale)
}

export const setValidationLanguage = (lang: string) => {
  LOCALE.lang = lang
}

export const getMessage = (name: string) => {
  const message = get(LOCALE.messages, `${LOCALE.lang}.${name}`, 'Field is invalid')

  return message;
}

setValidationLocale(locales);
