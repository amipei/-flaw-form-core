declare class Observable {
    _subscribe: any;
    constructor(_subscribe: any);
    subscribe(observer: any): () => void;
}
export declare const toObservable: (r: any) => Observable;
export {};
