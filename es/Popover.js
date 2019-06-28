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
   * @type {string}
   * @required
   */
  id: (0, _isRequiredForA11y.default)(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),

  /**
   * Sets the direction the Popover is positioned towards.
   */
  placement: _propTypes.default.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The "top" position value for the Popover.
   */
  positionTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "left" position value for the Popover.
   */
  positionLeft: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "top" position value for the Popover arrow.
   */
  arrowOffsetTop: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * The "left" position value for the Popover arrow.
   */
  arrowOffsetLeft: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Title content
   */
  title: _propTypes.default.node
};
const defaultProps = {
  placement: 'right'
};

class Popover extends _react.default.Component {
  render() {
    const {
      placement,
      positionTop,
      positionLeft,
      arrowOffsetTop,
      arrowOffsetLeft,
      title,
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
      display: 'block',
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
      className: "arrow",
      style: arrowStyle
    }), title && _react.default.createElement("h3", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'title')
    }, title), _react.default.createElement("div", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'content')
    }, children));
  }

}

Popover.propTypes = propTypes;
Popover.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('popover', Popover);

exports.default = _default;