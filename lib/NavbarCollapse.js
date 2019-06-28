"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Collapse = _interopRequireDefault(require("./Collapse"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const contextTypes = {
  $bs_navbar: _propTypes.default.shape({
    bsClass: _propTypes.default.string,
    expanded: _propTypes.default.bool
  })
};

class NavbarCollapse extends _react.default.Component {
  render() {
    const {
      children,
      ...props
    } = this.props;
    const navbarProps = this.context.$bs_navbar || {
      bsClass: 'navbar'
    };
    const bsClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'collapse');
    return _react.default.createElement(_Collapse.default, _extends({
      in: navbarProps.expanded
    }, props), _react.default.createElement("div", {
      className: bsClassName
    }, children));
  }

}

NavbarCollapse.contextTypes = contextTypes;
var _default = NavbarCollapse;
exports.default = _default;
module.exports = exports["default"];