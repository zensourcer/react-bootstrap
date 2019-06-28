"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: _propTypes.default.string,
  validationState: _propTypes.default.oneOf(['success', 'warning', 'error', null])
};
const childContextTypes = {
  $bs_formGroup: _propTypes.default.object.isRequired
};

class FormGroup extends _react.default.Component {
  getChildContext() {
    const {
      controlId,
      validationState
    } = this.props;
    return {
      $bs_formGroup: {
        controlId,
        validationState
      }
    };
  }

  hasFeedback(children) {
    return _ValidComponentChildren.default.some(children, child => child.props.bsRole === 'feedback' || child.props.children && this.hasFeedback(child.props.children));
  }

  render() {
    const {
      validationState,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['controlId']);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      'has-feedback': this.hasFeedback(children)
    };

    if (validationState) {
      classes[`has-${validationState}`] = true;
    }

    return _react.default.createElement("div", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), children);
  }

}

FormGroup.propTypes = propTypes;
FormGroup.childContextTypes = childContextTypes;

var _default = (0, _bootstrapUtils.bsClass)('form-group', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], FormGroup));

exports.default = _default;