"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SafeAnchor = _interopRequireDefault(require("./SafeAnchor"));

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  active: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  role: _propTypes.default.string,
  href: _propTypes.default.string,
  onClick: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  eventKey: _propTypes.default.any
};
const defaultProps = {
  active: false,
  disabled: false
};

class NavItem extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
      return;
    }

    if (this.props.onSelect) {
      this.props.onSelect(this.props.eventKey, e);
    }
  }

  render() {
    const {
      active,
      disabled,
      onClick,
      className,
      style,
      ...props
    } = this.props;
    delete props.onSelect;
    delete props.eventKey; // These are injected down by `<Nav>` for building `<SubNav>`s.

    delete props.activeKey;
    delete props.activeHref;

    if (!props.role) {
      if (props.href === '#') {
        props.role = 'button';
      }
    } else if (props.role === 'tab') {
      props['aria-selected'] = active;
    }

    return _react.default.createElement("li", {
      role: "presentation",
      className: (0, _classnames.default)(className, {
        active,
        disabled
      }),
      style: style
    }, _react.default.createElement(_SafeAnchor.default, _extends({}, props, {
      disabled: disabled,
      onClick: (0, _createChainedFunction.default)(onClick, this.handleClick)
    })));
  }

}

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;
var _default = NavItem;
exports.default = _default;