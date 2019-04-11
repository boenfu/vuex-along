function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global sessionStorage */
var stringify = function (obj) {
  return JSON.stringify(obj, null, 2);
};

var SessionStorage =
/*#__PURE__*/
function () {
  function SessionStorage(source) {
    var {
      defaultValue = {},
      serialize = stringify,
      deserialize = JSON.parse
    } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SessionStorage);

    _defineProperty(this, "source", void 0);

    _defineProperty(this, "defaultValue", void 0);

    _defineProperty(this, "serialize", void 0);

    _defineProperty(this, "deserialize", void 0);

    this.source = source;
    this.defaultValue = defaultValue;
    this.serialize = serialize;
    this.deserialize = deserialize;
  }

  _createClass(SessionStorage, [{
    key: "read",
    value: function read() {
      var data = sessionStorage.getItem(this.source);

      if (data) {
        return this.deserialize(data);
      } else {
        sessionStorage.setItem(this.source, this.serialize(this.defaultValue));
        return this.defaultValue;
      }
    }
  }, {
    key: "write",
    value: function write(data) {
      sessionStorage.setItem(this.source, this.serialize(data));
    }
  }]);

  return SessionStorage;
}();

export { SessionStorage as default };