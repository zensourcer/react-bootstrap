"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  href: _propTypes.default.string,
  onClick: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  role: _propTypes.default.string,
  tabIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * this is sort of silly but needed for Button
   */
  componentClass: _elementType.default
};
const defaultProps = {
  componentClass: 'a'
};

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}
/**
 * There are situations due to browser quirks or Bootstrap CSS where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, MenuItems, etc.
 */


class SafeAnchor extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleClick(event) {
    const {
      disabled,
      href,
      onClick
    } = this.props;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  }

  handleKeyDown(event) {
    if (event.key === ' ') {
      event.preventDefault();
      this.handleClick(event);
    }
  }

  render() {
    const {
      componentClass: Component,
      disabled,
      onKeyDown,
      ...props
    } = this.props;

    if (isTrivialHref(props.href)) {
      props.role = props.role || 'button'; // we want to make sure there is a href attribute on the node
      // otherwise, the cursor incorrectly styled (except with role='button')

      props.href = props.href || '#';
    }

    if (disabled) {
      props.tabIndex = -1;
      props.style = {
        pointerEvents: 'none',
        ...props.style
      };
    }

    return _react.default.createElement(Component, _extends({}, props, {
      onClick: this.handleClick,
      onKeyDown: (0, _createChainedFunction.default)(this.handleKeyDown, onKeyDown)
    }));
  }

}

SafeAnchor.propTypes = propTypes;
SafeAnchor.defaultProps = defaultProps;
var _default = SafeAnchor;
exports.default = _default;
module.exports = exports["default"];