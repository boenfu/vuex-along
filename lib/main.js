function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import _ from "lodash";
import { DBService } from "./db";

var VuexAlong =
/*#__PURE__*/
function () {
  function VuexAlong(_ref) {
    var _this = this;

    var {
      local,
      session,
      name = "vuex-along",
      justSession = false
    } = _ref;

    _classCallCheck(this, VuexAlong);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "localDBService", void 0);

    _defineProperty(this, "sessionDBService", void 0);

    _defineProperty(this, "local", void 0);

    _defineProperty(this, "session", void 0);

    _defineProperty(this, "justSession", void 0);

    this.name = name;
    this.local = local;
    this.session = session;
    this.justSession = justSession;
    this.localDBService = new DBService(name);
    this.sessionDBService = new DBService(name, true);
    window ? window.clearVuexAlong = function (local, session) {
      _this.clear(local, session);
    } : undefined;
  }

  _createClass(VuexAlong, [{
    key: "saveData",
    value: function saveData(state) {
      if (!this.justSession) {
        var local = this.local;

        var localState = _.cloneDeep(state);

        if (local) {
          var {
            list,
            isFilter
          } = local;

          if (list.length) {
            localState = isFilter ? _.omit(localState, list) : _.pick(localState, list);
          }
        }

        this.localDBService.set(this.name, localState);
      }

      var session = this.session;

      if (session) {
        var {
          list: _list,
          isFilter: _isFilter
        } = session;

        var sessionState = _.cloneDeep(state);

        if (_list.length) {
          sessionState = _isFilter ? _.omit(sessionState, _list) : _.pick(sessionState, _list);
        }

        this.sessionDBService.set(this.name, sessionState);
      }
    }
  }, {
    key: "restoreData",
    value: function restoreData(store) {
      var name = this.name;
      store.replaceState(_.defaultsDeep(this.sessionDBService.get(name), this.localDBService.get(name), store.state));
    }
  }, {
    key: "clear",
    value: function clear() {
      var local = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var session = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var name = this.name;

      if (local) {
        this.localDBService.unset(name);
      }

      if (session) {
        this.sessionDBService.unset(name);
      }
    }
  }]);

  return VuexAlong;
}();

export default (function (options) {
  var vuexAlong = new VuexAlong(options);
  return function (store) {
    vuexAlong.restoreData(store);
    store.subscribe(function (_mutation, state) {
      return vuexAlong.saveData(state);
    });
  };
});