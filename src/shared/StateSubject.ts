import { cloneDeep } from "lodash-es";

export type SubscriberFn<T> = (state: T) => void;

export type Subscriber<State, T> = {
  subscriberFn: SubscriberFn<State>,
  deps: T[],
  notified: boolean
}

export type filterStateFn<State, T> = (
  state: State,
  lastState: State | undefined,
  deps: T[],
  force: boolean
) => State | undefined

class StateSubject<State, T> {
  index: number = 0;
  subscribers: {
    [key: number]: Subscriber<State, T>;
  } = {};

  lastState: State|undefined = undefined;

  constructor(public filter: filterStateFn<State, T>) {}

  subscribe(subscriber: Subscriber<State, T>) {
    const index = this.index++;
    this.subscribers[index] = subscriber;

    return () => {
      delete this.subscribers[index];
    }
  }

  notify(state: State){
    Object.keys(this.subscribers).forEach((key) => {
      const subscriber = this.subscribers[Number(key)];
      const safeLastState = cloneDeep(this.lastState);
      this.lastState = state;

      if (subscriber) {
        const { notified } = subscriber;
        const isNotified = StateSubject.notifySubscriber(subscriber, state, safeLastState, this.filter, !this.lastState || !notified);

        if(isNotified) {
          this.subscribers[Number(key)].notified = true;
        }
      }
    })
  }

  /**
   * 静态方法，传入一个订阅者，现有状态，过去状态，筛选器函数和是否强制通知
   * @param subscriber 
   */
  static notifySubscriber<State, T>(
    subscriber: Subscriber<State, T>,
    state: State,
    lastState: State|undefined,
    filter: filterStateFn<State, T>,
    force: boolean
  ) {
    const { subscriberFn, deps } = subscriber;
    const notification = filter(state, lastState, deps, force);
    if (notification) {
      subscriberFn(notification)
      return true
    }
    return false
  }
}

export default StateSubject;