"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: _propTypes.default.string,
  srOnly: _propTypes.default.bool
};
const defaultProps = {
  srOnly: false
};
const contextTypes = {
  $bs_formGroup: _propTypes.default.object
};

class ControlLabel extends _react.default.Component {
  render() {
    const formGroup = this.context.$bs_formGroup;
    const controlId = formGroup && formGroup.controlId;
    const {
      htmlFor = controlId,
      srOnly,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(controlId == null || htmlFor === controlId, '`controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.') : void 0;
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      'sr-only': srOnly
    };
    return _react.default.createElement("label", _extends({}, elementProps, {
      htmlFor: htmlFor,
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

ControlLabel.propTypes = propTypes;
ControlLabel.defaultProps = defaultProps;
ControlLabel.contextTypes = contextTypes;

var _default = (0, _bootstrapUtils.bsClass)('control-label', ControlLabel);

exports.default = _default;
module.exports = exports["default"];