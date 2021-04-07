import memorize from './memorize'

class StatusSubject {

  index: number = 0;

  subscribers: any = {};

  status: any = {};

  constructor(public keys: any[]){

  }

  subscribe(subscriber: Function, subscription: any) {
    const index = this.index++;
    this.subscribers[index] = {
      subscriber: memorize(subscriber), subscription
    }

    //通知订阅者
    this.notifySubscriber(subscriber, subscription);

    return () => {
      delete this.subscribers[index];
    }
  }

  notify(status: any){
    let different = false

    for (const key of this.keys) {
      if (!this.status || status[key] !== this.status[key]) {
        different = true;
        break;
      }
    }

    if (!different) return;

    this.status = status;

    Object.keys(this.subscribers).forEach(key => {
      const entity = this.subscribers[Number(key)];
      if(entity) {
        const { subscriber, subscription} = entity;
        this.notifySubscriber(subscriber, subscription)
      }
    })
  }

  notifySubscriber(subscriber: Function, subscription: any) {
    const result = {} as any;
    this.keys.forEach(key => {
      if (subscription[key]) {
        result[key] = this.status[key]
      }
    })
    subscriber(result);
  }
}

export default StatusSubject;