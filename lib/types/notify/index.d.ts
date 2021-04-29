interface Subscriber<T> {
    (state: T): void;
}
declare type Subscription<T> = (keyof T)[];
declare class StateSubject<T extends {
    [key: string]: any;
}> {
    private _keys;
    private _shallowEqualKeys;
    private _index;
    private subscriberEntity;
    private _catchState;
    constructor(_keys: (keyof T)[], _shallowEqualKeys: (keyof T)[]);
    subscribe(subscriber: Subscriber<T>, subscription: Subscription<T>): () => void;
    notifySubscriber(oldState: T | null, newState: T, subscriber: Subscriber<T>, subscription: Subscription<T>): void;
    notify(state: T): void;
}
export default StateSubject;
