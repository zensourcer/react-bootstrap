"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Dropdown = _interopRequireDefault(require("./Dropdown"));

var _splitComponentProps = _interopRequireDefault(require("./utils/splitComponentProps"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = { ..._Dropdown.default.propTypes,
  // Toggle props.
  bsStyle: _propTypes.default.string,
  bsSize: _propTypes.default.string,
  title: _propTypes.default.node.isRequired,
  noCaret: _propTypes.default.bool,
  // Override generated docs from <Dropdown>.

  /**
   * @private
   */
  children: _propTypes.default.node
};

class DropdownButton extends _react.default.Component {
  render() {
    const {
      bsSize,
      bsStyle,
      title,
      children,
      ...props
    } = this.props;
    const [dropdownProps, toggleProps] = (0, _splitComponentProps.default)(props, _Dropdown.default.ControlledComponent);
    return _react.default.createElement(_Dropdown.default, _extends({}, dropdownProps, {
      bsSize: bsSize,
      bsStyle: bsStyle
    }), _react.default.createElement(_Dropdown.default.Toggle, _extends({}, toggleProps, {
      bsSize: bsSize,
      bsStyle: bsStyle
    }), title), _react.default.createElement(_Dropdown.default.Menu, null, children));
  }

}

DropdownButton.propTypes = propTypes;
var _default = DropdownButton;
exports.default = _default;
module.exports = exports["default"];