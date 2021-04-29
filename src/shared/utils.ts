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
