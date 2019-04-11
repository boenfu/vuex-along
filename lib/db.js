function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import low from "lowdb";
import LocalStorage from "lowdb/adapters/LocalStorage";
import SessionStorage from "./adapters/SessionStorage";
export var DBService =
/*#__PURE__*/
function () {
  function DBService(name) {
    var session = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, DBService);

    _defineProperty(this, "db", void 0);

    this.db = low(session ? new SessionStorage(name) : new LocalStorage(name));
  }

  _createClass(DBService, [{
    key: "get",
    value: function get(key) {
      return this.db.get(key).value();
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this.db.set(key, value).write();
    }
  }, {
    key: "unset",
    value: function unset(key) {
      this.db.unset(key).write();
    }
  }]);

  return DBService;
}();