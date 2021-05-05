export declare class GroupSchema {
    config: any;
    options: any;
    constructor(config: any, options: any);
}
export declare class ArraySchema {
    config: any;
    options: any;
    constructor(config: any, options: any);
}
export declare class BaseSchema {
    config: any;
    options: any;
    constructor(config: any, options: any);
}
declare const defineSchema: (config: any, options?: any) => Readonly<ArraySchema>;
export default defineSchema;
