"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * Sets image as responsive image
   */
  responsive: _propTypes.default.bool,

  /**
   * Sets image shape as rounded
   */
  rounded: _propTypes.default.bool,

  /**
   * Sets image shape as circle
   */
  circle: _propTypes.default.bool,

  /**
   * Sets image shape as thumbnail
   */
  thumbnail: _propTypes.default.bool
};
const defaultProps = {
  responsive: false,
  rounded: false,
  circle: false,
  thumbnail: false
};

class Image extends _react.default.Component {
  render() {
    const {
      responsive,
      rounded,
      circle,
      thumbnail,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = {
      [(0, _bootstrapUtils.prefix)(bsProps, 'responsive')]: responsive,
      [(0, _bootstrapUtils.prefix)(bsProps, 'rounded')]: rounded,
      [(0, _bootstrapUtils.prefix)(bsProps, 'circle')]: circle,
      [(0, _bootstrapUtils.prefix)(bsProps, 'thumbnail')]: thumbnail
    };
    return _react.default.createElement("img", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('img', Image);

exports.default = _default;