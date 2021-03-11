import { filterStateFn } from "../shared/StateSubject";
import shallowEqual from "./shallowEqual";


const shallowEqualKeys = ['errors'];

const filterFieldState: filterStateFn<any, any> = (
  state, lastState, diffItems, force
) => {
  const screened = {} as any
  let different = false;

  //筛选算法
  diffItems.forEach(key => {
    screened[key] = state[key];
    if (!lastState ||
      (shallowEqualKeys).includes(key)
      ? shallowEqual(state[key], lastState[key])
      : state[key] !== lastState[key]
    ) {
      different = true;
    }
  })

  return different || force ? screened : undefined
}

export default filterFieldState;
