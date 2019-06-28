"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _all = _interopRequireDefault(require("prop-types-extra/lib/all"));

var _SafeAnchor = _interopRequireDefault(require("./SafeAnchor"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * Highlight the menu item as active.
   */
  active: _propTypes.default.bool,

  /**
   * Disable the menu item, making it unselectable.
   */
  disabled: _propTypes.default.bool,

  /**
   * Styles the menu item as a horizontal rule, providing visual separation between
   * groups of menu items.
   */
  divider: (0, _all.default)(_propTypes.default.bool, ({
    divider,
    children
  }) => divider && children ? new Error('Children will not be rendered for dividers') : null),

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey: _propTypes.default.any,

  /**
   * Styles the menu item as a header label, useful for describing a group of menu items.
   */
  header: _propTypes.default.bool,

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href: _propTypes.default.string,

  /**
   * Callback fired when the menu item is clicked.
   */
  onClick: _propTypes.default.func,

  /**
   * Callback fired when the menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: _propTypes.default.func
};
const defaultProps = {
  divider: false,
  disabled: false,
  header: false
};

class MenuItem extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const {
      href,
      disabled,
      onSelect,
      eventKey
    } = this.props;

    if (!href || disabled) {
      event.preventDefault();
    }

    if (disabled) {
      return;
    }

    if (onSelect) {
      onSelect(eventKey, event);
    }
  }

  render() {
    const {
      active,
      disabled,
      divider,
      header,
      onClick,
      className,
      style,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['eventKey', 'onSelect']);

    if (divider) {
      // Forcibly blank out the children; separators shouldn't render any.
      elementProps.children = undefined;
      return _react.default.createElement("li", _extends({}, elementProps, {
        role: "separator",
        className: (0, _classnames.default)(className, 'divider'),
        style: style
      }));
    }

    if (header) {
      return _react.default.createElement("li", _extends({}, elementProps, {
        role: "heading",
        className: (0, _classnames.default)(className, (0, _bootstrapUtils.prefix)(bsProps, 'header')),
        style: style
      }));
    }

    return _react.default.createElement("li", {
      role: "presentation",
      className: (0, _classnames.default)(className, {
        active,
        disabled
      }),
      style: style
    }, _react.default.createElement(_SafeAnchor.default, _extends({}, elementProps, {
      role: "menuitem",
      tabIndex: "-1",
      onClick: (0, _createChainedFunction.default)(onClick, this.handleClick)
    })));
  }

}

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('dropdown', MenuItem);

exports.default = _default;