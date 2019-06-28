"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _PanelGroup = _interopRequireDefault(require("./PanelGroup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Accordion extends _react.default.Component {
  render() {
    return _react.default.createElement(_PanelGroup.default, _extends({}, this.props, {
      accordion: true
    }), this.props.children);
  }

}

var _default = Accordion;
exports.default = _default;
module.exports = exports["default"];