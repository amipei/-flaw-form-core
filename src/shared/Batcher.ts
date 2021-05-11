class Batcher {
  queue: any[] = [];
  waiting = false;

  constructor(
    public notifyCB: Function
  ){}

  push(job) {
    this.queue.push(job);
    if (!this.waiting) {
      this.waiting = true;
      setTimeout(() => {
        this.flush();
      });
    }
  }

  flush() {
    this.queue.forEach(job => {
      job()
    })
    this.reset();
    this.notifyCB()
  }

  reset(){
    this.queue = [];
    this.waiting = false;
  }
}

export default Batcher;