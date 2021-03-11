export declare type SubscriberFn<T> = (state: T) => void;
export declare type Subscriber<State, T> = {
    subscriberFn: SubscriberFn<State>;
    deps: T[];
    notified: boolean;
};
export declare type filterStateFn<State, T> = (state: State, lastState: State | undefined, deps: T[], force: boolean) => State | undefined;
declare class StateSubject<State, T> {
    filter: filterStateFn<State, T>;
    index: number;
    subscribers: {
        [key: number]: Subscriber<State, T>;
    };
    lastState: State | undefined;
    constructor(filter: filterStateFn<State, T>);
    subscribe(subscriber: Subscriber<State, T>): () => void;
    notify(state: State): void;
    /**
     * 静态方法，传入一个订阅者，现有状态，过去状态，筛选器函数和是否强制通知
     * @param subscriber
     */
    static notifySubscriber<State, T>(subscriber: Subscriber<State, T>, state: State, lastState: State | undefined, filter: filterStateFn<State, T>, force: boolean): boolean;
}
export default StateSubject;
