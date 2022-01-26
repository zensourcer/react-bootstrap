"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._resetWarned = _resetWarned;
exports.default = void 0;

var _warning = _interopRequireDefault(require("warning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let warned = {};

function deprecationWarning(oldname, newname, link) {
  let message;

  if (typeof oldname === 'object') {
    message = oldname.message;
  } else {
    message = `${oldname} is deprecated. Use ${newname} instead.`;

    if (link) {
      message += `\nYou can read more about it at ${link}`;
    }
  }

  if (warned[message]) {
    return;
  }

  process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, message) : void 0;
  warned[message] = true;
}

deprecationWarning.wrapper = (Component, ...args) => class DeprecatedComponent extends Component {
  UNSAFE_componentWillMount(...methodArgs) {
    deprecationWarning(...args);

    if (super.UNSAFE_componentWillMount) {
      super.UNSAFE_componentWillMount(...methodArgs);
    }
  }

};

var _default = deprecationWarning;
exports.default = _default;

function _resetWarned() {
  warned = {};
}