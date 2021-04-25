class SafeObserver {
  destination: any;
  isUnsubscribed: any;
  _unsubscribe: any;

  constructor(destination: any) {
    this.destination = destination;
  }

  next(value: any) {
    const destination = this.destination;
    if (destination.next && !this.isUnsubscribed) {
      destination.next && destination.next(value);
    }
  }

  error(err: any) {
    const destination = this.destination;
    if (!this.isUnsubscribed) {
      if (destination.error) {
        destination.error(err);
      }
      this.unsubscribe();
    }
  }

  complete() {
    const destination = this.destination;
    if (!this.isUnsubscribed) {
      if (destination.complete) {
        destination.complete();
      }
      this.unsubscribe();
    }
  }

  unsubscribe() {
    this.isUnsubscribed = true;
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }

}

class Observable {
  _subscribe: any;

  constructor(_subscribe: any) {
    this._subscribe = _subscribe;
  }

  subscribe(observer: any) {
    const safeObserver = new SafeObserver(observer);
    safeObserver._unsubscribe = this._subscribe(safeObserver);
    return () => safeObserver.unsubscribe();
  }

}

export const toObservable = (r: any) => {
  return new Observable((observer: any) => {
    r.then((value: any) => {
      if(!observer.isUnsubscribed) {
        observer.next(value);
        observer.complete();
      }
    }, (err:any) => {
      return observer.error(err)
    })
  })
}