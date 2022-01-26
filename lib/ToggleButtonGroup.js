"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _invariant = _interopRequireDefault(require("invariant"));

var _uncontrollable = require("uncontrollable");

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

var _ButtonGroup = _interopRequireDefault(require("./ButtonGroup"));

var _ToggleButton = _interopRequireDefault(require("./ToggleButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * An HTML `<input>` name for each child button.
   *
   * __Required if `type` is set to `'radio'`__
   */
  name: _propTypes.default.string,

  /**
   * The value, or array of values, of the active (pressed) buttons
   *
   * @controllable onChange
   */
  value: _propTypes.default.any,

  /**
   * Callback fired when a button is pressed, depending on whether the `type`
   * is `'radio'` or `'checkbox'`, `onChange` will be called with the value or
   * array of active values
   *
   * @controllable values
   */
  onChange: _propTypes.default.func,

  /**
   * The input `type` of the rendered buttons, determines the toggle behavior
   * of the buttons
   */
  type: _propTypes.default.oneOf(['checkbox', 'radio']).isRequired
};
const defaultProps = {
  type: 'radio'
};

class ToggleButtonGroup extends _react.default.Component {
  getValues() {
    const {
      value
    } = this.props;
    return value == null ? [] : [].concat(value);
  }

  handleToggle(value) {
    const {
      type,
      onChange
    } = this.props;
    const values = this.getValues();
    const isActive = values.indexOf(value) !== -1;

    if (type === 'radio') {
      if (!isActive) {
        onChange(value);
      }

      return;
    }

    if (isActive) {
      onChange(values.filter(n => n !== value));
    } else {
      onChange([...values, value]);
    }
  }

  render() {
    const {
      children,
      type,
      name,
      ...props
    } = this.props;
    const values = this.getValues();
    !(type !== 'radio' || !!name) ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, 'A `name` is required to group the toggle buttons when the `type` ' + 'is set to "radio"') : invariant(false) : void 0;
    delete props.onChange;
    delete props.value; // the data attribute is required b/c twbs css uses it in the selector

    return _react.default.createElement(_ButtonGroup.default, _extends({}, props, {
      "data-toggle": "buttons"
    }), _ValidComponentChildren.default.map(children, child => {
      const {
        value,
        onChange
      } = child.props;

      const handler = () => this.handleToggle(value);

      return _react.default.cloneElement(child, {
        type,
        name: child.name || name,
        checked: values.indexOf(value) !== -1,
        onChange: (0, _createChainedFunction.default)(onChange, handler)
      });
    }));
  }

}

ToggleButtonGroup.propTypes = propTypes;
ToggleButtonGroup.defaultProps = defaultProps;
const UncontrolledToggleButtonGroup = (0, _uncontrollable.uncontrollable)(ToggleButtonGroup, {
  value: 'onChange'
});
UncontrolledToggleButtonGroup.Button = _ToggleButton.default;
var _default = UncontrolledToggleButtonGroup;
exports.default = _default;
module.exports = exports["default"];