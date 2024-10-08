"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _isRequiredForA11y = _interopRequireDefault(require("prop-types-extra/lib/isRequiredForA11y"));

var _uncontrollable = require("uncontrollable");

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _Nav = _interopRequireDefault(require("./Nav"));

var _NavItem = _interopRequireDefault(require("./NavItem"));

var _TabContainer = _interopRequireDefault(require("./TabContainer"));

var _TabContent = _interopRequireDefault(require("./TabContent"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const TabContainer = _TabContainer.default.ControlledComponent;
const propTypes = {
  /**
   * Mark the Tab with a matching `eventKey` as active.
   *
   * @controllable onSelect
   */
  activeKey: _propTypes.default.any,

  /**
   * Navigation style
   */
  bsStyle: _propTypes.default.oneOf(['tabs', 'pills']),

  /**
   * Sets a default animation strategy. Use `false` to disable, `true`
   * to enable the default `<Fade>` animation, or a react-transition-group
   * v2 `<Transition/>` component.
   */
  animation: _propTypes.default.oneOfType([_propTypes.default.bool, _elementType.default]),
  id: (0, _isRequiredForA11y.default)(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),

  /**
   * Callback fired when a Tab is selected.
   *
   * ```js
   * function (
   *   Any eventKey,
   *   SyntheticEvent event?
   * )
   * ```
   *
   * @controllable activeKey
   */
  onSelect: _propTypes.default.func,

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: _propTypes.default.bool,

  /**
   * Unmount tabs (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: _propTypes.default.bool
};
const defaultProps = {
  bsStyle: 'tabs',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false
};

function getDefaultActiveKey(children) {
  let defaultActiveKey;

  _ValidComponentChildren.default.forEach(children, child => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });

  return defaultActiveKey;
}

class Tabs extends _react.default.Component {
  renderTab(child) {
    const {
      title,
      eventKey,
      disabled,
      tabClassName
    } = child.props;

    if (title == null) {
      return null;
    }

    return _react.default.createElement(_NavItem.default, {
      eventKey: eventKey,
      disabled: disabled,
      className: tabClassName
    }, title);
  }

  render() {
    const {
      id,
      onSelect,
      animation,
      mountOnEnter,
      unmountOnExit,
      bsClass,
      className,
      style,
      children,
      activeKey = getDefaultActiveKey(children),
      ...props
    } = this.props;
    return _react.default.createElement(TabContainer, {
      id: id,
      activeKey: activeKey,
      onSelect: onSelect,
      className: className,
      style: style
    }, _react.default.createElement("div", null, _react.default.createElement(_Nav.default, _extends({}, props, {
      role: "tablist"
    }), _ValidComponentChildren.default.map(children, this.renderTab)), _react.default.createElement(_TabContent.default, {
      bsClass: bsClass,
      animation: animation,
      mountOnEnter: mountOnEnter,
      unmountOnExit: unmountOnExit
    }, children)));
  }

}

Tabs.propTypes = propTypes;
Tabs.defaultProps = defaultProps;
(0, _bootstrapUtils.bsClass)('tab', Tabs);

var _default = (0, _uncontrollable.uncontrollable)(Tabs, {
  activeKey: 'onSelect'
});

exports.default = _default;