"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = Symbol.for("react.element");
      var n = Symbol.for("react.portal");
      var p2 = Symbol.for("react.fragment");
      var q = Symbol.for("react.strict_mode");
      var r = Symbol.for("react.profiler");
      var t = Symbol.for("react.provider");
      var u = Symbol.for("react.context");
      var v = Symbol.for("react.forward_ref");
      var w = Symbol.for("react.suspense");
      var x = Symbol.for("react.memo");
      var y = Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a2) {
        if (null === a2 || "object" !== typeof a2)
          return null;
        a2 = z && a2[z] || a2["@@iterator"];
        return "function" === typeof a2 ? a2 : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a2, b2, e) {
        this.props = a2;
        this.context = b2;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a2, b2) {
        if ("object" !== typeof a2 && "function" !== typeof a2 && null != a2)
          throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a2, b2, "setState");
      };
      E.prototype.forceUpdate = function(a2) {
        this.updater.enqueueForceUpdate(this, a2, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a2, b2, e) {
        this.props = a2;
        this.context = b2;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a2, b2, e) {
        var d, c2 = {}, k = null, h = null;
        if (null != b2)
          for (d in void 0 !== b2.ref && (h = b2.ref), void 0 !== b2.key && (k = "" + b2.key), b2)
            J.call(b2, d) && !L.hasOwnProperty(d) && (c2[d] = b2[d]);
        var g = arguments.length - 2;
        if (1 === g)
          c2.children = e;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++)
            f[m] = arguments[m + 2];
          c2.children = f;
        }
        if (a2 && a2.defaultProps)
          for (d in g = a2.defaultProps, g)
            void 0 === c2[d] && (c2[d] = g[d]);
        return { $$typeof: l, type: a2, key: k, ref: h, props: c2, _owner: K.current };
      }
      function N(a2, b2) {
        return { $$typeof: l, type: a2.type, key: b2, ref: a2.ref, props: a2.props, _owner: a2._owner };
      }
      function O(a2) {
        return "object" === typeof a2 && null !== a2 && a2.$$typeof === l;
      }
      function escape(a2) {
        var b2 = { "=": "=0", ":": "=2" };
        return "$" + a2.replace(/[=:]/g, function(a3) {
          return b2[a3];
        });
      }
      var P = /\/+/g;
      function Q(a2, b2) {
        return "object" === typeof a2 && null !== a2 && null != a2.key ? escape("" + a2.key) : b2.toString(36);
      }
      function R(a2, b2, e, d, c2) {
        var k = typeof a2;
        if ("undefined" === k || "boolean" === k)
          a2 = null;
        var h = false;
        if (null === a2)
          h = true;
        else
          switch (k) {
            case "string":
            case "number":
              h = true;
              break;
            case "object":
              switch (a2.$$typeof) {
                case l:
                case n:
                  h = true;
              }
          }
        if (h)
          return h = a2, c2 = c2(h), a2 = "" === d ? "." + Q(h, 0) : d, I(c2) ? (e = "", null != a2 && (e = a2.replace(P, "$&/") + "/"), R(c2, b2, e, "", function(a3) {
            return a3;
          })) : null != c2 && (O(c2) && (c2 = N(c2, e + (!c2.key || h && h.key === c2.key ? "" : ("" + c2.key).replace(P, "$&/") + "/") + a2)), b2.push(c2)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a2))
          for (var g = 0; g < a2.length; g++) {
            k = a2[g];
            var f = d + Q(k, g);
            h += R(k, b2, e, f, c2);
          }
        else if (f = A(a2), "function" === typeof f)
          for (a2 = f.call(a2), g = 0; !(k = a2.next()).done; )
            k = k.value, f = d + Q(k, g++), h += R(k, b2, e, f, c2);
        else if ("object" === k)
          throw b2 = String(a2), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a2).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a2, b2, e) {
        if (null == a2)
          return a2;
        var d = [], c2 = 0;
        R(a2, d, "", "", function(a3) {
          return b2.call(e, a3, c2++);
        });
        return d;
      }
      function T(a2) {
        if (-1 === a2._status) {
          var b2 = a2._result;
          b2 = b2();
          b2.then(function(b3) {
            if (0 === a2._status || -1 === a2._status)
              a2._status = 1, a2._result = b3;
          }, function(b3) {
            if (0 === a2._status || -1 === a2._status)
              a2._status = 2, a2._result = b3;
          });
          -1 === a2._status && (a2._status = 0, a2._result = b2);
        }
        if (1 === a2._status)
          return a2._result.default;
        throw a2._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      function X() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S, forEach: function(a2, b2, e) {
        S(a2, function() {
          b2.apply(this, arguments);
        }, e);
      }, count: function(a2) {
        var b2 = 0;
        S(a2, function() {
          b2++;
        });
        return b2;
      }, toArray: function(a2) {
        return S(a2, function(a3) {
          return a3;
        }) || [];
      }, only: function(a2) {
        if (!O(a2))
          throw Error("React.Children.only expected to receive a single React element child.");
        return a2;
      } };
      exports.Component = E;
      exports.Fragment = p2;
      exports.Profiler = r;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X;
      exports.cloneElement = function(a2, b2, e) {
        if (null === a2 || void 0 === a2)
          throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a2 + ".");
        var d = C({}, a2.props), c2 = a2.key, k = a2.ref, h = a2._owner;
        if (null != b2) {
          void 0 !== b2.ref && (k = b2.ref, h = K.current);
          void 0 !== b2.key && (c2 = "" + b2.key);
          if (a2.type && a2.type.defaultProps)
            var g = a2.type.defaultProps;
          for (f in b2)
            J.call(b2, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b2[f] && void 0 !== g ? g[f] : b2[f]);
        }
        var f = arguments.length - 2;
        if (1 === f)
          d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++)
            g[m] = arguments[m + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a2.type, key: c2, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a2) {
        a2 = { $$typeof: u, _currentValue: a2, _currentValue2: a2, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a2.Provider = { $$typeof: t, _context: a2 };
        return a2.Consumer = a2;
      };
      exports.createElement = M;
      exports.createFactory = function(a2) {
        var b2 = M.bind(null, a2);
        b2.type = a2;
        return b2;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a2) {
        return { $$typeof: v, render: a2 };
      };
      exports.isValidElement = O;
      exports.lazy = function(a2) {
        return { $$typeof: y, _payload: { _status: -1, _result: a2 }, _init: T };
      };
      exports.memo = function(a2, b2) {
        return { $$typeof: x, type: a2, compare: void 0 === b2 ? null : b2 };
      };
      exports.startTransition = function(a2) {
        var b2 = V.transition;
        V.transition = {};
        try {
          a2();
        } finally {
          V.transition = b2;
        }
      };
      exports.unstable_act = X;
      exports.useCallback = function(a2, b2) {
        return U.current.useCallback(a2, b2);
      };
      exports.useContext = function(a2) {
        return U.current.useContext(a2);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a2) {
        return U.current.useDeferredValue(a2);
      };
      exports.useEffect = function(a2, b2) {
        return U.current.useEffect(a2, b2);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a2, b2, e) {
        return U.current.useImperativeHandle(a2, b2, e);
      };
      exports.useInsertionEffect = function(a2, b2) {
        return U.current.useInsertionEffect(a2, b2);
      };
      exports.useLayoutEffect = function(a2, b2) {
        return U.current.useLayoutEffect(a2, b2);
      };
      exports.useMemo = function(a2, b2) {
        return U.current.useMemo(a2, b2);
      };
      exports.useReducer = function(a2, b2, e) {
        return U.current.useReducer(a2, b2, e);
      };
      exports.useRef = function(a2) {
        return U.current.useRef(a2);
      };
      exports.useState = function(a2) {
        return U.current.useState(a2);
      };
      exports.useSyncExternalStore = function(a2, b2, e) {
        return U.current.useSyncExternalStore(a2, b2, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      function f(a2, b2) {
        var c2 = a2.length;
        a2.push(b2);
        a:
          for (; 0 < c2; ) {
            var d = c2 - 1 >>> 1, e = a2[d];
            if (0 < g(e, b2))
              a2[d] = b2, a2[c2] = e, c2 = d;
            else
              break a;
          }
      }
      function h(a2) {
        return 0 === a2.length ? null : a2[0];
      }
      function k(a2) {
        if (0 === a2.length)
          return null;
        var b2 = a2[0], c2 = a2.pop();
        if (c2 !== b2) {
          a2[0] = c2;
          a:
            for (var d = 0, e = a2.length, w = e >>> 1; d < w; ) {
              var m = 2 * (d + 1) - 1, C = a2[m], n = m + 1, x = a2[n];
              if (0 > g(C, c2))
                n < e && 0 > g(x, C) ? (a2[d] = x, a2[n] = c2, d = n) : (a2[d] = C, a2[m] = c2, d = m);
              else if (n < e && 0 > g(x, c2))
                a2[d] = x, a2[n] = c2, d = n;
              else
                break a;
            }
        }
        return b2;
      }
      function g(a2, b2) {
        var c2 = a2.sortIndex - b2.sortIndex;
        return 0 !== c2 ? c2 : a2.id - b2.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p2 = Date, q = p2.now();
        exports.unstable_now = function() {
          return p2.now() - q;
        };
      }
      var l;
      var p2;
      var q;
      var r = [];
      var t = [];
      var u = 1;
      var v = null;
      var y = 3;
      var z = false;
      var A = false;
      var B = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E = "function" === typeof clearTimeout ? clearTimeout : null;
      var F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a2) {
        for (var b2 = h(t); null !== b2; ) {
          if (null === b2.callback)
            k(t);
          else if (b2.startTime <= a2)
            k(t), b2.sortIndex = b2.expirationTime, f(r, b2);
          else
            break;
          b2 = h(t);
        }
      }
      function H(a2) {
        B = false;
        G(a2);
        if (!A)
          if (null !== h(r))
            A = true, I(J);
          else {
            var b2 = h(t);
            null !== b2 && K(H, b2.startTime - a2);
          }
      }
      function J(a2, b2) {
        A = false;
        B && (B = false, E(L), L = -1);
        z = true;
        var c2 = y;
        try {
          G(b2);
          for (v = h(r); null !== v && (!(v.expirationTime > b2) || a2 && !M()); ) {
            var d = v.callback;
            if ("function" === typeof d) {
              v.callback = null;
              y = v.priorityLevel;
              var e = d(v.expirationTime <= b2);
              b2 = exports.unstable_now();
              "function" === typeof e ? v.callback = e : v === h(r) && k(r);
              G(b2);
            } else
              k(r);
            v = h(r);
          }
          if (null !== v)
            var w = true;
          else {
            var m = h(t);
            null !== m && K(H, m.startTime - b2);
            w = false;
          }
          return w;
        } finally {
          v = null, y = c2, z = false;
        }
      }
      var N = false;
      var O = null;
      var L = -1;
      var P = 5;
      var Q = -1;
      function M() {
        return exports.unstable_now() - Q < P ? false : true;
      }
      function R() {
        if (null !== O) {
          var a2 = exports.unstable_now();
          Q = a2;
          var b2 = true;
          try {
            b2 = O(true, a2);
          } finally {
            b2 ? S() : (N = false, O = null);
          }
        } else
          N = false;
      }
      var S;
      if ("function" === typeof F)
        S = function() {
          F(R);
        };
      else if ("undefined" !== typeof MessageChannel) {
        T = new MessageChannel(), U = T.port2;
        T.port1.onmessage = R;
        S = function() {
          U.postMessage(null);
        };
      } else
        S = function() {
          D(R, 0);
        };
      var T;
      var U;
      function I(a2) {
        O = a2;
        N || (N = true, S());
      }
      function K(a2, b2) {
        L = D(function() {
          a2(exports.unstable_now());
        }, b2);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a2) {
        a2.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports.unstable_forceFrameRate = function(a2) {
        0 > a2 || 125 < a2 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a2 ? Math.floor(1e3 / a2) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h(r);
      };
      exports.unstable_next = function(a2) {
        switch (y) {
          case 1:
          case 2:
          case 3:
            var b2 = 3;
            break;
          default:
            b2 = y;
        }
        var c2 = y;
        y = b2;
        try {
          return a2();
        } finally {
          y = c2;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a2, b2) {
        switch (a2) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a2 = 3;
        }
        var c2 = y;
        y = a2;
        try {
          return b2();
        } finally {
          y = c2;
        }
      };
      exports.unstable_scheduleCallback = function(a2, b2, c2) {
        var d = exports.unstable_now();
        "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d + c2 : d) : c2 = d;
        switch (a2) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c2 + e;
        a2 = { id: u++, callback: b2, priorityLevel: a2, startTime: c2, expirationTime: e, sortIndex: -1 };
        c2 > d ? (a2.sortIndex = c2, f(t, a2), null === h(r) && a2 === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c2 - d))) : (a2.sortIndex = e, f(r, a2), A || z || (A = true, I(J)));
        return a2;
      };
      exports.unstable_shouldYield = M;
      exports.unstable_wrapCallback = function(a2) {
        var b2 = y;
        return function() {
          var c2 = y;
          y = b2;
          try {
            return a2.apply(this, arguments);
          } finally {
            y = c2;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var ca = require_scheduler();
      function p2(a2) {
        for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a2, c2 = 1; c2 < arguments.length; c2++)
          b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
        return "Minified React error #" + a2 + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a2, b2) {
        ha(a2, b2);
        ha(a2 + "Capture", b2);
      }
      function ha(a2, b2) {
        ea[a2] = b2;
        for (a2 = 0; a2 < b2.length; a2++)
          da.add(b2[a2]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function oa(a2) {
        if (ja.call(ma, a2))
          return true;
        if (ja.call(la, a2))
          return false;
        if (ka.test(a2))
          return ma[a2] = true;
        la[a2] = true;
        return false;
      }
      function pa(a2, b2, c2, d) {
        if (null !== c2 && 0 === c2.type)
          return false;
        switch (typeof b2) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d)
              return false;
            if (null !== c2)
              return !c2.acceptsBooleans;
            a2 = a2.toLowerCase().slice(0, 5);
            return "data-" !== a2 && "aria-" !== a2;
          default:
            return false;
        }
      }
      function qa(a2, b2, c2, d) {
        if (null === b2 || "undefined" === typeof b2 || pa(a2, b2, c2, d))
          return true;
        if (d)
          return false;
        if (null !== c2)
          switch (c2.type) {
            case 3:
              return !b2;
            case 4:
              return false === b2;
            case 5:
              return isNaN(b2);
            case 6:
              return isNaN(b2) || 1 > b2;
          }
        return false;
      }
      function v(a2, b2, c2, d, e, f, g) {
        this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c2;
        this.propertyName = a2;
        this.type = b2;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var z = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a2) {
        z[a2] = new v(a2, 0, false, a2, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a2) {
        var b2 = a2[0];
        z[b2] = new v(b2, 1, false, a2[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a2) {
        z[a2] = new v(a2, 2, false, a2.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a2) {
        z[a2] = new v(a2, 2, false, a2, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a2) {
        z[a2] = new v(a2, 3, false, a2.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a2) {
        z[a2] = new v(a2, 3, true, a2, null, false, false);
      });
      ["capture", "download"].forEach(function(a2) {
        z[a2] = new v(a2, 4, false, a2, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a2) {
        z[a2] = new v(a2, 6, false, a2, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a2) {
        z[a2] = new v(a2, 5, false, a2.toLowerCase(), null, false, false);
      });
      var ra = /[\-:]([a-z])/g;
      function sa(a2) {
        return a2[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a2) {
        var b2 = a2.replace(
          ra,
          sa
        );
        z[b2] = new v(b2, 1, false, a2, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a2) {
        var b2 = a2.replace(ra, sa);
        z[b2] = new v(b2, 1, false, a2, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a2) {
        var b2 = a2.replace(ra, sa);
        z[b2] = new v(b2, 1, false, a2, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a2) {
        z[a2] = new v(a2, 1, false, a2.toLowerCase(), null, false, false);
      });
      z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a2) {
        z[a2] = new v(a2, 1, false, a2.toLowerCase(), null, true, true);
      });
      function ta(a2, b2, c2, d) {
        var e = z.hasOwnProperty(b2) ? z[b2] : null;
        if (null !== e ? 0 !== e.type : d || !(2 < b2.length) || "o" !== b2[0] && "O" !== b2[0] || "n" !== b2[1] && "N" !== b2[1])
          qa(b2, c2, e, d) && (c2 = null), d || null === e ? oa(b2) && (null === c2 ? a2.removeAttribute(b2) : a2.setAttribute(b2, "" + c2)) : e.mustUseProperty ? a2[e.propertyName] = null === c2 ? 3 === e.type ? false : "" : c2 : (b2 = e.attributeName, d = e.attributeNamespace, null === c2 ? a2.removeAttribute(b2) : (e = e.type, c2 = 3 === e || 4 === e && true === c2 ? "" : "" + c2, d ? a2.setAttributeNS(d, b2, c2) : a2.setAttribute(b2, c2)));
      }
      var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var va = Symbol.for("react.element");
      var wa = Symbol.for("react.portal");
      var ya = Symbol.for("react.fragment");
      var za = Symbol.for("react.strict_mode");
      var Aa = Symbol.for("react.profiler");
      var Ba = Symbol.for("react.provider");
      var Ca = Symbol.for("react.context");
      var Da = Symbol.for("react.forward_ref");
      var Ea = Symbol.for("react.suspense");
      var Fa = Symbol.for("react.suspense_list");
      var Ga = Symbol.for("react.memo");
      var Ha = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      Symbol.for("react.debug_trace_mode");
      var Ia = Symbol.for("react.offscreen");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.cache");
      Symbol.for("react.tracing_marker");
      var Ja = Symbol.iterator;
      function Ka(a2) {
        if (null === a2 || "object" !== typeof a2)
          return null;
        a2 = Ja && a2[Ja] || a2["@@iterator"];
        return "function" === typeof a2 ? a2 : null;
      }
      var A = Object.assign;
      var La;
      function Ma(a2) {
        if (void 0 === La)
          try {
            throw Error();
          } catch (c2) {
            var b2 = c2.stack.trim().match(/\n( *(at )?)/);
            La = b2 && b2[1] || "";
          }
        return "\n" + La + a2;
      }
      var Na = false;
      function Oa(a2, b2) {
        if (!a2 || Na)
          return "";
        Na = true;
        var c2 = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b2)
            if (b2 = function() {
              throw Error();
            }, Object.defineProperty(b2.prototype, "props", { set: function() {
              throw Error();
            } }), "object" === typeof Reflect && Reflect.construct) {
              try {
                Reflect.construct(b2, []);
              } catch (l) {
                var d = l;
              }
              Reflect.construct(a2, [], b2);
            } else {
              try {
                b2.call();
              } catch (l) {
                d = l;
              }
              a2.call(b2.prototype);
            }
          else {
            try {
              throw Error();
            } catch (l) {
              d = l;
            }
            a2();
          }
        } catch (l) {
          if (l && d && "string" === typeof l.stack) {
            for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; )
              h--;
            for (; 1 <= g && 0 <= h; g--, h--)
              if (e[g] !== f[h]) {
                if (1 !== g || 1 !== h) {
                  do
                    if (g--, h--, 0 > h || e[g] !== f[h]) {
                      var k = "\n" + e[g].replace(" at new ", " at ");
                      a2.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a2.displayName));
                      return k;
                    }
                  while (1 <= g && 0 <= h);
                }
                break;
              }
          }
        } finally {
          Na = false, Error.prepareStackTrace = c2;
        }
        return (a2 = a2 ? a2.displayName || a2.name : "") ? Ma(a2) : "";
      }
      function Pa(a2) {
        switch (a2.tag) {
          case 5:
            return Ma(a2.type);
          case 16:
            return Ma("Lazy");
          case 13:
            return Ma("Suspense");
          case 19:
            return Ma("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a2 = Oa(a2.type, false), a2;
          case 11:
            return a2 = Oa(a2.type.render, false), a2;
          case 1:
            return a2 = Oa(a2.type, true), a2;
          default:
            return "";
        }
      }
      function Qa(a2) {
        if (null == a2)
          return null;
        if ("function" === typeof a2)
          return a2.displayName || a2.name || null;
        if ("string" === typeof a2)
          return a2;
        switch (a2) {
          case ya:
            return "Fragment";
          case wa:
            return "Portal";
          case Aa:
            return "Profiler";
          case za:
            return "StrictMode";
          case Ea:
            return "Suspense";
          case Fa:
            return "SuspenseList";
        }
        if ("object" === typeof a2)
          switch (a2.$$typeof) {
            case Ca:
              return (a2.displayName || "Context") + ".Consumer";
            case Ba:
              return (a2._context.displayName || "Context") + ".Provider";
            case Da:
              var b2 = a2.render;
              a2 = a2.displayName;
              a2 || (a2 = b2.displayName || b2.name || "", a2 = "" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
              return a2;
            case Ga:
              return b2 = a2.displayName || null, null !== b2 ? b2 : Qa(a2.type) || "Memo";
            case Ha:
              b2 = a2._payload;
              a2 = a2._init;
              try {
                return Qa(a2(b2));
              } catch (c2) {
              }
          }
        return null;
      }
      function Ra(a2) {
        var b2 = a2.type;
        switch (a2.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b2.displayName || "Context") + ".Consumer";
          case 10:
            return (b2._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a2 = b2.render, a2 = a2.displayName || a2.name || "", b2.displayName || ("" !== a2 ? "ForwardRef(" + a2 + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b2;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Qa(b2);
          case 8:
            return b2 === za ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b2)
              return b2.displayName || b2.name || null;
            if ("string" === typeof b2)
              return b2;
        }
        return null;
      }
      function Sa(a2) {
        switch (typeof a2) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a2;
          case "object":
            return a2;
          default:
            return "";
        }
      }
      function Ta(a2) {
        var b2 = a2.type;
        return (a2 = a2.nodeName) && "input" === a2.toLowerCase() && ("checkbox" === b2 || "radio" === b2);
      }
      function Ua(a2) {
        var b2 = Ta(a2) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a2.constructor.prototype, b2), d = "" + a2[b2];
        if (!a2.hasOwnProperty(b2) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
          var e = c2.get, f = c2.set;
          Object.defineProperty(a2, b2, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a3) {
            d = "" + a3;
            f.call(this, a3);
          } });
          Object.defineProperty(a2, b2, { enumerable: c2.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a3) {
            d = "" + a3;
          }, stopTracking: function() {
            a2._valueTracker = null;
            delete a2[b2];
          } };
        }
      }
      function Va(a2) {
        a2._valueTracker || (a2._valueTracker = Ua(a2));
      }
      function Wa(a2) {
        if (!a2)
          return false;
        var b2 = a2._valueTracker;
        if (!b2)
          return true;
        var c2 = b2.getValue();
        var d = "";
        a2 && (d = Ta(a2) ? a2.checked ? "true" : "false" : a2.value);
        a2 = d;
        return a2 !== c2 ? (b2.setValue(a2), true) : false;
      }
      function Xa(a2) {
        a2 = a2 || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a2)
          return null;
        try {
          return a2.activeElement || a2.body;
        } catch (b2) {
          return a2.body;
        }
      }
      function Ya(a2, b2) {
        var c2 = b2.checked;
        return A({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a2._wrapperState.initialChecked });
      }
      function Za(a2, b2) {
        var c2 = null == b2.defaultValue ? "" : b2.defaultValue, d = null != b2.checked ? b2.checked : b2.defaultChecked;
        c2 = Sa(null != b2.value ? b2.value : c2);
        a2._wrapperState = { initialChecked: d, initialValue: c2, controlled: "checkbox" === b2.type || "radio" === b2.type ? null != b2.checked : null != b2.value };
      }
      function ab(a2, b2) {
        b2 = b2.checked;
        null != b2 && ta(a2, "checked", b2, false);
      }
      function bb(a2, b2) {
        ab(a2, b2);
        var c2 = Sa(b2.value), d = b2.type;
        if (null != c2)
          if ("number" === d) {
            if (0 === c2 && "" === a2.value || a2.value != c2)
              a2.value = "" + c2;
          } else
            a2.value !== "" + c2 && (a2.value = "" + c2);
        else if ("submit" === d || "reset" === d) {
          a2.removeAttribute("value");
          return;
        }
        b2.hasOwnProperty("value") ? cb(a2, b2.type, c2) : b2.hasOwnProperty("defaultValue") && cb(a2, b2.type, Sa(b2.defaultValue));
        null == b2.checked && null != b2.defaultChecked && (a2.defaultChecked = !!b2.defaultChecked);
      }
      function db(a2, b2, c2) {
        if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
          var d = b2.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b2.value && null !== b2.value))
            return;
          b2 = "" + a2._wrapperState.initialValue;
          c2 || b2 === a2.value || (a2.value = b2);
          a2.defaultValue = b2;
        }
        c2 = a2.name;
        "" !== c2 && (a2.name = "");
        a2.defaultChecked = !!a2._wrapperState.initialChecked;
        "" !== c2 && (a2.name = c2);
      }
      function cb(a2, b2, c2) {
        if ("number" !== b2 || Xa(a2.ownerDocument) !== a2)
          null == c2 ? a2.defaultValue = "" + a2._wrapperState.initialValue : a2.defaultValue !== "" + c2 && (a2.defaultValue = "" + c2);
      }
      var eb = Array.isArray;
      function fb(a2, b2, c2, d) {
        a2 = a2.options;
        if (b2) {
          b2 = {};
          for (var e = 0; e < c2.length; e++)
            b2["$" + c2[e]] = true;
          for (c2 = 0; c2 < a2.length; c2++)
            e = b2.hasOwnProperty("$" + a2[c2].value), a2[c2].selected !== e && (a2[c2].selected = e), e && d && (a2[c2].defaultSelected = true);
        } else {
          c2 = "" + Sa(c2);
          b2 = null;
          for (e = 0; e < a2.length; e++) {
            if (a2[e].value === c2) {
              a2[e].selected = true;
              d && (a2[e].defaultSelected = true);
              return;
            }
            null !== b2 || a2[e].disabled || (b2 = a2[e]);
          }
          null !== b2 && (b2.selected = true);
        }
      }
      function gb(a2, b2) {
        if (null != b2.dangerouslySetInnerHTML)
          throw Error(p2(91));
        return A({}, b2, { value: void 0, defaultValue: void 0, children: "" + a2._wrapperState.initialValue });
      }
      function hb(a2, b2) {
        var c2 = b2.value;
        if (null == c2) {
          c2 = b2.children;
          b2 = b2.defaultValue;
          if (null != c2) {
            if (null != b2)
              throw Error(p2(92));
            if (eb(c2)) {
              if (1 < c2.length)
                throw Error(p2(93));
              c2 = c2[0];
            }
            b2 = c2;
          }
          null == b2 && (b2 = "");
          c2 = b2;
        }
        a2._wrapperState = { initialValue: Sa(c2) };
      }
      function ib(a2, b2) {
        var c2 = Sa(b2.value), d = Sa(b2.defaultValue);
        null != c2 && (c2 = "" + c2, c2 !== a2.value && (a2.value = c2), null == b2.defaultValue && a2.defaultValue !== c2 && (a2.defaultValue = c2));
        null != d && (a2.defaultValue = "" + d);
      }
      function jb(a2) {
        var b2 = a2.textContent;
        b2 === a2._wrapperState.initialValue && "" !== b2 && null !== b2 && (a2.value = b2);
      }
      function kb(a2) {
        switch (a2) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function lb(a2, b2) {
        return null == a2 || "http://www.w3.org/1999/xhtml" === a2 ? kb(b2) : "http://www.w3.org/2000/svg" === a2 && "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : a2;
      }
      var mb;
      var nb = function(a2) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b2, c2, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a2(b2, c2, d, e);
          });
        } : a2;
      }(function(a2, b2) {
        if ("http://www.w3.org/2000/svg" !== a2.namespaceURI || "innerHTML" in a2)
          a2.innerHTML = b2;
        else {
          mb = mb || document.createElement("div");
          mb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
          for (b2 = mb.firstChild; a2.firstChild; )
            a2.removeChild(a2.firstChild);
          for (; b2.firstChild; )
            a2.appendChild(b2.firstChild);
        }
      });
      function ob(a2, b2) {
        if (b2) {
          var c2 = a2.firstChild;
          if (c2 && c2 === a2.lastChild && 3 === c2.nodeType) {
            c2.nodeValue = b2;
            return;
          }
        }
        a2.textContent = b2;
      }
      var pb = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var qb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(pb).forEach(function(a2) {
        qb.forEach(function(b2) {
          b2 = b2 + a2.charAt(0).toUpperCase() + a2.substring(1);
          pb[b2] = pb[a2];
        });
      });
      function rb(a2, b2, c2) {
        return null == b2 || "boolean" === typeof b2 || "" === b2 ? "" : c2 || "number" !== typeof b2 || 0 === b2 || pb.hasOwnProperty(a2) && pb[a2] ? ("" + b2).trim() : b2 + "px";
      }
      function sb(a2, b2) {
        a2 = a2.style;
        for (var c2 in b2)
          if (b2.hasOwnProperty(c2)) {
            var d = 0 === c2.indexOf("--"), e = rb(c2, b2[c2], d);
            "float" === c2 && (c2 = "cssFloat");
            d ? a2.setProperty(c2, e) : a2[c2] = e;
          }
      }
      var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function ub(a2, b2) {
        if (b2) {
          if (tb[a2] && (null != b2.children || null != b2.dangerouslySetInnerHTML))
            throw Error(p2(137, a2));
          if (null != b2.dangerouslySetInnerHTML) {
            if (null != b2.children)
              throw Error(p2(60));
            if ("object" !== typeof b2.dangerouslySetInnerHTML || !("__html" in b2.dangerouslySetInnerHTML))
              throw Error(p2(61));
          }
          if (null != b2.style && "object" !== typeof b2.style)
            throw Error(p2(62));
        }
      }
      function vb(a2, b2) {
        if (-1 === a2.indexOf("-"))
          return "string" === typeof b2.is;
        switch (a2) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var wb = null;
      function xb(a2) {
        a2 = a2.target || a2.srcElement || window;
        a2.correspondingUseElement && (a2 = a2.correspondingUseElement);
        return 3 === a2.nodeType ? a2.parentNode : a2;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a2) {
        if (a2 = Cb(a2)) {
          if ("function" !== typeof yb)
            throw Error(p2(280));
          var b2 = a2.stateNode;
          b2 && (b2 = Db(b2), yb(a2.stateNode, a2.type, b2));
        }
      }
      function Eb(a2) {
        zb ? Ab ? Ab.push(a2) : Ab = [a2] : zb = a2;
      }
      function Fb() {
        if (zb) {
          var a2 = zb, b2 = Ab;
          Ab = zb = null;
          Bb(a2);
          if (b2)
            for (a2 = 0; a2 < b2.length; a2++)
              Bb(b2[a2]);
        }
      }
      function Gb(a2, b2) {
        return a2(b2);
      }
      function Hb() {
      }
      var Ib = false;
      function Jb(a2, b2, c2) {
        if (Ib)
          return a2(b2, c2);
        Ib = true;
        try {
          return Gb(a2, b2, c2);
        } finally {
          if (Ib = false, null !== zb || null !== Ab)
            Hb(), Fb();
        }
      }
      function Kb(a2, b2) {
        var c2 = a2.stateNode;
        if (null === c2)
          return null;
        var d = Db(c2);
        if (null === d)
          return null;
        c2 = d[b2];
        a:
          switch (b2) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              (d = !d.disabled) || (a2 = a2.type, d = !("button" === a2 || "input" === a2 || "select" === a2 || "textarea" === a2));
              a2 = !d;
              break a;
            default:
              a2 = false;
          }
        if (a2)
          return null;
        if (c2 && "function" !== typeof c2)
          throw Error(p2(231, b2, typeof c2));
        return c2;
      }
      var Lb = false;
      if (ia)
        try {
          Mb = {};
          Object.defineProperty(Mb, "passive", { get: function() {
            Lb = true;
          } });
          window.addEventListener("test", Mb, Mb);
          window.removeEventListener("test", Mb, Mb);
        } catch (a2) {
          Lb = false;
        }
      var Mb;
      function Nb(a2, b2, c2, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b2.apply(c2, l);
        } catch (m) {
          this.onError(m);
        }
      }
      var Ob = false;
      var Pb = null;
      var Qb = false;
      var Rb = null;
      var Sb = { onError: function(a2) {
        Ob = true;
        Pb = a2;
      } };
      function Tb(a2, b2, c2, d, e, f, g, h, k) {
        Ob = false;
        Pb = null;
        Nb.apply(Sb, arguments);
      }
      function Ub(a2, b2, c2, d, e, f, g, h, k) {
        Tb.apply(this, arguments);
        if (Ob) {
          if (Ob) {
            var l = Pb;
            Ob = false;
            Pb = null;
          } else
            throw Error(p2(198));
          Qb || (Qb = true, Rb = l);
        }
      }
      function Vb(a2) {
        var b2 = a2, c2 = a2;
        if (a2.alternate)
          for (; b2.return; )
            b2 = b2.return;
        else {
          a2 = b2;
          do
            b2 = a2, 0 !== (b2.flags & 4098) && (c2 = b2.return), a2 = b2.return;
          while (a2);
        }
        return 3 === b2.tag ? c2 : null;
      }
      function Wb(a2) {
        if (13 === a2.tag) {
          var b2 = a2.memoizedState;
          null === b2 && (a2 = a2.alternate, null !== a2 && (b2 = a2.memoizedState));
          if (null !== b2)
            return b2.dehydrated;
        }
        return null;
      }
      function Xb(a2) {
        if (Vb(a2) !== a2)
          throw Error(p2(188));
      }
      function Yb(a2) {
        var b2 = a2.alternate;
        if (!b2) {
          b2 = Vb(a2);
          if (null === b2)
            throw Error(p2(188));
          return b2 !== a2 ? null : a2;
        }
        for (var c2 = a2, d = b2; ; ) {
          var e = c2.return;
          if (null === e)
            break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c2 = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c2)
                return Xb(e), a2;
              if (f === d)
                return Xb(e), b2;
              f = f.sibling;
            }
            throw Error(p2(188));
          }
          if (c2.return !== d.return)
            c2 = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c2) {
                g = true;
                c2 = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c2 = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c2) {
                  g = true;
                  c2 = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c2 = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g)
                throw Error(p2(189));
            }
          }
          if (c2.alternate !== d)
            throw Error(p2(190));
        }
        if (3 !== c2.tag)
          throw Error(p2(188));
        return c2.stateNode.current === c2 ? a2 : b2;
      }
      function Zb(a2) {
        a2 = Yb(a2);
        return null !== a2 ? $b(a2) : null;
      }
      function $b(a2) {
        if (5 === a2.tag || 6 === a2.tag)
          return a2;
        for (a2 = a2.child; null !== a2; ) {
          var b2 = $b(a2);
          if (null !== b2)
            return b2;
          a2 = a2.sibling;
        }
        return null;
      }
      var ac = ca.unstable_scheduleCallback;
      var bc = ca.unstable_cancelCallback;
      var cc = ca.unstable_shouldYield;
      var dc = ca.unstable_requestPaint;
      var B = ca.unstable_now;
      var ec = ca.unstable_getCurrentPriorityLevel;
      var fc = ca.unstable_ImmediatePriority;
      var gc = ca.unstable_UserBlockingPriority;
      var hc = ca.unstable_NormalPriority;
      var ic = ca.unstable_LowPriority;
      var jc = ca.unstable_IdlePriority;
      var kc = null;
      var lc = null;
      function mc(a2) {
        if (lc && "function" === typeof lc.onCommitFiberRoot)
          try {
            lc.onCommitFiberRoot(kc, a2, void 0, 128 === (a2.current.flags & 128));
          } catch (b2) {
          }
      }
      var oc = Math.clz32 ? Math.clz32 : nc;
      var pc = Math.log;
      var qc = Math.LN2;
      function nc(a2) {
        a2 >>>= 0;
        return 0 === a2 ? 32 : 31 - (pc(a2) / qc | 0) | 0;
      }
      var rc = 64;
      var sc = 4194304;
      function tc(a2) {
        switch (a2 & -a2) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a2 & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a2 & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a2;
        }
      }
      function uc(a2, b2) {
        var c2 = a2.pendingLanes;
        if (0 === c2)
          return 0;
        var d = 0, e = a2.suspendedLanes, f = a2.pingedLanes, g = c2 & 268435455;
        if (0 !== g) {
          var h = g & ~e;
          0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
        } else
          g = c2 & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
        if (0 === d)
          return 0;
        if (0 !== b2 && b2 !== d && 0 === (b2 & e) && (e = d & -d, f = b2 & -b2, e >= f || 16 === e && 0 !== (f & 4194240)))
          return b2;
        0 !== (d & 4) && (d |= c2 & 16);
        b2 = a2.entangledLanes;
        if (0 !== b2)
          for (a2 = a2.entanglements, b2 &= d; 0 < b2; )
            c2 = 31 - oc(b2), e = 1 << c2, d |= a2[c2], b2 &= ~e;
        return d;
      }
      function vc(a2, b2) {
        switch (a2) {
          case 1:
          case 2:
          case 4:
            return b2 + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b2 + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function wc(a2, b2) {
        for (var c2 = a2.suspendedLanes, d = a2.pingedLanes, e = a2.expirationTimes, f = a2.pendingLanes; 0 < f; ) {
          var g = 31 - oc(f), h = 1 << g, k = e[g];
          if (-1 === k) {
            if (0 === (h & c2) || 0 !== (h & d))
              e[g] = vc(h, b2);
          } else
            k <= b2 && (a2.expiredLanes |= h);
          f &= ~h;
        }
      }
      function xc(a2) {
        a2 = a2.pendingLanes & -1073741825;
        return 0 !== a2 ? a2 : a2 & 1073741824 ? 1073741824 : 0;
      }
      function yc() {
        var a2 = rc;
        rc <<= 1;
        0 === (rc & 4194240) && (rc = 64);
        return a2;
      }
      function zc(a2) {
        for (var b2 = [], c2 = 0; 31 > c2; c2++)
          b2.push(a2);
        return b2;
      }
      function Ac(a2, b2, c2) {
        a2.pendingLanes |= b2;
        536870912 !== b2 && (a2.suspendedLanes = 0, a2.pingedLanes = 0);
        a2 = a2.eventTimes;
        b2 = 31 - oc(b2);
        a2[b2] = c2;
      }
      function Bc(a2, b2) {
        var c2 = a2.pendingLanes & ~b2;
        a2.pendingLanes = b2;
        a2.suspendedLanes = 0;
        a2.pingedLanes = 0;
        a2.expiredLanes &= b2;
        a2.mutableReadLanes &= b2;
        a2.entangledLanes &= b2;
        b2 = a2.entanglements;
        var d = a2.eventTimes;
        for (a2 = a2.expirationTimes; 0 < c2; ) {
          var e = 31 - oc(c2), f = 1 << e;
          b2[e] = 0;
          d[e] = -1;
          a2[e] = -1;
          c2 &= ~f;
        }
      }
      function Cc(a2, b2) {
        var c2 = a2.entangledLanes |= b2;
        for (a2 = a2.entanglements; c2; ) {
          var d = 31 - oc(c2), e = 1 << d;
          e & b2 | a2[d] & b2 && (a2[d] |= b2);
          c2 &= ~e;
        }
      }
      var C = 0;
      function Dc(a2) {
        a2 &= -a2;
        return 1 < a2 ? 4 < a2 ? 0 !== (a2 & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic;
      var Jc = false;
      var Kc = [];
      var Lc = null;
      var Mc = null;
      var Nc = null;
      var Oc = /* @__PURE__ */ new Map();
      var Pc = /* @__PURE__ */ new Map();
      var Qc = [];
      var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Sc(a2, b2) {
        switch (a2) {
          case "focusin":
          case "focusout":
            Lc = null;
            break;
          case "dragenter":
          case "dragleave":
            Mc = null;
            break;
          case "mouseover":
          case "mouseout":
            Nc = null;
            break;
          case "pointerover":
          case "pointerout":
            Oc.delete(b2.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Pc.delete(b2.pointerId);
        }
      }
      function Tc(a2, b2, c2, d, e, f) {
        if (null === a2 || a2.nativeEvent !== f)
          return a2 = { blockedOn: b2, domEventName: c2, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b2 && (b2 = Cb(b2), null !== b2 && Fc(b2)), a2;
        a2.eventSystemFlags |= d;
        b2 = a2.targetContainers;
        null !== e && -1 === b2.indexOf(e) && b2.push(e);
        return a2;
      }
      function Uc(a2, b2, c2, d, e) {
        switch (b2) {
          case "focusin":
            return Lc = Tc(Lc, a2, b2, c2, d, e), true;
          case "dragenter":
            return Mc = Tc(Mc, a2, b2, c2, d, e), true;
          case "mouseover":
            return Nc = Tc(Nc, a2, b2, c2, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            Oc.set(f, Tc(Oc.get(f) || null, a2, b2, c2, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a2, b2, c2, d, e)), true;
        }
        return false;
      }
      function Vc(a2) {
        var b2 = Wc(a2.target);
        if (null !== b2) {
          var c2 = Vb(b2);
          if (null !== c2) {
            if (b2 = c2.tag, 13 === b2) {
              if (b2 = Wb(c2), null !== b2) {
                a2.blockedOn = b2;
                Ic(a2.priority, function() {
                  Gc(c2);
                });
                return;
              }
            } else if (3 === b2 && c2.stateNode.current.memoizedState.isDehydrated) {
              a2.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a2.blockedOn = null;
      }
      function Xc(a2) {
        if (null !== a2.blockedOn)
          return false;
        for (var b2 = a2.targetContainers; 0 < b2.length; ) {
          var c2 = Yc(a2.domEventName, a2.eventSystemFlags, b2[0], a2.nativeEvent);
          if (null === c2) {
            c2 = a2.nativeEvent;
            var d = new c2.constructor(c2.type, c2);
            wb = d;
            c2.target.dispatchEvent(d);
            wb = null;
          } else
            return b2 = Cb(c2), null !== b2 && Fc(b2), a2.blockedOn = c2, false;
          b2.shift();
        }
        return true;
      }
      function Zc(a2, b2, c2) {
        Xc(a2) && c2.delete(b2);
      }
      function $c() {
        Jc = false;
        null !== Lc && Xc(Lc) && (Lc = null);
        null !== Mc && Xc(Mc) && (Mc = null);
        null !== Nc && Xc(Nc) && (Nc = null);
        Oc.forEach(Zc);
        Pc.forEach(Zc);
      }
      function ad(a2, b2) {
        a2.blockedOn === b2 && (a2.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
      }
      function bd(a2) {
        function b2(b3) {
          return ad(b3, a2);
        }
        if (0 < Kc.length) {
          ad(Kc[0], a2);
          for (var c2 = 1; c2 < Kc.length; c2++) {
            var d = Kc[c2];
            d.blockedOn === a2 && (d.blockedOn = null);
          }
        }
        null !== Lc && ad(Lc, a2);
        null !== Mc && ad(Mc, a2);
        null !== Nc && ad(Nc, a2);
        Oc.forEach(b2);
        Pc.forEach(b2);
        for (c2 = 0; c2 < Qc.length; c2++)
          d = Qc[c2], d.blockedOn === a2 && (d.blockedOn = null);
        for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); )
          Vc(c2), null === c2.blockedOn && Qc.shift();
      }
      var cd = ua.ReactCurrentBatchConfig;
      var dd = true;
      function ed(a2, b2, c2, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 1, fd(a2, b2, c2, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function gd(a2, b2, c2, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 4, fd(a2, b2, c2, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function fd(a2, b2, c2, d) {
        if (dd) {
          var e = Yc(a2, b2, c2, d);
          if (null === e)
            hd(a2, b2, d, id, c2), Sc(a2, d);
          else if (Uc(e, a2, b2, c2, d))
            d.stopPropagation();
          else if (Sc(a2, d), b2 & 4 && -1 < Rc.indexOf(a2)) {
            for (; null !== e; ) {
              var f = Cb(e);
              null !== f && Ec(f);
              f = Yc(a2, b2, c2, d);
              null === f && hd(a2, b2, d, id, c2);
              if (f === e)
                break;
              e = f;
            }
            null !== e && d.stopPropagation();
          } else
            hd(a2, b2, d, null, c2);
        }
      }
      var id = null;
      function Yc(a2, b2, c2, d) {
        id = null;
        a2 = xb(d);
        a2 = Wc(a2);
        if (null !== a2)
          if (b2 = Vb(a2), null === b2)
            a2 = null;
          else if (c2 = b2.tag, 13 === c2) {
            a2 = Wb(b2);
            if (null !== a2)
              return a2;
            a2 = null;
          } else if (3 === c2) {
            if (b2.stateNode.current.memoizedState.isDehydrated)
              return 3 === b2.tag ? b2.stateNode.containerInfo : null;
            a2 = null;
          } else
            b2 !== a2 && (a2 = null);
        id = a2;
        return null;
      }
      function jd(a2) {
        switch (a2) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (ec()) {
              case fc:
                return 1;
              case gc:
                return 4;
              case hc:
              case ic:
                return 16;
              case jc:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md)
          return md;
        var a2, b2 = ld, c2 = b2.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a2 = 0; a2 < c2 && b2[a2] === e[a2]; a2++)
          ;
        var g = c2 - a2;
        for (d = 1; d <= g && b2[c2 - d] === e[f - d]; d++)
          ;
        return md = e.slice(a2, 1 < d ? 1 - d : void 0);
      }
      function od(a2) {
        var b2 = a2.keyCode;
        "charCode" in a2 ? (a2 = a2.charCode, 0 === a2 && 13 === b2 && (a2 = 13)) : a2 = b2;
        10 === a2 && (a2 = 13);
        return 32 <= a2 || 13 === a2 ? a2 : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a2) {
        function b2(b3, d, e, f, g) {
          this._reactName = b3;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c2 in a2)
            a2.hasOwnProperty(c2) && (b3 = a2[c2], this[c2] = b3 ? b3(f) : f[c2]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        A(b2.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a3 = this.nativeEvent;
          a3 && (a3.preventDefault ? a3.preventDefault() : "unknown" !== typeof a3.returnValue && (a3.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a3 = this.nativeEvent;
          a3 && (a3.stopPropagation ? a3.stopPropagation() : "unknown" !== typeof a3.cancelBubble && (a3.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b2;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a2) {
        return a2.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = A({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a2) {
        return void 0 === a2.relatedTarget ? a2.fromElement === a2.srcElement ? a2.toElement : a2.fromElement : a2.relatedTarget;
      }, movementX: function(a2) {
        if ("movementX" in a2)
          return a2.movementX;
        a2 !== yd && (yd && "mousemove" === a2.type ? (wd = a2.screenX - yd.screenX, xd = a2.screenY - yd.screenY) : xd = wd = 0, yd = a2);
        return wd;
      }, movementY: function(a2) {
        return "movementY" in a2 ? a2.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = A({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = A({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = A({}, sd, { clipboardData: function(a2) {
        return "clipboardData" in a2 ? a2.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = A({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a2) {
        var b2 = this.nativeEvent;
        return b2.getModifierState ? b2.getModifierState(a2) : (a2 = Od[a2]) ? !!b2[a2] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = A({}, ud, { key: function(a2) {
        if (a2.key) {
          var b2 = Md[a2.key] || a2.key;
          if ("Unidentified" !== b2)
            return b2;
        }
        return "keypress" === a2.type ? (a2 = od(a2), 13 === a2 ? "Enter" : String.fromCharCode(a2)) : "keydown" === a2.type || "keyup" === a2.type ? Nd[a2.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a2) {
        return "keypress" === a2.type ? od(a2) : 0;
      }, keyCode: function(a2) {
        return "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
      }, which: function(a2) {
        return "keypress" === a2.type ? od(a2) : "keydown" === a2.type || "keyup" === a2.type ? a2.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = A({}, Ad, {
        deltaX: function(a2) {
          return "deltaX" in a2 ? a2.deltaX : "wheelDeltaX" in a2 ? -a2.wheelDeltaX : 0;
        },
        deltaY: function(a2) {
          return "deltaY" in a2 ? a2.deltaY : "wheelDeltaY" in a2 ? -a2.wheelDeltaY : "wheelDelta" in a2 ? -a2.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = ia && "CompositionEvent" in window;
      var be = null;
      ia && "documentMode" in document && (be = document.documentMode);
      var ce = ia && "TextEvent" in window && !be;
      var de = ia && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a2, b2) {
        switch (a2) {
          case "keyup":
            return -1 !== $d.indexOf(b2.keyCode);
          case "keydown":
            return 229 !== b2.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a2) {
        a2 = a2.detail;
        return "object" === typeof a2 && "data" in a2 ? a2.data : null;
      }
      var ie = false;
      function je(a2, b2) {
        switch (a2) {
          case "compositionend":
            return he(b2);
          case "keypress":
            if (32 !== b2.which)
              return null;
            fe = true;
            return ee;
          case "textInput":
            return a2 = b2.data, a2 === ee && fe ? null : a2;
          default:
            return null;
        }
      }
      function ke(a2, b2) {
        if (ie)
          return "compositionend" === a2 || !ae && ge(a2, b2) ? (a2 = nd(), md = ld = kd = null, ie = false, a2) : null;
        switch (a2) {
          case "paste":
            return null;
          case "keypress":
            if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
              if (b2.char && 1 < b2.char.length)
                return b2.char;
              if (b2.which)
                return String.fromCharCode(b2.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b2.locale ? null : b2.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a2) {
        var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
        return "input" === b2 ? !!le[a2.type] : "textarea" === b2 ? true : false;
      }
      function ne(a2, b2, c2, d) {
        Eb(d);
        b2 = oe(b2, "onChange");
        0 < b2.length && (c2 = new td("onChange", "change", null, c2, d), a2.push({ event: c2, listeners: b2 }));
      }
      var pe = null;
      var qe = null;
      function re(a2) {
        se(a2, 0);
      }
      function te(a2) {
        var b2 = ue(a2);
        if (Wa(b2))
          return a2;
      }
      function ve(a2, b2) {
        if ("change" === a2)
          return b2;
      }
      var we = false;
      if (ia) {
        if (ia) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else
          xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a2) {
        if ("value" === a2.propertyName && te(qe)) {
          var b2 = [];
          ne(b2, qe, a2, xb(a2));
          Jb(re, b2);
        }
      }
      function Ce(a2, b2, c2) {
        "focusin" === a2 ? (Ae(), pe = b2, qe = c2, pe.attachEvent("onpropertychange", Be)) : "focusout" === a2 && Ae();
      }
      function De(a2) {
        if ("selectionchange" === a2 || "keyup" === a2 || "keydown" === a2)
          return te(qe);
      }
      function Ee(a2, b2) {
        if ("click" === a2)
          return te(b2);
      }
      function Fe(a2, b2) {
        if ("input" === a2 || "change" === a2)
          return te(b2);
      }
      function Ge(a2, b2) {
        return a2 === b2 && (0 !== a2 || 1 / a2 === 1 / b2) || a2 !== a2 && b2 !== b2;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      function Ie(a2, b2) {
        if (He(a2, b2))
          return true;
        if ("object" !== typeof a2 || null === a2 || "object" !== typeof b2 || null === b2)
          return false;
        var c2 = Object.keys(a2), d = Object.keys(b2);
        if (c2.length !== d.length)
          return false;
        for (d = 0; d < c2.length; d++) {
          var e = c2[d];
          if (!ja.call(b2, e) || !He(a2[e], b2[e]))
            return false;
        }
        return true;
      }
      function Je(a2) {
        for (; a2 && a2.firstChild; )
          a2 = a2.firstChild;
        return a2;
      }
      function Ke(a2, b2) {
        var c2 = Je(a2);
        a2 = 0;
        for (var d; c2; ) {
          if (3 === c2.nodeType) {
            d = a2 + c2.textContent.length;
            if (a2 <= b2 && d >= b2)
              return { node: c2, offset: b2 - a2 };
            a2 = d;
          }
          a: {
            for (; c2; ) {
              if (c2.nextSibling) {
                c2 = c2.nextSibling;
                break a;
              }
              c2 = c2.parentNode;
            }
            c2 = void 0;
          }
          c2 = Je(c2);
        }
      }
      function Le(a2, b2) {
        return a2 && b2 ? a2 === b2 ? true : a2 && 3 === a2.nodeType ? false : b2 && 3 === b2.nodeType ? Le(a2, b2.parentNode) : "contains" in a2 ? a2.contains(b2) : a2.compareDocumentPosition ? !!(a2.compareDocumentPosition(b2) & 16) : false : false;
      }
      function Me() {
        for (var a2 = window, b2 = Xa(); b2 instanceof a2.HTMLIFrameElement; ) {
          try {
            var c2 = "string" === typeof b2.contentWindow.location.href;
          } catch (d) {
            c2 = false;
          }
          if (c2)
            a2 = b2.contentWindow;
          else
            break;
          b2 = Xa(a2.document);
        }
        return b2;
      }
      function Ne(a2) {
        var b2 = a2 && a2.nodeName && a2.nodeName.toLowerCase();
        return b2 && ("input" === b2 && ("text" === a2.type || "search" === a2.type || "tel" === a2.type || "url" === a2.type || "password" === a2.type) || "textarea" === b2 || "true" === a2.contentEditable);
      }
      function Oe(a2) {
        var b2 = Me(), c2 = a2.focusedElem, d = a2.selectionRange;
        if (b2 !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
          if (null !== d && Ne(c2)) {
            if (b2 = d.start, a2 = d.end, void 0 === a2 && (a2 = b2), "selectionStart" in c2)
              c2.selectionStart = b2, c2.selectionEnd = Math.min(a2, c2.value.length);
            else if (a2 = (b2 = c2.ownerDocument || document) && b2.defaultView || window, a2.getSelection) {
              a2 = a2.getSelection();
              var e = c2.textContent.length, f = Math.min(d.start, e);
              d = void 0 === d.end ? f : Math.min(d.end, e);
              !a2.extend && f > d && (e = d, d = f, f = e);
              e = Ke(c2, f);
              var g = Ke(
                c2,
                d
              );
              e && g && (1 !== a2.rangeCount || a2.anchorNode !== e.node || a2.anchorOffset !== e.offset || a2.focusNode !== g.node || a2.focusOffset !== g.offset) && (b2 = b2.createRange(), b2.setStart(e.node, e.offset), a2.removeAllRanges(), f > d ? (a2.addRange(b2), a2.extend(g.node, g.offset)) : (b2.setEnd(g.node, g.offset), a2.addRange(b2)));
            }
          }
          b2 = [];
          for (a2 = c2; a2 = a2.parentNode; )
            1 === a2.nodeType && b2.push({ element: a2, left: a2.scrollLeft, top: a2.scrollTop });
          "function" === typeof c2.focus && c2.focus();
          for (c2 = 0; c2 < b2.length; c2++)
            a2 = b2[c2], a2.element.scrollLeft = a2.left, a2.element.scrollTop = a2.top;
        }
      }
      var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a2, b2, c2) {
        var d = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b2 = new td("onSelect", "select", null, b2, c2), a2.push({ event: b2, listeners: d }), b2.target = Qe)));
      }
      function Ve(a2, b2) {
        var c2 = {};
        c2[a2.toLowerCase()] = b2.toLowerCase();
        c2["Webkit" + a2] = "webkit" + b2;
        c2["Moz" + a2] = "moz" + b2;
        return c2;
      }
      var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
      var Xe = {};
      var Ye = {};
      ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
      function Ze(a2) {
        if (Xe[a2])
          return Xe[a2];
        if (!We[a2])
          return a2;
        var b2 = We[a2], c2;
        for (c2 in b2)
          if (b2.hasOwnProperty(c2) && c2 in Ye)
            return Xe[a2] = b2[c2];
        return a2;
      }
      var $e = Ze("animationend");
      var af = Ze("animationiteration");
      var bf = Ze("animationstart");
      var cf = Ze("transitionend");
      var df = /* @__PURE__ */ new Map();
      var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ff(a2, b2) {
        df.set(a2, b2);
        fa(b2, [a2]);
      }
      for (gf = 0; gf < ef.length; gf++) {
        hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
        ff(jf, "on" + kf);
      }
      var hf;
      var jf;
      var kf;
      var gf;
      ff($e, "onAnimationEnd");
      ff(af, "onAnimationIteration");
      ff(bf, "onAnimationStart");
      ff("dblclick", "onDoubleClick");
      ff("focusin", "onFocus");
      ff("focusout", "onBlur");
      ff(cf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
      function nf(a2, b2, c2) {
        var d = a2.type || "unknown-event";
        a2.currentTarget = c2;
        Ub(d, b2, void 0, a2);
        a2.currentTarget = null;
      }
      function se(a2, b2) {
        b2 = 0 !== (b2 & 4);
        for (var c2 = 0; c2 < a2.length; c2++) {
          var d = a2[c2], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b2)
              for (var g = d.length - 1; 0 <= g; g--) {
                var h = d[g], k = h.instance, l = h.currentTarget;
                h = h.listener;
                if (k !== f && e.isPropagationStopped())
                  break a;
                nf(e, h, l);
                f = k;
              }
            else
              for (g = 0; g < d.length; g++) {
                h = d[g];
                k = h.instance;
                l = h.currentTarget;
                h = h.listener;
                if (k !== f && e.isPropagationStopped())
                  break a;
                nf(e, h, l);
                f = k;
              }
          }
        }
        if (Qb)
          throw a2 = Rb, Qb = false, Rb = null, a2;
      }
      function D(a2, b2) {
        var c2 = b2[of];
        void 0 === c2 && (c2 = b2[of] = /* @__PURE__ */ new Set());
        var d = a2 + "__bubble";
        c2.has(d) || (pf(b2, a2, 2, false), c2.add(d));
      }
      function qf(a2, b2, c2) {
        var d = 0;
        b2 && (d |= 4);
        pf(c2, a2, d, b2);
      }
      var rf = "_reactListening" + Math.random().toString(36).slice(2);
      function sf(a2) {
        if (!a2[rf]) {
          a2[rf] = true;
          da.forEach(function(b3) {
            "selectionchange" !== b3 && (mf.has(b3) || qf(b3, false, a2), qf(b3, true, a2));
          });
          var b2 = 9 === a2.nodeType ? a2 : a2.ownerDocument;
          null === b2 || b2[rf] || (b2[rf] = true, qf("selectionchange", false, b2));
        }
      }
      function pf(a2, b2, c2, d) {
        switch (jd(b2)) {
          case 1:
            var e = ed;
            break;
          case 4:
            e = gd;
            break;
          default:
            e = fd;
        }
        c2 = e.bind(null, b2, c2, a2);
        e = void 0;
        !Lb || "touchstart" !== b2 && "touchmove" !== b2 && "wheel" !== b2 || (e = true);
        d ? void 0 !== e ? a2.addEventListener(b2, c2, { capture: true, passive: e }) : a2.addEventListener(b2, c2, true) : void 0 !== e ? a2.addEventListener(b2, c2, { passive: e }) : a2.addEventListener(b2, c2, false);
      }
      function hd(a2, b2, c2, d, e) {
        var f = d;
        if (0 === (b2 & 1) && 0 === (b2 & 2) && null !== d)
          a:
            for (; ; ) {
              if (null === d)
                return;
              var g = d.tag;
              if (3 === g || 4 === g) {
                var h = d.stateNode.containerInfo;
                if (h === e || 8 === h.nodeType && h.parentNode === e)
                  break;
                if (4 === g)
                  for (g = d.return; null !== g; ) {
                    var k = g.tag;
                    if (3 === k || 4 === k) {
                      if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e)
                        return;
                    }
                    g = g.return;
                  }
                for (; null !== h; ) {
                  g = Wc(h);
                  if (null === g)
                    return;
                  k = g.tag;
                  if (5 === k || 6 === k) {
                    d = f = g;
                    continue a;
                  }
                  h = h.parentNode;
                }
              }
              d = d.return;
            }
        Jb(function() {
          var d2 = f, e2 = xb(c2), g2 = [];
          a: {
            var h2 = df.get(a2);
            if (void 0 !== h2) {
              var k2 = td, n = a2;
              switch (a2) {
                case "keypress":
                  if (0 === od(c2))
                    break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  n = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  n = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c2.button)
                    break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case $e:
                case af:
                case bf:
                  k2 = Hd;
                  break;
                case cf:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var t = 0 !== (b2 & 4), J = !t && "scroll" === a2, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
              t = [];
              for (var w = d2, u; null !== w; ) {
                u = w;
                var F = u.stateNode;
                5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
                if (J)
                  break;
                w = w.return;
              }
              0 < t.length && (h2 = new k2(h2, n, null, c2, e2), g2.push({ event: h2, listeners: t }));
            }
          }
          if (0 === (b2 & 7)) {
            a: {
              h2 = "mouseover" === a2 || "pointerover" === a2;
              k2 = "mouseout" === a2 || "pointerout" === a2;
              if (h2 && c2 !== wb && (n = c2.relatedTarget || c2.fromElement) && (Wc(n) || n[uf]))
                break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (n = c2.relatedTarget || c2.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag))
                    n = null;
                } else
                  k2 = null, n = d2;
                if (k2 !== n) {
                  t = Bd;
                  F = "onMouseLeave";
                  x = "onMouseEnter";
                  w = "mouse";
                  if ("pointerout" === a2 || "pointerover" === a2)
                    t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                  J = null == k2 ? h2 : ue(k2);
                  u = null == n ? h2 : ue(n);
                  h2 = new t(F, w + "leave", k2, c2, e2);
                  h2.target = J;
                  h2.relatedTarget = u;
                  F = null;
                  Wc(e2) === d2 && (t = new t(x, w + "enter", n, c2, e2), t.target = u, t.relatedTarget = J, F = t);
                  J = F;
                  if (k2 && n)
                    b: {
                      t = k2;
                      x = n;
                      w = 0;
                      for (u = t; u; u = vf(u))
                        w++;
                      u = 0;
                      for (F = x; F; F = vf(F))
                        u++;
                      for (; 0 < w - u; )
                        t = vf(t), w--;
                      for (; 0 < u - w; )
                        x = vf(x), u--;
                      for (; w--; ) {
                        if (t === x || null !== x && t === x.alternate)
                          break b;
                        t = vf(t);
                        x = vf(x);
                      }
                      t = null;
                    }
                  else
                    t = null;
                  null !== k2 && wf(g2, h2, k2, t, false);
                  null !== n && null !== J && wf(g2, J, n, t, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type)
                var na = ve;
              else if (me(h2))
                if (we)
                  na = Fe;
                else {
                  na = De;
                  var xa = Ce;
                }
              else
                (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
              if (na && (na = na(a2, d2))) {
                ne(g2, na, c2, e2);
                break a;
              }
              xa && xa(a2, h2, d2);
              "focusout" === a2 && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
            }
            xa = d2 ? ue(d2) : window;
            switch (a2) {
              case "focusin":
                if (me(xa) || "true" === xa.contentEditable)
                  Qe = xa, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c2, e2);
                break;
              case "selectionchange":
                if (Pe)
                  break;
              case "keydown":
              case "keyup":
                Ue(g2, c2, e2);
            }
            var $a;
            if (ae)
              b: {
                switch (a2) {
                  case "compositionstart":
                    var ba = "onCompositionStart";
                    break b;
                  case "compositionend":
                    ba = "onCompositionEnd";
                    break b;
                  case "compositionupdate":
                    ba = "onCompositionUpdate";
                    break b;
                }
                ba = void 0;
              }
            else
              ie ? ge(a2, c2) && (ba = "onCompositionEnd") : "keydown" === a2 && 229 === c2.keyCode && (ba = "onCompositionStart");
            ba && (de && "ko" !== c2.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a2, null, c2, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c2), null !== $a && (ba.data = $a))));
            if ($a = ce ? je(a2, c2) : ke(a2, c2))
              d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c2, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
          }
          se(g2, b2);
        });
      }
      function tf(a2, b2, c2) {
        return { instance: a2, listener: b2, currentTarget: c2 };
      }
      function oe(a2, b2) {
        for (var c2 = b2 + "Capture", d = []; null !== a2; ) {
          var e = a2, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Kb(a2, c2), null != f && d.unshift(tf(a2, f, e)), f = Kb(a2, b2), null != f && d.push(tf(a2, f, e)));
          a2 = a2.return;
        }
        return d;
      }
      function vf(a2) {
        if (null === a2)
          return null;
        do
          a2 = a2.return;
        while (a2 && 5 !== a2.tag);
        return a2 ? a2 : null;
      }
      function wf(a2, b2, c2, d, e) {
        for (var f = b2._reactName, g = []; null !== c2 && c2 !== d; ) {
          var h = c2, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d)
            break;
          5 === h.tag && null !== l && (h = l, e ? (k = Kb(c2, f), null != k && g.unshift(tf(c2, k, h))) : e || (k = Kb(c2, f), null != k && g.push(tf(c2, k, h))));
          c2 = c2.return;
        }
        0 !== g.length && a2.push({ event: b2, listeners: g });
      }
      var xf = /\r\n?/g;
      var yf = /\u0000|\uFFFD/g;
      function zf(a2) {
        return ("string" === typeof a2 ? a2 : "" + a2).replace(xf, "\n").replace(yf, "");
      }
      function Af(a2, b2, c2) {
        b2 = zf(b2);
        if (zf(a2) !== b2 && c2)
          throw Error(p2(425));
      }
      function Bf() {
      }
      var Cf = null;
      var Df = null;
      function Ef(a2, b2) {
        return "textarea" === a2 || "noscript" === a2 || "string" === typeof b2.children || "number" === typeof b2.children || "object" === typeof b2.dangerouslySetInnerHTML && null !== b2.dangerouslySetInnerHTML && null != b2.dangerouslySetInnerHTML.__html;
      }
      var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
      var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Hf = "function" === typeof Promise ? Promise : void 0;
      var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a2) {
        return Hf.resolve(null).then(a2).catch(If);
      } : Ff;
      function If(a2) {
        setTimeout(function() {
          throw a2;
        });
      }
      function Kf(a2, b2) {
        var c2 = b2, d = 0;
        do {
          var e = c2.nextSibling;
          a2.removeChild(c2);
          if (e && 8 === e.nodeType)
            if (c2 = e.data, "/$" === c2) {
              if (0 === d) {
                a2.removeChild(e);
                bd(b2);
                return;
              }
              d--;
            } else
              "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d++;
          c2 = e;
        } while (c2);
        bd(b2);
      }
      function Lf(a2) {
        for (; null != a2; a2 = a2.nextSibling) {
          var b2 = a2.nodeType;
          if (1 === b2 || 3 === b2)
            break;
          if (8 === b2) {
            b2 = a2.data;
            if ("$" === b2 || "$!" === b2 || "$?" === b2)
              break;
            if ("/$" === b2)
              return null;
          }
        }
        return a2;
      }
      function Mf(a2) {
        a2 = a2.previousSibling;
        for (var b2 = 0; a2; ) {
          if (8 === a2.nodeType) {
            var c2 = a2.data;
            if ("$" === c2 || "$!" === c2 || "$?" === c2) {
              if (0 === b2)
                return a2;
              b2--;
            } else
              "/$" === c2 && b2++;
          }
          a2 = a2.previousSibling;
        }
        return null;
      }
      var Nf = Math.random().toString(36).slice(2);
      var Of = "__reactFiber$" + Nf;
      var Pf = "__reactProps$" + Nf;
      var uf = "__reactContainer$" + Nf;
      var of = "__reactEvents$" + Nf;
      var Qf = "__reactListeners$" + Nf;
      var Rf = "__reactHandles$" + Nf;
      function Wc(a2) {
        var b2 = a2[Of];
        if (b2)
          return b2;
        for (var c2 = a2.parentNode; c2; ) {
          if (b2 = c2[uf] || c2[Of]) {
            c2 = b2.alternate;
            if (null !== b2.child || null !== c2 && null !== c2.child)
              for (a2 = Mf(a2); null !== a2; ) {
                if (c2 = a2[Of])
                  return c2;
                a2 = Mf(a2);
              }
            return b2;
          }
          a2 = c2;
          c2 = a2.parentNode;
        }
        return null;
      }
      function Cb(a2) {
        a2 = a2[Of] || a2[uf];
        return !a2 || 5 !== a2.tag && 6 !== a2.tag && 13 !== a2.tag && 3 !== a2.tag ? null : a2;
      }
      function ue(a2) {
        if (5 === a2.tag || 6 === a2.tag)
          return a2.stateNode;
        throw Error(p2(33));
      }
      function Db(a2) {
        return a2[Pf] || null;
      }
      var Sf = [];
      var Tf = -1;
      function Uf(a2) {
        return { current: a2 };
      }
      function E(a2) {
        0 > Tf || (a2.current = Sf[Tf], Sf[Tf] = null, Tf--);
      }
      function G(a2, b2) {
        Tf++;
        Sf[Tf] = a2.current;
        a2.current = b2;
      }
      var Vf = {};
      var H = Uf(Vf);
      var Wf = Uf(false);
      var Xf = Vf;
      function Yf(a2, b2) {
        var c2 = a2.type.contextTypes;
        if (!c2)
          return Vf;
        var d = a2.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b2)
          return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c2)
          e[f] = b2[f];
        d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = b2, a2.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Zf(a2) {
        a2 = a2.childContextTypes;
        return null !== a2 && void 0 !== a2;
      }
      function $f() {
        E(Wf);
        E(H);
      }
      function ag(a2, b2, c2) {
        if (H.current !== Vf)
          throw Error(p2(168));
        G(H, b2);
        G(Wf, c2);
      }
      function bg(a2, b2, c2) {
        var d = a2.stateNode;
        b2 = b2.childContextTypes;
        if ("function" !== typeof d.getChildContext)
          return c2;
        d = d.getChildContext();
        for (var e in d)
          if (!(e in b2))
            throw Error(p2(108, Ra(a2) || "Unknown", e));
        return A({}, c2, d);
      }
      function cg(a2) {
        a2 = (a2 = a2.stateNode) && a2.__reactInternalMemoizedMergedChildContext || Vf;
        Xf = H.current;
        G(H, a2);
        G(Wf, Wf.current);
        return true;
      }
      function dg(a2, b2, c2) {
        var d = a2.stateNode;
        if (!d)
          throw Error(p2(169));
        c2 ? (a2 = bg(a2, b2, Xf), d.__reactInternalMemoizedMergedChildContext = a2, E(Wf), E(H), G(H, a2)) : E(Wf);
        G(Wf, c2);
      }
      var eg = null;
      var fg = false;
      var gg = false;
      function hg(a2) {
        null === eg ? eg = [a2] : eg.push(a2);
      }
      function ig(a2) {
        fg = true;
        hg(a2);
      }
      function jg() {
        if (!gg && null !== eg) {
          gg = true;
          var a2 = 0, b2 = C;
          try {
            var c2 = eg;
            for (C = 1; a2 < c2.length; a2++) {
              var d = c2[a2];
              do
                d = d(true);
              while (null !== d);
            }
            eg = null;
            fg = false;
          } catch (e) {
            throw null !== eg && (eg = eg.slice(a2 + 1)), ac(fc, jg), e;
          } finally {
            C = b2, gg = false;
          }
        }
        return null;
      }
      var kg = [];
      var lg = 0;
      var mg = null;
      var ng = 0;
      var og = [];
      var pg = 0;
      var qg = null;
      var rg = 1;
      var sg = "";
      function tg(a2, b2) {
        kg[lg++] = ng;
        kg[lg++] = mg;
        mg = a2;
        ng = b2;
      }
      function ug(a2, b2, c2) {
        og[pg++] = rg;
        og[pg++] = sg;
        og[pg++] = qg;
        qg = a2;
        var d = rg;
        a2 = sg;
        var e = 32 - oc(d) - 1;
        d &= ~(1 << e);
        c2 += 1;
        var f = 32 - oc(b2) + e;
        if (30 < f) {
          var g = e - e % 5;
          f = (d & (1 << g) - 1).toString(32);
          d >>= g;
          e -= g;
          rg = 1 << 32 - oc(b2) + e | c2 << e | d;
          sg = f + a2;
        } else
          rg = 1 << f | c2 << e | d, sg = a2;
      }
      function vg(a2) {
        null !== a2.return && (tg(a2, 1), ug(a2, 1, 0));
      }
      function wg(a2) {
        for (; a2 === mg; )
          mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
        for (; a2 === qg; )
          qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
      }
      var xg = null;
      var yg = null;
      var I = false;
      var zg = null;
      function Ag(a2, b2) {
        var c2 = Bg(5, null, null, 0);
        c2.elementType = "DELETED";
        c2.stateNode = b2;
        c2.return = a2;
        b2 = a2.deletions;
        null === b2 ? (a2.deletions = [c2], a2.flags |= 16) : b2.push(c2);
      }
      function Cg(a2, b2) {
        switch (a2.tag) {
          case 5:
            var c2 = a2.type;
            b2 = 1 !== b2.nodeType || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
            return null !== b2 ? (a2.stateNode = b2, xg = a2, yg = Lf(b2.firstChild), true) : false;
          case 6:
            return b2 = "" === a2.pendingProps || 3 !== b2.nodeType ? null : b2, null !== b2 ? (a2.stateNode = b2, xg = a2, yg = null, true) : false;
          case 13:
            return b2 = 8 !== b2.nodeType ? null : b2, null !== b2 ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a2.memoizedState = { dehydrated: b2, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b2, c2.return = a2, a2.child = c2, xg = a2, yg = null, true) : false;
          default:
            return false;
        }
      }
      function Dg(a2) {
        return 0 !== (a2.mode & 1) && 0 === (a2.flags & 128);
      }
      function Eg(a2) {
        if (I) {
          var b2 = yg;
          if (b2) {
            var c2 = b2;
            if (!Cg(a2, b2)) {
              if (Dg(a2))
                throw Error(p2(418));
              b2 = Lf(c2.nextSibling);
              var d = xg;
              b2 && Cg(a2, b2) ? Ag(d, c2) : (a2.flags = a2.flags & -4097 | 2, I = false, xg = a2);
            }
          } else {
            if (Dg(a2))
              throw Error(p2(418));
            a2.flags = a2.flags & -4097 | 2;
            I = false;
            xg = a2;
          }
        }
      }
      function Fg(a2) {
        for (a2 = a2.return; null !== a2 && 5 !== a2.tag && 3 !== a2.tag && 13 !== a2.tag; )
          a2 = a2.return;
        xg = a2;
      }
      function Gg(a2) {
        if (a2 !== xg)
          return false;
        if (!I)
          return Fg(a2), I = true, false;
        var b2;
        (b2 = 3 !== a2.tag) && !(b2 = 5 !== a2.tag) && (b2 = a2.type, b2 = "head" !== b2 && "body" !== b2 && !Ef(a2.type, a2.memoizedProps));
        if (b2 && (b2 = yg)) {
          if (Dg(a2))
            throw Hg(), Error(p2(418));
          for (; b2; )
            Ag(a2, b2), b2 = Lf(b2.nextSibling);
        }
        Fg(a2);
        if (13 === a2.tag) {
          a2 = a2.memoizedState;
          a2 = null !== a2 ? a2.dehydrated : null;
          if (!a2)
            throw Error(p2(317));
          a: {
            a2 = a2.nextSibling;
            for (b2 = 0; a2; ) {
              if (8 === a2.nodeType) {
                var c2 = a2.data;
                if ("/$" === c2) {
                  if (0 === b2) {
                    yg = Lf(a2.nextSibling);
                    break a;
                  }
                  b2--;
                } else
                  "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b2++;
              }
              a2 = a2.nextSibling;
            }
            yg = null;
          }
        } else
          yg = xg ? Lf(a2.stateNode.nextSibling) : null;
        return true;
      }
      function Hg() {
        for (var a2 = yg; a2; )
          a2 = Lf(a2.nextSibling);
      }
      function Ig() {
        yg = xg = null;
        I = false;
      }
      function Jg(a2) {
        null === zg ? zg = [a2] : zg.push(a2);
      }
      var Kg = ua.ReactCurrentBatchConfig;
      function Lg(a2, b2, c2) {
        a2 = c2.ref;
        if (null !== a2 && "function" !== typeof a2 && "object" !== typeof a2) {
          if (c2._owner) {
            c2 = c2._owner;
            if (c2) {
              if (1 !== c2.tag)
                throw Error(p2(309));
              var d = c2.stateNode;
            }
            if (!d)
              throw Error(p2(147, a2));
            var e = d, f = "" + a2;
            if (null !== b2 && null !== b2.ref && "function" === typeof b2.ref && b2.ref._stringRef === f)
              return b2.ref;
            b2 = function(a3) {
              var b3 = e.refs;
              null === a3 ? delete b3[f] : b3[f] = a3;
            };
            b2._stringRef = f;
            return b2;
          }
          if ("string" !== typeof a2)
            throw Error(p2(284));
          if (!c2._owner)
            throw Error(p2(290, a2));
        }
        return a2;
      }
      function Mg(a2, b2) {
        a2 = Object.prototype.toString.call(b2);
        throw Error(p2(31, "[object Object]" === a2 ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a2));
      }
      function Ng(a2) {
        var b2 = a2._init;
        return b2(a2._payload);
      }
      function Og(a2) {
        function b2(b3, c3) {
          if (a2) {
            var d2 = b3.deletions;
            null === d2 ? (b3.deletions = [c3], b3.flags |= 16) : d2.push(c3);
          }
        }
        function c2(c3, d2) {
          if (!a2)
            return null;
          for (; null !== d2; )
            b2(c3, d2), d2 = d2.sibling;
          return null;
        }
        function d(a3, b3) {
          for (a3 = /* @__PURE__ */ new Map(); null !== b3; )
            null !== b3.key ? a3.set(b3.key, b3) : a3.set(b3.index, b3), b3 = b3.sibling;
          return a3;
        }
        function e(a3, b3) {
          a3 = Pg(a3, b3);
          a3.index = 0;
          a3.sibling = null;
          return a3;
        }
        function f(b3, c3, d2) {
          b3.index = d2;
          if (!a2)
            return b3.flags |= 1048576, c3;
          d2 = b3.alternate;
          if (null !== d2)
            return d2 = d2.index, d2 < c3 ? (b3.flags |= 2, c3) : d2;
          b3.flags |= 2;
          return c3;
        }
        function g(b3) {
          a2 && null === b3.alternate && (b3.flags |= 2);
          return b3;
        }
        function h(a3, b3, c3, d2) {
          if (null === b3 || 6 !== b3.tag)
            return b3 = Qg(c3, a3.mode, d2), b3.return = a3, b3;
          b3 = e(b3, c3);
          b3.return = a3;
          return b3;
        }
        function k(a3, b3, c3, d2) {
          var f2 = c3.type;
          if (f2 === ya)
            return m(a3, b3, c3.props.children, d2, c3.key);
          if (null !== b3 && (b3.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b3.type))
            return d2 = e(b3, c3.props), d2.ref = Lg(a3, b3, c3), d2.return = a3, d2;
          d2 = Rg(c3.type, c3.key, c3.props, null, a3.mode, d2);
          d2.ref = Lg(a3, b3, c3);
          d2.return = a3;
          return d2;
        }
        function l(a3, b3, c3, d2) {
          if (null === b3 || 4 !== b3.tag || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation)
            return b3 = Sg(c3, a3.mode, d2), b3.return = a3, b3;
          b3 = e(b3, c3.children || []);
          b3.return = a3;
          return b3;
        }
        function m(a3, b3, c3, d2, f2) {
          if (null === b3 || 7 !== b3.tag)
            return b3 = Tg(c3, a3.mode, d2, f2), b3.return = a3, b3;
          b3 = e(b3, c3);
          b3.return = a3;
          return b3;
        }
        function q(a3, b3, c3) {
          if ("string" === typeof b3 && "" !== b3 || "number" === typeof b3)
            return b3 = Qg("" + b3, a3.mode, c3), b3.return = a3, b3;
          if ("object" === typeof b3 && null !== b3) {
            switch (b3.$$typeof) {
              case va:
                return c3 = Rg(b3.type, b3.key, b3.props, null, a3.mode, c3), c3.ref = Lg(a3, null, b3), c3.return = a3, c3;
              case wa:
                return b3 = Sg(b3, a3.mode, c3), b3.return = a3, b3;
              case Ha:
                var d2 = b3._init;
                return q(a3, d2(b3._payload), c3);
            }
            if (eb(b3) || Ka(b3))
              return b3 = Tg(b3, a3.mode, c3, null), b3.return = a3, b3;
            Mg(a3, b3);
          }
          return null;
        }
        function r(a3, b3, c3, d2) {
          var e2 = null !== b3 ? b3.key : null;
          if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3)
            return null !== e2 ? null : h(a3, b3, "" + c3, d2);
          if ("object" === typeof c3 && null !== c3) {
            switch (c3.$$typeof) {
              case va:
                return c3.key === e2 ? k(a3, b3, c3, d2) : null;
              case wa:
                return c3.key === e2 ? l(a3, b3, c3, d2) : null;
              case Ha:
                return e2 = c3._init, r(
                  a3,
                  b3,
                  e2(c3._payload),
                  d2
                );
            }
            if (eb(c3) || Ka(c3))
              return null !== e2 ? null : m(a3, b3, c3, d2, null);
            Mg(a3, c3);
          }
          return null;
        }
        function y(a3, b3, c3, d2, e2) {
          if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2)
            return a3 = a3.get(c3) || null, h(b3, a3, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case va:
                return a3 = a3.get(null === d2.key ? c3 : d2.key) || null, k(b3, a3, d2, e2);
              case wa:
                return a3 = a3.get(null === d2.key ? c3 : d2.key) || null, l(b3, a3, d2, e2);
              case Ha:
                var f2 = d2._init;
                return y(a3, b3, c3, f2(d2._payload), e2);
            }
            if (eb(d2) || Ka(d2))
              return a3 = a3.get(c3) || null, m(b3, a3, d2, e2, null);
            Mg(b3, d2);
          }
          return null;
        }
        function n(e2, g2, h2, k2) {
          for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
            u.index > w ? (x = u, u = null) : x = u.sibling;
            var n2 = r(e2, u, h2[w], k2);
            if (null === n2) {
              null === u && (u = x);
              break;
            }
            a2 && u && null === n2.alternate && b2(e2, u);
            g2 = f(n2, g2, w);
            null === m2 ? l2 = n2 : m2.sibling = n2;
            m2 = n2;
            u = x;
          }
          if (w === h2.length)
            return c2(e2, u), I && tg(e2, w), l2;
          if (null === u) {
            for (; w < h2.length; w++)
              u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
            I && tg(e2, w);
            return l2;
          }
          for (u = d(e2, u); w < h2.length; w++)
            x = y(u, e2, w, h2[w], k2), null !== x && (a2 && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
          a2 && u.forEach(function(a3) {
            return b2(e2, a3);
          });
          I && tg(e2, w);
          return l2;
        }
        function t(e2, g2, h2, k2) {
          var l2 = Ka(h2);
          if ("function" !== typeof l2)
            throw Error(p2(150));
          h2 = l2.call(h2);
          if (null == h2)
            throw Error(p2(151));
          for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
            m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
            var t2 = r(e2, m2, n2.value, k2);
            if (null === t2) {
              null === m2 && (m2 = x);
              break;
            }
            a2 && m2 && null === t2.alternate && b2(e2, m2);
            g2 = f(t2, g2, w);
            null === u ? l2 = t2 : u.sibling = t2;
            u = t2;
            m2 = x;
          }
          if (n2.done)
            return c2(
              e2,
              m2
            ), I && tg(e2, w), l2;
          if (null === m2) {
            for (; !n2.done; w++, n2 = h2.next())
              n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
            I && tg(e2, w);
            return l2;
          }
          for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next())
            n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a2 && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          a2 && m2.forEach(function(a3) {
            return b2(e2, a3);
          });
          I && tg(e2, w);
          return l2;
        }
        function J(a3, d2, f2, h2) {
          "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
          if ("object" === typeof f2 && null !== f2) {
            switch (f2.$$typeof) {
              case va:
                a: {
                  for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                    if (l2.key === k2) {
                      k2 = f2.type;
                      if (k2 === ya) {
                        if (7 === l2.tag) {
                          c2(a3, l2.sibling);
                          d2 = e(l2, f2.props.children);
                          d2.return = a3;
                          a3 = d2;
                          break a;
                        }
                      } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                        c2(a3, l2.sibling);
                        d2 = e(l2, f2.props);
                        d2.ref = Lg(a3, l2, f2);
                        d2.return = a3;
                        a3 = d2;
                        break a;
                      }
                      c2(a3, l2);
                      break;
                    } else
                      b2(a3, l2);
                    l2 = l2.sibling;
                  }
                  f2.type === ya ? (d2 = Tg(f2.props.children, a3.mode, h2, f2.key), d2.return = a3, a3 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a3.mode, h2), h2.ref = Lg(a3, d2, f2), h2.return = a3, a3 = h2);
                }
                return g(a3);
              case wa:
                a: {
                  for (l2 = f2.key; null !== d2; ) {
                    if (d2.key === l2)
                      if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                        c2(a3, d2.sibling);
                        d2 = e(d2, f2.children || []);
                        d2.return = a3;
                        a3 = d2;
                        break a;
                      } else {
                        c2(a3, d2);
                        break;
                      }
                    else
                      b2(a3, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Sg(f2, a3.mode, h2);
                  d2.return = a3;
                  a3 = d2;
                }
                return g(a3);
              case Ha:
                return l2 = f2._init, J(a3, d2, l2(f2._payload), h2);
            }
            if (eb(f2))
              return n(a3, d2, f2, h2);
            if (Ka(f2))
              return t(a3, d2, f2, h2);
            Mg(a3, f2);
          }
          return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c2(a3, d2.sibling), d2 = e(d2, f2), d2.return = a3, a3 = d2) : (c2(a3, d2), d2 = Qg(f2, a3.mode, h2), d2.return = a3, a3 = d2), g(a3)) : c2(a3, d2);
        }
        return J;
      }
      var Ug = Og(true);
      var Vg = Og(false);
      var Wg = Uf(null);
      var Xg = null;
      var Yg = null;
      var Zg = null;
      function $g() {
        Zg = Yg = Xg = null;
      }
      function ah(a2) {
        var b2 = Wg.current;
        E(Wg);
        a2._currentValue = b2;
      }
      function bh(a2, b2, c2) {
        for (; null !== a2; ) {
          var d = a2.alternate;
          (a2.childLanes & b2) !== b2 ? (a2.childLanes |= b2, null !== d && (d.childLanes |= b2)) : null !== d && (d.childLanes & b2) !== b2 && (d.childLanes |= b2);
          if (a2 === c2)
            break;
          a2 = a2.return;
        }
      }
      function ch(a2, b2) {
        Xg = a2;
        Zg = Yg = null;
        a2 = a2.dependencies;
        null !== a2 && null !== a2.firstContext && (0 !== (a2.lanes & b2) && (dh = true), a2.firstContext = null);
      }
      function eh(a2) {
        var b2 = a2._currentValue;
        if (Zg !== a2)
          if (a2 = { context: a2, memoizedValue: b2, next: null }, null === Yg) {
            if (null === Xg)
              throw Error(p2(308));
            Yg = a2;
            Xg.dependencies = { lanes: 0, firstContext: a2 };
          } else
            Yg = Yg.next = a2;
        return b2;
      }
      var fh = null;
      function gh(a2) {
        null === fh ? fh = [a2] : fh.push(a2);
      }
      function hh(a2, b2, c2, d) {
        var e = b2.interleaved;
        null === e ? (c2.next = c2, gh(b2)) : (c2.next = e.next, e.next = c2);
        b2.interleaved = c2;
        return ih(a2, d);
      }
      function ih(a2, b2) {
        a2.lanes |= b2;
        var c2 = a2.alternate;
        null !== c2 && (c2.lanes |= b2);
        c2 = a2;
        for (a2 = a2.return; null !== a2; )
          a2.childLanes |= b2, c2 = a2.alternate, null !== c2 && (c2.childLanes |= b2), c2 = a2, a2 = a2.return;
        return 3 === c2.tag ? c2.stateNode : null;
      }
      var jh = false;
      function kh(a2) {
        a2.updateQueue = { baseState: a2.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function lh(a2, b2) {
        a2 = a2.updateQueue;
        b2.updateQueue === a2 && (b2.updateQueue = { baseState: a2.baseState, firstBaseUpdate: a2.firstBaseUpdate, lastBaseUpdate: a2.lastBaseUpdate, shared: a2.shared, effects: a2.effects });
      }
      function mh(a2, b2) {
        return { eventTime: a2, lane: b2, tag: 0, payload: null, callback: null, next: null };
      }
      function nh(a2, b2, c2) {
        var d = a2.updateQueue;
        if (null === d)
          return null;
        d = d.shared;
        if (0 !== (K & 2)) {
          var e = d.pending;
          null === e ? b2.next = b2 : (b2.next = e.next, e.next = b2);
          d.pending = b2;
          return ih(a2, c2);
        }
        e = d.interleaved;
        null === e ? (b2.next = b2, gh(d)) : (b2.next = e.next, e.next = b2);
        d.interleaved = b2;
        return ih(a2, c2);
      }
      function oh(a2, b2, c2) {
        b2 = b2.updateQueue;
        if (null !== b2 && (b2 = b2.shared, 0 !== (c2 & 4194240))) {
          var d = b2.lanes;
          d &= a2.pendingLanes;
          c2 |= d;
          b2.lanes = c2;
          Cc(a2, c2);
        }
      }
      function ph(a2, b2) {
        var c2 = a2.updateQueue, d = a2.alternate;
        if (null !== d && (d = d.updateQueue, c2 === d)) {
          var e = null, f = null;
          c2 = c2.firstBaseUpdate;
          if (null !== c2) {
            do {
              var g = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c2 = c2.next;
            } while (null !== c2);
            null === f ? e = f = b2 : f = f.next = b2;
          } else
            e = f = b2;
          c2 = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a2.updateQueue = c2;
          return;
        }
        a2 = c2.lastBaseUpdate;
        null === a2 ? c2.firstBaseUpdate = b2 : a2.next = b2;
        c2.lastBaseUpdate = b2;
      }
      function qh(a2, b2, c2, d) {
        var e = a2.updateQueue;
        jh = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var m = a2.alternate;
          null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
        }
        if (null !== f) {
          var q = e.baseState;
          g = 0;
          m = l = k = null;
          h = f;
          do {
            var r = h.lane, y = h.eventTime;
            if ((d & r) === r) {
              null !== m && (m = m.next = {
                eventTime: y,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null
              });
              a: {
                var n = a2, t = h;
                r = b2;
                y = c2;
                switch (t.tag) {
                  case 1:
                    n = t.payload;
                    if ("function" === typeof n) {
                      q = n.call(y, q, r);
                      break a;
                    }
                    q = n;
                    break a;
                  case 3:
                    n.flags = n.flags & -65537 | 128;
                  case 0:
                    n = t.payload;
                    r = "function" === typeof n ? n.call(y, q, r) : n;
                    if (null === r || void 0 === r)
                      break a;
                    q = A({}, q, r);
                    break a;
                  case 2:
                    jh = true;
                }
              }
              null !== h.callback && 0 !== h.lane && (a2.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
            } else
              y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
            h = h.next;
            if (null === h)
              if (h = e.shared.pending, null === h)
                break;
              else
                r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
          } while (1);
          null === m && (k = q);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = m;
          b2 = e.shared.interleaved;
          if (null !== b2) {
            e = b2;
            do
              g |= e.lane, e = e.next;
            while (e !== b2);
          } else
            null === f && (e.shared.lanes = 0);
          rh |= g;
          a2.lanes = g;
          a2.memoizedState = q;
        }
      }
      function sh(a2, b2, c2) {
        a2 = b2.effects;
        b2.effects = null;
        if (null !== a2)
          for (b2 = 0; b2 < a2.length; b2++) {
            var d = a2[b2], e = d.callback;
            if (null !== e) {
              d.callback = null;
              d = c2;
              if ("function" !== typeof e)
                throw Error(p2(191, e));
              e.call(d);
            }
          }
      }
      var th = {};
      var uh = Uf(th);
      var vh = Uf(th);
      var wh = Uf(th);
      function xh(a2) {
        if (a2 === th)
          throw Error(p2(174));
        return a2;
      }
      function yh(a2, b2) {
        G(wh, b2);
        G(vh, a2);
        G(uh, th);
        a2 = b2.nodeType;
        switch (a2) {
          case 9:
          case 11:
            b2 = (b2 = b2.documentElement) ? b2.namespaceURI : lb(null, "");
            break;
          default:
            a2 = 8 === a2 ? b2.parentNode : b2, b2 = a2.namespaceURI || null, a2 = a2.tagName, b2 = lb(b2, a2);
        }
        E(uh);
        G(uh, b2);
      }
      function zh() {
        E(uh);
        E(vh);
        E(wh);
      }
      function Ah(a2) {
        xh(wh.current);
        var b2 = xh(uh.current);
        var c2 = lb(b2, a2.type);
        b2 !== c2 && (G(vh, a2), G(uh, c2));
      }
      function Bh(a2) {
        vh.current === a2 && (E(uh), E(vh));
      }
      var L = Uf(0);
      function Ch(a2) {
        for (var b2 = a2; null !== b2; ) {
          if (13 === b2.tag) {
            var c2 = b2.memoizedState;
            if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data))
              return b2;
          } else if (19 === b2.tag && void 0 !== b2.memoizedProps.revealOrder) {
            if (0 !== (b2.flags & 128))
              return b2;
          } else if (null !== b2.child) {
            b2.child.return = b2;
            b2 = b2.child;
            continue;
          }
          if (b2 === a2)
            break;
          for (; null === b2.sibling; ) {
            if (null === b2.return || b2.return === a2)
              return null;
            b2 = b2.return;
          }
          b2.sibling.return = b2.return;
          b2 = b2.sibling;
        }
        return null;
      }
      var Dh = [];
      function Eh() {
        for (var a2 = 0; a2 < Dh.length; a2++)
          Dh[a2]._workInProgressVersionPrimary = null;
        Dh.length = 0;
      }
      var Fh = ua.ReactCurrentDispatcher;
      var Gh = ua.ReactCurrentBatchConfig;
      var Hh = 0;
      var M = null;
      var N = null;
      var O = null;
      var Ih = false;
      var Jh = false;
      var Kh = 0;
      var Lh = 0;
      function P() {
        throw Error(p2(321));
      }
      function Mh(a2, b2) {
        if (null === b2)
          return false;
        for (var c2 = 0; c2 < b2.length && c2 < a2.length; c2++)
          if (!He(a2[c2], b2[c2]))
            return false;
        return true;
      }
      function Nh(a2, b2, c2, d, e, f) {
        Hh = f;
        M = b2;
        b2.memoizedState = null;
        b2.updateQueue = null;
        b2.lanes = 0;
        Fh.current = null === a2 || null === a2.memoizedState ? Oh : Ph;
        a2 = c2(d, e);
        if (Jh) {
          f = 0;
          do {
            Jh = false;
            Kh = 0;
            if (25 <= f)
              throw Error(p2(301));
            f += 1;
            O = N = null;
            b2.updateQueue = null;
            Fh.current = Qh;
            a2 = c2(d, e);
          } while (Jh);
        }
        Fh.current = Rh;
        b2 = null !== N && null !== N.next;
        Hh = 0;
        O = N = M = null;
        Ih = false;
        if (b2)
          throw Error(p2(300));
        return a2;
      }
      function Sh() {
        var a2 = 0 !== Kh;
        Kh = 0;
        return a2;
      }
      function Th() {
        var a2 = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === O ? M.memoizedState = O = a2 : O = O.next = a2;
        return O;
      }
      function Uh() {
        if (null === N) {
          var a2 = M.alternate;
          a2 = null !== a2 ? a2.memoizedState : null;
        } else
          a2 = N.next;
        var b2 = null === O ? M.memoizedState : O.next;
        if (null !== b2)
          O = b2, N = a2;
        else {
          if (null === a2)
            throw Error(p2(310));
          N = a2;
          a2 = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
          null === O ? M.memoizedState = O = a2 : O = O.next = a2;
        }
        return O;
      }
      function Vh(a2, b2) {
        return "function" === typeof b2 ? b2(a2) : b2;
      }
      function Wh(a2) {
        var b2 = Uh(), c2 = b2.queue;
        if (null === c2)
          throw Error(p2(311));
        c2.lastRenderedReducer = a2;
        var d = N, e = d.baseQueue, f = c2.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c2.pending = null;
        }
        if (null !== e) {
          f = e.next;
          d = d.baseState;
          var h = g = null, k = null, l = f;
          do {
            var m = l.lane;
            if ((Hh & m) === m)
              null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a2(d, l.action);
            else {
              var q = {
                lane: m,
                action: l.action,
                hasEagerState: l.hasEagerState,
                eagerState: l.eagerState,
                next: null
              };
              null === k ? (h = k = q, g = d) : k = k.next = q;
              M.lanes |= m;
              rh |= m;
            }
            l = l.next;
          } while (null !== l && l !== f);
          null === k ? g = d : k.next = h;
          He(d, b2.memoizedState) || (dh = true);
          b2.memoizedState = d;
          b2.baseState = g;
          b2.baseQueue = k;
          c2.lastRenderedState = d;
        }
        a2 = c2.interleaved;
        if (null !== a2) {
          e = a2;
          do
            f = e.lane, M.lanes |= f, rh |= f, e = e.next;
          while (e !== a2);
        } else
          null === e && (c2.lanes = 0);
        return [b2.memoizedState, c2.dispatch];
      }
      function Xh(a2) {
        var b2 = Uh(), c2 = b2.queue;
        if (null === c2)
          throw Error(p2(311));
        c2.lastRenderedReducer = a2;
        var d = c2.dispatch, e = c2.pending, f = b2.memoizedState;
        if (null !== e) {
          c2.pending = null;
          var g = e = e.next;
          do
            f = a2(f, g.action), g = g.next;
          while (g !== e);
          He(f, b2.memoizedState) || (dh = true);
          b2.memoizedState = f;
          null === b2.baseQueue && (b2.baseState = f);
          c2.lastRenderedState = f;
        }
        return [f, d];
      }
      function Yh() {
      }
      function Zh(a2, b2) {
        var c2 = M, d = Uh(), e = b2(), f = !He(d.memoizedState, e);
        f && (d.memoizedState = e, dh = true);
        d = d.queue;
        $h(ai.bind(null, c2, d, a2), [a2]);
        if (d.getSnapshot !== b2 || f || null !== O && O.memoizedState.tag & 1) {
          c2.flags |= 2048;
          bi(9, ci.bind(null, c2, d, e, b2), void 0, null);
          if (null === Q)
            throw Error(p2(349));
          0 !== (Hh & 30) || di(c2, b2, e);
        }
        return e;
      }
      function di(a2, b2, c2) {
        a2.flags |= 16384;
        a2 = { getSnapshot: b2, value: c2 };
        b2 = M.updateQueue;
        null === b2 ? (b2 = { lastEffect: null, stores: null }, M.updateQueue = b2, b2.stores = [a2]) : (c2 = b2.stores, null === c2 ? b2.stores = [a2] : c2.push(a2));
      }
      function ci(a2, b2, c2, d) {
        b2.value = c2;
        b2.getSnapshot = d;
        ei(b2) && fi(a2);
      }
      function ai(a2, b2, c2) {
        return c2(function() {
          ei(b2) && fi(a2);
        });
      }
      function ei(a2) {
        var b2 = a2.getSnapshot;
        a2 = a2.value;
        try {
          var c2 = b2();
          return !He(a2, c2);
        } catch (d) {
          return true;
        }
      }
      function fi(a2) {
        var b2 = ih(a2, 1);
        null !== b2 && gi(b2, a2, 1, -1);
      }
      function hi(a2) {
        var b2 = Th();
        "function" === typeof a2 && (a2 = a2());
        b2.memoizedState = b2.baseState = a2;
        a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a2 };
        b2.queue = a2;
        a2 = a2.dispatch = ii.bind(null, M, a2);
        return [b2.memoizedState, a2];
      }
      function bi(a2, b2, c2, d) {
        a2 = { tag: a2, create: b2, destroy: c2, deps: d, next: null };
        b2 = M.updateQueue;
        null === b2 ? (b2 = { lastEffect: null, stores: null }, M.updateQueue = b2, b2.lastEffect = a2.next = a2) : (c2 = b2.lastEffect, null === c2 ? b2.lastEffect = a2.next = a2 : (d = c2.next, c2.next = a2, a2.next = d, b2.lastEffect = a2));
        return a2;
      }
      function ji() {
        return Uh().memoizedState;
      }
      function ki(a2, b2, c2, d) {
        var e = Th();
        M.flags |= a2;
        e.memoizedState = bi(1 | b2, c2, void 0, void 0 === d ? null : d);
      }
      function li(a2, b2, c2, d) {
        var e = Uh();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== N) {
          var g = N.memoizedState;
          f = g.destroy;
          if (null !== d && Mh(d, g.deps)) {
            e.memoizedState = bi(b2, c2, f, d);
            return;
          }
        }
        M.flags |= a2;
        e.memoizedState = bi(1 | b2, c2, f, d);
      }
      function mi(a2, b2) {
        return ki(8390656, 8, a2, b2);
      }
      function $h(a2, b2) {
        return li(2048, 8, a2, b2);
      }
      function ni(a2, b2) {
        return li(4, 2, a2, b2);
      }
      function oi(a2, b2) {
        return li(4, 4, a2, b2);
      }
      function pi(a2, b2) {
        if ("function" === typeof b2)
          return a2 = a2(), b2(a2), function() {
            b2(null);
          };
        if (null !== b2 && void 0 !== b2)
          return a2 = a2(), b2.current = a2, function() {
            b2.current = null;
          };
      }
      function qi(a2, b2, c2) {
        c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
        return li(4, 4, pi.bind(null, b2, a2), c2);
      }
      function ri() {
      }
      function si(a2, b2) {
        var c2 = Uh();
        b2 = void 0 === b2 ? null : b2;
        var d = c2.memoizedState;
        if (null !== d && null !== b2 && Mh(b2, d[1]))
          return d[0];
        c2.memoizedState = [a2, b2];
        return a2;
      }
      function ti(a2, b2) {
        var c2 = Uh();
        b2 = void 0 === b2 ? null : b2;
        var d = c2.memoizedState;
        if (null !== d && null !== b2 && Mh(b2, d[1]))
          return d[0];
        a2 = a2();
        c2.memoizedState = [a2, b2];
        return a2;
      }
      function ui(a2, b2, c2) {
        if (0 === (Hh & 21))
          return a2.baseState && (a2.baseState = false, dh = true), a2.memoizedState = c2;
        He(c2, b2) || (c2 = yc(), M.lanes |= c2, rh |= c2, a2.baseState = true);
        return b2;
      }
      function vi(a2, b2) {
        var c2 = C;
        C = 0 !== c2 && 4 > c2 ? c2 : 4;
        a2(true);
        var d = Gh.transition;
        Gh.transition = {};
        try {
          a2(false), b2();
        } finally {
          C = c2, Gh.transition = d;
        }
      }
      function wi() {
        return Uh().memoizedState;
      }
      function xi(a2, b2, c2) {
        var d = yi(a2);
        c2 = { lane: d, action: c2, hasEagerState: false, eagerState: null, next: null };
        if (zi(a2))
          Ai(b2, c2);
        else if (c2 = hh(a2, b2, c2, d), null !== c2) {
          var e = R();
          gi(c2, a2, d, e);
          Bi(c2, b2, d);
        }
      }
      function ii(a2, b2, c2) {
        var d = yi(a2), e = { lane: d, action: c2, hasEagerState: false, eagerState: null, next: null };
        if (zi(a2))
          Ai(b2, e);
        else {
          var f = a2.alternate;
          if (0 === a2.lanes && (null === f || 0 === f.lanes) && (f = b2.lastRenderedReducer, null !== f))
            try {
              var g = b2.lastRenderedState, h = f(g, c2);
              e.hasEagerState = true;
              e.eagerState = h;
              if (He(h, g)) {
                var k = b2.interleaved;
                null === k ? (e.next = e, gh(b2)) : (e.next = k.next, k.next = e);
                b2.interleaved = e;
                return;
              }
            } catch (l) {
            } finally {
            }
          c2 = hh(a2, b2, e, d);
          null !== c2 && (e = R(), gi(c2, a2, d, e), Bi(c2, b2, d));
        }
      }
      function zi(a2) {
        var b2 = a2.alternate;
        return a2 === M || null !== b2 && b2 === M;
      }
      function Ai(a2, b2) {
        Jh = Ih = true;
        var c2 = a2.pending;
        null === c2 ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
        a2.pending = b2;
      }
      function Bi(a2, b2, c2) {
        if (0 !== (c2 & 4194240)) {
          var d = b2.lanes;
          d &= a2.pendingLanes;
          c2 |= d;
          b2.lanes = c2;
          Cc(a2, c2);
        }
      }
      var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false };
      var Oh = { readContext: eh, useCallback: function(a2, b2) {
        Th().memoizedState = [a2, void 0 === b2 ? null : b2];
        return a2;
      }, useContext: eh, useEffect: mi, useImperativeHandle: function(a2, b2, c2) {
        c2 = null !== c2 && void 0 !== c2 ? c2.concat([a2]) : null;
        return ki(
          4194308,
          4,
          pi.bind(null, b2, a2),
          c2
        );
      }, useLayoutEffect: function(a2, b2) {
        return ki(4194308, 4, a2, b2);
      }, useInsertionEffect: function(a2, b2) {
        return ki(4, 2, a2, b2);
      }, useMemo: function(a2, b2) {
        var c2 = Th();
        b2 = void 0 === b2 ? null : b2;
        a2 = a2();
        c2.memoizedState = [a2, b2];
        return a2;
      }, useReducer: function(a2, b2, c2) {
        var d = Th();
        b2 = void 0 !== c2 ? c2(b2) : b2;
        d.memoizedState = d.baseState = b2;
        a2 = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a2, lastRenderedState: b2 };
        d.queue = a2;
        a2 = a2.dispatch = xi.bind(null, M, a2);
        return [d.memoizedState, a2];
      }, useRef: function(a2) {
        var b2 = Th();
        a2 = { current: a2 };
        return b2.memoizedState = a2;
      }, useState: hi, useDebugValue: ri, useDeferredValue: function(a2) {
        return Th().memoizedState = a2;
      }, useTransition: function() {
        var a2 = hi(false), b2 = a2[0];
        a2 = vi.bind(null, a2[1]);
        Th().memoizedState = a2;
        return [b2, a2];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a2, b2, c2) {
        var d = M, e = Th();
        if (I) {
          if (void 0 === c2)
            throw Error(p2(407));
          c2 = c2();
        } else {
          c2 = b2();
          if (null === Q)
            throw Error(p2(349));
          0 !== (Hh & 30) || di(d, b2, c2);
        }
        e.memoizedState = c2;
        var f = { value: c2, getSnapshot: b2 };
        e.queue = f;
        mi(ai.bind(
          null,
          d,
          f,
          a2
        ), [a2]);
        d.flags |= 2048;
        bi(9, ci.bind(null, d, f, c2, b2), void 0, null);
        return c2;
      }, useId: function() {
        var a2 = Th(), b2 = Q.identifierPrefix;
        if (I) {
          var c2 = sg;
          var d = rg;
          c2 = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c2;
          b2 = ":" + b2 + "R" + c2;
          c2 = Kh++;
          0 < c2 && (b2 += "H" + c2.toString(32));
          b2 += ":";
        } else
          c2 = Lh++, b2 = ":" + b2 + "r" + c2.toString(32) + ":";
        return a2.memoizedState = b2;
      }, unstable_isNewReconciler: false };
      var Ph = {
        readContext: eh,
        useCallback: si,
        useContext: eh,
        useEffect: $h,
        useImperativeHandle: qi,
        useInsertionEffect: ni,
        useLayoutEffect: oi,
        useMemo: ti,
        useReducer: Wh,
        useRef: ji,
        useState: function() {
          return Wh(Vh);
        },
        useDebugValue: ri,
        useDeferredValue: function(a2) {
          var b2 = Uh();
          return ui(b2, N.memoizedState, a2);
        },
        useTransition: function() {
          var a2 = Wh(Vh)[0], b2 = Uh().memoizedState;
          return [a2, b2];
        },
        useMutableSource: Yh,
        useSyncExternalStore: Zh,
        useId: wi,
        unstable_isNewReconciler: false
      };
      var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
        return Xh(Vh);
      }, useDebugValue: ri, useDeferredValue: function(a2) {
        var b2 = Uh();
        return null === N ? b2.memoizedState = a2 : ui(b2, N.memoizedState, a2);
      }, useTransition: function() {
        var a2 = Xh(Vh)[0], b2 = Uh().memoizedState;
        return [a2, b2];
      }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
      function Ci(a2, b2) {
        if (a2 && a2.defaultProps) {
          b2 = A({}, b2);
          a2 = a2.defaultProps;
          for (var c2 in a2)
            void 0 === b2[c2] && (b2[c2] = a2[c2]);
          return b2;
        }
        return b2;
      }
      function Di(a2, b2, c2, d) {
        b2 = a2.memoizedState;
        c2 = c2(d, b2);
        c2 = null === c2 || void 0 === c2 ? b2 : A({}, b2, c2);
        a2.memoizedState = c2;
        0 === a2.lanes && (a2.updateQueue.baseState = c2);
      }
      var Ei = { isMounted: function(a2) {
        return (a2 = a2._reactInternals) ? Vb(a2) === a2 : false;
      }, enqueueSetState: function(a2, b2, c2) {
        a2 = a2._reactInternals;
        var d = R(), e = yi(a2), f = mh(d, e);
        f.payload = b2;
        void 0 !== c2 && null !== c2 && (f.callback = c2);
        b2 = nh(a2, f, e);
        null !== b2 && (gi(b2, a2, e, d), oh(b2, a2, e));
      }, enqueueReplaceState: function(a2, b2, c2) {
        a2 = a2._reactInternals;
        var d = R(), e = yi(a2), f = mh(d, e);
        f.tag = 1;
        f.payload = b2;
        void 0 !== c2 && null !== c2 && (f.callback = c2);
        b2 = nh(a2, f, e);
        null !== b2 && (gi(b2, a2, e, d), oh(b2, a2, e));
      }, enqueueForceUpdate: function(a2, b2) {
        a2 = a2._reactInternals;
        var c2 = R(), d = yi(a2), e = mh(c2, d);
        e.tag = 2;
        void 0 !== b2 && null !== b2 && (e.callback = b2);
        b2 = nh(a2, e, d);
        null !== b2 && (gi(b2, a2, d, c2), oh(b2, a2, d));
      } };
      function Fi(a2, b2, c2, d, e, f, g) {
        a2 = a2.stateNode;
        return "function" === typeof a2.shouldComponentUpdate ? a2.shouldComponentUpdate(d, f, g) : b2.prototype && b2.prototype.isPureReactComponent ? !Ie(c2, d) || !Ie(e, f) : true;
      }
      function Gi(a2, b2, c2) {
        var d = false, e = Vf;
        var f = b2.contextType;
        "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b2) ? Xf : H.current, d = b2.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a2, e) : Vf);
        b2 = new b2(c2, f);
        a2.memoizedState = null !== b2.state && void 0 !== b2.state ? b2.state : null;
        b2.updater = Ei;
        a2.stateNode = b2;
        b2._reactInternals = a2;
        d && (a2 = a2.stateNode, a2.__reactInternalMemoizedUnmaskedChildContext = e, a2.__reactInternalMemoizedMaskedChildContext = f);
        return b2;
      }
      function Hi(a2, b2, c2, d) {
        a2 = b2.state;
        "function" === typeof b2.componentWillReceiveProps && b2.componentWillReceiveProps(c2, d);
        "function" === typeof b2.UNSAFE_componentWillReceiveProps && b2.UNSAFE_componentWillReceiveProps(c2, d);
        b2.state !== a2 && Ei.enqueueReplaceState(b2, b2.state, null);
      }
      function Ii(a2, b2, c2, d) {
        var e = a2.stateNode;
        e.props = c2;
        e.state = a2.memoizedState;
        e.refs = {};
        kh(a2);
        var f = b2.contextType;
        "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b2) ? Xf : H.current, e.context = Yf(a2, f));
        e.state = a2.memoizedState;
        f = b2.getDerivedStateFromProps;
        "function" === typeof f && (Di(a2, b2, f, c2), e.state = a2.memoizedState);
        "function" === typeof b2.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b2 = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b2 !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a2, c2, e, d), e.state = a2.memoizedState);
        "function" === typeof e.componentDidMount && (a2.flags |= 4194308);
      }
      function Ji(a2, b2) {
        try {
          var c2 = "", d = b2;
          do
            c2 += Pa(d), d = d.return;
          while (d);
          var e = c2;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a2, source: b2, stack: e, digest: null };
      }
      function Ki(a2, b2, c2) {
        return { value: a2, source: null, stack: null != c2 ? c2 : null, digest: null != b2 ? b2 : null };
      }
      function Li(a2, b2) {
        try {
          console.error(b2.value);
        } catch (c2) {
          setTimeout(function() {
            throw c2;
          });
        }
      }
      var Mi = "function" === typeof WeakMap ? WeakMap : Map;
      function Ni(a2, b2, c2) {
        c2 = mh(-1, c2);
        c2.tag = 3;
        c2.payload = { element: null };
        var d = b2.value;
        c2.callback = function() {
          Oi || (Oi = true, Pi = d);
          Li(a2, b2);
        };
        return c2;
      }
      function Qi(a2, b2, c2) {
        c2 = mh(-1, c2);
        c2.tag = 3;
        var d = a2.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b2.value;
          c2.payload = function() {
            return d(e);
          };
          c2.callback = function() {
            Li(a2, b2);
          };
        }
        var f = a2.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c2.callback = function() {
          Li(a2, b2);
          "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
          var c3 = b2.stack;
          this.componentDidCatch(b2.value, { componentStack: null !== c3 ? c3 : "" });
        });
        return c2;
      }
      function Si(a2, b2, c2) {
        var d = a2.pingCache;
        if (null === d) {
          d = a2.pingCache = new Mi();
          var e = /* @__PURE__ */ new Set();
          d.set(b2, e);
        } else
          e = d.get(b2), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b2, e));
        e.has(c2) || (e.add(c2), a2 = Ti.bind(null, a2, b2, c2), b2.then(a2, a2));
      }
      function Ui(a2) {
        do {
          var b2;
          if (b2 = 13 === a2.tag)
            b2 = a2.memoizedState, b2 = null !== b2 ? null !== b2.dehydrated ? true : false : true;
          if (b2)
            return a2;
          a2 = a2.return;
        } while (null !== a2);
        return null;
      }
      function Vi(a2, b2, c2, d, e) {
        if (0 === (a2.mode & 1))
          return a2 === b2 ? a2.flags |= 65536 : (a2.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b2 = mh(-1, 1), b2.tag = 2, nh(c2, b2, 1))), c2.lanes |= 1), a2;
        a2.flags |= 65536;
        a2.lanes = e;
        return a2;
      }
      var Wi = ua.ReactCurrentOwner;
      var dh = false;
      function Xi(a2, b2, c2, d) {
        b2.child = null === a2 ? Vg(b2, null, c2, d) : Ug(b2, a2.child, c2, d);
      }
      function Yi(a2, b2, c2, d, e) {
        c2 = c2.render;
        var f = b2.ref;
        ch(b2, e);
        d = Nh(a2, b2, c2, d, f, e);
        c2 = Sh();
        if (null !== a2 && !dh)
          return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e, Zi(a2, b2, e);
        I && c2 && vg(b2);
        b2.flags |= 1;
        Xi(a2, b2, d, e);
        return b2.child;
      }
      function $i(a2, b2, c2, d, e) {
        if (null === a2) {
          var f = c2.type;
          if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c2.compare && void 0 === c2.defaultProps)
            return b2.tag = 15, b2.type = f, bj(a2, b2, f, d, e);
          a2 = Rg(c2.type, null, d, b2, b2.mode, e);
          a2.ref = b2.ref;
          a2.return = b2;
          return b2.child = a2;
        }
        f = a2.child;
        if (0 === (a2.lanes & e)) {
          var g = f.memoizedProps;
          c2 = c2.compare;
          c2 = null !== c2 ? c2 : Ie;
          if (c2(g, d) && a2.ref === b2.ref)
            return Zi(a2, b2, e);
        }
        b2.flags |= 1;
        a2 = Pg(f, d);
        a2.ref = b2.ref;
        a2.return = b2;
        return b2.child = a2;
      }
      function bj(a2, b2, c2, d, e) {
        if (null !== a2) {
          var f = a2.memoizedProps;
          if (Ie(f, d) && a2.ref === b2.ref)
            if (dh = false, b2.pendingProps = d = f, 0 !== (a2.lanes & e))
              0 !== (a2.flags & 131072) && (dh = true);
            else
              return b2.lanes = a2.lanes, Zi(a2, b2, e);
        }
        return cj(a2, b2, c2, d, e);
      }
      function dj(a2, b2, c2) {
        var d = b2.pendingProps, e = d.children, f = null !== a2 ? a2.memoizedState : null;
        if ("hidden" === d.mode)
          if (0 === (b2.mode & 1))
            b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c2;
          else {
            if (0 === (c2 & 1073741824))
              return a2 = null !== f ? f.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a2, cachePool: null, transitions: null }, b2.updateQueue = null, G(ej, fj), fj |= a2, null;
            b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
            d = null !== f ? f.baseLanes : c2;
            G(ej, fj);
            fj |= d;
          }
        else
          null !== f ? (d = f.baseLanes | c2, b2.memoizedState = null) : d = c2, G(ej, fj), fj |= d;
        Xi(a2, b2, e, c2);
        return b2.child;
      }
      function gj(a2, b2) {
        var c2 = b2.ref;
        if (null === a2 && null !== c2 || null !== a2 && a2.ref !== c2)
          b2.flags |= 512, b2.flags |= 2097152;
      }
      function cj(a2, b2, c2, d, e) {
        var f = Zf(c2) ? Xf : H.current;
        f = Yf(b2, f);
        ch(b2, e);
        c2 = Nh(a2, b2, c2, d, f, e);
        d = Sh();
        if (null !== a2 && !dh)
          return b2.updateQueue = a2.updateQueue, b2.flags &= -2053, a2.lanes &= ~e, Zi(a2, b2, e);
        I && d && vg(b2);
        b2.flags |= 1;
        Xi(a2, b2, c2, e);
        return b2.child;
      }
      function hj(a2, b2, c2, d, e) {
        if (Zf(c2)) {
          var f = true;
          cg(b2);
        } else
          f = false;
        ch(b2, e);
        if (null === b2.stateNode)
          ij(a2, b2), Gi(b2, c2, d), Ii(b2, c2, d, e), d = true;
        else if (null === a2) {
          var g = b2.stateNode, h = b2.memoizedProps;
          g.props = h;
          var k = g.context, l = c2.contextType;
          "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c2) ? Xf : H.current, l = Yf(b2, l));
          var m = c2.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
          q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b2, g, d, l);
          jh = false;
          var r = b2.memoizedState;
          g.state = r;
          qh(b2, d, g, e);
          k = b2.memoizedState;
          h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b2, c2, m, d), k = b2.memoizedState), (h = jh || Fi(b2, c2, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b2.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b2.flags |= 4194308), b2.memoizedProps = d, b2.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b2.flags |= 4194308), d = false);
        } else {
          g = b2.stateNode;
          lh(a2, b2);
          h = b2.memoizedProps;
          l = b2.type === b2.elementType ? h : Ci(b2.type, h);
          g.props = l;
          q = b2.pendingProps;
          r = g.context;
          k = c2.contextType;
          "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c2) ? Xf : H.current, k = Yf(b2, k));
          var y = c2.getDerivedStateFromProps;
          (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b2, g, d, k);
          jh = false;
          r = b2.memoizedState;
          g.state = r;
          qh(b2, d, g, e);
          var n = b2.memoizedState;
          h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b2, c2, y, d), n = b2.memoizedState), (l = jh || Fi(b2, c2, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b2.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b2.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a2.memoizedProps && r === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a2.memoizedProps && r === a2.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d, b2.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a2.memoizedProps && r === a2.memoizedState || (b2.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a2.memoizedProps && r === a2.memoizedState || (b2.flags |= 1024), d = false);
        }
        return jj(a2, b2, c2, d, f, e);
      }
      function jj(a2, b2, c2, d, e, f) {
        gj(a2, b2);
        var g = 0 !== (b2.flags & 128);
        if (!d && !g)
          return e && dg(b2, c2, false), Zi(a2, b2, f);
        d = b2.stateNode;
        Wi.current = b2;
        var h = g && "function" !== typeof c2.getDerivedStateFromError ? null : d.render();
        b2.flags |= 1;
        null !== a2 && g ? (b2.child = Ug(b2, a2.child, null, f), b2.child = Ug(b2, null, h, f)) : Xi(a2, b2, h, f);
        b2.memoizedState = d.state;
        e && dg(b2, c2, true);
        return b2.child;
      }
      function kj(a2) {
        var b2 = a2.stateNode;
        b2.pendingContext ? ag(a2, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && ag(a2, b2.context, false);
        yh(a2, b2.containerInfo);
      }
      function lj(a2, b2, c2, d, e) {
        Ig();
        Jg(e);
        b2.flags |= 256;
        Xi(a2, b2, c2, d);
        return b2.child;
      }
      var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function nj(a2) {
        return { baseLanes: a2, cachePool: null, transitions: null };
      }
      function oj(a2, b2, c2) {
        var d = b2.pendingProps, e = L.current, f = false, g = 0 !== (b2.flags & 128), h;
        (h = g) || (h = null !== a2 && null === a2.memoizedState ? false : 0 !== (e & 2));
        if (h)
          f = true, b2.flags &= -129;
        else if (null === a2 || null !== a2.memoizedState)
          e |= 1;
        G(L, e & 1);
        if (null === a2) {
          Eg(b2);
          a2 = b2.memoizedState;
          if (null !== a2 && (a2 = a2.dehydrated, null !== a2))
            return 0 === (b2.mode & 1) ? b2.lanes = 1 : "$!" === a2.data ? b2.lanes = 8 : b2.lanes = 1073741824, null;
          g = d.children;
          a2 = d.fallback;
          return f ? (d = b2.mode, f = b2.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a2 = Tg(a2, d, c2, null), f.return = b2, a2.return = b2, f.sibling = a2, b2.child = f, b2.child.memoizedState = nj(c2), b2.memoizedState = mj, a2) : qj(b2, g);
        }
        e = a2.memoizedState;
        if (null !== e && (h = e.dehydrated, null !== h))
          return rj(a2, b2, g, d, h, e, c2);
        if (f) {
          f = d.fallback;
          g = b2.mode;
          e = a2.child;
          h = e.sibling;
          var k = { mode: "hidden", children: d.children };
          0 === (g & 1) && b2.child !== e ? (d = b2.child, d.childLanes = 0, d.pendingProps = k, b2.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
          null !== h ? f = Pg(h, f) : (f = Tg(f, g, c2, null), f.flags |= 2);
          f.return = b2;
          d.return = b2;
          d.sibling = f;
          b2.child = d;
          d = f;
          f = b2.child;
          g = a2.child.memoizedState;
          g = null === g ? nj(c2) : { baseLanes: g.baseLanes | c2, cachePool: null, transitions: g.transitions };
          f.memoizedState = g;
          f.childLanes = a2.childLanes & ~c2;
          b2.memoizedState = mj;
          return d;
        }
        f = a2.child;
        a2 = f.sibling;
        d = Pg(f, { mode: "visible", children: d.children });
        0 === (b2.mode & 1) && (d.lanes = c2);
        d.return = b2;
        d.sibling = null;
        null !== a2 && (c2 = b2.deletions, null === c2 ? (b2.deletions = [a2], b2.flags |= 16) : c2.push(a2));
        b2.child = d;
        b2.memoizedState = null;
        return d;
      }
      function qj(a2, b2) {
        b2 = pj({ mode: "visible", children: b2 }, a2.mode, 0, null);
        b2.return = a2;
        return a2.child = b2;
      }
      function sj(a2, b2, c2, d) {
        null !== d && Jg(d);
        Ug(b2, a2.child, null, c2);
        a2 = qj(b2, b2.pendingProps.children);
        a2.flags |= 2;
        b2.memoizedState = null;
        return a2;
      }
      function rj(a2, b2, c2, d, e, f, g) {
        if (c2) {
          if (b2.flags & 256)
            return b2.flags &= -257, d = Ki(Error(p2(422))), sj(a2, b2, g, d);
          if (null !== b2.memoizedState)
            return b2.child = a2.child, b2.flags |= 128, null;
          f = d.fallback;
          e = b2.mode;
          d = pj({ mode: "visible", children: d.children }, e, 0, null);
          f = Tg(f, e, g, null);
          f.flags |= 2;
          d.return = b2;
          f.return = b2;
          d.sibling = f;
          b2.child = d;
          0 !== (b2.mode & 1) && Ug(b2, a2.child, null, g);
          b2.child.memoizedState = nj(g);
          b2.memoizedState = mj;
          return f;
        }
        if (0 === (b2.mode & 1))
          return sj(a2, b2, g, null);
        if ("$!" === e.data) {
          d = e.nextSibling && e.nextSibling.dataset;
          if (d)
            var h = d.dgst;
          d = h;
          f = Error(p2(419));
          d = Ki(f, d, void 0);
          return sj(a2, b2, g, d);
        }
        h = 0 !== (g & a2.childLanes);
        if (dh || h) {
          d = Q;
          if (null !== d) {
            switch (g & -g) {
              case 4:
                e = 2;
                break;
              case 16:
                e = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                e = 32;
                break;
              case 536870912:
                e = 268435456;
                break;
              default:
                e = 0;
            }
            e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
            0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a2, e), gi(d, a2, e, -1));
          }
          tj();
          d = Ki(Error(p2(421)));
          return sj(a2, b2, g, d);
        }
        if ("$?" === e.data)
          return b2.flags |= 128, b2.child = a2.child, b2 = uj.bind(null, a2), e._reactRetry = b2, null;
        a2 = f.treeContext;
        yg = Lf(e.nextSibling);
        xg = b2;
        I = true;
        zg = null;
        null !== a2 && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a2.id, sg = a2.overflow, qg = b2);
        b2 = qj(b2, d.children);
        b2.flags |= 4096;
        return b2;
      }
      function vj(a2, b2, c2) {
        a2.lanes |= b2;
        var d = a2.alternate;
        null !== d && (d.lanes |= b2);
        bh(a2.return, b2, c2);
      }
      function wj(a2, b2, c2, d, e) {
        var f = a2.memoizedState;
        null === f ? a2.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d, tail: c2, tailMode: e } : (f.isBackwards = b2, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c2, f.tailMode = e);
      }
      function xj(a2, b2, c2) {
        var d = b2.pendingProps, e = d.revealOrder, f = d.tail;
        Xi(a2, b2, d.children, c2);
        d = L.current;
        if (0 !== (d & 2))
          d = d & 1 | 2, b2.flags |= 128;
        else {
          if (null !== a2 && 0 !== (a2.flags & 128))
            a:
              for (a2 = b2.child; null !== a2; ) {
                if (13 === a2.tag)
                  null !== a2.memoizedState && vj(a2, c2, b2);
                else if (19 === a2.tag)
                  vj(a2, c2, b2);
                else if (null !== a2.child) {
                  a2.child.return = a2;
                  a2 = a2.child;
                  continue;
                }
                if (a2 === b2)
                  break a;
                for (; null === a2.sibling; ) {
                  if (null === a2.return || a2.return === b2)
                    break a;
                  a2 = a2.return;
                }
                a2.sibling.return = a2.return;
                a2 = a2.sibling;
              }
          d &= 1;
        }
        G(L, d);
        if (0 === (b2.mode & 1))
          b2.memoizedState = null;
        else
          switch (e) {
            case "forwards":
              c2 = b2.child;
              for (e = null; null !== c2; )
                a2 = c2.alternate, null !== a2 && null === Ch(a2) && (e = c2), c2 = c2.sibling;
              c2 = e;
              null === c2 ? (e = b2.child, b2.child = null) : (e = c2.sibling, c2.sibling = null);
              wj(b2, false, e, c2, f);
              break;
            case "backwards":
              c2 = null;
              e = b2.child;
              for (b2.child = null; null !== e; ) {
                a2 = e.alternate;
                if (null !== a2 && null === Ch(a2)) {
                  b2.child = e;
                  break;
                }
                a2 = e.sibling;
                e.sibling = c2;
                c2 = e;
                e = a2;
              }
              wj(b2, true, c2, null, f);
              break;
            case "together":
              wj(b2, false, null, null, void 0);
              break;
            default:
              b2.memoizedState = null;
          }
        return b2.child;
      }
      function ij(a2, b2) {
        0 === (b2.mode & 1) && null !== a2 && (a2.alternate = null, b2.alternate = null, b2.flags |= 2);
      }
      function Zi(a2, b2, c2) {
        null !== a2 && (b2.dependencies = a2.dependencies);
        rh |= b2.lanes;
        if (0 === (c2 & b2.childLanes))
          return null;
        if (null !== a2 && b2.child !== a2.child)
          throw Error(p2(153));
        if (null !== b2.child) {
          a2 = b2.child;
          c2 = Pg(a2, a2.pendingProps);
          b2.child = c2;
          for (c2.return = b2; null !== a2.sibling; )
            a2 = a2.sibling, c2 = c2.sibling = Pg(a2, a2.pendingProps), c2.return = b2;
          c2.sibling = null;
        }
        return b2.child;
      }
      function yj(a2, b2, c2) {
        switch (b2.tag) {
          case 3:
            kj(b2);
            Ig();
            break;
          case 5:
            Ah(b2);
            break;
          case 1:
            Zf(b2.type) && cg(b2);
            break;
          case 4:
            yh(b2, b2.stateNode.containerInfo);
            break;
          case 10:
            var d = b2.type._context, e = b2.memoizedProps.value;
            G(Wg, d._currentValue);
            d._currentValue = e;
            break;
          case 13:
            d = b2.memoizedState;
            if (null !== d) {
              if (null !== d.dehydrated)
                return G(L, L.current & 1), b2.flags |= 128, null;
              if (0 !== (c2 & b2.child.childLanes))
                return oj(a2, b2, c2);
              G(L, L.current & 1);
              a2 = Zi(a2, b2, c2);
              return null !== a2 ? a2.sibling : null;
            }
            G(L, L.current & 1);
            break;
          case 19:
            d = 0 !== (c2 & b2.childLanes);
            if (0 !== (a2.flags & 128)) {
              if (d)
                return xj(a2, b2, c2);
              b2.flags |= 128;
            }
            e = b2.memoizedState;
            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
            G(L, L.current);
            if (d)
              break;
            else
              return null;
          case 22:
          case 23:
            return b2.lanes = 0, dj(a2, b2, c2);
        }
        return Zi(a2, b2, c2);
      }
      var zj;
      var Aj;
      var Bj;
      var Cj;
      zj = function(a2, b2) {
        for (var c2 = b2.child; null !== c2; ) {
          if (5 === c2.tag || 6 === c2.tag)
            a2.appendChild(c2.stateNode);
          else if (4 !== c2.tag && null !== c2.child) {
            c2.child.return = c2;
            c2 = c2.child;
            continue;
          }
          if (c2 === b2)
            break;
          for (; null === c2.sibling; ) {
            if (null === c2.return || c2.return === b2)
              return;
            c2 = c2.return;
          }
          c2.sibling.return = c2.return;
          c2 = c2.sibling;
        }
      };
      Aj = function() {
      };
      Bj = function(a2, b2, c2, d) {
        var e = a2.memoizedProps;
        if (e !== d) {
          a2 = b2.stateNode;
          xh(uh.current);
          var f = null;
          switch (c2) {
            case "input":
              e = Ya(a2, e);
              d = Ya(a2, d);
              f = [];
              break;
            case "select":
              e = A({}, e, { value: void 0 });
              d = A({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a2, e);
              d = gb(a2, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a2.onclick = Bf);
          }
          ub(c2, d);
          var g;
          c2 = null;
          for (l in e)
            if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l])
              if ("style" === l) {
                var h = e[l];
                for (g in h)
                  h.hasOwnProperty(g) && (c2 || (c2 = {}), c2[g] = "");
              } else
                "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h))
              if ("style" === l)
                if (h) {
                  for (g in h)
                    !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c2 || (c2 = {}), c2[g] = "");
                  for (g in k)
                    k.hasOwnProperty(g) && h[g] !== k[g] && (c2 || (c2 = {}), c2[g] = k[g]);
                } else
                  c2 || (f || (f = []), f.push(
                    l,
                    c2
                  )), c2 = k;
              else
                "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a2), f || h === k || (f = [])) : (f = f || []).push(l, k));
          }
          c2 && (f = f || []).push("style", c2);
          var l = f;
          if (b2.updateQueue = l)
            b2.flags |= 4;
        }
      };
      Cj = function(a2, b2, c2, d) {
        c2 !== d && (b2.flags |= 4);
      };
      function Dj(a2, b2) {
        if (!I)
          switch (a2.tailMode) {
            case "hidden":
              b2 = a2.tail;
              for (var c2 = null; null !== b2; )
                null !== b2.alternate && (c2 = b2), b2 = b2.sibling;
              null === c2 ? a2.tail = null : c2.sibling = null;
              break;
            case "collapsed":
              c2 = a2.tail;
              for (var d = null; null !== c2; )
                null !== c2.alternate && (d = c2), c2 = c2.sibling;
              null === d ? b2 || null === a2.tail ? a2.tail = null : a2.tail.sibling = null : d.sibling = null;
          }
      }
      function S(a2) {
        var b2 = null !== a2.alternate && a2.alternate.child === a2.child, c2 = 0, d = 0;
        if (b2)
          for (var e = a2.child; null !== e; )
            c2 |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a2, e = e.sibling;
        else
          for (e = a2.child; null !== e; )
            c2 |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a2, e = e.sibling;
        a2.subtreeFlags |= d;
        a2.childLanes = c2;
        return b2;
      }
      function Ej(a2, b2, c2) {
        var d = b2.pendingProps;
        wg(b2);
        switch (b2.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return S(b2), null;
          case 1:
            return Zf(b2.type) && $f(), S(b2), null;
          case 3:
            d = b2.stateNode;
            zh();
            E(Wf);
            E(H);
            Eh();
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a2 || null === a2.child)
              Gg(b2) ? b2.flags |= 4 : null === a2 || a2.memoizedState.isDehydrated && 0 === (b2.flags & 256) || (b2.flags |= 1024, null !== zg && (Fj(zg), zg = null));
            Aj(a2, b2);
            S(b2);
            return null;
          case 5:
            Bh(b2);
            var e = xh(wh.current);
            c2 = b2.type;
            if (null !== a2 && null != b2.stateNode)
              Bj(a2, b2, c2, d, e), a2.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
            else {
              if (!d) {
                if (null === b2.stateNode)
                  throw Error(p2(166));
                S(b2);
                return null;
              }
              a2 = xh(uh.current);
              if (Gg(b2)) {
                d = b2.stateNode;
                c2 = b2.type;
                var f = b2.memoizedProps;
                d[Of] = b2;
                d[Pf] = f;
                a2 = 0 !== (b2.mode & 1);
                switch (c2) {
                  case "dialog":
                    D("cancel", d);
                    D("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++)
                      D(lf[e], d);
                    break;
                  case "source":
                    D("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d
                    );
                    D("load", d);
                    break;
                  case "details":
                    D("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    D("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    D("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), D("invalid", d);
                }
                ub(c2, f);
                e = null;
                for (var g in f)
                  if (f.hasOwnProperty(g)) {
                    var h = f[g];
                    "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a2), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                      d.textContent,
                      h,
                      a2
                    ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                  }
                switch (c2) {
                  case "input":
                    Va(d);
                    db(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = Bf);
                }
                d = e;
                b2.updateQueue = d;
                null !== d && (b2.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a2 && (a2 = kb(c2));
                "http://www.w3.org/1999/xhtml" === a2 ? "script" === c2 ? (a2 = g.createElement("div"), a2.innerHTML = "<script><\/script>", a2 = a2.removeChild(a2.firstChild)) : "string" === typeof d.is ? a2 = g.createElement(c2, { is: d.is }) : (a2 = g.createElement(c2), "select" === c2 && (g = a2, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a2 = g.createElementNS(a2, c2);
                a2[Of] = b2;
                a2[Pf] = d;
                zj(a2, b2, false, false);
                b2.stateNode = a2;
                a: {
                  g = vb(c2, d);
                  switch (c2) {
                    case "dialog":
                      D("cancel", a2);
                      D("close", a2);
                      e = d;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a2);
                      e = d;
                      break;
                    case "video":
                    case "audio":
                      for (e = 0; e < lf.length; e++)
                        D(lf[e], a2);
                      e = d;
                      break;
                    case "source":
                      D("error", a2);
                      e = d;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a2
                      );
                      D("load", a2);
                      e = d;
                      break;
                    case "details":
                      D("toggle", a2);
                      e = d;
                      break;
                    case "input":
                      Za(a2, d);
                      e = Ya(a2, d);
                      D("invalid", a2);
                      break;
                    case "option":
                      e = d;
                      break;
                    case "select":
                      a2._wrapperState = { wasMultiple: !!d.multiple };
                      e = A({}, d, { value: void 0 });
                      D("invalid", a2);
                      break;
                    case "textarea":
                      hb(a2, d);
                      e = gb(a2, d);
                      D("invalid", a2);
                      break;
                    default:
                      e = d;
                  }
                  ub(c2, e);
                  h = e;
                  for (f in h)
                    if (h.hasOwnProperty(f)) {
                      var k = h[f];
                      "style" === f ? sb(a2, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a2, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c2 || "" !== k) && ob(a2, k) : "number" === typeof k && ob(a2, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a2) : null != k && ta(a2, f, k, g));
                    }
                  switch (c2) {
                    case "input":
                      Va(a2);
                      db(a2, d, false);
                      break;
                    case "textarea":
                      Va(a2);
                      jb(a2);
                      break;
                    case "option":
                      null != d.value && a2.setAttribute("value", "" + Sa(d.value));
                      break;
                    case "select":
                      a2.multiple = !!d.multiple;
                      f = d.value;
                      null != f ? fb(a2, !!d.multiple, f, false) : null != d.defaultValue && fb(
                        a2,
                        !!d.multiple,
                        d.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e.onClick && (a2.onclick = Bf);
                  }
                  switch (c2) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d = !!d.autoFocus;
                      break a;
                    case "img":
                      d = true;
                      break a;
                    default:
                      d = false;
                  }
                }
                d && (b2.flags |= 4);
              }
              null !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
            }
            S(b2);
            return null;
          case 6:
            if (a2 && null != b2.stateNode)
              Cj(a2, b2, a2.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b2.stateNode)
                throw Error(p2(166));
              c2 = xh(wh.current);
              xh(uh.current);
              if (Gg(b2)) {
                d = b2.stateNode;
                c2 = b2.memoizedProps;
                d[Of] = b2;
                if (f = d.nodeValue !== c2) {
                  if (a2 = xg, null !== a2)
                    switch (a2.tag) {
                      case 3:
                        Af(d.nodeValue, c2, 0 !== (a2.mode & 1));
                        break;
                      case 5:
                        true !== a2.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c2, 0 !== (a2.mode & 1));
                    }
                }
                f && (b2.flags |= 4);
              } else
                d = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d), d[Of] = b2, b2.stateNode = d;
            }
            S(b2);
            return null;
          case 13:
            E(L);
            d = b2.memoizedState;
            if (null === a2 || null !== a2.memoizedState && null !== a2.memoizedState.dehydrated) {
              if (I && null !== yg && 0 !== (b2.mode & 1) && 0 === (b2.flags & 128))
                Hg(), Ig(), b2.flags |= 98560, f = false;
              else if (f = Gg(b2), null !== d && null !== d.dehydrated) {
                if (null === a2) {
                  if (!f)
                    throw Error(p2(318));
                  f = b2.memoizedState;
                  f = null !== f ? f.dehydrated : null;
                  if (!f)
                    throw Error(p2(317));
                  f[Of] = b2;
                } else
                  Ig(), 0 === (b2.flags & 128) && (b2.memoizedState = null), b2.flags |= 4;
                S(b2);
                f = false;
              } else
                null !== zg && (Fj(zg), zg = null), f = true;
              if (!f)
                return b2.flags & 65536 ? b2 : null;
            }
            if (0 !== (b2.flags & 128))
              return b2.lanes = c2, b2;
            d = null !== d;
            d !== (null !== a2 && null !== a2.memoizedState) && d && (b2.child.flags |= 8192, 0 !== (b2.mode & 1) && (null === a2 || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
            null !== b2.updateQueue && (b2.flags |= 4);
            S(b2);
            return null;
          case 4:
            return zh(), Aj(a2, b2), null === a2 && sf(b2.stateNode.containerInfo), S(b2), null;
          case 10:
            return ah(b2.type._context), S(b2), null;
          case 17:
            return Zf(b2.type) && $f(), S(b2), null;
          case 19:
            E(L);
            f = b2.memoizedState;
            if (null === f)
              return S(b2), null;
            d = 0 !== (b2.flags & 128);
            g = f.rendering;
            if (null === g)
              if (d)
                Dj(f, false);
              else {
                if (0 !== T || null !== a2 && 0 !== (a2.flags & 128))
                  for (a2 = b2.child; null !== a2; ) {
                    g = Ch(a2);
                    if (null !== g) {
                      b2.flags |= 128;
                      Dj(f, false);
                      d = g.updateQueue;
                      null !== d && (b2.updateQueue = d, b2.flags |= 4);
                      b2.subtreeFlags = 0;
                      d = c2;
                      for (c2 = b2.child; null !== c2; )
                        f = c2, a2 = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a2, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a2 = g.dependencies, f.dependencies = null === a2 ? null : { lanes: a2.lanes, firstContext: a2.firstContext }), c2 = c2.sibling;
                      G(L, L.current & 1 | 2);
                      return b2.child;
                    }
                    a2 = a2.sibling;
                  }
                null !== f.tail && B() > Gj && (b2.flags |= 128, d = true, Dj(f, false), b2.lanes = 4194304);
              }
            else {
              if (!d)
                if (a2 = Ch(g), null !== a2) {
                  if (b2.flags |= 128, d = true, c2 = a2.updateQueue, null !== c2 && (b2.updateQueue = c2, b2.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I)
                    return S(b2), null;
                } else
                  2 * B() - f.renderingStartTime > Gj && 1073741824 !== c2 && (b2.flags |= 128, d = true, Dj(f, false), b2.lanes = 4194304);
              f.isBackwards ? (g.sibling = b2.child, b2.child = g) : (c2 = f.last, null !== c2 ? c2.sibling = g : b2.child = g, f.last = g);
            }
            if (null !== f.tail)
              return b2 = f.tail, f.rendering = b2, f.tail = b2.sibling, f.renderingStartTime = B(), b2.sibling = null, c2 = L.current, G(L, d ? c2 & 1 | 2 : c2 & 1), b2;
            S(b2);
            return null;
          case 22:
          case 23:
            return Hj(), d = null !== b2.memoizedState, null !== a2 && null !== a2.memoizedState !== d && (b2.flags |= 8192), d && 0 !== (b2.mode & 1) ? 0 !== (fj & 1073741824) && (S(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : S(b2), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p2(156, b2.tag));
      }
      function Ij(a2, b2) {
        wg(b2);
        switch (b2.tag) {
          case 1:
            return Zf(b2.type) && $f(), a2 = b2.flags, a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
          case 3:
            return zh(), E(Wf), E(H), Eh(), a2 = b2.flags, 0 !== (a2 & 65536) && 0 === (a2 & 128) ? (b2.flags = a2 & -65537 | 128, b2) : null;
          case 5:
            return Bh(b2), null;
          case 13:
            E(L);
            a2 = b2.memoizedState;
            if (null !== a2 && null !== a2.dehydrated) {
              if (null === b2.alternate)
                throw Error(p2(340));
              Ig();
            }
            a2 = b2.flags;
            return a2 & 65536 ? (b2.flags = a2 & -65537 | 128, b2) : null;
          case 19:
            return E(L), null;
          case 4:
            return zh(), null;
          case 10:
            return ah(b2.type._context), null;
          case 22:
          case 23:
            return Hj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Jj = false;
      var U = false;
      var Kj = "function" === typeof WeakSet ? WeakSet : Set;
      var V = null;
      function Lj(a2, b2) {
        var c2 = a2.ref;
        if (null !== c2)
          if ("function" === typeof c2)
            try {
              c2(null);
            } catch (d) {
              W(a2, b2, d);
            }
          else
            c2.current = null;
      }
      function Mj(a2, b2, c2) {
        try {
          c2();
        } catch (d) {
          W(a2, b2, d);
        }
      }
      var Nj = false;
      function Oj(a2, b2) {
        Cf = dd;
        a2 = Me();
        if (Ne(a2)) {
          if ("selectionStart" in a2)
            var c2 = { start: a2.selectionStart, end: a2.selectionEnd };
          else
            a: {
              c2 = (c2 = a2.ownerDocument) && c2.defaultView || window;
              var d = c2.getSelection && c2.getSelection();
              if (d && 0 !== d.rangeCount) {
                c2 = d.anchorNode;
                var e = d.anchorOffset, f = d.focusNode;
                d = d.focusOffset;
                try {
                  c2.nodeType, f.nodeType;
                } catch (F) {
                  c2 = null;
                  break a;
                }
                var g = 0, h = -1, k = -1, l = 0, m = 0, q = a2, r = null;
                b:
                  for (; ; ) {
                    for (var y; ; ) {
                      q !== c2 || 0 !== e && 3 !== q.nodeType || (h = g + e);
                      q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                      3 === q.nodeType && (g += q.nodeValue.length);
                      if (null === (y = q.firstChild))
                        break;
                      r = q;
                      q = y;
                    }
                    for (; ; ) {
                      if (q === a2)
                        break b;
                      r === c2 && ++l === e && (h = g);
                      r === f && ++m === d && (k = g);
                      if (null !== (y = q.nextSibling))
                        break;
                      q = r;
                      r = q.parentNode;
                    }
                    q = y;
                  }
                c2 = -1 === h || -1 === k ? null : { start: h, end: k };
              } else
                c2 = null;
            }
          c2 = c2 || { start: 0, end: 0 };
        } else
          c2 = null;
        Df = { focusedElem: a2, selectionRange: c2 };
        dd = false;
        for (V = b2; null !== V; )
          if (b2 = V, a2 = b2.child, 0 !== (b2.subtreeFlags & 1028) && null !== a2)
            a2.return = b2, V = a2;
          else
            for (; null !== V; ) {
              b2 = V;
              try {
                var n = b2.alternate;
                if (0 !== (b2.flags & 1024))
                  switch (b2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      break;
                    case 1:
                      if (null !== n) {
                        var t = n.memoizedProps, J = n.memoizedState, x = b2.stateNode, w = x.getSnapshotBeforeUpdate(b2.elementType === b2.type ? t : Ci(b2.type, t), J);
                        x.__reactInternalSnapshotBeforeUpdate = w;
                      }
                      break;
                    case 3:
                      var u = b2.stateNode.containerInfo;
                      1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                      break;
                    case 5:
                    case 6:
                    case 4:
                    case 17:
                      break;
                    default:
                      throw Error(p2(163));
                  }
              } catch (F) {
                W(b2, b2.return, F);
              }
              a2 = b2.sibling;
              if (null !== a2) {
                a2.return = b2.return;
                V = a2;
                break;
              }
              V = b2.return;
            }
        n = Nj;
        Nj = false;
        return n;
      }
      function Pj(a2, b2, c2) {
        var d = b2.updateQueue;
        d = null !== d ? d.lastEffect : null;
        if (null !== d) {
          var e = d = d.next;
          do {
            if ((e.tag & a2) === a2) {
              var f = e.destroy;
              e.destroy = void 0;
              void 0 !== f && Mj(b2, c2, f);
            }
            e = e.next;
          } while (e !== d);
        }
      }
      function Qj(a2, b2) {
        b2 = b2.updateQueue;
        b2 = null !== b2 ? b2.lastEffect : null;
        if (null !== b2) {
          var c2 = b2 = b2.next;
          do {
            if ((c2.tag & a2) === a2) {
              var d = c2.create;
              c2.destroy = d();
            }
            c2 = c2.next;
          } while (c2 !== b2);
        }
      }
      function Rj(a2) {
        var b2 = a2.ref;
        if (null !== b2) {
          var c2 = a2.stateNode;
          switch (a2.tag) {
            case 5:
              a2 = c2;
              break;
            default:
              a2 = c2;
          }
          "function" === typeof b2 ? b2(a2) : b2.current = a2;
        }
      }
      function Sj(a2) {
        var b2 = a2.alternate;
        null !== b2 && (a2.alternate = null, Sj(b2));
        a2.child = null;
        a2.deletions = null;
        a2.sibling = null;
        5 === a2.tag && (b2 = a2.stateNode, null !== b2 && (delete b2[Of], delete b2[Pf], delete b2[of], delete b2[Qf], delete b2[Rf]));
        a2.stateNode = null;
        a2.return = null;
        a2.dependencies = null;
        a2.memoizedProps = null;
        a2.memoizedState = null;
        a2.pendingProps = null;
        a2.stateNode = null;
        a2.updateQueue = null;
      }
      function Tj(a2) {
        return 5 === a2.tag || 3 === a2.tag || 4 === a2.tag;
      }
      function Uj(a2) {
        a:
          for (; ; ) {
            for (; null === a2.sibling; ) {
              if (null === a2.return || Tj(a2.return))
                return null;
              a2 = a2.return;
            }
            a2.sibling.return = a2.return;
            for (a2 = a2.sibling; 5 !== a2.tag && 6 !== a2.tag && 18 !== a2.tag; ) {
              if (a2.flags & 2)
                continue a;
              if (null === a2.child || 4 === a2.tag)
                continue a;
              else
                a2.child.return = a2, a2 = a2.child;
            }
            if (!(a2.flags & 2))
              return a2.stateNode;
          }
      }
      function Vj(a2, b2, c2) {
        var d = a2.tag;
        if (5 === d || 6 === d)
          a2 = a2.stateNode, b2 ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a2, b2) : c2.insertBefore(a2, b2) : (8 === c2.nodeType ? (b2 = c2.parentNode, b2.insertBefore(a2, c2)) : (b2 = c2, b2.appendChild(a2)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b2.onclick || (b2.onclick = Bf));
        else if (4 !== d && (a2 = a2.child, null !== a2))
          for (Vj(a2, b2, c2), a2 = a2.sibling; null !== a2; )
            Vj(a2, b2, c2), a2 = a2.sibling;
      }
      function Wj(a2, b2, c2) {
        var d = a2.tag;
        if (5 === d || 6 === d)
          a2 = a2.stateNode, b2 ? c2.insertBefore(a2, b2) : c2.appendChild(a2);
        else if (4 !== d && (a2 = a2.child, null !== a2))
          for (Wj(a2, b2, c2), a2 = a2.sibling; null !== a2; )
            Wj(a2, b2, c2), a2 = a2.sibling;
      }
      var X = null;
      var Xj = false;
      function Yj(a2, b2, c2) {
        for (c2 = c2.child; null !== c2; )
          Zj(a2, b2, c2), c2 = c2.sibling;
      }
      function Zj(a2, b2, c2) {
        if (lc && "function" === typeof lc.onCommitFiberUnmount)
          try {
            lc.onCommitFiberUnmount(kc, c2);
          } catch (h) {
          }
        switch (c2.tag) {
          case 5:
            U || Lj(c2, b2);
          case 6:
            var d = X, e = Xj;
            X = null;
            Yj(a2, b2, c2);
            X = d;
            Xj = e;
            null !== X && (Xj ? (a2 = X, c2 = c2.stateNode, 8 === a2.nodeType ? a2.parentNode.removeChild(c2) : a2.removeChild(c2)) : X.removeChild(c2.stateNode));
            break;
          case 18:
            null !== X && (Xj ? (a2 = X, c2 = c2.stateNode, 8 === a2.nodeType ? Kf(a2.parentNode, c2) : 1 === a2.nodeType && Kf(a2, c2), bd(a2)) : Kf(X, c2.stateNode));
            break;
          case 4:
            d = X;
            e = Xj;
            X = c2.stateNode.containerInfo;
            Xj = true;
            Yj(a2, b2, c2);
            X = d;
            Xj = e;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!U && (d = c2.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
              e = d = d.next;
              do {
                var f = e, g = f.destroy;
                f = f.tag;
                void 0 !== g && (0 !== (f & 2) ? Mj(c2, b2, g) : 0 !== (f & 4) && Mj(c2, b2, g));
                e = e.next;
              } while (e !== d);
            }
            Yj(a2, b2, c2);
            break;
          case 1:
            if (!U && (Lj(c2, b2), d = c2.stateNode, "function" === typeof d.componentWillUnmount))
              try {
                d.props = c2.memoizedProps, d.state = c2.memoizedState, d.componentWillUnmount();
              } catch (h) {
                W(c2, b2, h);
              }
            Yj(a2, b2, c2);
            break;
          case 21:
            Yj(a2, b2, c2);
            break;
          case 22:
            c2.mode & 1 ? (U = (d = U) || null !== c2.memoizedState, Yj(a2, b2, c2), U = d) : Yj(a2, b2, c2);
            break;
          default:
            Yj(a2, b2, c2);
        }
      }
      function ak(a2) {
        var b2 = a2.updateQueue;
        if (null !== b2) {
          a2.updateQueue = null;
          var c2 = a2.stateNode;
          null === c2 && (c2 = a2.stateNode = new Kj());
          b2.forEach(function(b3) {
            var d = bk.bind(null, a2, b3);
            c2.has(b3) || (c2.add(b3), b3.then(d, d));
          });
        }
      }
      function ck(a2, b2) {
        var c2 = b2.deletions;
        if (null !== c2)
          for (var d = 0; d < c2.length; d++) {
            var e = c2[d];
            try {
              var f = a2, g = b2, h = g;
              a:
                for (; null !== h; ) {
                  switch (h.tag) {
                    case 5:
                      X = h.stateNode;
                      Xj = false;
                      break a;
                    case 3:
                      X = h.stateNode.containerInfo;
                      Xj = true;
                      break a;
                    case 4:
                      X = h.stateNode.containerInfo;
                      Xj = true;
                      break a;
                  }
                  h = h.return;
                }
              if (null === X)
                throw Error(p2(160));
              Zj(f, g, e);
              X = null;
              Xj = false;
              var k = e.alternate;
              null !== k && (k.return = null);
              e.return = null;
            } catch (l) {
              W(e, b2, l);
            }
          }
        if (b2.subtreeFlags & 12854)
          for (b2 = b2.child; null !== b2; )
            dk(b2, a2), b2 = b2.sibling;
      }
      function dk(a2, b2) {
        var c2 = a2.alternate, d = a2.flags;
        switch (a2.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ck(b2, a2);
            ek(a2);
            if (d & 4) {
              try {
                Pj(3, a2, a2.return), Qj(3, a2);
              } catch (t) {
                W(a2, a2.return, t);
              }
              try {
                Pj(5, a2, a2.return);
              } catch (t) {
                W(a2, a2.return, t);
              }
            }
            break;
          case 1:
            ck(b2, a2);
            ek(a2);
            d & 512 && null !== c2 && Lj(c2, c2.return);
            break;
          case 5:
            ck(b2, a2);
            ek(a2);
            d & 512 && null !== c2 && Lj(c2, c2.return);
            if (a2.flags & 32) {
              var e = a2.stateNode;
              try {
                ob(e, "");
              } catch (t) {
                W(a2, a2.return, t);
              }
            }
            if (d & 4 && (e = a2.stateNode, null != e)) {
              var f = a2.memoizedProps, g = null !== c2 ? c2.memoizedProps : f, h = a2.type, k = a2.updateQueue;
              a2.updateQueue = null;
              if (null !== k)
                try {
                  "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                  vb(h, g);
                  var l = vb(h, f);
                  for (g = 0; g < k.length; g += 2) {
                    var m = k[g], q = k[g + 1];
                    "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                  }
                  switch (h) {
                    case "input":
                      bb(e, f);
                      break;
                    case "textarea":
                      ib(e, f);
                      break;
                    case "select":
                      var r = e._wrapperState.wasMultiple;
                      e._wrapperState.wasMultiple = !!f.multiple;
                      var y = f.value;
                      null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                        e,
                        !!f.multiple,
                        f.defaultValue,
                        true
                      ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
                  }
                  e[Pf] = f;
                } catch (t) {
                  W(a2, a2.return, t);
                }
            }
            break;
          case 6:
            ck(b2, a2);
            ek(a2);
            if (d & 4) {
              if (null === a2.stateNode)
                throw Error(p2(162));
              e = a2.stateNode;
              f = a2.memoizedProps;
              try {
                e.nodeValue = f;
              } catch (t) {
                W(a2, a2.return, t);
              }
            }
            break;
          case 3:
            ck(b2, a2);
            ek(a2);
            if (d & 4 && null !== c2 && c2.memoizedState.isDehydrated)
              try {
                bd(b2.containerInfo);
              } catch (t) {
                W(a2, a2.return, t);
              }
            break;
          case 4:
            ck(b2, a2);
            ek(a2);
            break;
          case 13:
            ck(b2, a2);
            ek(a2);
            e = a2.child;
            e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
            d & 4 && ak(a2);
            break;
          case 22:
            m = null !== c2 && null !== c2.memoizedState;
            a2.mode & 1 ? (U = (l = U) || m, ck(b2, a2), U = l) : ck(b2, a2);
            ek(a2);
            if (d & 8192) {
              l = null !== a2.memoizedState;
              if ((a2.stateNode.isHidden = l) && !m && 0 !== (a2.mode & 1))
                for (V = a2, m = a2.child; null !== m; ) {
                  for (q = V = m; null !== V; ) {
                    r = V;
                    y = r.child;
                    switch (r.tag) {
                      case 0:
                      case 11:
                      case 14:
                      case 15:
                        Pj(4, r, r.return);
                        break;
                      case 1:
                        Lj(r, r.return);
                        var n = r.stateNode;
                        if ("function" === typeof n.componentWillUnmount) {
                          d = r;
                          c2 = r.return;
                          try {
                            b2 = d, n.props = b2.memoizedProps, n.state = b2.memoizedState, n.componentWillUnmount();
                          } catch (t) {
                            W(d, c2, t);
                          }
                        }
                        break;
                      case 5:
                        Lj(r, r.return);
                        break;
                      case 22:
                        if (null !== r.memoizedState) {
                          gk(q);
                          continue;
                        }
                    }
                    null !== y ? (y.return = r, V = y) : gk(q);
                  }
                  m = m.sibling;
                }
              a:
                for (m = null, q = a2; ; ) {
                  if (5 === q.tag) {
                    if (null === m) {
                      m = q;
                      try {
                        e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                      } catch (t) {
                        W(a2, a2.return, t);
                      }
                    }
                  } else if (6 === q.tag) {
                    if (null === m)
                      try {
                        q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                      } catch (t) {
                        W(a2, a2.return, t);
                      }
                  } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a2) && null !== q.child) {
                    q.child.return = q;
                    q = q.child;
                    continue;
                  }
                  if (q === a2)
                    break a;
                  for (; null === q.sibling; ) {
                    if (null === q.return || q.return === a2)
                      break a;
                    m === q && (m = null);
                    q = q.return;
                  }
                  m === q && (m = null);
                  q.sibling.return = q.return;
                  q = q.sibling;
                }
            }
            break;
          case 19:
            ck(b2, a2);
            ek(a2);
            d & 4 && ak(a2);
            break;
          case 21:
            break;
          default:
            ck(
              b2,
              a2
            ), ek(a2);
        }
      }
      function ek(a2) {
        var b2 = a2.flags;
        if (b2 & 2) {
          try {
            a: {
              for (var c2 = a2.return; null !== c2; ) {
                if (Tj(c2)) {
                  var d = c2;
                  break a;
                }
                c2 = c2.return;
              }
              throw Error(p2(160));
            }
            switch (d.tag) {
              case 5:
                var e = d.stateNode;
                d.flags & 32 && (ob(e, ""), d.flags &= -33);
                var f = Uj(a2);
                Wj(a2, f, e);
                break;
              case 3:
              case 4:
                var g = d.stateNode.containerInfo, h = Uj(a2);
                Vj(a2, h, g);
                break;
              default:
                throw Error(p2(161));
            }
          } catch (k) {
            W(a2, a2.return, k);
          }
          a2.flags &= -3;
        }
        b2 & 4096 && (a2.flags &= -4097);
      }
      function hk(a2, b2, c2) {
        V = a2;
        ik(a2, b2, c2);
      }
      function ik(a2, b2, c2) {
        for (var d = 0 !== (a2.mode & 1); null !== V; ) {
          var e = V, f = e.child;
          if (22 === e.tag && d) {
            var g = null !== e.memoizedState || Jj;
            if (!g) {
              var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
              h = Jj;
              var l = U;
              Jj = g;
              if ((U = k) && !l)
                for (V = e; null !== V; )
                  g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
              for (; null !== f; )
                V = f, ik(f, b2, c2), f = f.sibling;
              V = e;
              Jj = h;
              U = l;
            }
            kk(a2, b2, c2);
          } else
            0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a2, b2, c2);
        }
      }
      function kk(a2) {
        for (; null !== V; ) {
          var b2 = V;
          if (0 !== (b2.flags & 8772)) {
            var c2 = b2.alternate;
            try {
              if (0 !== (b2.flags & 8772))
                switch (b2.tag) {
                  case 0:
                  case 11:
                  case 15:
                    U || Qj(5, b2);
                    break;
                  case 1:
                    var d = b2.stateNode;
                    if (b2.flags & 4 && !U)
                      if (null === c2)
                        d.componentDidMount();
                      else {
                        var e = b2.elementType === b2.type ? c2.memoizedProps : Ci(b2.type, c2.memoizedProps);
                        d.componentDidUpdate(e, c2.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                      }
                    var f = b2.updateQueue;
                    null !== f && sh(b2, f, d);
                    break;
                  case 3:
                    var g = b2.updateQueue;
                    if (null !== g) {
                      c2 = null;
                      if (null !== b2.child)
                        switch (b2.child.tag) {
                          case 5:
                            c2 = b2.child.stateNode;
                            break;
                          case 1:
                            c2 = b2.child.stateNode;
                        }
                      sh(b2, g, c2);
                    }
                    break;
                  case 5:
                    var h = b2.stateNode;
                    if (null === c2 && b2.flags & 4) {
                      c2 = h;
                      var k = b2.memoizedProps;
                      switch (b2.type) {
                        case "button":
                        case "input":
                        case "select":
                        case "textarea":
                          k.autoFocus && c2.focus();
                          break;
                        case "img":
                          k.src && (c2.src = k.src);
                      }
                    }
                    break;
                  case 6:
                    break;
                  case 4:
                    break;
                  case 12:
                    break;
                  case 13:
                    if (null === b2.memoizedState) {
                      var l = b2.alternate;
                      if (null !== l) {
                        var m = l.memoizedState;
                        if (null !== m) {
                          var q = m.dehydrated;
                          null !== q && bd(q);
                        }
                      }
                    }
                    break;
                  case 19:
                  case 17:
                  case 21:
                  case 22:
                  case 23:
                  case 25:
                    break;
                  default:
                    throw Error(p2(163));
                }
              U || b2.flags & 512 && Rj(b2);
            } catch (r) {
              W(b2, b2.return, r);
            }
          }
          if (b2 === a2) {
            V = null;
            break;
          }
          c2 = b2.sibling;
          if (null !== c2) {
            c2.return = b2.return;
            V = c2;
            break;
          }
          V = b2.return;
        }
      }
      function gk(a2) {
        for (; null !== V; ) {
          var b2 = V;
          if (b2 === a2) {
            V = null;
            break;
          }
          var c2 = b2.sibling;
          if (null !== c2) {
            c2.return = b2.return;
            V = c2;
            break;
          }
          V = b2.return;
        }
      }
      function jk(a2) {
        for (; null !== V; ) {
          var b2 = V;
          try {
            switch (b2.tag) {
              case 0:
              case 11:
              case 15:
                var c2 = b2.return;
                try {
                  Qj(4, b2);
                } catch (k) {
                  W(b2, c2, k);
                }
                break;
              case 1:
                var d = b2.stateNode;
                if ("function" === typeof d.componentDidMount) {
                  var e = b2.return;
                  try {
                    d.componentDidMount();
                  } catch (k) {
                    W(b2, e, k);
                  }
                }
                var f = b2.return;
                try {
                  Rj(b2);
                } catch (k) {
                  W(b2, f, k);
                }
                break;
              case 5:
                var g = b2.return;
                try {
                  Rj(b2);
                } catch (k) {
                  W(b2, g, k);
                }
            }
          } catch (k) {
            W(b2, b2.return, k);
          }
          if (b2 === a2) {
            V = null;
            break;
          }
          var h = b2.sibling;
          if (null !== h) {
            h.return = b2.return;
            V = h;
            break;
          }
          V = b2.return;
        }
      }
      var lk = Math.ceil;
      var mk = ua.ReactCurrentDispatcher;
      var nk = ua.ReactCurrentOwner;
      var ok = ua.ReactCurrentBatchConfig;
      var K = 0;
      var Q = null;
      var Y = null;
      var Z = 0;
      var fj = 0;
      var ej = Uf(0);
      var T = 0;
      var pk = null;
      var rh = 0;
      var qk = 0;
      var rk = 0;
      var sk = null;
      var tk = null;
      var fk = 0;
      var Gj = Infinity;
      var uk = null;
      var Oi = false;
      var Pi = null;
      var Ri = null;
      var vk = false;
      var wk = null;
      var xk = 0;
      var yk = 0;
      var zk = null;
      var Ak = -1;
      var Bk = 0;
      function R() {
        return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
      }
      function yi(a2) {
        if (0 === (a2.mode & 1))
          return 1;
        if (0 !== (K & 2) && 0 !== Z)
          return Z & -Z;
        if (null !== Kg.transition)
          return 0 === Bk && (Bk = yc()), Bk;
        a2 = C;
        if (0 !== a2)
          return a2;
        a2 = window.event;
        a2 = void 0 === a2 ? 16 : jd(a2.type);
        return a2;
      }
      function gi(a2, b2, c2, d) {
        if (50 < yk)
          throw yk = 0, zk = null, Error(p2(185));
        Ac(a2, c2, d);
        if (0 === (K & 2) || a2 !== Q)
          a2 === Q && (0 === (K & 2) && (qk |= c2), 4 === T && Ck(a2, Z)), Dk(a2, d), 1 === c2 && 0 === K && 0 === (b2.mode & 1) && (Gj = B() + 500, fg && jg());
      }
      function Dk(a2, b2) {
        var c2 = a2.callbackNode;
        wc(a2, b2);
        var d = uc(a2, a2 === Q ? Z : 0);
        if (0 === d)
          null !== c2 && bc(c2), a2.callbackNode = null, a2.callbackPriority = 0;
        else if (b2 = d & -d, a2.callbackPriority !== b2) {
          null != c2 && bc(c2);
          if (1 === b2)
            0 === a2.tag ? ig(Ek.bind(null, a2)) : hg(Ek.bind(null, a2)), Jf(function() {
              0 === (K & 6) && jg();
            }), c2 = null;
          else {
            switch (Dc(d)) {
              case 1:
                c2 = fc;
                break;
              case 4:
                c2 = gc;
                break;
              case 16:
                c2 = hc;
                break;
              case 536870912:
                c2 = jc;
                break;
              default:
                c2 = hc;
            }
            c2 = Fk(c2, Gk.bind(null, a2));
          }
          a2.callbackPriority = b2;
          a2.callbackNode = c2;
        }
      }
      function Gk(a2, b2) {
        Ak = -1;
        Bk = 0;
        if (0 !== (K & 6))
          throw Error(p2(327));
        var c2 = a2.callbackNode;
        if (Hk() && a2.callbackNode !== c2)
          return null;
        var d = uc(a2, a2 === Q ? Z : 0);
        if (0 === d)
          return null;
        if (0 !== (d & 30) || 0 !== (d & a2.expiredLanes) || b2)
          b2 = Ik(a2, d);
        else {
          b2 = d;
          var e = K;
          K |= 2;
          var f = Jk();
          if (Q !== a2 || Z !== b2)
            uk = null, Gj = B() + 500, Kk(a2, b2);
          do
            try {
              Lk();
              break;
            } catch (h) {
              Mk(a2, h);
            }
          while (1);
          $g();
          mk.current = f;
          K = e;
          null !== Y ? b2 = 0 : (Q = null, Z = 0, b2 = T);
        }
        if (0 !== b2) {
          2 === b2 && (e = xc(a2), 0 !== e && (d = e, b2 = Nk(a2, e)));
          if (1 === b2)
            throw c2 = pk, Kk(a2, 0), Ck(a2, d), Dk(a2, B()), c2;
          if (6 === b2)
            Ck(a2, d);
          else {
            e = a2.current.alternate;
            if (0 === (d & 30) && !Ok(e) && (b2 = Ik(a2, d), 2 === b2 && (f = xc(a2), 0 !== f && (d = f, b2 = Nk(a2, f))), 1 === b2))
              throw c2 = pk, Kk(a2, 0), Ck(a2, d), Dk(a2, B()), c2;
            a2.finishedWork = e;
            a2.finishedLanes = d;
            switch (b2) {
              case 0:
              case 1:
                throw Error(p2(345));
              case 2:
                Pk(a2, tk, uk);
                break;
              case 3:
                Ck(a2, d);
                if ((d & 130023424) === d && (b2 = fk + 500 - B(), 10 < b2)) {
                  if (0 !== uc(a2, 0))
                    break;
                  e = a2.suspendedLanes;
                  if ((e & d) !== d) {
                    R();
                    a2.pingedLanes |= a2.suspendedLanes & e;
                    break;
                  }
                  a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), b2);
                  break;
                }
                Pk(a2, tk, uk);
                break;
              case 4:
                Ck(a2, d);
                if ((d & 4194240) === d)
                  break;
                b2 = a2.eventTimes;
                for (e = -1; 0 < d; ) {
                  var g = 31 - oc(d);
                  f = 1 << g;
                  g = b2[g];
                  g > e && (e = g);
                  d &= ~f;
                }
                d = e;
                d = B() - d;
                d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
                if (10 < d) {
                  a2.timeoutHandle = Ff(Pk.bind(null, a2, tk, uk), d);
                  break;
                }
                Pk(a2, tk, uk);
                break;
              case 5:
                Pk(a2, tk, uk);
                break;
              default:
                throw Error(p2(329));
            }
          }
        }
        Dk(a2, B());
        return a2.callbackNode === c2 ? Gk.bind(null, a2) : null;
      }
      function Nk(a2, b2) {
        var c2 = sk;
        a2.current.memoizedState.isDehydrated && (Kk(a2, b2).flags |= 256);
        a2 = Ik(a2, b2);
        2 !== a2 && (b2 = tk, tk = c2, null !== b2 && Fj(b2));
        return a2;
      }
      function Fj(a2) {
        null === tk ? tk = a2 : tk.push.apply(tk, a2);
      }
      function Ok(a2) {
        for (var b2 = a2; ; ) {
          if (b2.flags & 16384) {
            var c2 = b2.updateQueue;
            if (null !== c2 && (c2 = c2.stores, null !== c2))
              for (var d = 0; d < c2.length; d++) {
                var e = c2[d], f = e.getSnapshot;
                e = e.value;
                try {
                  if (!He(f(), e))
                    return false;
                } catch (g) {
                  return false;
                }
              }
          }
          c2 = b2.child;
          if (b2.subtreeFlags & 16384 && null !== c2)
            c2.return = b2, b2 = c2;
          else {
            if (b2 === a2)
              break;
            for (; null === b2.sibling; ) {
              if (null === b2.return || b2.return === a2)
                return true;
              b2 = b2.return;
            }
            b2.sibling.return = b2.return;
            b2 = b2.sibling;
          }
        }
        return true;
      }
      function Ck(a2, b2) {
        b2 &= ~rk;
        b2 &= ~qk;
        a2.suspendedLanes |= b2;
        a2.pingedLanes &= ~b2;
        for (a2 = a2.expirationTimes; 0 < b2; ) {
          var c2 = 31 - oc(b2), d = 1 << c2;
          a2[c2] = -1;
          b2 &= ~d;
        }
      }
      function Ek(a2) {
        if (0 !== (K & 6))
          throw Error(p2(327));
        Hk();
        var b2 = uc(a2, 0);
        if (0 === (b2 & 1))
          return Dk(a2, B()), null;
        var c2 = Ik(a2, b2);
        if (0 !== a2.tag && 2 === c2) {
          var d = xc(a2);
          0 !== d && (b2 = d, c2 = Nk(a2, d));
        }
        if (1 === c2)
          throw c2 = pk, Kk(a2, 0), Ck(a2, b2), Dk(a2, B()), c2;
        if (6 === c2)
          throw Error(p2(345));
        a2.finishedWork = a2.current.alternate;
        a2.finishedLanes = b2;
        Pk(a2, tk, uk);
        Dk(a2, B());
        return null;
      }
      function Qk(a2, b2) {
        var c2 = K;
        K |= 1;
        try {
          return a2(b2);
        } finally {
          K = c2, 0 === K && (Gj = B() + 500, fg && jg());
        }
      }
      function Rk(a2) {
        null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
        var b2 = K;
        K |= 1;
        var c2 = ok.transition, d = C;
        try {
          if (ok.transition = null, C = 1, a2)
            return a2();
        } finally {
          C = d, ok.transition = c2, K = b2, 0 === (K & 6) && jg();
        }
      }
      function Hj() {
        fj = ej.current;
        E(ej);
      }
      function Kk(a2, b2) {
        a2.finishedWork = null;
        a2.finishedLanes = 0;
        var c2 = a2.timeoutHandle;
        -1 !== c2 && (a2.timeoutHandle = -1, Gf(c2));
        if (null !== Y)
          for (c2 = Y.return; null !== c2; ) {
            var d = c2;
            wg(d);
            switch (d.tag) {
              case 1:
                d = d.type.childContextTypes;
                null !== d && void 0 !== d && $f();
                break;
              case 3:
                zh();
                E(Wf);
                E(H);
                Eh();
                break;
              case 5:
                Bh(d);
                break;
              case 4:
                zh();
                break;
              case 13:
                E(L);
                break;
              case 19:
                E(L);
                break;
              case 10:
                ah(d.type._context);
                break;
              case 22:
              case 23:
                Hj();
            }
            c2 = c2.return;
          }
        Q = a2;
        Y = a2 = Pg(a2.current, null);
        Z = fj = b2;
        T = 0;
        pk = null;
        rk = qk = rh = 0;
        tk = sk = null;
        if (null !== fh) {
          for (b2 = 0; b2 < fh.length; b2++)
            if (c2 = fh[b2], d = c2.interleaved, null !== d) {
              c2.interleaved = null;
              var e = d.next, f = c2.pending;
              if (null !== f) {
                var g = f.next;
                f.next = e;
                d.next = g;
              }
              c2.pending = d;
            }
          fh = null;
        }
        return a2;
      }
      function Mk(a2, b2) {
        do {
          var c2 = Y;
          try {
            $g();
            Fh.current = Rh;
            if (Ih) {
              for (var d = M.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              Ih = false;
            }
            Hh = 0;
            O = N = M = null;
            Jh = false;
            Kh = 0;
            nk.current = null;
            if (null === c2 || null === c2.return) {
              T = 1;
              pk = b2;
              Y = null;
              break;
            }
            a: {
              var f = a2, g = c2.return, h = c2, k = b2;
              b2 = Z;
              h.flags |= 32768;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k, m = h, q = m.tag;
                if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                  var r = m.alternate;
                  r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
                }
                var y = Ui(g);
                if (null !== y) {
                  y.flags &= -257;
                  Vi(y, g, h, f, b2);
                  y.mode & 1 && Si(f, l, b2);
                  b2 = y;
                  k = l;
                  var n = b2.updateQueue;
                  if (null === n) {
                    var t = /* @__PURE__ */ new Set();
                    t.add(k);
                    b2.updateQueue = t;
                  } else
                    n.add(k);
                  break a;
                } else {
                  if (0 === (b2 & 1)) {
                    Si(f, l, b2);
                    tj();
                    break a;
                  }
                  k = Error(p2(426));
                }
              } else if (I && h.mode & 1) {
                var J = Ui(g);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Vi(J, g, h, f, b2);
                  Jg(Ji(k, h));
                  break a;
                }
              }
              f = k = Ji(k, h);
              4 !== T && (T = 2);
              null === sk ? sk = [f] : sk.push(f);
              f = g;
              do {
                switch (f.tag) {
                  case 3:
                    f.flags |= 65536;
                    b2 &= -b2;
                    f.lanes |= b2;
                    var x = Ni(f, k, b2);
                    ph(f, x);
                    break a;
                  case 1:
                    h = k;
                    var w = f.type, u = f.stateNode;
                    if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                      f.flags |= 65536;
                      b2 &= -b2;
                      f.lanes |= b2;
                      var F = Qi(f, h, b2);
                      ph(f, F);
                      break a;
                    }
                }
                f = f.return;
              } while (null !== f);
            }
            Sk(c2);
          } catch (na) {
            b2 = na;
            Y === c2 && null !== c2 && (Y = c2 = c2.return);
            continue;
          }
          break;
        } while (1);
      }
      function Jk() {
        var a2 = mk.current;
        mk.current = Rh;
        return null === a2 ? Rh : a2;
      }
      function tj() {
        if (0 === T || 3 === T || 2 === T)
          T = 4;
        null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
      }
      function Ik(a2, b2) {
        var c2 = K;
        K |= 2;
        var d = Jk();
        if (Q !== a2 || Z !== b2)
          uk = null, Kk(a2, b2);
        do
          try {
            Tk();
            break;
          } catch (e) {
            Mk(a2, e);
          }
        while (1);
        $g();
        K = c2;
        mk.current = d;
        if (null !== Y)
          throw Error(p2(261));
        Q = null;
        Z = 0;
        return T;
      }
      function Tk() {
        for (; null !== Y; )
          Uk(Y);
      }
      function Lk() {
        for (; null !== Y && !cc(); )
          Uk(Y);
      }
      function Uk(a2) {
        var b2 = Vk(a2.alternate, a2, fj);
        a2.memoizedProps = a2.pendingProps;
        null === b2 ? Sk(a2) : Y = b2;
        nk.current = null;
      }
      function Sk(a2) {
        var b2 = a2;
        do {
          var c2 = b2.alternate;
          a2 = b2.return;
          if (0 === (b2.flags & 32768)) {
            if (c2 = Ej(c2, b2, fj), null !== c2) {
              Y = c2;
              return;
            }
          } else {
            c2 = Ij(c2, b2);
            if (null !== c2) {
              c2.flags &= 32767;
              Y = c2;
              return;
            }
            if (null !== a2)
              a2.flags |= 32768, a2.subtreeFlags = 0, a2.deletions = null;
            else {
              T = 6;
              Y = null;
              return;
            }
          }
          b2 = b2.sibling;
          if (null !== b2) {
            Y = b2;
            return;
          }
          Y = b2 = a2;
        } while (null !== b2);
        0 === T && (T = 5);
      }
      function Pk(a2, b2, c2) {
        var d = C, e = ok.transition;
        try {
          ok.transition = null, C = 1, Wk(a2, b2, c2, d);
        } finally {
          ok.transition = e, C = d;
        }
        return null;
      }
      function Wk(a2, b2, c2, d) {
        do
          Hk();
        while (null !== wk);
        if (0 !== (K & 6))
          throw Error(p2(327));
        c2 = a2.finishedWork;
        var e = a2.finishedLanes;
        if (null === c2)
          return null;
        a2.finishedWork = null;
        a2.finishedLanes = 0;
        if (c2 === a2.current)
          throw Error(p2(177));
        a2.callbackNode = null;
        a2.callbackPriority = 0;
        var f = c2.lanes | c2.childLanes;
        Bc(a2, f);
        a2 === Q && (Y = Q = null, Z = 0);
        0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || vk || (vk = true, Fk(hc, function() {
          Hk();
          return null;
        }));
        f = 0 !== (c2.flags & 15990);
        if (0 !== (c2.subtreeFlags & 15990) || f) {
          f = ok.transition;
          ok.transition = null;
          var g = C;
          C = 1;
          var h = K;
          K |= 4;
          nk.current = null;
          Oj(a2, c2);
          dk(c2, a2);
          Oe(Df);
          dd = !!Cf;
          Df = Cf = null;
          a2.current = c2;
          hk(c2, a2, e);
          dc();
          K = h;
          C = g;
          ok.transition = f;
        } else
          a2.current = c2;
        vk && (vk = false, wk = a2, xk = e);
        f = a2.pendingLanes;
        0 === f && (Ri = null);
        mc(c2.stateNode, d);
        Dk(a2, B());
        if (null !== b2)
          for (d = a2.onRecoverableError, c2 = 0; c2 < b2.length; c2++)
            e = b2[c2], d(e.value, { componentStack: e.stack, digest: e.digest });
        if (Oi)
          throw Oi = false, a2 = Pi, Pi = null, a2;
        0 !== (xk & 1) && 0 !== a2.tag && Hk();
        f = a2.pendingLanes;
        0 !== (f & 1) ? a2 === zk ? yk++ : (yk = 0, zk = a2) : yk = 0;
        jg();
        return null;
      }
      function Hk() {
        if (null !== wk) {
          var a2 = Dc(xk), b2 = ok.transition, c2 = C;
          try {
            ok.transition = null;
            C = 16 > a2 ? 16 : a2;
            if (null === wk)
              var d = false;
            else {
              a2 = wk;
              wk = null;
              xk = 0;
              if (0 !== (K & 6))
                throw Error(p2(331));
              var e = K;
              K |= 4;
              for (V = a2.current; null !== V; ) {
                var f = V, g = f.child;
                if (0 !== (V.flags & 16)) {
                  var h = f.deletions;
                  if (null !== h) {
                    for (var k = 0; k < h.length; k++) {
                      var l = h[k];
                      for (V = l; null !== V; ) {
                        var m = V;
                        switch (m.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(8, m, f);
                        }
                        var q = m.child;
                        if (null !== q)
                          q.return = m, V = q;
                        else
                          for (; null !== V; ) {
                            m = V;
                            var r = m.sibling, y = m.return;
                            Sj(m);
                            if (m === l) {
                              V = null;
                              break;
                            }
                            if (null !== r) {
                              r.return = y;
                              V = r;
                              break;
                            }
                            V = y;
                          }
                      }
                    }
                    var n = f.alternate;
                    if (null !== n) {
                      var t = n.child;
                      if (null !== t) {
                        n.child = null;
                        do {
                          var J = t.sibling;
                          t.sibling = null;
                          t = J;
                        } while (null !== t);
                      }
                    }
                    V = f;
                  }
                }
                if (0 !== (f.subtreeFlags & 2064) && null !== g)
                  g.return = f, V = g;
                else
                  b:
                    for (; null !== V; ) {
                      f = V;
                      if (0 !== (f.flags & 2048))
                        switch (f.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(9, f, f.return);
                        }
                      var x = f.sibling;
                      if (null !== x) {
                        x.return = f.return;
                        V = x;
                        break b;
                      }
                      V = f.return;
                    }
              }
              var w = a2.current;
              for (V = w; null !== V; ) {
                g = V;
                var u = g.child;
                if (0 !== (g.subtreeFlags & 2064) && null !== u)
                  u.return = g, V = u;
                else
                  b:
                    for (g = w; null !== V; ) {
                      h = V;
                      if (0 !== (h.flags & 2048))
                        try {
                          switch (h.tag) {
                            case 0:
                            case 11:
                            case 15:
                              Qj(9, h);
                          }
                        } catch (na) {
                          W(h, h.return, na);
                        }
                      if (h === g) {
                        V = null;
                        break b;
                      }
                      var F = h.sibling;
                      if (null !== F) {
                        F.return = h.return;
                        V = F;
                        break b;
                      }
                      V = h.return;
                    }
              }
              K = e;
              jg();
              if (lc && "function" === typeof lc.onPostCommitFiberRoot)
                try {
                  lc.onPostCommitFiberRoot(kc, a2);
                } catch (na) {
                }
              d = true;
            }
            return d;
          } finally {
            C = c2, ok.transition = b2;
          }
        }
        return false;
      }
      function Xk(a2, b2, c2) {
        b2 = Ji(c2, b2);
        b2 = Ni(a2, b2, 1);
        a2 = nh(a2, b2, 1);
        b2 = R();
        null !== a2 && (Ac(a2, 1, b2), Dk(a2, b2));
      }
      function W(a2, b2, c2) {
        if (3 === a2.tag)
          Xk(a2, a2, c2);
        else
          for (; null !== b2; ) {
            if (3 === b2.tag) {
              Xk(b2, a2, c2);
              break;
            } else if (1 === b2.tag) {
              var d = b2.stateNode;
              if ("function" === typeof b2.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
                a2 = Ji(c2, a2);
                a2 = Qi(b2, a2, 1);
                b2 = nh(b2, a2, 1);
                a2 = R();
                null !== b2 && (Ac(b2, 1, a2), Dk(b2, a2));
                break;
              }
            }
            b2 = b2.return;
          }
      }
      function Ti(a2, b2, c2) {
        var d = a2.pingCache;
        null !== d && d.delete(b2);
        b2 = R();
        a2.pingedLanes |= a2.suspendedLanes & c2;
        Q === a2 && (Z & c2) === c2 && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a2, 0) : rk |= c2);
        Dk(a2, b2);
      }
      function Yk(a2, b2) {
        0 === b2 && (0 === (a2.mode & 1) ? b2 = 1 : (b2 = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
        var c2 = R();
        a2 = ih(a2, b2);
        null !== a2 && (Ac(a2, b2, c2), Dk(a2, c2));
      }
      function uj(a2) {
        var b2 = a2.memoizedState, c2 = 0;
        null !== b2 && (c2 = b2.retryLane);
        Yk(a2, c2);
      }
      function bk(a2, b2) {
        var c2 = 0;
        switch (a2.tag) {
          case 13:
            var d = a2.stateNode;
            var e = a2.memoizedState;
            null !== e && (c2 = e.retryLane);
            break;
          case 19:
            d = a2.stateNode;
            break;
          default:
            throw Error(p2(314));
        }
        null !== d && d.delete(b2);
        Yk(a2, c2);
      }
      var Vk;
      Vk = function(a2, b2, c2) {
        if (null !== a2)
          if (a2.memoizedProps !== b2.pendingProps || Wf.current)
            dh = true;
          else {
            if (0 === (a2.lanes & c2) && 0 === (b2.flags & 128))
              return dh = false, yj(a2, b2, c2);
            dh = 0 !== (a2.flags & 131072) ? true : false;
          }
        else
          dh = false, I && 0 !== (b2.flags & 1048576) && ug(b2, ng, b2.index);
        b2.lanes = 0;
        switch (b2.tag) {
          case 2:
            var d = b2.type;
            ij(a2, b2);
            a2 = b2.pendingProps;
            var e = Yf(b2, H.current);
            ch(b2, c2);
            e = Nh(null, b2, d, a2, e, c2);
            var f = Sh();
            b2.flags |= 1;
            "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Zf(d) ? (f = true, cg(b2)) : f = false, b2.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b2), e.updater = Ei, b2.stateNode = e, e._reactInternals = b2, Ii(b2, d, a2, c2), b2 = jj(null, b2, d, true, f, c2)) : (b2.tag = 0, I && f && vg(b2), Xi(null, b2, e, c2), b2 = b2.child);
            return b2;
          case 16:
            d = b2.elementType;
            a: {
              ij(a2, b2);
              a2 = b2.pendingProps;
              e = d._init;
              d = e(d._payload);
              b2.type = d;
              e = b2.tag = Zk(d);
              a2 = Ci(d, a2);
              switch (e) {
                case 0:
                  b2 = cj(null, b2, d, a2, c2);
                  break a;
                case 1:
                  b2 = hj(null, b2, d, a2, c2);
                  break a;
                case 11:
                  b2 = Yi(null, b2, d, a2, c2);
                  break a;
                case 14:
                  b2 = $i(null, b2, d, Ci(d.type, a2), c2);
                  break a;
              }
              throw Error(p2(
                306,
                d,
                ""
              ));
            }
            return b2;
          case 0:
            return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Ci(d, e), cj(a2, b2, d, e, c2);
          case 1:
            return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Ci(d, e), hj(a2, b2, d, e, c2);
          case 3:
            a: {
              kj(b2);
              if (null === a2)
                throw Error(p2(387));
              d = b2.pendingProps;
              f = b2.memoizedState;
              e = f.element;
              lh(a2, b2);
              qh(b2, d, null, c2);
              var g = b2.memoizedState;
              d = g.element;
              if (f.isDehydrated)
                if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b2.updateQueue.baseState = f, b2.memoizedState = f, b2.flags & 256) {
                  e = Ji(Error(p2(423)), b2);
                  b2 = lj(a2, b2, d, c2, e);
                  break a;
                } else if (d !== e) {
                  e = Ji(Error(p2(424)), b2);
                  b2 = lj(a2, b2, d, c2, e);
                  break a;
                } else
                  for (yg = Lf(b2.stateNode.containerInfo.firstChild), xg = b2, I = true, zg = null, c2 = Vg(b2, null, d, c2), b2.child = c2; c2; )
                    c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
              else {
                Ig();
                if (d === e) {
                  b2 = Zi(a2, b2, c2);
                  break a;
                }
                Xi(a2, b2, d, c2);
              }
              b2 = b2.child;
            }
            return b2;
          case 5:
            return Ah(b2), null === a2 && Eg(b2), d = b2.type, e = b2.pendingProps, f = null !== a2 ? a2.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b2.flags |= 32), gj(a2, b2), Xi(a2, b2, g, c2), b2.child;
          case 6:
            return null === a2 && Eg(b2), null;
          case 13:
            return oj(a2, b2, c2);
          case 4:
            return yh(b2, b2.stateNode.containerInfo), d = b2.pendingProps, null === a2 ? b2.child = Ug(b2, null, d, c2) : Xi(a2, b2, d, c2), b2.child;
          case 11:
            return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Ci(d, e), Yi(a2, b2, d, e, c2);
          case 7:
            return Xi(a2, b2, b2.pendingProps, c2), b2.child;
          case 8:
            return Xi(a2, b2, b2.pendingProps.children, c2), b2.child;
          case 12:
            return Xi(a2, b2, b2.pendingProps.children, c2), b2.child;
          case 10:
            a: {
              d = b2.type._context;
              e = b2.pendingProps;
              f = b2.memoizedProps;
              g = e.value;
              G(Wg, d._currentValue);
              d._currentValue = g;
              if (null !== f)
                if (He(f.value, g)) {
                  if (f.children === e.children && !Wf.current) {
                    b2 = Zi(a2, b2, c2);
                    break a;
                  }
                } else
                  for (f = b2.child, null !== f && (f.return = b2); null !== f; ) {
                    var h = f.dependencies;
                    if (null !== h) {
                      g = f.child;
                      for (var k = h.firstContext; null !== k; ) {
                        if (k.context === d) {
                          if (1 === f.tag) {
                            k = mh(-1, c2 & -c2);
                            k.tag = 2;
                            var l = f.updateQueue;
                            if (null !== l) {
                              l = l.shared;
                              var m = l.pending;
                              null === m ? k.next = k : (k.next = m.next, m.next = k);
                              l.pending = k;
                            }
                          }
                          f.lanes |= c2;
                          k = f.alternate;
                          null !== k && (k.lanes |= c2);
                          bh(
                            f.return,
                            c2,
                            b2
                          );
                          h.lanes |= c2;
                          break;
                        }
                        k = k.next;
                      }
                    } else if (10 === f.tag)
                      g = f.type === b2.type ? null : f.child;
                    else if (18 === f.tag) {
                      g = f.return;
                      if (null === g)
                        throw Error(p2(341));
                      g.lanes |= c2;
                      h = g.alternate;
                      null !== h && (h.lanes |= c2);
                      bh(g, c2, b2);
                      g = f.sibling;
                    } else
                      g = f.child;
                    if (null !== g)
                      g.return = f;
                    else
                      for (g = f; null !== g; ) {
                        if (g === b2) {
                          g = null;
                          break;
                        }
                        f = g.sibling;
                        if (null !== f) {
                          f.return = g.return;
                          g = f;
                          break;
                        }
                        g = g.return;
                      }
                    f = g;
                  }
              Xi(a2, b2, e.children, c2);
              b2 = b2.child;
            }
            return b2;
          case 9:
            return e = b2.type, d = b2.pendingProps.children, ch(b2, c2), e = eh(e), d = d(e), b2.flags |= 1, Xi(a2, b2, d, c2), b2.child;
          case 14:
            return d = b2.type, e = Ci(d, b2.pendingProps), e = Ci(d.type, e), $i(a2, b2, d, e, c2);
          case 15:
            return bj(a2, b2, b2.type, b2.pendingProps, c2);
          case 17:
            return d = b2.type, e = b2.pendingProps, e = b2.elementType === d ? e : Ci(d, e), ij(a2, b2), b2.tag = 1, Zf(d) ? (a2 = true, cg(b2)) : a2 = false, ch(b2, c2), Gi(b2, d, e), Ii(b2, d, e, c2), jj(null, b2, d, true, a2, c2);
          case 19:
            return xj(a2, b2, c2);
          case 22:
            return dj(a2, b2, c2);
        }
        throw Error(p2(156, b2.tag));
      };
      function Fk(a2, b2) {
        return ac(a2, b2);
      }
      function $k(a2, b2, c2, d) {
        this.tag = a2;
        this.key = c2;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b2;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function Bg(a2, b2, c2, d) {
        return new $k(a2, b2, c2, d);
      }
      function aj(a2) {
        a2 = a2.prototype;
        return !(!a2 || !a2.isReactComponent);
      }
      function Zk(a2) {
        if ("function" === typeof a2)
          return aj(a2) ? 1 : 0;
        if (void 0 !== a2 && null !== a2) {
          a2 = a2.$$typeof;
          if (a2 === Da)
            return 11;
          if (a2 === Ga)
            return 14;
        }
        return 2;
      }
      function Pg(a2, b2) {
        var c2 = a2.alternate;
        null === c2 ? (c2 = Bg(a2.tag, b2, a2.key, a2.mode), c2.elementType = a2.elementType, c2.type = a2.type, c2.stateNode = a2.stateNode, c2.alternate = a2, a2.alternate = c2) : (c2.pendingProps = b2, c2.type = a2.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
        c2.flags = a2.flags & 14680064;
        c2.childLanes = a2.childLanes;
        c2.lanes = a2.lanes;
        c2.child = a2.child;
        c2.memoizedProps = a2.memoizedProps;
        c2.memoizedState = a2.memoizedState;
        c2.updateQueue = a2.updateQueue;
        b2 = a2.dependencies;
        c2.dependencies = null === b2 ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
        c2.sibling = a2.sibling;
        c2.index = a2.index;
        c2.ref = a2.ref;
        return c2;
      }
      function Rg(a2, b2, c2, d, e, f) {
        var g = 2;
        d = a2;
        if ("function" === typeof a2)
          aj(a2) && (g = 1);
        else if ("string" === typeof a2)
          g = 5;
        else
          a:
            switch (a2) {
              case ya:
                return Tg(c2.children, e, f, b2);
              case za:
                g = 8;
                e |= 8;
                break;
              case Aa:
                return a2 = Bg(12, c2, b2, e | 2), a2.elementType = Aa, a2.lanes = f, a2;
              case Ea:
                return a2 = Bg(13, c2, b2, e), a2.elementType = Ea, a2.lanes = f, a2;
              case Fa:
                return a2 = Bg(19, c2, b2, e), a2.elementType = Fa, a2.lanes = f, a2;
              case Ia:
                return pj(c2, e, f, b2);
              default:
                if ("object" === typeof a2 && null !== a2)
                  switch (a2.$$typeof) {
                    case Ba:
                      g = 10;
                      break a;
                    case Ca:
                      g = 9;
                      break a;
                    case Da:
                      g = 11;
                      break a;
                    case Ga:
                      g = 14;
                      break a;
                    case Ha:
                      g = 16;
                      d = null;
                      break a;
                  }
                throw Error(p2(130, null == a2 ? a2 : typeof a2, ""));
            }
        b2 = Bg(g, c2, b2, e);
        b2.elementType = a2;
        b2.type = d;
        b2.lanes = f;
        return b2;
      }
      function Tg(a2, b2, c2, d) {
        a2 = Bg(7, a2, d, b2);
        a2.lanes = c2;
        return a2;
      }
      function pj(a2, b2, c2, d) {
        a2 = Bg(22, a2, d, b2);
        a2.elementType = Ia;
        a2.lanes = c2;
        a2.stateNode = { isHidden: false };
        return a2;
      }
      function Qg(a2, b2, c2) {
        a2 = Bg(6, a2, null, b2);
        a2.lanes = c2;
        return a2;
      }
      function Sg(a2, b2, c2) {
        b2 = Bg(4, null !== a2.children ? a2.children : [], a2.key, b2);
        b2.lanes = c2;
        b2.stateNode = { containerInfo: a2.containerInfo, pendingChildren: null, implementation: a2.implementation };
        return b2;
      }
      function al(a2, b2, c2, d, e) {
        this.tag = b2;
        this.containerInfo = a2;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = zc(0);
        this.expirationTimes = zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = zc(0);
        this.identifierPrefix = d;
        this.onRecoverableError = e;
        this.mutableSourceEagerHydrationData = null;
      }
      function bl(a2, b2, c2, d, e, f, g, h, k) {
        a2 = new al(a2, b2, c2, h, k);
        1 === b2 ? (b2 = 1, true === f && (b2 |= 8)) : b2 = 0;
        f = Bg(3, null, null, b2);
        a2.current = f;
        f.stateNode = a2;
        f.memoizedState = { element: d, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        kh(f);
        return a2;
      }
      function cl(a2, b2, c2) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: wa, key: null == d ? null : "" + d, children: a2, containerInfo: b2, implementation: c2 };
      }
      function dl(a2) {
        if (!a2)
          return Vf;
        a2 = a2._reactInternals;
        a: {
          if (Vb(a2) !== a2 || 1 !== a2.tag)
            throw Error(p2(170));
          var b2 = a2;
          do {
            switch (b2.tag) {
              case 3:
                b2 = b2.stateNode.context;
                break a;
              case 1:
                if (Zf(b2.type)) {
                  b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b2 = b2.return;
          } while (null !== b2);
          throw Error(p2(171));
        }
        if (1 === a2.tag) {
          var c2 = a2.type;
          if (Zf(c2))
            return bg(a2, c2, b2);
        }
        return b2;
      }
      function el(a2, b2, c2, d, e, f, g, h, k) {
        a2 = bl(c2, d, true, a2, e, f, g, h, k);
        a2.context = dl(null);
        c2 = a2.current;
        d = R();
        e = yi(c2);
        f = mh(d, e);
        f.callback = void 0 !== b2 && null !== b2 ? b2 : null;
        nh(c2, f, e);
        a2.current.lanes = e;
        Ac(a2, e, d);
        Dk(a2, d);
        return a2;
      }
      function fl(a2, b2, c2, d) {
        var e = b2.current, f = R(), g = yi(e);
        c2 = dl(c2);
        null === b2.context ? b2.context = c2 : b2.pendingContext = c2;
        b2 = mh(f, g);
        b2.payload = { element: a2 };
        d = void 0 === d ? null : d;
        null !== d && (b2.callback = d);
        a2 = nh(e, b2, g);
        null !== a2 && (gi(a2, e, g, f), oh(a2, e, g));
        return g;
      }
      function gl(a2) {
        a2 = a2.current;
        if (!a2.child)
          return null;
        switch (a2.child.tag) {
          case 5:
            return a2.child.stateNode;
          default:
            return a2.child.stateNode;
        }
      }
      function hl(a2, b2) {
        a2 = a2.memoizedState;
        if (null !== a2 && null !== a2.dehydrated) {
          var c2 = a2.retryLane;
          a2.retryLane = 0 !== c2 && c2 < b2 ? c2 : b2;
        }
      }
      function il(a2, b2) {
        hl(a2, b2);
        (a2 = a2.alternate) && hl(a2, b2);
      }
      function jl() {
        return null;
      }
      var kl = "function" === typeof reportError ? reportError : function(a2) {
        console.error(a2);
      };
      function ll(a2) {
        this._internalRoot = a2;
      }
      ml.prototype.render = ll.prototype.render = function(a2) {
        var b2 = this._internalRoot;
        if (null === b2)
          throw Error(p2(409));
        fl(a2, b2, null, null);
      };
      ml.prototype.unmount = ll.prototype.unmount = function() {
        var a2 = this._internalRoot;
        if (null !== a2) {
          this._internalRoot = null;
          var b2 = a2.containerInfo;
          Rk(function() {
            fl(null, a2, null, null);
          });
          b2[uf] = null;
        }
      };
      function ml(a2) {
        this._internalRoot = a2;
      }
      ml.prototype.unstable_scheduleHydration = function(a2) {
        if (a2) {
          var b2 = Hc();
          a2 = { blockedOn: null, target: a2, priority: b2 };
          for (var c2 = 0; c2 < Qc.length && 0 !== b2 && b2 < Qc[c2].priority; c2++)
            ;
          Qc.splice(c2, 0, a2);
          0 === c2 && Vc(a2);
        }
      };
      function nl(a2) {
        return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType);
      }
      function ol(a2) {
        return !(!a2 || 1 !== a2.nodeType && 9 !== a2.nodeType && 11 !== a2.nodeType && (8 !== a2.nodeType || " react-mount-point-unstable " !== a2.nodeValue));
      }
      function pl() {
      }
      function ql(a2, b2, c2, d, e) {
        if (e) {
          if ("function" === typeof d) {
            var f = d;
            d = function() {
              var a3 = gl(g);
              f.call(a3);
            };
          }
          var g = el(b2, d, a2, 0, null, false, false, "", pl);
          a2._reactRootContainer = g;
          a2[uf] = g.current;
          sf(8 === a2.nodeType ? a2.parentNode : a2);
          Rk();
          return g;
        }
        for (; e = a2.lastChild; )
          a2.removeChild(e);
        if ("function" === typeof d) {
          var h = d;
          d = function() {
            var a3 = gl(k);
            h.call(a3);
          };
        }
        var k = bl(a2, 0, false, null, null, false, false, "", pl);
        a2._reactRootContainer = k;
        a2[uf] = k.current;
        sf(8 === a2.nodeType ? a2.parentNode : a2);
        Rk(function() {
          fl(b2, k, c2, d);
        });
        return k;
      }
      function rl(a2, b2, c2, d, e) {
        var f = c2._reactRootContainer;
        if (f) {
          var g = f;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a3 = gl(g);
              h.call(a3);
            };
          }
          fl(b2, g, a2, e);
        } else
          g = ql(c2, b2, a2, e, d);
        return gl(g);
      }
      Ec = function(a2) {
        switch (a2.tag) {
          case 3:
            var b2 = a2.stateNode;
            if (b2.current.memoizedState.isDehydrated) {
              var c2 = tc(b2.pendingLanes);
              0 !== c2 && (Cc(b2, c2 | 1), Dk(b2, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
            }
            break;
          case 13:
            Rk(function() {
              var b3 = ih(a2, 1);
              if (null !== b3) {
                var c3 = R();
                gi(b3, a2, 1, c3);
              }
            }), il(a2, 1);
        }
      };
      Fc = function(a2) {
        if (13 === a2.tag) {
          var b2 = ih(a2, 134217728);
          if (null !== b2) {
            var c2 = R();
            gi(b2, a2, 134217728, c2);
          }
          il(a2, 134217728);
        }
      };
      Gc = function(a2) {
        if (13 === a2.tag) {
          var b2 = yi(a2), c2 = ih(a2, b2);
          if (null !== c2) {
            var d = R();
            gi(c2, a2, b2, d);
          }
          il(a2, b2);
        }
      };
      Hc = function() {
        return C;
      };
      Ic = function(a2, b2) {
        var c2 = C;
        try {
          return C = a2, b2();
        } finally {
          C = c2;
        }
      };
      yb = function(a2, b2, c2) {
        switch (b2) {
          case "input":
            bb(a2, c2);
            b2 = c2.name;
            if ("radio" === c2.type && null != b2) {
              for (c2 = a2; c2.parentNode; )
                c2 = c2.parentNode;
              c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
              for (b2 = 0; b2 < c2.length; b2++) {
                var d = c2[b2];
                if (d !== a2 && d.form === a2.form) {
                  var e = Db(d);
                  if (!e)
                    throw Error(p2(90));
                  Wa(d);
                  bb(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a2, c2);
            break;
          case "select":
            b2 = c2.value, null != b2 && fb(a2, !!c2.multiple, b2, false);
        }
      };
      Gb = Qk;
      Hb = Rk;
      var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
      var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
      var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a2) {
        a2 = Zb(a2);
        return null === a2 ? null : a2.stateNode;
      }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vl.isDisabled && vl.supportsFiber)
          try {
            kc = vl.inject(ul), lc = vl;
          } catch (a2) {
          }
      }
      var vl;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
      exports.createPortal = function(a2, b2) {
        var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!nl(b2))
          throw Error(p2(200));
        return cl(a2, b2, null, c2);
      };
      exports.createRoot = function(a2, b2) {
        if (!nl(a2))
          throw Error(p2(299));
        var c2 = false, d = "", e = kl;
        null !== b2 && void 0 !== b2 && (true === b2.unstable_strictMode && (c2 = true), void 0 !== b2.identifierPrefix && (d = b2.identifierPrefix), void 0 !== b2.onRecoverableError && (e = b2.onRecoverableError));
        b2 = bl(a2, 1, false, null, null, c2, false, d, e);
        a2[uf] = b2.current;
        sf(8 === a2.nodeType ? a2.parentNode : a2);
        return new ll(b2);
      };
      exports.findDOMNode = function(a2) {
        if (null == a2)
          return null;
        if (1 === a2.nodeType)
          return a2;
        var b2 = a2._reactInternals;
        if (void 0 === b2) {
          if ("function" === typeof a2.render)
            throw Error(p2(188));
          a2 = Object.keys(a2).join(",");
          throw Error(p2(268, a2));
        }
        a2 = Zb(b2);
        a2 = null === a2 ? null : a2.stateNode;
        return a2;
      };
      exports.flushSync = function(a2) {
        return Rk(a2);
      };
      exports.hydrate = function(a2, b2, c2) {
        if (!ol(b2))
          throw Error(p2(200));
        return rl(null, a2, b2, true, c2);
      };
      exports.hydrateRoot = function(a2, b2, c2) {
        if (!nl(a2))
          throw Error(p2(405));
        var d = null != c2 && c2.hydratedSources || null, e = false, f = "", g = kl;
        null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e = true), void 0 !== c2.identifierPrefix && (f = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g = c2.onRecoverableError));
        b2 = el(b2, null, a2, 1, null != c2 ? c2 : null, e, false, f, g);
        a2[uf] = b2.current;
        sf(a2);
        if (d)
          for (a2 = 0; a2 < d.length; a2++)
            c2 = d[a2], e = c2._getVersion, e = e(c2._source), null == b2.mutableSourceEagerHydrationData ? b2.mutableSourceEagerHydrationData = [c2, e] : b2.mutableSourceEagerHydrationData.push(
              c2,
              e
            );
        return new ml(b2);
      };
      exports.render = function(a2, b2, c2) {
        if (!ol(b2))
          throw Error(p2(200));
        return rl(null, a2, b2, false, c2);
      };
      exports.unmountComponentAtNode = function(a2) {
        if (!ol(a2))
          throw Error(p2(40));
        return a2._reactRootContainer ? (Rk(function() {
          rl(null, null, a2, false, function() {
            a2._reactRootContainer = null;
            a2[uf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Qk;
      exports.unstable_renderSubtreeIntoContainer = function(a2, b2, c2, d) {
        if (!ol(c2))
          throw Error(p2(200));
        if (null == a2 || void 0 === a2._reactInternals)
          throw Error(p2(38));
        return rl(a2, b2, c2, false, d);
      };
      exports.version = "18.3.1-next-f1338f8080-20240426";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m = require_react_dom();
      if (true) {
        exports.createRoot = m.createRoot;
        exports.hydrateRoot = m.hydrateRoot;
      } else {
        i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c2, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c2, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c2, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c2, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
      "use strict";
      var f = require_react();
      var k = Symbol.for("react.element");
      var l = Symbol.for("react.fragment");
      var m = Object.prototype.hasOwnProperty;
      var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
      var p2 = { key: true, ref: true, __self: true, __source: true };
      function q(c2, a2, g) {
        var b2, d = {}, e = null, h = null;
        void 0 !== g && (e = "" + g);
        void 0 !== a2.key && (e = "" + a2.key);
        void 0 !== a2.ref && (h = a2.ref);
        for (b2 in a2)
          m.call(a2, b2) && !p2.hasOwnProperty(b2) && (d[b2] = a2[b2]);
        if (c2 && c2.defaultProps)
          for (b2 in a2 = c2.defaultProps, a2)
            void 0 === d[b2] && (d[b2] = a2[b2]);
        return { $$typeof: k, type: c2, key: e, ref: h, props: d, _owner: n.current };
      }
      exports.Fragment = l;
      exports.jsx = q;
      exports.jsxs = q;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // desktop-v2/qawaleb/preview/player-entry.tsx
  var import_react5 = __toESM(require_react());
  var import_client = __toESM(require_client());

  // node_modules/@remotion/player/dist/esm/index.mjs
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);

  // node_modules/remotion/dist/esm/index.mjs
  var import_react = __toESM(require_react(), 1);
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var import_react_dom = __toESM(require_react_dom(), 1);
  var NativeLayersContext = (0, import_react.createContext)({
    setClipRegion: () => {
      throw new Error("NativeLayers not set");
    },
    clipRegion: null
  });
  var NativeLayersProvider = ({ children }) => {
    const [clipRegion, setClipRegion] = (0, import_react.useState)(null);
    const context = (0, import_react.useMemo)(() => {
      return {
        setClipRegion,
        clipRegion
      };
    }, [clipRegion, setClipRegion]);
    if (typeof window !== "undefined") {
      (0, import_react.useLayoutEffect)(() => {
        window.remotion_getClipRegion = () => {
          return clipRegion;
        };
      }, [clipRegion, setClipRegion]);
    }
    return (0, import_jsx_runtime.jsx)(NativeLayersContext.Provider, { value: context, children });
  };
  var getRemotionEnvironment = () => {
    const isPlayer = typeof window !== "undefined" && window.remotion_isPlayer;
    const isRendering = typeof window !== "undefined" && typeof window.remotion_puppeteerTimeout !== "undefined";
    const isStudio = typeof window !== "undefined" && window.remotion_isStudio;
    return {
      isStudio,
      isRendering,
      isPlayer
    };
  };
  var originalCreateElement = import_react.default.createElement;
  var componentsToAddStacksTo = [];
  var enableSequenceStackTraces = () => {
    if (!getRemotionEnvironment().isStudio) {
      return;
    }
    const proxy = new Proxy(originalCreateElement, {
      apply(target, thisArg, argArray) {
        if (componentsToAddStacksTo.includes(argArray[0])) {
          const [first, props, ...rest] = argArray;
          const newProps = {
            ...props !== null && props !== void 0 ? props : {},
            stack: new Error().stack
          };
          return Reflect.apply(target, thisArg, [first, newProps, ...rest]);
        }
        return Reflect.apply(target, thisArg, argArray);
      }
    });
    import_react.default.createElement = proxy;
  };
  var addSequenceStackTraces = (component) => {
    componentsToAddStacksTo.push(component);
    enableSequenceStackTraces();
  };
  var IsPlayerContext = (0, import_react.createContext)(false);
  var IsPlayerContextProvider = ({ children }) => {
    return (0, import_jsx_runtime.jsx)(IsPlayerContext.Provider, { value: true, children });
  };
  var useIsPlayer = () => {
    return (0, import_react.useContext)(IsPlayerContext);
  };
  function truthy(value) {
    return Boolean(value);
  }
  var VERSION = "4.0.140";
  var checkMultipleRemotionVersions = () => {
    if (typeof globalThis === "undefined") {
      return;
    }
    const alreadyImported = globalThis.remotion_imported || typeof window !== "undefined" && window.remotion_imported;
    if (alreadyImported) {
      if (alreadyImported === VERSION) {
        return;
      }
      throw new TypeError(`\u{1F6A8} Multiple versions of Remotion detected: ${[
        VERSION,
        typeof alreadyImported === "string" ? alreadyImported : "an older version"
      ].filter(truthy).join(" and ")}. This will cause things to break in an unexpected way.
Check that all your Remotion packages are on the same version. If your dependencies depend on Remotion, make them peer dependencies. You can also run \`npx remotion versions\` from your terminal to see which versions are mismatching.`);
    }
    globalThis.remotion_imported = VERSION;
    if (typeof window !== "undefined") {
      window.remotion_imported = VERSION;
    }
  };
  var AbsoluteFillRefForwarding = (props, ref) => {
    const { style, ...other } = props;
    const actualStyle = (0, import_react.useMemo)(() => {
      return {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...style
      };
    }, [style]);
    return (0, import_jsx_runtime.jsx)("div", { ref, style: actualStyle, ...other });
  };
  var AbsoluteFill = (0, import_react.forwardRef)(AbsoluteFillRefForwarding);
  var SequenceContext = (0, import_react.createContext)(null);
  var SequenceManager = import_react.default.createContext({
    registerSequence: () => {
      throw new Error("SequenceManagerContext not initialized");
    },
    unregisterSequence: () => {
      throw new Error("SequenceManagerContext not initialized");
    },
    sequences: []
  });
  var SequenceVisibilityToggleContext = import_react.default.createContext({
    hidden: {},
    setHidden: () => {
      throw new Error("SequenceVisibilityToggle not initialized");
    }
  });
  var SequenceManagerProvider = ({ children }) => {
    const [sequences, setSequences] = (0, import_react.useState)([]);
    const [hidden, setHidden] = (0, import_react.useState)({});
    const registerSequence = (0, import_react.useCallback)((seq) => {
      setSequences((seqs) => {
        return [...seqs, seq];
      });
    }, []);
    const unregisterSequence = (0, import_react.useCallback)((seq) => {
      setSequences((seqs) => seqs.filter((s) => s.id !== seq));
    }, []);
    const sequenceContext = (0, import_react.useMemo)(() => {
      return {
        registerSequence,
        sequences,
        unregisterSequence
      };
    }, [registerSequence, sequences, unregisterSequence]);
    const hiddenContext = (0, import_react.useMemo)(() => {
      return {
        hidden,
        setHidden
      };
    }, [hidden]);
    return (0, import_jsx_runtime.jsx)(SequenceManager.Provider, { value: sequenceContext, children: (0, import_jsx_runtime.jsx)(SequenceVisibilityToggleContext.Provider, { value: hiddenContext, children }) });
  };
  var NonceContext = (0, import_react.createContext)({
    getNonce: () => 0,
    fastRefreshes: 0
  });
  var useNonce = () => {
    const context = (0, import_react.useContext)(NonceContext);
    const [nonce, setNonce] = (0, import_react.useState)(() => context.getNonce());
    const lastContext = (0, import_react.useRef)(context);
    (0, import_react.useEffect)(() => {
      if (lastContext.current === context) {
        return;
      }
      lastContext.current = context;
      setNonce(context.getNonce);
    }, [context]);
    return nonce;
  };
  var CompositionManager = (0, import_react.createContext)({
    compositions: [],
    registerComposition: () => void 0,
    unregisterComposition: () => void 0,
    registerFolder: () => void 0,
    unregisterFolder: () => void 0,
    setCurrentCompositionMetadata: () => void 0,
    folders: [],
    currentCompositionMetadata: null,
    canvasContent: null,
    setCanvasContent: () => void 0
  });
  var EditorPropsContext = (0, import_react.createContext)({
    props: {},
    updateProps: () => {
      throw new Error("Not implemented");
    }
  });
  var EditorPropsProvider = ({ children }) => {
    const [props, setProps] = import_react.default.useState({});
    const updateProps = (0, import_react.useCallback)(({ defaultProps, id, newProps }) => {
      setProps((prev) => {
        var _a;
        return {
          ...prev,
          [id]: typeof newProps === "function" ? newProps((_a = prev[id]) !== null && _a !== void 0 ? _a : defaultProps) : newProps
        };
      });
    }, []);
    const ctx = (0, import_react.useMemo)(() => {
      return { props, updateProps };
    }, [props, updateProps]);
    return (0, import_jsx_runtime.jsx)(EditorPropsContext.Provider, { value: ctx, children });
  };
  var problematicCharacters = {
    "%3A": ":",
    "%2F": "/",
    "%3F": "?",
    "%23": "#",
    "%5B": "[",
    "%5D": "]",
    "%40": "@",
    "%21": "!",
    "%24": "$",
    "%26": "&",
    "%27": "'",
    "%28": "(",
    "%29": ")",
    "%2A": "*",
    "%2B": "+",
    "%2C": ",",
    "%3B": ";"
  };
  var didWarn$1 = {};
  var warnOnce$1 = (message) => {
    if (didWarn$1[message]) {
      return;
    }
    console.warn(message);
    didWarn$1[message] = true;
  };
  var includesHexOfUnsafeChar = (path) => {
    for (const key of Object.keys(problematicCharacters)) {
      if (path.includes(key)) {
        return { containsHex: true, hexCode: key };
      }
    }
    return { containsHex: false };
  };
  var trimLeadingSlash = (path) => {
    if (path.startsWith("/")) {
      return trimLeadingSlash(path.substring(1));
    }
    return path;
  };
  var inner = (path) => {
    if (typeof window !== "undefined" && window.remotion_staticBase) {
      if (path.startsWith(window.remotion_staticBase)) {
        throw new Error(`The value "${path}" is already prefixed with the static base ${window.remotion_staticBase}. You don't need to call staticFile() on it.`);
      }
      return `${window.remotion_staticBase}/${trimLeadingSlash(path)}`;
    }
    return `/${trimLeadingSlash(path)}`;
  };
  var encodeBySplitting = (path) => {
    const splitBySlash = path.split("/");
    const encodedArray = splitBySlash.map((element) => {
      return encodeURIComponent(element);
    });
    const merged = encodedArray.join("/");
    return merged;
  };
  var staticFile = (path) => {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      throw new TypeError(`staticFile() does not support remote URLs - got "${path}". Instead, pass the URL without wrapping it in staticFile(). See: https://remotion.dev/docs/staticfile-remote-urls`);
    }
    if (path.startsWith("..") || path.startsWith("./")) {
      throw new TypeError(`staticFile() does not support relative paths - got "${path}". Instead, pass the name of a file that is inside the public/ folder. See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    if (path.startsWith("/Users") || path.startsWith("/home") || path.startsWith("/tmp") || path.startsWith("/etc") || path.startsWith("/opt") || path.startsWith("/var") || path.startsWith("C:") || path.startsWith("D:") || path.startsWith("E:")) {
      throw new TypeError(`staticFile() does not support absolute paths - got "${path}". Instead, pass the name of a file that is inside the public/ folder. See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    if (path.startsWith("public/")) {
      throw new TypeError(`Do not include the public/ prefix when using staticFile() - got "${path}". See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    const includesHex = includesHexOfUnsafeChar(path);
    if (includesHex.containsHex) {
      warnOnce$1(`WARNING: You seem to pass an already encoded path (path contains ${includesHex.hexCode}). Since Remotion 4.0, the encoding is done by staticFile() itself. You may want to remove a encodeURIComponent() wrapping.`);
    }
    const preprocessed = encodeBySplitting(path);
    const preparsed = inner(preprocessed);
    if (!preparsed.startsWith("/")) {
      return `/${preparsed}`;
    }
    return preparsed;
  };
  var DATE_TOKEN = "remotion-date:";
  var FILE_TOKEN = "remotion-file:";
  var deserializeJSONWithCustomFields = (data) => {
    return JSON.parse(data, (_, value) => {
      if (typeof value === "string" && value.startsWith(DATE_TOKEN)) {
        return new Date(value.replace(DATE_TOKEN, ""));
      }
      if (typeof value === "string" && value.startsWith(FILE_TOKEN)) {
        return staticFile(value.replace(FILE_TOKEN, ""));
      }
      return value;
    });
  };
  var didWarnSSRImport = false;
  var warnOnceSSRImport = () => {
    if (didWarnSSRImport) {
      return;
    }
    didWarnSSRImport = true;
    console.warn("Called `getInputProps()` on the server. This function is not available server-side and has returned an empty object.");
    console.warn("To hide this warning, don't call this function on the server:");
    console.warn("  typeof window === 'undefined' ? {} : getInputProps()");
  };
  var getInputProps = () => {
    if (typeof window === "undefined") {
      warnOnceSSRImport();
      return {};
    }
    if (getRemotionEnvironment().isPlayer) {
      throw new Error("You cannot call `getInputProps()` from a <Player>. Instead, the props are available as React props from component that you passed as `component` prop.");
    }
    const param = window.remotion_inputProps;
    if (!param) {
      return {};
    }
    const parsed = deserializeJSONWithCustomFields(param);
    return parsed;
  };
  var validCodecs = [
    "h264",
    "h265",
    "vp8",
    "vp9",
    "mp3",
    "aac",
    "wav",
    "prores",
    "h264-mkv",
    "h264-ts",
    "gif"
  ];
  function validateDefaultCodec(defaultCodec, location) {
    if (typeof defaultCodec === "undefined") {
      return;
    }
    if (typeof defaultCodec !== "string") {
      throw new TypeError(`The "defaultCodec" prop ${location} must be a string, but you passed a value of type ${typeof defaultCodec}.`);
    }
    if (!validCodecs.includes(defaultCodec)) {
      throw new Error(`The "defaultCodec" prop ${location} must be one of ${validCodecs.join(", ")}, but you passed ${defaultCodec}.`);
    }
  }
  function validateDimension(amount, nameOfProp, location) {
    if (typeof amount !== "number") {
      throw new Error(`The "${nameOfProp}" prop ${location} must be a number, but you passed a value of type ${typeof amount}`);
    }
    if (isNaN(amount)) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must not be NaN, but is NaN.`);
    }
    if (!Number.isFinite(amount)) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be finite, but is ${amount}.`);
    }
    if (amount % 1 !== 0) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be an integer, but is ${amount}.`);
    }
    if (amount <= 0) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be positive, but got ${amount}.`);
    }
  }
  function validateDurationInFrames(durationInFrames, options) {
    const { allowFloats, component } = options;
    if (typeof durationInFrames === "undefined") {
      throw new Error(`The "durationInFrames" prop ${component} is missing.`);
    }
    if (typeof durationInFrames !== "number") {
      throw new Error(`The "durationInFrames" prop ${component} must be a number, but you passed a value of type ${typeof durationInFrames}`);
    }
    if (durationInFrames <= 0) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be positive, but got ${durationInFrames}.`);
    }
    if (!allowFloats && durationInFrames % 1 !== 0) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be an integer, but got ${durationInFrames}.`);
    }
    if (!Number.isFinite(durationInFrames)) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be finite, but got ${durationInFrames}.`);
    }
  }
  function validateFps(fps, location, isGif) {
    if (typeof fps !== "number") {
      throw new Error(`"fps" must be a number, but you passed a value of type ${typeof fps} ${location}`);
    }
    if (!Number.isFinite(fps)) {
      throw new Error(`"fps" must be a finite, but you passed ${fps} ${location}`);
    }
    if (isNaN(fps)) {
      throw new Error(`"fps" must not be NaN, but got ${fps} ${location}`);
    }
    if (fps <= 0) {
      throw new TypeError(`"fps" must be positive, but got ${fps} ${location}`);
    }
    if (isGif && fps > 50) {
      throw new TypeError(`The FPS for a GIF cannot be higher than 50. Use the --every-nth-frame option to lower the FPS: https://remotion.dev/docs/render-as-gif`);
    }
  }
  var validateCalculated = ({ composition, calculated }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const calculateMetadataErrorLocation = `calculated by calculateMetadata() for the composition "${composition.id}"`;
    const defaultErrorLocation = `of the "<Composition />" component with the id "${composition.id}"`;
    const width = (_b = (_a = calculated === null || calculated === void 0 ? void 0 : calculated.width) !== null && _a !== void 0 ? _a : composition.width) !== null && _b !== void 0 ? _b : void 0;
    validateDimension(width, "width", (calculated === null || calculated === void 0 ? void 0 : calculated.width) ? calculateMetadataErrorLocation : defaultErrorLocation);
    const height = (_d = (_c = calculated === null || calculated === void 0 ? void 0 : calculated.height) !== null && _c !== void 0 ? _c : composition.height) !== null && _d !== void 0 ? _d : void 0;
    validateDimension(height, "height", (calculated === null || calculated === void 0 ? void 0 : calculated.height) ? calculateMetadataErrorLocation : defaultErrorLocation);
    const fps = (_f = (_e = calculated === null || calculated === void 0 ? void 0 : calculated.fps) !== null && _e !== void 0 ? _e : composition.fps) !== null && _f !== void 0 ? _f : null;
    validateFps(fps, (calculated === null || calculated === void 0 ? void 0 : calculated.fps) ? calculateMetadataErrorLocation : defaultErrorLocation, false);
    const durationInFrames = (_h = (_g = calculated === null || calculated === void 0 ? void 0 : calculated.durationInFrames) !== null && _g !== void 0 ? _g : composition.durationInFrames) !== null && _h !== void 0 ? _h : null;
    validateDurationInFrames(durationInFrames, {
      allowFloats: false,
      component: `of the "<Composition />" component with the id "${composition.id}"`
    });
    const defaultCodec = calculated === null || calculated === void 0 ? void 0 : calculated.defaultCodec;
    validateDefaultCodec(defaultCodec, calculateMetadataErrorLocation);
    return { width, height, fps, durationInFrames, defaultCodec };
  };
  var resolveVideoConfig = ({ composition, editorProps: editorPropsOrUndefined, signal, inputProps }) => {
    var _a, _b, _c, _d, _e, _f;
    const originalProps = {
      ...(_a = composition.defaultProps) !== null && _a !== void 0 ? _a : {},
      ...editorPropsOrUndefined !== null && editorPropsOrUndefined !== void 0 ? editorPropsOrUndefined : {},
      ...inputProps !== null && inputProps !== void 0 ? inputProps : {}
    };
    const calculatedProm = composition.calculateMetadata ? composition.calculateMetadata({
      defaultProps: (_b = composition.defaultProps) !== null && _b !== void 0 ? _b : {},
      props: originalProps,
      abortSignal: signal,
      compositionId: composition.id
    }) : null;
    if (calculatedProm !== null && typeof calculatedProm === "object" && "then" in calculatedProm) {
      return calculatedProm.then((c2) => {
        var _a2, _b2;
        const { height, width, durationInFrames, fps, defaultCodec } = validateCalculated({
          calculated: c2,
          composition
        });
        return {
          width,
          height,
          fps,
          durationInFrames,
          id: composition.id,
          defaultProps: (_a2 = composition.defaultProps) !== null && _a2 !== void 0 ? _a2 : {},
          props: (_b2 = c2.props) !== null && _b2 !== void 0 ? _b2 : originalProps,
          defaultCodec: defaultCodec !== null && defaultCodec !== void 0 ? defaultCodec : null
        };
      });
    }
    const data = validateCalculated({
      calculated: calculatedProm,
      composition
    });
    if (calculatedProm === null) {
      return {
        ...data,
        id: composition.id,
        defaultProps: (_c = composition.defaultProps) !== null && _c !== void 0 ? _c : {},
        props: originalProps,
        defaultCodec: null
      };
    }
    return {
      ...data,
      id: composition.id,
      defaultProps: (_d = composition.defaultProps) !== null && _d !== void 0 ? _d : {},
      props: (_e = calculatedProm.props) !== null && _e !== void 0 ? _e : originalProps,
      defaultCodec: (_f = calculatedProm.defaultCodec) !== null && _f !== void 0 ? _f : null
    };
  };
  var ResolveCompositionContext = (0, import_react.createContext)(null);
  var resolveCompositionsRef = (0, import_react.createRef)();
  var needsResolution = (composition) => {
    return Boolean(composition.calculateMetadata);
  };
  var ResolveCompositionConfig = ({ children }) => {
    const [currentRenderModalComposition, setCurrentRenderModalComposition] = (0, import_react.useState)(null);
    const { compositions, canvasContent, currentCompositionMetadata } = (0, import_react.useContext)(CompositionManager);
    const selectedComposition = compositions.find((c2) => canvasContent && canvasContent.type === "composition" && canvasContent.compositionId === c2.id);
    const renderModalComposition = compositions.find((c2) => c2.id === currentRenderModalComposition);
    const { props: allEditorProps } = (0, import_react.useContext)(EditorPropsContext);
    const [resolvedConfigs, setResolvedConfigs] = (0, import_react.useState)({});
    const selectedEditorProps = (0, import_react.useMemo)(() => {
      var _a;
      return selectedComposition ? (_a = allEditorProps[selectedComposition.id]) !== null && _a !== void 0 ? _a : {} : {};
    }, [allEditorProps, selectedComposition]);
    const renderModalProps = (0, import_react.useMemo)(() => {
      var _a;
      return renderModalComposition ? (_a = allEditorProps[renderModalComposition.id]) !== null && _a !== void 0 ? _a : {} : {};
    }, [allEditorProps, renderModalComposition]);
    const doResolution = (0, import_react.useCallback)((composition, editorProps) => {
      var _a;
      const controller = new AbortController();
      if (currentCompositionMetadata) {
        return controller;
      }
      const inputProps = typeof window === "undefined" || getRemotionEnvironment().isPlayer ? {} : (_a = getInputProps()) !== null && _a !== void 0 ? _a : {};
      const { signal } = controller;
      const promOrNot = resolveVideoConfig({
        composition,
        editorProps,
        inputProps,
        signal
      });
      if (typeof promOrNot === "object" && "then" in promOrNot) {
        setResolvedConfigs((r) => ({
          ...r,
          [composition.id]: {
            type: "loading"
          }
        }));
        promOrNot.then((c2) => {
          if (controller.signal.aborted) {
            return;
          }
          setResolvedConfigs((r) => ({
            ...r,
            [composition.id]: {
              type: "success",
              result: c2
            }
          }));
        }).catch((err) => {
          if (controller.signal.aborted) {
            return;
          }
          setResolvedConfigs((r) => ({
            ...r,
            [composition.id]: {
              type: "error",
              error: err
            }
          }));
        });
      } else {
        setResolvedConfigs((r) => ({
          ...r,
          [composition.id]: {
            type: "success",
            result: promOrNot
          }
        }));
      }
      return controller;
    }, [currentCompositionMetadata]);
    const currentComposition = (canvasContent === null || canvasContent === void 0 ? void 0 : canvasContent.type) === "composition" ? canvasContent.compositionId : null;
    (0, import_react.useImperativeHandle)(resolveCompositionsRef, () => {
      return {
        setCurrentRenderModalComposition: (id) => {
          setCurrentRenderModalComposition(id);
        },
        reloadCurrentlySelectedComposition: () => {
          var _a;
          if (!currentComposition) {
            return;
          }
          const composition = compositions.find((c2) => c2.id === currentComposition);
          if (!composition) {
            throw new Error(`Could not find composition with id ${currentComposition}`);
          }
          const editorProps = (_a = allEditorProps[currentComposition]) !== null && _a !== void 0 ? _a : {};
          doResolution(composition, editorProps);
        }
      };
    }, [allEditorProps, compositions, currentComposition, doResolution]);
    const isTheSame = (selectedComposition === null || selectedComposition === void 0 ? void 0 : selectedComposition.id) === (renderModalComposition === null || renderModalComposition === void 0 ? void 0 : renderModalComposition.id);
    (0, import_react.useEffect)(() => {
      if (selectedComposition && needsResolution(selectedComposition)) {
        const controller = doResolution(selectedComposition, selectedEditorProps);
        return () => {
          controller.abort();
        };
      }
    }, [doResolution, selectedComposition, selectedEditorProps]);
    (0, import_react.useEffect)(() => {
      if (renderModalComposition && !isTheSame) {
        const controller = doResolution(renderModalComposition, renderModalProps);
        return () => {
          controller.abort();
        };
      }
    }, [doResolution, isTheSame, renderModalComposition, renderModalProps]);
    const resolvedConfigsIncludingStaticOnes = (0, import_react.useMemo)(() => {
      const staticComps = compositions.filter((c2) => {
        return c2.calculateMetadata === null;
      });
      return {
        ...resolvedConfigs,
        ...staticComps.reduce((acc, curr) => {
          var _a;
          return {
            ...acc,
            [curr.id]: {
              type: "success",
              result: { ...curr, defaultProps: (_a = curr.defaultProps) !== null && _a !== void 0 ? _a : {} }
            }
          };
        }, {})
      };
    }, [compositions, resolvedConfigs]);
    return (0, import_jsx_runtime.jsx)(ResolveCompositionContext.Provider, { value: resolvedConfigsIncludingStaticOnes, children });
  };
  var useResolvedVideoConfig = (preferredCompositionId) => {
    const context = (0, import_react.useContext)(ResolveCompositionContext);
    const { props: allEditorProps } = (0, import_react.useContext)(EditorPropsContext);
    const { compositions, canvasContent, currentCompositionMetadata } = (0, import_react.useContext)(CompositionManager);
    const currentComposition = (canvasContent === null || canvasContent === void 0 ? void 0 : canvasContent.type) === "composition" ? canvasContent.compositionId : null;
    const compositionId = preferredCompositionId !== null && preferredCompositionId !== void 0 ? preferredCompositionId : currentComposition;
    const composition = compositions.find((c2) => c2.id === compositionId);
    const selectedEditorProps = (0, import_react.useMemo)(() => {
      var _a;
      return composition ? (_a = allEditorProps[composition.id]) !== null && _a !== void 0 ? _a : {} : {};
    }, [allEditorProps, composition]);
    return (0, import_react.useMemo)(() => {
      var _a, _b, _c, _d;
      if (!composition) {
        return null;
      }
      if (currentCompositionMetadata) {
        return {
          type: "success",
          result: {
            ...currentCompositionMetadata,
            id: composition.id,
            props: currentCompositionMetadata.props,
            defaultProps: (_a = composition.defaultProps) !== null && _a !== void 0 ? _a : {},
            defaultCodec: currentCompositionMetadata.defaultCodec
          }
        };
      }
      if (!needsResolution(composition)) {
        validateDurationInFrames(composition.durationInFrames, {
          allowFloats: false,
          component: `in <Composition id="${composition.id}">`
        });
        validateFps(composition.fps, `in <Composition id="${composition.id}">`, false);
        validateDimension(composition.width, "width", `in <Composition id="${composition.id}">`);
        validateDimension(composition.height, "height", `in <Composition id="${composition.id}">`);
        return {
          type: "success",
          result: {
            width: composition.width,
            height: composition.height,
            fps: composition.fps,
            id: composition.id,
            durationInFrames: composition.durationInFrames,
            defaultProps: (_b = composition.defaultProps) !== null && _b !== void 0 ? _b : {},
            props: {
              ...(_c = composition.defaultProps) !== null && _c !== void 0 ? _c : {},
              ...selectedEditorProps !== null && selectedEditorProps !== void 0 ? selectedEditorProps : {},
              ...typeof window === "undefined" || getRemotionEnvironment().isPlayer ? {} : (_d = getInputProps()) !== null && _d !== void 0 ? _d : {}
            },
            defaultCodec: null
          }
        };
      }
      if (!context[composition.id]) {
        return null;
      }
      return context[composition.id];
    }, [composition, context, currentCompositionMetadata, selectedEditorProps]);
  };
  var useVideo = () => {
    var _a;
    const { canvasContent, compositions, currentCompositionMetadata } = (0, import_react.useContext)(CompositionManager);
    const selected = compositions.find((c2) => {
      return (canvasContent === null || canvasContent === void 0 ? void 0 : canvasContent.type) === "composition" && c2.id === canvasContent.compositionId;
    });
    const resolved = useResolvedVideoConfig((_a = selected === null || selected === void 0 ? void 0 : selected.id) !== null && _a !== void 0 ? _a : null);
    return (0, import_react.useMemo)(() => {
      var _a2;
      if (!resolved) {
        return null;
      }
      if (resolved.type === "error") {
        return null;
      }
      if (resolved.type === "loading") {
        return null;
      }
      if (!selected) {
        return null;
      }
      return {
        ...resolved.result,
        defaultProps: (_a2 = selected.defaultProps) !== null && _a2 !== void 0 ? _a2 : {},
        id: selected.id,
        // We override the selected metadata with the metadata that was passed to renderMedia(),
        // and don't allow it to be changed during render anymore
        ...currentCompositionMetadata !== null && currentCompositionMetadata !== void 0 ? currentCompositionMetadata : {},
        component: selected.component
      };
    }, [currentCompositionMetadata, resolved, selected]);
  };
  var TimelineContext = (0, import_react.createContext)({
    frame: {},
    playing: false,
    playbackRate: 1,
    rootId: "",
    imperativePlaying: {
      current: false
    },
    setPlaybackRate: () => {
      throw new Error("default");
    },
    audioAndVideoTags: { current: [] }
  });
  var SetTimelineContext = (0, import_react.createContext)({
    setFrame: () => {
      throw new Error("default");
    },
    setPlaying: () => {
      throw new Error("default");
    }
  });
  var makeKey = () => {
    return `remotion.time-all`;
  };
  var persistCurrentFrame = (time) => {
    localStorage.setItem(makeKey(), JSON.stringify(time));
  };
  var getInitialFrameState = () => {
    var _a;
    const item = (_a = localStorage.getItem(makeKey())) !== null && _a !== void 0 ? _a : "{}";
    const obj = JSON.parse(item);
    return obj;
  };
  var getFrameForComposition = (composition) => {
    var _a, _b, _c;
    const item = (_a = localStorage.getItem(makeKey())) !== null && _a !== void 0 ? _a : "{}";
    const obj = JSON.parse(item);
    return obj[composition] ? Number(obj[composition]) : (_c = typeof window === "undefined" ? 0 : (_b = window.remotion_initialFrame) !== null && _b !== void 0 ? _b : 0) !== null && _c !== void 0 ? _c : 0;
  };
  var useTimelinePosition = () => {
    var _a, _b;
    const videoConfig = useVideo();
    const state = (0, import_react.useContext)(TimelineContext);
    if (!videoConfig) {
      return typeof window === "undefined" ? 0 : (_a = window.remotion_initialFrame) !== null && _a !== void 0 ? _a : 0;
    }
    const unclamped = (_b = state.frame[videoConfig.id]) !== null && _b !== void 0 ? _b : typeof window !== "undefined" && window.remotion_isPlayer ? 0 : getFrameForComposition(videoConfig.id);
    return Math.min(videoConfig.durationInFrames - 1, unclamped);
  };
  var useTimelineSetFrame = () => {
    const { setFrame } = (0, import_react.useContext)(SetTimelineContext);
    return setFrame;
  };
  var usePlayingState = () => {
    const { playing, imperativePlaying } = (0, import_react.useContext)(TimelineContext);
    const { setPlaying } = (0, import_react.useContext)(SetTimelineContext);
    return (0, import_react.useMemo)(() => [playing, setPlaying, imperativePlaying], [imperativePlaying, playing, setPlaying]);
  };
  var TimelinePosition = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    TimelineContext,
    SetTimelineContext,
    persistCurrentFrame,
    getInitialFrameState,
    getFrameForComposition,
    useTimelinePosition,
    useTimelineSetFrame,
    usePlayingState
  });
  var CanUseRemotionHooks = (0, import_react.createContext)(false);
  var CanUseRemotionHooksProvider = ({ children }) => {
    return (0, import_jsx_runtime.jsx)(CanUseRemotionHooks.Provider, { value: true, children });
  };
  var useUnsafeVideoConfig = () => {
    var _a, _b, _c;
    const context = (0, import_react.useContext)(SequenceContext);
    const ctxWidth = (_a = context === null || context === void 0 ? void 0 : context.width) !== null && _a !== void 0 ? _a : null;
    const ctxHeight = (_b = context === null || context === void 0 ? void 0 : context.height) !== null && _b !== void 0 ? _b : null;
    const ctxDuration = (_c = context === null || context === void 0 ? void 0 : context.durationInFrames) !== null && _c !== void 0 ? _c : null;
    const video = useVideo();
    return (0, import_react.useMemo)(() => {
      if (!video) {
        return null;
      }
      const { id, durationInFrames, fps, height, width, defaultProps, props, defaultCodec } = video;
      return {
        id,
        width: ctxWidth !== null && ctxWidth !== void 0 ? ctxWidth : width,
        height: ctxHeight !== null && ctxHeight !== void 0 ? ctxHeight : height,
        fps,
        durationInFrames: ctxDuration !== null && ctxDuration !== void 0 ? ctxDuration : durationInFrames,
        defaultProps,
        props,
        defaultCodec
      };
    }, [ctxDuration, ctxHeight, ctxWidth, video]);
  };
  var useVideoConfig = () => {
    const videoConfig = useUnsafeVideoConfig();
    const context = (0, import_react.useContext)(CanUseRemotionHooks);
    const isPlayer = useIsPlayer();
    if (!videoConfig) {
      if (typeof window !== "undefined" && window.remotion_isPlayer || isPlayer) {
        throw new Error([
          "No video config found. Likely reasons:",
          "- You are probably calling useVideoConfig() from outside the component passed to <Player />. See https://www.remotion.dev/docs/player/examples for how to set up the Player correctly.",
          "- You have multiple versions of Remotion installed which causes the React context to get lost."
        ].join("-"));
      }
      throw new Error("No video config found. You are probably calling useVideoConfig() from a component which has not been registered as a <Composition />. See https://www.remotion.dev/docs/the-fundamentals#defining-compositions for more information.");
    }
    if (!context) {
      throw new Error("Called useVideoConfig() outside a Remotion composition.");
    }
    return videoConfig;
  };
  var useCurrentFrame = () => {
    const canUseRemotionHooks = (0, import_react.useContext)(CanUseRemotionHooks);
    if (!canUseRemotionHooks) {
      if (typeof window !== "undefined" && window.remotion_isPlayer) {
        throw new Error(`useCurrentFrame can only be called inside a component that was passed to <Player>. See: https://www.remotion.dev/docs/player/examples`);
      }
      throw new Error(`useCurrentFrame() can only be called inside a component that was registered as a composition. See https://www.remotion.dev/docs/the-fundamentals#defining-compositions`);
    }
    const frame = useTimelinePosition();
    const context = (0, import_react.useContext)(SequenceContext);
    const contextOffset = context ? context.cumulatedFrom + context.relativeFrom : 0;
    return frame - contextOffset;
  };
  var Freeze = ({ frame: frameToFreeze, children, active = true }) => {
    var _a;
    const frame = useCurrentFrame();
    const videoConfig = useVideoConfig();
    if (typeof frameToFreeze === "undefined") {
      throw new Error(`The <Freeze /> component requires a 'frame' prop, but none was passed.`);
    }
    if (typeof frameToFreeze !== "number") {
      throw new Error(`The 'frame' prop of <Freeze /> must be a number, but is of type ${typeof frameToFreeze}`);
    }
    if (Number.isNaN(frameToFreeze)) {
      throw new Error(`The 'frame' prop of <Freeze /> must be a real number, but it is NaN.`);
    }
    if (!Number.isFinite(frameToFreeze)) {
      throw new Error(`The 'frame' prop of <Freeze /> must be a finite number, but it is ${frameToFreeze}.`);
    }
    const isActive = (0, import_react.useMemo)(() => {
      if (typeof active === "boolean") {
        return active;
      }
      if (typeof active === "function") {
        return active(frame);
      }
    }, [active, frame]);
    const timelineContext = (0, import_react.useContext)(TimelineContext);
    const sequenceContext = (0, import_react.useContext)(SequenceContext);
    const relativeFrom = (_a = sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom) !== null && _a !== void 0 ? _a : 0;
    const timelineValue = (0, import_react.useMemo)(() => {
      if (!isActive) {
        return timelineContext;
      }
      return {
        ...timelineContext,
        playing: false,
        imperativePlaying: {
          current: false
        },
        frame: {
          [videoConfig.id]: frameToFreeze + relativeFrom
        }
      };
    }, [isActive, timelineContext, videoConfig.id, frameToFreeze, relativeFrom]);
    return (0, import_jsx_runtime.jsx)(TimelineContext.Provider, { value: timelineValue, children });
  };
  var RegularSequenceRefForwardingFunction = ({ from = 0, durationInFrames = Infinity, children, name, height, width, showInTimeline = true, _remotionInternalLoopDisplay: loopDisplay, _remotionInternalStack: stack, _remotionInternalPremountDisplay: premountDisplay, ...other }, ref) => {
    var _a;
    const { layout = "absolute-fill" } = other;
    const [id] = (0, import_react.useState)(() => String(Math.random()));
    const parentSequence = (0, import_react.useContext)(SequenceContext);
    const { rootId } = (0, import_react.useContext)(TimelineContext);
    const cumulatedFrom = parentSequence ? parentSequence.cumulatedFrom + parentSequence.relativeFrom : 0;
    const nonce = useNonce();
    if (layout !== "absolute-fill" && layout !== "none") {
      throw new TypeError(`The layout prop of <Sequence /> expects either "absolute-fill" or "none", but you passed: ${layout}`);
    }
    if (layout === "none" && typeof other.style !== "undefined") {
      throw new TypeError('If layout="none", you may not pass a style.');
    }
    if (typeof durationInFrames !== "number") {
      throw new TypeError(`You passed to durationInFrames an argument of type ${typeof durationInFrames}, but it must be a number.`);
    }
    if (durationInFrames <= 0) {
      throw new TypeError(`durationInFrames must be positive, but got ${durationInFrames}`);
    }
    if (typeof from !== "number") {
      throw new TypeError(`You passed to the "from" props of your <Sequence> an argument of type ${typeof from}, but it must be a number.`);
    }
    if (!Number.isFinite(from)) {
      throw new TypeError(`The "from" prop of a sequence must be finite, but got ${from}.`);
    }
    const absoluteFrame = useTimelinePosition();
    const videoConfig = useVideoConfig();
    const parentSequenceDuration = parentSequence ? Math.min(parentSequence.durationInFrames - from, durationInFrames) : durationInFrames;
    const actualDurationInFrames = Math.max(0, Math.min(videoConfig.durationInFrames - from, parentSequenceDuration));
    const { registerSequence, unregisterSequence } = (0, import_react.useContext)(SequenceManager);
    const { hidden } = (0, import_react.useContext)(SequenceVisibilityToggleContext);
    const premounting = (0, import_react.useMemo)(() => {
      var _a2;
      return (_a2 = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.premounting) !== null && _a2 !== void 0 ? _a2 : Boolean(other._remotionInternalIsPremounting);
    }, [other._remotionInternalIsPremounting, parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.premounting]);
    const contextValue = (0, import_react.useMemo)(() => {
      var _a2, _b, _c;
      return {
        cumulatedFrom,
        relativeFrom: from,
        durationInFrames: actualDurationInFrames,
        parentFrom: (_a2 = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.relativeFrom) !== null && _a2 !== void 0 ? _a2 : 0,
        id,
        height: (_b = height !== null && height !== void 0 ? height : parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.height) !== null && _b !== void 0 ? _b : null,
        width: (_c = width !== null && width !== void 0 ? width : parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.width) !== null && _c !== void 0 ? _c : null,
        premounting
      };
    }, [
      cumulatedFrom,
      from,
      actualDurationInFrames,
      parentSequence,
      id,
      height,
      width,
      premounting
    ]);
    const timelineClipName = (0, import_react.useMemo)(() => {
      return name !== null && name !== void 0 ? name : "";
    }, [name]);
    (0, import_react.useEffect)(() => {
      var _a2;
      if (!getRemotionEnvironment().isStudio) {
        return;
      }
      registerSequence({
        from,
        duration: actualDurationInFrames,
        id,
        displayName: timelineClipName,
        parent: (_a2 = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.id) !== null && _a2 !== void 0 ? _a2 : null,
        type: "sequence",
        rootId,
        showInTimeline,
        nonce,
        loopDisplay,
        stack: stack !== null && stack !== void 0 ? stack : null,
        premountDisplay: premountDisplay !== null && premountDisplay !== void 0 ? premountDisplay : null
      });
      return () => {
        unregisterSequence(id);
      };
    }, [
      durationInFrames,
      id,
      name,
      registerSequence,
      timelineClipName,
      unregisterSequence,
      parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.id,
      actualDurationInFrames,
      rootId,
      from,
      showInTimeline,
      nonce,
      loopDisplay,
      stack,
      premountDisplay
    ]);
    const endThreshold = Math.ceil(cumulatedFrom + from + durationInFrames - 1);
    const content = absoluteFrame < cumulatedFrom + from ? null : absoluteFrame > endThreshold ? null : children;
    const styleIfThere = other.layout === "none" ? void 0 : other.style;
    const defaultStyle = (0, import_react.useMemo)(() => {
      return {
        flexDirection: void 0,
        ...width ? { width } : {},
        ...height ? { height } : {},
        ...styleIfThere !== null && styleIfThere !== void 0 ? styleIfThere : {}
      };
    }, [height, styleIfThere, width]);
    if (ref !== null && layout === "none") {
      throw new TypeError('It is not supported to pass both a `ref` and `layout="none"` to <Sequence />.');
    }
    const isSequenceHidden = (_a = hidden[id]) !== null && _a !== void 0 ? _a : false;
    if (isSequenceHidden) {
      return null;
    }
    return (0, import_jsx_runtime.jsx)(SequenceContext.Provider, { value: contextValue, children: content === null ? null : other.layout === "none" ? content : (0, import_jsx_runtime.jsx)(AbsoluteFill, { ref, style: defaultStyle, className: other.className, children: content }) });
  };
  var RegularSequence = (0, import_react.forwardRef)(RegularSequenceRefForwardingFunction);
  var PremountedSequenceRefForwardingFunction = (props, ref) => {
    const frame = useCurrentFrame();
    if (props.layout === "none") {
      throw new Error('`<Sequence>` with `premountFor` prop does not support layout="none"');
    }
    const { style: passedStyle, from = 0, premountFor = 0, name, ...otherProps } = props;
    const premountingActive = frame < from && frame >= from - premountFor;
    const style = (0, import_react.useMemo)(() => {
      var _a;
      return {
        ...passedStyle,
        opacity: premountingActive ? 0 : 1,
        pointerEvents: premountingActive ? "none" : (_a = passedStyle === null || passedStyle === void 0 ? void 0 : passedStyle.pointerEvents) !== null && _a !== void 0 ? _a : void 0
      };
    }, [premountingActive, passedStyle]);
    return (0, import_jsx_runtime.jsx)(Freeze, { frame: from, active: premountingActive, children: (0, import_jsx_runtime.jsx)(Sequence, { ref, from, style, _remotionInternalPremountDisplay: premountFor, _remotionInternalIsPremounting: premountingActive, ...otherProps }) });
  };
  var PremountedSequence = (0, import_react.forwardRef)(PremountedSequenceRefForwardingFunction);
  var SequenceRefForwardingFunction = (props, ref) => {
    if (props.layout !== "none" && props.premountFor && !getRemotionEnvironment().isRendering) {
      return (0, import_jsx_runtime.jsx)(PremountedSequence, { ...props, ref });
    }
    return (0, import_jsx_runtime.jsx)(RegularSequence, { ...props, ref });
  };
  var Sequence = (0, import_react.forwardRef)(SequenceRefForwardingFunction);
  var getAbsoluteSrc = (relativeSrc) => {
    if (typeof window === "undefined") {
      return relativeSrc;
    }
    return new URL(relativeSrc, window.origin).href;
  };
  var calculateLoopDuration = ({ endAt, mediaDuration, playbackRate, startFrom }) => {
    let duration = mediaDuration;
    if (typeof endAt !== "undefined") {
      duration = endAt;
    }
    if (typeof startFrom !== "undefined") {
      duration -= startFrom;
    }
    const actualDuration = duration / playbackRate;
    return Math.floor(actualDuration);
  };
  var isErrorLike = (err) => {
    if (err === null) {
      return false;
    }
    if (typeof err !== "object") {
      return false;
    }
    if (!("stack" in err)) {
      return false;
    }
    if (typeof err.stack !== "string") {
      return false;
    }
    if (!("message" in err)) {
      return false;
    }
    if (typeof err.message !== "string") {
      return false;
    }
    return true;
  };
  function cancelRender(err) {
    let error;
    if (isErrorLike(err)) {
      error = err;
    } else if (typeof err === "string") {
      error = Error(err);
    } else {
      error = Error("Rendering was cancelled");
    }
    window.remotion_cancelledError = error.stack;
    throw error;
  }
  var Loop = ({ durationInFrames, times = Infinity, children, name, ...props }) => {
    const currentFrame = useCurrentFrame();
    const { durationInFrames: compDuration } = useVideoConfig();
    validateDurationInFrames(durationInFrames, {
      component: "of the <Loop /> component",
      allowFloats: true
    });
    if (typeof times !== "number") {
      throw new TypeError(`You passed to "times" an argument of type ${typeof times}, but it must be a number.`);
    }
    if (times !== Infinity && times % 1 !== 0) {
      throw new TypeError(`The "times" prop of a loop must be an integer, but got ${times}.`);
    }
    if (times < 0) {
      throw new TypeError(`The "times" prop of a loop must be at least 0, but got ${times}`);
    }
    const maxTimes = Math.ceil(compDuration / durationInFrames);
    const actualTimes = Math.min(maxTimes, times);
    const style = props.layout === "none" ? void 0 : props.style;
    const maxFrame = durationInFrames * (actualTimes - 1);
    const start = Math.floor(currentFrame / durationInFrames) * durationInFrames;
    const from = Math.min(start, maxFrame);
    const loopDisplay = (0, import_react.useMemo)(() => {
      return {
        numberOfTimes: actualTimes,
        startOffset: -from,
        durationInFrames
      };
    }, [actualTimes, durationInFrames, from]);
    return (0, import_jsx_runtime.jsx)(Sequence, { durationInFrames, from, name: name !== null && name !== void 0 ? name : "<Loop>", _remotionInternalLoopDisplay: loopDisplay, layout: props.layout, style, children });
  };
  var PreloadContext = (0, import_react.createContext)({});
  var preloads = {};
  var updaters = [];
  var PrefetchProvider = ({ children }) => {
    const [_preloads, _setPreloads] = (0, import_react.useState)(() => preloads);
    (0, import_react.useEffect)(() => {
      const updaterFunction = () => {
        _setPreloads(preloads);
      };
      updaters.push(updaterFunction);
      return () => {
        updaters = updaters.filter((u) => u !== updaterFunction);
      };
    }, []);
    return (0, import_jsx_runtime.jsx)(PreloadContext.Provider, { value: _preloads, children });
  };
  var usePreload = (src) => {
    var _a;
    const preloads2 = (0, import_react.useContext)(PreloadContext);
    return (_a = preloads2[src]) !== null && _a !== void 0 ? _a : src;
  };
  var validateMediaProps = (props, component) => {
    if (typeof props.volume !== "number" && typeof props.volume !== "function" && typeof props.volume !== "undefined") {
      throw new TypeError(`You have passed a volume of type ${typeof props.volume} to your <${component} /> component. Volume must be a number or a function with the signature '(frame: number) => number' undefined.`);
    }
    if (typeof props.volume === "number" && props.volume < 0) {
      throw new TypeError(`You have passed a volume below 0 to your <${component} /> component. Volume must be between 0 and 1`);
    }
    if (typeof props.playbackRate !== "number" && typeof props.playbackRate !== "undefined") {
      throw new TypeError(`You have passed a playbackRate of type ${typeof props.playbackRate} to your <${component} /> component. Playback rate must a real number or undefined.`);
    }
    if (typeof props.playbackRate === "number" && (isNaN(props.playbackRate) || !Number.isFinite(props.playbackRate) || props.playbackRate <= 0)) {
      throw new TypeError(`You have passed a playbackRate of ${props.playbackRate} to your <${component} /> component. Playback rate must be a real number above 0.`);
    }
  };
  var validateStartFromProps = (startFrom, endAt) => {
    if (typeof startFrom !== "undefined") {
      if (typeof startFrom !== "number") {
        throw new TypeError(`type of startFrom prop must be a number, instead got type ${typeof startFrom}.`);
      }
      if (isNaN(startFrom) || startFrom === Infinity) {
        throw new TypeError("startFrom prop can not be NaN or Infinity.");
      }
      if (startFrom < 0) {
        throw new TypeError(`startFrom must be greater than equal to 0 instead got ${startFrom}.`);
      }
    }
    if (typeof endAt !== "undefined") {
      if (typeof endAt !== "number") {
        throw new TypeError(`type of endAt prop must be a number, instead got type ${typeof endAt}.`);
      }
      if (isNaN(endAt)) {
        throw new TypeError("endAt prop can not be NaN.");
      }
      if (endAt <= 0) {
        throw new TypeError(`endAt must be a positive number, instead got ${endAt}.`);
      }
    }
    if (endAt < startFrom) {
      throw new TypeError("endAt prop must be greater than startFrom prop.");
    }
  };
  var durationReducer = (state, action) => {
    switch (action.type) {
      case "got-duration":
        return {
          ...state,
          [getAbsoluteSrc(action.src)]: action.durationInSeconds
        };
      default:
        return state;
    }
  };
  var DurationsContext = (0, import_react.createContext)({
    durations: {},
    setDurations: () => {
      throw new Error("context missing");
    }
  });
  var DurationsContextProvider = ({ children }) => {
    const [durations, setDurations] = (0, import_react.useReducer)(durationReducer, {});
    const value = (0, import_react.useMemo)(() => {
      return {
        durations,
        setDurations
      };
    }, [durations]);
    return (0, import_jsx_runtime.jsx)(DurationsContext.Provider, { value, children });
  };
  function mulberry32(a2) {
    let t = a2 + 1831565813;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
  function hashCode(str) {
    let i = 0;
    let chr = 0;
    let hash = 0;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }
  var random = (seed, dummy) => {
    if (dummy !== void 0) {
      throw new TypeError("random() takes only one argument");
    }
    if (seed === null) {
      return Math.random();
    }
    if (typeof seed === "string") {
      return mulberry32(hashCode(seed));
    }
    if (typeof seed === "number") {
      return mulberry32(seed * 1e10);
    }
    throw new Error("random() argument must be a number or a string");
  };
  var useBufferManager = () => {
    const [blocks, setBlocks] = (0, import_react.useState)([]);
    const [onBufferingCallbacks, setOnBufferingCallbacks] = (0, import_react.useState)([]);
    const [onResumeCallbacks, setOnResumeCallbacks] = (0, import_react.useState)([]);
    const buffering = (0, import_react.useRef)(false);
    const addBlock = (0, import_react.useCallback)((block) => {
      setBlocks((b2) => [...b2, block]);
      return {
        unblock: () => {
          setBlocks((b2) => b2.filter((bx) => bx !== block));
        }
      };
    }, []);
    const listenForBuffering = (0, import_react.useCallback)((callback) => {
      setOnBufferingCallbacks((c2) => [...c2, callback]);
      return {
        remove: () => {
          setOnBufferingCallbacks((c2) => c2.filter((cb) => cb !== callback));
        }
      };
    }, []);
    const listenForResume = (0, import_react.useCallback)((callback) => {
      setOnResumeCallbacks((c2) => [...c2, callback]);
      return {
        remove: () => {
          setOnResumeCallbacks((c2) => c2.filter((cb) => cb !== callback));
        }
      };
    }, []);
    (0, import_react.useEffect)(() => {
      if (blocks.length > 0) {
        onBufferingCallbacks.forEach((c2) => c2());
      } else {
        onResumeCallbacks.forEach((c2) => c2());
      }
    }, [blocks, onBufferingCallbacks, onResumeCallbacks]);
    return (0, import_react.useMemo)(() => {
      return { addBlock, listenForBuffering, listenForResume, buffering };
    }, [addBlock, buffering, listenForBuffering, listenForResume]);
  };
  var BufferingContextReact = import_react.default.createContext(null);
  var BufferingProvider = ({ children }) => {
    const bufferManager = useBufferManager();
    return (0, import_jsx_runtime.jsx)(BufferingContextReact.Provider, { value: bufferManager, children });
  };
  var useBufferState = () => {
    const buffer = (0, import_react.useContext)(BufferingContextReact);
    return (0, import_react.useMemo)(() => ({
      delayPlayback: () => {
        if (!buffer) {
          throw new Error("Tried to enable the buffering state, but a Remotion context was not found. This API can only be called in a component that was passed to the Remotion Player or a <Composition>. Or you might have experienced a version mismatch - run `npx remotion versions` and ensure all packages have the same version. This error is thrown by the buffer state https://remotion.dev/docs/player/buffer-state");
        }
        const { unblock } = buffer.addBlock({
          id: String(Math.random())
        });
        return { unblock };
      }
    }), [buffer]);
  };
  var useMediaBuffering = ({ element, shouldBuffer, isPremounting }) => {
    const buffer = useBufferState();
    (0, import_react.useEffect)(() => {
      let cleanup = () => void 0;
      const { current } = element;
      if (!current) {
        return;
      }
      if (!shouldBuffer) {
        return;
      }
      if (isPremounting) {
        return;
      }
      const onWaiting = () => {
        const { unblock } = buffer.delayPlayback();
        const onCanPlay = () => {
          unblock();
        };
        current.addEventListener("canplay", onCanPlay, {
          once: true
        });
        cleanup = () => {
          current.removeEventListener("canplay", onCanPlay);
          unblock();
          return void 0;
        };
      };
      if (current.readyState < current.HAVE_FUTURE_DATA) {
        onWaiting();
      } else {
        current.addEventListener("waiting", onWaiting);
      }
      return () => {
        cleanup();
      };
    }, [buffer, element, isPremounting, shouldBuffer]);
  };
  var useMediaStartsAt = () => {
    var _a;
    const parentSequence = (0, import_react.useContext)(SequenceContext);
    const startsAt = Math.min(0, (_a = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.relativeFrom) !== null && _a !== void 0 ? _a : 0);
    return startsAt;
  };
  var useFrameForVolumeProp = () => {
    const frame = useCurrentFrame();
    const startsAt = useMediaStartsAt();
    return frame + startsAt;
  };
  var getAssetDisplayName = (filename) => {
    if (/data:|blob:/.test(filename.substring(0, 5))) {
      return "Data URL";
    }
    const splitted = filename.split("/").map((s) => s.split("\\")).flat(1);
    return splitted[splitted.length - 1];
  };
  var playAndHandleNotAllowedError = (mediaRef, mediaType) => {
    const { current } = mediaRef;
    if (!current) {
      return;
    }
    const prom = current.play();
    if (prom.catch) {
      prom.catch((err) => {
        if (!current) {
          return;
        }
        if (err.message.includes("request was interrupted by a call to pause")) {
          return;
        }
        if (err.message.includes("The operation was aborted.")) {
          return;
        }
        if (err.message.includes("The fetching process for the media resource was aborted by the user agent")) {
          return;
        }
        if (err.message.includes("request was interrupted by a new load request")) {
          return;
        }
        if (err.message.includes("because the media was removed from the document")) {
          return;
        }
        console.log(`Could not play ${mediaType} due to following error: `, err);
        if (!current.muted) {
          console.log(`The video will be muted and we'll retry playing it.`, err);
          current.muted = true;
          current.play();
        }
      });
    }
  };
  var evaluateVolume = ({ frame, volume, mediaVolume = 1, allowAmplificationDuringRender }) => {
    const maxVolume = allowAmplificationDuringRender ? Infinity : 1;
    if (typeof volume === "number") {
      return Math.min(maxVolume, volume * mediaVolume);
    }
    if (typeof volume === "undefined") {
      return Number(mediaVolume);
    }
    const evaluated = volume(frame) * mediaVolume;
    if (typeof evaluated !== "number") {
      throw new TypeError(`You passed in a a function to the volume prop but it did not return a number but a value of type ${typeof evaluated} for frame ${frame}`);
    }
    if (Number.isNaN(evaluated)) {
      throw new TypeError(`You passed in a function to the volume prop but it returned NaN for frame ${frame}.`);
    }
    if (!Number.isFinite(evaluated)) {
      throw new TypeError(`You passed in a function to the volume prop but it returned a non-finite number for frame ${frame}.`);
    }
    return Math.max(0, Math.min(maxVolume, evaluated));
  };
  var didWarn = {};
  var warnOnce = (message) => {
    if (didWarn[message]) {
      return;
    }
    console.warn(message);
    didWarn[message] = true;
  };
  var useMediaInTimeline = ({ volume, mediaVolume, mediaRef, src, mediaType, playbackRate, displayName, id, stack, showInTimeline, premountDisplay }) => {
    const videoConfig = useVideoConfig();
    const { rootId, audioAndVideoTags } = (0, import_react.useContext)(TimelineContext);
    const parentSequence = (0, import_react.useContext)(SequenceContext);
    const actualFrom = parentSequence ? parentSequence.relativeFrom + parentSequence.cumulatedFrom : 0;
    const [playing] = usePlayingState();
    const startsAt = useMediaStartsAt();
    const { registerSequence, unregisterSequence } = (0, import_react.useContext)(SequenceManager);
    const [initialVolume] = (0, import_react.useState)(() => volume);
    const nonce = useNonce();
    const duration = parentSequence ? Math.min(parentSequence.durationInFrames, videoConfig.durationInFrames) : videoConfig.durationInFrames;
    const doesVolumeChange = typeof volume === "function";
    const volumes = (0, import_react.useMemo)(() => {
      if (typeof volume === "number") {
        return volume;
      }
      return new Array(Math.floor(Math.max(0, duration + startsAt))).fill(true).map((_, i) => {
        return evaluateVolume({
          frame: i + startsAt,
          volume,
          mediaVolume,
          allowAmplificationDuringRender: false
        });
      }).join(",");
    }, [duration, startsAt, volume, mediaVolume]);
    (0, import_react.useEffect)(() => {
      if (typeof volume === "number" && volume !== initialVolume) {
        warnOnce(`Remotion: The ${mediaType} with src ${src} has changed it's volume. Prefer the callback syntax for setting volume to get better timeline display: https://www.remotion.dev/docs/using-audio/#controlling-volume`);
      }
    }, [initialVolume, mediaType, src, volume]);
    (0, import_react.useEffect)(() => {
      var _a;
      if (!mediaRef.current) {
        return;
      }
      if (!src) {
        throw new Error("No src passed");
      }
      if (!getRemotionEnvironment().isStudio && true) {
        return;
      }
      if (!showInTimeline) {
        return;
      }
      registerSequence({
        type: mediaType,
        src,
        id,
        duration,
        from: 0,
        parent: (_a = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.id) !== null && _a !== void 0 ? _a : null,
        displayName: displayName !== null && displayName !== void 0 ? displayName : getAssetDisplayName(src),
        rootId,
        volume: volumes,
        showInTimeline: true,
        nonce,
        startMediaFrom: 0 - startsAt,
        doesVolumeChange,
        loopDisplay: void 0,
        playbackRate,
        stack,
        premountDisplay
      });
      return () => {
        unregisterSequence(id);
      };
    }, [
      actualFrom,
      duration,
      id,
      parentSequence,
      src,
      registerSequence,
      rootId,
      unregisterSequence,
      videoConfig,
      volumes,
      doesVolumeChange,
      nonce,
      mediaRef,
      mediaType,
      startsAt,
      playbackRate,
      displayName,
      stack,
      showInTimeline,
      premountDisplay
    ]);
    (0, import_react.useEffect)(() => {
      const tag = {
        id,
        play: () => {
          if (!playing) {
            return;
          }
          return playAndHandleNotAllowedError(mediaRef, mediaType);
        }
      };
      audioAndVideoTags.current.push(tag);
      return () => {
        audioAndVideoTags.current = audioAndVideoTags.current.filter((a2) => a2.id !== id);
      };
    }, [audioAndVideoTags, id, mediaRef, mediaType, playing]);
  };
  function interpolateFunction(input, inputRange, outputRange, options) {
    const { extrapolateLeft, extrapolateRight, easing } = options;
    let result = input;
    const [inputMin, inputMax] = inputRange;
    const [outputMin, outputMax] = outputRange;
    if (result < inputMin) {
      if (extrapolateLeft === "identity") {
        return result;
      }
      if (extrapolateLeft === "clamp") {
        result = inputMin;
      } else if (extrapolateLeft === "wrap") {
        const range = inputMax - inputMin;
        result = ((result - inputMin) % range + range) % range + inputMin;
      } else
        ;
    }
    if (result > inputMax) {
      if (extrapolateRight === "identity") {
        return result;
      }
      if (extrapolateRight === "clamp") {
        result = inputMax;
      } else if (extrapolateRight === "wrap") {
        const range = inputMax - inputMin;
        result = ((result - inputMin) % range + range) % range + inputMin;
      } else
        ;
    }
    if (outputMin === outputMax) {
      return outputMin;
    }
    result = (result - inputMin) / (inputMax - inputMin);
    result = easing(result);
    result = result * (outputMax - outputMin) + outputMin;
    return result;
  }
  function findRange(input, inputRange) {
    let i;
    for (i = 1; i < inputRange.length - 1; ++i) {
      if (inputRange[i] >= input) {
        break;
      }
    }
    return i - 1;
  }
  function checkValidInputRange(arr) {
    for (let i = 1; i < arr.length; ++i) {
      if (!(arr[i] > arr[i - 1])) {
        throw new Error(`inputRange must be strictly monotonically increasing but got [${arr.join(",")}]`);
      }
    }
  }
  function checkInfiniteRange(name, arr) {
    if (arr.length < 2) {
      throw new Error(name + " must have at least 2 elements");
    }
    for (const index in arr) {
      if (typeof arr[index] !== "number") {
        throw new Error(`${name} must contain only numbers`);
      }
      if (arr[index] === -Infinity || arr[index] === Infinity) {
        throw new Error(`${name} must contain only finite numbers, but got [${arr.join(",")}]`);
      }
    }
  }
  function interpolate(input, inputRange, outputRange, options) {
    var _a;
    if (typeof input === "undefined") {
      throw new Error("input can not be undefined");
    }
    if (typeof inputRange === "undefined") {
      throw new Error("inputRange can not be undefined");
    }
    if (typeof outputRange === "undefined") {
      throw new Error("outputRange can not be undefined");
    }
    if (inputRange.length !== outputRange.length) {
      throw new Error("inputRange (" + inputRange.length + ") and outputRange (" + outputRange.length + ") must have the same length");
    }
    checkInfiniteRange("inputRange", inputRange);
    checkInfiniteRange("outputRange", outputRange);
    checkValidInputRange(inputRange);
    const easing = (_a = options === null || options === void 0 ? void 0 : options.easing) !== null && _a !== void 0 ? _a : (num) => num;
    let extrapolateLeft = "extend";
    if ((options === null || options === void 0 ? void 0 : options.extrapolateLeft) !== void 0) {
      extrapolateLeft = options.extrapolateLeft;
    }
    let extrapolateRight = "extend";
    if ((options === null || options === void 0 ? void 0 : options.extrapolateRight) !== void 0) {
      extrapolateRight = options.extrapolateRight;
    }
    if (typeof input !== "number") {
      throw new TypeError("Cannot interpolate an input which is not a number");
    }
    const range = findRange(input, inputRange);
    return interpolateFunction(input, [inputRange[range], inputRange[range + 1]], [outputRange[range], outputRange[range + 1]], {
      easing,
      extrapolateLeft,
      extrapolateRight
    });
  }
  var getExpectedMediaFrameUncorrected = ({ frame, playbackRate, startFrom }) => {
    return interpolate(frame, [-1, startFrom, startFrom + 1], [-1, startFrom, startFrom + playbackRate]);
  };
  var getMediaTime = ({ fps, frame, playbackRate, startFrom }) => {
    const expectedFrame = getExpectedMediaFrameUncorrected({
      frame,
      playbackRate,
      startFrom
    });
    const msPerFrame = 1e3 / fps;
    return expectedFrame * msPerFrame / 1e3;
  };
  var toSeconds = (time, fps) => {
    return Math.round(time / fps * 100) / 100;
  };
  var isIosSafari = () => {
    if (typeof window === "undefined") {
      return false;
    }
    const isIpadIPodIPhone = /iP(ad|od|hone)/i.test(window.navigator.userAgent);
    const isAppleWebKit = /AppleWebKit/.test(window.navigator.userAgent);
    return isIpadIPodIPhone && isAppleWebKit;
  };
  var isIOSSafariAndBlob = (actualSrc) => {
    return isIosSafari() && actualSrc.startsWith("blob:");
  };
  var appendVideoFragment = ({ actualSrc, actualFrom, duration, fps }) => {
    var _a;
    if (isIOSSafariAndBlob(actualSrc)) {
      return actualSrc;
    }
    if (actualSrc.startsWith("data:")) {
      return actualSrc;
    }
    const existingHash = Boolean(new URL(actualSrc, (_a = typeof window === "undefined" ? null : window.location.href) !== null && _a !== void 0 ? _a : "http://localhost:3000").hash);
    if (existingHash) {
      return actualSrc;
    }
    if (!Number.isFinite(actualFrom)) {
      return actualSrc;
    }
    actualSrc += `#t=${toSeconds(-actualFrom, fps)}`;
    if (!Number.isFinite(duration)) {
      return actualSrc;
    }
    actualSrc += `,${toSeconds(duration, fps)}`;
    return actualSrc;
  };
  var isSubsetOfDuration = (prevStartFrom, newStartFrom, prevDuration, newDuration) => {
    return prevStartFrom <= newStartFrom && prevStartFrom + prevDuration >= newStartFrom + newDuration;
  };
  var useAppendVideoFragment = ({ actualSrc: initialActualSrc, actualFrom: initialActualFrom, duration: initialDuration, fps }) => {
    const actualFromRef = (0, import_react.useRef)(initialActualFrom);
    const actualDuration = (0, import_react.useRef)(initialDuration);
    const actualSrc = (0, import_react.useRef)(initialActualSrc);
    if (!isSubsetOfDuration || initialActualSrc !== actualSrc.current) {
      actualFromRef.current = initialActualFrom;
      actualDuration.current = initialDuration;
      actualSrc.current = initialActualSrc;
    }
    const appended = appendVideoFragment({
      actualSrc: actualSrc.current,
      actualFrom: actualFromRef.current,
      duration: actualDuration.current,
      fps
    });
    return appended;
  };
  var alreadyWarned = {};
  var warnAboutNonSeekableMedia = (ref, type) => {
    if (ref === null) {
      return;
    }
    if (ref.seekable.length === 0) {
      return;
    }
    if (ref.seekable.length > 1) {
      return;
    }
    if (alreadyWarned[ref.src]) {
      return;
    }
    const range = { start: ref.seekable.start(0), end: ref.seekable.end(0) };
    if (range.start === 0 && range.end === 0) {
      const msg = [
        `The media ${ref.src} cannot be seeked. This could be one of few reasons:`,
        "1) The media resource was replaced while the video is playing but it was not loaded yet.",
        "2) The media does not support seeking.",
        "3) The media was loaded with security headers prventing it from being included.",
        "Please see https://remotion.dev/docs/non-seekable-media for assistance."
      ].join("\n");
      if (type === "console-error") {
        console.error(msg);
      } else if (type === "console-warning") {
        console.warn(`The media ${ref.src} does not support seeking. The video will render fine, but may not play correctly in the Remotion Studio and in the <Player>. See https://remotion.dev/docs/non-seekable-media for an explanation.`);
      } else {
        throw new Error(msg);
      }
      alreadyWarned[ref.src] = true;
    }
  };
  var DEFAULT_ACCEPTABLE_TIMESHIFT = 0.45;
  var seek = (mediaRef, time) => {
    if (!mediaRef.current) {
      return;
    }
    if (isIosSafari()) {
      mediaRef.current.currentTime = Number(time.toFixed(1));
      return;
    }
    mediaRef.current.currentTime = time;
  };
  var useMediaPlayback = ({ mediaRef, src, mediaType, playbackRate: localPlaybackRate, onlyWarnForMediaSeekingError, acceptableTimeshift }) => {
    const { playbackRate: globalPlaybackRate } = (0, import_react.useContext)(TimelineContext);
    const frame = useCurrentFrame();
    const absoluteFrame = useTimelinePosition();
    const [playing] = usePlayingState();
    const buffering = (0, import_react.useContext)(BufferingContextReact);
    const { fps } = useVideoConfig();
    const mediaStartsAt = useMediaStartsAt();
    const playbackRate = localPlaybackRate * globalPlaybackRate;
    const acceptableTimeShiftButLessThanDuration = (() => {
      var _a;
      if ((_a = mediaRef.current) === null || _a === void 0 ? void 0 : _a.duration) {
        return Math.min(mediaRef.current.duration, acceptableTimeshift !== null && acceptableTimeshift !== void 0 ? acceptableTimeshift : DEFAULT_ACCEPTABLE_TIMESHIFT);
      }
      return acceptableTimeshift;
    })();
    const pausedOrBuffering = !playing || buffering && buffering.buffering.current;
    (0, import_react.useEffect)(() => {
      var _a;
      if (pausedOrBuffering) {
        (_a = mediaRef.current) === null || _a === void 0 ? void 0 : _a.pause();
      }
    }, [mediaRef, mediaType, pausedOrBuffering]);
    (0, import_react.useEffect)(() => {
      const tagName = mediaType === "audio" ? "<Audio>" : "<Video>";
      if (!mediaRef.current) {
        throw new Error(`No ${mediaType} ref found`);
      }
      if (!src) {
        throw new Error(`No 'src' attribute was passed to the ${tagName} element.`);
      }
      const playbackRateToSet = Math.max(0, playbackRate);
      if (mediaRef.current.playbackRate !== playbackRateToSet) {
        mediaRef.current.playbackRate = playbackRateToSet;
      }
      const desiredUnclampedTime = getMediaTime({
        frame,
        playbackRate: localPlaybackRate,
        startFrom: -mediaStartsAt,
        fps
      });
      const { duration } = mediaRef.current;
      const shouldBeTime = !Number.isNaN(duration) && Number.isFinite(duration) ? Math.min(duration, desiredUnclampedTime) : desiredUnclampedTime;
      const isTime = mediaRef.current.currentTime;
      const timeShift = Math.abs(shouldBeTime - isTime);
      if (timeShift > acceptableTimeShiftButLessThanDuration) {
        seek(mediaRef, shouldBeTime);
        if (!onlyWarnForMediaSeekingError) {
          warnAboutNonSeekableMedia(mediaRef.current, onlyWarnForMediaSeekingError ? "console-warning" : "console-error");
        }
        return;
      }
      const makesSenseToSeek = Math.abs(mediaRef.current.currentTime - shouldBeTime) > 1e-5;
      if (pausedOrBuffering || absoluteFrame === 0) {
        if (makesSenseToSeek) {
          seek(mediaRef, shouldBeTime);
        }
      }
      if (mediaRef.current.paused && !mediaRef.current.ended && !pausedOrBuffering) {
        if (makesSenseToSeek) {
          seek(mediaRef, shouldBeTime);
        }
        playAndHandleNotAllowedError(mediaRef, mediaType);
      }
    }, [
      absoluteFrame,
      fps,
      playbackRate,
      frame,
      mediaRef,
      mediaType,
      src,
      mediaStartsAt,
      localPlaybackRate,
      onlyWarnForMediaSeekingError,
      acceptableTimeshift,
      acceptableTimeShiftButLessThanDuration,
      pausedOrBuffering
    ]);
  };
  var useMediaTagVolume = (mediaRef) => {
    const [actualVolume, setActualVolume] = (0, import_react.useState)(1);
    (0, import_react.useEffect)(() => {
      const ref = mediaRef.current;
      if (!ref) {
        return;
      }
      const onChange = () => {
        setActualVolume(ref.volume);
      };
      ref.addEventListener("volumechange", onChange);
      return () => ref.removeEventListener("volumechange", onChange);
    }, [mediaRef]);
    (0, import_react.useEffect)(() => {
      const ref = mediaRef.current;
      if (!ref) {
        return;
      }
      if (ref.volume !== actualVolume) {
        setActualVolume(ref.volume);
      }
    }, [actualVolume, mediaRef]);
    return actualVolume;
  };
  var FLOATING_POINT_ERROR_THRESHOLD = 1e-5;
  var isApproximatelyTheSame = (num1, num2) => {
    return Math.abs(num1 - num2) < FLOATING_POINT_ERROR_THRESHOLD;
  };
  var useSyncVolumeWithMediaTag = ({ volumePropFrame, actualVolume, volume, mediaVolume, mediaRef }) => {
    (0, import_react.useEffect)(() => {
      const userPreferredVolume = evaluateVolume({
        frame: volumePropFrame,
        volume,
        mediaVolume,
        allowAmplificationDuringRender: false
      });
      if (!isApproximatelyTheSame(userPreferredVolume, actualVolume) && mediaRef.current) {
        mediaRef.current.volume = userPreferredVolume;
      }
    }, [actualVolume, volumePropFrame, mediaRef, volume, mediaVolume]);
  };
  var MediaVolumeContext = (0, import_react.createContext)({
    mediaMuted: false,
    mediaVolume: 1
  });
  var SetMediaVolumeContext = (0, import_react.createContext)({
    setMediaMuted: () => {
      throw new Error("default");
    },
    setMediaVolume: () => {
      throw new Error("default");
    }
  });
  var useMediaVolumeState = () => {
    const { mediaVolume } = (0, import_react.useContext)(MediaVolumeContext);
    const { setMediaVolume } = (0, import_react.useContext)(SetMediaVolumeContext);
    return (0, import_react.useMemo)(() => {
      return [mediaVolume, setMediaVolume];
    }, [mediaVolume, setMediaVolume]);
  };
  var useMediaMutedState = () => {
    const { mediaMuted } = (0, import_react.useContext)(MediaVolumeContext);
    const { setMediaMuted } = (0, import_react.useContext)(SetMediaVolumeContext);
    return (0, import_react.useMemo)(() => {
      return [mediaMuted, setMediaMuted];
    }, [mediaMuted, setMediaMuted]);
  };
  var EMPTY_AUDIO = "data:audio/mp3;base64,/+MYxAAJcAV8AAgAABn//////+/gQ5BAMA+D4Pg+BAQBAEAwD4Pg+D4EBAEAQDAPg++hYBH///hUFQVBUFREDQNHmf///////+MYxBUGkAGIMAAAAP/29Xt6lUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDUAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
  var compareProps = (obj1, obj2) => {
    const keysA = Object.keys(obj1).sort();
    const keysB = Object.keys(obj2).sort();
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (let i = 0; i < keysA.length; i++) {
      if (keysA[i] !== keysB[i]) {
        return false;
      }
      if (obj1[keysA[i]] !== obj2[keysB[i]]) {
        return false;
      }
    }
    return true;
  };
  var didPropChange = (key, newProp, prevProp) => {
    if (key === "src" && !prevProp.startsWith("data:") && !newProp.startsWith("data:")) {
      return new URL(prevProp, window.origin).toString() !== new URL(newProp, window.origin).toString();
    }
    if (prevProp === newProp) {
      return false;
    }
    return true;
  };
  var SharedAudioContext = (0, import_react.createContext)(null);
  var SharedAudioContextProvider = ({ children, numberOfAudioTags, component }) => {
    const audios = (0, import_react.useRef)([]);
    const [initialNumberOfAudioTags] = (0, import_react.useState)(numberOfAudioTags);
    if (numberOfAudioTags !== initialNumberOfAudioTags) {
      throw new Error("The number of shared audio tags has changed dynamically. Once you have set this property, you cannot change it afterwards.");
    }
    const refs = (0, import_react.useMemo)(() => {
      return new Array(numberOfAudioTags).fill(true).map(() => {
        return { id: Math.random(), ref: (0, import_react.createRef)() };
      });
    }, [numberOfAudioTags]);
    const takenAudios = (0, import_react.useRef)(new Array(numberOfAudioTags).fill(false));
    const rerenderAudios = (0, import_react.useCallback)(() => {
      refs.forEach(({ ref, id }) => {
        var _a;
        const data = (_a = audios.current) === null || _a === void 0 ? void 0 : _a.find((a2) => a2.id === id);
        const { current } = ref;
        if (!current) {
          return;
        }
        if (data === void 0) {
          current.src = EMPTY_AUDIO;
          return;
        }
        if (!data) {
          throw new TypeError("Expected audio data to be there");
        }
        Object.keys(data.props).forEach((key) => {
          if (didPropChange(key, data.props[key], current[key])) {
            current[key] = data.props[key];
          }
        });
      });
    }, [refs]);
    const registerAudio = (0, import_react.useCallback)((aud, audioId) => {
      var _a, _b;
      const found = (_a = audios.current) === null || _a === void 0 ? void 0 : _a.find((a2) => a2.audioId === audioId);
      if (found) {
        return found;
      }
      const firstFreeAudio = takenAudios.current.findIndex((a2) => a2 === false);
      if (firstFreeAudio === -1) {
        throw new Error(`Tried to simultaneously mount ${numberOfAudioTags + 1} <Audio /> tags at the same time. With the current settings, the maximum amount of <Audio /> tags is limited to ${numberOfAudioTags} at the same time. Remotion pre-mounts silent audio tags to help avoid browser autoplay restrictions. See https://remotion.dev/docs/player/autoplay#use-the-numberofsharedaudiotags-property for more information on how to increase this limit.`);
      }
      const { id, ref } = refs[firstFreeAudio];
      const cloned = [...takenAudios.current];
      cloned[firstFreeAudio] = id;
      takenAudios.current = cloned;
      const newElem = {
        props: aud,
        id,
        el: ref,
        audioId
      };
      (_b = audios.current) === null || _b === void 0 ? void 0 : _b.push(newElem);
      rerenderAudios();
      return newElem;
    }, [numberOfAudioTags, refs, rerenderAudios]);
    const unregisterAudio = (0, import_react.useCallback)((id) => {
      var _a;
      const cloned = [...takenAudios.current];
      const index = refs.findIndex((r) => r.id === id);
      if (index === -1) {
        throw new TypeError("Error occured in ");
      }
      cloned[index] = false;
      takenAudios.current = cloned;
      audios.current = (_a = audios.current) === null || _a === void 0 ? void 0 : _a.filter((a2) => a2.id !== id);
      rerenderAudios();
    }, [refs, rerenderAudios]);
    const updateAudio = (0, import_react.useCallback)(({ aud, audioId, id }) => {
      var _a;
      let changed = false;
      audios.current = (_a = audios.current) === null || _a === void 0 ? void 0 : _a.map((prevA) => {
        if (prevA.id === id) {
          const isTheSame = compareProps(aud, prevA.props);
          if (isTheSame) {
            return prevA;
          }
          changed = true;
          return {
            ...prevA,
            props: aud,
            audioId
          };
        }
        return prevA;
      });
      if (changed) {
        rerenderAudios();
      }
    }, [rerenderAudios]);
    const playAllAudios = (0, import_react.useCallback)(() => {
      refs.forEach((ref) => {
        playAndHandleNotAllowedError(ref.ref, "audio");
      });
    }, [refs]);
    const value = (0, import_react.useMemo)(() => {
      return {
        registerAudio,
        unregisterAudio,
        updateAudio,
        playAllAudios,
        numberOfAudioTags
      };
    }, [
      numberOfAudioTags,
      playAllAudios,
      registerAudio,
      unregisterAudio,
      updateAudio
    ]);
    const resetAudio = (0, import_react.useCallback)(() => {
      takenAudios.current = new Array(numberOfAudioTags).fill(false);
      audios.current = [];
      rerenderAudios();
    }, [numberOfAudioTags, rerenderAudios]);
    (0, import_react.useEffect)(() => {
      return () => {
        resetAudio();
      };
    }, [component, resetAudio]);
    return (0, import_jsx_runtime.jsxs)(SharedAudioContext.Provider, { value, children: [refs.map(({ id, ref }) => {
      return (
        // Without preload="metadata", iOS will seek the time internally
        // but not actually with sound. Adding `preload="metadata"` helps here.
        // https://discord.com/channels/809501355504959528/817306414069710848/1130519583367888906
        (0, import_jsx_runtime.jsx)("audio", { ref, preload: "metadata", src: EMPTY_AUDIO }, id)
      );
    }), children] });
  };
  var useSharedAudio = (aud, audioId) => {
    var _a;
    const ctx = (0, import_react.useContext)(SharedAudioContext);
    const [elem] = (0, import_react.useState)(() => {
      if (ctx && ctx.numberOfAudioTags > 0) {
        return ctx.registerAudio(aud, audioId);
      }
      return {
        el: import_react.default.createRef(),
        id: Math.random(),
        props: aud,
        audioId
      };
    });
    const effectToUse = (_a = import_react.default.useInsertionEffect) !== null && _a !== void 0 ? _a : import_react.default.useLayoutEffect;
    if (typeof document !== "undefined") {
      effectToUse(() => {
        if (ctx && ctx.numberOfAudioTags > 0) {
          ctx.updateAudio({ id: elem.id, aud, audioId });
        }
      }, [aud, ctx, elem.id, audioId]);
      effectToUse(() => {
        return () => {
          if (ctx && ctx.numberOfAudioTags > 0) {
            ctx.unregisterAudio(elem.id);
          }
        };
      }, [ctx, elem.id]);
    }
    return elem;
  };
  var AudioForDevelopmentForwardRefFunction = (props, ref) => {
    var _a;
    const [initialShouldPreMountAudioElements] = (0, import_react.useState)(props.shouldPreMountAudioTags);
    if (props.shouldPreMountAudioTags !== initialShouldPreMountAudioElements) {
      throw new Error("Cannot change the behavior for pre-mounting audio tags dynamically.");
    }
    const [mediaVolume] = useMediaVolumeState();
    const [mediaMuted] = useMediaMutedState();
    const volumePropFrame = useFrameForVolumeProp();
    const { volume, muted, playbackRate, shouldPreMountAudioTags, src, onDuration, acceptableTimeShiftInSeconds, _remotionInternalNeedsDurationCalculation, _remotionInternalNativeLoopPassed, _remotionInternalStack, allowAmplificationDuringRender, name, pauseWhenBuffering, showInTimeline, ...nativeProps } = props;
    const { hidden } = (0, import_react.useContext)(SequenceVisibilityToggleContext);
    if (!src) {
      throw new TypeError("No 'src' was passed to <Audio>.");
    }
    const preloadedSrc = usePreload(src);
    const sequenceContext = (0, import_react.useContext)(SequenceContext);
    const [timelineId] = (0, import_react.useState)(() => String(Math.random()));
    const isSequenceHidden = (_a = hidden[timelineId]) !== null && _a !== void 0 ? _a : false;
    const propsToPass = (0, import_react.useMemo)(() => {
      return {
        muted: muted || mediaMuted || isSequenceHidden,
        src: preloadedSrc,
        loop: _remotionInternalNativeLoopPassed,
        ...nativeProps
      };
    }, [
      _remotionInternalNativeLoopPassed,
      isSequenceHidden,
      mediaMuted,
      muted,
      nativeProps,
      preloadedSrc
    ]);
    const id = (0, import_react.useMemo)(() => `audio-${random(src !== null && src !== void 0 ? src : "")}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames}-muted:${props.muted}-loop:${props.loop}`, [
      src,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames,
      props.muted,
      props.loop
    ]);
    const audioRef = useSharedAudio(propsToPass, id).el;
    const actualVolume = useMediaTagVolume(audioRef);
    useSyncVolumeWithMediaTag({
      volumePropFrame,
      actualVolume,
      volume,
      mediaVolume,
      mediaRef: audioRef
    });
    useMediaInTimeline({
      volume,
      mediaVolume,
      mediaRef: audioRef,
      src,
      mediaType: "audio",
      playbackRate: playbackRate !== null && playbackRate !== void 0 ? playbackRate : 1,
      displayName: name !== null && name !== void 0 ? name : null,
      id: timelineId,
      stack: _remotionInternalStack,
      showInTimeline,
      premountDisplay: null
    });
    useMediaPlayback({
      mediaRef: audioRef,
      src,
      mediaType: "audio",
      playbackRate: playbackRate !== null && playbackRate !== void 0 ? playbackRate : 1,
      onlyWarnForMediaSeekingError: false,
      acceptableTimeshift: acceptableTimeShiftInSeconds !== null && acceptableTimeShiftInSeconds !== void 0 ? acceptableTimeShiftInSeconds : DEFAULT_ACCEPTABLE_TIMESHIFT
    });
    useMediaBuffering({
      element: audioRef,
      shouldBuffer: pauseWhenBuffering,
      isPremounting: Boolean(sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.premounting)
    });
    (0, import_react.useImperativeHandle)(ref, () => {
      return audioRef.current;
    }, [audioRef]);
    const currentOnDurationCallback = (0, import_react.useRef)();
    currentOnDurationCallback.current = onDuration;
    (0, import_react.useEffect)(() => {
      var _a2;
      const { current } = audioRef;
      if (!current) {
        return;
      }
      if (current.duration) {
        (_a2 = currentOnDurationCallback.current) === null || _a2 === void 0 ? void 0 : _a2.call(currentOnDurationCallback, current.src, current.duration);
        return;
      }
      const onLoadedMetadata = () => {
        var _a3;
        (_a3 = currentOnDurationCallback.current) === null || _a3 === void 0 ? void 0 : _a3.call(currentOnDurationCallback, current.src, current.duration);
      };
      current.addEventListener("loadedmetadata", onLoadedMetadata);
      return () => {
        current.removeEventListener("loadedmetadata", onLoadedMetadata);
      };
    }, [audioRef, src]);
    if (initialShouldPreMountAudioElements) {
      return null;
    }
    return (0, import_jsx_runtime.jsx)("audio", { ref: audioRef, preload: "metadata", ...propsToPass });
  };
  var AudioForPreview = (0, import_react.forwardRef)(AudioForDevelopmentForwardRefFunction);
  var RenderAssetManager = (0, import_react.createContext)({
    // Must be undefined, otherwise error in Player
    registerRenderAsset: () => void 0,
    unregisterRenderAsset: () => void 0,
    renderAssets: []
  });
  var RenderAssetManagerProvider = ({ children }) => {
    const [renderAssets, setRenderAssets] = (0, import_react.useState)([]);
    const registerRenderAsset = (0, import_react.useCallback)((renderAsset) => {
      setRenderAssets((assets) => {
        return [...assets, renderAsset];
      });
    }, []);
    const unregisterRenderAsset = (0, import_react.useCallback)((id) => {
      setRenderAssets((assts) => {
        return assts.filter((a2) => a2.id !== id);
      });
    }, []);
    (0, import_react.useLayoutEffect)(() => {
      if (typeof window !== "undefined") {
        window.remotion_collectAssets = () => {
          setRenderAssets([]);
          return renderAssets;
        };
      }
    }, [renderAssets]);
    const contextValue = (0, import_react.useMemo)(() => {
      return {
        registerRenderAsset,
        unregisterRenderAsset,
        renderAssets
      };
    }, [renderAssets, registerRenderAsset, unregisterRenderAsset]);
    return (0, import_jsx_runtime.jsx)(RenderAssetManager.Provider, { value: contextValue, children });
  };
  if (typeof window !== "undefined") {
    window.remotion_renderReady = false;
  }
  var handles = [];
  if (typeof window !== "undefined") {
    window.remotion_delayRenderTimeouts = {};
  }
  var DELAY_RENDER_CALLSTACK_TOKEN = "The delayRender was called:";
  var DELAY_RENDER_RETRIES_LEFT = "Retries left: ";
  var DELAY_RENDER_RETRY_TOKEN = "- Rendering the frame will be retried.";
  var defaultTimeout = 3e4;
  var delayRender = (label3, options) => {
    var _a, _b, _c, _d, _e;
    if (typeof label3 !== "string" && typeof label3 !== "undefined") {
      throw new Error("The label parameter of delayRender() must be a string or undefined, got: " + JSON.stringify(label3));
    }
    const handle = Math.random();
    handles.push(handle);
    const called = (_b = (_a = Error().stack) === null || _a === void 0 ? void 0 : _a.replace(/^Error/g, "")) !== null && _b !== void 0 ? _b : "";
    if (getRemotionEnvironment().isRendering) {
      const timeoutToUse = ((_c = options === null || options === void 0 ? void 0 : options.timeoutInMilliseconds) !== null && _c !== void 0 ? _c : typeof window === "undefined" ? defaultTimeout : (_d = window.remotion_puppeteerTimeout) !== null && _d !== void 0 ? _d : defaultTimeout) - 2e3;
      if (typeof window !== "undefined") {
        const retriesLeft = ((_e = options === null || options === void 0 ? void 0 : options.retries) !== null && _e !== void 0 ? _e : 0) - (window.remotion_attempt - 1);
        window.remotion_delayRenderTimeouts[handle] = {
          label: label3 !== null && label3 !== void 0 ? label3 : null,
          timeout: setTimeout(() => {
            const message = [
              `A delayRender()`,
              label3 ? `"${label3}"` : null,
              `was called but not cleared after ${timeoutToUse}ms. See https://remotion.dev/docs/timeout for help.`,
              retriesLeft > 0 ? DELAY_RENDER_RETRIES_LEFT + retriesLeft : null,
              retriesLeft > 0 ? DELAY_RENDER_RETRY_TOKEN : null,
              DELAY_RENDER_CALLSTACK_TOKEN,
              called
            ].filter(truthy).join(" ");
            cancelRender(Error(message));
          }, timeoutToUse)
        };
      }
    }
    if (typeof window !== "undefined") {
      window.remotion_renderReady = false;
    }
    return handle;
  };
  var continueRender = (handle) => {
    if (typeof handle === "undefined") {
      throw new TypeError("The continueRender() method must be called with a parameter that is the return value of delayRender(). No value was passed.");
    }
    if (typeof handle !== "number") {
      throw new TypeError("The parameter passed into continueRender() must be the return value of delayRender() which is a number. Got: " + JSON.stringify(handle));
    }
    handles = handles.filter((h) => {
      if (h === handle) {
        if (getRemotionEnvironment().isRendering) {
          clearTimeout(window.remotion_delayRenderTimeouts[handle].timeout);
          delete window.remotion_delayRenderTimeouts[handle];
        }
        return false;
      }
      return true;
    });
    if (handles.length === 0 && typeof window !== "undefined") {
      window.remotion_renderReady = true;
    }
  };
  var AudioForRenderingRefForwardingFunction = (props, ref) => {
    const audioRef = (0, import_react.useRef)(null);
    const absoluteFrame = useTimelinePosition();
    const volumePropFrame = useFrameForVolumeProp();
    const frame = useCurrentFrame();
    const sequenceContext = (0, import_react.useContext)(SequenceContext);
    const { registerRenderAsset, unregisterRenderAsset } = (0, import_react.useContext)(RenderAssetManager);
    const id = (0, import_react.useMemo)(() => {
      var _a;
      return `audio-${random((_a = props.src) !== null && _a !== void 0 ? _a : "")}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames}`;
    }, [
      props.src,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames
    ]);
    const { volume: volumeProp, playbackRate, allowAmplificationDuringRender, onDuration, toneFrequency, _remotionInternalNeedsDurationCalculation, _remotionInternalNativeLoopPassed, acceptableTimeShiftInSeconds, name, onError, delayRenderRetries, delayRenderTimeoutInMilliseconds, ...nativeProps } = props;
    const volume = evaluateVolume({
      volume: volumeProp,
      frame: volumePropFrame,
      mediaVolume: 1,
      allowAmplificationDuringRender: allowAmplificationDuringRender !== null && allowAmplificationDuringRender !== void 0 ? allowAmplificationDuringRender : false
    });
    (0, import_react.useImperativeHandle)(ref, () => {
      return audioRef.current;
    }, []);
    (0, import_react.useEffect)(() => {
      var _a;
      if (!props.src) {
        throw new Error("No src passed");
      }
      if (!window.remotion_audioEnabled) {
        return;
      }
      if (props.muted) {
        return;
      }
      if (volume <= 0) {
        return;
      }
      registerRenderAsset({
        type: "audio",
        src: getAbsoluteSrc(props.src),
        id,
        frame: absoluteFrame,
        volume,
        mediaFrame: frame,
        playbackRate: (_a = props.playbackRate) !== null && _a !== void 0 ? _a : 1,
        allowAmplificationDuringRender: allowAmplificationDuringRender !== null && allowAmplificationDuringRender !== void 0 ? allowAmplificationDuringRender : false,
        toneFrequency: toneFrequency !== null && toneFrequency !== void 0 ? toneFrequency : null
      });
      return () => unregisterRenderAsset(id);
    }, [
      props.muted,
      props.src,
      registerRenderAsset,
      absoluteFrame,
      id,
      unregisterRenderAsset,
      volume,
      volumePropFrame,
      frame,
      playbackRate,
      props.playbackRate,
      allowAmplificationDuringRender,
      toneFrequency
    ]);
    const { src } = props;
    const needsToRenderAudioTag = ref || _remotionInternalNeedsDurationCalculation;
    (0, import_react.useLayoutEffect)(() => {
      if (false) {
        return;
      }
      if (!needsToRenderAudioTag) {
        return;
      }
      const newHandle = delayRender("Loading <Audio> duration with src=" + src, {
        retries: delayRenderRetries !== null && delayRenderRetries !== void 0 ? delayRenderRetries : void 0,
        timeoutInMilliseconds: delayRenderTimeoutInMilliseconds !== null && delayRenderTimeoutInMilliseconds !== void 0 ? delayRenderTimeoutInMilliseconds : void 0
      });
      const { current } = audioRef;
      const didLoad = () => {
        if (current === null || current === void 0 ? void 0 : current.duration) {
          onDuration(current.src, current.duration);
        }
        continueRender(newHandle);
      };
      if (current === null || current === void 0 ? void 0 : current.duration) {
        onDuration(current.src, current.duration);
        continueRender(newHandle);
      } else {
        current === null || current === void 0 ? void 0 : current.addEventListener("loadedmetadata", didLoad, { once: true });
      }
      return () => {
        current === null || current === void 0 ? void 0 : current.removeEventListener("loadedmetadata", didLoad);
        continueRender(newHandle);
      };
    }, [
      src,
      onDuration,
      needsToRenderAudioTag,
      delayRenderRetries,
      delayRenderTimeoutInMilliseconds
    ]);
    if (!needsToRenderAudioTag) {
      return null;
    }
    return (0, import_jsx_runtime.jsx)("audio", { ref: audioRef, ...nativeProps });
  };
  var AudioForRendering = (0, import_react.forwardRef)(AudioForRenderingRefForwardingFunction);
  var AudioRefForwardingFunction = (props, ref) => {
    var _a, _b, _c;
    const audioContext = (0, import_react.useContext)(SharedAudioContext);
    const { startFrom, endAt, name, stack, pauseWhenBuffering, showInTimeline, ...otherProps } = props;
    const { loop, ...propsOtherThanLoop } = props;
    const { fps } = useVideoConfig();
    const environment = getRemotionEnvironment();
    const { durations, setDurations } = (0, import_react.useContext)(DurationsContext);
    if (typeof props.src !== "string") {
      throw new TypeError(`The \`<Audio>\` tag requires a string for \`src\`, but got ${JSON.stringify(props.src)} instead.`);
    }
    const preloadedSrc = usePreload(props.src);
    const onError = (0, import_react.useCallback)((e) => {
      console.log(e.currentTarget.error);
      const errMessage = `Could not play audio with src ${preloadedSrc}: ${e.currentTarget.error}. See https://remotion.dev/docs/media-playback-error for help.`;
      if (loop) {
        cancelRender(new Error(errMessage));
      } else {
        console.warn(errMessage);
      }
    }, [loop, preloadedSrc]);
    const onDuration = (0, import_react.useCallback)((src, durationInSeconds) => {
      setDurations({ type: "got-duration", durationInSeconds, src });
    }, [setDurations]);
    const durationFetched = (_a = durations[getAbsoluteSrc(preloadedSrc)]) !== null && _a !== void 0 ? _a : durations[getAbsoluteSrc(props.src)];
    if (loop && durationFetched !== void 0) {
      const duration = durationFetched * fps;
      return (0, import_jsx_runtime.jsx)(Loop, { layout: "none", durationInFrames: calculateLoopDuration({
        endAt,
        mediaDuration: duration,
        playbackRate: (_b = props.playbackRate) !== null && _b !== void 0 ? _b : 1,
        startFrom
      }), children: (0, import_jsx_runtime.jsx)(Audio, { ...propsOtherThanLoop, ref, _remotionInternalNativeLoopPassed: true }) });
    }
    if (typeof startFrom !== "undefined" || typeof endAt !== "undefined") {
      validateStartFromProps(startFrom, endAt);
      const startFromFrameNo = startFrom !== null && startFrom !== void 0 ? startFrom : 0;
      const endAtFrameNo = endAt !== null && endAt !== void 0 ? endAt : Infinity;
      return (0, import_jsx_runtime.jsx)(Sequence, { layout: "none", from: 0 - startFromFrameNo, showInTimeline: false, durationInFrames: endAtFrameNo, name, children: (0, import_jsx_runtime.jsx)(Audio, { _remotionInternalNeedsDurationCalculation: Boolean(loop), pauseWhenBuffering: pauseWhenBuffering !== null && pauseWhenBuffering !== void 0 ? pauseWhenBuffering : false, ...otherProps, ref }) });
    }
    validateMediaProps(props, "Audio");
    if (environment.isRendering) {
      return (0, import_jsx_runtime.jsx)(AudioForRendering, { onDuration, ...props, ref, onError, _remotionInternalNeedsDurationCalculation: Boolean(loop) });
    }
    return (0, import_jsx_runtime.jsx)(AudioForPreview, {
      _remotionInternalNativeLoopPassed: (_c = props._remotionInternalNativeLoopPassed) !== null && _c !== void 0 ? _c : false,
      _remotionInternalStack: stack !== null && stack !== void 0 ? stack : null,
      shouldPreMountAudioTags: audioContext !== null && audioContext.numberOfAudioTags > 0,
      ...props,
      ref,
      onError,
      onDuration,
      // Proposal: Make this default to true in v5
      pauseWhenBuffering: pauseWhenBuffering !== null && pauseWhenBuffering !== void 0 ? pauseWhenBuffering : false,
      _remotionInternalNeedsDurationCalculation: Boolean(loop),
      showInTimeline: showInTimeline !== null && showInTimeline !== void 0 ? showInTimeline : true
    });
  };
  var Audio = (0, import_react.forwardRef)(AudioRefForwardingFunction);
  addSequenceStackTraces(Audio);
  var FolderContext = (0, import_react.createContext)({
    folderName: null,
    parentName: null
  });
  var rotate = {
    transform: `rotate(90deg)`
  };
  var ICON_SIZE = 40;
  var label = {
    color: "white",
    fontSize: 14,
    fontFamily: "sans-serif"
  };
  var container = {
    justifyContent: "center",
    alignItems: "center"
  };
  var Loading = () => {
    return (0, import_jsx_runtime.jsxs)(AbsoluteFill, { style: container, id: "remotion-comp-loading", children: [(0, import_jsx_runtime.jsx)("style", { type: "text/css", children: `
				@keyframes anim {
					from {
						opacity: 0
					}
					to {
						opacity: 1
					}
				}
				#remotion-comp-loading {
					animation: anim 2s;
					animation-fill-mode: forwards;
				}
			` }), (0, import_jsx_runtime.jsx)("svg", { width: ICON_SIZE, height: ICON_SIZE, viewBox: "-100 -100 400 400", style: rotate, children: (0, import_jsx_runtime.jsx)("path", { fill: "#555", stroke: "#555", strokeWidth: "100", strokeLinejoin: "round", d: "M 2 172 a 196 100 0 0 0 195 5 A 196 240 0 0 0 100 2.259 A 196 240 0 0 0 2 172 z" }) }), (0, import_jsx_runtime.jsxs)("p", { style: label, children: ["Resolving ", "<Suspense>", "..."] })] });
  };
  var _portalNode = null;
  var portalNode = () => {
    if (!_portalNode) {
      if (typeof document === "undefined") {
        throw new Error("Tried to call an API that only works in the browser from outside the browser");
      }
      _portalNode = document.createElement("div");
      _portalNode.style.position = "absolute";
      _portalNode.style.top = "0px";
      _portalNode.style.left = "0px";
      _portalNode.style.right = "0px";
      _portalNode.style.bottom = "0px";
      _portalNode.style.width = "100%";
      _portalNode.style.height = "100%";
      _portalNode.style.display = "flex";
      _portalNode.style.flexDirection = "column";
      const containerNode = document.createElement("div");
      containerNode.style.position = "fixed";
      containerNode.style.top = "-999999px";
      containerNode.appendChild(_portalNode);
      document.body.appendChild(containerNode);
    }
    return _portalNode;
  };
  var useLazyComponent = (compProps) => {
    const lazy = (0, import_react.useMemo)(() => {
      if ("lazyComponent" in compProps) {
        return import_react.default.lazy(compProps.lazyComponent);
      }
      if ("component" in compProps) {
        if (typeof document === "undefined") {
          return compProps.component;
        }
        return import_react.default.lazy(() => Promise.resolve({ default: compProps.component }));
      }
      throw new Error("You must pass either 'component' or 'lazyComponent'");
    }, [compProps.component, compProps.lazyComponent]);
    return lazy;
  };
  var getRegex = () => /^([a-zA-Z0-9-\u4E00-\u9FFF])+$/g;
  var isCompositionIdValid = (id) => id.match(getRegex());
  var validateCompositionId = (id) => {
    if (!isCompositionIdValid(id)) {
      throw new Error(`Composition id can only contain a-z, A-Z, 0-9 and -. You passed ${id}`);
    }
  };
  var invalidCompositionErrorMessage = `Composition ID must match ${String(getRegex())}`;
  var validateDefaultAndInputProps = (defaultProps, name, compositionId) => {
    if (!defaultProps) {
      return;
    }
    if (typeof defaultProps !== "object") {
      throw new Error(`"${name}" must be an object, but you passed a value of type ${typeof defaultProps}`);
    }
    if (Array.isArray(defaultProps)) {
      throw new Error(`"${name}" must be an object, an array was passed ${compositionId ? `for composition "${compositionId}"` : ""}`);
    }
  };
  var ClipComposition = ({ children }) => {
    const { clipRegion } = (0, import_react.useContext)(NativeLayersContext);
    const style = (0, import_react.useMemo)(() => {
      return {
        display: "flex",
        flexDirection: "row",
        opacity: clipRegion === "hide" ? 0 : 1,
        clipPath: clipRegion && clipRegion !== "hide" ? `polygon(${clipRegion.x}px ${clipRegion.y}px, ${clipRegion.x}px ${clipRegion.height + clipRegion.y}px, ${clipRegion.width + clipRegion.x}px ${clipRegion.height + clipRegion.y}px, ${clipRegion.width + clipRegion.x}px ${clipRegion.y}px)` : void 0
      };
    }, [clipRegion]);
    return (0, import_jsx_runtime.jsx)(AbsoluteFill, { style, children });
  };
  var Fallback = () => {
    (0, import_react.useEffect)(() => {
      const fallback = delayRender("Waiting for Root component to unsuspend");
      return () => continueRender(fallback);
    }, []);
    return null;
  };
  var Composition = ({ width, height, fps, durationInFrames, id, defaultProps, schema, ...compProps }) => {
    var _a, _b;
    const { registerComposition, unregisterComposition } = (0, import_react.useContext)(CompositionManager);
    const video = useVideo();
    const lazy = useLazyComponent(compProps);
    const nonce = useNonce();
    const isPlayer = useIsPlayer();
    const environment = getRemotionEnvironment();
    const canUseComposition = (0, import_react.useContext)(CanUseRemotionHooks);
    if (canUseComposition) {
      if (isPlayer) {
        throw new Error("<Composition> was mounted inside the `component` that was passed to the <Player>. See https://remotion.dev/docs/wrong-composition-mount for help.");
      }
      throw new Error("<Composition> mounted inside another composition. See https://remotion.dev/docs/wrong-composition-mount for help.");
    }
    const { folderName, parentName } = (0, import_react.useContext)(FolderContext);
    (0, import_react.useEffect)(() => {
      var _a2;
      if (!id) {
        throw new Error("No id for composition passed.");
      }
      validateCompositionId(id);
      validateDefaultAndInputProps(defaultProps, "defaultProps", id);
      registerComposition({
        durationInFrames: durationInFrames !== null && durationInFrames !== void 0 ? durationInFrames : void 0,
        fps: fps !== null && fps !== void 0 ? fps : void 0,
        height: height !== null && height !== void 0 ? height : void 0,
        width: width !== null && width !== void 0 ? width : void 0,
        id,
        folderName,
        component: lazy,
        defaultProps,
        nonce,
        parentFolderName: parentName,
        schema: schema !== null && schema !== void 0 ? schema : null,
        calculateMetadata: (_a2 = compProps.calculateMetadata) !== null && _a2 !== void 0 ? _a2 : null
      });
      return () => {
        unregisterComposition(id);
      };
    }, [
      durationInFrames,
      fps,
      height,
      lazy,
      id,
      folderName,
      defaultProps,
      registerComposition,
      unregisterComposition,
      width,
      nonce,
      parentName,
      schema,
      compProps.calculateMetadata
    ]);
    const resolved = useResolvedVideoConfig(id);
    if (environment.isStudio && video && video.component === lazy) {
      const Comp = lazy;
      if (resolved === null || resolved.type !== "success") {
        return null;
      }
      return (0, import_react_dom.createPortal)((0, import_jsx_runtime.jsx)(ClipComposition, { children: (0, import_jsx_runtime.jsx)(CanUseRemotionHooksProvider, { children: (0, import_jsx_runtime.jsx)(import_react.Suspense, { fallback: (0, import_jsx_runtime.jsx)(Loading, {}), children: (0, import_jsx_runtime.jsx)(Comp, { ...(_a = resolved.result.props) !== null && _a !== void 0 ? _a : {} }) }) }) }), portalNode());
    }
    if (environment.isRendering && video && video.component === lazy) {
      const Comp = lazy;
      if (resolved === null || resolved.type !== "success") {
        return null;
      }
      return (0, import_react_dom.createPortal)((0, import_jsx_runtime.jsx)(CanUseRemotionHooksProvider, { children: (0, import_jsx_runtime.jsx)(import_react.Suspense, { fallback: (0, import_jsx_runtime.jsx)(Fallback, {}), children: (0, import_jsx_runtime.jsx)(Comp, { ...(_b = resolved.result.props) !== null && _b !== void 0 ? _b : {} }) }) }), portalNode());
    }
    return null;
  };
  var NEWTON_ITERATIONS = 4;
  var NEWTON_MIN_SLOPE = 1e-3;
  var SUBDIVISION_PRECISION = 1e-7;
  var SUBDIVISION_MAX_ITERATIONS = 10;
  var kSplineTableSize = 11;
  var kSampleStepSize = 1 / (kSplineTableSize - 1);
  var float32ArraySupported = typeof Float32Array === "function";
  function a(aA1, aA2) {
    return 1 - 3 * aA2 + 3 * aA1;
  }
  function b(aA1, aA2) {
    return 3 * aA2 - 6 * aA1;
  }
  function c(aA1) {
    return 3 * aA1;
  }
  function calcBezier(aT, aA1, aA2) {
    return ((a(aA1, aA2) * aT + b(aA1, aA2)) * aT + c(aA1)) * aT;
  }
  function getSlope(aT, aA1, aA2) {
    return 3 * a(aA1, aA2) * aT * aT + 2 * b(aA1, aA2) * aT + c(aA1);
  }
  function binarySubdivide({ aX, _aA, _aB, mX1, mX2 }) {
    let currentX;
    let currentT;
    let i = 0;
    let aA = _aA;
    let aB = _aB;
    do {
      currentT = aA + (aB - aA) / 2;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0) {
        aB = currentT;
      } else {
        aA = currentT;
      }
    } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
    return currentT;
  }
  function newtonRaphsonIterate(aX, _aGuessT, mX1, mX2) {
    let aGuessT = _aGuessT;
    for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
      const currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0) {
        return aGuessT;
      }
      const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }
  function bezier(mX1, mY1, mX2, mY2) {
    if (!(mX1 >= 0 && mX1 <= 1 && mX2 >= 0 && mX2 <= 1)) {
      throw new Error("bezier x values must be in [0, 1] range");
    }
    const sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
    if (mX1 !== mY1 || mX2 !== mY2) {
      for (let i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }
    function getTForX(aX) {
      let intervalStart = 0;
      let currentSample = 1;
      const lastSample = kSplineTableSize - 1;
      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }
      --currentSample;
      const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      const guessForT = intervalStart + dist * kSampleStepSize;
      const initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      }
      if (initialSlope === 0) {
        return guessForT;
      }
      return binarySubdivide({
        aX,
        _aA: intervalStart,
        _aB: intervalStart + kSampleStepSize,
        mX1,
        mX2
      });
    }
    return function(x) {
      if (mX1 === mY1 && mX2 === mY2) {
        return x;
      }
      if (x === 0) {
        return 0;
      }
      if (x === 1) {
        return 1;
      }
      return calcBezier(getTForX(x), mY1, mY2);
    };
  }
  var Easing = class _Easing {
    static step0(n) {
      return n > 0 ? 1 : 0;
    }
    static step1(n) {
      return n >= 1 ? 1 : 0;
    }
    static linear(t) {
      return t;
    }
    static ease(t) {
      return _Easing.bezier(0.42, 0, 1, 1)(t);
    }
    static quad(t) {
      return t * t;
    }
    static cubic(t) {
      return t * t * t;
    }
    static poly(n) {
      return (t) => t ** n;
    }
    static sin(t) {
      return 1 - Math.cos(t * Math.PI / 2);
    }
    static circle(t) {
      return 1 - Math.sqrt(1 - t * t);
    }
    static exp(t) {
      return 2 ** (10 * (t - 1));
    }
    static elastic(bounciness = 1) {
      const p2 = bounciness * Math.PI;
      return (t) => 1 - Math.cos(t * Math.PI / 2) ** 3 * Math.cos(t * p2);
    }
    static back(s = 1.70158) {
      return (t) => t * t * ((s + 1) * t - s);
    }
    static bounce(t) {
      if (t < 1 / 2.75) {
        return 7.5625 * t * t;
      }
      if (t < 2 / 2.75) {
        const t2_ = t - 1.5 / 2.75;
        return 7.5625 * t2_ * t2_ + 0.75;
      }
      if (t < 2.5 / 2.75) {
        const t2_ = t - 2.25 / 2.75;
        return 7.5625 * t2_ * t2_ + 0.9375;
      }
      const t2 = t - 2.625 / 2.75;
      return 7.5625 * t2 * t2 + 0.984375;
    }
    static bezier(x1, y1, x2, y2) {
      return bezier(x1, y1, x2, y2);
    }
    static in(easing) {
      return easing;
    }
    static out(easing) {
      return (t) => 1 - easing(1 - t);
    }
    static inOut(easing) {
      return (t) => {
        if (t < 0.5) {
          return easing(t * 2) / 2;
        }
        return 1 - easing((1 - t) * 2) / 2;
      };
    }
  };
  var IFrameRefForwarding = ({ onLoad, onError, delayRenderRetries, delayRenderTimeoutInMilliseconds, ...props }, ref) => {
    const [handle] = (0, import_react.useState)(() => delayRender(`Loading <IFrame> with source ${props.src}`, {
      retries: delayRenderRetries !== null && delayRenderRetries !== void 0 ? delayRenderRetries : void 0,
      timeoutInMilliseconds: delayRenderTimeoutInMilliseconds !== null && delayRenderTimeoutInMilliseconds !== void 0 ? delayRenderTimeoutInMilliseconds : void 0
    }));
    const didLoad = (0, import_react.useCallback)((e) => {
      continueRender(handle);
      onLoad === null || onLoad === void 0 ? void 0 : onLoad(e);
    }, [handle, onLoad]);
    const didGetError = (0, import_react.useCallback)((e) => {
      continueRender(handle);
      if (onError) {
        onError(e);
      } else {
        console.error("Error loading iframe:", e, "Handle the event using the onError() prop to make this message disappear.");
      }
    }, [handle, onError]);
    return (0, import_jsx_runtime.jsx)("iframe", { ...props, ref, onError: didGetError, onLoad: didLoad });
  };
  var IFrame = (0, import_react.forwardRef)(IFrameRefForwarding);
  function exponentialBackoff(errorCount) {
    return 1e3 * 2 ** (errorCount - 1);
  }
  var ImgRefForwarding = ({ onError, maxRetries = 2, src, pauseWhenLoading, delayRenderRetries, delayRenderTimeoutInMilliseconds, ...props }, ref) => {
    const imageRef = (0, import_react.useRef)(null);
    const errors = (0, import_react.useRef)({});
    const { delayPlayback } = useBufferState();
    const sequenceContext = (0, import_react.useContext)(SequenceContext);
    if (!src) {
      throw new Error('No "src" prop was passed to <Img>.');
    }
    (0, import_react.useImperativeHandle)(ref, () => {
      return imageRef.current;
    }, []);
    const actualSrc = usePreload(src);
    const retryIn = (0, import_react.useCallback)((timeout) => {
      if (!imageRef.current) {
        return;
      }
      const currentSrc = imageRef.current.src;
      setTimeout(() => {
        var _a;
        if (!imageRef.current) {
          return;
        }
        const newSrc = (_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.src;
        if (newSrc !== currentSrc) {
          return;
        }
        imageRef.current.removeAttribute("src");
        imageRef.current.setAttribute("src", newSrc);
      }, timeout);
    }, []);
    const didGetError = (0, import_react.useCallback)((e) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
      if (!errors.current) {
        return;
      }
      errors.current[(_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.src] = ((_c = errors.current[(_b = imageRef.current) === null || _b === void 0 ? void 0 : _b.src]) !== null && _c !== void 0 ? _c : 0) + 1;
      if (onError && ((_e = errors.current[(_d = imageRef.current) === null || _d === void 0 ? void 0 : _d.src]) !== null && _e !== void 0 ? _e : 0) > maxRetries) {
        onError(e);
        return;
      }
      if (((_g = errors.current[(_f = imageRef.current) === null || _f === void 0 ? void 0 : _f.src]) !== null && _g !== void 0 ? _g : 0) <= maxRetries) {
        const backoff = exponentialBackoff((_j = errors.current[(_h = imageRef.current) === null || _h === void 0 ? void 0 : _h.src]) !== null && _j !== void 0 ? _j : 0);
        console.warn(`Could not load image with source ${(_k = imageRef.current) === null || _k === void 0 ? void 0 : _k.src}, retrying again in ${backoff}ms`);
        retryIn(backoff);
        return;
      }
      cancelRender("Error loading image with src: " + ((_l = imageRef.current) === null || _l === void 0 ? void 0 : _l.src));
    }, [maxRetries, onError, retryIn]);
    if (typeof window !== "undefined") {
      (0, import_react.useLayoutEffect)(() => {
        if (false) {
          return;
        }
        const newHandle = delayRender("Loading <Img> with src=" + actualSrc, {
          retries: delayRenderRetries !== null && delayRenderRetries !== void 0 ? delayRenderRetries : void 0,
          timeoutInMilliseconds: delayRenderTimeoutInMilliseconds !== null && delayRenderTimeoutInMilliseconds !== void 0 ? delayRenderTimeoutInMilliseconds : void 0
        });
        const unblock = pauseWhenLoading && !(sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.premounting) ? delayPlayback().unblock : () => void 0;
        const { current } = imageRef;
        const onComplete = () => {
          var _a, _b, _c, _d;
          if (((_b = errors.current[(_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.src]) !== null && _b !== void 0 ? _b : 0) > 0) {
            delete errors.current[(_c = imageRef.current) === null || _c === void 0 ? void 0 : _c.src];
            console.info(`Retry successful - ${(_d = imageRef.current) === null || _d === void 0 ? void 0 : _d.src} is now loaded`);
          }
          unblock();
          continueRender(newHandle);
        };
        const didLoad = () => {
          onComplete();
        };
        if (current === null || current === void 0 ? void 0 : current.complete) {
          onComplete();
        } else {
          current === null || current === void 0 ? void 0 : current.addEventListener("load", didLoad, { once: true });
        }
        return () => {
          current === null || current === void 0 ? void 0 : current.removeEventListener("load", didLoad);
          unblock();
          continueRender(newHandle);
        };
      }, [
        actualSrc,
        delayPlayback,
        delayRenderRetries,
        delayRenderTimeoutInMilliseconds,
        pauseWhenLoading,
        sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.premounting
      ]);
    }
    return (0, import_jsx_runtime.jsx)("img", { ...props, ref: imageRef, src: actualSrc, onError: didGetError });
  };
  var Img = (0, import_react.forwardRef)(ImgRefForwarding);
  var compositionsRef = import_react.default.createRef();
  var CompositionManagerProvider = ({ children, numberOfAudioTags }) => {
    var _a;
    const [compositions, setCompositions] = (0, import_react.useState)([]);
    const currentcompositionsRef = (0, import_react.useRef)(compositions);
    const [folders, setFolders] = (0, import_react.useState)([]);
    const [canvasContent, setCanvasContent] = (0, import_react.useState)(null);
    const [currentCompositionMetadata, setCurrentCompositionMetadata] = (0, import_react.useState)(null);
    const updateCompositions = (0, import_react.useCallback)((updateComps) => {
      setCompositions((comps) => {
        const updated = updateComps(comps);
        currentcompositionsRef.current = updated;
        return updated;
      });
    }, []);
    const registerComposition = (0, import_react.useCallback)((comp) => {
      updateCompositions((comps) => {
        if (comps.find((c2) => c2.id === comp.id)) {
          throw new Error(`Multiple composition with id ${comp.id} are registered.`);
        }
        const value = [...comps, comp].slice().sort((a2, b2) => a2.nonce - b2.nonce);
        return value;
      });
    }, [updateCompositions]);
    const unregisterComposition = (0, import_react.useCallback)((id) => {
      setCompositions((comps) => {
        return comps.filter((c2) => c2.id !== id);
      });
    }, []);
    const registerFolder = (0, import_react.useCallback)((name, parent) => {
      setFolders((prevFolders) => {
        return [
          ...prevFolders,
          {
            name,
            parent
          }
        ];
      });
    }, []);
    const unregisterFolder = (0, import_react.useCallback)((name, parent) => {
      setFolders((prevFolders) => {
        return prevFolders.filter((p2) => !(p2.name === name && p2.parent === parent));
      });
    }, []);
    (0, import_react.useImperativeHandle)(compositionsRef, () => {
      return {
        getCompositions: () => currentcompositionsRef.current
      };
    }, []);
    const composition = compositions.find((c2) => (canvasContent === null || canvasContent === void 0 ? void 0 : canvasContent.type) === "composition" ? c2.id === canvasContent.compositionId : null);
    const contextValue = (0, import_react.useMemo)(() => {
      return {
        compositions,
        registerComposition,
        unregisterComposition,
        folders,
        registerFolder,
        unregisterFolder,
        currentCompositionMetadata,
        setCurrentCompositionMetadata,
        canvasContent,
        setCanvasContent
      };
    }, [
      compositions,
      registerComposition,
      unregisterComposition,
      folders,
      registerFolder,
      unregisterFolder,
      currentCompositionMetadata,
      canvasContent,
      setCanvasContent
    ]);
    return (0, import_jsx_runtime.jsx)(CompositionManager.Provider, { value: contextValue, children: (0, import_jsx_runtime.jsx)(SequenceManagerProvider, { children: (0, import_jsx_runtime.jsx)(RenderAssetManagerProvider, { children: (0, import_jsx_runtime.jsx)(ResolveCompositionConfig, { children: (0, import_jsx_runtime.jsx)(SharedAudioContextProvider, { numberOfAudioTags, component: (_a = composition === null || composition === void 0 ? void 0 : composition.component) !== null && _a !== void 0 ? _a : null, children }) }) }) }) });
  };
  var injected = {};
  var injectCSS = (css) => {
    if (typeof document === "undefined") {
      return;
    }
    if (injected[css]) {
      return;
    }
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    head.prepend(style);
    injected[css] = true;
  };
  var OFFTHREAD_VIDEO_CLASS_NAME = "__remotion_offthreadvideo";
  var makeDefaultCSS = (scope, backgroundColor) => {
    if (!scope) {
      return `
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
	    background-color: ${backgroundColor};
    }
    .${OFFTHREAD_VIDEO_CLASS_NAME} {
      object-fit: contain;
    }
    `;
    }
    return `
    ${scope} * {
      box-sizing: border-box;
    }
    ${scope} *:-webkit-full-screen {
      width: 100%;
      height: 100%;
    }
    ${scope} .${OFFTHREAD_VIDEO_CLASS_NAME} {
      object-fit: contain;
    }
  `;
  };
  var CSSUtils = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    injectCSS,
    OFFTHREAD_VIDEO_CLASS_NAME,
    makeDefaultCSS
  });
  var REMOTION_STUDIO_CONTAINER_ELEMENT = "__remotion-studio-container";
  var getPreviewDomElement = () => {
    return document.getElementById(REMOTION_STUDIO_CONTAINER_ELEMENT);
  };
  var NUMBER = "[-+]?\\d*\\.?\\d+";
  var PERCENTAGE = NUMBER + "%";
  var colorNames = {
    transparent: 0,
    // http://www.w3.org/TR/css3-color/#svg-color
    aliceblue: 4042850303,
    antiquewhite: 4209760255,
    aqua: 16777215,
    aquamarine: 2147472639,
    azure: 4043309055,
    beige: 4126530815,
    bisque: 4293182719,
    black: 255,
    blanchedalmond: 4293643775,
    blue: 65535,
    blueviolet: 2318131967,
    brown: 2771004159,
    burlywood: 3736635391,
    burntsienna: 3934150143,
    cadetblue: 1604231423,
    chartreuse: 2147418367,
    chocolate: 3530104575,
    coral: 4286533887,
    cornflowerblue: 1687547391,
    cornsilk: 4294499583,
    crimson: 3692313855,
    cyan: 16777215,
    darkblue: 35839,
    darkcyan: 9145343,
    darkgoldenrod: 3095792639,
    darkgray: 2846468607,
    darkgreen: 6553855,
    darkgrey: 2846468607,
    darkkhaki: 3182914559,
    darkmagenta: 2332068863,
    darkolivegreen: 1433087999,
    darkorange: 4287365375,
    darkorchid: 2570243327,
    darkred: 2332033279,
    darksalmon: 3918953215,
    darkseagreen: 2411499519,
    darkslateblue: 1211993087,
    darkslategray: 793726975,
    darkslategrey: 793726975,
    darkturquoise: 13554175,
    darkviolet: 2483082239,
    deeppink: 4279538687,
    deepskyblue: 12582911,
    dimgray: 1768516095,
    dimgrey: 1768516095,
    dodgerblue: 512819199,
    firebrick: 2988581631,
    floralwhite: 4294635775,
    forestgreen: 579543807,
    fuchsia: 4278255615,
    gainsboro: 3705462015,
    ghostwhite: 4177068031,
    gold: 4292280575,
    goldenrod: 3668254975,
    gray: 2155905279,
    green: 8388863,
    greenyellow: 2919182335,
    grey: 2155905279,
    honeydew: 4043305215,
    hotpink: 4285117695,
    indianred: 3445382399,
    indigo: 1258324735,
    ivory: 4294963455,
    khaki: 4041641215,
    lavender: 3873897215,
    lavenderblush: 4293981695,
    lawngreen: 2096890111,
    lemonchiffon: 4294626815,
    lightblue: 2916673279,
    lightcoral: 4034953471,
    lightcyan: 3774873599,
    lightgoldenrodyellow: 4210742015,
    lightgray: 3553874943,
    lightgreen: 2431553791,
    lightgrey: 3553874943,
    lightpink: 4290167295,
    lightsalmon: 4288707327,
    lightseagreen: 548580095,
    lightskyblue: 2278488831,
    lightslategray: 2005441023,
    lightslategrey: 2005441023,
    lightsteelblue: 2965692159,
    lightyellow: 4294959359,
    lime: 16711935,
    limegreen: 852308735,
    linen: 4210091775,
    magenta: 4278255615,
    maroon: 2147483903,
    mediumaquamarine: 1724754687,
    mediumblue: 52735,
    mediumorchid: 3126187007,
    mediumpurple: 2473647103,
    mediumseagreen: 1018393087,
    mediumslateblue: 2070474495,
    mediumspringgreen: 16423679,
    mediumturquoise: 1221709055,
    mediumvioletred: 3340076543,
    midnightblue: 421097727,
    mintcream: 4127193855,
    mistyrose: 4293190143,
    moccasin: 4293178879,
    navajowhite: 4292783615,
    navy: 33023,
    oldlace: 4260751103,
    olive: 2155872511,
    olivedrab: 1804477439,
    orange: 4289003775,
    orangered: 4282712319,
    orchid: 3664828159,
    palegoldenrod: 4008225535,
    palegreen: 2566625535,
    paleturquoise: 2951671551,
    palevioletred: 3681588223,
    papayawhip: 4293907967,
    peachpuff: 4292524543,
    peru: 3448061951,
    pink: 4290825215,
    plum: 3718307327,
    powderblue: 2967529215,
    purple: 2147516671,
    rebeccapurple: 1714657791,
    red: 4278190335,
    rosybrown: 3163525119,
    royalblue: 1097458175,
    saddlebrown: 2336560127,
    salmon: 4202722047,
    sandybrown: 4104413439,
    seagreen: 780883967,
    seashell: 4294307583,
    sienna: 2689740287,
    silver: 3233857791,
    skyblue: 2278484991,
    slateblue: 1784335871,
    slategray: 1887473919,
    slategrey: 1887473919,
    snow: 4294638335,
    springgreen: 16744447,
    steelblue: 1182971135,
    tan: 3535047935,
    teal: 8421631,
    thistle: 3636451583,
    tomato: 4284696575,
    turquoise: 1088475391,
    violet: 4001558271,
    wheat: 4125012991,
    white: 4294967295,
    whitesmoke: 4126537215,
    yellow: 4294902015,
    yellowgreen: 2597139199
  };
  var Root = null;
  var listeners = [];
  var getRoot = () => {
    return Root;
  };
  var waitForRoot = (fn) => {
    if (Root) {
      fn(Root);
      return () => void 0;
    }
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  };
  var RemotionRoot = ({ children, numberOfAudioTags }) => {
    const [remotionRootId] = (0, import_react.useState)(() => String(random(null)));
    const [frame, setFrame] = (0, import_react.useState)(() => getInitialFrameState());
    const [playing, setPlaying] = (0, import_react.useState)(false);
    const imperativePlaying = (0, import_react.useRef)(false);
    const [fastRefreshes, setFastRefreshes] = (0, import_react.useState)(0);
    const [playbackRate, setPlaybackRate] = (0, import_react.useState)(1);
    const audioAndVideoTags = (0, import_react.useRef)([]);
    if (typeof window !== "undefined") {
      (0, import_react.useLayoutEffect)(() => {
        window.remotion_setFrame = (f, composition, attempt) => {
          window.remotion_attempt = attempt;
          const id = delayRender(`Setting the current frame to ${f}`);
          setFrame((s) => ({
            ...s,
            [composition]: f
          }));
          requestAnimationFrame(() => continueRender(id));
        };
        window.remotion_isPlayer = false;
      }, []);
    }
    const timelineContextValue = (0, import_react.useMemo)(() => {
      return {
        frame,
        playing,
        imperativePlaying,
        rootId: remotionRootId,
        playbackRate,
        setPlaybackRate,
        audioAndVideoTags
      };
    }, [frame, playbackRate, playing, remotionRootId]);
    const setTimelineContextValue = (0, import_react.useMemo)(() => {
      return {
        setFrame,
        setPlaying
      };
    }, []);
    const nonceContext = (0, import_react.useMemo)(() => {
      let counter = 0;
      return {
        getNonce: () => counter++,
        fastRefreshes
      };
    }, [fastRefreshes]);
    (0, import_react.useEffect)(() => {
      if (typeof __webpack_module__ !== "undefined") {
        if (__webpack_module__.hot) {
          __webpack_module__.hot.addStatusHandler((status) => {
            if (status === "idle") {
              setFastRefreshes((i) => i + 1);
            }
          });
        }
      }
    }, []);
    return (0, import_jsx_runtime.jsx)(NonceContext.Provider, { value: nonceContext, children: (0, import_jsx_runtime.jsx)(TimelineContext.Provider, { value: timelineContextValue, children: (0, import_jsx_runtime.jsx)(SetTimelineContext.Provider, { value: setTimelineContextValue, children: (0, import_jsx_runtime.jsx)(EditorPropsProvider, { children: (0, import_jsx_runtime.jsx)(PrefetchProvider, { children: (0, import_jsx_runtime.jsx)(NativeLayersProvider, { children: (0, import_jsx_runtime.jsx)(CompositionManagerProvider, { numberOfAudioTags, children: (0, import_jsx_runtime.jsx)(DurationsContextProvider, { children: (0, import_jsx_runtime.jsx)(BufferingProvider, { children }) }) }) }) }) }) }) }) });
  };
  var getEnvVariables = () => {
    if (getRemotionEnvironment().isRendering) {
      const param = window.remotion_envVariables;
      if (!param) {
        return {};
      }
      return { ...JSON.parse(param), NODE_ENV: "production" };
    }
    if (false) {
      throw new Error(`${getEnvVar()} is not set`);
    }
    return {
      NODE_ENV: "production"
    };
  };
  var setupEnvVariables = () => {
    const env = getEnvVariables();
    if (!window.process) {
      window.process = {};
    }
    if (!window.process.env) {
      window.process.env = {};
    }
    Object.keys(env).forEach((key) => {
      window.process.env[key] = env[key];
    });
  };
  var CurrentScaleContext = import_react.default.createContext(null);
  var PreviewSizeContext = (0, import_react.createContext)({
    setSize: () => void 0,
    size: { size: "auto", translation: { x: 0, y: 0 } }
  });
  var calculateScale = ({ canvasSize, compositionHeight, compositionWidth, previewSize }) => {
    const heightRatio = canvasSize.height / compositionHeight;
    const widthRatio = canvasSize.width / compositionWidth;
    const ratio = Math.min(heightRatio, widthRatio);
    return previewSize === "auto" ? ratio : Number(previewSize);
  };
  var WATCH_REMOTION_STATIC_FILES = "remotion_staticFilesChanged";
  function useRemotionContexts() {
    const compositionManagerCtx = import_react.default.useContext(CompositionManager);
    const timelineContext = import_react.default.useContext(TimelineContext);
    const setTimelineContext = import_react.default.useContext(SetTimelineContext);
    const sequenceContext = import_react.default.useContext(SequenceContext);
    const nonceContext = import_react.default.useContext(NonceContext);
    const canUseRemotionHooksContext = import_react.default.useContext(CanUseRemotionHooks);
    const nativeLayersContext = import_react.default.useContext(NativeLayersContext);
    const preloadContext = import_react.default.useContext(PreloadContext);
    const resolveCompositionContext = import_react.default.useContext(ResolveCompositionContext);
    const renderAssetManagerContext = import_react.default.useContext(RenderAssetManager);
    const sequenceManagerContext = import_react.default.useContext(SequenceManager);
    const bufferManagerContext = import_react.default.useContext(BufferingContextReact);
    return (0, import_react.useMemo)(() => ({
      compositionManagerCtx,
      timelineContext,
      setTimelineContext,
      sequenceContext,
      nonceContext,
      canUseRemotionHooksContext,
      nativeLayersContext,
      preloadContext,
      resolveCompositionContext,
      renderAssetManagerContext,
      sequenceManagerContext,
      bufferManagerContext
    }), [
      compositionManagerCtx,
      nonceContext,
      sequenceContext,
      setTimelineContext,
      timelineContext,
      canUseRemotionHooksContext,
      nativeLayersContext,
      preloadContext,
      resolveCompositionContext,
      renderAssetManagerContext,
      sequenceManagerContext,
      bufferManagerContext
    ]);
  }
  var RemotionContextProvider = (props) => {
    const { children, contexts } = props;
    return (0, import_jsx_runtime.jsx)(CanUseRemotionHooks.Provider, { value: contexts.canUseRemotionHooksContext, children: (0, import_jsx_runtime.jsx)(NonceContext.Provider, { value: contexts.nonceContext, children: (0, import_jsx_runtime.jsx)(NativeLayersContext.Provider, { value: contexts.nativeLayersContext, children: (0, import_jsx_runtime.jsx)(PreloadContext.Provider, { value: contexts.preloadContext, children: (0, import_jsx_runtime.jsx)(CompositionManager.Provider, { value: contexts.compositionManagerCtx, children: (0, import_jsx_runtime.jsx)(SequenceManager.Provider, { value: contexts.sequenceManagerContext, children: (0, import_jsx_runtime.jsx)(RenderAssetManager.Provider, { value: contexts.renderAssetManagerContext, children: (0, import_jsx_runtime.jsx)(ResolveCompositionContext.Provider, { value: contexts.resolveCompositionContext, children: (0, import_jsx_runtime.jsx)(TimelineContext.Provider, { value: contexts.timelineContext, children: (0, import_jsx_runtime.jsx)(SetTimelineContext.Provider, { value: contexts.setTimelineContext, children: (0, import_jsx_runtime.jsx)(SequenceContext.Provider, { value: contexts.sequenceContext, children: (0, import_jsx_runtime.jsx)(BufferingContextReact.Provider, { value: contexts.bufferManagerContext, children }) }) }) }) }) }) }) }) }) }) }) });
  };
  var Internals = {
    useUnsafeVideoConfig,
    Timeline: TimelinePosition,
    CompositionManager,
    SequenceManager,
    SequenceVisibilityToggleContext,
    RemotionRoot,
    useVideo,
    getRoot,
    useMediaVolumeState,
    useMediaMutedState,
    useLazyComponent,
    truthy,
    SequenceContext,
    useRemotionContexts,
    RemotionContextProvider,
    CSSUtils,
    setupEnvVariables,
    MediaVolumeContext,
    SetMediaVolumeContext,
    getRemotionEnvironment,
    SharedAudioContext,
    SharedAudioContextProvider,
    invalidCompositionErrorMessage,
    isCompositionIdValid,
    getPreviewDomElement,
    compositionsRef,
    portalNode,
    waitForRoot,
    CanUseRemotionHooksProvider,
    CanUseRemotionHooks,
    PrefetchProvider,
    DurationsContextProvider,
    IsPlayerContextProvider,
    useIsPlayer,
    EditorPropsProvider,
    EditorPropsContext,
    usePreload,
    NonceContext,
    resolveVideoConfig,
    useResolvedVideoConfig,
    resolveCompositionsRef,
    ResolveCompositionConfig,
    REMOTION_STUDIO_CONTAINER_ELEMENT,
    RenderAssetManager,
    persistCurrentFrame,
    useTimelineSetFrame,
    FILE_TOKEN,
    DATE_TOKEN,
    NativeLayersProvider,
    ClipComposition,
    isIosSafari,
    WATCH_REMOTION_STATIC_FILES,
    addSequenceStackTraces,
    useMediaStartsAt,
    BufferingProvider,
    BufferingContextReact,
    enableSequenceStackTraces,
    colorNames,
    CurrentScaleContext,
    PreviewSizeContext,
    calculateScale
  };
  var getOffthreadVideoSource = ({ src, transparent, currentTime, toneMapped }) => {
    return `http://localhost:${window.remotion_proxyPort}/proxy?src=${encodeURIComponent(getAbsoluteSrc(src))}&time=${encodeURIComponent(currentTime)}&transparent=${String(transparent)}&toneMapped=${String(toneMapped)}`;
  };
  var flattenChildren = (children) => {
    const childrenArray = import_react.default.Children.toArray(children);
    return childrenArray.reduce((flatChildren, child) => {
      if (child.type === import_react.default.Fragment) {
        return flatChildren.concat(flattenChildren(child.props.children));
      }
      flatChildren.push(child);
      return flatChildren;
    }, []);
  };
  var SeriesSequenceRefForwardingFunction = ({ children }, _ref) => {
    return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
  };
  var SeriesSequence = (0, import_react.forwardRef)(SeriesSequenceRefForwardingFunction);
  var Series = ({ children }) => {
    const childrenValue = (0, import_react.useMemo)(() => {
      let startFrame = 0;
      const flattenedChildren = flattenChildren(children);
      return import_react.Children.map(flattenedChildren, (child, i) => {
        var _a;
        const castedChild = child;
        if (typeof castedChild === "string") {
          if (castedChild.trim() === "") {
            return null;
          }
          throw new TypeError(`The <Series /> component only accepts a list of <Series.Sequence /> components as its children, but you passed a string "${castedChild}"`);
        }
        if (castedChild.type !== SeriesSequence) {
          throw new TypeError(`The <Series /> component only accepts a list of <Series.Sequence /> components as its children, but got ${castedChild} instead`);
        }
        const debugInfo = `index = ${i}, duration = ${castedChild.props.durationInFrames}`;
        if (!(castedChild === null || castedChild === void 0 ? void 0 : castedChild.props.children)) {
          throw new TypeError(`A <Series.Sequence /> component (${debugInfo}) was detected to not have any children. Delete it to fix this error.`);
        }
        const durationInFramesProp = castedChild.props.durationInFrames;
        const { durationInFrames, children: _children, from, name, ...passedProps } = castedChild.props;
        if (i !== flattenedChildren.length - 1 || durationInFramesProp !== Infinity) {
          validateDurationInFrames(durationInFramesProp, {
            component: `of a <Series.Sequence /> component`,
            allowFloats: true
          });
        }
        const offset = (_a = castedChild.props.offset) !== null && _a !== void 0 ? _a : 0;
        if (Number.isNaN(offset)) {
          throw new TypeError(`The "offset" property of a <Series.Sequence /> must not be NaN, but got NaN (${debugInfo}).`);
        }
        if (!Number.isFinite(offset)) {
          throw new TypeError(`The "offset" property of a <Series.Sequence /> must be finite, but got ${offset} (${debugInfo}).`);
        }
        if (offset % 1 !== 0) {
          throw new TypeError(`The "offset" property of a <Series.Sequence /> must be finite, but got ${offset} (${debugInfo}).`);
        }
        const currentStartFrame = startFrame + offset;
        startFrame += durationInFramesProp + offset;
        return (0, import_jsx_runtime.jsx)(Sequence, { name: name || "<Series.Sequence>", from: currentStartFrame, durationInFrames: durationInFramesProp, ...passedProps, ref: castedChild.ref, children: child });
      });
    }, [children]);
    return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: childrenValue });
  };
  Series.Sequence = SeriesSequence;
  addSequenceStackTraces(SeriesSequence);
  var OffthreadVideoForRendering = ({ onError, volume: volumeProp, playbackRate, src, muted, allowAmplificationDuringRender, transparent = false, toneMapped = true, toneFrequency, name, ...props }) => {
    const absoluteFrame = useTimelinePosition();
    const frame = useCurrentFrame();
    const volumePropsFrame = useFrameForVolumeProp();
    const videoConfig = useUnsafeVideoConfig();
    const sequenceContext = (0, import_react.useContext)(SequenceContext);
    const mediaStartsAt = useMediaStartsAt();
    const { registerRenderAsset, unregisterRenderAsset } = (0, import_react.useContext)(RenderAssetManager);
    if (!src) {
      throw new TypeError("No `src` was passed to <OffthreadVideo>.");
    }
    const id = (0, import_react.useMemo)(() => `offthreadvideo-${random(src !== null && src !== void 0 ? src : "")}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames}`, [
      src,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames
    ]);
    if (!videoConfig) {
      throw new Error("No video config found");
    }
    const volume = evaluateVolume({
      volume: volumeProp,
      frame: volumePropsFrame,
      mediaVolume: 1,
      allowAmplificationDuringRender: allowAmplificationDuringRender !== null && allowAmplificationDuringRender !== void 0 ? allowAmplificationDuringRender : false
    });
    (0, import_react.useEffect)(() => {
      if (!src) {
        throw new Error("No src passed");
      }
      if (!window.remotion_audioEnabled) {
        return;
      }
      if (muted) {
        return;
      }
      if (volume <= 0) {
        return;
      }
      registerRenderAsset({
        type: "video",
        src: getAbsoluteSrc(src),
        id,
        frame: absoluteFrame,
        volume,
        mediaFrame: frame,
        playbackRate: playbackRate !== null && playbackRate !== void 0 ? playbackRate : 1,
        allowAmplificationDuringRender: allowAmplificationDuringRender !== null && allowAmplificationDuringRender !== void 0 ? allowAmplificationDuringRender : false,
        toneFrequency: toneFrequency !== null && toneFrequency !== void 0 ? toneFrequency : null
      });
      return () => unregisterRenderAsset(id);
    }, [
      muted,
      src,
      registerRenderAsset,
      id,
      unregisterRenderAsset,
      volume,
      frame,
      absoluteFrame,
      playbackRate,
      allowAmplificationDuringRender,
      toneFrequency
    ]);
    const currentTime = (0, import_react.useMemo)(() => {
      return getExpectedMediaFrameUncorrected({
        frame,
        playbackRate: playbackRate || 1,
        startFrom: -mediaStartsAt
      }) / videoConfig.fps;
    }, [frame, mediaStartsAt, playbackRate, videoConfig.fps]);
    const actualSrc = (0, import_react.useMemo)(() => {
      return getOffthreadVideoSource({
        src,
        currentTime,
        transparent,
        toneMapped
      });
    }, [toneMapped, currentTime, src, transparent]);
    const onErr = (0, import_react.useCallback)((e) => {
      if (onError) {
        onError === null || onError === void 0 ? void 0 : onError(e);
      } else {
        cancelRender("Failed to load image with src " + actualSrc);
      }
    }, [actualSrc, onError]);
    const className2 = (0, import_react.useMemo)(() => {
      return [OFFTHREAD_VIDEO_CLASS_NAME, props.className].filter(truthy).join(" ");
    }, [props.className]);
    return (0, import_jsx_runtime.jsx)(Img, { src: actualSrc, className: className2, ...props, onError: onErr });
  };
  var VideoForDevelopmentRefForwardingFunction = (props, ref) => {
    var _a, _b, _c;
    const videoRef = (0, import_react.useRef)(null);
    const volumePropFrame = useFrameForVolumeProp();
    const { fps, durationInFrames } = useVideoConfig();
    const parentSequence = (0, import_react.useContext)(SequenceContext);
    const { hidden } = (0, import_react.useContext)(SequenceVisibilityToggleContext);
    const [timelineId] = (0, import_react.useState)(() => String(Math.random()));
    const isSequenceHidden = (_a = hidden[timelineId]) !== null && _a !== void 0 ? _a : false;
    const {
      volume,
      muted,
      playbackRate,
      onlyWarnForMediaSeekingError,
      src,
      onDuration,
      // @ts-expect-error
      acceptableTimeShift,
      acceptableTimeShiftInSeconds,
      toneFrequency,
      name,
      _remotionInternalNativeLoopPassed,
      _remotionInternalStack,
      style,
      pauseWhenBuffering,
      showInTimeline,
      ...nativeProps
    } = props;
    if (typeof acceptableTimeShift !== "undefined") {
      throw new Error("acceptableTimeShift has been removed. Use acceptableTimeShiftInSeconds instead.");
    }
    const actualVolume = useMediaTagVolume(videoRef);
    const [mediaVolume] = useMediaVolumeState();
    const [mediaMuted] = useMediaMutedState();
    useMediaInTimeline({
      mediaRef: videoRef,
      volume,
      mediaVolume,
      mediaType: "video",
      src,
      playbackRate: (_b = props.playbackRate) !== null && _b !== void 0 ? _b : 1,
      displayName: name !== null && name !== void 0 ? name : null,
      id: timelineId,
      stack: _remotionInternalStack,
      showInTimeline,
      premountDisplay: null
    });
    useSyncVolumeWithMediaTag({
      volumePropFrame,
      actualVolume,
      volume,
      mediaVolume,
      mediaRef: videoRef
    });
    useMediaPlayback({
      mediaRef: videoRef,
      src,
      mediaType: "video",
      playbackRate: (_c = props.playbackRate) !== null && _c !== void 0 ? _c : 1,
      onlyWarnForMediaSeekingError,
      acceptableTimeshift: acceptableTimeShiftInSeconds !== null && acceptableTimeShiftInSeconds !== void 0 ? acceptableTimeShiftInSeconds : DEFAULT_ACCEPTABLE_TIMESHIFT
    });
    useMediaBuffering({
      element: videoRef,
      shouldBuffer: pauseWhenBuffering,
      isPremounting: Boolean(parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.premounting)
    });
    const actualFrom = parentSequence ? parentSequence.relativeFrom + parentSequence.cumulatedFrom : 0;
    const duration = parentSequence ? Math.min(parentSequence.durationInFrames, durationInFrames) : durationInFrames;
    const actualSrc = useAppendVideoFragment({
      actualSrc: usePreload(src),
      actualFrom,
      duration,
      fps
    });
    (0, import_react.useImperativeHandle)(ref, () => {
      return videoRef.current;
    }, []);
    (0, import_react.useEffect)(() => {
      const { current } = videoRef;
      if (!current) {
        return;
      }
      const errorHandler = () => {
        var _a2;
        if (current === null || current === void 0 ? void 0 : current.error) {
          console.error("Error occurred in video", current === null || current === void 0 ? void 0 : current.error);
          if (props.onError) {
            return;
          }
          throw new Error(`The browser threw an error while playing the video ${src}: Code ${current.error.code} - ${(_a2 = current === null || current === void 0 ? void 0 : current.error) === null || _a2 === void 0 ? void 0 : _a2.message}. See https://remotion.dev/docs/media-playback-error for help. Pass an onError() prop to handle the error.`);
        } else {
          throw new Error("The browser threw an error");
        }
      };
      current.addEventListener("error", errorHandler, { once: true });
      return () => {
        current.removeEventListener("error", errorHandler);
      };
    }, [props.onError, src]);
    const currentOnDurationCallback = (0, import_react.useRef)();
    currentOnDurationCallback.current = onDuration;
    (0, import_react.useEffect)(() => {
      var _a2;
      const { current } = videoRef;
      if (!current) {
        return;
      }
      if (current.duration) {
        (_a2 = currentOnDurationCallback.current) === null || _a2 === void 0 ? void 0 : _a2.call(currentOnDurationCallback, src, current.duration);
        return;
      }
      const onLoadedMetadata = () => {
        var _a3;
        (_a3 = currentOnDurationCallback.current) === null || _a3 === void 0 ? void 0 : _a3.call(currentOnDurationCallback, src, current.duration);
      };
      current.addEventListener("loadedmetadata", onLoadedMetadata);
      return () => {
        current.removeEventListener("loadedmetadata", onLoadedMetadata);
      };
    }, [src]);
    (0, import_react.useEffect)(() => {
      const { current } = videoRef;
      if (!current) {
        return;
      }
      if (isIosSafari()) {
        current.preload = "metadata";
      } else {
        current.preload = "auto";
      }
    }, []);
    const actualStyle = (0, import_react.useMemo)(() => {
      var _a2;
      return {
        ...style,
        opacity: isSequenceHidden ? 0 : (_a2 = style === null || style === void 0 ? void 0 : style.opacity) !== null && _a2 !== void 0 ? _a2 : 1
      };
    }, [isSequenceHidden, style]);
    return (0, import_jsx_runtime.jsx)("video", { ref: videoRef, muted: muted || mediaMuted, playsInline: true, src: actualSrc, loop: _remotionInternalNativeLoopPassed, style: actualStyle, ...nativeProps });
  };
  var VideoForPreview = (0, import_react.forwardRef)(VideoForDevelopmentRefForwardingFunction);
  var OffthreadVideo = (props) => {
    const { startFrom, endAt, name, pauseWhenBuffering, stack, showInTimeline, ...otherProps } = props;
    const environment = getRemotionEnvironment();
    const onDuration = (0, import_react.useCallback)(() => void 0, []);
    if (typeof props.src !== "string") {
      throw new TypeError(`The \`<OffthreadVideo>\` tag requires a string for \`src\`, but got ${JSON.stringify(props.src)} instead.`);
    }
    if (props.imageFormat) {
      throw new TypeError(`The \`<OffthreadVideo>\` tag does no longer accept \`imageFormat\`. Use the \`transparent\` prop if you want to render a transparent video.`);
    }
    if (typeof startFrom !== "undefined" || typeof endAt !== "undefined") {
      validateStartFromProps(startFrom, endAt);
      const startFromFrameNo = startFrom !== null && startFrom !== void 0 ? startFrom : 0;
      const endAtFrameNo = endAt !== null && endAt !== void 0 ? endAt : Infinity;
      return (0, import_jsx_runtime.jsx)(Sequence, { layout: "none", from: 0 - startFromFrameNo, showInTimeline: false, durationInFrames: endAtFrameNo, name, children: (0, import_jsx_runtime.jsx)(OffthreadVideo, { pauseWhenBuffering: pauseWhenBuffering !== null && pauseWhenBuffering !== void 0 ? pauseWhenBuffering : false, ...otherProps }) });
    }
    validateMediaProps(props, "Video");
    if (environment.isRendering) {
      return (0, import_jsx_runtime.jsx)(OffthreadVideoForRendering, { ...otherProps });
    }
    const { transparent, toneMapped, ...withoutTransparent } = otherProps;
    return (0, import_jsx_runtime.jsx)(VideoForPreview, { _remotionInternalStack: stack !== null && stack !== void 0 ? stack : null, _remotionInternalNativeLoopPassed: false, onDuration, onlyWarnForMediaSeekingError: true, pauseWhenBuffering: pauseWhenBuffering !== null && pauseWhenBuffering !== void 0 ? pauseWhenBuffering : false, showInTimeline: showInTimeline !== null && showInTimeline !== void 0 ? showInTimeline : true, ...withoutTransparent });
  };
  var roundTo6Commas = (num) => {
    return Math.round(num * 1e5) / 1e5;
  };
  var seekToTime = (element, desiredTime) => {
    element.currentTime = desiredTime;
    let cancel;
    let cancelSeeked = null;
    const prom = new Promise((resolve) => {
      cancel = element.requestVideoFrameCallback((now, metadata) => {
        const displayIn = metadata.expectedDisplayTime - now;
        if (displayIn <= 0) {
          resolve(metadata.mediaTime);
          return;
        }
        setTimeout(() => {
          resolve(metadata.mediaTime);
        }, displayIn + 150);
      });
    });
    const waitForSeekedEvent = new Promise((resolve) => {
      const onDone = () => {
        resolve();
      };
      element.addEventListener("seeked", onDone, {
        once: true
      });
      cancelSeeked = () => {
        element.removeEventListener("seeked", onDone);
      };
    });
    return {
      wait: Promise.all([prom, waitForSeekedEvent]).then(([time]) => time),
      cancel: () => {
        cancelSeeked === null || cancelSeeked === void 0 ? void 0 : cancelSeeked();
        element.cancelVideoFrameCallback(cancel);
      }
    };
  };
  var seekToTimeMultipleUntilRight = (element, desiredTime, fps) => {
    const threshold = 1 / fps / 2;
    let currentCancel = () => void 0;
    if (Number.isFinite(element.duration) && element.currentTime >= element.duration && desiredTime >= element.duration) {
      return {
        prom: Promise.resolve(),
        cancel: () => {
        }
      };
    }
    const prom = new Promise((resolve, reject) => {
      const firstSeek = seekToTime(element, desiredTime + threshold);
      firstSeek.wait.then((seekedTo) => {
        const difference = Math.abs(desiredTime - seekedTo);
        if (difference <= threshold) {
          return resolve();
        }
        const sign = desiredTime > seekedTo ? 1 : -1;
        const newSeek = seekToTime(element, seekedTo + threshold * sign);
        currentCancel = newSeek.cancel;
        newSeek.wait.then((newTime) => {
          const newDifference = Math.abs(desiredTime - newTime);
          if (roundTo6Commas(newDifference) <= roundTo6Commas(threshold)) {
            return resolve();
          }
          const thirdSeek = seekToTime(element, desiredTime + threshold);
          currentCancel = thirdSeek.cancel;
          return thirdSeek.wait.then(() => {
            resolve();
          }).catch((err) => {
            reject(err);
          });
        }).catch((err) => {
          reject(err);
        });
      });
      currentCancel = firstSeek.cancel;
    });
    return {
      prom,
      cancel: () => {
        currentCancel();
      }
    };
  };
  var VideoForRenderingForwardFunction = ({ onError, volume: volumeProp, allowAmplificationDuringRender, playbackRate, onDuration, toneFrequency, name, acceptableTimeShiftInSeconds, delayRenderRetries, delayRenderTimeoutInMilliseconds, ...props }, ref) => {
    const absoluteFrame = useTimelinePosition();
    const frame = useCurrentFrame();
    const volumePropsFrame = useFrameForVolumeProp();
    const videoConfig = useUnsafeVideoConfig();
    const videoRef = (0, import_react.useRef)(null);
    const sequenceContext = (0, import_react.useContext)(SequenceContext);
    const mediaStartsAt = useMediaStartsAt();
    const environment = getRemotionEnvironment();
    const { registerRenderAsset, unregisterRenderAsset } = (0, import_react.useContext)(RenderAssetManager);
    const id = (0, import_react.useMemo)(() => {
      var _a;
      return `video-${random((_a = props.src) !== null && _a !== void 0 ? _a : "")}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames}`;
    }, [
      props.src,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames
    ]);
    if (!videoConfig) {
      throw new Error("No video config found");
    }
    const volume = evaluateVolume({
      volume: volumeProp,
      frame: volumePropsFrame,
      mediaVolume: 1,
      allowAmplificationDuringRender: allowAmplificationDuringRender !== null && allowAmplificationDuringRender !== void 0 ? allowAmplificationDuringRender : false
    });
    (0, import_react.useEffect)(() => {
      if (!props.src) {
        throw new Error("No src passed");
      }
      if (props.muted) {
        return;
      }
      if (volume <= 0) {
        return;
      }
      if (!window.remotion_audioEnabled) {
        return;
      }
      registerRenderAsset({
        type: "video",
        src: getAbsoluteSrc(props.src),
        id,
        frame: absoluteFrame,
        volume,
        mediaFrame: frame,
        playbackRate: playbackRate !== null && playbackRate !== void 0 ? playbackRate : 1,
        allowAmplificationDuringRender: allowAmplificationDuringRender !== null && allowAmplificationDuringRender !== void 0 ? allowAmplificationDuringRender : false,
        toneFrequency: toneFrequency !== null && toneFrequency !== void 0 ? toneFrequency : null
      });
      return () => unregisterRenderAsset(id);
    }, [
      props.muted,
      props.src,
      registerRenderAsset,
      id,
      unregisterRenderAsset,
      volume,
      frame,
      absoluteFrame,
      playbackRate,
      allowAmplificationDuringRender,
      toneFrequency
    ]);
    (0, import_react.useImperativeHandle)(ref, () => {
      return videoRef.current;
    }, []);
    (0, import_react.useEffect)(() => {
      if (!window.remotion_videoEnabled) {
        return;
      }
      const { current } = videoRef;
      if (!current) {
        return;
      }
      const currentTime = getMediaTime({
        frame,
        playbackRate: playbackRate || 1,
        startFrom: -mediaStartsAt,
        fps: videoConfig.fps
      });
      const handle = delayRender(`Rendering <Video /> with src="${props.src}"`, {
        retries: delayRenderRetries !== null && delayRenderRetries !== void 0 ? delayRenderRetries : void 0,
        timeoutInMilliseconds: delayRenderTimeoutInMilliseconds !== null && delayRenderTimeoutInMilliseconds !== void 0 ? delayRenderTimeoutInMilliseconds : void 0
      });
      if (false) {
        continueRender(handle);
        return;
      }
      if (isApproximatelyTheSame(current.currentTime, currentTime)) {
        if (current.readyState >= 2) {
          continueRender(handle);
          return;
        }
        const loadedDataHandler = () => {
          continueRender(handle);
        };
        current.addEventListener("loadeddata", loadedDataHandler, { once: true });
        return () => {
          current.removeEventListener("loadeddata", loadedDataHandler);
        };
      }
      const endedHandler = () => {
        continueRender(handle);
      };
      const seek2 = seekToTimeMultipleUntilRight(current, currentTime, videoConfig.fps);
      seek2.prom.then(() => {
        continueRender(handle);
      });
      current.addEventListener("ended", endedHandler, { once: true });
      const errorHandler = () => {
        var _a;
        if (current === null || current === void 0 ? void 0 : current.error) {
          console.error("Error occurred in video", current === null || current === void 0 ? void 0 : current.error);
          if (onError) {
            return;
          }
          throw new Error(`The browser threw an error while playing the video ${props.src}: Code ${current.error.code} - ${(_a = current === null || current === void 0 ? void 0 : current.error) === null || _a === void 0 ? void 0 : _a.message}. See https://remotion.dev/docs/media-playback-error for help. Pass an onError() prop to handle the error.`);
        } else {
          throw new Error("The browser threw an error");
        }
      };
      current.addEventListener("error", errorHandler, { once: true });
      return () => {
        seek2.cancel();
        current.removeEventListener("ended", endedHandler);
        current.removeEventListener("error", errorHandler);
        continueRender(handle);
      };
    }, [
      volumePropsFrame,
      props.src,
      playbackRate,
      videoConfig.fps,
      frame,
      mediaStartsAt,
      onError,
      delayRenderRetries,
      delayRenderTimeoutInMilliseconds
    ]);
    const { src } = props;
    if (environment.isRendering) {
      (0, import_react.useLayoutEffect)(() => {
        if (false) {
          return;
        }
        const newHandle = delayRender("Loading <Video> duration with src=" + src, {
          retries: delayRenderRetries !== null && delayRenderRetries !== void 0 ? delayRenderRetries : void 0,
          timeoutInMilliseconds: delayRenderTimeoutInMilliseconds !== null && delayRenderTimeoutInMilliseconds !== void 0 ? delayRenderTimeoutInMilliseconds : void 0
        });
        const { current } = videoRef;
        const didLoad = () => {
          if (current === null || current === void 0 ? void 0 : current.duration) {
            onDuration(src, current.duration);
          }
          continueRender(newHandle);
        };
        if (current === null || current === void 0 ? void 0 : current.duration) {
          onDuration(src, current.duration);
          continueRender(newHandle);
        } else {
          current === null || current === void 0 ? void 0 : current.addEventListener("loadedmetadata", didLoad, { once: true });
        }
        return () => {
          current === null || current === void 0 ? void 0 : current.removeEventListener("loadedmetadata", didLoad);
          continueRender(newHandle);
        };
      }, [src, onDuration, delayRenderRetries, delayRenderTimeoutInMilliseconds]);
    }
    return (0, import_jsx_runtime.jsx)("video", { ref: videoRef, ...props, onError });
  };
  var VideoForRendering = (0, import_react.forwardRef)(VideoForRenderingForwardFunction);
  var VideoForwardingFunction = (props, ref) => {
    var _a, _b;
    const { startFrom, endAt, name, pauseWhenBuffering, stack, _remotionInternalNativeLoopPassed, showInTimeline, ...otherProps } = props;
    const { loop, ...propsOtherThanLoop } = props;
    const { fps } = useVideoConfig();
    const environment = getRemotionEnvironment();
    const { durations, setDurations } = (0, import_react.useContext)(DurationsContext);
    if (typeof ref === "string") {
      throw new Error("string refs are not supported");
    }
    if (typeof props.src !== "string") {
      throw new TypeError(`The \`<Video>\` tag requires a string for \`src\`, but got ${JSON.stringify(props.src)} instead.`);
    }
    const preloadedSrc = usePreload(props.src);
    const onDuration = (0, import_react.useCallback)((src, durationInSeconds) => {
      setDurations({ type: "got-duration", durationInSeconds, src });
    }, [setDurations]);
    const durationFetched = (_a = durations[getAbsoluteSrc(preloadedSrc)]) !== null && _a !== void 0 ? _a : durations[getAbsoluteSrc(props.src)];
    if (loop && durationFetched !== void 0) {
      const mediaDuration = durationFetched * fps;
      return (0, import_jsx_runtime.jsx)(Loop, { durationInFrames: calculateLoopDuration({
        endAt,
        mediaDuration,
        playbackRate: (_b = props.playbackRate) !== null && _b !== void 0 ? _b : 1,
        startFrom
      }), layout: "none", name, children: (0, import_jsx_runtime.jsx)(Video, { ...propsOtherThanLoop, ref, _remotionInternalNativeLoopPassed: true }) });
    }
    if (typeof startFrom !== "undefined" || typeof endAt !== "undefined") {
      validateStartFromProps(startFrom, endAt);
      const startFromFrameNo = startFrom !== null && startFrom !== void 0 ? startFrom : 0;
      const endAtFrameNo = endAt !== null && endAt !== void 0 ? endAt : Infinity;
      return (0, import_jsx_runtime.jsx)(Sequence, { layout: "none", from: 0 - startFromFrameNo, showInTimeline: false, durationInFrames: endAtFrameNo, name, children: (0, import_jsx_runtime.jsx)(Video, { pauseWhenBuffering: pauseWhenBuffering !== null && pauseWhenBuffering !== void 0 ? pauseWhenBuffering : false, ...otherProps, ref }) });
    }
    validateMediaProps(props, "Video");
    if (environment.isRendering) {
      return (0, import_jsx_runtime.jsx)(VideoForRendering, { onDuration, ...otherProps, ref });
    }
    return (0, import_jsx_runtime.jsx)(VideoForPreview, {
      onlyWarnForMediaSeekingError: false,
      ...otherProps,
      ref,
      // Proposal: Make this default to true in v5
      pauseWhenBuffering: pauseWhenBuffering !== null && pauseWhenBuffering !== void 0 ? pauseWhenBuffering : false,
      onDuration,
      _remotionInternalStack: stack !== null && stack !== void 0 ? stack : null,
      _remotionInternalNativeLoopPassed: _remotionInternalNativeLoopPassed !== null && _remotionInternalNativeLoopPassed !== void 0 ? _remotionInternalNativeLoopPassed : false,
      showInTimeline: showInTimeline !== null && showInTimeline !== void 0 ? showInTimeline : true
    });
  };
  var Video = (0, import_react.forwardRef)(VideoForwardingFunction);
  addSequenceStackTraces(Video);
  checkMultipleRemotionVersions();
  var proxyObj = {};
  var Config = new Proxy(proxyObj, {
    get(_, prop) {
      if (prop === "Bundling" || prop === "Rendering" || prop === "Log" || prop === "Puppeteer" || prop === "Output") {
        return Config;
      }
      return () => {
        console.warn("\u26A0\uFE0F  The CLI configuration has been extracted from Remotion Core.");
        console.warn("Update the import from the config file:");
        console.warn();
        console.warn("- Delete:");
        console.warn('import {Config} from "remotion";');
        console.warn("+ Replace:");
        console.warn('import {Config} from "@remotion/cli/config";');
        console.warn();
        console.warn("For more information, see https://www.remotion.dev/docs/4-0-migration.");
        process.exit(1);
      };
    }
  });
  addSequenceStackTraces(Sequence);

  // node_modules/@remotion/player/dist/esm/index.mjs
  var import_react2 = __toESM(require_react(), 1);

  // node_modules/remotion/dist/esm/no-react.mjs
  function interpolateFunction2(input, inputRange, outputRange, options) {
    const { extrapolateLeft, extrapolateRight, easing } = options;
    let result = input;
    const [inputMin, inputMax] = inputRange;
    const [outputMin, outputMax] = outputRange;
    if (result < inputMin) {
      if (extrapolateLeft === "identity") {
        return result;
      }
      if (extrapolateLeft === "clamp") {
        result = inputMin;
      } else if (extrapolateLeft === "wrap") {
        const range = inputMax - inputMin;
        result = ((result - inputMin) % range + range) % range + inputMin;
      } else
        ;
    }
    if (result > inputMax) {
      if (extrapolateRight === "identity") {
        return result;
      }
      if (extrapolateRight === "clamp") {
        result = inputMax;
      } else if (extrapolateRight === "wrap") {
        const range = inputMax - inputMin;
        result = ((result - inputMin) % range + range) % range + inputMin;
      } else
        ;
    }
    if (outputMin === outputMax) {
      return outputMin;
    }
    result = (result - inputMin) / (inputMax - inputMin);
    result = easing(result);
    result = result * (outputMax - outputMin) + outputMin;
    return result;
  }
  function findRange2(input, inputRange) {
    let i;
    for (i = 1; i < inputRange.length - 1; ++i) {
      if (inputRange[i] >= input) {
        break;
      }
    }
    return i - 1;
  }
  function checkValidInputRange2(arr) {
    for (let i = 1; i < arr.length; ++i) {
      if (!(arr[i] > arr[i - 1])) {
        throw new Error(`inputRange must be strictly monotonically increasing but got [${arr.join(",")}]`);
      }
    }
  }
  function checkInfiniteRange2(name, arr) {
    if (arr.length < 2) {
      throw new Error(name + " must have at least 2 elements");
    }
    for (const index in arr) {
      if (typeof arr[index] !== "number") {
        throw new Error(`${name} must contain only numbers`);
      }
      if (arr[index] === -Infinity || arr[index] === Infinity) {
        throw new Error(`${name} must contain only finite numbers, but got [${arr.join(",")}]`);
      }
    }
  }
  function interpolate2(input, inputRange, outputRange, options) {
    var _a;
    if (typeof input === "undefined") {
      throw new Error("input can not be undefined");
    }
    if (typeof inputRange === "undefined") {
      throw new Error("inputRange can not be undefined");
    }
    if (typeof outputRange === "undefined") {
      throw new Error("outputRange can not be undefined");
    }
    if (inputRange.length !== outputRange.length) {
      throw new Error("inputRange (" + inputRange.length + ") and outputRange (" + outputRange.length + ") must have the same length");
    }
    checkInfiniteRange2("inputRange", inputRange);
    checkInfiniteRange2("outputRange", outputRange);
    checkValidInputRange2(inputRange);
    const easing = (_a = options === null || options === void 0 ? void 0 : options.easing) !== null && _a !== void 0 ? _a : (num) => num;
    let extrapolateLeft = "extend";
    if ((options === null || options === void 0 ? void 0 : options.extrapolateLeft) !== void 0) {
      extrapolateLeft = options.extrapolateLeft;
    }
    let extrapolateRight = "extend";
    if ((options === null || options === void 0 ? void 0 : options.extrapolateRight) !== void 0) {
      extrapolateRight = options.extrapolateRight;
    }
    if (typeof input !== "number") {
      throw new TypeError("Cannot interpolate an input which is not a number");
    }
    const range = findRange2(input, inputRange);
    return interpolateFunction2(input, [inputRange[range], inputRange[range + 1]], [outputRange[range], outputRange[range + 1]], {
      easing,
      extrapolateLeft,
      extrapolateRight
    });
  }
  function truthy2(value) {
    return Boolean(value);
  }
  if (typeof window !== "undefined") {
    window.remotion_renderReady = false;
  }
  if (typeof window !== "undefined") {
    window.remotion_delayRenderTimeouts = {};
  }
  var DELAY_RENDER_CALLSTACK_TOKEN2 = "The delayRender was called:";
  var DELAY_RENDER_RETRIES_LEFT2 = "Retries left: ";
  var DELAY_RENDER_RETRY_TOKEN2 = "- Rendering the frame will be retried.";
  var problematicCharacters2 = {
    "%3A": ":",
    "%2F": "/",
    "%3F": "?",
    "%23": "#",
    "%5B": "[",
    "%5D": "]",
    "%40": "@",
    "%21": "!",
    "%24": "$",
    "%26": "&",
    "%27": "'",
    "%28": "(",
    "%29": ")",
    "%2A": "*",
    "%2B": "+",
    "%2C": ",",
    "%3B": ";"
  };
  var didWarn2 = {};
  var warnOnce2 = (message) => {
    if (didWarn2[message]) {
      return;
    }
    console.warn(message);
    didWarn2[message] = true;
  };
  var includesHexOfUnsafeChar2 = (path) => {
    for (const key of Object.keys(problematicCharacters2)) {
      if (path.includes(key)) {
        return { containsHex: true, hexCode: key };
      }
    }
    return { containsHex: false };
  };
  var trimLeadingSlash2 = (path) => {
    if (path.startsWith("/")) {
      return trimLeadingSlash2(path.substring(1));
    }
    return path;
  };
  var inner2 = (path) => {
    if (typeof window !== "undefined" && window.remotion_staticBase) {
      if (path.startsWith(window.remotion_staticBase)) {
        throw new Error(`The value "${path}" is already prefixed with the static base ${window.remotion_staticBase}. You don't need to call staticFile() on it.`);
      }
      return `${window.remotion_staticBase}/${trimLeadingSlash2(path)}`;
    }
    return `/${trimLeadingSlash2(path)}`;
  };
  var encodeBySplitting2 = (path) => {
    const splitBySlash = path.split("/");
    const encodedArray = splitBySlash.map((element) => {
      return encodeURIComponent(element);
    });
    const merged = encodedArray.join("/");
    return merged;
  };
  var staticFile2 = (path) => {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      throw new TypeError(`staticFile() does not support remote URLs - got "${path}". Instead, pass the URL without wrapping it in staticFile(). See: https://remotion.dev/docs/staticfile-remote-urls`);
    }
    if (path.startsWith("..") || path.startsWith("./")) {
      throw new TypeError(`staticFile() does not support relative paths - got "${path}". Instead, pass the name of a file that is inside the public/ folder. See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    if (path.startsWith("/Users") || path.startsWith("/home") || path.startsWith("/tmp") || path.startsWith("/etc") || path.startsWith("/opt") || path.startsWith("/var") || path.startsWith("C:") || path.startsWith("D:") || path.startsWith("E:")) {
      throw new TypeError(`staticFile() does not support absolute paths - got "${path}". Instead, pass the name of a file that is inside the public/ folder. See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    if (path.startsWith("public/")) {
      throw new TypeError(`Do not include the public/ prefix when using staticFile() - got "${path}". See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    const includesHex = includesHexOfUnsafeChar2(path);
    if (includesHex.containsHex) {
      warnOnce2(`WARNING: You seem to pass an already encoded path (path contains ${includesHex.hexCode}). Since Remotion 4.0, the encoding is done by staticFile() itself. You may want to remove a encodeURIComponent() wrapping.`);
    }
    const preprocessed = encodeBySplitting2(path);
    const preparsed = inner2(preprocessed);
    if (!preparsed.startsWith("/")) {
      return `/${preparsed}`;
    }
    return preparsed;
  };
  var DATE_TOKEN2 = "remotion-date:";
  var FILE_TOKEN2 = "remotion-file:";
  var serializeJSONWithDate = ({ data, indent, staticBase }) => {
    let customDateUsed = false;
    let customFileUsed = false;
    let mapUsed = false;
    let setUsed = false;
    const serializedString = JSON.stringify(data, function(key, value) {
      const item = this[key];
      if (item instanceof Date) {
        customDateUsed = true;
        return `${DATE_TOKEN2}${item.toISOString()}`;
      }
      if (item instanceof Map) {
        mapUsed = true;
        return value;
      }
      if (item instanceof Set) {
        setUsed = true;
        return value;
      }
      if (typeof item === "string" && staticBase !== null && item.startsWith(staticBase)) {
        customFileUsed = true;
        return `${FILE_TOKEN2}${item.replace(staticBase + "/", "")}`;
      }
      return value;
    }, indent);
    return { serializedString, customDateUsed, customFileUsed, mapUsed, setUsed };
  };
  var deserializeJSONWithCustomFields2 = (data) => {
    return JSON.parse(data, (_, value) => {
      if (typeof value === "string" && value.startsWith(DATE_TOKEN2)) {
        return new Date(value.replace(DATE_TOKEN2, ""));
      }
      if (typeof value === "string" && value.startsWith(FILE_TOKEN2)) {
        return staticFile2(value.replace(FILE_TOKEN2, ""));
      }
      return value;
    });
  };
  var NUMBER2 = "[-+]?\\d*\\.?\\d+";
  var PERCENTAGE2 = NUMBER2 + "%";
  function call(...args) {
    return "\\(\\s*(" + args.join(")\\s*,\\s*(") + ")\\s*\\)";
  }
  function getMatchers() {
    const cachedMatchers = {
      rgb: void 0,
      rgba: void 0,
      hsl: void 0,
      hsla: void 0,
      hex3: void 0,
      hex4: void 0,
      hex5: void 0,
      hex6: void 0,
      hex8: void 0
    };
    if (cachedMatchers.rgb === void 0) {
      cachedMatchers.rgb = new RegExp("rgb" + call(NUMBER2, NUMBER2, NUMBER2));
      cachedMatchers.rgba = new RegExp("rgba" + call(NUMBER2, NUMBER2, NUMBER2, NUMBER2));
      cachedMatchers.hsl = new RegExp("hsl" + call(NUMBER2, PERCENTAGE2, PERCENTAGE2));
      cachedMatchers.hsla = new RegExp("hsla" + call(NUMBER2, PERCENTAGE2, PERCENTAGE2, NUMBER2));
      cachedMatchers.hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
      cachedMatchers.hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
      cachedMatchers.hex6 = /^#([0-9a-fA-F]{6})$/;
      cachedMatchers.hex8 = /^#([0-9a-fA-F]{8})$/;
    }
    return cachedMatchers;
  }
  function hue2rgb(p2, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p2 + (q - p2) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p2 + (q - p2) * (2 / 3 - t) * 6;
    }
    return p2;
  }
  function hslToRgb(h, s, l) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p2 = 2 * l - q;
    const r = hue2rgb(p2, q, h + 1 / 3);
    const g = hue2rgb(p2, q, h);
    const b2 = hue2rgb(p2, q, h - 1 / 3);
    return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b2 * 255) << 8;
  }
  function parse255(str) {
    const int = Number.parseInt(str, 10);
    if (int < 0) {
      return 0;
    }
    if (int > 255) {
      return 255;
    }
    return int;
  }
  function parse360(str) {
    const int = Number.parseFloat(str);
    return (int % 360 + 360) % 360 / 360;
  }
  function parse1(str) {
    const num = Number.parseFloat(str);
    if (num < 0) {
      return 0;
    }
    if (num > 1) {
      return 255;
    }
    return Math.round(num * 255);
  }
  function parsePercentage(str) {
    const int = Number.parseFloat(str);
    if (int < 0) {
      return 0;
    }
    if (int > 100) {
      return 1;
    }
    return int / 100;
  }
  var colorNames2 = {
    transparent: 0,
    // http://www.w3.org/TR/css3-color/#svg-color
    aliceblue: 4042850303,
    antiquewhite: 4209760255,
    aqua: 16777215,
    aquamarine: 2147472639,
    azure: 4043309055,
    beige: 4126530815,
    bisque: 4293182719,
    black: 255,
    blanchedalmond: 4293643775,
    blue: 65535,
    blueviolet: 2318131967,
    brown: 2771004159,
    burlywood: 3736635391,
    burntsienna: 3934150143,
    cadetblue: 1604231423,
    chartreuse: 2147418367,
    chocolate: 3530104575,
    coral: 4286533887,
    cornflowerblue: 1687547391,
    cornsilk: 4294499583,
    crimson: 3692313855,
    cyan: 16777215,
    darkblue: 35839,
    darkcyan: 9145343,
    darkgoldenrod: 3095792639,
    darkgray: 2846468607,
    darkgreen: 6553855,
    darkgrey: 2846468607,
    darkkhaki: 3182914559,
    darkmagenta: 2332068863,
    darkolivegreen: 1433087999,
    darkorange: 4287365375,
    darkorchid: 2570243327,
    darkred: 2332033279,
    darksalmon: 3918953215,
    darkseagreen: 2411499519,
    darkslateblue: 1211993087,
    darkslategray: 793726975,
    darkslategrey: 793726975,
    darkturquoise: 13554175,
    darkviolet: 2483082239,
    deeppink: 4279538687,
    deepskyblue: 12582911,
    dimgray: 1768516095,
    dimgrey: 1768516095,
    dodgerblue: 512819199,
    firebrick: 2988581631,
    floralwhite: 4294635775,
    forestgreen: 579543807,
    fuchsia: 4278255615,
    gainsboro: 3705462015,
    ghostwhite: 4177068031,
    gold: 4292280575,
    goldenrod: 3668254975,
    gray: 2155905279,
    green: 8388863,
    greenyellow: 2919182335,
    grey: 2155905279,
    honeydew: 4043305215,
    hotpink: 4285117695,
    indianred: 3445382399,
    indigo: 1258324735,
    ivory: 4294963455,
    khaki: 4041641215,
    lavender: 3873897215,
    lavenderblush: 4293981695,
    lawngreen: 2096890111,
    lemonchiffon: 4294626815,
    lightblue: 2916673279,
    lightcoral: 4034953471,
    lightcyan: 3774873599,
    lightgoldenrodyellow: 4210742015,
    lightgray: 3553874943,
    lightgreen: 2431553791,
    lightgrey: 3553874943,
    lightpink: 4290167295,
    lightsalmon: 4288707327,
    lightseagreen: 548580095,
    lightskyblue: 2278488831,
    lightslategray: 2005441023,
    lightslategrey: 2005441023,
    lightsteelblue: 2965692159,
    lightyellow: 4294959359,
    lime: 16711935,
    limegreen: 852308735,
    linen: 4210091775,
    magenta: 4278255615,
    maroon: 2147483903,
    mediumaquamarine: 1724754687,
    mediumblue: 52735,
    mediumorchid: 3126187007,
    mediumpurple: 2473647103,
    mediumseagreen: 1018393087,
    mediumslateblue: 2070474495,
    mediumspringgreen: 16423679,
    mediumturquoise: 1221709055,
    mediumvioletred: 3340076543,
    midnightblue: 421097727,
    mintcream: 4127193855,
    mistyrose: 4293190143,
    moccasin: 4293178879,
    navajowhite: 4292783615,
    navy: 33023,
    oldlace: 4260751103,
    olive: 2155872511,
    olivedrab: 1804477439,
    orange: 4289003775,
    orangered: 4282712319,
    orchid: 3664828159,
    palegoldenrod: 4008225535,
    palegreen: 2566625535,
    paleturquoise: 2951671551,
    palevioletred: 3681588223,
    papayawhip: 4293907967,
    peachpuff: 4292524543,
    peru: 3448061951,
    pink: 4290825215,
    plum: 3718307327,
    powderblue: 2967529215,
    purple: 2147516671,
    rebeccapurple: 1714657791,
    red: 4278190335,
    rosybrown: 3163525119,
    royalblue: 1097458175,
    saddlebrown: 2336560127,
    salmon: 4202722047,
    sandybrown: 4104413439,
    seagreen: 780883967,
    seashell: 4294307583,
    sienna: 2689740287,
    silver: 3233857791,
    skyblue: 2278484991,
    slateblue: 1784335871,
    slategray: 1887473919,
    slategrey: 1887473919,
    snow: 4294638335,
    springgreen: 16744447,
    steelblue: 1182971135,
    tan: 3535047935,
    teal: 8421631,
    thistle: 3636451583,
    tomato: 4284696575,
    turquoise: 1088475391,
    violet: 4001558271,
    wheat: 4125012991,
    white: 4294967295,
    whitesmoke: 4126537215,
    yellow: 4294902015,
    yellowgreen: 2597139199
  };
  function normalizeColor(color) {
    const matchers = getMatchers();
    let match;
    if (matchers.hex6) {
      if (match = matchers.hex6.exec(color)) {
        return Number.parseInt(match[1] + "ff", 16) >>> 0;
      }
    }
    if (colorNames2[color] !== void 0) {
      return colorNames2[color];
    }
    if (matchers.rgb) {
      if (match = matchers.rgb.exec(color)) {
        return (
          // b
          (parse255(match[1]) << 24 | // r
          parse255(match[2]) << 16 | // g
          parse255(match[3]) << 8 | 255) >>> // a
          0
        );
      }
    }
    if (matchers.rgba) {
      if (match = matchers.rgba.exec(color)) {
        return (
          // b
          (parse255(match[1]) << 24 | // r
          parse255(match[2]) << 16 | // g
          parse255(match[3]) << 8 | parse1(match[4])) >>> // a
          0
        );
      }
    }
    if (matchers.hex3) {
      if (match = matchers.hex3.exec(color)) {
        return Number.parseInt(
          match[1] + match[1] + // r
          match[2] + match[2] + // g
          match[3] + match[3] + // b
          "ff",
          // a
          16
        ) >>> 0;
      }
    }
    if (matchers.hex8) {
      if (match = matchers.hex8.exec(color)) {
        return Number.parseInt(match[1], 16) >>> 0;
      }
    }
    if (matchers.hex4) {
      if (match = matchers.hex4.exec(color)) {
        return Number.parseInt(
          match[1] + match[1] + // r
          match[2] + match[2] + // g
          match[3] + match[3] + // b
          match[4] + match[4],
          // a
          16
        ) >>> 0;
      }
    }
    if (matchers.hsl) {
      if (match = matchers.hsl.exec(color)) {
        return (hslToRgb(
          parse360(match[1]),
          // h
          parsePercentage(match[2]),
          // s
          parsePercentage(match[3])
        ) | 255) >>> // a
        0;
      }
    }
    if (matchers.hsla) {
      if (match = matchers.hsla.exec(color)) {
        return (hslToRgb(
          parse360(match[1]),
          // h
          parsePercentage(match[2]),
          // s
          parsePercentage(match[3])
        ) | parse1(match[4])) >>> // a
        0;
      }
    }
    throw new Error(`invalid color string ${color} provided`);
  }
  function processColor(color) {
    const normalizedColor = normalizeColor(color);
    return (normalizedColor << 24 | normalizedColor >>> 8) >>> 0;
  }
  var validateFrame = ({ allowFloats, durationInFrames, frame }) => {
    if (typeof frame === "undefined") {
      throw new TypeError(`Argument missing for parameter "frame"`);
    }
    if (typeof frame !== "number") {
      throw new TypeError(`Argument passed for "frame" is not a number: ${frame}`);
    }
    if (!Number.isFinite(frame)) {
      throw new RangeError(`Frame ${frame} is not finite`);
    }
    if (frame % 1 !== 0 && !allowFloats) {
      throw new RangeError(`Argument for frame must be an integer, but got ${frame}`);
    }
    if (frame < 0 && frame < -durationInFrames) {
      throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the lowest frame that can be rendered is ${-durationInFrames}`);
    }
    if (frame > durationInFrames - 1) {
      throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the highest frame that can be rendered is ${durationInFrames - 1}`);
    }
  };
  var validateDefaultAndInputProps2 = (defaultProps, name, compositionId) => {
    if (!defaultProps) {
      return;
    }
    if (typeof defaultProps !== "object") {
      throw new Error(`"${name}" must be an object, but you passed a value of type ${typeof defaultProps}`);
    }
    if (Array.isArray(defaultProps)) {
      throw new Error(`"${name}" must be an object, an array was passed ${compositionId ? `for composition "${compositionId}"` : ""}`);
    }
  };
  function validateDimension2(amount, nameOfProp, location) {
    if (typeof amount !== "number") {
      throw new Error(`The "${nameOfProp}" prop ${location} must be a number, but you passed a value of type ${typeof amount}`);
    }
    if (isNaN(amount)) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must not be NaN, but is NaN.`);
    }
    if (!Number.isFinite(amount)) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be finite, but is ${amount}.`);
    }
    if (amount % 1 !== 0) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be an integer, but is ${amount}.`);
    }
    if (amount <= 0) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be positive, but got ${amount}.`);
    }
  }
  function validateDurationInFrames2(durationInFrames, options) {
    const { allowFloats, component } = options;
    if (typeof durationInFrames === "undefined") {
      throw new Error(`The "durationInFrames" prop ${component} is missing.`);
    }
    if (typeof durationInFrames !== "number") {
      throw new Error(`The "durationInFrames" prop ${component} must be a number, but you passed a value of type ${typeof durationInFrames}`);
    }
    if (durationInFrames <= 0) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be positive, but got ${durationInFrames}.`);
    }
    if (!allowFloats && durationInFrames % 1 !== 0) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be an integer, but got ${durationInFrames}.`);
    }
    if (!Number.isFinite(durationInFrames)) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be finite, but got ${durationInFrames}.`);
    }
  }
  function validateFps2(fps, location, isGif) {
    if (typeof fps !== "number") {
      throw new Error(`"fps" must be a number, but you passed a value of type ${typeof fps} ${location}`);
    }
    if (!Number.isFinite(fps)) {
      throw new Error(`"fps" must be a finite, but you passed ${fps} ${location}`);
    }
    if (isNaN(fps)) {
      throw new Error(`"fps" must not be NaN, but got ${fps} ${location}`);
    }
    if (fps <= 0) {
      throw new TypeError(`"fps" must be positive, but got ${fps} ${location}`);
    }
    if (isGif && fps > 50) {
      throw new TypeError(`The FPS for a GIF cannot be higher than 50. Use the --every-nth-frame option to lower the FPS: https://remotion.dev/docs/render-as-gif`);
    }
  }
  var getExpectedMediaFrameUncorrected2 = ({ frame, playbackRate, startFrom }) => {
    return interpolate2(frame, [-1, startFrom, startFrom + 1], [-1, startFrom, startFrom + playbackRate]);
  };
  var getAbsoluteSrc2 = (relativeSrc) => {
    if (typeof window === "undefined") {
      return relativeSrc;
    }
    return new URL(relativeSrc, window.origin).href;
  };
  var getOffthreadVideoSource2 = ({ src, transparent, currentTime, toneMapped }) => {
    return `http://localhost:${window.remotion_proxyPort}/proxy?src=${encodeURIComponent(getAbsoluteSrc2(src))}&time=${encodeURIComponent(currentTime)}&transparent=${String(transparent)}&toneMapped=${String(toneMapped)}`;
  };
  var NoReactInternals = {
    processColor,
    truthy: truthy2,
    validateFps: validateFps2,
    validateDimension: validateDimension2,
    validateDurationInFrames: validateDurationInFrames2,
    validateDefaultAndInputProps: validateDefaultAndInputProps2,
    validateFrame,
    serializeJSONWithDate,
    bundleName: "bundle.js",
    bundleMapName: "bundle.js.map",
    deserializeJSONWithCustomFields: deserializeJSONWithCustomFields2,
    DELAY_RENDER_CALLSTACK_TOKEN: DELAY_RENDER_CALLSTACK_TOKEN2,
    DELAY_RENDER_RETRY_TOKEN: DELAY_RENDER_RETRY_TOKEN2,
    DELAY_RENDER_ATTEMPT_TOKEN: DELAY_RENDER_RETRIES_LEFT2,
    getOffthreadVideoSource: getOffthreadVideoSource2,
    getExpectedMediaFrameUncorrected: getExpectedMediaFrameUncorrected2
  };

  // node_modules/@remotion/player/dist/esm/index.mjs
  var ICON_SIZE2 = 25;
  var fullscreenIconSize = 16;
  var PlayIcon = () => {
    return (0, import_jsx_runtime2.jsx)("svg", { width: ICON_SIZE2, height: ICON_SIZE2, viewBox: "0 0 25 25", fill: "none", children: (0, import_jsx_runtime2.jsx)("path", { d: "M8 6.375C7.40904 8.17576 7.06921 10.2486 7.01438 12.3871C6.95955 14.5255 7.19163 16.6547 7.6875 18.5625C9.95364 18.2995 12.116 17.6164 14.009 16.5655C15.902 15.5147 17.4755 14.124 18.6088 12.5C17.5158 10.8949 15.9949 9.51103 14.1585 8.45082C12.3222 7.3906 10.2174 6.68116 8 6.375Z", fill: "white", stroke: "white", strokeWidth: "6.25", strokeLinejoin: "round" }) });
  };
  var PauseIcon = () => {
    return (0, import_jsx_runtime2.jsxs)("svg", { viewBox: "0 0 100 100", width: ICON_SIZE2, height: ICON_SIZE2, children: [(0, import_jsx_runtime2.jsx)("rect", { x: "25", y: "20", width: "20", height: "60", fill: "#fff", ry: "5", rx: "5" }), (0, import_jsx_runtime2.jsx)("rect", { x: "55", y: "20", width: "20", height: "60", fill: "#fff", ry: "5", rx: "5" })] });
  };
  var FullscreenIcon = ({ isFullscreen }) => {
    const strokeWidth = 6;
    const viewSize = 32;
    const out = isFullscreen ? 0 : strokeWidth / 2;
    const middleInset = isFullscreen ? strokeWidth * 1.6 : strokeWidth / 2;
    const inset = isFullscreen ? strokeWidth * 1.6 : strokeWidth * 2;
    return (0, import_jsx_runtime2.jsxs)("svg", { viewBox: `0 0 ${viewSize} ${viewSize}`, height: fullscreenIconSize, width: fullscreenIconSize, children: [(0, import_jsx_runtime2.jsx)("path", { d: `
				M ${out} ${inset}
				L ${middleInset} ${middleInset}
				L ${inset} ${out}
				`, stroke: "#fff", strokeWidth, fill: "none" }), (0, import_jsx_runtime2.jsx)("path", { d: `
				M ${viewSize - out} ${inset}
				L ${viewSize - middleInset} ${middleInset}
				L ${viewSize - inset} ${out}
				`, stroke: "#fff", strokeWidth, fill: "none" }), (0, import_jsx_runtime2.jsx)("path", { d: `
				M ${out} ${viewSize - inset}
				L ${middleInset} ${viewSize - middleInset}
				L ${inset} ${viewSize - out}
				`, stroke: "#fff", strokeWidth, fill: "none" }), (0, import_jsx_runtime2.jsx)("path", { d: `
				M ${viewSize - out} ${viewSize - inset}
				L ${viewSize - middleInset} ${viewSize - middleInset}
				L ${viewSize - inset} ${viewSize - out}
				`, stroke: "#fff", strokeWidth, fill: "none" })] });
  };
  var VolumeOffIcon = () => {
    return (0, import_jsx_runtime2.jsx)("svg", { width: ICON_SIZE2, height: ICON_SIZE2, viewBox: "0 0 24 24", children: (0, import_jsx_runtime2.jsx)("path", { d: "M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z", fill: "#fff" }) });
  };
  var VolumeOnIcon = () => {
    return (0, import_jsx_runtime2.jsx)("svg", { width: ICON_SIZE2, height: ICON_SIZE2, viewBox: "0 0 24 24", children: (0, import_jsx_runtime2.jsx)("path", { d: "M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z", fill: "#fff" }) });
  };
  var className = "__remotion_buffering_indicator";
  var remotionBufferingAnimation = "__remotion_buffering_animation";
  var playerStyle = {
    width: ICON_SIZE2,
    height: ICON_SIZE2,
    overflow: "hidden",
    lineHeight: "normal",
    fontSize: "inherit"
  };
  var studioStyle = {
    width: 14,
    height: 14,
    overflow: "hidden",
    lineHeight: "normal",
    fontSize: "inherit"
  };
  var BufferingIndicator = ({ type }) => {
    const style = type === "player" ? playerStyle : studioStyle;
    return (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [(0, import_jsx_runtime2.jsx)("style", { type: "text/css", children: `
				@keyframes ${remotionBufferingAnimation} {
          0% {
            rotate: 0deg;
          }
          100% {
            rotate: 360deg;
          }
        }
        
        .${className} {
            animation: ${remotionBufferingAnimation} 1s linear infinite;
        }        
			` }), (0, import_jsx_runtime2.jsx)("div", { style, children: (0, import_jsx_runtime2.jsx)("svg", { viewBox: type === "player" ? "0 0 22 22" : "0 0 18 18", style, className, children: (0, import_jsx_runtime2.jsx)("path", { d: type === "player" ? "M 11 4 A 7 7 0 0 1 15.1145 16.66312" : "M 9 2 A 7 7 0 0 1 13.1145 14.66312", stroke: "white", strokeLinecap: "round", fill: "none", strokeWidth: 3 }) }) })] });
  };
  var calculatePlayerSize = ({ currentSize, width, height, compositionWidth, compositionHeight }) => {
    if (width !== void 0 && height === void 0) {
      return {
        aspectRatio: [compositionWidth, compositionHeight].join("/")
      };
    }
    if (height !== void 0 && width === void 0) {
      return {
        // Aspect ratio CSS prop will work
        aspectRatio: [compositionWidth, compositionHeight].join("/")
      };
    }
    if (!currentSize) {
      return {
        width: compositionWidth,
        height: compositionHeight
      };
    }
    return {
      width: compositionWidth,
      height: compositionHeight
    };
  };
  var calculateCanvasTransformation = ({ previewSize, compositionWidth, compositionHeight, canvasSize }) => {
    const scale = Internals.calculateScale({
      canvasSize,
      compositionHeight,
      compositionWidth,
      previewSize
    });
    const correction = 0 - (1 - scale) / 2;
    const xCorrection = correction * compositionWidth;
    const yCorrection = correction * compositionHeight;
    const width = compositionWidth * scale;
    const height = compositionHeight * scale;
    const centerX = canvasSize.width / 2 - width / 2;
    const centerY = canvasSize.height / 2 - height / 2;
    return {
      centerX,
      centerY,
      xCorrection,
      yCorrection,
      scale
    };
  };
  var calculateOuterStyle = ({ config, style, canvasSize }) => {
    if (!config) {
      return {};
    }
    return {
      position: "relative",
      overflow: "hidden",
      ...calculatePlayerSize({
        compositionHeight: config.height,
        compositionWidth: config.width,
        currentSize: canvasSize,
        height: style === null || style === void 0 ? void 0 : style.height,
        width: style === null || style === void 0 ? void 0 : style.width
      }),
      ...style
    };
  };
  var calculateContainerStyle = ({ config, canvasSize, layout, scale }) => {
    if (!config || !canvasSize || !layout) {
      return {};
    }
    return {
      position: "absolute",
      width: config.width,
      height: config.height,
      display: "flex",
      transform: `scale(${scale})`,
      marginLeft: layout.xCorrection,
      marginTop: layout.yCorrection,
      overflow: "hidden"
    };
  };
  var calculateOuter = ({ layout, scale, config }) => {
    if (!layout || !config) {
      return {};
    }
    const { centerX, centerY } = layout;
    return {
      width: config.width * scale,
      height: config.height * scale,
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      left: centerX,
      top: centerY,
      overflow: "hidden"
    };
  };
  var PlayerEventEmitterContext = import_react2.default.createContext(void 0);
  var ThumbnailEmitterContext = import_react2.default.createContext(void 0);
  var PlayerEmitter = class {
    constructor() {
      this.listeners = {
        ended: [],
        error: [],
        pause: [],
        play: [],
        ratechange: [],
        scalechange: [],
        seeked: [],
        timeupdate: [],
        frameupdate: [],
        fullscreenchange: [],
        volumechange: [],
        mutechange: [],
        waiting: [],
        resume: []
      };
    }
    addEventListener(name, callback) {
      this.listeners[name].push(callback);
    }
    removeEventListener(name, callback) {
      this.listeners[name] = this.listeners[name].filter((l) => l !== callback);
    }
    dispatchEvent(dispatchName, context) {
      this.listeners[dispatchName].forEach((callback) => {
        callback({ detail: context });
      });
    }
    dispatchSeek(frame) {
      this.dispatchEvent("seeked", {
        frame
      });
    }
    dispatchVolumeChange(volume) {
      this.dispatchEvent("volumechange", {
        volume
      });
    }
    dispatchPause() {
      this.dispatchEvent("pause", void 0);
    }
    dispatchPlay() {
      this.dispatchEvent("play", void 0);
    }
    dispatchEnded() {
      this.dispatchEvent("ended", void 0);
    }
    dispatchRateChange(playbackRate) {
      this.dispatchEvent("ratechange", {
        playbackRate
      });
    }
    dispatchScaleChange(scale) {
      this.dispatchEvent("scalechange", {
        scale
      });
    }
    dispatchError(error) {
      this.dispatchEvent("error", {
        error
      });
    }
    dispatchTimeUpdate(event) {
      this.dispatchEvent("timeupdate", event);
    }
    dispatchFrameUpdate(event) {
      this.dispatchEvent("frameupdate", event);
    }
    dispatchFullscreenChange(event) {
      this.dispatchEvent("fullscreenchange", event);
    }
    dispatchMuteChange(event) {
      this.dispatchEvent("mutechange", event);
    }
    dispatchWaiting(event) {
      this.dispatchEvent("waiting", event);
    }
    dispatchResume(event) {
      this.dispatchEvent("resume", event);
    }
  };
  var ThumbnailEmitter = class {
    constructor() {
      this.listeners = {
        error: [],
        waiting: [],
        resume: []
      };
    }
    addEventListener(name, callback) {
      this.listeners[name].push(callback);
    }
    removeEventListener(name, callback) {
      this.listeners[name] = this.listeners[name].filter((l) => l !== callback);
    }
    dispatchEvent(dispatchName, context) {
      this.listeners[dispatchName].forEach((callback) => {
        callback({ detail: context });
      });
    }
    dispatchError(error) {
      this.dispatchEvent("error", {
        error
      });
    }
    dispatchWaiting(event) {
      this.dispatchEvent("waiting", event);
    }
    dispatchResume(event) {
      this.dispatchEvent("resume", event);
    }
  };
  var useBufferStateEmitter = (emitter) => {
    const bufferManager = (0, import_react2.useContext)(Internals.BufferingContextReact);
    if (!bufferManager) {
      throw new Error("BufferingContextReact not found");
    }
    (0, import_react2.useEffect)(() => {
      const clear1 = bufferManager.listenForBuffering(() => {
        bufferManager.buffering.current = true;
        emitter.dispatchWaiting({});
      });
      const clear2 = bufferManager.listenForResume(() => {
        bufferManager.buffering.current = false;
        emitter.dispatchResume({});
      });
      return () => {
        clear1.remove();
        clear2.remove();
      };
    }, [bufferManager, emitter]);
  };
  var PlayerEmitterProvider = ({ children, currentPlaybackRate }) => {
    const [emitter] = (0, import_react2.useState)(() => new PlayerEmitter());
    const bufferManager = (0, import_react2.useContext)(Internals.BufferingContextReact);
    if (!bufferManager) {
      throw new Error("BufferingContextReact not found");
    }
    (0, import_react2.useEffect)(() => {
      if (currentPlaybackRate) {
        emitter.dispatchRateChange(currentPlaybackRate);
      }
    }, [emitter, currentPlaybackRate]);
    useBufferStateEmitter(emitter);
    return (0, import_jsx_runtime2.jsx)(PlayerEventEmitterContext.Provider, { value: emitter, children });
  };
  var useHoverState = (ref, hideControlsWhenPointerDoesntMove) => {
    const [hovered, setHovered] = (0, import_react2.useState)(false);
    (0, import_react2.useEffect)(() => {
      const { current } = ref;
      if (!current) {
        return;
      }
      let hoverTimeout;
      const addHoverTimeout = () => {
        if (hideControlsWhenPointerDoesntMove) {
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            setHovered(false);
          }, hideControlsWhenPointerDoesntMove === true ? 3e3 : hideControlsWhenPointerDoesntMove);
        }
      };
      const onHover = () => {
        setHovered(true);
        addHoverTimeout();
      };
      const onLeave = () => {
        setHovered(false);
        clearTimeout(hoverTimeout);
      };
      const onMove = () => {
        setHovered(true);
        addHoverTimeout();
      };
      current.addEventListener("mouseenter", onHover);
      current.addEventListener("mouseleave", onLeave);
      current.addEventListener("mousemove", onMove);
      return () => {
        current.removeEventListener("mouseenter", onHover);
        current.removeEventListener("mouseleave", onLeave);
        current.removeEventListener("mousemove", onMove);
        clearTimeout(hoverTimeout);
      };
    }, [hideControlsWhenPointerDoesntMove, ref]);
    return hovered;
  };
  var calculateNextFrame = ({ time, currentFrame: startFrame, playbackSpeed, fps, actualLastFrame, actualFirstFrame, framesAdvanced, shouldLoop }) => {
    const op = playbackSpeed < 0 ? Math.ceil : Math.floor;
    const framesToAdvance = op(time * playbackSpeed / (1e3 / fps)) - framesAdvanced;
    const nextFrame = framesToAdvance + startFrame;
    const isCurrentFrameOutside = startFrame > actualLastFrame || startFrame < actualFirstFrame;
    const isNextFrameOutside = nextFrame > actualLastFrame || nextFrame < actualFirstFrame;
    const hasEnded = !shouldLoop && isNextFrameOutside && !isCurrentFrameOutside;
    if (playbackSpeed > 0) {
      if (isNextFrameOutside) {
        return {
          nextFrame: actualFirstFrame,
          framesToAdvance,
          hasEnded
        };
      }
      return { nextFrame, framesToAdvance, hasEnded };
    }
    if (isNextFrameOutside) {
      return { nextFrame: actualLastFrame, framesToAdvance, hasEnded };
    }
    return { nextFrame, framesToAdvance, hasEnded };
  };
  var getIsBackgrounded = () => {
    if (typeof document === "undefined") {
      return false;
    }
    return document.visibilityState === "hidden";
  };
  var useIsBackgrounded = () => {
    const isBackgrounded = (0, import_react2.useRef)(getIsBackgrounded());
    (0, import_react2.useEffect)(() => {
      const onVisibilityChange = () => {
        isBackgrounded.current = getIsBackgrounded();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);
      return () => {
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    }, []);
    return isBackgrounded;
  };
  var usePlayer = () => {
    var _a;
    const [playing, setPlaying, imperativePlaying] = Internals.Timeline.usePlayingState();
    const [hasPlayed, setHasPlayed] = (0, import_react2.useState)(false);
    const frame = Internals.Timeline.useTimelinePosition();
    const playStart = (0, import_react2.useRef)(frame);
    const setFrame = Internals.Timeline.useTimelineSetFrame();
    const setTimelinePosition = Internals.Timeline.useTimelineSetFrame();
    const audioContext = (0, import_react2.useContext)(Internals.SharedAudioContext);
    const { audioAndVideoTags } = (0, import_react2.useContext)(Internals.Timeline.TimelineContext);
    const frameRef = (0, import_react2.useRef)(frame);
    frameRef.current = frame;
    const video = Internals.useVideo();
    const config = Internals.useUnsafeVideoConfig();
    const emitter = (0, import_react2.useContext)(PlayerEventEmitterContext);
    const lastFrame = ((_a = config === null || config === void 0 ? void 0 : config.durationInFrames) !== null && _a !== void 0 ? _a : 1) - 1;
    const isLastFrame = frame === lastFrame;
    const isFirstFrame = frame === 0;
    if (!emitter) {
      throw new TypeError("Expected Player event emitter context");
    }
    const bufferingContext = (0, import_react2.useContext)(Internals.BufferingContextReact);
    if (!bufferingContext) {
      throw new Error("Missing the buffering context. Most likely you have a Remotion version mismatch.");
    }
    const { buffering } = bufferingContext;
    const seek2 = (0, import_react2.useCallback)((newFrame) => {
      if (video === null || video === void 0 ? void 0 : video.id) {
        setTimelinePosition((c2) => ({ ...c2, [video.id]: newFrame }));
      }
      frameRef.current = newFrame;
      emitter.dispatchSeek(newFrame);
    }, [emitter, setTimelinePosition, video === null || video === void 0 ? void 0 : video.id]);
    const play = (0, import_react2.useCallback)((e) => {
      if (imperativePlaying.current) {
        return;
      }
      setHasPlayed(true);
      if (isLastFrame) {
        seek2(0);
      }
      if (audioContext && audioContext.numberOfAudioTags > 0 && e) {
        audioContext.playAllAudios();
      }
      audioAndVideoTags.current.forEach((a2) => a2.play());
      imperativePlaying.current = true;
      setPlaying(true);
      playStart.current = frameRef.current;
      emitter.dispatchPlay();
    }, [
      imperativePlaying,
      isLastFrame,
      audioContext,
      setPlaying,
      emitter,
      seek2,
      audioAndVideoTags
    ]);
    const pause = (0, import_react2.useCallback)(() => {
      if (imperativePlaying.current) {
        imperativePlaying.current = false;
        setPlaying(false);
        emitter.dispatchPause();
      }
    }, [emitter, imperativePlaying, setPlaying]);
    const pauseAndReturnToPlayStart = (0, import_react2.useCallback)(() => {
      if (imperativePlaying.current) {
        imperativePlaying.current = false;
        frameRef.current = playStart.current;
        if (config) {
          setTimelinePosition((c2) => ({
            ...c2,
            [config.id]: playStart.current
          }));
          setPlaying(false);
          emitter.dispatchPause();
        }
      }
    }, [config, emitter, imperativePlaying, setPlaying, setTimelinePosition]);
    const videoId = video === null || video === void 0 ? void 0 : video.id;
    const frameBack = (0, import_react2.useCallback)((frames) => {
      if (!videoId) {
        return null;
      }
      if (imperativePlaying.current) {
        return;
      }
      setFrame((c2) => {
        var _a2, _b;
        const prev = (_b = (_a2 = c2[videoId]) !== null && _a2 !== void 0 ? _a2 : window.remotion_initialFrame) !== null && _b !== void 0 ? _b : 0;
        return {
          ...c2,
          [videoId]: Math.max(0, prev - frames)
        };
      });
    }, [imperativePlaying, setFrame, videoId]);
    const frameForward = (0, import_react2.useCallback)((frames) => {
      if (!videoId) {
        return null;
      }
      if (imperativePlaying.current) {
        return;
      }
      setFrame((c2) => {
        var _a2, _b;
        const prev = (_b = (_a2 = c2[videoId]) !== null && _a2 !== void 0 ? _a2 : window.remotion_initialFrame) !== null && _b !== void 0 ? _b : 0;
        return {
          ...c2,
          [videoId]: Math.min(lastFrame, prev + frames)
        };
      });
    }, [videoId, imperativePlaying, lastFrame, setFrame]);
    const returnValue = (0, import_react2.useMemo)(() => {
      return {
        frameBack,
        frameForward,
        isLastFrame,
        emitter,
        playing,
        play,
        pause,
        seek: seek2,
        isFirstFrame,
        getCurrentFrame: () => frameRef.current,
        isPlaying: () => imperativePlaying.current,
        isBuffering: () => buffering.current,
        pauseAndReturnToPlayStart,
        hasPlayed,
        remotionInternal_currentFrameRef: frameRef
      };
    }, [
      frameBack,
      frameForward,
      isLastFrame,
      emitter,
      playing,
      play,
      pause,
      seek2,
      isFirstFrame,
      pauseAndReturnToPlayStart,
      hasPlayed,
      imperativePlaying,
      buffering
    ]);
    return returnValue;
  };
  var usePlayback = ({ loop, playbackRate, moveToBeginningWhenEnded, inFrame, outFrame, frameRef }) => {
    const config = Internals.useUnsafeVideoConfig();
    const frame = Internals.Timeline.useTimelinePosition();
    const { playing, pause, emitter } = usePlayer();
    const setFrame = Internals.Timeline.useTimelineSetFrame();
    const buffering = (0, import_react2.useRef)(null);
    const isBackgroundedRef = useIsBackgrounded();
    const lastTimeUpdateEvent = (0, import_react2.useRef)(null);
    const context = (0, import_react2.useContext)(Internals.BufferingContextReact);
    if (!context) {
      throw new Error("Missing the buffering context. Most likely you have a Remotion version mismatch.");
    }
    (0, import_react2.useEffect)(() => {
      const onBufferClear = context.listenForBuffering(() => {
        buffering.current = performance.now();
      });
      const onResumeClear = context.listenForResume(() => {
        buffering.current = null;
      });
      return () => {
        onBufferClear.remove();
        onResumeClear.remove();
      };
    }, [context]);
    (0, import_react2.useEffect)(() => {
      if (!config) {
        return;
      }
      if (!playing) {
        return;
      }
      let hasBeenStopped = false;
      let reqAnimFrameCall = null;
      let startedTime = performance.now();
      let framesAdvanced = 0;
      const cancelQueuedFrame = () => {
        if (reqAnimFrameCall !== null) {
          if (reqAnimFrameCall.type === "raf") {
            cancelAnimationFrame(reqAnimFrameCall.id);
          } else {
            clearTimeout(reqAnimFrameCall.id);
          }
        }
      };
      const stop = () => {
        hasBeenStopped = true;
        cancelQueuedFrame();
      };
      const callback = () => {
        const time = performance.now() - startedTime;
        const actualLastFrame = outFrame !== null && outFrame !== void 0 ? outFrame : config.durationInFrames - 1;
        const actualFirstFrame = inFrame !== null && inFrame !== void 0 ? inFrame : 0;
        const currentFrame = frameRef.current;
        const { nextFrame, framesToAdvance, hasEnded } = calculateNextFrame({
          time,
          currentFrame,
          playbackSpeed: playbackRate,
          fps: config.fps,
          actualFirstFrame,
          actualLastFrame,
          framesAdvanced,
          shouldLoop: loop
        });
        framesAdvanced += framesToAdvance;
        if (nextFrame !== frameRef.current && (!hasEnded || moveToBeginningWhenEnded)) {
          setFrame((c2) => ({ ...c2, [config.id]: nextFrame }));
        }
        if (hasEnded) {
          stop();
          pause();
          emitter.dispatchEnded();
          return;
        }
        if (!hasBeenStopped) {
          queueNextFrame();
        }
      };
      const queueNextFrame = () => {
        if (buffering.current) {
          const stopListening = context.listenForResume(() => {
            stopListening.remove();
            if (hasBeenStopped) {
              return;
            }
            startedTime = performance.now();
            framesAdvanced = 0;
            callback();
          });
          return;
        }
        if (isBackgroundedRef.current) {
          reqAnimFrameCall = {
            type: "timeout",
            // Note: Most likely, this will not be 1000 / fps, but the browser will throttle it to ~1/sec.
            id: setTimeout(callback, 1e3 / config.fps)
          };
        } else {
          reqAnimFrameCall = { type: "raf", id: requestAnimationFrame(callback) };
        }
      };
      queueNextFrame();
      const onVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          return;
        }
        cancelQueuedFrame();
        callback();
      };
      window.addEventListener("visibilitychange", onVisibilityChange);
      return () => {
        window.removeEventListener("visibilitychange", onVisibilityChange);
        stop();
      };
    }, [
      config,
      loop,
      pause,
      playing,
      setFrame,
      emitter,
      playbackRate,
      inFrame,
      outFrame,
      moveToBeginningWhenEnded,
      isBackgroundedRef,
      frameRef,
      buffering,
      context
    ]);
    (0, import_react2.useEffect)(() => {
      const interval = setInterval(() => {
        if (lastTimeUpdateEvent.current === frameRef.current) {
          return;
        }
        emitter.dispatchTimeUpdate({ frame: frameRef.current });
        lastTimeUpdateEvent.current = frameRef.current;
      }, 250);
      return () => clearInterval(interval);
    }, [emitter, frameRef]);
    (0, import_react2.useEffect)(() => {
      emitter.dispatchFrameUpdate({ frame });
    }, [emitter, frame]);
  };
  var elementSizeHooks = [];
  var useElementSize = (ref, options) => {
    const [size, setSize] = (0, import_react2.useState)(() => {
      if (!ref.current) {
        return null;
      }
      const rect = ref.current.getClientRects();
      if (!rect[0]) {
        return null;
      }
      return {
        width: rect[0].width,
        height: rect[0].height,
        left: rect[0].x,
        top: rect[0].y,
        windowSize: {
          height: window.innerHeight,
          width: window.innerWidth
        }
      };
    });
    const observer = (0, import_react2.useMemo)(() => {
      if (typeof ResizeObserver === "undefined") {
        return null;
      }
      return new ResizeObserver((entries) => {
        const { contentRect, target } = entries[0];
        const newSize = target.getClientRects();
        if (!(newSize === null || newSize === void 0 ? void 0 : newSize[0])) {
          setSize(null);
          return;
        }
        const probableCssParentScale = contentRect.width === 0 ? 1 : newSize[0].width / contentRect.width;
        const width = options.shouldApplyCssTransforms ? newSize[0].width : newSize[0].width * (1 / probableCssParentScale);
        const height = options.shouldApplyCssTransforms ? newSize[0].height : newSize[0].height * (1 / probableCssParentScale);
        setSize({
          width,
          height,
          left: newSize[0].x,
          top: newSize[0].y,
          windowSize: {
            height: window.innerHeight,
            width: window.innerWidth
          }
        });
      });
    }, [options.shouldApplyCssTransforms]);
    const updateSize = (0, import_react2.useCallback)(() => {
      if (!ref.current) {
        return;
      }
      const rect = ref.current.getClientRects();
      if (!rect[0]) {
        setSize(null);
        return;
      }
      setSize((prevState) => {
        const isSame = prevState && prevState.width === rect[0].width && prevState.height === rect[0].height && prevState.left === rect[0].x && prevState.top === rect[0].y && prevState.windowSize.height === window.innerHeight && prevState.windowSize.width === window.innerWidth;
        if (isSame) {
          return prevState;
        }
        return {
          width: rect[0].width,
          height: rect[0].height,
          left: rect[0].x,
          top: rect[0].y,
          windowSize: {
            height: window.innerHeight,
            width: window.innerWidth
          }
        };
      });
    }, [ref]);
    (0, import_react2.useEffect)(() => {
      if (!observer) {
        return;
      }
      const { current } = ref;
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (current) {
          observer.unobserve(current);
        }
      };
    }, [observer, ref, updateSize]);
    (0, import_react2.useEffect)(() => {
      if (!options.triggerOnWindowResize) {
        return;
      }
      window.addEventListener("resize", updateSize);
      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }, [options.triggerOnWindowResize, updateSize]);
    (0, import_react2.useEffect)(() => {
      elementSizeHooks.push(updateSize);
      return () => {
        elementSizeHooks = elementSizeHooks.filter((e) => e !== updateSize);
      };
    }, [updateSize]);
    return (0, import_react2.useMemo)(() => {
      if (!size) {
        return null;
      }
      return { ...size, refresh: updateSize };
    }, [size, updateSize]);
  };
  var DefaultPlayPauseButton = ({ playing, buffering }) => {
    if (playing && buffering) {
      return (0, import_jsx_runtime2.jsx)(BufferingIndicator, { type: "player" });
    }
    if (playing) {
      return (0, import_jsx_runtime2.jsx)(PauseIcon, {});
    }
    return (0, import_jsx_runtime2.jsx)(PlayIcon, {});
  };
  var BAR_HEIGHT$1 = 5;
  var KNOB_SIZE$1 = 12;
  var VOLUME_SLIDER_WIDTH = 100;
  var MediaVolumeSlider = ({ displayVerticalVolumeSlider }) => {
    const [mediaMuted, setMediaMuted] = Internals.useMediaMutedState();
    const [mediaVolume, setMediaVolume] = Internals.useMediaVolumeState();
    const [focused, setFocused] = (0, import_react2.useState)(false);
    const parentDivRef = (0, import_react2.useRef)(null);
    const inputRef = (0, import_react2.useRef)(null);
    const hover = useHoverState(parentDivRef, false);
    const randomId = (
      // eslint-disable-next-line react-hooks/rules-of-hooks
      typeof import_react2.default.useId === "undefined" ? "volume-slider" : import_react2.default.useId()
    );
    const [randomClass] = (0, import_react2.useState)(() => `__remotion-volume-slider-${random(randomId)}`.replace(".", ""));
    const isMutedOrZero = mediaMuted || mediaVolume === 0;
    const onVolumeChange = (0, import_react2.useCallback)((e) => {
      setMediaVolume(parseFloat(e.target.value));
    }, [setMediaVolume]);
    const onBlur = () => {
      setTimeout(() => {
        if (document.activeElement !== inputRef.current) {
          setFocused(false);
        }
      }, 10);
    };
    const isVolume0 = mediaVolume === 0;
    const onClick = (0, import_react2.useCallback)(() => {
      if (isVolume0) {
        setMediaVolume(1);
        setMediaMuted(false);
        return;
      }
      setMediaMuted((mute) => !mute);
    }, [isVolume0, setMediaMuted, setMediaVolume]);
    const parentDivStyle = (0, import_react2.useMemo)(() => {
      return {
        display: "inline-flex",
        background: "none",
        border: "none",
        justifyContent: "center",
        alignItems: "center",
        touchAction: "none",
        ...displayVerticalVolumeSlider && { position: "relative" }
      };
    }, [displayVerticalVolumeSlider]);
    const volumeContainer = (0, import_react2.useMemo)(() => {
      return {
        display: "inline",
        width: ICON_SIZE2,
        height: ICON_SIZE2,
        cursor: "pointer",
        appearance: "none",
        background: "none",
        border: "none",
        padding: 0
      };
    }, []);
    const sliderContainer = (0, import_react2.useMemo)(() => {
      const paddingLeft = 5;
      const common = {
        paddingLeft,
        height: ICON_SIZE2,
        width: VOLUME_SLIDER_WIDTH
      };
      if (displayVerticalVolumeSlider) {
        return {
          ...common,
          position: "absolute",
          transform: `rotate(-90deg) translateX(${VOLUME_SLIDER_WIDTH / 2 + ICON_SIZE2 / 2}px)`
        };
      }
      return {
        ...common
      };
    }, [displayVerticalVolumeSlider]);
    const inputStyle = (0, import_react2.useMemo)(() => {
      const commonStyle = {
        WebkitAppearance: "none",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: BAR_HEIGHT$1 / 2,
        cursor: "pointer",
        height: BAR_HEIGHT$1,
        width: VOLUME_SLIDER_WIDTH,
        backgroundImage: `linear-gradient(
				to right,
				white ${mediaVolume * 100}%, rgba(255, 255, 255, 0) ${mediaVolume * 100}%
			)`
      };
      if (displayVerticalVolumeSlider) {
        return {
          ...commonStyle,
          bottom: ICON_SIZE2 + VOLUME_SLIDER_WIDTH / 2
        };
      }
      return commonStyle;
    }, [displayVerticalVolumeSlider, mediaVolume]);
    const sliderStyle = `
	.${randomClass}::-webkit-slider-thumb {
		-webkit-appearance: none;
		background-color: white;
		border-radius: ${KNOB_SIZE$1 / 2}px;
		box-shadow: 0 0 2px black;
		height: ${KNOB_SIZE$1}px;
		width: ${KNOB_SIZE$1}px;
	}

	.${randomClass}::-moz-range-thumb {
		-webkit-appearance: none;
		background-color: white;
		border-radius: ${KNOB_SIZE$1 / 2}px;
		box-shadow: 0 0 2px black;
		height: ${KNOB_SIZE$1}px;
		width: ${KNOB_SIZE$1}px;
	}
`;
    return (0, import_jsx_runtime2.jsxs)("div", { ref: parentDivRef, style: parentDivStyle, children: [(0, import_jsx_runtime2.jsx)("style", {
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML: {
        __html: sliderStyle
      }
    }), (0, import_jsx_runtime2.jsx)("button", { "aria-label": isMutedOrZero ? "Unmute sound" : "Mute sound", title: isMutedOrZero ? "Unmute sound" : "Mute sound", onClick, onBlur, onFocus: () => setFocused(true), style: volumeContainer, type: "button", children: isMutedOrZero ? (0, import_jsx_runtime2.jsx)(VolumeOffIcon, {}) : (0, import_jsx_runtime2.jsx)(VolumeOnIcon, {}) }), (focused || hover) && !mediaMuted && !Internals.isIosSafari() ? (0, import_jsx_runtime2.jsx)("div", { style: sliderContainer, children: (0, import_jsx_runtime2.jsx)("input", { ref: inputRef, "aria-label": "Change volume", className: randomClass, max: 1, min: 0, onBlur: () => setFocused(false), onChange: onVolumeChange, step: 0.01, type: "range", value: mediaVolume, style: inputStyle }) }) : null] });
  };
  function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = (0, import_react2.useState)(initialIsVisible);
    const ref = (0, import_react2.useRef)(null);
    (0, import_react2.useEffect)(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsComponentVisible(false);
        }
      };
      document.addEventListener("pointerup", handleClickOutside, true);
      return () => {
        document.removeEventListener("pointerup", handleClickOutside, true);
      };
    }, []);
    return { ref, isComponentVisible, setIsComponentVisible };
  }
  var BOTTOM = 35;
  var THRESHOLD = 70;
  var rateDiv = {
    height: 30,
    paddingRight: 15,
    paddingLeft: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  };
  var checkmarkContainer = {
    width: 22,
    display: "flex",
    alignItems: "center"
  };
  var checkmarkStyle = {
    width: 14,
    height: 14,
    color: "black"
  };
  var Checkmark = () => (0, import_jsx_runtime2.jsx)("svg", { viewBox: "0 0 512 512", style: checkmarkStyle, children: (0, import_jsx_runtime2.jsx)("path", { fill: "currentColor", d: "M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z" }) });
  var PlaybackrateOption = ({ rate, onSelect, selectedRate, keyboardSelectedRate }) => {
    const onClick = (0, import_react2.useCallback)((e) => {
      e.stopPropagation();
      e.preventDefault();
      onSelect(rate);
    }, [onSelect, rate]);
    const [hovered, setHovered] = (0, import_react2.useState)(false);
    const onMouseEnter = (0, import_react2.useCallback)(() => {
      setHovered(true);
    }, []);
    const onMouseLeave = (0, import_react2.useCallback)(() => {
      setHovered(false);
    }, []);
    const isFocused = keyboardSelectedRate === rate;
    const actualStyle = (0, import_react2.useMemo)(() => {
      return {
        ...rateDiv,
        backgroundColor: hovered || isFocused ? "#eee" : "transparent"
      };
    }, [hovered, isFocused]);
    return (0, import_jsx_runtime2.jsxs)("div", { onMouseEnter, onMouseLeave, tabIndex: 0, style: actualStyle, onClick, children: [(0, import_jsx_runtime2.jsx)("div", { style: checkmarkContainer, children: rate === selectedRate ? (0, import_jsx_runtime2.jsx)(Checkmark, {}) : null }), rate.toFixed(1), "x"] }, rate);
  };
  var PlaybackPopup = ({ setIsComponentVisible, playbackRates, canvasSize }) => {
    const { setPlaybackRate, playbackRate } = (0, import_react2.useContext)(Internals.Timeline.TimelineContext);
    const [keyboardSelectedRate, setKeyboardSelectedRate] = (0, import_react2.useState)(playbackRate);
    (0, import_react2.useEffect)(() => {
      const listener = (e) => {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          const currentIndex = playbackRates.findIndex((rate) => rate === keyboardSelectedRate);
          if (currentIndex === 0) {
            return;
          }
          if (currentIndex === -1) {
            setKeyboardSelectedRate(playbackRates[0]);
          } else {
            setKeyboardSelectedRate(playbackRates[currentIndex - 1]);
          }
        } else if (e.key === "ArrowDown") {
          const currentIndex = playbackRates.findIndex((rate) => rate === keyboardSelectedRate);
          if (currentIndex === playbackRates.length - 1) {
            return;
          }
          if (currentIndex === -1) {
            setKeyboardSelectedRate(playbackRates[playbackRates.length - 1]);
          } else {
            setKeyboardSelectedRate(playbackRates[currentIndex + 1]);
          }
        } else if (e.key === "Enter") {
          setPlaybackRate(keyboardSelectedRate);
          setIsComponentVisible(false);
        }
      };
      window.addEventListener("keydown", listener);
      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, [
      playbackRates,
      keyboardSelectedRate,
      setPlaybackRate,
      setIsComponentVisible
    ]);
    const onSelect = (0, import_react2.useCallback)((rate) => {
      setPlaybackRate(rate);
      setIsComponentVisible(false);
    }, [setIsComponentVisible, setPlaybackRate]);
    const playbackPopup = (0, import_react2.useMemo)(() => {
      return {
        position: "absolute",
        right: 0,
        width: 125,
        maxHeight: canvasSize.height - THRESHOLD - BOTTOM,
        bottom: 35,
        background: "#fff",
        borderRadius: 4,
        overflow: "auto",
        color: "black",
        textAlign: "left"
      };
    }, [canvasSize.height]);
    return (0, import_jsx_runtime2.jsx)("div", { style: playbackPopup, children: playbackRates.map((rate) => {
      return (0, import_jsx_runtime2.jsx)(PlaybackrateOption, { selectedRate: playbackRate, onSelect, rate, keyboardSelectedRate }, rate);
    }) });
  };
  var label2 = {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    border: "2px solid white",
    borderRadius: 20,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2
  };
  var playerButtonStyle = {
    appearance: "none",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 6,
    paddingBottom: 6,
    height: 37,
    display: "inline-flex",
    marginBottom: 0,
    marginTop: 0,
    alignItems: "center"
  };
  var button = {
    ...playerButtonStyle,
    position: "relative"
  };
  var PlaybackrateControl = ({ playbackRates, canvasSize }) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const { playbackRate } = (0, import_react2.useContext)(Internals.Timeline.TimelineContext);
    const onClick = (0, import_react2.useCallback)((e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsComponentVisible((prevIsComponentVisible) => !prevIsComponentVisible);
    }, [setIsComponentVisible]);
    return (0, import_jsx_runtime2.jsx)("div", { ref, children: (0, import_jsx_runtime2.jsxs)("button", { type: "button", "aria-label": "Change playback rate", style: button, onClick, children: [(0, import_jsx_runtime2.jsxs)("div", { style: label2, children: [playbackRate, "x"] }), isComponentVisible && (0, import_jsx_runtime2.jsx)(PlaybackPopup, { canvasSize, playbackRates, setIsComponentVisible })] }) });
  };
  var getFrameFromX = (clientX, durationInFrames, width) => {
    var _a;
    const pos = clientX;
    const frame = Math.round(interpolate(pos, [0, width], [0, (_a = durationInFrames - 1) !== null && _a !== void 0 ? _a : 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    }));
    return frame;
  };
  var BAR_HEIGHT = 5;
  var KNOB_SIZE = 12;
  var VERTICAL_PADDING = 4;
  var containerStyle$1 = {
    userSelect: "none",
    paddingTop: VERTICAL_PADDING,
    paddingBottom: VERTICAL_PADDING,
    boxSizing: "border-box",
    cursor: "pointer",
    position: "relative",
    touchAction: "none"
  };
  var barBackground = {
    height: BAR_HEIGHT,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    width: "100%",
    borderRadius: BAR_HEIGHT / 2
  };
  var findBodyInWhichDivIsLocated = (div) => {
    let current = div;
    while (current.parentElement) {
      current = current.parentElement;
    }
    return current;
  };
  var PlayerSeekBar = ({ durationInFrames, onSeekEnd, onSeekStart, inFrame, outFrame }) => {
    var _a;
    const containerRef = (0, import_react2.useRef)(null);
    const barHovered = useHoverState(containerRef, false);
    const size = useElementSize(containerRef, {
      triggerOnWindowResize: true,
      shouldApplyCssTransforms: true
    });
    const { seek: seek2, play, pause, playing } = usePlayer();
    const frame = Internals.Timeline.useTimelinePosition();
    const [dragging, setDragging] = (0, import_react2.useState)({
      dragging: false
    });
    const width = (_a = size === null || size === void 0 ? void 0 : size.width) !== null && _a !== void 0 ? _a : 0;
    const onPointerDown = (0, import_react2.useCallback)((e) => {
      var _a2;
      if (e.button !== 0) {
        return;
      }
      const posLeft = (_a2 = containerRef.current) === null || _a2 === void 0 ? void 0 : _a2.getBoundingClientRect().left;
      const _frame = getFrameFromX(e.clientX - posLeft, durationInFrames, width);
      pause();
      seek2(_frame);
      setDragging({
        dragging: true,
        wasPlaying: playing
      });
      onSeekStart();
    }, [durationInFrames, width, pause, seek2, playing, onSeekStart]);
    const onPointerMove = (0, import_react2.useCallback)((e) => {
      var _a2;
      if (!size) {
        throw new Error("Player has no size");
      }
      if (!dragging.dragging) {
        return;
      }
      const posLeft = (_a2 = containerRef.current) === null || _a2 === void 0 ? void 0 : _a2.getBoundingClientRect().left;
      const _frame = getFrameFromX(e.clientX - posLeft, durationInFrames, size.width);
      seek2(_frame);
    }, [dragging.dragging, durationInFrames, seek2, size]);
    const onPointerUp = (0, import_react2.useCallback)(() => {
      setDragging({
        dragging: false
      });
      if (!dragging.dragging) {
        return;
      }
      if (dragging.wasPlaying) {
        play();
      } else {
        pause();
      }
      onSeekEnd();
    }, [dragging, onSeekEnd, pause, play]);
    (0, import_react2.useEffect)(() => {
      if (!dragging.dragging) {
        return;
      }
      const body = findBodyInWhichDivIsLocated(containerRef.current);
      body.addEventListener("pointermove", onPointerMove);
      body.addEventListener("pointerup", onPointerUp);
      return () => {
        body.removeEventListener("pointermove", onPointerMove);
        body.removeEventListener("pointerup", onPointerUp);
      };
    }, [dragging.dragging, onPointerMove, onPointerUp]);
    const knobStyle = (0, import_react2.useMemo)(() => {
      return {
        height: KNOB_SIZE,
        width: KNOB_SIZE,
        borderRadius: KNOB_SIZE / 2,
        position: "absolute",
        top: VERTICAL_PADDING - KNOB_SIZE / 2 + 5 / 2,
        backgroundColor: "white",
        left: Math.max(0, frame / Math.max(1, durationInFrames - 1) * width - KNOB_SIZE / 2),
        boxShadow: "0 0 2px black",
        opacity: Number(barHovered)
      };
    }, [barHovered, durationInFrames, frame, width]);
    const fillStyle = (0, import_react2.useMemo)(() => {
      return {
        height: BAR_HEIGHT,
        backgroundColor: "rgba(255, 255, 255, 1)",
        width: (frame - (inFrame !== null && inFrame !== void 0 ? inFrame : 0)) / (durationInFrames - 1) * 100 + "%",
        marginLeft: (inFrame !== null && inFrame !== void 0 ? inFrame : 0) / (durationInFrames - 1) * 100 + "%",
        borderRadius: BAR_HEIGHT / 2
      };
    }, [durationInFrames, frame, inFrame]);
    const active = (0, import_react2.useMemo)(() => {
      return {
        height: BAR_HEIGHT,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        width: ((outFrame !== null && outFrame !== void 0 ? outFrame : durationInFrames - 1) - (inFrame !== null && inFrame !== void 0 ? inFrame : 0)) / (durationInFrames - 1) * 100 + "%",
        marginLeft: (inFrame !== null && inFrame !== void 0 ? inFrame : 0) / (durationInFrames - 1) * 100 + "%",
        borderRadius: BAR_HEIGHT / 2,
        position: "absolute"
      };
    }, [durationInFrames, inFrame, outFrame]);
    return (0, import_jsx_runtime2.jsxs)("div", { ref: containerRef, onPointerDown, style: containerStyle$1, children: [(0, import_jsx_runtime2.jsxs)("div", { style: barBackground, children: [(0, import_jsx_runtime2.jsx)("div", { style: active }), (0, import_jsx_runtime2.jsx)("div", { style: fillStyle })] }), (0, import_jsx_runtime2.jsx)("div", { style: knobStyle })] });
  };
  var formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds - minutes * 60);
    return `${String(minutes)}:${String(seconds).padStart(2, "0")}`;
  };
  var X_SPACER = 10;
  var X_PADDING = 12;
  var useVideoControlsResize = ({ allowFullscreen: allowFullScreen, playerWidth }) => {
    const resizeInfo = (0, import_react2.useMemo)(() => {
      const playPauseIconSize = ICON_SIZE2;
      const volumeIconSize = ICON_SIZE2;
      const _fullscreenIconSize = allowFullScreen ? fullscreenIconSize : 0;
      const elementsSize = volumeIconSize + playPauseIconSize + _fullscreenIconSize + X_PADDING * 2 + X_SPACER * 2;
      const maxTimeLabelWidth = playerWidth - elementsSize;
      const maxTimeLabelWidthWithoutNegativeValue = Math.max(maxTimeLabelWidth, 0);
      const availableTimeLabelWidthIfVolumeOpen = maxTimeLabelWidthWithoutNegativeValue - VOLUME_SLIDER_WIDTH;
      const computedLabelWidth = availableTimeLabelWidthIfVolumeOpen < VOLUME_SLIDER_WIDTH ? maxTimeLabelWidthWithoutNegativeValue : availableTimeLabelWidthIfVolumeOpen;
      const minWidthForHorizontalDisplay = computedLabelWidth + elementsSize + VOLUME_SLIDER_WIDTH;
      const displayVerticalVolumeSlider = playerWidth < minWidthForHorizontalDisplay;
      return {
        maxTimeLabelWidth: maxTimeLabelWidthWithoutNegativeValue === 0 ? null : maxTimeLabelWidthWithoutNegativeValue,
        displayVerticalVolumeSlider
      };
    }, [allowFullScreen, playerWidth]);
    return resizeInfo;
  };
  var gradientSteps = [
    0,
    0.013,
    0.049,
    0.104,
    0.175,
    0.259,
    0.352,
    0.45,
    0.55,
    0.648,
    0.741,
    0.825,
    0.896,
    0.951,
    0.987
  ];
  var gradientOpacities = [
    0,
    8.1,
    15.5,
    22.5,
    29,
    35.3,
    41.2,
    47.1,
    52.9,
    58.8,
    64.7,
    71,
    77.5,
    84.5,
    91.9
  ];
  var globalGradientOpacity = 1 / 0.7;
  var containerStyle = {
    boxSizing: "border-box",
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingTop: 40,
    paddingBottom: 10,
    backgroundImage: `linear-gradient(to bottom,${gradientSteps.map((g, i) => {
      return `hsla(0, 0%, 0%, ${g}) ${gradientOpacities[i] * globalGradientOpacity}%`;
    }).join(", ")}, hsl(0, 0%, 0%) 100%)`,
    backgroundSize: "auto 145px",
    display: "flex",
    paddingRight: X_PADDING,
    paddingLeft: X_PADDING,
    flexDirection: "column",
    transition: "opacity 0.3s"
  };
  var controlsRow = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none"
  };
  var leftPartStyle = {
    display: "flex",
    flexDirection: "row",
    userSelect: "none",
    alignItems: "center"
  };
  var xSpacer = {
    width: 12
  };
  var ySpacer = {
    height: 8
  };
  var flex1 = {
    flex: 1
  };
  var fullscreen = {};
  var Controls = ({ durationInFrames, isFullscreen, fps, player, showVolumeControls, onFullscreenButtonClick, allowFullscreen, onExitFullscreenButtonClick, spaceKeyToPlayOrPause, onSeekEnd, onSeekStart, inFrame, outFrame, initiallyShowControls, canvasSize, renderPlayPauseButton, renderFullscreenButton, alwaysShowControls, showPlaybackRateControl, containerRef, buffering, hideControlsWhenPointerDoesntMove, onPointerUp, onDoubleClick }) => {
    var _a, _b;
    const playButtonRef = (0, import_react2.useRef)(null);
    const frame = Internals.Timeline.useTimelinePosition();
    const [supportsFullscreen, setSupportsFullscreen] = (0, import_react2.useState)(false);
    const hovered = useHoverState(containerRef, hideControlsWhenPointerDoesntMove);
    const { maxTimeLabelWidth, displayVerticalVolumeSlider } = useVideoControlsResize({
      allowFullscreen,
      playerWidth: (_a = canvasSize === null || canvasSize === void 0 ? void 0 : canvasSize.width) !== null && _a !== void 0 ? _a : 0
    });
    const [shouldShowInitially, setInitiallyShowControls] = (0, import_react2.useState)(() => {
      if (typeof initiallyShowControls === "boolean") {
        return initiallyShowControls;
      }
      if (typeof initiallyShowControls === "number") {
        if (initiallyShowControls % 1 !== 0) {
          throw new Error("initiallyShowControls must be an integer or a boolean");
        }
        if (Number.isNaN(initiallyShowControls)) {
          throw new Error("initiallyShowControls must not be NaN");
        }
        if (!Number.isFinite(initiallyShowControls)) {
          throw new Error("initiallyShowControls must be finite");
        }
        if (initiallyShowControls <= 0) {
          throw new Error("initiallyShowControls must be a positive integer");
        }
        return initiallyShowControls;
      }
      throw new TypeError("initiallyShowControls must be a number or a boolean");
    });
    const containerCss = (0, import_react2.useMemo)(() => {
      const shouldShow = hovered || !player.playing || shouldShowInitially || alwaysShowControls;
      return {
        ...containerStyle,
        opacity: Number(shouldShow)
      };
    }, [hovered, shouldShowInitially, player.playing, alwaysShowControls]);
    (0, import_react2.useEffect)(() => {
      if (playButtonRef.current && spaceKeyToPlayOrPause) {
        playButtonRef.current.focus({
          preventScroll: true
        });
      }
    }, [player.playing, spaceKeyToPlayOrPause]);
    (0, import_react2.useEffect)(() => {
      var _a2;
      setSupportsFullscreen((_a2 = typeof document !== "undefined" && (document.fullscreenEnabled || document.webkitFullscreenEnabled)) !== null && _a2 !== void 0 ? _a2 : false);
    }, []);
    (0, import_react2.useEffect)(() => {
      if (shouldShowInitially === false) {
        return;
      }
      const time = shouldShowInitially === true ? 2e3 : shouldShowInitially;
      const timeout = setTimeout(() => {
        setInitiallyShowControls(false);
      }, time);
      return () => {
        clearInterval(timeout);
      };
    }, [shouldShowInitially]);
    const timeLabel = (0, import_react2.useMemo)(() => {
      return {
        color: "white",
        fontFamily: "sans-serif",
        fontSize: 14,
        maxWidth: maxTimeLabelWidth === null ? void 0 : maxTimeLabelWidth,
        overflow: "hidden",
        textOverflow: "ellipsis"
      };
    }, [maxTimeLabelWidth]);
    const playbackRates = (0, import_react2.useMemo)(() => {
      if (showPlaybackRateControl === true) {
        return [0.5, 0.8, 1, 1.2, 1.5, 1.8, 2, 2.5, 3];
      }
      if (Array.isArray(showPlaybackRateControl)) {
        for (const rate of showPlaybackRateControl) {
          if (typeof rate !== "number") {
            throw new Error("Every item in showPlaybackRateControl must be a number");
          }
          if (rate <= 0) {
            throw new Error("Every item in showPlaybackRateControl must be positive");
          }
        }
        return showPlaybackRateControl;
      }
      return null;
    }, [showPlaybackRateControl]);
    const ref = (0, import_react2.useRef)(null);
    const flexRef = (0, import_react2.useRef)(null);
    const onPointerUpIfContainer = (0, import_react2.useCallback)((e) => {
      if (e.target === ref.current || e.target === flexRef.current) {
        onPointerUp === null || onPointerUp === void 0 ? void 0 : onPointerUp(e);
      }
    }, [onPointerUp]);
    const onDoubleClickIfContainer = (0, import_react2.useCallback)((e) => {
      if (e.target === ref.current || e.target === flexRef.current) {
        onDoubleClick === null || onDoubleClick === void 0 ? void 0 : onDoubleClick(e);
      }
    }, [onDoubleClick]);
    return (0, import_jsx_runtime2.jsxs)("div", { ref, style: containerCss, onPointerUp: onPointerUpIfContainer, onDoubleClick: onDoubleClickIfContainer, children: [(0, import_jsx_runtime2.jsxs)("div", { ref: flexRef, style: controlsRow, children: [(0, import_jsx_runtime2.jsxs)("div", { style: leftPartStyle, children: [(0, import_jsx_runtime2.jsx)("button", { ref: playButtonRef, type: "button", style: playerButtonStyle, onClick: player.playing ? player.pause : player.play, "aria-label": player.playing ? "Pause video" : "Play video", title: player.playing ? "Pause video" : "Play video", children: renderPlayPauseButton === null ? (0, import_jsx_runtime2.jsx)(DefaultPlayPauseButton, { buffering, playing: player.playing }) : (_b = renderPlayPauseButton({
      playing: player.playing,
      isBuffering: buffering
    })) !== null && _b !== void 0 ? _b : (0, import_jsx_runtime2.jsx)(DefaultPlayPauseButton, { buffering, playing: player.playing }) }), showVolumeControls ? (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [(0, import_jsx_runtime2.jsx)("div", { style: xSpacer }), (0, import_jsx_runtime2.jsx)(MediaVolumeSlider, { displayVerticalVolumeSlider })] }) : null, (0, import_jsx_runtime2.jsx)("div", { style: xSpacer }), (0, import_jsx_runtime2.jsxs)("div", { style: timeLabel, children: [formatTime(frame / fps), " / ", formatTime(durationInFrames / fps)] }), (0, import_jsx_runtime2.jsx)("div", { style: xSpacer })] }), (0, import_jsx_runtime2.jsx)("div", { style: flex1 }), playbackRates && canvasSize && (0, import_jsx_runtime2.jsx)(PlaybackrateControl, { canvasSize, playbackRates }), playbackRates && supportsFullscreen && allowFullscreen ? (0, import_jsx_runtime2.jsx)("div", { style: xSpacer }) : null, (0, import_jsx_runtime2.jsx)("div", { style: fullscreen, children: supportsFullscreen && allowFullscreen ? (0, import_jsx_runtime2.jsx)("button", { type: "button", "aria-label": isFullscreen ? "Exit fullscreen" : "Enter Fullscreen", title: isFullscreen ? "Exit fullscreen" : "Enter Fullscreen", style: playerButtonStyle, onClick: isFullscreen ? onExitFullscreenButtonClick : onFullscreenButtonClick, children: renderFullscreenButton === null ? (0, import_jsx_runtime2.jsx)(FullscreenIcon, { isFullscreen }) : renderFullscreenButton({ isFullscreen }) }) : null })] }), (0, import_jsx_runtime2.jsx)("div", { style: ySpacer }), (0, import_jsx_runtime2.jsx)(PlayerSeekBar, { onSeekEnd, onSeekStart, durationInFrames, inFrame, outFrame })] });
  };
  var errorStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
    width: "100%"
  };
  var ErrorBoundary = class extends import_react2.default.Component {
    constructor() {
      super(...arguments);
      this.state = { hasError: null };
    }
    static getDerivedStateFromError(error) {
      return { hasError: error };
    }
    componentDidCatch(error) {
      this.props.onError(error);
    }
    render() {
      if (this.state.hasError) {
        return (0, import_jsx_runtime2.jsx)("div", { style: errorStyle, children: this.props.errorFallback({
          error: this.state.hasError
        }) });
      }
      return this.props.children;
    }
  };
  var PLAYER_CSS_CLASSNAME = "__remotion-player";
  var IS_NODE = typeof document === "undefined";
  var cancellablePromise = (promise) => {
    let isCanceled = false;
    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then((value) => {
        if (isCanceled) {
          reject({ isCanceled, value });
          return;
        }
        resolve(value);
      }).catch((error) => {
        reject({ isCanceled, error });
      });
    });
    return {
      promise: wrappedPromise,
      cancel: () => {
        isCanceled = true;
      }
    };
  };
  var delay = (n) => new Promise((resolve) => setTimeout(resolve, n));
  var useCancellablePromises = () => {
    const pendingPromises = (0, import_react2.useRef)([]);
    const appendPendingPromise = (0, import_react2.useCallback)((promise) => {
      pendingPromises.current = [...pendingPromises.current, promise];
    }, []);
    const removePendingPromise = (0, import_react2.useCallback)((promise) => {
      pendingPromises.current = pendingPromises.current.filter((p2) => p2 !== promise);
    }, []);
    const clearPendingPromises = (0, import_react2.useCallback)(() => pendingPromises.current.map((p2) => p2.cancel()), []);
    const api = (0, import_react2.useMemo)(() => ({
      appendPendingPromise,
      removePendingPromise,
      clearPendingPromises
    }), [appendPendingPromise, clearPendingPromises, removePendingPromise]);
    return api;
  };
  var useClickPreventionOnDoubleClick = (onClick, onDoubleClick, doubleClickToFullscreen) => {
    const api = useCancellablePromises();
    const handleClick = (0, import_react2.useCallback)(async (e) => {
      if (e.nativeEvent.pointerType === "touch") {
        onClick(e);
        return;
      }
      api.clearPendingPromises();
      const waitForClick = cancellablePromise(delay(200));
      api.appendPendingPromise(waitForClick);
      try {
        await waitForClick.promise;
        api.removePendingPromise(waitForClick);
        onClick(e);
      } catch (errorInfo) {
        const info = errorInfo;
        api.removePendingPromise(waitForClick);
        if (!info.isCanceled) {
          throw info.error;
        }
      }
    }, [api, onClick]);
    const handleDoubleClick = (0, import_react2.useCallback)(() => {
      api.clearPendingPromises();
      onDoubleClick();
    }, [api, onDoubleClick]);
    const returnValue = (0, import_react2.useMemo)(() => {
      if (!doubleClickToFullscreen) {
        return [onClick, () => void 0];
      }
      return [handleClick, handleDoubleClick];
    }, [doubleClickToFullscreen, handleClick, handleDoubleClick, onClick]);
    return returnValue;
  };
  var reactVersion$1 = import_react2.default.version.split(".")[0];
  if (reactVersion$1 === "0") {
    throw new Error(`Version ${reactVersion$1} of "react" is not supported by Remotion`);
  }
  var doesReactVersionSupportSuspense$1 = parseInt(reactVersion$1, 10) >= 18;
  var PlayerUI = ({ controls, style, loop, autoPlay, allowFullscreen, inputProps, clickToPlay, showVolumeControls, doubleClickToFullscreen, spaceKeyToPlayOrPause, errorFallback, playbackRate, renderLoading, renderPoster, className: className2, moveToBeginningWhenEnded, showPosterWhenUnplayed, showPosterWhenEnded, showPosterWhenPaused, showPosterWhenBuffering, inFrame, outFrame, initiallyShowControls, renderFullscreen: renderFullscreenButton, renderPlayPauseButton, alwaysShowControls, showPlaybackRateControl, posterFillMode, bufferStateDelayInMilliseconds, hideControlsWhenPointerDoesntMove }, ref) => {
    var _a, _b, _c;
    const config = Internals.useUnsafeVideoConfig();
    const video = Internals.useVideo();
    const container2 = (0, import_react2.useRef)(null);
    const canvasSize = useElementSize(container2, {
      triggerOnWindowResize: false,
      shouldApplyCssTransforms: false
    });
    const [hasPausedToResume, setHasPausedToResume] = (0, import_react2.useState)(false);
    const [shouldAutoplay, setShouldAutoPlay] = (0, import_react2.useState)(autoPlay);
    const [isFullscreen, setIsFullscreen] = (0, import_react2.useState)(() => false);
    const [seeking, setSeeking] = (0, import_react2.useState)(false);
    const supportsFullScreen = (0, import_react2.useMemo)(() => {
      if (typeof document === "undefined") {
        return false;
      }
      return Boolean(document.fullscreenEnabled || document.webkitFullscreenEnabled);
    }, []);
    const player = usePlayer();
    usePlayback({
      loop,
      playbackRate,
      moveToBeginningWhenEnded,
      inFrame,
      outFrame,
      frameRef: player.remotionInternal_currentFrameRef
    });
    (0, import_react2.useEffect)(() => {
      if (hasPausedToResume && !player.playing) {
        setHasPausedToResume(false);
        player.play();
      }
    }, [hasPausedToResume, player]);
    (0, import_react2.useEffect)(() => {
      const { current } = container2;
      if (!current) {
        return;
      }
      const onFullscreenChange = () => {
        setIsFullscreen(document.fullscreenElement === current || document.webkitFullscreenElement === current);
      };
      document.addEventListener("fullscreenchange", onFullscreenChange);
      document.addEventListener("webkitfullscreenchange", onFullscreenChange);
      return () => {
        document.removeEventListener("fullscreenchange", onFullscreenChange);
        document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      };
    }, []);
    const toggle = (0, import_react2.useCallback)((e) => {
      if (player.isPlaying()) {
        player.pause();
      } else {
        player.play(e);
      }
    }, [player]);
    const requestFullscreen = (0, import_react2.useCallback)(() => {
      if (!allowFullscreen) {
        throw new Error("allowFullscreen is false");
      }
      if (!supportsFullScreen) {
        throw new Error("Browser doesnt support fullscreen");
      }
      if (!container2.current) {
        throw new Error("No player ref found");
      }
      if (container2.current.webkitRequestFullScreen) {
        container2.current.webkitRequestFullScreen();
      } else {
        container2.current.requestFullscreen();
      }
    }, [allowFullscreen, supportsFullScreen]);
    const exitFullscreen = (0, import_react2.useCallback)(() => {
      if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else {
        document.exitFullscreen();
      }
    }, []);
    (0, import_react2.useEffect)(() => {
      const { current } = container2;
      if (!current) {
        return;
      }
      const fullscreenChange = () => {
        var _a2;
        const element = (_a2 = document.webkitFullscreenElement) !== null && _a2 !== void 0 ? _a2 : document.fullscreenElement;
        if (element && element === container2.current) {
          player.emitter.dispatchFullscreenChange({
            isFullscreen: true
          });
        } else {
          player.emitter.dispatchFullscreenChange({
            isFullscreen: false
          });
        }
      };
      current.addEventListener("webkitfullscreenchange", fullscreenChange);
      current.addEventListener("fullscreenchange", fullscreenChange);
      return () => {
        current.removeEventListener("webkitfullscreenchange", fullscreenChange);
        current.removeEventListener("fullscreenchange", fullscreenChange);
      };
    }, [player.emitter]);
    const durationInFrames = (_a = config === null || config === void 0 ? void 0 : config.durationInFrames) !== null && _a !== void 0 ? _a : 1;
    const layout = (0, import_react2.useMemo)(() => {
      if (!config || !canvasSize) {
        return null;
      }
      return calculateCanvasTransformation({
        canvasSize,
        compositionHeight: config.height,
        compositionWidth: config.width,
        previewSize: "auto"
      });
    }, [canvasSize, config]);
    const scale = (_b = layout === null || layout === void 0 ? void 0 : layout.scale) !== null && _b !== void 0 ? _b : 1;
    const initialScaleIgnored = (0, import_react2.useRef)(false);
    (0, import_react2.useEffect)(() => {
      if (!initialScaleIgnored.current) {
        initialScaleIgnored.current = true;
        return;
      }
      player.emitter.dispatchScaleChange(scale);
    }, [player.emitter, scale]);
    const { setMediaVolume, setMediaMuted } = (0, import_react2.useContext)(Internals.SetMediaVolumeContext);
    const { mediaMuted, mediaVolume } = (0, import_react2.useContext)(Internals.MediaVolumeContext);
    (0, import_react2.useEffect)(() => {
      player.emitter.dispatchVolumeChange(mediaVolume);
    }, [player.emitter, mediaVolume]);
    const isMuted = mediaMuted || mediaVolume === 0;
    (0, import_react2.useEffect)(() => {
      player.emitter.dispatchMuteChange({
        isMuted
      });
    }, [player.emitter, isMuted]);
    const [showBufferIndicator, setShowBufferState] = (0, import_react2.useState)(false);
    (0, import_react2.useEffect)(() => {
      let timeout = null;
      let stopped = false;
      const onBuffer = () => {
        requestAnimationFrame(() => {
          if (bufferStateDelayInMilliseconds === 0) {
            setShowBufferState(true);
          } else {
            timeout = setTimeout(() => {
              if (!stopped) {
                setShowBufferState(true);
              }
            }, bufferStateDelayInMilliseconds);
          }
        });
      };
      const onResume = () => {
        requestAnimationFrame(() => {
          setShowBufferState(false);
          if (timeout) {
            clearTimeout(timeout);
          }
        });
      };
      player.emitter.addEventListener("waiting", onBuffer);
      player.emitter.addEventListener("resume", onResume);
      return () => {
        player.emitter.removeEventListener("waiting", onBuffer);
        player.emitter.removeEventListener("resume", onResume);
        setShowBufferState(false);
        if (timeout) {
          clearTimeout(timeout);
        }
        stopped = true;
      };
    }, [bufferStateDelayInMilliseconds, player.emitter]);
    (0, import_react2.useImperativeHandle)(ref, () => {
      const methods = {
        play: player.play,
        pause: () => {
          setHasPausedToResume(false);
          player.pause();
        },
        toggle,
        getContainerNode: () => container2.current,
        getCurrentFrame: player.getCurrentFrame,
        isPlaying: () => player.playing,
        seekTo: (f) => {
          const lastFrame = durationInFrames - 1;
          const frameToSeekTo = Math.max(0, Math.min(lastFrame, f));
          if (player.isPlaying()) {
            const pauseToResume = frameToSeekTo !== lastFrame || loop;
            setHasPausedToResume(pauseToResume);
            player.pause();
          }
          if (frameToSeekTo === lastFrame && !loop) {
            player.emitter.dispatchEnded();
          }
          player.seek(frameToSeekTo);
        },
        isFullscreen: () => isFullscreen,
        requestFullscreen,
        exitFullscreen,
        getVolume: () => {
          if (mediaMuted) {
            return 0;
          }
          return mediaVolume;
        },
        setVolume: (vol) => {
          if (typeof vol !== "number") {
            throw new TypeError(`setVolume() takes a number, got value of type ${typeof vol}`);
          }
          if (isNaN(vol)) {
            throw new TypeError(`setVolume() got a number that is NaN. Volume must be between 0 and 1.`);
          }
          if (vol < 0 || vol > 1) {
            throw new TypeError(`setVolume() got a number that is out of range. Must be between 0 and 1, got ${typeof vol}`);
          }
          setMediaVolume(vol);
        },
        isMuted: () => isMuted,
        mute: () => {
          setMediaMuted(true);
        },
        unmute: () => {
          setMediaMuted(false);
        },
        getScale: () => scale,
        pauseAndReturnToPlayStart: () => {
          player.pauseAndReturnToPlayStart();
        }
      };
      return Object.assign(player.emitter, methods);
    }, [
      durationInFrames,
      exitFullscreen,
      isFullscreen,
      loop,
      mediaMuted,
      isMuted,
      mediaVolume,
      player,
      requestFullscreen,
      setMediaMuted,
      setMediaVolume,
      toggle,
      scale
    ]);
    const VideoComponent = video ? video.component : null;
    const outerStyle = (0, import_react2.useMemo)(() => {
      return calculateOuterStyle({ canvasSize, config, style });
    }, [canvasSize, config, style]);
    const outer = (0, import_react2.useMemo)(() => {
      return calculateOuter({ config, layout, scale });
    }, [config, layout, scale]);
    const containerStyle2 = (0, import_react2.useMemo)(() => {
      return calculateContainerStyle({ canvasSize, config, layout, scale });
    }, [canvasSize, config, layout, scale]);
    const onError = (0, import_react2.useCallback)((error) => {
      player.pause();
      player.emitter.dispatchError(error);
    }, [player]);
    const onFullscreenButtonClick = (0, import_react2.useCallback)((e) => {
      e.stopPropagation();
      requestFullscreen();
    }, [requestFullscreen]);
    const onExitFullscreenButtonClick = (0, import_react2.useCallback)((e) => {
      e.stopPropagation();
      exitFullscreen();
    }, [exitFullscreen]);
    const onSingleClick = (0, import_react2.useCallback)((e) => {
      toggle(e);
    }, [toggle]);
    const onSeekStart = (0, import_react2.useCallback)(() => {
      setSeeking(true);
    }, []);
    const onSeekEnd = (0, import_react2.useCallback)(() => {
      setSeeking(false);
    }, []);
    const onDoubleClick = (0, import_react2.useCallback)(() => {
      if (isFullscreen) {
        exitFullscreen();
      } else {
        requestFullscreen();
      }
    }, [exitFullscreen, isFullscreen, requestFullscreen]);
    const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(onSingleClick, onDoubleClick, doubleClickToFullscreen && allowFullscreen && supportsFullScreen);
    (0, import_react2.useEffect)(() => {
      if (shouldAutoplay) {
        player.play();
        setShouldAutoPlay(false);
      }
    }, [shouldAutoplay, player]);
    const loadingMarkup = (0, import_react2.useMemo)(() => {
      return renderLoading ? renderLoading({
        height: outerStyle.height,
        width: outerStyle.width,
        isBuffering: showBufferIndicator
      }) : null;
    }, [outerStyle.height, outerStyle.width, renderLoading, showBufferIndicator]);
    const currentScale = (0, import_react2.useMemo)(() => {
      return {
        type: "scale",
        scale
      };
    }, [scale]);
    if (!config) {
      return null;
    }
    const poster = renderPoster ? renderPoster({
      height: posterFillMode === "player-size" ? outerStyle.height : config.height,
      width: posterFillMode === "player-size" ? outerStyle.width : config.width,
      isBuffering: showBufferIndicator
    }) : null;
    if (poster === void 0) {
      throw new TypeError("renderPoster() must return a React element, but undefined was returned");
    }
    const shouldShowPoster = poster && [
      showPosterWhenPaused && !player.isPlaying() && !seeking,
      showPosterWhenEnded && player.isLastFrame && !player.isPlaying(),
      showPosterWhenUnplayed && !player.hasPlayed && !player.isPlaying(),
      showPosterWhenBuffering && showBufferIndicator && player.isPlaying()
    ].some(Boolean);
    const { left, top, width, height, ...outerWithoutScale } = outer;
    const content = (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [(0, import_jsx_runtime2.jsx)("div", { style: outer, onPointerUp: clickToPlay ? handleClick : void 0, onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0, children: (0, import_jsx_runtime2.jsxs)("div", { style: containerStyle2, className: PLAYER_CSS_CLASSNAME, children: [VideoComponent ? (0, import_jsx_runtime2.jsx)(ErrorBoundary, { onError, errorFallback, children: (0, import_jsx_runtime2.jsx)(Internals.ClipComposition, { children: (0, import_jsx_runtime2.jsx)(Internals.CurrentScaleContext.Provider, { value: currentScale, children: (0, import_jsx_runtime2.jsx)(VideoComponent, { ...(_c = video === null || video === void 0 ? void 0 : video.props) !== null && _c !== void 0 ? _c : {}, ...inputProps !== null && inputProps !== void 0 ? inputProps : {} }) }) }) }) : null, shouldShowPoster && posterFillMode === "composition-size" ? (0, import_jsx_runtime2.jsx)("div", { style: {
      ...outerWithoutScale,
      width: config.width,
      height: config.height
    }, onPointerUp: clickToPlay ? handleClick : void 0, onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0, children: poster }) : null] }) }), shouldShowPoster && posterFillMode === "player-size" ? (0, import_jsx_runtime2.jsx)("div", { style: outer, onPointerUp: clickToPlay ? handleClick : void 0, onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0, children: poster }) : null, controls ? (0, import_jsx_runtime2.jsx)(Controls, { fps: config.fps, durationInFrames: config.durationInFrames, player, containerRef: container2, onFullscreenButtonClick, isFullscreen, allowFullscreen, showVolumeControls, onExitFullscreenButtonClick, spaceKeyToPlayOrPause, onSeekEnd, onSeekStart, inFrame, outFrame, initiallyShowControls, canvasSize, renderFullscreenButton, renderPlayPauseButton, alwaysShowControls, showPlaybackRateControl, buffering: showBufferIndicator, hideControlsWhenPointerDoesntMove, onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0, onPointerUp: clickToPlay ? handleClick : void 0 }) : null] });
    if (IS_NODE && !doesReactVersionSupportSuspense$1) {
      return (0, import_jsx_runtime2.jsx)("div", { ref: container2, style: outerStyle, className: className2, children: content });
    }
    return (0, import_jsx_runtime2.jsx)("div", { ref: container2, style: outerStyle, className: className2, children: (0, import_jsx_runtime2.jsx)(import_react2.Suspense, { fallback: loadingMarkup, children: content }) });
  };
  var PlayerUI$1 = (0, import_react2.forwardRef)(PlayerUI);
  var VOLUME_PERSISTANCE_KEY = "remotion.volumePreference";
  var persistVolume = (volume) => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(VOLUME_PERSISTANCE_KEY, String(volume));
    } catch (e) {
      console.log("Could not persist volume", e);
    }
  };
  var getPreferredVolume = () => {
    if (typeof window === "undefined") {
      return 1;
    }
    try {
      const val = window.localStorage.getItem(VOLUME_PERSISTANCE_KEY);
      return val ? Number(val) : 1;
    } catch (e) {
      return 1;
    }
  };
  var PLAYER_COMP_ID = "player-comp";
  var SharedPlayerContexts = ({ children, timelineContext, fps, compositionHeight, compositionWidth, durationInFrames, component, numberOfSharedAudioTags, initiallyMuted }) => {
    const compositionManagerContext = (0, import_react2.useMemo)(() => {
      const context = {
        compositions: [
          {
            component,
            durationInFrames,
            height: compositionHeight,
            width: compositionWidth,
            fps,
            id: PLAYER_COMP_ID,
            nonce: 777,
            folderName: null,
            parentFolderName: null,
            schema: null,
            calculateMetadata: null
          }
        ],
        folders: [],
        registerFolder: () => void 0,
        unregisterFolder: () => void 0,
        registerComposition: () => void 0,
        unregisterComposition: () => void 0,
        currentCompositionMetadata: null,
        setCurrentCompositionMetadata: () => void 0,
        canvasContent: { type: "composition", compositionId: "player-comp" },
        setCanvasContent: () => void 0
      };
      return context;
    }, [component, durationInFrames, compositionHeight, compositionWidth, fps]);
    const [mediaMuted, setMediaMuted] = (0, import_react2.useState)(() => initiallyMuted);
    const [mediaVolume, setMediaVolume] = (0, import_react2.useState)(() => getPreferredVolume());
    const mediaVolumeContextValue = (0, import_react2.useMemo)(() => {
      return {
        mediaMuted,
        mediaVolume
      };
    }, [mediaMuted, mediaVolume]);
    const setMediaVolumeAndPersist = (0, import_react2.useCallback)((vol) => {
      setMediaVolume(vol);
      persistVolume(vol);
    }, []);
    const setMediaVolumeContextValue = (0, import_react2.useMemo)(() => {
      return {
        setMediaMuted,
        setMediaVolume: setMediaVolumeAndPersist
      };
    }, [setMediaVolumeAndPersist]);
    return (0, import_jsx_runtime2.jsx)(Internals.CanUseRemotionHooksProvider, { children: (0, import_jsx_runtime2.jsx)(Internals.Timeline.TimelineContext.Provider, { value: timelineContext, children: (0, import_jsx_runtime2.jsx)(Internals.CompositionManager.Provider, { value: compositionManagerContext, children: (0, import_jsx_runtime2.jsx)(Internals.ResolveCompositionConfig, { children: (0, import_jsx_runtime2.jsx)(Internals.PrefetchProvider, { children: (0, import_jsx_runtime2.jsx)(Internals.DurationsContextProvider, { children: (0, import_jsx_runtime2.jsx)(Internals.MediaVolumeContext.Provider, { value: mediaVolumeContextValue, children: (0, import_jsx_runtime2.jsx)(Internals.NativeLayersProvider, { children: (0, import_jsx_runtime2.jsx)(Internals.SetMediaVolumeContext.Provider, { value: setMediaVolumeContextValue, children: (0, import_jsx_runtime2.jsx)(Internals.SharedAudioContextProvider, { numberOfAudioTags: numberOfSharedAudioTags, component, children: (0, import_jsx_runtime2.jsx)(Internals.BufferingProvider, { children }) }) }) }) }) }) }) }) }) }) });
  };
  var validateSingleFrame = (frame, variableName) => {
    if (typeof frame === "undefined" || frame === null) {
      return frame !== null && frame !== void 0 ? frame : null;
    }
    if (typeof frame !== "number") {
      throw new TypeError(`"${variableName}" must be a number, but is ${JSON.stringify(frame)}`);
    }
    if (Number.isNaN(frame)) {
      throw new TypeError(`"${variableName}" must not be NaN, but is ${JSON.stringify(frame)}`);
    }
    if (!Number.isFinite(frame)) {
      throw new TypeError(`"${variableName}" must be finite, but is ${JSON.stringify(frame)}`);
    }
    if (frame % 1 !== 0) {
      throw new TypeError(`"${variableName}" must be an integer, but is ${JSON.stringify(frame)}`);
    }
    return frame;
  };
  var validateInOutFrames = ({ inFrame, durationInFrames, outFrame }) => {
    const validatedInFrame = validateSingleFrame(inFrame, "inFrame");
    const validatedOutFrame = validateSingleFrame(outFrame, "outFrame");
    if (validatedInFrame === null && validatedOutFrame === null) {
      return;
    }
    if (validatedInFrame !== null && validatedInFrame > durationInFrames - 1) {
      throw new Error("inFrame must be less than (durationInFrames - 1), but is " + validatedInFrame);
    }
    if (validatedOutFrame !== null && validatedOutFrame > durationInFrames - 1) {
      throw new Error("outFrame must be less than (durationInFrames - 1), but is " + validatedOutFrame);
    }
    if (validatedInFrame !== null && validatedInFrame < 0) {
      throw new Error("inFrame must be greater than 0, but is " + validatedInFrame);
    }
    if (validatedOutFrame !== null && validatedOutFrame <= 0) {
      throw new Error(`outFrame must be greater than 0, but is ${validatedOutFrame}. If you want to render a single frame, use <Thumbnail /> instead.`);
    }
    if (validatedOutFrame !== null && validatedInFrame !== null && validatedOutFrame <= validatedInFrame) {
      throw new Error("outFrame must be greater than inFrame, but is " + validatedOutFrame + " <= " + validatedInFrame);
    }
  };
  var validateInitialFrame = ({ initialFrame, durationInFrames }) => {
    if (typeof durationInFrames !== "number") {
      throw new Error(`\`durationInFrames\` must be a number, but is ${JSON.stringify(durationInFrames)}`);
    }
    if (typeof initialFrame === "undefined") {
      return;
    }
    if (typeof initialFrame !== "number") {
      throw new Error(`\`initialFrame\` must be a number, but is ${JSON.stringify(initialFrame)}`);
    }
    if (Number.isNaN(initialFrame)) {
      throw new Error(`\`initialFrame\` must be a number, but is NaN`);
    }
    if (!Number.isFinite(initialFrame)) {
      throw new Error(`\`initialFrame\` must be a number, but is Infinity`);
    }
    if (initialFrame % 1 !== 0) {
      throw new Error(`\`initialFrame\` must be an integer, but is ${JSON.stringify(initialFrame)}`);
    }
    if (initialFrame > durationInFrames - 1) {
      throw new Error(`\`initialFrame\` must be less or equal than \`durationInFrames - 1\`, but is ${JSON.stringify(initialFrame)}`);
    }
  };
  var validatePlaybackRate = (playbackRate) => {
    if (playbackRate === void 0) {
      return;
    }
    if (playbackRate > 4) {
      throw new Error(`The highest possible playback rate is 4. You passed: ${playbackRate}`);
    }
    if (playbackRate < -4) {
      throw new Error(`The lowest possible playback rate is -4. You passed: ${playbackRate}`);
    }
    if (playbackRate === 0) {
      throw new Error(`A playback rate of 0 is not supported.`);
    }
  };
  var validateFps3 = NoReactInternals.validateFps;
  var validateDimension3 = NoReactInternals.validateDimension;
  var validateDurationInFrames3 = NoReactInternals.validateDurationInFrames;
  var validateDefaultAndInputProps3 = NoReactInternals.validateDefaultAndInputProps;
  var componentOrNullIfLazy = (props) => {
    if ("component" in props) {
      return props.component;
    }
    return null;
  };
  var PlayerFn = ({ durationInFrames, compositionHeight, compositionWidth, fps, inputProps, style, controls = false, loop = false, autoPlay = false, showVolumeControls = true, allowFullscreen = true, clickToPlay, doubleClickToFullscreen = false, spaceKeyToPlayOrPause = true, moveToBeginningWhenEnded = true, numberOfSharedAudioTags = 5, errorFallback = () => "\u26A0\uFE0F", playbackRate = 1, renderLoading, className: className2, showPosterWhenUnplayed, showPosterWhenEnded, showPosterWhenPaused, showPosterWhenBuffering, initialFrame, renderPoster, inFrame, outFrame, initiallyShowControls, renderFullscreenButton, renderPlayPauseButton, alwaysShowControls = false, initiallyMuted = false, showPlaybackRateControl = false, posterFillMode = "player-size", bufferStateDelayInMilliseconds, hideControlsWhenPointerDoesntMove = true, ...componentProps }, ref) => {
    if (typeof window !== "undefined") {
      (0, import_react2.useLayoutEffect)(() => {
        window.remotion_isPlayer = true;
      }, []);
    }
    if (componentProps.defaultProps !== void 0) {
      throw new Error("The <Player /> component does not accept `defaultProps`, but some were passed. Use `inputProps` instead.");
    }
    const componentForValidation = componentOrNullIfLazy(componentProps);
    if ((componentForValidation === null || componentForValidation === void 0 ? void 0 : componentForValidation.type) === Composition) {
      throw new TypeError(`'component' should not be an instance of <Composition/>. Pass the React component directly, and set the duration, fps and dimensions as separate props. See https://www.remotion.dev/docs/player/examples for an example.`);
    }
    if (componentForValidation === Composition) {
      throw new TypeError(`'component' must not be the 'Composition' component. Pass your own React component directly, and set the duration, fps and dimensions as separate props. See https://www.remotion.dev/docs/player/examples for an example.`);
    }
    const component = Internals.useLazyComponent(componentProps);
    validateInitialFrame({ initialFrame, durationInFrames });
    const [frame, setFrame] = (0, import_react2.useState)(() => ({
      [PLAYER_COMP_ID]: initialFrame !== null && initialFrame !== void 0 ? initialFrame : 0
    }));
    const [playing, setPlaying] = (0, import_react2.useState)(false);
    const [rootId] = (0, import_react2.useState)("player-comp");
    const rootRef = (0, import_react2.useRef)(null);
    const audioAndVideoTags = (0, import_react2.useRef)([]);
    const imperativePlaying = (0, import_react2.useRef)(false);
    const [currentPlaybackRate, setCurrentPlaybackRate] = (0, import_react2.useState)(playbackRate);
    if (typeof compositionHeight !== "number") {
      throw new TypeError(`'compositionHeight' must be a number but got '${typeof compositionHeight}' instead`);
    }
    if (typeof compositionWidth !== "number") {
      throw new TypeError(`'compositionWidth' must be a number but got '${typeof compositionWidth}' instead`);
    }
    validateDimension3(compositionHeight, "compositionHeight", "of the <Player /> component");
    validateDimension3(compositionWidth, "compositionWidth", "of the <Player /> component");
    validateDurationInFrames3(durationInFrames, {
      component: "of the <Player/> component",
      allowFloats: false
    });
    validateFps3(fps, "as a prop of the <Player/> component", false);
    validateDefaultAndInputProps3(inputProps, "inputProps", null);
    validateInOutFrames({
      durationInFrames,
      inFrame,
      outFrame
    });
    if (typeof controls !== "boolean" && typeof controls !== "undefined") {
      throw new TypeError(`'controls' must be a boolean or undefined but got '${typeof controls}' instead`);
    }
    if (typeof autoPlay !== "boolean" && typeof autoPlay !== "undefined") {
      throw new TypeError(`'autoPlay' must be a boolean or undefined but got '${typeof autoPlay}' instead`);
    }
    if (typeof loop !== "boolean" && typeof loop !== "undefined") {
      throw new TypeError(`'loop' must be a boolean or undefined but got '${typeof loop}' instead`);
    }
    if (typeof doubleClickToFullscreen !== "boolean" && typeof doubleClickToFullscreen !== "undefined") {
      throw new TypeError(`'doubleClickToFullscreen' must be a boolean or undefined but got '${typeof doubleClickToFullscreen}' instead`);
    }
    if (typeof showVolumeControls !== "boolean" && typeof showVolumeControls !== "undefined") {
      throw new TypeError(`'showVolumeControls' must be a boolean or undefined but got '${typeof showVolumeControls}' instead`);
    }
    if (typeof allowFullscreen !== "boolean" && typeof allowFullscreen !== "undefined") {
      throw new TypeError(`'allowFullscreen' must be a boolean or undefined but got '${typeof allowFullscreen}' instead`);
    }
    if (typeof clickToPlay !== "boolean" && typeof clickToPlay !== "undefined") {
      throw new TypeError(`'clickToPlay' must be a boolean or undefined but got '${typeof clickToPlay}' instead`);
    }
    if (typeof spaceKeyToPlayOrPause !== "boolean" && typeof spaceKeyToPlayOrPause !== "undefined") {
      throw new TypeError(`'spaceKeyToPlayOrPause' must be a boolean or undefined but got '${typeof spaceKeyToPlayOrPause}' instead`);
    }
    if (typeof numberOfSharedAudioTags !== "number" || numberOfSharedAudioTags % 1 !== 0 || !Number.isFinite(numberOfSharedAudioTags) || Number.isNaN(numberOfSharedAudioTags) || numberOfSharedAudioTags < 0) {
      throw new TypeError(`'numberOfSharedAudioTags' must be an integer but got '${numberOfSharedAudioTags}' instead`);
    }
    validatePlaybackRate(currentPlaybackRate);
    (0, import_react2.useEffect)(() => {
      setCurrentPlaybackRate(playbackRate);
    }, [playbackRate]);
    (0, import_react2.useImperativeHandle)(ref, () => rootRef.current, []);
    const timelineContextValue = (0, import_react2.useMemo)(() => {
      return {
        frame,
        playing,
        rootId,
        playbackRate: currentPlaybackRate,
        imperativePlaying,
        setPlaybackRate: (rate) => {
          setCurrentPlaybackRate(rate);
        },
        audioAndVideoTags
      };
    }, [frame, currentPlaybackRate, playing, rootId]);
    const setTimelineContextValue = (0, import_react2.useMemo)(() => {
      return {
        setFrame,
        setPlaying
      };
    }, [setFrame]);
    if (typeof window !== "undefined") {
      (0, import_react2.useLayoutEffect)(() => {
        Internals.CSSUtils.injectCSS(Internals.CSSUtils.makeDefaultCSS(`.${PLAYER_CSS_CLASSNAME}`, "#fff"));
      }, []);
    }
    const actualInputProps = (0, import_react2.useMemo)(() => inputProps !== null && inputProps !== void 0 ? inputProps : {}, [inputProps]);
    return (0, import_jsx_runtime2.jsx)(Internals.IsPlayerContextProvider, { children: (0, import_jsx_runtime2.jsx)(SharedPlayerContexts, { timelineContext: timelineContextValue, component, compositionHeight, compositionWidth, durationInFrames, fps, numberOfSharedAudioTags, initiallyMuted, children: (0, import_jsx_runtime2.jsx)(Internals.Timeline.SetTimelineContext.Provider, { value: setTimelineContextValue, children: (0, import_jsx_runtime2.jsx)(PlayerEmitterProvider, { currentPlaybackRate, children: (0, import_jsx_runtime2.jsx)(PlayerUI$1, { ref: rootRef, posterFillMode, renderLoading, autoPlay: Boolean(autoPlay), loop: Boolean(loop), controls: Boolean(controls), errorFallback, style, inputProps: actualInputProps, allowFullscreen: Boolean(allowFullscreen), moveToBeginningWhenEnded: Boolean(moveToBeginningWhenEnded), clickToPlay: typeof clickToPlay === "boolean" ? clickToPlay : Boolean(controls), showVolumeControls: Boolean(showVolumeControls), doubleClickToFullscreen: Boolean(doubleClickToFullscreen), spaceKeyToPlayOrPause: Boolean(spaceKeyToPlayOrPause), playbackRate: currentPlaybackRate, className: className2 !== null && className2 !== void 0 ? className2 : void 0, showPosterWhenUnplayed: Boolean(showPosterWhenUnplayed), showPosterWhenEnded: Boolean(showPosterWhenEnded), showPosterWhenPaused: Boolean(showPosterWhenPaused), showPosterWhenBuffering: Boolean(showPosterWhenBuffering), renderPoster, inFrame: inFrame !== null && inFrame !== void 0 ? inFrame : null, outFrame: outFrame !== null && outFrame !== void 0 ? outFrame : null, initiallyShowControls: initiallyShowControls !== null && initiallyShowControls !== void 0 ? initiallyShowControls : true, renderFullscreen: renderFullscreenButton !== null && renderFullscreenButton !== void 0 ? renderFullscreenButton : null, renderPlayPauseButton: renderPlayPauseButton !== null && renderPlayPauseButton !== void 0 ? renderPlayPauseButton : null, alwaysShowControls, showPlaybackRateControl, bufferStateDelayInMilliseconds: bufferStateDelayInMilliseconds !== null && bufferStateDelayInMilliseconds !== void 0 ? bufferStateDelayInMilliseconds : 300, hideControlsWhenPointerDoesntMove }) }) }) }) });
  };
  var forward$1 = import_react2.forwardRef;
  var Player = forward$1(PlayerFn);
  var useThumbnail = () => {
    const emitter = (0, import_react2.useContext)(ThumbnailEmitterContext);
    if (!emitter) {
      throw new TypeError("Expected Player event emitter context");
    }
    const returnValue = (0, import_react2.useMemo)(() => {
      return {
        emitter
      };
    }, [emitter]);
    return returnValue;
  };
  var reactVersion = import_react2.default.version.split(".")[0];
  if (reactVersion === "0") {
    throw new Error(`Version ${reactVersion} of "react" is not supported by Remotion`);
  }
  var doesReactVersionSupportSuspense = parseInt(reactVersion, 10) >= 18;
  var ThumbnailUI = ({ style, inputProps, errorFallback, renderLoading, className: className2 }, ref) => {
    var _a, _b;
    const config = Internals.useUnsafeVideoConfig();
    const video = Internals.useVideo();
    const container2 = (0, import_react2.useRef)(null);
    const canvasSize = useElementSize(container2, {
      triggerOnWindowResize: false,
      shouldApplyCssTransforms: false
    });
    const layout = (0, import_react2.useMemo)(() => {
      if (!config || !canvasSize) {
        return null;
      }
      return calculateCanvasTransformation({
        canvasSize,
        compositionHeight: config.height,
        compositionWidth: config.width,
        previewSize: "auto"
      });
    }, [canvasSize, config]);
    const scale = (_a = layout === null || layout === void 0 ? void 0 : layout.scale) !== null && _a !== void 0 ? _a : 1;
    const thumbnail = useThumbnail();
    useBufferStateEmitter(thumbnail.emitter);
    (0, import_react2.useImperativeHandle)(ref, () => {
      const methods = {
        getContainerNode: () => container2.current,
        getScale: () => scale
      };
      return Object.assign(thumbnail.emitter, methods);
    }, [scale, thumbnail.emitter]);
    const VideoComponent = video ? video.component : null;
    const outerStyle = (0, import_react2.useMemo)(() => {
      return calculateOuterStyle({ config, style, canvasSize });
    }, [canvasSize, config, style]);
    const outer = (0, import_react2.useMemo)(() => {
      return calculateOuter({ config, layout, scale });
    }, [config, layout, scale]);
    const containerStyle2 = (0, import_react2.useMemo)(() => {
      return calculateContainerStyle({
        canvasSize,
        config,
        layout,
        scale
      });
    }, [canvasSize, config, layout, scale]);
    const onError = (0, import_react2.useCallback)((error) => {
      thumbnail.emitter.dispatchError(error);
    }, [thumbnail.emitter]);
    const loadingMarkup = (0, import_react2.useMemo)(() => {
      return renderLoading ? renderLoading({
        height: outerStyle.height,
        width: outerStyle.width,
        isBuffering: false
      }) : null;
    }, [outerStyle.height, outerStyle.width, renderLoading]);
    const currentScaleContext = (0, import_react2.useMemo)(() => {
      return {
        type: "scale",
        scale
      };
    }, [scale]);
    if (!config) {
      return null;
    }
    const content = (0, import_jsx_runtime2.jsx)("div", { style: outer, children: (0, import_jsx_runtime2.jsx)("div", { style: containerStyle2, className: PLAYER_CSS_CLASSNAME, children: VideoComponent ? (0, import_jsx_runtime2.jsx)(ErrorBoundary, { onError, errorFallback, children: (0, import_jsx_runtime2.jsx)(Internals.CurrentScaleContext.Provider, { value: currentScaleContext, children: (0, import_jsx_runtime2.jsx)(VideoComponent, { ...(_b = video === null || video === void 0 ? void 0 : video.props) !== null && _b !== void 0 ? _b : {}, ...inputProps !== null && inputProps !== void 0 ? inputProps : {} }) }) }) : null }) });
    if (IS_NODE && !doesReactVersionSupportSuspense) {
      return (0, import_jsx_runtime2.jsx)("div", { ref: container2, style: outerStyle, className: className2, children: content });
    }
    return (0, import_jsx_runtime2.jsx)("div", { ref: container2, style: outerStyle, className: className2, children: (0, import_jsx_runtime2.jsx)(import_react2.Suspense, { fallback: loadingMarkup, children: content }) });
  };
  var ThumbnailUI$1 = (0, import_react2.forwardRef)(ThumbnailUI);
  var ThumbnailFn = ({ frameToDisplay, style, inputProps, compositionHeight, compositionWidth, durationInFrames, fps, className: className2, errorFallback = () => "\u26A0\uFE0F", renderLoading, ...componentProps }, ref) => {
    if (typeof window !== "undefined") {
      (0, import_react2.useLayoutEffect)(() => {
        window.remotion_isPlayer = true;
      }, []);
    }
    const [thumbnailId] = (0, import_react2.useState)(() => String(random(null)));
    const rootRef = (0, import_react2.useRef)(null);
    const timelineState = (0, import_react2.useMemo)(() => {
      const value = {
        playing: false,
        frame: {
          [PLAYER_COMP_ID]: frameToDisplay
        },
        rootId: thumbnailId,
        imperativePlaying: {
          current: false
        },
        playbackRate: 1,
        setPlaybackRate: () => {
          throw new Error("thumbnail");
        },
        audioAndVideoTags: { current: [] }
      };
      return value;
    }, [frameToDisplay, thumbnailId]);
    (0, import_react2.useImperativeHandle)(ref, () => rootRef.current, []);
    const Component = Internals.useLazyComponent(componentProps);
    const [emitter] = (0, import_react2.useState)(() => new ThumbnailEmitter());
    const passedInputProps = (0, import_react2.useMemo)(() => {
      return inputProps !== null && inputProps !== void 0 ? inputProps : {};
    }, [inputProps]);
    return (0, import_jsx_runtime2.jsx)(Internals.IsPlayerContextProvider, { children: (0, import_jsx_runtime2.jsx)(SharedPlayerContexts, { timelineContext: timelineState, component: Component, compositionHeight, compositionWidth, durationInFrames, fps, numberOfSharedAudioTags: 0, initiallyMuted: true, children: (0, import_jsx_runtime2.jsx)(ThumbnailEmitterContext.Provider, { value: emitter, children: (0, import_jsx_runtime2.jsx)(ThumbnailUI$1, { ref: rootRef, className: className2, errorFallback, inputProps: passedInputProps, renderLoading, style }) }) }) });
  };
  var forward = import_react2.forwardRef;
  var Thumbnail = forward(ThumbnailFn);

  // src/remotion/qawaleb/QawalebComposition.tsx
  var import_react4 = __toESM(require_react());

  // src/remotion/qawaleb/QawalebTemplates.tsx
  var import_react3 = __toESM(require_react());
  var FONT_ARABIC = "QawalebArabic";
  var FONT_DISPLAY = "QawalebDisplay";
  var FONT_SERIF = 'Georgia, "Times New Roman", serif';
  var FONT_MONO = '"Roboto Mono", "Courier New", monospace';
  var FONT_RTL_PRIMARY = `${FONT_DISPLAY}, ${FONT_ARABIC}, "Segoe UI", Tahoma, Arial, sans-serif`;
  var LOCAL_SOCIAL_AVATAR = staticFile("assets/logo.png");
  var DEFAULT_FONT_SCALE = 1;
  var DEFAULT_TEMPLATE_APPEARANCE = {
    fontScale: DEFAULT_FONT_SCALE,
    colors: {},
    backgroundImageUrl: null,
    backgroundOpacity: 10,
    backgroundBlur: 12,
    backgroundRadius: 42,
    backgroundFeather: 84,
    parallaxEnabled: true,
    portraitScale: 1,
    portraitX: 0,
    portraitY: 0,
    portraitMonochrome: true,
    portraitSquare: false,
    showQuoteMark: true
  };
  var TEMPLATE_COLOR_DEFAULTS = {
    "points-broadcast": {
      background: "#d80b14",
      backgroundAlt: "#b8050d",
      text: "#ffffff",
      accent: "#ffd21e"
    },
    "breaking-bold": {
      background: "#0a0a0a",
      surface: "#111111",
      accent: "#e10600",
      accentAlt: "#ff3322",
      text: "#f6f4ef",
      muted: "#d8d6d1"
    },
    "editorial-elegant": {
      background: "#f3eee2",
      surface: "#ebe4d2",
      accent: "#b08d57",
      accentDark: "#8a6a3a",
      text: "#10182b",
      muted: "#7a6e58"
    },
    "cinematic-dark": {
      background: "#0d0d0d",
      accent: "#d9a14a",
      text: "#f5f3ee",
      muted: "#a8a39a",
      alert: "#e10600"
    },
    "sports-energy": {
      background: "#0a0a0a",
      surface: "#222222",
      accent: "#f5d000",
      accentAlt: "#e10600",
      text: "#ffffff",
      muted: "#cfcfcf"
    },
    "documentary-minimal": {
      background: "#f6f4ef",
      line: "#d6d4cd",
      accent: "#1a4d3e",
      text: "#16161a",
      muted: "#7a7a7e"
    },
    "x-animated": {
      background: "#000000",
      card: "#192734",
      accent: "#1d9bf0",
      border: "#38444d",
      text: "#ffffff",
      muted: "#8899a6"
    },
    "facebook-animated": {
      background: "#ccd0d5",
      card: "#ffffff",
      accent: "#1877f2",
      border: "#ced0d4",
      text: "#050505",
      muted: "#65676b"
    },
    "telegram-animated": {
      background: "#070b10",
      header: "#17212b",
      card: "#182533",
      accent: "#5288c1",
      text: "#ffffff",
      muted: "#7f91a4"
    },
    "instagram-animated": {
      background: "#fafafa",
      card: "#ffffff",
      accent: "#e1306c",
      border: "#dbdbdb",
      text: "#262626",
      muted: "#8e8e8e"
    },
    "top-trends": {
      background: "#0a0a2e",
      panel: "#1a2a6a",
      accent: "#4fc3ff",
      accentAlt: "#1a73e8",
      text: "#ffffff",
      muted: "#8899bb"
    }
  };
  if (typeof document !== "undefined" && !document.head.querySelector('[data-qawaleb-fonts="1"]')) {
    const avenirUrl = staticFile("assets/fonts/alfont_com_AlFont_com_AvenirArabic-Heavy.otf");
    const displayUrl = staticFile("assets/fonts/rb.ttf");
    const style = document.createElement("style");
    style.setAttribute("data-qawaleb-fonts", "1");
    style.textContent = `
    @font-face {
      font-family: '${FONT_ARABIC}';
      src: url('${avenirUrl}') format('opentype');
      font-display: block;
    }
    @font-face {
      font-family: '${FONT_DISPLAY}';
      src: url('${displayUrl}') format('truetype');
      font-display: block;
    }
  `;
    document.head.appendChild(style);
  }
  var smoothEase = Easing.bezier(0.2, 0.8, 0.2, 1);
  var slashEase = Easing.bezier(0.7, 0.05, 0.2, 1);
  var overshootEase = Easing.bezier(0.34, 1.56, 0.64, 1);
  var resolveAppearance = (appearance) => ({
    fontScale: Math.max(0.55, Number(appearance?.fontScale || DEFAULT_FONT_SCALE)),
    colors: appearance?.colors || {},
    backgroundImageUrl: typeof appearance?.backgroundImageUrl === "string" ? appearance.backgroundImageUrl : DEFAULT_TEMPLATE_APPEARANCE.backgroundImageUrl,
    backgroundOpacity: Math.max(0, Math.min(100, Number(appearance?.backgroundOpacity ?? DEFAULT_TEMPLATE_APPEARANCE.backgroundOpacity))),
    backgroundBlur: Math.max(0, Math.min(40, Number(appearance?.backgroundBlur ?? DEFAULT_TEMPLATE_APPEARANCE.backgroundBlur))),
    backgroundRadius: Math.max(0, Math.min(240, Number(appearance?.backgroundRadius ?? DEFAULT_TEMPLATE_APPEARANCE.backgroundRadius))),
    backgroundFeather: Math.max(0, Math.min(180, Number(appearance?.backgroundFeather ?? DEFAULT_TEMPLATE_APPEARANCE.backgroundFeather))),
    parallaxEnabled: appearance?.parallaxEnabled !== false,
    portraitScale: Math.max(0.6, Number(appearance?.portraitScale || DEFAULT_TEMPLATE_APPEARANCE.portraitScale)),
    portraitX: Number(appearance?.portraitX || DEFAULT_TEMPLATE_APPEARANCE.portraitX),
    portraitY: Number(appearance?.portraitY || DEFAULT_TEMPLATE_APPEARANCE.portraitY),
    portraitMonochrome: appearance?.portraitMonochrome !== false,
    portraitSquare: appearance?.portraitSquare === true,
    showQuoteMark: appearance?.showQuoteMark !== false
  });
  var scaleFont = (appearance, value) => Math.round(value * appearance.fontScale * 100) / 100;
  var getTemplatePalette = (templateId, appearance) => ({
    ...TEMPLATE_COLOR_DEFAULTS[templateId],
    ...appearance.colors || {}
  });
  var stageStyle = {
    width: "100%",
    height: "100%",
    direction: "rtl",
    textAlign: "right",
    overflow: "hidden",
    fontFamily: FONT_RTL_PRIMARY
  };
  var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  var absFill = (style) => ({
    position: "absolute",
    inset: 0,
    ...style
  });
  var rtlTextStyle = (style) => ({
    direction: "rtl",
    textAlign: "right",
    unicodeBidi: "plaintext",
    fontFamily: FONT_RTL_PRIMARY,
    ...style
  });
  var rtlParagraphStyle = (style) => rtlTextStyle({
    lineHeight: 1.6,
    ...style
  });
  var p = (frame, start, duration, easing = smoothEase) => interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing
  });
  var shift = (frame, start, duration, from, to = 0, easing = smoothEase) => interpolate(frame, [start, start + duration], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing
  });
  var fade = (frame, start, duration, easing = smoothEase) => p(frame, start, duration, easing);
  var splitWords = (text) => text.trim().split(/\s+/).filter(Boolean);
  var splitIntoChunks = (text, parts) => {
    const words = splitWords(text);
    if (words.length === 0) {
      return [""];
    }
    const chunk = Math.ceil(words.length / Math.max(parts, 1));
    const lines = [];
    for (let i = 0; i < words.length; i += chunk) {
      lines.push(words.slice(i, i + chunk).join(" "));
    }
    return lines;
  };
  var textMeasureCanvas = null;
  var getTextMeasureContext = () => {
    if (typeof document === "undefined") {
      return null;
    }
    if (!textMeasureCanvas) {
      textMeasureCanvas = document.createElement("canvas");
    }
    return textMeasureCanvas.getContext("2d");
  };
  var measureWrappedLineCount = (text, maxWidth, fontSize, fontWeight, fontFamily) => {
    const words = splitWords(text);
    if (words.length === 0) {
      return 1;
    }
    const ctx = getTextMeasureContext();
    if (!ctx) {
      const approxCharsPerLine = Math.max(8, Math.floor(maxWidth / Math.max(fontSize * 0.62, 1)));
      return Math.max(1, Math.ceil(text.length / approxCharsPerLine));
    }
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const spaceWidth = ctx.measureText(" ").width;
    let lines = 1;
    let currentWidth = 0;
    words.forEach((word, wordIndex) => {
      const wordWidth = ctx.measureText(word).width;
      const nextWidth = wordIndex === 0 || currentWidth === 0 ? wordWidth : currentWidth + spaceWidth + wordWidth;
      if (currentWidth > 0 && nextWidth > maxWidth) {
        lines += 1;
        currentWidth = wordWidth;
      } else {
        currentWidth = nextWidth;
      }
    });
    return lines;
  };
  var normalizePointItems = (rawText) => String(rawText || "").split(/\+\+|\n/g).map((item) => item.trim()).filter(Boolean).slice(0, 60);
  var resolvePointGroups = (points, maxWidth, baseFontSize, fontFamily, maxLinesPerGroup = 4) => {
    const minFontSize = Math.max(34, Math.floor(baseFontSize * 0.68));
    let pointFontSize = baseFontSize;
    let measuredPoints = [];
    while (pointFontSize >= minFontSize) {
      measuredPoints = points.map((text) => ({
        text,
        lineCount: measureWrappedLineCount(text, maxWidth, pointFontSize, 900, fontFamily)
      }));
      if (measuredPoints.every((item) => item.lineCount <= maxLinesPerGroup)) {
        break;
      }
      pointFontSize -= 2;
    }
    if (!measuredPoints.length) {
      measuredPoints = [{
        text: "",
        lineCount: 1
      }];
    }
    const groups = [];
    let currentItems = [];
    let currentLineCount = 0;
    measuredPoints.forEach((item) => {
      if (currentItems.length > 0 && currentLineCount + item.lineCount > maxLinesPerGroup) {
        groups.push({
          items: currentItems,
          lineCount: currentLineCount
        });
        currentItems = [item];
        currentLineCount = item.lineCount;
        return;
      }
      currentItems.push(item);
      currentLineCount += item.lineCount;
    });
    if (currentItems.length > 0) {
      groups.push({
        items: currentItems,
        lineCount: currentLineCount
      });
    }
    return {
      fontSize: Math.max(pointFontSize, minFontSize),
      groups: groups.length > 0 ? groups : [{ items: measuredPoints.slice(0, 1), lineCount: measuredPoints[0]?.lineCount || 1 }]
    };
  };
  var getHighlightWordIndex = (text) => {
    const words = splitWords(text);
    if (words.length < 4) {
      return -1;
    }
    return Math.min(words.length - 2, Math.max(1, Math.floor(words.length * 0.55)));
  };
  var renderHighlightedPoint = (text, highlightColor) => {
    const words = splitWords(text);
    if (words.length === 0) {
      return text;
    }
    const highlightIndex = getHighlightWordIndex(text);
    return words.map((word, index) => /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, { key: `${word}-${index}` }, index > 0 ? " " : null, index === highlightIndex ? /* @__PURE__ */ import_react3.default.createElement(
      "span",
      {
        style: {
          background: `linear-gradient(transparent 58%, ${highlightColor}66 58%)`,
          padding: "0 0.08em"
        }
      },
      word
    ) : word));
  };
  var getValue = (values, key, fallback = "") => typeof values[key] === "string" && values[key].length > 0 ? values[key] : fallback;
  var imageStyle = (zoom = 1, offsetX = 0, offsetY = 0) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transform: `scale(${zoom}) translate(${offsetX}%, ${offsetY}%)`
  });
  var SafeImg = ({ src, style }) => {
    if (!src) {
      return /* @__PURE__ */ import_react3.default.createElement("div", { style: { ...style, background: "#2b2b30" } });
    }
    return /* @__PURE__ */ import_react3.default.createElement(Img, { src, style });
  };
  var DEFAULT_TEMPLATE_BACKGROUND = staticFile("assets/qawaleb/backgrounds/rm380-05.jpg");
  var buildRoundedMask = ({
    width,
    height,
    radius,
    feather
  }) => {
    const safeWidth = Math.max(1, width);
    const safeHeight = Math.max(1, height);
    const safeRadius = clamp(radius, 0, Math.min(safeWidth, safeHeight) / 2);
    const safeFeather = clamp(feather, 0, Math.min(safeWidth, safeHeight) / 2);
    const bleed = Math.max(24, safeFeather);
    const canvasWidth = safeWidth + bleed * 2;
    const canvasHeight = safeHeight + bleed * 2;
    const innerInset = safeFeather > 0 ? Math.min(safeFeather, safeWidth / 2, safeHeight / 2) : 0;
    const innerWidth = Math.max(0, safeWidth - innerInset * 2);
    const innerHeight = Math.max(0, safeHeight - innerInset * 2);
    const innerRadius = Math.max(0, safeRadius - innerInset);
    const stdDeviation = Math.max(0.1, safeFeather / 2);
    const filter = safeFeather > 0 ? `<filter id="f" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="${stdDeviation}" /></filter>` : "";
    const blurredRect = safeFeather > 0 ? `<rect x="${bleed}" y="${bleed}" width="${safeWidth}" height="${safeHeight}" rx="${safeRadius}" ry="${safeRadius}" fill="white" filter="url(#f)" />` : "";
    const solidRect = innerWidth > 0 && innerHeight > 0 ? `<rect x="${bleed + innerInset}" y="${bleed + innerInset}" width="${innerWidth}" height="${innerHeight}" rx="${innerRadius}" ry="${innerRadius}" fill="white" />` : "";
    const baseRect = safeFeather <= 0 ? `<rect x="${bleed}" y="${bleed}" width="${safeWidth}" height="${safeHeight}" rx="${safeRadius}" ry="${safeRadius}" fill="white" />` : "";
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}" viewBox="0 0 ${canvasWidth} ${canvasHeight}"><defs>${filter}</defs>${baseRect}${blurredRect}${solidRect}</svg>`;
    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
  };
  var PointsBackgroundOverlay = ({ appearance }) => {
    const frame = useCurrentFrame();
    const safeOpacity = clamp(Number(appearance.backgroundOpacity ?? 10) / 100, 0, 1);
    if (safeOpacity <= 1e-3) {
      return null;
    }
    const maskImage = import_react3.default.useMemo(
      () => buildRoundedMask({
        width: 1920,
        height: 1080,
        radius: Number(appearance.backgroundRadius ?? 42),
        feather: Number(appearance.backgroundFeather ?? 84)
      }),
      [appearance.backgroundFeather, appearance.backgroundRadius]
    );
    const offsetX = appearance.parallaxEnabled !== false ? Math.sin(frame / 60) * 20 : 0;
    const offsetY = appearance.parallaxEnabled !== false ? Math.cos(frame / 82) * 14 : 0;
    const scale = appearance.parallaxEnabled !== false ? 1.1 + Math.sin(frame / 120) * 0.018 : 1.08;
    const source = appearance.backgroundImageUrl || DEFAULT_TEMPLATE_BACKGROUND;
    return /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          ...absFill({
            zIndex: 1,
            opacity: safeOpacity,
            overflow: "hidden",
            WebkitMaskImage: maskImage,
            maskImage,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%"
          })
        }
      },
      /* @__PURE__ */ import_react3.default.createElement(
        Img,
        {
          src: source,
          style: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
            transformOrigin: "center center",
            filter: appearance.backgroundBlur && appearance.backgroundBlur > 0 ? `blur(${appearance.backgroundBlur}px) saturate(1.04) brightness(0.92)` : "saturate(1.04) brightness(0.92)"
          }
        }
      )
    );
  };
  var AudioTracks = ({
    musicUrl,
    musicVolume,
    voiceoverUrl,
    voiceoverVolume
  }) => {
    return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, musicUrl ? /* @__PURE__ */ import_react3.default.createElement(Audio, { src: musicUrl, volume: musicVolume ?? 0.5 }) : null, voiceoverUrl ? /* @__PURE__ */ import_react3.default.createElement(Audio, { src: voiceoverUrl, volume: voiceoverVolume ?? 1 }) : null);
  };
  var SocialCardBase = ({ background, entranceOpacity, entranceTransform, floatTransform, card }) => {
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { background: "#000", overflow: "hidden" } }, background, /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          opacity: entranceOpacity,
          transform: entranceTransform,
          transformStyle: "preserve-3d"
        }
      },
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { transform: floatTransform, transformStyle: "preserve-3d" } }, card)
    ));
  };
  var BreakingBoldTemplate = ({
    values,
    appearance
  }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    const title = getValue(values, "i-title");
    const body = getValue(values, "i-body");
    const words = splitWords(title);
    const palette = getTemplatePalette("breaking-bold", appearance);
    const tickerShift = interpolate(frame % 700, [0, 700], [100, -100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    });
    return /* @__PURE__ */ import_react3.default.createElement(
      AbsoluteFill,
      {
        style: {
          ...stageStyle,
          background: `radial-gradient(ellipse at 30% 20%, ${palette.accentAlt}22 0%, ${palette.background} 55%, #000 100%)`,
          color: palette.text,
          fontFamily: FONT_RTL_PRIMARY
        }
      },
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            ...absFill(),
            opacity: 0.18,
            mixBlendMode: "overlay",
            backgroundImage: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.05) 0 1px, transparent 1px 6px)",
            backgroundSize: "12px 12px"
          }
        }
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "60%",
            left: "-10%",
            background: `linear-gradient(120deg,${palette.accentAlt} 0%,${palette.accent} 60%,${palette.accentAlt} 100%)`,
            clipPath: "polygon(0 0,100% 0,70% 100%,0 100%)",
            opacity: 0.92 * fade(frame, 6, 20, slashEase),
            transform: `translateX(${shift(frame, 6, 20, -420, 0, slashEase)}px)`
          }
        }
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: 48,
            right: 64,
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: fade(frame, 2, 16),
            transform: `translateX(${shift(frame, 2, 16, 40)}px)`
          }
        },
        /* @__PURE__ */ import_react3.default.createElement(
          "span",
          {
            style: {
              width: 18,
              height: 18,
              borderRadius: 999,
              background: palette.accent,
              boxShadow: `0 0 24px ${palette.accent}`,
              transform: `scale(${1 + Math.sin(frame / 5) * 0.25})`
            }
          }
        ),
        /* @__PURE__ */ import_react3.default.createElement(
          "span",
          {
            style: {
              background: palette.accent,
              color: "#fff",
              padding: "14px 26px",
              fontFamily: FONT_RTL_PRIMARY,
              fontWeight: 700,
              fontSize: scaleFont(appearance, 28),
              clipPath: "polygon(8% 0,100% 0,92% 100%,0 100%)"
            }
          },
          "\u0639\u0627\u062C\u0644"
        ),
        /* @__PURE__ */ import_react3.default.createElement("span", { style: { fontFamily: FONT_MONO, color: palette.muted, fontSize: scaleFont(appearance, 20) } }, getValue(values, "i-time"))
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            left: 96,
            top: 200,
            width: 760,
            height: 560,
            background: palette.surface,
            overflow: "hidden",
            clipPath: "polygon(0 0,100% 0,100% 88%,92% 100%,0 100%)",
            opacity: fade(frame, 14, 20),
            transform: `translateY(${shift(frame, 14, 20, 40)}px) scale(${interpolate(frame, [14, 34], [0.96, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase })})`
          }
        },
        /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: getValue(values, "i-img"), style: imageStyle(1.08) }),
        /* @__PURE__ */ import_react3.default.createElement("div", { style: { ...absFill(), background: "linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.55))" } }),
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              bottom: 0,
              right: 0,
              background: palette.accent,
              color: "#fff",
              padding: "14px 28px 14px 56px",
              fontFamily: FONT_RTL_PRIMARY,
              fontWeight: 700,
              fontSize: scaleFont(appearance, 22),
              clipPath: "polygon(22% 0,100% 0,100% 100%,0 100%)"
            }
          },
          getValue(values, "i-cap")
        )
      ),
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", right: 96, top: 240, width: 880 } }, /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            display: "inline-block",
            padding: "10px 22px",
            border: `2px solid ${palette.accent}`,
            color: palette.accent,
            fontFamily: FONT_RTL_PRIMARY,
            fontSize: scaleFont(appearance, 24),
            letterSpacing: "0.12em",
            opacity: fade(frame, 24, 14),
            transform: `translateY(${shift(frame, 24, 14, 20)}px)`
          }
        },
        getValue(values, "i-kicker")
      ), /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            marginTop: 28,
            fontFamily: FONT_RTL_PRIMARY,
            fontWeight: 700,
            fontSize: scaleFont(appearance, 96),
            lineHeight: 1.04,
            maxWidth: 820,
            display: "flex",
            flexWrap: "wrap",
            gap: "0 10px"
          }
        },
        words.map((word, index) => /* @__PURE__ */ import_react3.default.createElement(
          "span",
          {
            key: `${word}-${index}`,
            style: {
              display: "inline-block",
              opacity: fade(frame, 28 + index * 2.25, 12),
              transform: `translateY(${shift(frame, 28 + index * 2.25, 12, 60)}px)`,
              filter: `blur(${shift(frame, 28 + index * 2.25, 12, 8, 0)}px)`
            }
          },
          word
        ))
      ), /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            marginTop: 36,
            height: 6,
            width: interpolate(frame, [55, 75], [0, 280], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: smoothEase
            }),
            background: palette.accent,
            boxShadow: `0 0 30px ${palette.accent}`
          }
        }
      ), /* @__PURE__ */ import_react3.default.createElement(
        "p",
        {
          style: rtlParagraphStyle({
            marginTop: 40,
            fontSize: scaleFont(appearance, 32),
            lineHeight: 1.55,
            color: palette.muted,
            maxWidth: 820,
            opacity: fade(frame, 60, 14),
            transform: `translateY(${shift(frame, 60, 14, 20)}px)`
          })
        },
        body
      )),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            bottom: 130,
            right: 96,
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: FONT_RTL_PRIMARY,
            fontSize: scaleFont(appearance, 22),
            color: palette.muted,
            opacity: fade(frame, 75, 12)
          }
        },
        /* @__PURE__ */ import_react3.default.createElement("span", { style: { width: 36, height: 3, background: palette.accent } }),
        /* @__PURE__ */ import_react3.default.createElement("span", null, getValue(values, "i-source"))
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 96,
            display: "flex",
            alignItems: "stretch",
            transform: `translateY(${shift(frame, 40, 16, 110, 0)}%)`
          }
        },
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              background: palette.accent,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              padding: "0 40px",
              fontFamily: FONT_RTL_PRIMARY,
              fontWeight: 700,
              fontSize: scaleFont(appearance, 30),
              clipPath: "polygon(0 0,100% 0,92% 100%,0 100%)",
              minWidth: 340
            }
          },
          "\u0634\u0631\u064A\u0637 \u0627\u0644\u0623\u062E\u0628\u0627\u0631"
        ),
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              flex: 1,
              background: palette.surface,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              padding: "0 40px",
              borderTop: `2px solid ${palette.background}`,
              borderBottom: `2px solid ${palette.background}`,
              color: palette.text,
              fontSize: scaleFont(appearance, 28)
            }
          },
          /* @__PURE__ */ import_react3.default.createElement("span", { style: { whiteSpace: "nowrap", transform: `translateX(${tickerShift}%)`, paddingRight: 120 } }, `${title}   \u2022   ${body}`)
        ),
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              background: palette.background,
              display: "flex",
              alignItems: "center",
              padding: "0 32px",
              color: palette.text,
              fontSize: scaleFont(appearance, 30),
              borderRight: `4px solid ${palette.accent}`,
              fontFamily: FONT_MONO
            }
          },
          getValue(values, "i-time").split("\u2014")[0]?.trim() || "22:47"
        )
      )
    );
  };
  var EditorialElegantTemplate = ({
    values,
    appearance
  }) => {
    const frame = useCurrentFrame();
    const titleLines = splitIntoChunks(getValue(values, "i-title"), 3);
    const palette = getTemplatePalette("editorial-elegant", appearance);
    return /* @__PURE__ */ import_react3.default.createElement(
      AbsoluteFill,
      {
        style: {
          ...stageStyle,
          background: `radial-gradient(ellipse at 80% 20%, ${palette.accent}1c 0%, transparent 55%), linear-gradient(180deg, ${palette.background} 0%, ${palette.surface} 100%)`,
          color: palette.text,
          fontFamily: FONT_RTL_PRIMARY
        }
      },
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            ...absFill(),
            opacity: 0.25,
            backgroundImage: "radial-gradient(circle at 10% 10%, rgba(176,141,87,0.10) 0 1px, transparent 1px 10px)",
            backgroundSize: "24px 24px",
            mixBlendMode: "multiply"
          }
        }
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 108,
            borderBottom: `1px solid ${palette.muted}`,
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            padding: "0 80px",
            background: `${palette.background}aa`,
            opacity: fade(frame, 3, 18),
            transform: `translateY(${shift(frame, 3, 18, -100)}%)`
          }
        },
        /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 18, color: palette.muted, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 18) } }, /* @__PURE__ */ import_react3.default.createElement("span", { style: { width: 40, height: 1, background: palette.accent } }), /* @__PURE__ */ import_react3.default.createElement("span", null, "\u0627\u0644\u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0623\u0633\u0628\u0648\u0639\u064A")),
        /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontFamily: FONT_SERIF, fontWeight: 700, fontSize: scaleFont(appearance, 54), color: palette.text } }, "\u0627\u0644\u0645\u0642\u0627\u0644\u0629"),
        /* @__PURE__ */ import_react3.default.createElement("div", { style: { justifySelf: "end", color: palette.muted, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 18) } }, "22 \u0634\u0639\u0628\u0627\u0646 / \u0627\u0644\u0645\u062C\u0644\u062F 7")
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            left: 80,
            top: 230,
            fontFamily: FONT_SERIF,
            fontWeight: 700,
            fontSize: scaleFont(appearance, 280),
            color: palette.accent,
            opacity: 0.1 * fade(frame, 20, 24),
            transform: `scale(${interpolate(frame, [20, 44], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase })}) rotate(${shift(frame, 20, 24, -4, 0)}deg)`,
            transformOrigin: "left top"
          }
        },
        "\u0627"
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            top: 160,
            bottom: 160,
            left: 80,
            right: 80,
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr",
            gap: 80
          }
        },
        /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "relative", background: palette.surface, opacity: fade(frame, 14, 20), transform: `translateY(${shift(frame, 14, 20, 20)}px)` } }, /* @__PURE__ */ import_react3.default.createElement("span", { style: { position: "absolute", inset: 0, borderTop: `1px solid ${palette.accent}`, borderBottom: `1px solid ${palette.accent}` } }), /* @__PURE__ */ import_react3.default.createElement("span", { style: { position: "absolute", top: 0, bottom: 0, left: 0, width: 1, background: palette.accent } }), /* @__PURE__ */ import_react3.default.createElement("span", { style: { position: "absolute", top: 0, bottom: 0, right: 0, width: 1, background: palette.accent } }), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", inset: 18, overflow: "hidden", background: "#ddd" } }, /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: getValue(values, "i-img"), style: imageStyle(interpolate(frame, [0, 500], [1.08, 1.12], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }), -1.5, -1) })), ["c1", "c2", "c3", "c4"].map((corner) => /* @__PURE__ */ import_react3.default.createElement(
          "span",
          {
            key: corner,
            style: {
              position: "absolute",
              width: 22,
              height: 22,
              border: `2px solid ${palette.accentDark}`,
              ...corner === "c1" ? { top: -2, left: -2, borderRight: 0, borderBottom: 0 } : {},
              ...corner === "c2" ? { top: -2, right: -2, borderLeft: 0, borderBottom: 0 } : {},
              ...corner === "c3" ? { bottom: -2, left: -2, borderRight: 0, borderTop: 0 } : {},
              ...corner === "c4" ? { bottom: -2, right: -2, borderLeft: 0, borderTop: 0 } : {}
            }
          }
        )), /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: rtlTextStyle({
              position: "absolute",
              left: 18,
              right: 18,
              bottom: -44,
              fontSize: scaleFont(appearance, 18),
              color: palette.muted,
              opacity: fade(frame, 40, 12),
              transform: `translateY(${shift(frame, 40, 12, 8)}px)`
            })
          },
          getValue(values, "i-caption")
        )),
        /* @__PURE__ */ import_react3.default.createElement("div", { style: { paddingTop: 6 } }, /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 36,
              opacity: fade(frame, 22, 14),
              transform: `translateY(${shift(frame, 22, 14, 12)}px)`
            }
          },
          /* @__PURE__ */ import_react3.default.createElement("span", { style: { fontFamily: FONT_MONO, color: palette.accentDark, fontSize: scaleFont(appearance, 18) } }, "01"),
          /* @__PURE__ */ import_react3.default.createElement("span", { style: { flex: 1, height: 1, background: palette.muted } }),
          /* @__PURE__ */ import_react3.default.createElement("span", { style: { color: palette.muted, fontSize: scaleFont(appearance, 18) } }, getValue(values, "i-tag"))
        ), /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontWeight: 700, color: palette.text, fontSize: scaleFont(appearance, 104), lineHeight: 1.06 }) }, titleLines.map((line, index) => /* @__PURE__ */ import_react3.default.createElement("div", { key: index, style: { overflow: "hidden" } }, /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              transform: `translateY(${shift(frame, 26 + index * 4, 16, 110, 0)}%)`
            }
          },
          line
        )))), /* @__PURE__ */ import_react3.default.createElement(
          "p",
          {
            style: rtlParagraphStyle({
              marginTop: 30,
              fontSize: scaleFont(appearance, 36),
              lineHeight: 1.45,
              maxWidth: 780,
              color: palette.text,
              opacity: fade(frame, 50, 18),
              transform: `translateY(${shift(frame, 50, 18, 8)}px)`
            })
          },
          getValue(values, "i-deck")
        ), /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 24,
              opacity: fade(frame, 62, 12)
            }
          },
          /* @__PURE__ */ import_react3.default.createElement("span", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 22) }) }, getValue(values, "i-author")),
          /* @__PURE__ */ import_react3.default.createElement("span", { style: { width: 6, height: 6, borderRadius: 999, background: palette.accent } }),
          /* @__PURE__ */ import_react3.default.createElement("span", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 16), color: palette.muted }) }, getValue(values, "i-source"))
        ))
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            left: 80,
            right: 80,
            bottom: 48,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 24,
            borderTop: `1px solid ${palette.muted}`,
            color: palette.muted,
            fontFamily: FONT_MONO,
            fontSize: scaleFont(appearance, 18),
            opacity: fade(frame, 35, 12),
            transform: `translateY(${shift(frame, 35, 12, 12)}px)`
          }
        },
        /* @__PURE__ */ import_react3.default.createElement("div", null, "\u0642\u0633\u0645 \u0627\u0644\u0623\u062E\u0628\u0627\u0631 \u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0629"),
        /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontFamily: FONT_SERIF, color: palette.accentDark, fontSize: scaleFont(appearance, 24) } }, "\u2014 \u0635\u0641\u062D\u0629 01 \u2014"),
        /* @__PURE__ */ import_react3.default.createElement("div", null, "\u0645\u0627\u064A\u0648 2026")
      )
    );
  };
  var CinematicDarkTemplate = ({
    values,
    appearance
  }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    const titleLines = splitIntoChunks(getValue(values, "i-title"), 2);
    const palette = getTemplatePalette("cinematic-dark", appearance);
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { ...stageStyle, background: palette.background, color: palette.text, fontFamily: FONT_RTL_PRIMARY } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { ...absFill(), overflow: "hidden", background: palette.background } }, /* @__PURE__ */ import_react3.default.createElement(
      SafeImg,
      {
        src: getValue(values, "i-img"),
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${interpolate(frame, [0, durationInFrames], [1.12, 1.22])}) translate(${interpolate(frame, [0, durationInFrames], [2, -2])}%, ${interpolate(frame, [0, durationInFrames], [1, -1])}%)`,
          filter: "contrast(1.06) saturate(.85) brightness(.85)"
        }
      }
    ), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          ...absFill(),
          background: "linear-gradient(180deg, rgba(0,0,0,.55) 0%, transparent 30%, transparent 50%, rgba(0,0,0,.95) 100%), linear-gradient(90deg, rgba(0,0,0,.6) 0%, transparent 40%, transparent 60%, rgba(0,0,0,.4) 100%)"
        }
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", left: 0, right: 0, top: 0, height: 90, background: palette.background, zIndex: 5, transform: `translateY(${shift(frame, 2, 14, -100, 0, slashEase)}%)` } }), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: palette.background, zIndex: 5, transform: `translateY(${shift(frame, 2, 14, 100, 0, slashEase)}%)` } }), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "0 56px",
          zIndex: 6,
          color: palette.muted,
          fontFamily: FONT_MONO,
          letterSpacing: "0.18em",
          fontSize: scaleFont(appearance, 16),
          opacity: fade(frame, 20, 10)
        }
      },
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } }, /* @__PURE__ */ import_react3.default.createElement("span", { style: { width: 12, height: 12, border: `1px solid ${palette.accent}`, borderRadius: 999, display: "grid", placeItems: "center" } }, /* @__PURE__ */ import_react3.default.createElement("span", { style: { width: 6, height: 6, background: palette.accent, borderRadius: 999 } })), /* @__PURE__ */ import_react3.default.createElement("span", null, getValue(values, "i-loc"))),
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontFamily: FONT_DISPLAY, color: palette.accent, fontSize: scaleFont(appearance, 18) } }, "DISPATCH \xB7 \u0627\u0644\u0645\u0631\u0627\u0633\u0644\u0648\u0646"),
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { textAlign: "left" } }, getValue(values, "i-dur"))
    ), [
      { top: 108, left: 56, style: { borderRight: 0, borderBottom: 0 } },
      { top: 108, right: 56, style: { borderLeft: 0, borderBottom: 0 } },
      { bottom: 140, left: 56, style: { borderRight: 0, borderTop: 0 } },
      { bottom: 140, right: 56, style: { borderLeft: 0, borderTop: 0 } }
    ].map((reticle, index) => /* @__PURE__ */ import_react3.default.createElement(
      "span",
      {
        key: index,
        style: {
          position: "absolute",
          width: 36,
          height: 36,
          border: `1px solid ${palette.text}`,
          opacity: 0.7 * fade(frame, 28, 10),
          zIndex: 6,
          ...reticle,
          ...reticle.style
        }
      }
    )), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", left: 96, right: 96, bottom: 160, zIndex: 6, maxWidth: 1320 } }, /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 30,
          opacity: fade(frame, 30, 12),
          transform: `translateY(${shift(frame, 30, 12, 20)}px)`
        }
      },
      /* @__PURE__ */ import_react3.default.createElement("span", { style: { fontFamily: FONT_MONO, color: palette.accent, letterSpacing: "0.3em", fontSize: scaleFont(appearance, 18) } }, getValue(values, "i-num")),
      /* @__PURE__ */ import_react3.default.createElement("span", { style: { width: 120, height: 1, background: palette.accent } }),
      /* @__PURE__ */ import_react3.default.createElement("span", { style: { fontFamily: FONT_DISPLAY, fontSize: scaleFont(appearance, 22) } }, getValue(values, "i-tag"))
    ), /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontWeight: 700, fontSize: scaleFont(appearance, 132), lineHeight: 1.02, color: palette.text, textShadow: "0 4px 60px rgba(0,0,0,.6)" }) }, titleLines.map((line, index) => /* @__PURE__ */ import_react3.default.createElement("div", { key: index, style: { overflow: "hidden", paddingBottom: "0.04em" } }, /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          transform: `translateY(${shift(frame, 38 + index * 6, 18, 110, 0)}%)`,
          opacity: fade(frame, 38 + index * 6, 18),
          filter: `blur(${shift(frame, 38 + index * 6, 18, 8, 0)}px)`
        }
      },
      line
    )))), /* @__PURE__ */ import_react3.default.createElement(
      "p",
      {
        style: rtlParagraphStyle({
          marginTop: 36,
          fontWeight: 300,
          color: palette.text,
          fontSize: scaleFont(appearance, 34),
          lineHeight: 1.45,
          maxWidth: 1100,
          opacity: fade(frame, 64, 18),
          transform: `translateY(${shift(frame, 64, 18, 12)}px)`
        })
      },
      getValue(values, "i-deck")
    )), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          left: 96,
          right: 96,
          bottom: 50,
          zIndex: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: palette.muted,
          fontFamily: FONT_MONO,
          fontSize: scaleFont(appearance, 16),
          opacity: fade(frame, 76, 10)
        }
      },
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14 } }, /* @__PURE__ */ import_react3.default.createElement("span", { style: { width: 8, height: 8, background: palette.accent, transform: "rotate(45deg)" } }), /* @__PURE__ */ import_react3.default.createElement("span", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 16), color: palette.muted }) }, getValue(values, "i-source"))),
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 18 } }, /* @__PURE__ */ import_react3.default.createElement("span", { style: { width: 10, height: 10, borderRadius: 999, background: palette.alert, opacity: 0.6 + Math.sin(frame / 6) * 0.4 } }), /* @__PURE__ */ import_react3.default.createElement("span", null, "REC \xB7 22:47:13"))
    ), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          ...absFill(),
          zIndex: 5,
          pointerEvents: "none",
          boxShadow: "inset 0 0 380px 60px rgba(0,0,0,.95)"
        }
      }
    ));
  };
  var SportsEnergyTemplate = ({
    values,
    appearance
  }) => {
    const frame = useCurrentFrame();
    const rawTitle = getValue(values, "i-title");
    const parts = rawTitle.split(/(\{[^}]+\})/g).filter(Boolean);
    const palette = getTemplatePalette("sports-energy", appearance);
    const crawlShift = interpolate(frame % 550, [0, 550], [100, -100]);
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { ...stageStyle, background: palette.background, color: palette.text, fontFamily: FONT_RTL_PRIMARY } }, /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          ...absFill(),
          background: `radial-gradient(circle at 20% 30%, ${palette.accent}33 0%, transparent 40%), radial-gradient(circle at 80% 80%, ${palette.accentAlt}29 0%, transparent 50%), linear-gradient(160deg, ${palette.background} 0%, ${palette.surface} 100%)`
        }
      }
    ), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          ...absFill(),
          opacity: 0.18,
          backgroundImage: `radial-gradient(circle, ${palette.accent} 1.2px, transparent 1.5px)`,
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(120deg, transparent 30%, black 70%)"
        }
      }
    ), [
      { left: "-18%", width: "90%", color: palette.accentAlt, from: -130, delay: 0 },
      { left: "-2%", width: "80%", color: palette.background, from: -120, delay: 4 },
      { left: "-10%", width: "80%", color: palette.accent, from: -120, delay: 0 }
    ].map((slab, index) => /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        key: index,
        style: {
          position: "absolute",
          left: slab.left,
          width: slab.width,
          height: "170%",
          top: "-30%",
          background: slab.color,
          transform: `translate(${shift(frame, slab.delay, 14, slab.from, 0, slashEase)}%, 0) rotate(18deg)`,
          transformOrigin: "top left"
        }
      }
    )), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          left: 920,
          top: 160,
          width: 920,
          height: 760,
          overflow: "hidden",
          background: palette.surface,
          boxShadow: "0 30px 80px rgba(0,0,0,.5)",
          border: `6px solid ${palette.accent}`,
          opacity: fade(frame, 14, 18),
          transform: `skewX(-12deg) translateY(${shift(frame, 14, 18, 40)}px)`
        }
      },
      /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: getValue(values, "i-img"), style: { width: "100%", height: "100%", objectFit: "cover", transform: "skewX(12deg) scale(1.18)", filter: "contrast(1.1)" } }),
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { ...absFill(), background: "linear-gradient(45deg, rgba(245,208,0,.25), transparent 40%)", mixBlendMode: "screen" } })
    ), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          top: 96,
          right: 88,
          background: palette.accentAlt,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "14px 22px",
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: scaleFont(appearance, 30),
          boxShadow: `0 8px 0 ${palette.background}`,
          opacity: fade(frame, 22, 10, overshootEase),
          transform: `rotate(-3deg) scale(${interpolate(frame, [22, 32], [0.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: overshootEase })})`
        }
      },
      /* @__PURE__ */ import_react3.default.createElement("span", { style: { width: 14, height: 14, borderRadius: 999, background: "#fff", opacity: 0.6 + Math.sin(frame / 5) * 0.4 } }),
      "LIVE"
    ), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          top: 170,
          right: 88,
          background: palette.accent,
          color: palette.background,
          padding: "14px 22px",
          fontFamily: FONT_DISPLAY,
          fontWeight: 900,
          fontSize: scaleFont(appearance, 22),
          boxShadow: `0 8px 0 ${palette.background}`,
          opacity: fade(frame, 26, 10, overshootEase),
          transform: `rotate(2deg) scale(${interpolate(frame, [26, 36], [0.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: overshootEase })})`
        }
      },
      getValue(values, "i-cat")
    ), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", left: 80, top: 200, width: 980, zIndex: 5 } }, /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          display: "inline-block",
          padding: "8px 18px",
          background: palette.background,
          color: palette.accent,
          border: `3px solid ${palette.accent}`,
          fontFamily: FONT_MONO,
          fontWeight: 700,
          fontSize: scaleFont(appearance, 22),
          letterSpacing: "0.18em",
          opacity: fade(frame, 20, 12),
          transform: `translateX(${shift(frame, 20, 12, 40)}px)`
        }
      },
      getValue(values, "i-kicker")
    ), /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ marginTop: 30, fontWeight: 900, fontSize: scaleFont(appearance, 148), lineHeight: 0.92, display: "flex", flexWrap: "wrap", gap: "0 18px" }) }, parts.map((token, index) => {
      const isEm = /^\{.+\}$/.test(token);
      const text = isEm ? token.slice(1, -1) : token;
      return text.split(/\s+/).filter(Boolean).map((word, wordIndex) => {
        const delay2 = 26 + (index + wordIndex) * 2;
        if (isEm) {
          return /* @__PURE__ */ import_react3.default.createElement(
            "span",
            {
              key: `${word}-${index}-${wordIndex}`,
              style: {
                background: palette.accent,
                color: palette.background,
                padding: "0 18px",
                display: "inline-block",
                transform: `translateX(${shift(frame, delay2, 12, 60)}px) skewX(-12deg)`,
                opacity: fade(frame, delay2, 12)
              }
            },
            /* @__PURE__ */ import_react3.default.createElement("span", { style: { display: "inline-block", transform: "skewX(12deg)" } }, word)
          );
        }
        return /* @__PURE__ */ import_react3.default.createElement(
          "span",
          {
            key: `${word}-${index}-${wordIndex}`,
            style: {
              display: "inline-block",
              opacity: fade(frame, delay2, 12),
              transform: `translateX(${shift(frame, delay2, 12, 60)}px)`
            }
          },
          word
        );
      });
    })), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          marginTop: 42,
          display: "flex",
          gap: 32,
          opacity: fade(frame, 58, 14),
          transform: `translateY(${shift(frame, 58, 14, 20)}px)`
        }
      },
      [
        ["i-s1v", "i-s1k"],
        ["i-s2v", "i-s2k"],
        ["i-s3v", "i-s3k"]
      ].map(([valueKey, labelKey]) => /* @__PURE__ */ import_react3.default.createElement("div", { key: valueKey, style: { padding: "18px 28px", background: "rgba(255,255,255,.06)", border: "2px solid rgba(255,255,255,.12)", minWidth: 160 } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: scaleFont(appearance, 54), color: palette.accent, lineHeight: 1 } }, getValue(values, valueKey)), /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: scaleFont(appearance, 18), color: palette.muted, marginTop: 4 } }, getValue(values, labelKey))))
    ), /* @__PURE__ */ import_react3.default.createElement(
      "p",
      {
        style: rtlParagraphStyle({
          marginTop: 36,
          color: palette.muted,
          fontSize: scaleFont(appearance, 28),
          lineHeight: 1.5,
          maxWidth: 880,
          opacity: fade(frame, 62, 14),
          transform: `translateY(${shift(frame, 62, 14, 20)}px)`
        })
      },
      getValue(values, "i-body")
    )), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          left: 80,
          bottom: 120,
          display: "flex",
          alignItems: "center",
          gap: 18,
          opacity: fade(frame, 72, 12),
          transform: `translateY(${shift(frame, 72, 12, 20)}px)`
        }
      },
      /* @__PURE__ */ import_react3.default.createElement("span", { style: { fontFamily: FONT_DISPLAY, fontWeight: 900, color: palette.accent, fontSize: scaleFont(appearance, 80), textShadow: `6px 6px 0 ${palette.background}` } }, "01"),
      /* @__PURE__ */ import_react3.default.createElement("span", { style: { fontFamily: FONT_DISPLAY, fontSize: scaleFont(appearance, 22), letterSpacing: "0.2em" } }, getValue(values, "i-source"))
    ), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 90,
          display: "flex",
          transform: `translateY(${shift(frame, 42, 14, 110, 0)}%)`,
          zIndex: 6
        }
      },
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { background: palette.accent, color: palette.background, fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: scaleFont(appearance, 34), display: "flex", alignItems: "center", padding: "0 40px", clipPath: "polygon(0 0,100% 0,94% 100%,0 100%)", minWidth: 300 } }, "\u0622\u062E\u0631 \u0627\u0644\u0623\u062E\u0628\u0627\u0631"),
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { flex: 1, background: palette.background, color: palette.accent, fontSize: scaleFont(appearance, 24), display: "flex", alignItems: "center", padding: "0 40px", overflow: "hidden" } }, /* @__PURE__ */ import_react3.default.createElement("span", { style: rtlTextStyle({ whiteSpace: "nowrap", transform: `translateX(${crawlShift}%)`, paddingLeft: 80, fontSize: scaleFont(appearance, 24) }) }, `${rawTitle} \u2022 ${getValue(values, "i-body")}`)),
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { background: palette.text, color: palette.background, fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: scaleFont(appearance, 28), display: "flex", alignItems: "center", padding: "0 32px", borderRight: `6px solid ${palette.accent}` } }, getValue(values, "i-clock"))
    ));
  };
  var DocumentaryMinimalTemplate = ({
    values,
    appearance
  }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    const titleLines = splitIntoChunks(getValue(values, "i-title"), splitWords(getValue(values, "i-title")).length > 12 ? 3 : 2);
    const chips = getValue(values, "i-chips").split(",").map((chip) => chip.trim()).filter(Boolean);
    const palette = getTemplatePalette("documentary-minimal", appearance);
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { ...stageStyle, background: palette.background, color: palette.text, fontFamily: FONT_RTL_PRIMARY } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { ...absFill(), opacity: 0.06, mixBlendMode: "multiply", backgroundImage: "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.08) 0 1px, transparent 1px 8px)", backgroundSize: "16px 16px" } }), /* @__PURE__ */ import_react3.default.createElement("div", { style: { ...absFill(), opacity: fade(frame, 4, 8), background: `linear-gradient(90deg, transparent 49.95%, ${palette.line} 49.95%, ${palette.line} 50.05%, transparent 50.05%)` } }), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          borderBottom: `1px solid ${palette.line}`,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          padding: "0 80px",
          color: palette.muted,
          fontFamily: FONT_MONO,
          fontSize: scaleFont(appearance, 14),
          letterSpacing: "0.22em",
          opacity: fade(frame, 2, 18),
          transform: `translateY(${shift(frame, 2, 18, -100)}%)`
        }
      },
      /* @__PURE__ */ import_react3.default.createElement("div", null, "\u0642\u0633\u0645 \u0627\u0644\u0642\u0635\u0629 \u0627\u0644\u0637\u0648\u064A\u0644\u0629 \xB7 LONGFORM"),
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontFamily: FONT_DISPLAY, fontSize: scaleFont(appearance, 18), color: palette.text } }, "\u0627\u0644\u0642\u0635\u0629", /* @__PURE__ */ import_react3.default.createElement("span", { style: { display: "inline-block", width: 6, height: 6, background: palette.accent, borderRadius: 999, margin: "0 10px", verticalAlign: "middle" } }), "STORY"),
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { textAlign: "left" } }, "\u0627\u0644\u0645\u062C\u0644\u062F 07 \xB7 \u0627\u0644\u0639\u062F\u062F 12")
    ), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", right: 80, top: 160, width: 880, height: 760 } }, /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background: palette.line,
          transformOrigin: "right center",
          transform: `scaleX(${p(frame, 10, 22, slashEase)})`
        }
      },
      /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: getValue(values, "i-img"), style: { width: "100%", height: "100%", objectFit: "cover", transform: `scale(${interpolate(frame, [0, durationInFrames], [1.1, 1.18])}) translate(${interpolate(frame, [0, durationInFrames], [1, -1])}%, ${interpolate(frame, [0, durationInFrames], [0, -1])}%)`, filter: "saturate(.92)" } })
    ), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", top: -2, right: 24, background: palette.background, padding: "8px 16px", fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.accent, border: `1px solid ${palette.line}`, borderTop: 0, opacity: fade(frame, 32, 10), transform: `translateY(${shift(frame, 32, 10, -100, 0)}%)` } }, "FIG. 01 / 04"), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", bottom: -40, right: 0, left: 0, display: "flex", justifyContent: "space-between", fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.muted, letterSpacing: "0.16em", opacity: fade(frame, 36, 10) } }, /* @__PURE__ */ import_react3.default.createElement("span", null, getValue(values, "i-cap")), /* @__PURE__ */ import_react3.default.createElement("span", null, "\u0637\u0647\u0631\u0627\u0646 \xB7 2026"))), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", left: 80, top: 160, width: 780 } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 18, opacity: fade(frame, 22, 12), transform: `translateY(${shift(frame, 22, 12, 10)}px)` } }, /* @__PURE__ */ import_react3.default.createElement("span", { style: { fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 16), color: palette.accent, letterSpacing: "0.2em" } }, getValue(values, "i-idx")), /* @__PURE__ */ import_react3.default.createElement("span", { style: { flex: 1, height: 1, background: palette.line } }), /* @__PURE__ */ import_react3.default.createElement("span", { style: { fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.muted, letterSpacing: "0.16em" } }, getValue(values, "i-ts"))), /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ marginTop: 36, fontSize: scaleFont(appearance, 24), letterSpacing: "0.24em", textTransform: "uppercase", color: palette.accent, opacity: fade(frame, 26, 10), transform: `translateY(${shift(frame, 26, 10, 10)}px)` }) }, getValue(values, "i-kicker")), /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ marginTop: 24, fontSize: scaleFont(appearance, 104), lineHeight: 1.04, letterSpacing: "-0.005em" }) }, titleLines.map((line, index) => /* @__PURE__ */ import_react3.default.createElement("div", { key: index, style: { overflow: "hidden", paddingBottom: "0.04em" } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { transform: `translateY(${shift(frame, 30 + index * 4, 16, 105, 0)}%)` } }, line)))), /* @__PURE__ */ import_react3.default.createElement("p", { style: rtlParagraphStyle({ marginTop: 38, fontWeight: 300, color: palette.muted, fontSize: scaleFont(appearance, 30), lineHeight: 1.55, maxWidth: 720, opacity: fade(frame, 54, 14), transform: `translateY(${shift(frame, 54, 14, 10)}px)` }) }, getValue(values, "i-deck")), /* @__PURE__ */ import_react3.default.createElement("div", { style: { marginTop: 36, display: "flex", gap: 10, flexWrap: "wrap", opacity: fade(frame, 58, 12), transform: `translateY(${shift(frame, 58, 12, 10)}px)` } }, chips.map((chip) => /* @__PURE__ */ import_react3.default.createElement("span", { key: chip, style: { padding: "8px 14px", border: `1px solid ${palette.line}`, borderRadius: 999, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.text, background: "rgba(255,255,255,.5)" } }, chip))), /* @__PURE__ */ import_react3.default.createElement("blockquote", { style: rtlParagraphStyle({ marginTop: 48, paddingRight: 32, borderRight: `3px solid ${palette.accent}`, fontSize: scaleFont(appearance, 22), lineHeight: 1.5, maxWidth: 640, opacity: fade(frame, 66, 14), transform: `translateY(${shift(frame, 66, 14, 10)}px)` }) }, /* @__PURE__ */ import_react3.default.createElement("span", null, getValue(values, "i-quote")), /* @__PURE__ */ import_react3.default.createElement("span", { style: { display: "block", marginTop: 14, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.muted, letterSpacing: "0.18em" } }, getValue(values, "i-who")))), /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          left: 80,
          right: 80,
          bottom: 48,
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 32,
          paddingTop: 24,
          borderTop: `1px solid ${palette.line}`,
          opacity: fade(frame, 34, 10),
          transform: `translateY(${shift(frame, 34, 10, 10)}px)`
        }
      },
      /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 18), color: palette.text }) }, /* @__PURE__ */ import_react3.default.createElement("span", { style: { color: palette.muted, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 13), marginLeft: 14 } }, "SOURCE"), getValue(values, "i-source")),
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { height: 2, background: palette.line, position: "relative" } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", left: 0, top: 0, bottom: 0, width: `${p(frame, 34, 125) * 100}%`, background: palette.accent } })),
      /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 14), color: palette.muted } }, /* @__PURE__ */ import_react3.default.createElement("b", { style: { color: palette.text } }, "PART 01"), " / \u0642\u0631\u0627\u0621\u0629 8 \u062F\u0642\u0627\u0626\u0642")
    ));
  };
  var XAnimatedTemplate = ({
    values,
    appearance
  }) => {
    const frame = useCurrentFrame();
    const entranceOpacity = fade(frame, 6, 18);
    const entranceTransform = `translate(-50%, -50%) translateZ(${shift(frame, 6, 18, -500, 0)}px) rotateX(${shift(frame, 6, 18, 20, 0)}deg)`;
    const floatTransform = `translateY(${Math.sin(frame / 18) * 10}px) rotateX(${Math.sin(frame / 32) * 2}deg) rotateY(${Math.cos(frame / 24) * 2}deg)`;
    const palette = getTemplatePalette("x-animated", appearance);
    return /* @__PURE__ */ import_react3.default.createElement(
      SocialCardBase,
      {
        background: /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { background: `radial-gradient(circle at center, ${palette.card} 0%, ${palette.background} 100%)` } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", fontSize: scaleFont(appearance, 1e3), color: `${palette.text}08`, fontFamily: "sans-serif", top: -100, left: -100, lineHeight: 1, transform: `translate(${interpolate(frame % 750, [0, 750], [0, -100])}px, ${interpolate(frame % 750, [0, 750], [0, 100])}px) rotate(-7deg)` } }, "\u{1D54F}")),
        entranceOpacity,
        entranceTransform,
        floatTransform,
        card: /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: 1e3, background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 24, padding: 40, boxShadow: "0 40px 100px rgba(0,0,0,0.8)", display: "flex", flexDirection: "column", gap: 20, fontFamily: FONT_RTL_PRIMARY } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 20, opacity: fade(frame, 15, 10), transform: `translateY(${shift(frame, 15, 10, 20)}px)` } }, /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: LOCAL_SOCIAL_AVATAR, style: { width: 80, height: 80, borderRadius: "50%", objectFit: "cover" } }), /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", flexDirection: "column" } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 28), fontWeight: 700, color: palette.text, display: "flex", alignItems: "center", gap: 8 }) }, /* @__PURE__ */ import_react3.default.createElement("span", null, getValue(values, "i-name")), /* @__PURE__ */ import_react3.default.createElement("span", { style: { width: 24, height: 24, background: palette.accent, borderRadius: "50%", display: "grid", placeItems: "center", color: palette.text, fontSize: scaleFont(appearance, 14) } }, "\u2713")), /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 22), color: palette.muted }) }, getValue(values, "i-handle"))), /* @__PURE__ */ import_react3.default.createElement("div", { style: { marginRight: "auto", fontSize: scaleFont(appearance, 40), color: palette.text, fontFamily: "sans-serif" } }, "\u{1D54F}")), /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlParagraphStyle({ fontSize: scaleFont(appearance, 38), lineHeight: 1.5, color: palette.text, opacity: fade(frame, 19, 10), transform: `translateY(${shift(frame, 19, 10, 20)}px)` }) }, getValue(values, "i-text")), /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: "100%", height: 450, borderRadius: 16, overflow: "hidden", border: `1px solid ${palette.border}`, opacity: fade(frame, 23, 10), transform: `translateY(${shift(frame, 23, 10, 20)}px)` } }, /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: getValue(values, "i-img"), style: { width: "100%", height: "100%", objectFit: "cover" } })), /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: scaleFont(appearance, 22), color: palette.muted, borderBottom: `1px solid ${palette.border}`, paddingBottom: 15, marginTop: 10, opacity: fade(frame, 27, 10), transform: `translateY(${shift(frame, 27, 10, 20)}px)` } }, "12:17 AM \u2022 May 14, 2026 \u2022 ", /* @__PURE__ */ import_react3.default.createElement("b", { style: { color: palette.text } }, "1.5M"), " Views"), /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", gap: 40, color: palette.text, fontSize: scaleFont(appearance, 24), fontWeight: 700, paddingTop: 10, opacity: fade(frame, 31, 10), transform: `translateY(${shift(frame, 31, 10, 20)}px)` } }, /* @__PURE__ */ import_react3.default.createElement("div", null, "22K ", /* @__PURE__ */ import_react3.default.createElement("span", { style: { color: palette.muted, fontWeight: 400, marginRight: 5 } }, "Reposts")), /* @__PURE__ */ import_react3.default.createElement("div", null, "15K ", /* @__PURE__ */ import_react3.default.createElement("span", { style: { color: palette.muted, fontWeight: 400, marginRight: 5 } }, "Quotes")), /* @__PURE__ */ import_react3.default.createElement("div", null, "110K ", /* @__PURE__ */ import_react3.default.createElement("span", { style: { color: palette.muted, fontWeight: 400, marginRight: 5 } }, "Likes"))))
      }
    );
  };
  var FacebookAnimatedTemplate = ({
    values,
    appearance
  }) => {
    const frame = useCurrentFrame();
    const entranceOpacity = fade(frame, 6, 18);
    const entranceTransform = `translate(-50%, ${shift(frame, 6, 18, -30, -50)}%)`;
    const floatTransform = `translateY(${Math.sin(frame / 18) * 8}px) rotateZ(${Math.sin(frame / 45) * 0.4}deg)`;
    const palette = getTemplatePalette("facebook-animated", appearance);
    return /* @__PURE__ */ import_react3.default.createElement(
      SocialCardBase,
      {
        background: /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { background: `radial-gradient(circle at 20% 80%, ${palette.card} 0%, ${palette.background} 100%)` } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", right: -150, bottom: -150, opacity: 0.04, width: 1200, height: 1200, color: palette.accent, fontSize: scaleFont(appearance, 1200), fontFamily: "Arial Black, sans-serif", lineHeight: 1 } }, "f")),
        entranceOpacity,
        entranceTransform,
        floatTransform,
        card: /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: 900, background: palette.card, borderRadius: 16, padding: 30, boxShadow: "0 30px 80px rgba(0,0,0,0.2)", fontFamily: FONT_RTL_PRIMARY } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 15, marginBottom: 25, opacity: fade(frame, 16, 10), transform: `translateY(${shift(frame, 16, 10, 20)}px)` } }, /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: LOCAL_SOCIAL_AVATAR, style: { width: 70, height: 70, borderRadius: "50%", objectFit: "cover" } }), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 26), fontWeight: 700, color: palette.text }) }, getValue(values, "i-name")), /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: scaleFont(appearance, 18), color: palette.muted } }, "\u0623\u0645\u0633 \u0641\u064A \u0668:\u0663\u0660 \u0645 \u2022 \u{1F310}"))), /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlParagraphStyle({ fontSize: scaleFont(appearance, 38), lineHeight: 1.5, color: palette.text, marginBottom: 25, opacity: fade(frame, 20, 10), transform: `translateY(${shift(frame, 20, 10, 20)}px)` }) }, getValue(values, "i-text")), /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: "calc(100% + 60px)", margin: "0 -30px 20px", height: 500, overflow: "hidden", borderTop: `1px solid ${palette.border}`, borderBottom: `1px solid ${palette.border}`, opacity: fade(frame, 24, 10), transform: `translateY(${shift(frame, 24, 10, 20)}px)` } }, /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: getValue(values, "i-img"), style: { width: "100%", height: "100%", objectFit: "cover", transform: `scale(${interpolate(frame, [0, 350], [1.1, 1])})` } })), /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, color: palette.muted, fontSize: scaleFont(appearance, 22), borderBottom: `1px solid ${palette.border}`, paddingBottom: 15, opacity: fade(frame, 28, 10), transform: `translateY(${shift(frame, 28, 10, 20)}px)` } }, /* @__PURE__ */ import_react3.default.createElement("span", null, "\u2764\uFE0F \u{1F44D} \u0662\u0668 \u0623\u0644\u0641"), /* @__PURE__ */ import_react3.default.createElement("span", { style: { marginRight: "auto" } }, "\u0661,\u0664\u0660\u0660 \u062A\u0639\u0644\u064A\u0642 \u2022 \u0665\u0666\u0660 \u0645\u0634\u0627\u0631\u0643\u0629")), /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", paddingTop: 15, justifyContent: "space-around", color: palette.muted, fontSize: scaleFont(appearance, 24), fontWeight: 600, opacity: fade(frame, 28, 10), transform: `translateY(${shift(frame, 28, 10, 20)}px)` } }, /* @__PURE__ */ import_react3.default.createElement("div", null, "\u0623\u0639\u062C\u0628\u0646\u064A"), /* @__PURE__ */ import_react3.default.createElement("div", null, "\u062A\u0639\u0644\u064A\u0642"), /* @__PURE__ */ import_react3.default.createElement("div", null, "\u0645\u0634\u0627\u0631\u0643\u0629")))
      }
    );
  };
  var TelegramAnimatedTemplate = ({
    values,
    appearance
  }) => {
    const frame = useCurrentFrame();
    const floatTransform = `translateY(${Math.sin(frame / 18) * 8}px) rotateX(${Math.sin(frame / 44) * 1}deg)`;
    const palette = getTemplatePalette("telegram-animated", appearance);
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { ...stageStyle, background: palette.background, fontFamily: FONT_RTL_PRIMARY } }, /* @__PURE__ */ import_react3.default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: palette.text, strokeWidth: "0.5", strokeLinecap: "round", strokeLinejoin: "round", style: { position: "absolute", top: "30%", left: "10%", width: 600, opacity: 0.03, transform: `translate(${interpolate(frame % 1e3, [0, 1e3], [-200, 1500])}px, ${interpolate(frame % 1e3, [0, 1e3], [200, -500])}px) rotate(${interpolate(frame % 1e3, [0, 1e3], [-10, 10])}deg)` } }, /* @__PURE__ */ import_react3.default.createElement("line", { x1: "22", y1: "2", x2: "11", y2: "13" }), /* @__PURE__ */ import_react3.default.createElement("polygon", { points: "22 2 15 22 11 13 2 9 22 2" })), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 110, background: palette.header, display: "flex", alignItems: "center", padding: "0 60px", gap: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.6)", transform: `translateY(${shift(frame, 4, 16, -100, 0)}%)`, zIndex: 10 } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: 65, height: 65, borderRadius: "50%", background: `linear-gradient(${palette.accent}, ${palette.header})`, display: "grid", placeItems: "center", color: palette.text, fontSize: scaleFont(appearance, 30), fontWeight: "bold" } }, getValue(values, "i-channel").charAt(0)), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 28), fontWeight: 700, color: palette.text }) }, getValue(values, "i-channel")), /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: scaleFont(appearance, 20), color: palette.muted } }, "2.8M subscribers"))), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", bottom: 120, right: 120, opacity: fade(frame, 14, 18), transform: `translateY(${shift(frame, 14, 18, 100)}px)` } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { transform: floatTransform } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: 850, background: palette.card, borderRadius: 20, padding: 15, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: "100%", height: 500, borderRadius: 12, marginBottom: 20, overflow: "hidden", opacity: fade(frame, 20, 10), transform: `translateY(${shift(frame, 20, 10, 15)}px)` } }, /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: getValue(values, "i-img"), style: { width: "100%", height: "100%", objectFit: "cover" } })), /* @__PURE__ */ import_react3.default.createElement("div", { style: { padding: "0 15px 10px" } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 30), fontWeight: 700, color: palette.accent, marginBottom: 12, opacity: fade(frame, 24, 10), transform: `translateY(${shift(frame, 24, 10, 15)}px)` }) }, getValue(values, "i-title")), /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlParagraphStyle({ fontSize: scaleFont(appearance, 36), lineHeight: 1.5, color: palette.text, opacity: fade(frame, 24, 10), transform: `translateY(${shift(frame, 24, 10, 15)}px)` }) }, getValue(values, "i-text")), /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10, color: palette.muted, fontSize: scaleFont(appearance, 20), marginTop: 20, opacity: fade(frame, 28, 10), transform: `translateY(${shift(frame, 28, 10, 15)}px)` } }, "\u{1F441}\uFE0F 412.5K \u2022 11:45 PM"))))));
  };
  var InstagramAnimatedTemplate = ({
    values,
    appearance
  }) => {
    const frame = useCurrentFrame();
    const entranceOpacity = fade(frame, 6, 18);
    const entranceTransform = `translate(-50%, -50%) scale(${interpolate(frame, [6, 24], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: smoothEase })}) translateY(${shift(frame, 6, 18, 50)}px)`;
    const floatTransform = `translateY(${Math.sin(frame / 20) * 8}px) rotateY(${Math.sin(frame / 40) * -2}deg)`;
    const palette = getTemplatePalette("instagram-animated", appearance);
    return /* @__PURE__ */ import_react3.default.createElement(
      SocialCardBase,
      {
        background: /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { background: `radial-gradient(circle at 80% 20%, ${palette.accent}22 0%, ${palette.background} 60%)`, display: "flex", alignItems: "center", justifyContent: "center" } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", width: 800, height: 800, background: `radial-gradient(circle, ${palette.accent}14 0%, ${palette.accent}0d 40%, rgba(255,255,255,0) 70%)`, top: "10%", left: "10%", filter: "blur(60px)", transform: `translate(${Math.sin(frame / 60) * 200}px, ${Math.cos(frame / 60) * 60}px) scale(${1 + Math.sin(frame / 70) * 0.15})` } })),
        entranceOpacity,
        entranceTransform,
        floatTransform,
        card: /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: 850, background: palette.card, border: `1px solid ${palette.border}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.15)", fontFamily: FONT_RTL_PRIMARY } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { height: 80, padding: "0 20px", display: "flex", alignItems: "center", gap: 15, borderBottom: `1px solid ${palette.border}`, background: palette.card, opacity: fade(frame, 16, 10), transform: `translateY(${shift(frame, 16, 10, 15)}px)` } }, /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: LOCAL_SOCIAL_AVATAR, style: { width: 50, height: 50, borderRadius: "50%", padding: 3, border: `3px solid ${palette.accent}`, objectFit: "cover" } }), /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 22), fontWeight: 700, color: palette.text }) }, getValue(values, "i-user")), /* @__PURE__ */ import_react3.default.createElement("div", { style: { marginRight: "auto", fontSize: scaleFont(appearance, 28), color: palette.text, letterSpacing: 2 } }, "\u2022\u2022\u2022")), /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: "100%", aspectRatio: "1 / 1", background: palette.border, overflow: "hidden", opacity: fade(frame, 20, 10), transform: `translateY(${shift(frame, 20, 10, 15)}px)` } }, /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: getValue(values, "i-img"), style: { width: "100%", height: "100%", objectFit: "cover" } })), /* @__PURE__ */ import_react3.default.createElement("div", { style: { background: palette.card } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { padding: "15px 20px", display: "flex", gap: 20, fontSize: scaleFont(appearance, 30), color: palette.text, opacity: fade(frame, 24, 10), transform: `translateY(${shift(frame, 24, 10, 15)}px)` } }, /* @__PURE__ */ import_react3.default.createElement("span", null, "\u2764\uFE0F"), /* @__PURE__ */ import_react3.default.createElement("span", null, "\u{1F4AC}"), /* @__PURE__ */ import_react3.default.createElement("span", null, "\u2708\uFE0F"), /* @__PURE__ */ import_react3.default.createElement("span", { style: { marginRight: "auto" } }, "\u{1F516}")), /* @__PURE__ */ import_react3.default.createElement("div", { style: { padding: "0 20px 20px", opacity: fade(frame, 28, 10), transform: `translateY(${shift(frame, 28, 10, 15)}px)` } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontWeight: 700, marginBottom: 10, fontSize: scaleFont(appearance, 22) }) }, "\u0625\u0639\u062C\u0627\u0628 \u0628\u0648\u0627\u0633\u0637\u0629 ", /* @__PURE__ */ import_react3.default.createElement("b", null, "\u0622\u062E\u0631\u0648\u0646"), " \u0648 \u0664,\u0662\u0661\u0660 \u0622\u062E\u0631\u064A\u0646"), /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlParagraphStyle({ fontSize: scaleFont(appearance, 22), lineHeight: 1.5, color: palette.text }) }, /* @__PURE__ */ import_react3.default.createElement("b", { style: { marginLeft: 8, fontFamily: FONT_RTL_PRIMARY } }, getValue(values, "i-user")), /* @__PURE__ */ import_react3.default.createElement("span", null, getValue(values, "i-text"))), /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontSize: scaleFont(appearance, 16), color: palette.muted, textTransform: "uppercase", marginTop: 15 } }, "\u0645\u0646\u0630 \u0661\u0664 \u0633\u0627\u0639\u0629"))))
      }
    );
  };
  var PointsBroadcastTemplate = ({
    values,
    appearance
  }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const palette = getTemplatePalette("points-broadcast", appearance);
    const hasPortrait = Boolean(getValue(values, "i-photo"));
    const speakerName = getValue(values, "i-speaker", "").trim();
    const speakerRole = getValue(values, "i-role", "").trim();
    const hasSpeakerMeta = Boolean(speakerName || speakerRole);
    const portraitRadius = appearance.portraitSquare ? 36 : "280px 280px 32px 32px";
    const portraitAuraRadius = appearance.portraitSquare ? 42 : "45%";
    const portraitRingRadius = appearance.portraitSquare ? 46 : "50%";
    const rawPoints = normalizePointItems(getValue(values, "i-quote"));
    const points = rawPoints.length > 0 ? rawPoints : ["\u0627\u0643\u062A\u0628 \u0627\u0644\u0646\u0642\u0627\u0637 \u0647\u0646\u0627"];
    const pointsWidth = hasPortrait ? 860 : 1180;
    const basePointFontSize = scaleFont(appearance, 62);
    const { fontSize: pointFontSize, groups } = resolvePointGroups(points, pointsWidth, basePointFontSize, FONT_RTL_PRIMARY, 4);
    const sequencePace = 2;
    const paceFrame = (frames) => Math.round(frames * sequencePace);
    const groupDurationSeconds = Math.max(3, Math.min(60, Number(getValue(values, "i-group-duration", "10")) || 10));
    const minimumGroupDurationFrames = Math.max(paceFrame(45), Math.round(2.8 * fps));
    const groupDurationFrames = Math.max(minimumGroupDurationFrames, Math.round(groupDurationSeconds * fps));
    const loopEnabled = getValue(values, "i-loop", "1") !== "0";
    const cycleIndex = Math.floor(frame / groupDurationFrames);
    const groupIndex = loopEnabled ? cycleIndex % groups.length : Math.min(groups.length - 1, cycleIndex);
    const groupFrame = loopEnabled ? frame % groupDurationFrames : Math.min(groupDurationFrames - 1, Math.max(0, frame - groupIndex * groupDurationFrames));
    const currentGroup = groups[groupIndex] || groups[0];
    const hasUpcomingGroup = loopEnabled ? groups.length > 1 : groupIndex < groups.length - 1;
    const groupTransitionFrames = Math.min(paceFrame(12), groupDurationFrames - 1);
    const timelineDrawFrames = Math.min(paceFrame(10), groupDurationFrames - 1);
    const groupEnter = fade(groupFrame, 0, groupTransitionFrames);
    const groupExit = hasUpcomingGroup ? interpolate(groupFrame, [Math.max(0, groupDurationFrames - groupTransitionFrames), groupDurationFrames], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: smoothEase
    }) : 1;
    const groupShift = shift(groupFrame, 0, groupTransitionFrames, 26, 0) + (hasUpcomingGroup ? shift(groupFrame, Math.max(0, groupDurationFrames - groupTransitionFrames), groupTransitionFrames, 0, -26) : 0);
    const groupOpacity = Math.max(0, Math.min(1, groupEnter * groupExit));
    const quoteAreaRight = hasPortrait ? 180 : 110;
    const quoteAreaWidth = hasPortrait ? 1120 : 1380;
    const timelineTopPositions = currentGroup.items.map((_, index) => {
      if (currentGroup.items.length === 1) {
        return 180;
      }
      return 78 + 280 / Math.max(currentGroup.items.length - 1, 1) * index;
    });
    const timelineLineTop = 28;
    const timelineLineHeight = Math.max(12, (timelineTopPositions.at(-1) ?? 180) - timelineLineTop + 18);
    const quoteGap = currentGroup.lineCount >= 4 ? 16 : 22;
    const portraitRevealStart = paceFrame(10);
    const portraitBadgeStart = paceFrame(22);
    const quoteMarkRevealStart = paceFrame(18);
    const titleMainRevealStart = paceFrame(20);
    const titleSubRevealStart = paceFrame(28);
    const subtitleUnderlineStart = paceFrame(34);
    const timelineRevealStart = paceFrame(38);
    const timelineNodeBaseDelay = paceFrame(10);
    const pointsRevealBaseDelay = paceFrame(22);
    const sourceRevealStart = paceFrame(64);
    return /* @__PURE__ */ import_react3.default.createElement(
      AbsoluteFill,
      {
        style: {
          ...stageStyle,
          background: `linear-gradient(135deg, ${palette.background} 0%, ${palette.backgroundAlt} 100%)`,
          color: palette.text
        }
      },
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            ...absFill({
              zIndex: 0,
              background: [
                `radial-gradient(circle at 82% 38%, rgba(255,255,255,0.09), transparent 25%)`,
                `radial-gradient(circle at 20% 85%, rgba(0,0,0,0.20), transparent 36%)`,
                `linear-gradient(135deg, ${palette.background}, ${palette.backgroundAlt})`
              ].join(","),
              transform: `scale(${1.015 + Math.sin(frame / 90) * 0.018}) translate(${-18 + Math.sin(frame / 120) * 16}px, ${10 + Math.cos(frame / 130) * 10}px)`
            })
          }
        }
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            ...absFill({
              zIndex: 0,
              opacity: 0.13,
              mixBlendMode: "soft-light",
              backgroundImage: "linear-gradient(rgba(255,255,255,.18) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px)",
              backgroundSize: "80px 80px",
              transform: "rotate(-1deg) scale(1.08)"
            })
          }
        }
      ),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            ...absFill({
              zIndex: 0,
              opacity: 0.12,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.22) 0 1px, transparent 1px 6px)",
              backgroundSize: "14px 14px"
            })
          }
        }
      ),
      /* @__PURE__ */ import_react3.default.createElement(PointsBackgroundOverlay, { appearance }),
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            right: -2,
            top: 250,
            width: 34,
            height: 160,
            background: palette.accent,
            boxShadow: `0 0 40px ${palette.accent}66`,
            opacity: fade(frame, paceFrame(8), paceFrame(12)),
            transform: `translateX(${shift(frame, paceFrame(8), paceFrame(12), 30)}px)`
          }
        }
      ),
      hasPortrait ? /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            left: 56,
            bottom: 150,
            width: 620,
            height: 820,
            opacity: fade(frame, portraitRevealStart, paceFrame(16)),
            transform: `translateX(${shift(frame, portraitRevealStart, paceFrame(16), -80)}px) scale(${interpolate(frame, [portraitRevealStart, paceFrame(32)], [0.96, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: smoothEase
            })})`
          }
        },
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              inset: 0,
              transformOrigin: "50% 68%",
              transform: `translateY(${Math.sin(frame / 40) * -7}px) scale(${1 + Math.sin(frame / 60) * 0.012}) rotate(${Math.sin(frame / 75) * 0.35}deg)`
            }
          },
          /* @__PURE__ */ import_react3.default.createElement(
            "div",
            {
              style: {
                position: "absolute",
                left: 20,
                bottom: 42,
                width: 560,
                height: 560,
                borderRadius: portraitRingRadius,
                border: "3px solid rgba(255,255,255,.23)",
                boxShadow: "inset 0 0 90px rgba(255,255,255,.08), 0 30px 80px rgba(0,0,0,.22)"
              }
            }
          ),
          /* @__PURE__ */ import_react3.default.createElement(
            "div",
            {
              style: {
                position: "absolute",
                left: 88,
                bottom: 126,
                width: 450,
                height: 560,
                borderRadius: portraitAuraRadius,
                background: "radial-gradient(circle, rgba(255,255,255,.30), transparent 68%)",
                filter: "blur(28px)",
                opacity: 0.45
              }
            }
          ),
          /* @__PURE__ */ import_react3.default.createElement(
            "div",
            {
              style: {
                position: "absolute",
                left: 52,
                bottom: 18,
                width: 520,
                height: 750,
                overflow: "hidden",
                borderRadius: portraitRadius,
                boxShadow: "0 28px 90px rgba(0,0,0,.32)"
              }
            },
            /* @__PURE__ */ import_react3.default.createElement(
              SafeImg,
              {
                src: getValue(values, "i-photo"),
                style: {
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  filter: appearance.portraitMonochrome ? "grayscale(1) contrast(1.12)" : "contrast(1.04) saturate(1.08)",
                  mixBlendMode: appearance.portraitMonochrome ? "luminosity" : "normal",
                  opacity: 0.88,
                  transform: `translate(${appearance.portraitX}px, ${appearance.portraitY}px) scale(${appearance.portraitScale})`,
                  transformOrigin: "center top"
                }
              }
            )
          ),
          hasSpeakerMeta ? /* @__PURE__ */ import_react3.default.createElement(
            "div",
            {
              style: {
                position: "absolute",
                left: 62,
                bottom: 58,
                minWidth: 330,
                background: "rgba(0,0,0,.28)",
                border: "1px solid rgba(255,255,255,.22)",
                backdropFilter: "blur(10px)",
                padding: "18px 24px",
                borderRadius: 18,
                boxShadow: "0 18px 44px rgba(0,0,0,.20)",
                opacity: fade(frame, portraitBadgeStart, paceFrame(12)),
                transform: `translateY(${shift(frame, portraitBadgeStart, paceFrame(12), 16)}px)`
              }
            },
            speakerName ? /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 30), fontWeight: 900 }) }, speakerName) : null,
            speakerRole ? /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 19), color: "rgba(255,255,255,.74)", fontWeight: 700, marginTop: speakerName ? 6 : 0 }) }, speakerRole) : null
          ) : null
        )
      ) : null,
      /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          style: {
            position: "absolute",
            right: quoteAreaRight,
            top: 100,
            width: quoteAreaWidth,
            minHeight: 780
          }
        },
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              right: 180,
              top: 10,
              fontFamily: FONT_SERIF,
              fontSize: 2040,
              fontWeight: 900,
              lineHeight: 0.8,
              color: palette.text,
              opacity: 0.03,
              transform: `translate(${Math.sin(frame / 140) * -110}px, ${Math.cos(frame / 100) * 40}px) rotate(${Math.sin(frame / 170) * 2}deg) scale(${1 + Math.sin(frame / 160) * 0.03})`
            }
          },
          "\u201D"
        ),
        appearance.showQuoteMark ? /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              right: 115,
              top: -8,
              fontFamily: FONT_SERIF,
              fontSize: 250,
              fontWeight: 900,
              lineHeight: 0.75,
              color: palette.text,
              opacity: fade(frame, quoteMarkRevealStart, paceFrame(16)),
              transform: `scale(${interpolate(frame, [quoteMarkRevealStart, paceFrame(26)], [0.75, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: overshootEase
              })}) translateY(${shift(frame, quoteMarkRevealStart, paceFrame(16), -16)}px)`,
              textShadow: "0 22px 60px rgba(0,0,0,.14)"
            }
          },
          "\u201D"
        ) : null,
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              right: 0,
              top: 90,
              width: 560,
              zIndex: 2
            }
          },
          /* @__PURE__ */ import_react3.default.createElement(
            "div",
            {
              style: {
                opacity: fade(frame, titleMainRevealStart, paceFrame(14)),
                transform: `translateY(${shift(frame, titleMainRevealStart, paceFrame(14), 22)}px)`
              }
            },
            /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 60), lineHeight: 1.14, fontWeight: 900, letterSpacing: 0, whiteSpace: "nowrap" }) }, getValue(values, "i-title-main", "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0631\u0626\u064A\u0633\u064A"))
          ),
          /* @__PURE__ */ import_react3.default.createElement(
            "div",
            {
              style: rtlTextStyle({
                fontSize: scaleFont(appearance, 34),
                color: "rgba(255,255,255,.72)",
                lineHeight: 1.25,
                marginTop: 18,
                whiteSpace: "nowrap",
                position: "relative",
                display: "inline-block",
                opacity: fade(frame, titleSubRevealStart, paceFrame(12)),
                transform: `translateY(${shift(frame, titleSubRevealStart, paceFrame(12), 18)}px)`
              })
            },
            getValue(values, "i-title-sub", "\u0627\u0644\u0639\u0646\u0648\u0627\u0646 \u0627\u0644\u0641\u0631\u0639\u064A"),
            /* @__PURE__ */ import_react3.default.createElement(
              "span",
              {
                style: {
                  position: "absolute",
                  right: 0,
                  bottom: -9,
                  width: "68%",
                  height: 5,
                  background: "rgba(255,255,255,.28)",
                  transformOrigin: "right",
                  transform: `scaleX(${fade(frame, subtitleUnderlineStart, paceFrame(12))})`
                }
              }
            )
          )
        ),
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              right: -6,
              top: 248,
              width: 80,
              height: 470,
              opacity: fade(frame, timelineRevealStart, paceFrame(10)),
              zIndex: 4
            }
          },
          /* @__PURE__ */ import_react3.default.createElement(
            "div",
            {
              style: {
                position: "absolute",
                right: 34,
                top: timelineLineTop,
                width: 0,
                height: timelineLineHeight * fade(groupFrame, timelineNodeBaseDelay, timelineDrawFrames),
                borderRight: "3px dashed rgba(255,255,255,.72)"
              }
            }
          ),
          timelineTopPositions.map((top, index) => /* @__PURE__ */ import_react3.default.createElement(
            "div",
            {
              key: `node-${groupIndex}-${index}`,
              style: {
                position: "absolute",
                right: 20,
                top,
                width: 30,
                height: 30,
                border: "5px solid rgba(255,255,255,.92)",
                background: "transparent",
                transform: `scale(${interpolate(groupFrame, [timelineNodeBaseDelay + paceFrame(index * 4), timelineNodeBaseDelay + paceFrame(8 + index * 4)], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: overshootEase
                })})`,
                boxShadow: `0 0 0 ${interpolate(groupFrame, [timelineNodeBaseDelay + paceFrame(index * 4), timelineNodeBaseDelay + paceFrame(8 + index * 4)], [0, 10], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp"
                })}px ${palette.accent}22`
              }
            },
            /* @__PURE__ */ import_react3.default.createElement(
              "div",
              {
                style: {
                  position: "absolute",
                  inset: 6,
                  background: palette.accent,
                  opacity: 0.92
                }
              }
            )
          ))
        ),
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              right: 110,
              top: 300,
              width: pointsWidth,
              zIndex: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: quoteGap,
              opacity: groupOpacity,
              transform: `translateY(${groupShift}px)`
            }
          },
          currentGroup.items.map((item, index) => {
            const pointDelay = pointsRevealBaseDelay + paceFrame(index * 5);
            const pointOpacity = fade(groupFrame, pointDelay, paceFrame(10));
            const pointTranslate = shift(groupFrame, pointDelay, paceFrame(10), 18);
            return /* @__PURE__ */ import_react3.default.createElement(
              "div",
              {
                key: `${groupIndex}-${index}-${item.text.slice(0, 18)}`,
                style: {
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 18,
                  alignItems: "flex-start",
                  opacity: pointOpacity,
                  transform: `translateY(${pointTranslate}px)`
                }
              },
              /* @__PURE__ */ import_react3.default.createElement(
                "div",
                {
                  style: {
                    width: 18,
                    minWidth: 18,
                    height: 18,
                    background: palette.accent,
                    marginTop: Math.max(16, pointFontSize * 0.32),
                    boxShadow: `0 0 22px ${palette.accent}88`
                  }
                }
              ),
              /* @__PURE__ */ import_react3.default.createElement(
                "div",
                {
                  style: rtlTextStyle({
                    flex: 1,
                    fontSize: pointFontSize,
                    fontWeight: 900,
                    lineHeight: 1.22,
                    letterSpacing: 0,
                    color: index % 2 === 0 ? palette.text : "rgba(255,255,255,.82)",
                    textShadow: "0 15px 38px rgba(0,0,0,.12)"
                  })
                },
                renderHighlightedPoint(item.text, palette.accent)
              )
            );
          })
        ),
        /* @__PURE__ */ import_react3.default.createElement(
          "div",
          {
            style: {
              position: "absolute",
              right: 110,
              top: 700,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 22px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,.25)",
              background: "rgba(0,0,0,.13)",
              fontSize: scaleFont(appearance, 24),
              fontWeight: 800,
              color: "rgba(255,255,255,.82)",
              opacity: fade(frame, sourceRevealStart, paceFrame(14)),
              transform: `translateY(${shift(frame, sourceRevealStart, paceFrame(14), 12)}px)`
            }
          },
          /* @__PURE__ */ import_react3.default.createElement(
            "span",
            {
              style: {
                width: 13,
                height: 13,
                background: palette.accent,
                boxShadow: `0 0 22px ${palette.accent}`
              }
            }
          ),
          /* @__PURE__ */ import_react3.default.createElement("span", null, getValue(values, "i-source", "\u0627\u0644\u0645\u0635\u062F\u0631"))
        )
      )
    );
  };
  var cardImgs = ["i-t1-img", "i-t2-img", "i-t3-img"];
  var cardTags = ["#\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627", "#\u0627\u0642\u062A\u0635\u0627\u062F", "#\u0631\u064A\u0627\u0636\u0629"];
  var cardMetas = [
    { count: "\u0661.\u0662 \u0645\u0644\u064A\u0648\u0646 \u062A\u0641\u0627\u0639\u0644", dir: "\u25B2 \u0635\u0627\u0639\u062F" },
    { count: "\u0668\u0665\u0660 \u0623\u0644\u0641 \u062A\u0641\u0627\u0639\u0644", dir: "\u25B2 \u0635\u0627\u0639\u062F" },
    { count: "\u0664\u0662\u0660 \u0623\u0644\u0641 \u062A\u0641\u0627\u0639\u0644", dir: "\u25BC \u0645\u0633\u062A\u0642\u0631" }
  ];
  var TopTrendsTemplate = ({
    values,
    appearance
  }) => {
    const frame = useCurrentFrame();
    const palette = getTemplatePalette("top-trends", appearance);
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { ...stageStyle, background: `radial-gradient(circle at 30% 10%, ${palette.panel} 0%, ${palette.background} 50%, #05051a 100%)`, color: palette.text, fontFamily: FONT_RTL_PRIMARY } }, /* @__PURE__ */ import_react3.default.createElement(
      "div",
      {
        style: {
          ...absFill(),
          backgroundImage: `linear-gradient(${palette.panel} 1px, transparent 1px), linear-gradient(90deg, ${palette.panel} 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          opacity: 0.15,
          transform: `perspective(500px) rotateX(60deg) translateY(${interpolate(frame % 500, [0, 500], [0, 50])}px) scale(3)`
        }
      }
    ), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", top: 60, right: 80, opacity: fade(frame, 5, 16), transform: `translateX(${shift(frame, 5, 16, 50)}px)` } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { background: palette.accentAlt, padding: "8px 28px", fontWeight: 900, fontSize: scaleFont(appearance, 22), letterSpacing: 2, textTransform: "uppercase", display: "inline-block", borderRadius: 4 } }, "\u0645\u0624\u0634\u0631\u0627\u062A \u0627\u0644\u0628\u062D\u062B"), /* @__PURE__ */ import_react3.default.createElement("h1", { style: { fontSize: scaleFont(appearance, 68), fontWeight: 900, lineHeight: 1.1, marginTop: 8, textShadow: "0 10px 40px rgba(0,0,0,0.9)" } }, "\u0623\u0628\u0631\u0632 \u0627\u0644\u062A\u0631\u064A\u0646\u062F\u0627\u062A ", /* @__PURE__ */ import_react3.default.createElement("span", { style: { color: palette.accent } }, "\u0627\u0644\u064A\u0648\u0645"))), /* @__PURE__ */ import_react3.default.createElement("div", { style: { position: "absolute", top: 290, left: 60, right: 60, display: "flex", gap: 30 } }, [getValue(values, "i-t1"), getValue(values, "i-t2"), getValue(values, "i-t3")].map((title, index) => {
      const imgUrl = getValue(values, cardImgs[index]);
      return /* @__PURE__ */ import_react3.default.createElement(
        "div",
        {
          key: index,
          style: {
            flex: 1,
            background: `linear-gradient(135deg, ${palette.panel}d9 0%, ${palette.background}e6 100%)`,
            border: `1px solid ${palette.accent}33`,
            borderRadius: 12,
            padding: 28,
            backdropFilter: "blur(8px)",
            position: "relative",
            opacity: fade(frame, 15 + index * 5, 14),
            transform: `translateY(${shift(frame, 15 + index * 5, 14, 80)}px)`,
            boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }
        },
        /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: "100%", height: 180, borderRadius: 8, marginBottom: 16, background: `linear-gradient(135deg, ${palette.panel}, ${palette.background})`, overflow: "hidden" } }, imgUrl ? /* @__PURE__ */ import_react3.default.createElement(SafeImg, { src: imgUrl, style: { width: "100%", height: "100%", objectFit: "cover" } }) : null),
        /* @__PURE__ */ import_react3.default.createElement("div", { style: { fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 90), fontWeight: 700, color: "transparent", WebkitTextStroke: `2px ${palette.accent}26`, position: "absolute", top: 12, left: 16, lineHeight: 1 } }, `0${index + 1}`),
        /* @__PURE__ */ import_react3.default.createElement("span", { style: { color: palette.accent, fontFamily: FONT_MONO, fontSize: scaleFont(appearance, 16), marginBottom: 10, display: "block" } }, cardTags[index]),
        /* @__PURE__ */ import_react3.default.createElement("div", { style: rtlTextStyle({ fontSize: scaleFont(appearance, 34), fontWeight: 900, lineHeight: 1.3, marginBottom: 12, flex: 1 }) }, title),
        /* @__PURE__ */ import_react3.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", color: palette.muted, fontSize: scaleFont(appearance, 16), borderTop: `1px solid ${palette.accent}1a`, paddingTop: 12, marginTop: 8 } }, /* @__PURE__ */ import_react3.default.createElement("span", null, cardMetas[index].count), /* @__PURE__ */ import_react3.default.createElement("span", null, cardMetas[index].dir))
      );
    })));
  };
  var QawalebTemplateRenderer = ({ templateId, values, appearance }) => {
    const resolvedAppearance = resolveAppearance(appearance);
    switch (templateId) {
      case "points-broadcast":
        return /* @__PURE__ */ import_react3.default.createElement(PointsBroadcastTemplate, { values, appearance: resolvedAppearance });
      case "breaking-bold":
        return /* @__PURE__ */ import_react3.default.createElement(BreakingBoldTemplate, { values, appearance: resolvedAppearance });
      case "editorial-elegant":
        return /* @__PURE__ */ import_react3.default.createElement(EditorialElegantTemplate, { values, appearance: resolvedAppearance });
      case "cinematic-dark":
        return /* @__PURE__ */ import_react3.default.createElement(CinematicDarkTemplate, { values, appearance: resolvedAppearance });
      case "sports-energy":
        return /* @__PURE__ */ import_react3.default.createElement(SportsEnergyTemplate, { values, appearance: resolvedAppearance });
      case "documentary-minimal":
        return /* @__PURE__ */ import_react3.default.createElement(DocumentaryMinimalTemplate, { values, appearance: resolvedAppearance });
      case "x-animated":
        return /* @__PURE__ */ import_react3.default.createElement(XAnimatedTemplate, { values, appearance: resolvedAppearance });
      case "facebook-animated":
        return /* @__PURE__ */ import_react3.default.createElement(FacebookAnimatedTemplate, { values, appearance: resolvedAppearance });
      case "telegram-animated":
        return /* @__PURE__ */ import_react3.default.createElement(TelegramAnimatedTemplate, { values, appearance: resolvedAppearance });
      case "instagram-animated":
        return /* @__PURE__ */ import_react3.default.createElement(InstagramAnimatedTemplate, { values, appearance: resolvedAppearance });
      case "top-trends":
        return /* @__PURE__ */ import_react3.default.createElement(TopTrendsTemplate, { values, appearance: resolvedAppearance });
      default:
        return /* @__PURE__ */ import_react3.default.createElement(PointsBroadcastTemplate, { values, appearance: resolvedAppearance });
    }
  };
  var QawalebAudioTracks = AudioTracks;

  // src/remotion/qawaleb/QawalebComposition.tsx
  var AdaptiveVideo = (props) => {
    const usesRemoteSource = /^https?:\/\//i.test(props.src || "");
    if (usesRemoteSource) {
      return /* @__PURE__ */ import_react4.default.createElement(Video, { ...props });
    }
    return /* @__PURE__ */ import_react4.default.createElement(OffthreadVideo, { ...props });
  };
  var QawalebComposition = ({
    templateId,
    templateValues,
    frameUrl,
    backgroundImageUrl,
    backgroundOpacity = 10,
    backgroundBlur = 12,
    backgroundRadius = 42,
    backgroundFeather = 84,
    parallaxEnabled = true,
    templateColors,
    templateScale = 1,
    templateX = 0,
    templateY = 0,
    textFontSize = 65,
    portraitScale = 1,
    portraitX = 0,
    portraitY = 0,
    portraitMonochrome = true,
    portraitSquare = false,
    showQuoteMark = true,
    musicUrl,
    musicVolume = 0.5,
    voiceoverUrl,
    voiceoverVolume = 1
  }) => {
    const isImageFrame = frameUrl ? /\.(png|gif|jpg|jpeg|webp)$/i.test(frameUrl) : false;
    return /* @__PURE__ */ import_react4.default.createElement(AbsoluteFill, { style: { backgroundColor: "#000" } }, /* @__PURE__ */ import_react4.default.createElement(
      QawalebAudioTracks,
      {
        musicUrl,
        musicVolume,
        voiceoverUrl,
        voiceoverVolume
      }
    ), /* @__PURE__ */ import_react4.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          inset: 0,
          transform: `translate(${templateX}px, ${templateY}px) scale(${templateScale})`,
          transformOrigin: "center center"
        }
      },
      /* @__PURE__ */ import_react4.default.createElement(
        QawalebTemplateRenderer,
        {
          templateId,
          values: templateValues || {},
          appearance: {
            fontScale: Math.max(0.55, Number(textFontSize || 65) / 65),
            colors: templateColors || {},
            backgroundImageUrl,
            backgroundOpacity,
            backgroundBlur,
            backgroundRadius,
            backgroundFeather,
            parallaxEnabled,
            portraitScale: Math.max(0.6, Number(portraitScale || 1)),
            portraitX: Number(portraitX || 0),
            portraitY: Number(portraitY || 0),
            portraitMonochrome: portraitMonochrome !== false,
            portraitSquare: portraitSquare === true,
            showQuoteMark: showQuoteMark !== false
          }
        }
      )
    ), frameUrl ? /* @__PURE__ */ import_react4.default.createElement(AbsoluteFill, { style: { pointerEvents: "none" } }, isImageFrame ? /* @__PURE__ */ import_react4.default.createElement(Img, { src: frameUrl, style: { width: "100%", height: "100%", objectFit: "fill" } }) : /* @__PURE__ */ import_react4.default.createElement(AdaptiveVideo, { src: frameUrl, muted: true, style: { width: "100%", height: "100%", objectFit: "fill" } })) : null);
  };

  // desktop-v2/qawaleb/preview/player-entry.tsx
  var FPS = 25;
  var PLAYER_STYLE = {
    width: "100%",
    height: "100%",
    maxWidth: "100%",
    display: "block",
    direction: "ltr"
  };
  var PLAYER_WRAP_STYLE = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#000",
    overflow: "hidden",
    direction: "ltr",
    unicodeBidi: "isolate"
  };
  var previewRoot = null;
  var previewContainer = null;
  var currentPlayer = null;
  var updatePreviewPayload = null;
  var currentPayload = {
    inputProps: {
      templateId: "points-broadcast",
      templateValues: {},
      durationMs: 2e4,
      musicUrl: null,
      musicVolume: 0.5,
      voiceoverUrl: null,
      voiceoverVolume: 1
    },
    durationInFrames: 500
  };
  var PreviewApp = ({ payload }) => {
    const playerRef = (0, import_react5.useRef)(null);
    const [previewPayload, setPreviewPayload] = (0, import_react5.useState)(payload);
    (0, import_react5.useEffect)(() => {
      currentPlayer = playerRef.current;
      updatePreviewPayload = setPreviewPayload;
      return () => {
        if (currentPlayer === playerRef.current) {
          currentPlayer = null;
        }
        if (updatePreviewPayload === setPreviewPayload) {
          updatePreviewPayload = null;
        }
      };
    }, []);
    return /* @__PURE__ */ import_react5.default.createElement("div", { style: PLAYER_WRAP_STYLE }, /* @__PURE__ */ import_react5.default.createElement(
      Player,
      {
        ref: playerRef,
        component: QawalebComposition,
        inputProps: previewPayload.inputProps,
        durationInFrames: Math.max(25, previewPayload.durationInFrames),
        compositionWidth: 1920,
        compositionHeight: 1080,
        fps: FPS,
        style: PLAYER_STYLE,
        controls: true,
        autoPlay: false,
        loop: true,
        clickToPlay: true,
        doubleClickToFullscreen: true,
        allowFullscreen: true,
        showVolumeControls: true,
        moveToBeginningWhenEnded: true,
        initiallyShowControls: true
      }
    ));
  };
  function renderPreview() {
    if (!previewRoot || !previewContainer)
      return;
    previewRoot.render(/* @__PURE__ */ import_react5.default.createElement(PreviewApp, { payload: currentPayload }));
  }
  window.DesktopRemotionPreviewQawaleb = {
    mount(container2) {
      if (previewRoot && previewContainer === container2) {
        renderPreview();
        return;
      }
      previewContainer = container2;
      previewRoot = (0, import_client.createRoot)(container2);
      renderPreview();
    },
    update(payload) {
      currentPayload = payload;
      if (updatePreviewPayload) {
        updatePreviewPayload(payload);
        return;
      }
      renderPreview();
    },
    seekTo(frame) {
      currentPlayer?.seekTo(frame);
    },
    play() {
      currentPlayer?.play();
    },
    pause() {
      currentPlayer?.pause();
    },
    toggle() {
      currentPlayer?.toggle();
    },
    destroy() {
      currentPlayer = null;
      updatePreviewPayload = null;
      previewRoot?.unmount();
      previewRoot = null;
      previewContainer = null;
    }
  };
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
