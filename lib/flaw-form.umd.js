'use strict';

var _classCallCheck = require('@babel/runtime-corejs3/helpers/classCallCheck');
var _defineProperty = require('@babel/runtime-corejs3/helpers/defineProperty');
var _WeakMap = require('@babel/runtime-corejs3/core-js-stable/weak-map');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _WeakMap__default = /*#__PURE__*/_interopDefaultLegacy(_WeakMap);

var _a = new _WeakMap__default['default']();

var A = function A() {
  _classCallCheck__default['default'](this, A);

  _a.set(this, {
    writable: true,
    value: 10
  });
};

_defineProperty__default['default'](A, "AC", void 0);

var AC = function AC(a) {
  return 10;
};

A.AC = AC;
console.log(A);

module.exports = A;
