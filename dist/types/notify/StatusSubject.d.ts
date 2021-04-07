declare class StatusSubject {
    filter: any;
    readonly data: any;
    index: number;
    subscribers: any;
    constructor(filter: any);
    subscribe(subscriber: any, subscription: any): () => void;
    notifySubscriber(subscriber: any, subscription: any): void;
    emit(data: any): void;
}
export default StatusSubject;
