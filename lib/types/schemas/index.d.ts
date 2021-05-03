export declare class GroupModel {
    private controls;
    private opts;
    constructor(controls: any, opts: any);
}
declare function defineModel(controlsConfig: {
    [key: string]: any;
}, opts: any): Readonly<GroupModel>;
export default defineModel;
