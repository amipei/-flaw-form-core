declare class Batcher {
    has: any;
    queue: any;
    waiting: any;
    constructor();
    reset(): void;
    push(job: any): void;
    flush(): void;
    update(): void;
}
export default Batcher;
