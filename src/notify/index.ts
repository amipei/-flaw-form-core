import shallowEqual from "./shallowEqual";

interface Subscriber<T> {
  (state: T): void
}

type Subscription<T> = (keyof T)[];

interface SubscriberEntity<T> {
  [key: number]: {
    subscriber: Subscriber<T>
    subscription: Subscription<T>
  }
}

/**
 * 筛选 a (default) 和 b () 的交集
 * @param defaultArr 
 * @param filterArr 
 * @returns 
 */
const filterSubscriptionUnite = (baseArr: any[], compareArr: any[]) => {
  const baseSet = new Set(baseArr);
  const compareSet = new Set(compareArr);

  const filterArr = [...baseSet].filter(item => compareSet.has(item));

  return filterArr.length !== 0 ? filterArr : [...baseSet];
}

class StateSubject<T extends { [key: string]: any }> {
  private _index: number = 0;

  private subscriberEntity: SubscriberEntity<T> = {};

  private _catchState: T | null = null;

  constructor(
    private _keys: (keyof T)[],
    private _shallowEqualKeys: (keyof T)[],
  ) { }

  subscribe(subscriber: Subscriber<T>, subscription: Subscription<T>) {
    const index = this._index++;
    const filterSubscription = filterSubscriptionUnite(this._keys, subscription);
    this.subscriberEntity[index] = {
      subscriber, subscription: filterSubscription
    }

    return () => {
      delete this.subscriberEntity[index];
    }
  }

  notifySubscriber(
    oldState: T | null,
    newState: T,
    subscriber: Subscriber<T>,
    subscription: Subscription<T>,
  ) {
    let different = false, state = {} as T;

    subscription.forEach(key => {
      state[key] = newState[key]

      if (!oldState ||
        (~this._shallowEqualKeys.indexOf(key)
          ? !shallowEqual(oldState[key], newState[key])
          : oldState[key] !== newState[key])
      ) {
        different = true
      }
    })

    if (different) {
      subscriber(state);
    }
  }

  notify(state: T) {
    Object.keys(this.subscriberEntity).forEach(key => {
      const entity = this.subscriberEntity[Number(key)];
      if (entity) {
        const { subscriber, subscription } = entity;
        this.notifySubscriber(this._catchState, state, subscriber, subscription);
      }
    })
    this._catchState = state;
  }
}

export default StateSubject;

