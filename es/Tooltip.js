"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isRequiredForA11y = _interopRequireDefault(require("prop-types-extra/lib/isRequiredForA11y"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string|number}
   * @required
   */
  id: (0, _isRequiredForA11y.default)(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),

  /**
   * Sets the direction the Tooltip is positioned towards.
   */
  placement: _propTypes.default.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Tooltip.
   */
  positionTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "left" position value for the Tooltip.
   */
  positionLeft: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "top" position value for the Tooltip arrow.
   */
  arrowOffsetTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "left" position value for the Tooltip arrow.
   */
  arrowOffsetLeft: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
const defaultProps = {
  placement: 'right'
};

class Tooltip extends _react.default.Component {
  render() {
    const {
      placement,
      positionTop,
      positionLeft,
      arrowOffsetTop,
      arrowOffsetLeft,
      className,
      style,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      [placement]: true
    };
    const outerStyle = {
      top: positionTop,
      left: positionLeft,
      ...style
    };
    const arrowStyle = {
      top: arrowOffsetTop,
      left: arrowOffsetLeft
    };
    return _react.default.createElement("div", _extends({}, elementProps, {
      role: "tooltip",
      className: (0, _classnames.default)(className, classes),
      style: outerStyle
    }), _react.default.createElement("div", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'arrow'),
      style: arrowStyle
    }), _react.default.createElement("div", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'inner')
    }, children));
  }

}

Tooltip.propTypes = propTypes;
Tooltip.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('tooltip', Tooltip);

exports.default = _default;