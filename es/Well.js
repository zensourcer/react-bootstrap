"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Well extends _react.default.Component {
  render() {
    const {
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react.default.createElement("div", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

var _default = (0, _bootstrapUtils.bsClass)('well', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], Well));

exports.default = _default;