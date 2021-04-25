import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _WeakMap from '@babel/runtime-corejs3/core-js-stable/weak-map';

var _a = new _WeakMap();

var A = function A() {
  _classCallCheck(this, A);

  _a.set(this, {
    writable: true,
    value: 10
  });
};

_defineProperty(A, "AC", void 0);

var AC = function AC(a) {
  return 10;
};

A.AC = AC;
console.log(A);

export default A;
