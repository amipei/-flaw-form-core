import { isString } from "lodash-es"


export default function template(message: any, context: any): string {
  if(isString(message)) {
    return message.replace(/\{\{\s*([\w.]+)\s*\}\}/g, function(_, $0) {
      return context[$0]
    })
  } else {
    return message
  }
}