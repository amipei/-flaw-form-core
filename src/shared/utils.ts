export function removeListItem<T>(list: T[], el: T): void {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
}

export const isObject = (value?: any): value is object => {
  const type = typeof value;

  return value != null && (type == 'object' || type == 'function');
}

export const isFunction = (value?: any): value is ((...args: any[]) => any) => {
  if (!isObject(value)) {
    return false;
  }
  return Object.prototype.toString.call(value) == '[object Function]';
}

export const omit = <T extends Object>(obj: T, uselessKeys: string[]) => {
  return Object.keys(obj).reduce((acc, key) => {
    return uselessKeys.includes(key) ? acc : {...acc, [key]: obj[key]}
  }, {})
}