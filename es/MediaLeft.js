"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Media = _interopRequireDefault(require("./Media"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * Align the media to the top, middle, or bottom of the media object.
   */
  align: _propTypes.default.oneOf(['top', 'middle', 'bottom'])
};

class MediaLeft extends _react.default.Component {
  render() {
    const {
      align,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);

    if (align) {
      // The class is e.g. `media-top`, not `media-left-top`.
      classes[(0, _bootstrapUtils.prefix)(_Media.default.defaultProps, align)] = true;
    }

    return _react.default.createElement("div", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

MediaLeft.propTypes = propTypes;

var _default = (0, _bootstrapUtils.bsClass)('media-left', MediaLeft);

exports.default = _default;