"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const contextTypes = {
  $bs_navbar: _propTypes.default.shape({
    bsClass: _propTypes.default.string
  })
};

class NavbarBrand extends _react.default.Component {
  render() {
    const {
      className,
      children,
      ...props
    } = this.props;
    const navbarProps = this.context.$bs_navbar || {
      bsClass: 'navbar'
    };
    const bsClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'brand');

    if (_react.default.isValidElement(children)) {
      return _react.default.cloneElement(children, {
        className: (0, _classnames.default)(children.props.className, className, bsClassName)
      });
    }

    return _react.default.createElement("span", _extends({}, props, {
      className: (0, _classnames.default)(className, bsClassName)
    }), children);
  }

}

NavbarBrand.contextTypes = contextTypes;
var _default = NavbarBrand;
exports.default = _default;
module.exports = exports["default"];