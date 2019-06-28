"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _BreadcrumbItem = _interopRequireDefault(require("./BreadcrumbItem"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Breadcrumb extends _react.default.Component {
  render() {
    const {
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react.default.createElement("ol", _extends({}, elementProps, {
      role: "navigation",
      "aria-label": "breadcrumbs",
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

Breadcrumb.Item = _BreadcrumbItem.default;

var _default = (0, _bootstrapUtils.bsClass)('breadcrumb', Breadcrumb);

exports.default = _default;
module.exports = exports["default"];