"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const contextTypes = {
  $bs_panel: _propTypes.default.shape({
    bsClass: _propTypes.default.string
  })
};

class PanelFooter extends _react.default.Component {
  render() {
    let {
      children,
      className
    } = this.props;
    let {
      bsClass: _bsClass
    } = this.context.$bs_panel || {};
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(this.props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;
    return _react.default.createElement("div", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, (0, _bootstrapUtils.prefix)(bsProps, 'footer'))
    }), children);
  }

}

PanelFooter.contextTypes = contextTypes;

var _default = (0, _bootstrapUtils.bsClass)('panel', PanelFooter);

exports.default = _default;