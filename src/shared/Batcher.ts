class Batcher {
  has: any
  queue: any
  waiting: any

  constructor(){
    this.reset();
  }

  reset() {
    this.has = {};
    this.queue = [];
    this.waiting = false;

  }

  push(job) {
    if (!this.has[job.id]) {
      this.queue.push(job);
      this.has[job.id] = job;
      if (!this.waiting) {
        this.waiting = true;
        setTimeout(() => {
          this.flush()
        })
      }
    }
  }

  flush() {
    this.queue.forEach((job) => {
      job.cb.call(job.ctx);
    })
    this.reset();
  }
  update(){
  
  }
}

export default Batcher;