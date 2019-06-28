"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SafeAnchor = _interopRequireDefault(require("./SafeAnchor"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * src property that is passed down to the image inside this component
   */
  src: _propTypes.default.string,

  /**
   * alt property that is passed down to the image inside this component
   */
  alt: _propTypes.default.string,

  /**
   * href property that is passed down to the image inside this component
   */
  href: _propTypes.default.string,

  /**
   * onError callback that is passed down to the image inside this component
   */
  onError: _propTypes.default.func,

  /**
   * onLoad callback that is passed down to the image inside this component
   */
  onLoad: _propTypes.default.func
};

class Thumbnail extends _react.default.Component {
  render() {
    const {
      src,
      alt,
      onError,
      onLoad,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const Component = elementProps.href ? _SafeAnchor.default : 'div';
    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react.default.createElement(Component, _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), _react.default.createElement("img", {
      src,
      alt,
      onError,
      onLoad
    }), children && _react.default.createElement("div", {
      className: "caption"
    }, children));
  }

}

Thumbnail.propTypes = propTypes;

var _default = (0, _bootstrapUtils.bsClass)('thumbnail', Thumbnail);

exports.default = _default;