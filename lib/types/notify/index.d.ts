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
    constructor(_keys: (keyof T)[], _shallowEqualKeys: (keyof T)[], initialValue: any);
    subscribe(subscriber: Subscriber<T>, subscription: Subscription<T>, silent?: boolean): () => void;
    notifySubscriber(oldState: T, newState: T, subscriber: Subscriber<T>, subscription: Subscription<T>, force?: boolean): void;
    notify(state: T): void;
}
export default StateSubject;
