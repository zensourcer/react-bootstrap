"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

var _CloseButton = _interopRequireDefault(require("./CloseButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  onDismiss: _propTypes.default.func,
  closeLabel: _propTypes.default.string
};
const defaultProps = {
  closeLabel: 'Close alert'
};

class Alert extends _react.default.Component {
  render() {
    const {
      onDismiss,
      closeLabel,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const dismissable = !!onDismiss;
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      [(0, _bootstrapUtils.prefix)(bsProps, 'dismissable')]: dismissable
    };
    return _react.default.createElement("div", _extends({}, elementProps, {
      role: "alert",
      className: (0, _classnames.default)(className, classes)
    }), dismissable && _react.default.createElement(_CloseButton.default, {
      onClick: onDismiss,
      label: closeLabel
    }), children);
  }

}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsStyles)(Object.values(_StyleConfig.State), _StyleConfig.State.INFO, (0, _bootstrapUtils.bsClass)('alert', Alert));

exports.default = _default;
module.exports = exports["default"];