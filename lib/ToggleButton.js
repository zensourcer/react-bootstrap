"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("./Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * The `<input>` `type`
   * @type {[type]}
   */
  type: _propTypes.default.oneOf(['checkbox', 'radio']),

  /**
   * The HTML input name, used to group like checkboxes or radio buttons together
   * semantically
   */
  name: _propTypes.default.string,

  /**
   * The checked state of the input, managed by `<ToggleButtonGroup>`` automatically
   */
  checked: _propTypes.default.bool,

  /**
   * The disabled state of both the label and input
   */
  disabled: _propTypes.default.bool,

  /**
   * [onChange description]
   */
  onChange: _propTypes.default.func,

  /**
   * The value of the input, and unique identifier in the ToggleButtonGroup
   */
  value: _propTypes.default.any.isRequired
};

class ToggleButton extends _react.default.Component {
  render() {
    const {
      children,
      name,
      checked,
      type,
      onChange,
      value,
      ...props
    } = this.props;
    const disabled = props.disabled;
    return _react.default.createElement(_Button.default, _extends({}, props, {
      active: !!checked,
      componentClass: "label"
    }), _react.default.createElement("input", {
      name: name,
      type: type,
      autoComplete: "off",
      value: value,
      checked: !!checked,
      disabled: !!disabled,
      onChange: onChange
    }), children);
  }

}

ToggleButton.propTypes = propTypes;
var _default = ToggleButton;
exports.default = _default;
module.exports = exports["default"];