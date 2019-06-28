"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const propTypes = {
  onClick: _propTypes.default.func,

  /**
   * The toggle content, if left empty it will render the default toggle (seen above).
   */
  children: _propTypes.default.node
};
const contextTypes = {
  $bs_navbar: _propTypes.default.shape({
    bsClass: _propTypes.default.string,
    expanded: _propTypes.default.bool,
    onToggle: _propTypes.default.func.isRequired
  })
};

class NavbarToggle extends _react.default.Component {
  render() {
    const {
      onClick,
      className,
      children,
      ...props
    } = this.props;
    const navbarProps = this.context.$bs_navbar || {
      bsClass: 'navbar'
    };
    const buttonProps = {
      type: 'button',
      ...props,
      onClick: (0, _createChainedFunction.default)(onClick, navbarProps.onToggle),
      className: (0, _classnames.default)(className, (0, _bootstrapUtils.prefix)(navbarProps, 'toggle'), !navbarProps.expanded && 'collapsed')
    };

    if (children) {
      return _react.default.createElement("button", buttonProps, children);
    }

    return _react.default.createElement("button", buttonProps, _react.default.createElement("span", {
      className: "sr-only"
    }, "Toggle navigation"), _react.default.createElement("span", {
      className: "icon-bar"
    }), _react.default.createElement("span", {
      className: "icon-bar"
    }), _react.default.createElement("span", {
      className: "icon-bar"
    }));
  }

}

NavbarToggle.propTypes = propTypes;
NavbarToggle.contextTypes = contextTypes;
var _default = NavbarToggle;
exports.default = _default;