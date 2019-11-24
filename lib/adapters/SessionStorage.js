var stringify = function (obj) { return JSON.stringify(obj, null, 2); };
var SessionStorage = /** @class */ (function () {
    function SessionStorage(source, options) {
        var _a, _b, _c, _d, _e, _f;
        this.source = source;
        this.source = source;
        this.defaultValue = (_b = (_a = options) === null || _a === void 0 ? void 0 : _a.defaultValue, (_b !== null && _b !== void 0 ? _b : {}));
        this.serialize = (_d = (_c = options) === null || _c === void 0 ? void 0 : _c.serialize, (_d !== null && _d !== void 0 ? _d : stringify));
        this.deserialize = (_f = (_e = options) === null || _e === void 0 ? void 0 : _e.deserialize, (_f !== null && _f !== void 0 ? _f : JSON.parse));
    }
    SessionStorage.prototype.read = function () {
        var data = sessionStorage.getItem(this.source);
        if (!data) {
            sessionStorage.setItem(this.source, this.serialize(this.defaultValue));
            return this.defaultValue;
        }
        return this.deserialize(data);
    };
    SessionStorage.prototype.write = function (data) {
        sessionStorage.setItem(this.source, this.serialize(data));
    };
    return SessionStorage;
}());
export default SessionStorage;
