"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _keycode = _interopRequireDefault(require("keycode"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _RootCloseWrapper = _interopRequireDefault(require("react-overlays/lib/RootCloseWrapper"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  open: _propTypes.default.bool,
  pullRight: _propTypes.default.bool,
  onClose: _propTypes.default.func,
  labelledBy: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  onSelect: _propTypes.default.func,
  rootCloseEvent: _propTypes.default.oneOf(['click', 'mousedown'])
};
const defaultProps = {
  bsRole: 'menu',
  pullRight: false
};

class DropdownMenu extends _react.default.Component {
  constructor(props) {
    super(props);
    this.handleRootClose = this.handleRootClose.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  getFocusableMenuItems() {
    const node = _reactDom.default.findDOMNode(this);

    if (!node) {
      return [];
    }

    return Array.from(node.querySelectorAll('[tabIndex="-1"]'));
  }

  getItemsAndActiveIndex() {
    const items = this.getFocusableMenuItems();
    const activeIndex = items.indexOf(document.activeElement);
    return {
      items,
      activeIndex
    };
  }

  focusNext() {
    const {
      items,
      activeIndex
    } = this.getItemsAndActiveIndex();

    if (items.length === 0) {
      return;
    }

    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    items[nextIndex].focus();
  }

  focusPrevious() {
    const {
      items,
      activeIndex
    } = this.getItemsAndActiveIndex();

    if (items.length === 0) {
      return;
    }

    const prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    items[prevIndex].focus();
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case _keycode.default.codes.down:
        this.focusNext();
        event.preventDefault();
        break;

      case _keycode.default.codes.up:
        this.focusPrevious();
        event.preventDefault();
        break;

      case _keycode.default.codes.esc:
      case _keycode.default.codes.tab:
        this.props.onClose(event, {
          source: 'keydown'
        });
        break;

      default:
    }
  }

  handleRootClose(event) {
    this.props.onClose(event, {
      source: 'rootClose'
    });
  }

  render() {
    const {
      open,
      pullRight,
      labelledBy,
      onSelect,
      className,
      rootCloseEvent,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['onClose']);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      [(0, _bootstrapUtils.prefix)(bsProps, 'right')]: pullRight
    };
    return _react.default.createElement(_RootCloseWrapper.default, {
      disabled: !open,
      onRootClose: this.handleRootClose,
      event: rootCloseEvent
    }, _react.default.createElement("ul", _extends({}, elementProps, {
      role: "menu",
      className: (0, _classnames.default)(className, classes),
      "aria-labelledby": labelledBy
    }), _ValidComponentChildren.default.map(children, child => _react.default.cloneElement(child, {
      onKeyDown: (0, _createChainedFunction.default)(child.props.onKeyDown, this.handleKeyDown),
      onSelect: (0, _createChainedFunction.default)(child.props.onSelect, onSelect)
    }))));
  }

}

DropdownMenu.propTypes = propTypes;
DropdownMenu.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('dropdown-menu', DropdownMenu);

exports.default = _default;
module.exports = exports["default"];