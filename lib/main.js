import { defaultsDeep, omit, pick, cloneDeep } from "lodash-es";
import { DBService } from "./db";
import SessionStorage from "./adapters/SessionStorage";
var DEFAULT_NAME = "vuex-along";
var ROOT_KEY = "root";
var VuexAlong = /** @class */ (function () {
    function VuexAlong(_a) {
        var _this = this;
        var local = _a.local, session = _a.session, _b = _a.name, name = _b === void 0 ? DEFAULT_NAME : _b, _c = _a.justSession, justSession = _c === void 0 ? false : _c, _d = _a.adapterOptions, _e = _d === void 0 ? {
            session: SessionStorage,
        } : _d, localAdapter = _e.local, sessionAdapter = _e.session;
        this.local = local;
        this.session = session;
        this.justSession = justSession;
        if (!justSession) {
            this.localDBService = new DBService(name, localAdapter);
        }
        if (session) {
            this.sessionDBService = new DBService(name, sessionAdapter);
        }
        if (window) {
            window.clearVuexAlong = function (local, session) {
                _this.clear(local, session);
            };
        }
    }
    Object.defineProperty(VuexAlong.prototype, "ready", {
        get: function () {
            var _a, _b;
            return Promise.all([
                (_a = this.localDBService) === null || _a === void 0 ? void 0 : _a.ready,
                (_b = this.sessionDBService) === null || _b === void 0 ? void 0 : _b.ready,
            ]);
        },
        enumerable: true,
        configurable: true
    });
    VuexAlong.prototype.saveLocalData = function (state) {
        var _a;
        if (this.justSession) {
            return;
        }
        this._dataHandler(state, (_a = this.local, (_a !== null && _a !== void 0 ? _a : { list: [] })), this.localDBService);
    };
    VuexAlong.prototype.saveSessionData = function (state) {
        var session = this.session;
        if (!session) {
            return;
        }
        this._dataHandler(state, session, this.sessionDBService);
    };
    VuexAlong.prototype._dataHandler = function (state, options, db) {
        var _a;
        if (!db) {
            return;
        }
        var duplicateState = cloneDeep(state);
        var key = ROOT_KEY;
        var list = options.list, isFilter = options.isFilter;
        if ((_a = list) === null || _a === void 0 ? void 0 : _a.length) {
            duplicateState = isFilter
                ? omit(duplicateState, list)
                : pick(duplicateState, list);
        }
        db.set(key, duplicateState).catch(logger);
    };
    VuexAlong.prototype.saveData = function (state) {
        this.saveLocalData(state);
        this.saveSessionData(state);
    };
    VuexAlong.prototype.restoreData = function (store) {
        var _a, _b;
        var key = ROOT_KEY;
        store.replaceState(defaultsDeep((_a = this.sessionDBService) === null || _a === void 0 ? void 0 : _a.get(key), (_b = this.localDBService) === null || _b === void 0 ? void 0 : _b.get(key), store.state));
    };
    VuexAlong.prototype.clear = function (local, session) {
        if (local === void 0) { local = true; }
        if (session === void 0) { session = false; }
        var _a, _b;
        local && ((_a = this.localDBService) === null || _a === void 0 ? void 0 : _a.unset(ROOT_KEY).catch(logger));
        session && ((_b = this.sessionDBService) === null || _b === void 0 ? void 0 : _b.unset(ROOT_KEY).catch(logger));
    };
    return VuexAlong;
}());
export default function (options) {
    if (options === void 0) { options = {}; }
    var vuexAlong = new VuexAlong(options);
    return function (store) {
        vuexAlong.ready.then(function () {
            vuexAlong.restoreData(store);
            store.subscribe(function (_mutation, state) { return vuexAlong.saveData(state); });
        });
    };
}
// utils
function logger(reason) {
    console.error(reason);
}
