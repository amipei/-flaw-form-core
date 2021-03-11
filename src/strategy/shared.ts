import { isPromise } from "../verify/utils";
import { Observable, from, isObservable } from "rxjs";

export function removeListItem<T>(list: T[], el: T): void {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
}
export function toObservable(r: any): Observable<any> {
  const obs = isPromise(r) ? from(r) : r;
  if (!isObservable(obs)) {
    throw new Error(`Expected validator to return Promise or Observable.`);
  }
  return obs;
}
