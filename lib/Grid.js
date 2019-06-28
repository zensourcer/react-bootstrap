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
  /**
   * Turn any fixed-width grid layout into a full-width layout by this property.
   *
   * Adds `container-fluid` class.
   */
  fluid: _propTypes.default.bool,

  /**
   * You can use a custom element for this component
   */
  componentClass: _elementType.default
};
const defaultProps = {
  componentClass: 'div',
  fluid: false
};

class Grid extends _react.default.Component {
  render() {
    const {
      fluid,
      componentClass: Component,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = (0, _bootstrapUtils.prefix)(bsProps, fluid && 'fluid');
    return _react.default.createElement(Component, _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('container', Grid);

exports.default = _default;
module.exports = exports["default"];