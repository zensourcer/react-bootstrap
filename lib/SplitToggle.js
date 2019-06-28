"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _DropdownToggle = _interopRequireDefault(require("./DropdownToggle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class SplitToggle extends _react.default.Component {
  render() {
    return _react.default.createElement(_DropdownToggle.default, _extends({}, this.props, {
      useAnchor: false,
      noCaret: false
    }));
  }

}

SplitToggle.defaultProps = _DropdownToggle.default.defaultProps;
var _default = SplitToggle;
exports.default = _default;
module.exports = exports["default"];