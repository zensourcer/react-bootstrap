"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Dropdown = _interopRequireDefault(require("./Dropdown"));

var _splitComponentProps = _interopRequireDefault(require("./utils/splitComponentProps"));

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = { ..._Dropdown.default.propTypes,
  // Toggle props.
  title: _propTypes.default.node.isRequired,
  noCaret: _propTypes.default.bool,
  active: _propTypes.default.bool,
  activeKey: _propTypes.default.any,
  activeHref: _propTypes.default.string,
  // Override generated docs from <Dropdown>.

  /**
   * @private
   */
  children: _propTypes.default.node
};

class NavDropdown extends _react.default.Component {
  isActive({
    props
  }, activeKey, activeHref) {
    if (props.active || activeKey != null && props.eventKey === activeKey || activeHref && props.href === activeHref) {
      return true;
    }

    if (_ValidComponentChildren.default.some(props.children, child => this.isActive(child, activeKey, activeHref))) {
      return true;
    }

    return props.active;
  }

  render() {
    const {
      title,
      activeKey,
      activeHref,
      className,
      style,
      children,
      ...props
    } = this.props;
    const active = this.isActive(this, activeKey, activeHref);
    delete props.active; // Accessed via this.isActive().

    delete props.eventKey; // Accessed via this.isActive().

    const [dropdownProps, toggleProps] = (0, _splitComponentProps.default)(props, _Dropdown.default.ControlledComponent); // Unlike for the other dropdowns, styling needs to go to the `<Dropdown>`
    // rather than the `<Dropdown.Toggle>`.

    return _react.default.createElement(_Dropdown.default, _extends({}, dropdownProps, {
      componentClass: "li",
      className: (0, _classnames.default)(className, {
        active
      }),
      style: style
    }), _react.default.createElement(_Dropdown.default.Toggle, _extends({}, toggleProps, {
      useAnchor: true
    }), title), _react.default.createElement(_Dropdown.default.Menu, null, _ValidComponentChildren.default.map(children, child => _react.default.cloneElement(child, {
      active: this.isActive(child, activeKey, activeHref)
    }))));
  }

}

NavDropdown.propTypes = propTypes;
var _default = NavDropdown;
exports.default = _default;