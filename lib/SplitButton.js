"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Button = _interopRequireDefault(require("./Button"));

var _Dropdown = _interopRequireDefault(require("./Dropdown"));

var _SplitToggle = _interopRequireDefault(require("./SplitToggle"));

var _splitComponentProps = _interopRequireDefault(require("./utils/splitComponentProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = { ..._Dropdown.default.propTypes,
  // Toggle props.
  bsStyle: _propTypes.default.string,
  bsSize: _propTypes.default.string,
  href: _propTypes.default.string,
  onClick: _propTypes.default.func,

  /**
   * The content of the split button.
   */
  title: _propTypes.default.node.isRequired,

  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: _propTypes.default.string,
  // Override generated docs from <Dropdown>.

  /**
   * @private
   */
  children: _propTypes.default.node
};

class SplitButton extends _react.default.Component {
  render() {
    const {
      bsSize,
      bsStyle,
      title,
      toggleLabel,
      children,
      ...props
    } = this.props;
    const [dropdownProps, buttonProps] = (0, _splitComponentProps.default)(props, _Dropdown.default.ControlledComponent);
    return _react.default.createElement(_Dropdown.default, _extends({}, dropdownProps, {
      bsSize: bsSize,
      bsStyle: bsStyle
    }), _react.default.createElement(_Button.default, _extends({}, buttonProps, {
      disabled: props.disabled,
      bsSize: bsSize,
      bsStyle: bsStyle
    }), title), _react.default.createElement(_SplitToggle.default, {
      "aria-label": toggleLabel || title,
      bsSize: bsSize,
      bsStyle: bsStyle
    }), _react.default.createElement(_Dropdown.default.Menu, null, children));
  }

}

SplitButton.propTypes = propTypes;
SplitButton.Toggle = _SplitToggle.default;
var _default = SplitButton;
exports.default = _default;
module.exports = exports["default"];