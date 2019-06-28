"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Glyphicon = _interopRequireDefault(require("./Glyphicon"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const defaultProps = {
  bsRole: 'feedback'
};
const contextTypes = {
  $bs_formGroup: _propTypes.default.object
};

class FormControlFeedback extends _react.default.Component {
  getGlyph(validationState) {
    switch (validationState) {
      case 'success':
        return 'ok';

      case 'warning':
        return 'warning-sign';

      case 'error':
        return 'remove';

      default:
        return null;
    }
  }

  renderDefaultFeedback(formGroup, className, classes, elementProps) {
    const glyph = this.getGlyph(formGroup && formGroup.validationState);

    if (!glyph) {
      return null;
    }

    return _react.default.createElement(_Glyphicon.default, _extends({}, elementProps, {
      glyph: glyph,
      className: (0, _classnames.default)(className, classes)
    }));
  }

  render() {
    const {
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);

    if (!children) {
      return this.renderDefaultFeedback(this.context.$bs_formGroup, className, classes, elementProps);
    }

    const child = _react.default.Children.only(children);

    return _react.default.cloneElement(child, { ...elementProps,
      className: (0, _classnames.default)(child.props.className, className, classes)
    });
  }

}

FormControlFeedback.defaultProps = defaultProps;
FormControlFeedback.contextTypes = contextTypes;

var _default = (0, _bootstrapUtils.bsClass)('form-control-feedback', FormControlFeedback);

exports.default = _default;
module.exports = exports["default"];