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
   * An icon name without "glyphicon-" prefix. See e.g. http://getbootstrap.com/components/#glyphicons
   */
  glyph: _propTypes.default.string.isRequired
};

class Glyphicon extends _react.default.Component {
  render() {
    const {
      glyph,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      [(0, _bootstrapUtils.prefix)(bsProps, glyph)]: true
    };
    return _react.default.createElement("span", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

Glyphicon.propTypes = propTypes;

var _default = (0, _bootstrapUtils.bsClass)('glyphicon', Glyphicon);

exports.default = _default;