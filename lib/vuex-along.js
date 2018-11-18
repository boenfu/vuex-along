'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var unll = void 0,
    ll = void 0,
    sl = void 0,
    unsl = void 0;
var onlySession = false;
var LOCALSTORAGE = 0,
    SESSIONSTORAGE = 1;
var KEY = 'vuex-along';
var ls = window.localStorage;
var ss = window.sessionStorage;

var vuexAlong = function vuexAlong(store) {
    initAlong(store);
    store.subscribe(function (mutation, state) {
        saveLocal(state);
        saveSession(state);
    });
};
exports.default = vuexAlong;


var saveLocal = function saveLocal(state) {
    if (onlySession) return;
    setItem(KEY, filter(ll, unll, state), LOCALSTORAGE);
};

var saveSession = function saveSession(state) {
    if (!sl && !unsl && !onlySession) return;
    setItem(KEY, filter(sl, unsl, state), SESSIONSTORAGE);
};

var filter = function filter(s1, s2, state) {
    var obj = {};
    if (s1) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = s1[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var i = _step.value;

                obj[i] = state[i];
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    } else if (s2) {
        for (var _i in state) {
            if (s2.indexOf(_i) > -1) continue;
            obj[_i] = state[_i];
        }
    } else {
        obj = state;
    }
    return obj;
};

/**
 * Init this plugin when store init
 */
var initAlong = function initAlong(store) {
    var obj = {};
    if (!onlySession && getItem(KEY, LOCALSTORAGE)) Object.assign(obj, getItem(KEY, LOCALSTORAGE));
    if (getItem(KEY, SESSIONSTORAGE)) Object.assign(obj, getItem(KEY, SESSIONSTORAGE));
    store.replaceState(Object.assign(store.state, obj));
};

var setWatch = function setWatch(arry) {
    var isWatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var type = arguments[2];

    if (!Array.isArray(arry) || typeof isWatch != 'boolean') {
        return console.error('[vuex-along] params of watch has error');
    }
    if (type == LOCALSTORAGE) {
        isWatch ? (ll = arry, unll = null) : (unll = arry, ll = null);
    } else {
        isWatch ? (sl = arry, unsl = null) : (unsl = arry, sl = null);
    }
};

var watch = function watch(arry, isWatch) {
    setWatch(arry, isWatch, LOCALSTORAGE);
};

var watchSession = function watchSession(arry, isWatch) {
    setWatch(arry, isWatch, SESSIONSTORAGE);
};

var setOnlySession = function setOnlySession(bool) {
    if (typeof bool != 'boolean') {
        return console.error('[vuex-along] params of onlySession has error');
    }
    onlySession = bool;
};
var coded = function coded(str) {
    return window.btoa(window.encodeURIComponent(str));
};
var encoded = function encoded(str) {
    return window.decodeURIComponent(window.atob(str));
};

var getItem = function getItem(key, type) {
    var storage = type == LOCALSTORAGE ? ls : ss;
    try {
        return JSON.parse(encoded(storage.getItem(key)));
    } catch (err) {
        return null;
    }
};

var setItem = function setItem(key, val, type) {
    var storage = type == LOCALSTORAGE ? ls : ss;
    storage.setItem(key, coded(JSON.stringify(val)));
};

var removeItem = function removeItem() {
    var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : KEY;
    ss.removeItem(key);
    ls.removeItem(key);
};

/**
 * 2018年8月8日
 * @param key
 */
var setKey = function setKey(key) {
  if (typeof key == 'string') {
    KEY = key;
  } else {
    console.error('[vuex-along] key is not string');
  }
};

vuexAlong.setKey = setKey;
vuexAlong.watch = watch;
vuexAlong.watchSession = watchSession;
vuexAlong.onlySession = setOnlySession;
vuexAlong.clean = removeItem;
window.cleanVuexAlong = removeItem;