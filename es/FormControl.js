"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _warning = _interopRequireDefault(require("warning"));

var _FormControlFeedback = _interopRequireDefault(require("./FormControlFeedback"));

var _FormControlStatic = _interopRequireDefault(require("./FormControlStatic"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  componentClass: _elementType.default,

  /**
   * Only relevant if `componentClass` is `'input'`.
   */
  type: _propTypes.default.string,

  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: _propTypes.default.string,

  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <FormControl inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: _propTypes.default.func
};
const defaultProps = {
  componentClass: 'input'
};
const contextTypes = {
  $bs_formGroup: _propTypes.default.object
};

class FormControl extends _react.default.Component {
  render() {
    const formGroup = this.context.$bs_formGroup;
    const controlId = formGroup && formGroup.controlId;
    const {
      componentClass: Component,
      type,
      id = controlId,
      inputRef,
      className,
      bsSize,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(controlId == null || id === controlId, '`controlId` is ignored on `<FormControl>` when `id` is specified.') : void 0; // input[type="file"] should not have .form-control.

    let classes;

    if (type !== 'file') {
      classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    } // If user provides a size, make sure to append it to classes as input-
    // e.g. if bsSize is small, it will append input-sm


    if (bsSize) {
      const size = _StyleConfig.SIZE_MAP[bsSize] || bsSize;
      classes[(0, _bootstrapUtils.prefix)({
        bsClass: 'input'
      }, size)] = true;
    }

    return _react.default.createElement(Component, _extends({}, elementProps, {
      type: type,
      id: id,
      ref: inputRef,
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

FormControl.propTypes = propTypes;
FormControl.defaultProps = defaultProps;
FormControl.contextTypes = contextTypes;
FormControl.Feedback = _FormControlFeedback.default;
FormControl.Static = _FormControlStatic.default;

var _default = (0, _bootstrapUtils.bsClass)('form-control', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.SMALL, _StyleConfig.Size.LARGE], FormControl));

exports.default = _default;