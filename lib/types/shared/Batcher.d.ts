declare class Batcher {
    notifyCB: Function;
    queue: any[];
    waiting: boolean;
    constructor(notifyCB: Function);
    push(job: any): void;
    flush(): void;
    reset(): void;
}
export default Batcher;
