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
  inline: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  title: _propTypes.default.string,

  /**
   * Only valid if `inline` is not set.
   */
  validationState: _propTypes.default.oneOf(['success', 'warning', 'error', null]),

  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <Checkbox inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object])
};
const defaultProps = {
  inline: false,
  disabled: false,
  title: ''
};

class Checkbox extends _react.default.Component {
  render() {
    const {
      inline,
      disabled,
      validationState,
      inputRef,
      className,
      style,
      title,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);

    const input = _react.default.createElement("input", _extends({}, elementProps, {
      ref: inputRef,
      type: "checkbox",
      disabled: disabled
    }));

    if (inline) {
      const classes = {
        [(0, _bootstrapUtils.prefix)(bsProps, 'inline')]: true,
        disabled
      }; // Use a warning here instead of in propTypes to get better-looking
      // generated documentation.

      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!validationState, '`validationState` is ignored on `<Checkbox inline>`. To display ' + 'validation state on an inline checkbox, set `validationState` on a ' + 'parent `<FormGroup>` or other element instead.') : void 0;
      return _react.default.createElement("label", {
        className: (0, _classnames.default)(className, classes),
        style: style,
        title: title
      }, input, children);
    }

    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      disabled
    };

    if (validationState) {
      classes[`has-${validationState}`] = true;
    }

    return _react.default.createElement("div", {
      className: (0, _classnames.default)(className, classes),
      style: style
    }, _react.default.createElement("label", {
      title: title
    }, input, children));
  }

}

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('checkbox', Checkbox);

exports.default = _default;