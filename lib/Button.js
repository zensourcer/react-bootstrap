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

var _StyleConfig = require("./utils/StyleConfig");

var _SafeAnchor = _interopRequireDefault(require("./SafeAnchor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  block: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  componentClass: _elementType.default,
  href: _propTypes.default.string,

  /**
   * Defines HTML button type attribute
   * @defaultValue 'button'
   */
  type: _propTypes.default.oneOf(['button', 'reset', 'submit'])
};
const defaultProps = {
  active: false,
  block: false,
  disabled: false
};

class Button extends _react.default.Component {
  renderAnchor(elementProps, className) {
    return _react.default.createElement(_SafeAnchor.default, _extends({}, elementProps, {
      className: (0, _classnames.default)(className, elementProps.disabled && 'disabled')
    }));
  }

  renderButton({
    componentClass,
    ...elementProps
  }, className) {
    const Component = componentClass || 'button';
    return _react.default.createElement(Component, _extends({}, elementProps, {
      type: elementProps.type || 'button',
      className: className
    }));
  }

  render() {
    const {
      active,
      block,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      active,
      [(0, _bootstrapUtils.prefix)(bsProps, 'block')]: block
    };
    const fullClassName = (0, _classnames.default)(className, classes);

    if (elementProps.href) {
      return this.renderAnchor(elementProps, fullClassName);
    }

    return this.renderButton(elementProps, fullClassName);
  }

}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('btn', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL, _StyleConfig.Size.XSMALL], (0, _bootstrapUtils.bsStyles)([...Object.values(_StyleConfig.State), _StyleConfig.Style.DEFAULT, _StyleConfig.Style.PRIMARY, _StyleConfig.Style.LINK], _StyleConfig.Style.DEFAULT, Button)));

exports.default = _default;
module.exports = exports["default"];