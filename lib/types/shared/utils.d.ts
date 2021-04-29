export declare const isObject: (value?: any) => value is object;
export declare const isFunction: (value?: any) => value is (...args: any[]) => any;
export declare const omit: <T extends Object>(obj: T, uselessKeys: string[]) => {};
