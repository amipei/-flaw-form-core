'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$1 =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var $propertyIsEnumerable$1 = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$4 && !$propertyIsEnumerable$1.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
var f$7 = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$4(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$1;

var objectPropertyIsEnumerable = {
	f: f$7
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString$1 = {}.toString;

var classofRaw = function (it) {
  return toString$1.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject$1 = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject$1(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$1(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject$1(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject$1(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var hasOwnProperty = {}.hasOwnProperty;

var has$1 = function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};

var document$3 = global$1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject$1(document$3) && isObject$1(document$3.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$3.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
var f$6 = descriptors ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (has$1(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$6
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var path = {};

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var anObject = function (it) {
  if (!isObject$1(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty$1 = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
var f$5 = descriptors ? $defineProperty$1 : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return $defineProperty$1(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f$5
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;






var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof NativeConstructor) {
      switch (arguments.length) {
        case 0: return new NativeConstructor();
        case 1: return new NativeConstructor(a);
        case 2: return new NativeConstructor(a, b);
      } return new NativeConstructor(a, b, c);
    } return NativeConstructor.apply(this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL ? global$1 : STATIC ? global$1[TARGET] : (global$1[TARGET] || {}).prototype;

  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

  for (key in source) {
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && has$1(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$3(nativeSource, key);
      nativeProperty = descriptor && descriptor.value;
    } else nativeProperty = nativeSource[key];

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

    // bind timers to global for call from export context
    if (options.bind && USE_NATIVE) resultProperty = functionBindContext(sourceProperty, global$1);
    // wrap global constructors for prevent changs in this version
    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
    // make static versions for prototype methods
    else if (PROTO && typeof sourceProperty == 'function') resultProperty = functionBindContext(Function.call, sourceProperty);
    // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(resultProperty, 'sham', true);
    }

    target[key] = resultProperty;

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
      if (!has$1(path, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
      // export real prototype methods
      if (options.real && targetPrototype && !targetPrototype[key]) {
        createNonEnumerableProperty(targetPrototype, key, sourceProperty);
      }
    }
  }
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min$2 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min$2(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max$2 = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max$2(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$3 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$3(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$3(false)
};

var hiddenKeys$1 = {};

var indexOf$3 = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has$1(hiddenKeys$1, key) && has$1(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has$1(O, key = names[i++])) {
    ~indexOf$3(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty$6 = Object.defineProperty;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (descriptors && $assign({ b: 1 }, $assign(defineProperty$6({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$6(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
  assign: objectAssign
});

var assign$2 = path.Object.assign;

var assign$1 = assign$2;

var assign = assign$1;

var iterators = {};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global$1, key, value);
  } catch (error) {
    global$1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store$1 = global$1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store$1;

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap$1 = global$1.WeakMap;

var nativeWeakMap = typeof WeakMap$1 === 'function' && /native code/.test(inspectSource(WeakMap$1));

var isPure = true;

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.11.1',
  mode: 'pure' ,
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});
});

var id$1 = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id$1 + postfix).toString(36);
};

var keys$5 = shared('keys');

var sharedKey = function (key) {
  return keys$5[key] || (keys$5[key] = uid(key));
};

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global$1.WeakMap;
var set$4, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set$4(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$1(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap) {
  var store = sharedStore.state || (sharedStore.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set$4 = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys$1[STATE] = true;
  set$4 = function (it, metadata) {
    if (has$1(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has$1(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return has$1(it, STATE);
  };
}

var internalState = {
  set: set$4,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var correctPrototypeGetter = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype$1 = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has$1(O, IE_PROTO$1)) return O[IE_PROTO$1];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype$1 : null;
};

var engineIsNode = classofRaw(global$1.process) == 'process';

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global$1[namespace])
    : path[namespace] && path[namespace][method] || global$1[namespace] && global$1[namespace][method];
};

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process$3 = global$1.process;
var versions = process$3 && process$3.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // eslint-disable-next-line es/no-symbol -- required for testing
  return !Symbol.sham &&
    // Chrome 38 Symbol has incorrect toString conversion
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    (engineIsNode ? engineV8Version === 38 : engineV8Version > 37 && engineV8Version < 41);
});

/* eslint-disable es/no-symbol -- required for testing */

var useSymbolAsUid = nativeSymbol
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore$1 = shared('wks');
var Symbol$1 = global$1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has$1(WellKnownSymbolsStore$1, name) || !(nativeSymbol || typeof WellKnownSymbolsStore$1[name] == 'string')) {
    if (nativeSymbol && has$1(Symbol$1, name)) {
      WellKnownSymbolsStore$1[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore$1[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore$1[name];
};

var ITERATOR$4 = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

var returnThis$2 = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype$2 == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$4].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if ((NEW_ITERATOR_PROTOTYPE) && !has$1(IteratorPrototype$2, ITERATOR$4)) {
  createNonEnumerableProperty(IteratorPrototype$2, ITERATOR$4, returnThis$2);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var html = getBuiltIn('document', 'documentElement');

var GT = '>';
var LT = '<';
var PROTOTYPE$1 = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE$1][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys$1[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE$1] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$1] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG$3] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof = toStringTagSupport ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = toStringTagSupport ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

var defineProperty$5 = objectDefineProperty.f;





var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!has$1(target, TO_STRING_TAG$1)) {
      defineProperty$5(target, TO_STRING_TAG$1, { configurable: true, value: TAG });
    }
    if (SET_METHOD && !toStringTagSupport) {
      createNonEnumerableProperty(target, 'toString', objectToString);
    }
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





var returnThis$1 = function () { return this; };

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject$1(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};

/* eslint-disable no-proto -- safe */

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var redefine = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty(target, key, value);
};

var IteratorPrototype = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$3 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$3]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((FORCED) && IterablePrototype[ITERATOR$3] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$3, defaultIterator);
  }
  iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$6 = internalState.set;
var getInternalState$3 = internalState.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$6(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$3(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
iterators.Arguments = iterators.Array;

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

for (var COLLECTION_NAME in domIterables) {
  var Collection = global$1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  }
  iterators[COLLECTION_NAME] = iterators.Array;
}

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray$5 = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var SPECIES$5 = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray$5(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray$5(C.prototype))) C = undefined;
    else if (isObject$1(C)) {
      C = C[SPECIES$5];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod$2 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$2(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$2(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$2(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$2(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$2(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$2(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$2(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod$2(7)
};

var arrayMethodIsStrict = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};

var $forEach$1 = arrayIteration.forEach;


var STRICT_METHOD$2 = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
var arrayForEach = !STRICT_METHOD$2 ? function forEach(callbackfn /* , thisArg */) {
  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;

// `Array.prototype.forEach` method
// https://tc39.es/ecma262/#sec-array.prototype.foreach
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
  forEach: arrayForEach
});

var entryVirtual = function (CONSTRUCTOR) {
  return path[CONSTRUCTOR + 'Prototype'];
};

var forEach$5 = entryVirtual('Array').forEach;

var forEach$4 = forEach$5;

var ArrayPrototype$8 = Array.prototype;

var DOMIterables = {
  DOMTokenList: true,
  NodeList: true
};

var forEach_1 = function (it) {
  var own = it.forEach;
  return it === ArrayPrototype$8 || (it instanceof Array && own === ArrayPrototype$8.forEach)
    // eslint-disable-next-line no-prototype-builtins -- safe
    || DOMIterables.hasOwnProperty(classof(it)) ? forEach$4 : own;
};

var forEach$3 = forEach_1;

var FAILS_ON_PRIMITIVES$3 = fails(function () { objectKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$3 }, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
});

var keys$4 = path.Object.keys;

var keys$3 = keys$4;

var keys$2 = keys$3;

// `Array.isArray` method
// https://tc39.es/ecma262/#sec-array.isarray
_export({ target: 'Array', stat: true }, {
  isArray: isArray$5
});

var isArray$4 = path.Array.isArray;

var isArray$3 = isArray$4;

var isArray$2 = isArray$3;

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};

var SPECIES$4 = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return engineV8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$4] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject$1(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray$5(O);
};

var FORCED$3 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
_export({ target: 'Array', proto: true, forced: FORCED$3 }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

/* eslint-disable es/no-object-getownpropertynames -- safe */

var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames$1(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var f$2 = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : $getOwnPropertyNames$1(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
	f: f$2
};

var f$1 = wellKnownSymbol;

var wellKnownSymbolWrapped = {
	f: f$1
};

var defineProperty$4 = objectDefineProperty.f;

var defineWellKnownSymbol = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has$1(Symbol, NAME)) defineProperty$4(Symbol, NAME, {
    value: wellKnownSymbolWrapped.f(NAME)
  });
};

var $forEach = arrayIteration.forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState$5 = internalState.set;
var getInternalState$2 = internalState.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global$1.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var nativeDefineProperty = objectDefineProperty.f;
var nativeGetOwnPropertyNames = objectGetOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = objectPropertyIsEnumerable.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global$1.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = descriptors && fails(function () {
  return objectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap$1 = function (tag, description) {
  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE]);
  setInternalState$5(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!descriptors) symbol.description = description;
  return symbol;
};

var isSymbol = useSymbolAsUid ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has$1(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has$1(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has$1(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has$1(AllSymbols, P) && !has$1(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has$1(this, P) || !has$1(AllSymbols, P) || has$1(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has$1(AllSymbols, key) && !has$1(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
  if (descriptor && has$1(AllSymbols, key) && !(has$1(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has$1(AllSymbols, key) && !has$1(hiddenKeys$1, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has$1(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has$1(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!nativeSymbol) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has$1(this, HIDDEN) && has$1(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap$1(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState$2(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap$1(uid(description), description);
  });

  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
  objectDefineProperty.f = $defineProperty;
  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

  wellKnownSymbolWrapped.f = function (name) {
    return wrap$1(wellKnownSymbol(name), name);
  };

  if (descriptors) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState$2(this).description;
      }
    });
  }
}

_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has$1(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has$1(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return objectGetOwnPropertySymbols.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject$1(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray$5(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys$1[HIDDEN] = true;

// `Symbol.asyncIterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.asynciterator
defineWellKnownSymbol('asyncIterator');

// `Symbol.hasInstance` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.hasinstance
defineWellKnownSymbol('hasInstance');

// `Symbol.isConcatSpreadable` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
defineWellKnownSymbol('isConcatSpreadable');

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');

// `Symbol.match` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.match
defineWellKnownSymbol('match');

// `Symbol.matchAll` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.matchall
defineWellKnownSymbol('matchAll');

// `Symbol.replace` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.replace
defineWellKnownSymbol('replace');

// `Symbol.search` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.search
defineWellKnownSymbol('search');

// `Symbol.species` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.species
defineWellKnownSymbol('species');

// `Symbol.split` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.split
defineWellKnownSymbol('split');

// `Symbol.toPrimitive` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.toprimitive
defineWellKnownSymbol('toPrimitive');

// `Symbol.toStringTag` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.tostringtag
defineWellKnownSymbol('toStringTag');

// `Symbol.unscopables` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.unscopables
defineWellKnownSymbol('unscopables');

// JSON[@@toStringTag] property
// https://tc39.es/ecma262/#sec-json-@@tostringtag
setToStringTag(global$1.JSON, 'JSON', true);

var symbol$2 = path.Symbol;

// `Symbol.asyncDispose` well-known symbol
// https://github.com/tc39/proposal-using-statement
defineWellKnownSymbol('asyncDispose');

// `Symbol.dispose` well-known symbol
// https://github.com/tc39/proposal-using-statement
defineWellKnownSymbol('dispose');

// `Symbol.observable` well-known symbol
// https://github.com/tc39/proposal-observable
defineWellKnownSymbol('observable');

// `Symbol.patternMatch` well-known symbol
// https://github.com/tc39/proposal-pattern-matching
defineWellKnownSymbol('patternMatch');

// TODO: remove from `core-js@4`


defineWellKnownSymbol('replaceAll');

// TODO: Remove from `core-js@4`


var symbol$1 = symbol$2;

var symbol = symbol$1;

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};

var charAt = stringMultibyte.charAt;



var STRING_ITERATOR = 'String Iterator';
var setInternalState$4 = internalState.set;
var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$4(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$1(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});

var iterator$2 = wellKnownSymbolWrapped.f('iterator');

var iterator$1 = iterator$2;

var iterator = iterator$1;

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof symbol === "function" && typeof iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof symbol === "function" && obj.constructor === symbol && obj !== symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var keys$1 = keys$4;

var keys = keys$1;

var getOwnPropertySymbols$2 = path.Object.getOwnPropertySymbols;

var getOwnPropertySymbols$1 = getOwnPropertySymbols$2;

var getOwnPropertySymbols = getOwnPropertySymbols$1;

var $filter = arrayIteration.filter;


var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var filter$4 = entryVirtual('Array').filter;

var ArrayPrototype$7 = Array.prototype;

var filter_1 = function (it) {
  var own = it.filter;
  return it === ArrayPrototype$7 || (it instanceof Array && own === ArrayPrototype$7.filter) ? filter$4 : own;
};

var filter$3 = filter_1;

var filter$2 = filter$3;

var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;


var FAILS_ON_PRIMITIVES$2 = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED$2 = !descriptors || FAILS_ON_PRIMITIVES$2;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
_export({ target: 'Object', stat: true, forced: FORCED$2, sham: !descriptors }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});

var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
var Object = path.Object;

var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
  return Object.getOwnPropertyDescriptor(it, key);
};

if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
});

var getOwnPropertyDescriptor$2 = getOwnPropertyDescriptor_1;

var getOwnPropertyDescriptor$1 = getOwnPropertyDescriptor$2;

var forEach$2 = forEach_1;

var forEach$1 = forEach$2;

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
_export({ target: 'Object', stat: true, sham: !descriptors }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var keys = ownKeys$1(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});

var getOwnPropertyDescriptors$2 = path.Object.getOwnPropertyDescriptors;

var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors$2;

var getOwnPropertyDescriptors = getOwnPropertyDescriptors$1;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
  defineProperties: objectDefineProperties
});

var defineProperties_1 = createCommonjsModule(function (module) {
var Object = path.Object;

var defineProperties = module.exports = function defineProperties(T, D) {
  return Object.defineProperties(T, D);
};

if (Object.defineProperties.sham) defineProperties.sham = true;
});

var defineProperties$1 = defineProperties_1;

var defineProperties = defineProperties$1;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
  defineProperty: objectDefineProperty.f
});

var defineProperty_1 = createCommonjsModule(function (module) {
var Object = path.Object;

var defineProperty = module.exports = function defineProperty(it, key, desc) {
  return Object.defineProperty(it, key, desc);
};

if (Object.defineProperty.sham) defineProperty.sham = true;
});

var defineProperty$3 = defineProperty_1;

var defineProperty$2 = defineProperty$3;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    defineProperty$2(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys$1 = keys(object);

  if (getOwnPropertySymbols) {
    var symbols = getOwnPropertySymbols(object);

    if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) {
      return getOwnPropertyDescriptor$1(object, sym).enumerable;
    });
    keys$1.push.apply(keys$1, symbols);
  }

  return keys$1;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      var _context;

      forEach$1(_context = ownKeys(Object(source), true)).call(_context, function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (getOwnPropertyDescriptors) {
      defineProperties(target, getOwnPropertyDescriptors(source));
    } else {
      var _context2;

      forEach$1(_context2 = ownKeys(Object(source))).call(_context2, function (key) {
        defineProperty$2(target, key, getOwnPropertyDescriptor$1(source, key));
      });
    }
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    defineProperty$2(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
_export({ target: 'Object', stat: true, sham: !descriptors }, {
  create: objectCreate
});

var Object$1 = path.Object;

var create$2 = function create(P, D) {
  return Object$1.create(P, D);
};

var create$1 = create$2;

var create = create$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
_export({ target: 'Object', stat: true }, {
  setPrototypeOf: objectSetPrototypeOf
});

var setPrototypeOf$2 = path.Object.setPrototypeOf;

var setPrototypeOf$1 = setPrototypeOf$2;

var setPrototypeOf = setPrototypeOf$1;

function _setPrototypeOf(o, p) {
  _setPrototypeOf = setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

var slice$4 = [].slice;
var factories = {};

var construct$3 = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
var functionBind = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction$1(this);
  var partArgs = slice$4.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice$4.call(arguments));
    return this instanceof boundFunction ? construct$3(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject$1(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};

var nativeConstruct = getBuiltIn('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED$1 = NEW_TARGET_BUG || ARGS_BUG;

_export({ target: 'Reflect', stat: true, forced: FORCED$1, sham: FORCED$1 }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction$1(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction$1(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (functionBind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = objectCreate(isObject$1(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject$1(result) ? result : instance;
  }
});

var construct$2 = path.Reflect.construct;

var construct$1 = construct$2;

var construct = construct$1;

var FAILS_ON_PRIMITIVES$1 = fails(function () { objectGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !correctPrototypeGetter }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return objectGetPrototypeOf(toObject(it));
  }
});

var getPrototypeOf$2 = path.Object.getPrototypeOf;

var getPrototypeOf$1 = getPrototypeOf$2;

var getPrototypeOf = getPrototypeOf$1;

function _getPrototypeOf(o) {
  _getPrototypeOf = setPrototypeOf ? getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !construct) return false;
  if (construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");
  return _classApplyDescriptorGet(receiver, descriptor);
}

var redefineAll = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else redefine(target, key, src[key], options);
  } return target;
};

var freezing = !fails(function () {
  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  return Object.isExtensible(Object.preventExtensions({}));
});

var internalMetadata = createCommonjsModule(function (module) {
var defineProperty = objectDefineProperty.f;



var METADATA = uid('meta');
var id = 0;

// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject$1(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has$1(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has$1(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (freezing && meta.REQUIRED && isExtensible(it) && !has$1(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

hiddenKeys$1[METADATA] = true;
});

var ITERATOR$2 = wellKnownSymbol('iterator');
var ArrayPrototype$6 = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype$6[ITERATOR$2] === it);
};

var ITERATOR$1 = wellKnownSymbol('iterator');

var getIteratorMethod$1 = function (it) {
  if (it != undefined) return it[ITERATOR$1]
    || it['@@iterator']
    || iterators[classof(it)];
};

var iteratorClose = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = functionBindContext(unboundFunction, that, 1 + AS_ENTRIES + INTERRUPTED);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$1(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && result instanceof Result) return result;
      } return new Result(false);
    }
    iterator = iterFn.call(iterable);
  }

  next = iterator.next;
  while (!(step = next.call(iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator);
      throw error;
    }
    if (typeof result == 'object' && result && result instanceof Result) return result;
  } return new Result(false);
};

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};

var defineProperty$1 = objectDefineProperty.f;
var forEach = arrayIteration.forEach;



var setInternalState$3 = internalState.set;
var internalStateGetterFor$2 = internalState.getterFor;

var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
  var ADDER = IS_MAP ? 'set' : 'add';
  var NativeConstructor = global$1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var exported = {};
  var Constructor;

  if (!descriptors || typeof NativeConstructor != 'function'
    || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))
  ) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else {
    Constructor = wrapper(function (target, iterable) {
      setInternalState$3(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
        type: CONSTRUCTOR_NAME,
        collection: new NativeConstructor()
      });
      if (iterable != undefined) iterate(iterable, target[ADDER], { that: target, AS_ENTRIES: IS_MAP });
    });

    var getInternalState = internalStateGetterFor$2(CONSTRUCTOR_NAME);

    forEach(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) {
        createNonEnumerableProperty(Constructor.prototype, KEY, function (a, b) {
          var collection = getInternalState(this).collection;
          if (!IS_ADDER && IS_WEAK && !isObject$1(a)) return KEY == 'get' ? undefined : false;
          var result = collection[KEY](a === 0 ? 0 : a, b);
          return IS_ADDER ? this : result;
        });
      }
    });

    IS_WEAK || defineProperty$1(Constructor.prototype, 'size', {
      configurable: true,
      get: function () {
        return getInternalState(this).collection.size;
      }
    });
  }

  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);

  exported[CONSTRUCTOR_NAME] = Constructor;
  _export({ global: true, forced: true }, exported);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};

var getWeakData = internalMetadata.getWeakData;








var setInternalState$2 = internalState.set;
var internalStateGetterFor$1 = internalState.getterFor;
var find = arrayIteration.find;
var findIndex = arrayIteration.findIndex;
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return find(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = findIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

var collectionWeak = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$2(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject$1(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && has$1(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject$1(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && has$1(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject$1(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};

createCommonjsModule(function (module) {






var enforceIternalState = internalState.enforce;


var IS_IE11 = !global$1.ActiveXObject && 'ActiveXObject' in global$1;
// eslint-disable-next-line es/no-object-isextensible -- safe
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (init) {
  return function WeakMap() {
    return init(this, arguments.length ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.es/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (nativeWeakMap && IS_IE11) {
  InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
  internalMetadata.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject$1(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject$1(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject$1(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject$1(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}
});

var weakMap$2 = path.WeakMap;

var weakMap$1 = weakMap$2;

var weakMap = weakMap$1;

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");
  _classApplyDescriptorSet(receiver, descriptor, value);
  return value;
}

var $includes = arrayIncludes.includes;


// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
_export({ target: 'Array', proto: true }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var includes$4 = entryVirtual('Array').includes;

var MATCH$1 = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$1(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};

var MATCH = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

var includes$3 = entryVirtual('String').includes;

var ArrayPrototype$5 = Array.prototype;
var StringPrototype = String.prototype;

var includes$2 = function (it) {
  var own = it.includes;
  if (it === ArrayPrototype$5 || (it instanceof Array && own === ArrayPrototype$5.includes)) return includes$4;
  if (typeof it === 'string' || it === StringPrototype || (it instanceof String && own === StringPrototype.includes)) {
    return includes$3;
  } return own;
};

var includes$1 = includes$2;

var includes = includes$1;

var isArray$1 = isArray$4;

var isArray = isArray$1;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (isArray(arr)) return _arrayLikeToArray(arr);
}

var getIteratorMethod_1 = getIteratorMethod$1;

var getIteratorMethod = getIteratorMethod_1;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    iteratorClose(iterator);
    throw error;
  }
};

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod$1(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = functionBindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var INCORRECT_ITERATION$1 = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
_export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION$1 }, {
  from: arrayFrom
});

var from$4 = path.Array.from;

var from$3 = from$4;

var from$2 = from$3;

function _iterableToArray(iter) {
  if (typeof symbol !== "undefined" && getIteratorMethod(iter) != null || iter["@@iterator"] != null) return from$2(iter);
}

var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');

var SPECIES$3 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray$5(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray$5(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject$1(Constructor)) {
        Constructor = Constructor[SPECIES$3];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});

var slice$3 = entryVirtual('Array').slice;

var ArrayPrototype$4 = Array.prototype;

var slice_1 = function (it) {
  var own = it.slice;
  return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.slice) ? slice$3 : own;
};

var slice$2 = slice_1;

var slice$1 = slice$2;

function _unsupportedIterableToArray(o, minLen) {
  var _context;

  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);

  var n = slice$1(_context = Object.prototype.toString.call(o)).call(_context, 8, -1);

  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return from$2(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

var SPECIES$2 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$2]) {
    defineProperty(Constructor, SPECIES$2, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var defineProperty = objectDefineProperty.f;








var fastKey = internalMetadata.fastKey;


var setInternalState$1 = internalState.set;
var internalStateGetterFor = internalState.getterFor;

var collectionStrong = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$1(that, {
        type: CONSTRUCTOR_NAME,
        index: objectCreate(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!descriptors) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP });
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (descriptors) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (descriptors) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (descriptors) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (descriptors) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState$1(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};

// `Set` constructor
// https://tc39.es/ecma262/#sec-set-objects
collection('Set', function (init) {
  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

var set$3 = path.Set;

var set$2 = set$3;

var set$1 = set$2;

var filter$1 = filter_1;

var filter = filter$1;

/* eslint-disable es/no-array-prototype-indexof -- required for testing */

var $indexOf = arrayIncludes.indexOf;


var nativeIndexOf = [].indexOf;

var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var STRICT_METHOD$1 = arrayMethodIsStrict('indexOf');

// `Array.prototype.indexOf` method
// https://tc39.es/ecma262/#sec-array.prototype.indexof
_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$1 }, {
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? nativeIndexOf.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var indexOf$2 = entryVirtual('Array').indexOf;

var ArrayPrototype$3 = Array.prototype;

var indexOf_1 = function (it) {
  var own = it.indexOf;
  return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.indexOf) ? indexOf$2 : own;
};

var indexOf$1 = indexOf_1;

var indexOf = indexOf$1;

// `Function.prototype.bind` method
// https://tc39.es/ecma262/#sec-function.prototype.bind
_export({ target: 'Function', proto: true }, {
  bind: functionBind
});

var bind$3 = entryVirtual('Function').bind;

var FunctionPrototype = Function.prototype;

var bind_1 = function (it) {
  var own = it.bind;
  return it === FunctionPrototype || (it instanceof Function && own === FunctionPrototype.bind) ? bind$3 : own;
};

var bind$2 = bind_1;

var bind$1 = bind$2;

var shallowEqual = function shallowEqual(a, b) {
  var _context;

  if (a === b) {
    return true;
  }

  if (_typeof(a) !== 'object' || !a || _typeof(b) !== 'object' || !b) {
    return false;
  }

  var keysA = keys$2(a);

  var keysB = keys$2(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = bind$1(_context = Object.prototype.hasOwnProperty).call(_context, b);

  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key) || a[key] !== b[key]) {
      return false;
    }
  }

  return true;
};

/**
 * 筛选 a (default) 和 b () 的交集
 * @param defaultArr 
 * @param filterArr 
 * @returns 
 */
var filterSubscriptionUnite = function filterSubscriptionUnite(baseArr, compareArr) {
  var _context;

  var baseSet = new set$1(baseArr);
  var compareSet = new set$1(compareArr);

  var filterArr = filter(_context = _toConsumableArray(baseSet)).call(_context, function (item) {
    return compareSet.has(item);
  });

  return filterArr.length !== 0 ? filterArr : _toConsumableArray(baseSet);
};

var StateSubject = /*#__PURE__*/function () {
  function StateSubject(_keys, _shallowEqualKeys) {
    _classCallCheck(this, StateSubject);

    this._keys = _keys;
    this._shallowEqualKeys = _shallowEqualKeys;

    _defineProperty(this, "_index", 0);

    _defineProperty(this, "subscriberEntity", {});

    _defineProperty(this, "_catchState", null);
  }

  _createClass(StateSubject, [{
    key: "subscribe",
    value: function subscribe(subscriber, subscription) {
      var _this = this;

      var index = this._index++;
      var filterSubscription = filterSubscriptionUnite(this._keys, subscription);
      this.subscriberEntity[index] = {
        subscriber: subscriber,
        subscription: filterSubscription
      };
      return function () {
        delete _this.subscriberEntity[index];
      };
    }
  }, {
    key: "notifySubscriber",
    value: function notifySubscriber(oldState, newState, subscriber, subscription) {
      var _this2 = this;

      var different = false,
          state = {};

      forEach$3(subscription).call(subscription, function (key) {
        var _context2;

        state[key] = newState[key];

        if (!oldState || (~indexOf(_context2 = _this2._shallowEqualKeys).call(_context2, key) ? !shallowEqual(oldState[key], newState[key]) : oldState[key] !== newState[key])) {
          different = true;
        }
      });

      if (different) {
        subscriber(state);
      }
    }
  }, {
    key: "notify",
    value: function notify(state) {
      var _context3,
          _this3 = this;

      forEach$3(_context3 = keys$2(this.subscriberEntity)).call(_context3, function (key) {
        var entity = _this3.subscriberEntity[Number(key)];

        if (entity) {
          var subscriber = entity.subscriber,
              subscription = entity.subscription;

          _this3.notifySubscriber(_this3._catchState, state, subscriber, subscription);
        }
      });

      this._catchState = state;
    }
  }]);

  return StateSubject;
}();

var $AggregateError = function AggregateError(errors, message) {
  var that = this;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);
  if (objectSetPrototypeOf) {
    // eslint-disable-next-line unicorn/error-message -- expected
    that = objectSetPrototypeOf(new Error(undefined), objectGetPrototypeOf(that));
  }
  if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
  var errorsArray = [];
  iterate(errors, errorsArray.push, { that: errorsArray });
  createNonEnumerableProperty(that, 'errors', errorsArray);
  return that;
};

$AggregateError.prototype = objectCreate(Error.prototype, {
  constructor: createPropertyDescriptor(5, $AggregateError),
  message: createPropertyDescriptor(5, ''),
  name: createPropertyDescriptor(5, 'AggregateError')
});

// `AggregateError` constructor
// https://tc39.es/ecma262/#sec-aggregate-error-constructor
_export({ global: true }, {
  AggregateError: $AggregateError
});

var nativePromiseConstructor = global$1.Promise;

var SPECIES$1 = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$1]) == undefined ? defaultConstructor : aFunction$1(S);
};

var engineIsIos = /(?:iphone|ipod|ipad).*applewebkit/i.test(engineUserAgent);

var location = global$1.location;
var set = global$1.setImmediate;
var clear = global$1.clearImmediate;
var process$2 = global$1.process;
var MessageChannel = global$1.MessageChannel;
var Dispatch = global$1.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function (id) {
  // eslint-disable-next-line no-prototype-builtins -- safe
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$1.postMessage(id + '', location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (engineIsNode) {
    defer = function (id) {
      process$2.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !engineIsIos) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = functionBindContext(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$1.addEventListener &&
    typeof postMessage == 'function' &&
    !global$1.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global$1.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
    defer = function (id) {
      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set,
  clear: clear
};

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(engineUserAgent);

var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;




var MutationObserver = global$1.MutationObserver || global$1.WebKitMutationObserver;
var document$2 = global$1.document;
var process$1 = global$1.process;
var Promise$1 = global$1.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global$1, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify$1, toggle, node, promise$5, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (engineIsNode && (parent = process$1.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify$1();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!engineIsIos && !engineIsNode && !engineIsWebosWebkit && MutationObserver && document$2) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise$5 = Promise$1.resolve(undefined);
    then = promise$5.then;
    notify$1 = function () {
      then.call(promise$5, flush);
    };
  // Node.js without promises
  } else if (engineIsNode) {
    notify$1 = function () {
      process$1.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify$1 = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global$1, flush);
    };
  }
}

var microtask = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify$1();
  } last = task;
};

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction$1(resolve);
  this.reject = aFunction$1(reject);
};

// 25.4.1.5 NewPromiseCapability(C)
var f = function (C) {
  return new PromiseCapability(C);
};

var newPromiseCapability$1 = {
	f: f
};

var promiseResolve = function (C, x) {
  anObject(C);
  if (isObject$1(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability$1.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var hostReportErrors = function (a, b) {
  var console = global$1.console;
  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

var perform = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var task = task$1.set;











var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = internalState.get;
var setInternalState = internalState.set;
var getInternalPromiseState = internalState.getterFor(PROMISE);
nativePromiseConstructor && nativePromiseConstructor.prototype;
var PromiseConstructor = nativePromiseConstructor;
var TypeError$1 = global$1.TypeError;
var document$1 = global$1.document;
var process = global$1.process;
var newPromiseCapability = newPromiseCapability$1.f;
var newGenericPromiseCapability = newPromiseCapability;
var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$1.dispatchEvent);
var NATIVE_REJECTION_EVENT = typeof PromiseRejectionEvent == 'function';
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper;

var FORCED = isForced_1(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (engineV8Version === 66) return true;
    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    if (!engineIsNode && !NATIVE_REJECTION_EVENT) return true;
  }
  // We need Promise#finally in the pure version for preventing prototype pollution
  if (!PromiseConstructor.prototype['finally']) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (engineV8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
  // Detect correctness of subclassing with @@species support
  var promise = PromiseConstructor.resolve(1);
  var FakePromise = function (exec) {
    exec(function () { /* empty */ }, function () { /* empty */ });
  };
  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
});

var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
});

// helpers
var isThenable = function (it) {
  var then;
  return isObject$1(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0;
    // variable length - can't use forEach
    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state);
            state.rejection = HANDLED;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // can throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError$1('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }
    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$1.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_REJECTION_EVENT && (handler = global$1['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  task.call(global$1, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (engineIsNode) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = engineIsNode || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  task.call(global$1, function () {
    var promise = state.facade;
    if (engineIsNode) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError$1("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          then.call(value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction$1(executor);
    Internal.call(this);
    var state = getInternalState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };
  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.es/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = engineIsNode ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };
  newPromiseCapability$1.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

_export({ global: true, wrap: true, forced: FORCED }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);

PromiseWrapper = getBuiltIn(PROMISE);

// statics
_export({ target: PROMISE, stat: true, forced: FORCED }, {
  // `Promise.reject` method
  // https://tc39.es/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});

_export({ target: PROMISE, stat: true, forced: isPure  }, {
  // `Promise.resolve` method
  // https://tc39.es/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});

_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
  // `Promise.all` method
  // https://tc39.es/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.es/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction$1(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

// `Promise.allSettled` method
// https://tc39.es/ecma262/#sec-promise.allsettled
_export({ target: 'Promise', stat: true }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapability$1.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction$1(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'fulfilled', value: value };
          --remaining || resolve(values);
        }, function (error) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = { status: 'rejected', reason: error };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var PROMISE_ANY_ERROR = 'No one promise resolved';

// `Promise.any` method
// https://tc39.es/ecma262/#sec-promise.any
_export({ target: 'Promise', stat: true }, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapability$1.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction$1(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (error) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

// Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
var NON_GENERIC = !!nativePromiseConstructor && fails(function () {
  nativePromiseConstructor.prototype['finally'].call({ then: function () { /* empty */ } }, function () { /* empty */ });
});

// `Promise.prototype.finally` method
// https://tc39.es/ecma262/#sec-promise.prototype.finally
_export({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
  'finally': function (onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(
      isFunction ? function (x) {
        return promiseResolve(C, onFinally()).then(function () { return x; });
      } : onFinally,
      isFunction ? function (e) {
        return promiseResolve(C, onFinally()).then(function () { throw e; });
      } : onFinally
    );
  }
});

var promise$4 = path.Promise;

// `Promise.try` method
// https://github.com/tc39/proposal-promise-try
_export({ target: 'Promise', stat: true }, {
  'try': function (callbackfn) {
    var promiseCapability = newPromiseCapability$1.f(this);
    var result = perform(callbackfn);
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  }
});

// TODO: Remove from `core-js@4`




var promise$3 = promise$4;

var promise$2 = promise$3;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    promise$2.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new promise$2(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof symbol !== "undefined" && getIteratorMethod(o) || o["@@iterator"];

  if (!it) {
    if (isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var asyncIterator$2 = wellKnownSymbolWrapped.f('asyncIterator');

var asyncIterator$1 = asyncIterator$2;

var asyncIterator = asyncIterator$1;

function _asyncIterator(iterable) {
  var method;

  if (typeof symbol !== "undefined") {
    if (asyncIterator) method = iterable[asyncIterator];
    if (method == null && iterator) method = getIteratorMethod(iterable);
  }

  if (method == null) method = iterable["@@asyncIterator"];
  if (method == null) method = iterable["@@iterator"];
  if (method == null) throw new TypeError("Object is not async iterable");
  return method.call(iterable);
}

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime_1 = createCommonjsModule(function (module) {
var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

var promise$1 = promise$4;

var promise = promise$1;

var $map = arrayIteration.map;


var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var map$5 = entryVirtual('Array').map;

var ArrayPrototype$2 = Array.prototype;

var map_1 = function (it) {
  var own = it.map;
  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.map) ? map$5 : own;
};

var map$4 = map_1;

var map$3 = map$4;

// `Map` constructor
// https://tc39.es/ecma262/#sec-map-objects
collection('Map', function (init) {
  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
}, collectionStrong);

var map$2 = path.Map;

var map$1 = map$2;

var map = map$1;

var from$1 = from$4;

var from = from$1;

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }
    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else delete O[to];
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var splice$2 = entryVirtual('Array').splice;

var ArrayPrototype$1 = Array.prototype;

var splice_1 = function (it) {
  var own = it.splice;
  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.splice) ? splice$2 : own;
};

var splice$1 = splice_1;

var splice = splice$1;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

var $reduce = arrayReduce.left;




var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !engineIsNode && engineV8Version > 79 && engineV8Version < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
_export({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var reduce$2 = entryVirtual('Array').reduce;

var ArrayPrototype = Array.prototype;

var reduce_1 = function (it) {
  var own = it.reduce;
  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.reduce) ? reduce$2 : own;
};

var reduce$1 = reduce_1;

var reduce = reduce$1;

function removeListItem(list, el) {
  var index = indexOf(list).call(list, el);

  if (index > -1) splice(list).call(list, index, 1);
}
var isObject = function isObject(value) {
  var type = _typeof(value);

  return value != null && (type == 'object' || type == 'function');
};
var isFunction = function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }

  return Object.prototype.toString.call(value) == '[object Function]';
};
var omit = function omit(obj, uselessKeys) {
  var _context;

  return reduce(_context = keys$2(obj)).call(_context, function (acc, key) {
    return includes(uselessKeys).call(uselessKeys, key) ? acc : _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty({}, key, obj[key]));
  }, {});
};

var SafeObserver = /*#__PURE__*/function () {
  function SafeObserver(destination) {
    _classCallCheck(this, SafeObserver);

    _defineProperty(this, "destination", void 0);

    _defineProperty(this, "isUnsubscribed", void 0);

    _defineProperty(this, "_unsubscribe", void 0);

    this.destination = destination;
  }

  _createClass(SafeObserver, [{
    key: "next",
    value: function next(value) {
      var destination = this.destination;

      if (destination.next && !this.isUnsubscribed) {
        destination.next && destination.next(value);
      }
    }
  }, {
    key: "error",
    value: function error(err) {
      var destination = this.destination;

      if (!this.isUnsubscribed) {
        if (destination.error) {
          destination.error(err);
        }

        this.unsubscribe();
      }
    }
  }, {
    key: "complete",
    value: function complete() {
      var destination = this.destination;

      if (!this.isUnsubscribed) {
        if (destination.complete) {
          destination.complete();
        }

        this.unsubscribe();
      }
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe() {
      this.isUnsubscribed = true;

      if (this._unsubscribe) {
        this._unsubscribe();
      }
    }
  }]);

  return SafeObserver;
}();

var Observable = /*#__PURE__*/function () {
  function Observable(_subscribe) {
    _classCallCheck(this, Observable);

    _defineProperty(this, "_subscribe", void 0);

    this._subscribe = _subscribe;
  }

  _createClass(Observable, [{
    key: "subscribe",
    value: function subscribe(observer) {
      var safeObserver = new SafeObserver(observer);
      safeObserver._unsubscribe = this._subscribe(safeObserver);
      return function () {
        return safeObserver.unsubscribe();
      };
    }
  }]);

  return Observable;
}();

var toObservable = function toObservable(r) {
  return new Observable(function (observer) {
    r.then(function (value) {
      if (!observer.isUnsubscribed) {
        observer.next(value);
        observer.complete();
      }
    }, function (err) {
      return observer.error(err);
    });
  });
};

var validate = function validate(context, validators) {
  var errors = {};

  forEach$3(validators).call(validators, function (validator) {
    return assign(errors, validator(context));
  });

  return keys$2(errors).length ? errors : null;
};
var validateFirst = function validateFirst(context, validators) {
  var _iterator2 = _createForOfIteratorHelper(validators),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var validator = _step2.value;
      var result = validator(context);
      if (result) return result;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return null;
};
var asyncValidate = function asyncValidate(context, validators) {
  //let cancelFn;
  var resultPromise = new promise(function (resolve, reject) {
    //cancelFn = () => reject(null);
    promise.allSettled(map$3(validators).call(validators, function (validator) {
      return validator(context);
    })).then(function (results) {
      var errors = {};

      forEach$3(results).call(results, function (result) {
        if (result.status === 'fulfilled' && result.value !== null) {
          assign(errors, result.value);
        }
      });

      keys$2(errors).length === 0 ? resolve(null) : resolve(errors);
    });
  });
  return resultPromise; //resultPromise.then(cb);
  //return cancelFn;
};
var asyncValidateFirst = function asyncValidateFirst(context, validators) {
  //let cancelFn;
  var resultPromise = new promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(resolve, reject) {
      var validatorsPromise, errors, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, error;

      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //cancelFn = () => reject(null);
              validatorsPromise = map$3(validators).call(validators, function (validator) {
                return validator(context);
              });
              errors = null;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _context.prev = 4;
              _iterator = _asyncIterator(validatorsPromise);

            case 6:
              _context.next = 8;
              return _iterator.next();

            case 8:
              _step = _context.sent;
              _iteratorNormalCompletion = _step.done;
              _context.next = 12;
              return _step.value;

            case 12:
              _value = _context.sent;

              if (_iteratorNormalCompletion) {
                _context.next = 21;
                break;
              }

              error = _value;

              if (!error) {
                _context.next = 18;
                break;
              }

              errors = error;
              return _context.abrupt("break", 21);

            case 18:
              _iteratorNormalCompletion = true;
              _context.next = 6;
              break;

            case 21:
              _context.next = 27;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](4);
              _didIteratorError = true;
              _iteratorError = _context.t0;

            case 27:
              _context.prev = 27;
              _context.prev = 28;

              if (!(!_iteratorNormalCompletion && _iterator.return != null)) {
                _context.next = 32;
                break;
              }

              _context.next = 32;
              return _iterator.return();

            case 32:
              _context.prev = 32;

              if (!_didIteratorError) {
                _context.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context.finish(32);

            case 36:
              return _context.finish(27);

            case 37:
              resolve(errors);

            case 38:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 23, 27, 37], [28,, 32, 36]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  return resultPromise; //resultPromise.then(cb);
  //return cancelFn;
};
/**
 * @description
 * 定义验证程序失败返回的结果格式。(结果应该是一个普通对象)
 * 
 * @publicApi
 */

var _validatorMap = new weakMap();

var _asyncValidatorMap = new weakMap();

var _defaultTrigger = new weakMap();

var _asyncSubscription = new weakMap();

/**
 * 内部实现的校验程序
 */
var Validator_ = /*#__PURE__*/function () {
  /**
   * 存储同步校验器的Map
   */

  /**
   * 存储异步校验器的Map
   */

  /**
   * 存储默认的触发条件
   */
  function Validator_(validators, asyncValidators, defaultTrigger) {
    _classCallCheck(this, Validator_);

    _validatorMap.set(this, {
      writable: true,
      value: void 0
    });

    _asyncValidatorMap.set(this, {
      writable: true,
      value: void 0
    });

    _defaultTrigger.set(this, {
      writable: true,
      value: void 0
    });

    _asyncSubscription.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _defaultTrigger, defaultTrigger);

    _classPrivateFieldSet(this, _validatorMap, this._coerceToValidatorMap(validators));

    _classPrivateFieldSet(this, _asyncValidatorMap, this._coerceToValidatorMap(asyncValidators));
  }

  _createClass(Validator_, [{
    key: "run",
    value: function run(control, subscriber, options) {
      if (_classPrivateFieldGet(this, _asyncSubscription)) {
        _classPrivateFieldGet(this, _asyncSubscription).call(this);

        _classPrivateFieldSet(this, _asyncSubscription, null);
      } //检查是否存在同步校验器


      if (_classPrivateFieldGet(this, _validatorMap).size) {
        var filterValidors = this._filterByTrigger(_classPrivateFieldGet(this, _validatorMap), options.trigger);

        var errors = options.validationAll ? validate(control, filterValidors) : validateFirst(control, filterValidors);

        if (errors) {
          subscriber(errors);
          return;
        }
      }

      if (_classPrivateFieldGet(this, _asyncValidatorMap).size) {
        var _filterValidors = this._filterByTrigger(_classPrivateFieldGet(this, _asyncValidatorMap), options.trigger);

        var result = options.validationAll ? asyncValidate(control, _filterValidors) : asyncValidateFirst(control, _filterValidors);

        _classPrivateFieldSet(this, _asyncSubscription, toObservable(result).subscribe({
          next: function next(errors) {
            return subscriber(errors);
          }
        }));
      }
    }
  }, {
    key: "_coerceToValidatorMap",
    value: function _coerceToValidatorMap(validator) {
      var _this = this;

      var map$1 = new map();

      if (isArray$2(validator)) {
        forEach$3(validator).call(validator, function (v) {
          var meta = _this._transformValidatorMeta(v);

          if (meta) {
            map$1.set(meta.validator, meta.trigger);
          }
        });
      } else {
        var meta = this._transformValidatorMeta(validator);

        if (meta) {
          map$1.set(meta.validator, meta.trigger);
        }
      }

      return map$1;
    }
  }, {
    key: "_transformValidatorMeta",
    value: function _transformValidatorMeta(validatorFnOrMeta) {
      var trigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _classPrivateFieldGet(this, _defaultTrigger);

      if (isFunction(validatorFnOrMeta)) {
        return {
          validator: validatorFnOrMeta,
          trigger: trigger
        };
      }

      if (isObject(validatorFnOrMeta) && 'validator' in validatorFnOrMeta && 'trigger' in validatorFnOrMeta) {
        return this._transformValidatorMeta(validatorFnOrMeta.validator, validatorFnOrMeta.trigger);
      }

      return null;
    }
  }, {
    key: "_filterByTrigger",
    value: function _filterByTrigger(map, trigger) {
      var _context2, _context3;

      return map$3(_context2 = filter(_context3 = from(map)).call(_context3, function (meta) {
        return meta[1] === trigger || !trigger;
      })).call(_context2, function (meta) {
        return meta[0];
      });
    }
  }]);

  return Validator_;
}();

var Validator = Validator_;

/**
 * 表单状态：包括表单控件组和表单控件。
 * VALID:      表单处于合法状态
 * INVALID:    表单处于非法状态（即校验失败）
 * VALIDATING: 表单处于校验中
 * DISABLED:   表单处于禁用状态
 * READONLY:   表单是否可编辑 readonly
 * HIDDEN:     表单是否处于隐藏
 */

var FORM_STATUS = {
  VALID: 'VALID',
  INVALID: 'INVALID',
  VALIDATING: 'VALIDATING',
  DISABLED: 'DISABLED',
  READONLY: 'READONLY',
  HIDDEN: 'HIDDEN'
};

var _currentTrigger = new weakMap();

/**
 *  这是 `FormControl`,`FormGroup`,`FormArray`的抽象基类。
 */
var AbstractControl = /*#__PURE__*/function () {
  /**
   * 存储每次更新时的 触发事件，默认为null。
   */

  /**
     * 表示当前 AbstractControl 的校验策略（是否走完全部校验流程）。
     * 预期的值有 false（错误直接停止校验）和 true（错误不停止校验）,默认值为 false。
     * 值的来源同 trigger 属性。
     */

  /**
   * 表示当前 AbstractControl 的初始化/启用后是否校验。
   * 预期的值有 false（启用后不校验）和 true（启用后校验）,默认值为 false。
   * 值的来源同 trigger 属性。
   */

  /**
   * 存放校验程序
   */

  /**
   * 控件当前状态
   */

  /**
   * 错误
   */
  function AbstractControl() {
    _classCallCheck(this, AbstractControl);

    _currentTrigger.set(this, {
      writable: true,
      value: null
    });

    _defineProperty(this, "validateAll", void 0);

    _defineProperty(this, "selfValidate", void 0);

    _defineProperty(this, "validator", void 0);

    _defineProperty(this, "status", void 0);

    _defineProperty(this, "errors", void 0);

    _defineProperty(this, "value", void 0);

    _defineProperty(this, "stateSubject", void 0);
  }
  /**
   * currentTrigger 存取器，用于校验时取出相关事件的校验器。
   */


  _createClass(AbstractControl, [{
    key: "currentTrigger",
    get: function get() {
      var temp = _classPrivateFieldGet(this, _currentTrigger);

      _classPrivateFieldSet(this, _currentTrigger, null);

      return temp;
    },
    set: function set(trigger) {
      _classPrivateFieldSet(this, _currentTrigger, trigger);
    }
  }, {
    key: "enabled",
    get: function get() {
      var _context;

      return includes(_context = ['VALID', 'INVALID', 'VALIDATING']).call(_context, this.status);
    }
    /**
       * 启用表单控件
       * @param  
       */

  }, {
    key: "validity",
    value: function validity() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (this.enabled) {
        this.status = FORM_STATUS.VALIDATING;
        this.validator.run(this, function (errors) {
          _this.errors = errors;
          _this.status = _this.errors ? FORM_STATUS.INVALID : FORM_STATUS.VALID;

          _this.notify(options.emitEvent !== false);
        }, {
          trigger: _classPrivateFieldGet(this, _currentTrigger),
          validationAll: this.validateAll
        });
      }

      this.notify(options.emitEvent !== false);
    }
  }, {
    key: "subscribe",
    value: function subscribe(subscriber) {
      var subscription = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return this.stateSubject.subscribe(subscriber, subscription);
    }
    /**
    * 设置控件的行为策略，包括：校验触发策略、校验过程策略、控件启用时校验策略
    * @param opts 
    */

  }, {
    key: "_setStrategy",
    value: function _setStrategy(opts) {
      var _opts$validateAll, _opts$selfValidate;

      this.validateAll = (_opts$validateAll = opts === null || opts === void 0 ? void 0 : opts.validateAll) !== null && _opts$validateAll !== void 0 ? _opts$validateAll : false;
      this.selfValidate = (_opts$selfValidate = opts === null || opts === void 0 ? void 0 : opts.selfValidate) !== null && _opts$selfValidate !== void 0 ? _opts$selfValidate : false;
    }
  }, {
    key: "_initValidator",
    value: function _initValidator() {
      var _opts$validator, _opts$asyncValidator;

      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.validator = new Validator((_opts$validator = opts === null || opts === void 0 ? void 0 : opts.validator) !== null && _opts$validator !== void 0 ? _opts$validator : null, (_opts$asyncValidator = opts === null || opts === void 0 ? void 0 : opts.asyncValidator) !== null && _opts$asyncValidator !== void 0 ? _opts$asyncValidator : null, 'change');
    }
  }, {
    key: "_initNotify",
    value: function _initNotify() {
      this.stateSubject = new StateSubject(['value', 'errors', 'status'], ['errors']);
    }
    /**
     * 设置控件的值，这是一个抽象方法。
     */

  }]);

  return AbstractControl;
}();

var _onChange = new weakMap();

var FormControl = /*#__PURE__*/function (_AbstractControl) {
  _inherits(FormControl, _AbstractControl);

  var _super = _createSuper(FormControl);

  /**
   * 存储控件的值，默认下为null。
   */

  /**
   * 存放订阅值改变的订阅者
   */
  function FormControl() {
    var _this;

    var formState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FormControl);

    _this = _super.call(this); //初始化校验

    _defineProperty(_assertThisInitialized(_this), "value", void 0);

    _onChange.set(_assertThisInitialized(_this), {
      writable: true,
      value: []
    });

    _this._initValidator(opts); //申请表单状态


    _this._applyFormState(formState); //设置策略


    _this._setStrategy(opts); //初始化通知


    _this._initNotify();

    if (_this.selfValidate) {
      _this.validity();
    }

    return _this;
  }
  /**
   * 设置一个新值到表单控件。
   * 
   * @param value 控件的新值
   * @param options 确定控件在变化时的传播方法。
   * 
   * `emitModelToViewChange`: 该值为true/默认时，
   * 每次更改都会触发onChange存放的订阅，用于更新视图。
   */


  _createClass(FormControl, [{
    key: "setValue",
    value: function setValue(value) {
      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.value = value; // 触发模型到视图的响应

      if (_classPrivateFieldGet(this, _onChange).length && options.emitModelToViewChange !== false) {
        var _context;

        forEach$3(_context = _classPrivateFieldGet(this, _onChange)).call(_context, function (changeFn) {
          return changeFn(_this2.value);
        });
      } // TODO: 触发模型的校验


      this.validity(options);
    }
  }, {
    key: "enable",
    value: function enable() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.status = FORM_STATUS.VALID;
      this.errors = null;
      this.validity(options);
    }
  }, {
    key: "inactivate",
    value: function inactivate(status) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.status = FORM_STATUS[status.toUpperCase()];
      this.errors = null;
      this.validity(options);
    }
  }, {
    key: "notify",
    value: function notify(emitEvent) {
      if (emitEvent) {
        this.stateSubject.notify({
          value: _objectSpread2({}, this.value),
          errors: _objectSpread2({}, this.errors),
          status: _objectSpread2({}, this.status)
        });
      }
    }
    /**
     * 注册值改变的订阅
     * @param fn 
     */

  }, {
    key: "registerOnChange",
    value: function registerOnChange(fn) {
      var _this3 = this;

      _classPrivateFieldGet(this, _onChange).push(fn);

      return function () {
        _this3._unregisterOnChange(fn);
      };
    }
  }, {
    key: "_unregisterOnChange",
    value: function _unregisterOnChange(fn) {
      removeListItem(_classPrivateFieldGet(this, _onChange), fn);
    }
  }, {
    key: "_forEachChild",
    value: function _forEachChild(cb) {}
  }, {
    key: "_applyFormState",
    value: function _applyFormState(formState) {
      if (this._isBoxedValue(formState)) {
        this.value = formState.value;
        this.inactivate(formState.status, {
          emitEvent: false
        });
      } else {
        this.value = formState;
        this.enable({
          emitEvent: false
        });
      }
    }
  }, {
    key: "_isBoxedValue",
    value: function _isBoxedValue(formState) {
      return _typeof(formState) === 'object' && formState !== null && keys$2(formState).length === 2 && 'value' in formState && 'status' in formState;
    }
  }]);

  return FormControl;
}(AbstractControl);

var slice = [].slice;
var MSIE = /MSIE .\./.test(engineUserAgent); // <- dirty ie9- check

var wrap = function (scheduler) {
  return function (handler, timeout /* , ...arguments */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : undefined;
    return scheduler(boundArgs ? function () {
      // eslint-disable-next-line no-new-func -- spec requirement
      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
    } : handler, timeout);
  };
};

// ie9- setTimeout & setInterval additional parameters fix
// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
_export({ global: true, bind: true, forced: MSIE }, {
  // `setTimeout` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
  setTimeout: wrap(global$1.setTimeout),
  // `setInterval` method
  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
  setInterval: wrap(global$1.setInterval)
});

var setTimeout$2 = path.setTimeout;

var setTimeout$1 = setTimeout$2;

var FormGroup = /*#__PURE__*/function (_AbstractControl) {
  _inherits(FormGroup, _AbstractControl);

  var _super = _createSuper(FormGroup);

  /**
   * 缓存订阅响应状态
   */

  /**
   * 是否处于等待中
   */
  function FormGroup(controls) {
    var _this;

    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, FormGroup);

    _this = _super.call(this); //设置好策略

    _this.controls = controls;

    _defineProperty(_assertThisInitialized(_this), "stateQueue", []);

    _defineProperty(_assertThisInitialized(_this), "waiting", false);

    _defineProperty(_assertThisInitialized(_this), "status", void 0);

    _this._setStrategy(opts); //初始化校验


    _this._initValidator(opts); //初始化通知


    _this._initNotify(); //进行控制设置


    _this._setControls();

    return _this;
  }

  _createClass(FormGroup, [{
    key: "setValue",
    value: function setValue(value, options) {
      var _context,
          _this2 = this;

      forEach$3(_context = keys$2(value)).call(_context, function (name) {
        if (_this2.controls[name]) {
          _this2.controls[name].setValue(value[name], {});
        }
      }); // TODO: 触发模型的校验


      this.validity(options);
    }
  }, {
    key: "enable",
    value: function enable() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this._forEachChild(function (control) {
        control.enable(options);
      });
    }
  }, {
    key: "inactivate",
    value: function inactivate(status) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this._forEachChild(function (control) {
        control.inactivate(status, options);
      });
    }
  }, {
    key: "notify",
    value: function notify(emitEvent) {
      if (emitEvent) {
        this.stateSubject.notify({
          value: _objectSpread2({}, this.value),
          errors: _objectSpread2({}, this.errors),
          status: _objectSpread2({}, this.status)
        });
      }
    }
  }, {
    key: "_forEachChild",
    value: function _forEachChild(cb) {
      var _context2,
          _this3 = this;

      forEach$3(_context2 = keys$2(this.controls)).call(_context2, function (k) {
        return cb(_this3.controls[k], k);
      });
    }
  }, {
    key: "_setControls",
    value: function _setControls() {
      var _context3,
          _this4 = this;

      forEach$3(_context3 = keys$2(this.controls)).call(_context3, function (name) {
        var control = _this4.controls[name];
        control.subscribe(function (state) {
          _this4.stateQueue.push({
            name: name,
            state: state
          });

          if (!_this4.waiting) {
            _this4.waiting = true;

            setTimeout$1(function () {
              return _this4._executeTask();
            });
          }
        });
      });
    }
  }, {
    key: "_executeTask",
    value: function _executeTask() {
      var _context4,
          _this5 = this;

      forEach$3(_context4 = this.stateQueue).call(_context4, function (task) {
        var name = task.name,
            state = task.state;
        _this5.value = _objectSpread2(_objectSpread2({}, _this5.value), {}, _defineProperty({}, name, state.value));
        _this5.status = _objectSpread2(_objectSpread2({}, _this5.status), {}, _defineProperty({}, name, state.status));
        _this5.errors = _this5.errors ? _objectSpread2(_objectSpread2({}, _this5.errors), {}, _defineProperty({}, name, state.errors)) : _defineProperty({}, name, state.errors);
      });

      this._resetQueue();

      this.notify(true);
    }
  }, {
    key: "_resetQueue",
    value: function _resetQueue() {
      this.stateQueue = [];
      this.waiting = true;
    }
  }]);

  return FormGroup;
}(AbstractControl);

var onFreeze = internalMetadata.onFreeze;

// eslint-disable-next-line es/no-object-freeze -- safe
var $freeze = Object.freeze;
var FAILS_ON_PRIMITIVES = fails(function () { $freeze(1); });

// `Object.freeze` method
// https://tc39.es/ecma262/#sec-object.freeze
_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !freezing }, {
  freeze: function freeze(it) {
    return $freeze && isObject$1(it) ? $freeze(onFreeze(it)) : it;
  }
});

var freeze$2 = path.Object.freeze;

var freeze$1 = freeze$2;

var freeze = freeze$1;

var GroupModel = function GroupModel(controls, opts) {
  _classCallCheck(this, GroupModel);

  this.controls = controls;
  this.opts = opts;
};

function defineModel(controlsConfig, opts) {
  var _context;

  var controls = {};

  forEach$3(_context = keys$2(controlsConfig)).call(_context, function (controlName) {
    controls[controlName] = createFullControlConfig(controlsConfig[controlName]);
  });

  return freeze(new GroupModel(controls, opts));
}

function createFullControlConfig(controlConfig) {
  if (controlConfig instanceof GroupModel) {
    return controlConfig;
  } else if (isArray$2(controlConfig)) {
    var value = controlConfig[0];

    var _opts = controlConfig.length > 1 ? controlConfig[1] : {};

    return [value, _opts];
  } else {
    return [controlConfig, {}];
  }
}

var createForm = function createForm(formModel) {
  var root;

  if (formModel instanceof GroupModel) {
    root = transformTree(formModel);
  }

  var api = {
    root: root
  };
  return api;
}; // model -> control


var transformTree = function transformTree(formModel) {
  var _context;

  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var controls = {};

  var currentOpts = assign(omit(opts, ['validator', 'asyncValidator']), formModel.opts);

  var dgOpts = omit(currentOpts, ['validator', 'asyncValidator']);

  forEach$3(_context = keys$2(formModel.controls)).call(_context, function (name) {
    var model = formModel.controls[name];

    if (isArray$2(model)) {
      controls[name] = new FormControl(model[0], assign(dgOpts, model[1]));
    } else if (model instanceof GroupModel) {
      controls[name] = transformTree(model, dgOpts);
    }
  });

  return new FormGroup(controls, currentOpts);
};

exports.default = createForm;
exports.defineModel = defineModel;
