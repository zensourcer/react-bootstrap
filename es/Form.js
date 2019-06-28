"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  horizontal: _propTypes.default.bool,
  inline: _propTypes.default.bool,
  componentClass: _elementType.default
};
const defaultProps = {
  horizontal: false,
  inline: false,
  componentClass: 'form'
};

class Form extends _react.default.Component {
  render() {
    const {
      horizontal,
      inline,
      componentClass: Component,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = [];

    if (horizontal) {
      classes.push((0, _bootstrapUtils.prefix)(bsProps, 'horizontal'));
    }

    if (inline) {
      classes.push((0, _bootstrapUtils.prefix)(bsProps, 'inline'));
    }

    return _react.default.createElement(Component, _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('form', Form);

exports.default = _default;