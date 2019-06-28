"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _warning = _interopRequireDefault(require("warning"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

var _Fade = _interopRequireDefault(require("./Fade"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * Uniquely identify the `<TabPane>` among its siblings.
   */
  eventKey: _propTypes.default.any,

  /**
   * Use animation when showing or hiding `<TabPane>`s. Use `false` to disable,
   * `true` to enable the default `<Fade>` animation or
   * a react-transition-group v2 `<Transition/>` component.
   */
  animation: _propTypes.default.oneOfType([_propTypes.default.bool, _elementType.default]),

  /** @private * */
  id: _propTypes.default.string,

  /** @private * */
  'aria-labelledby': _propTypes.default.string,

  /**
   * If not explicitly specified and rendered in the context of a
   * `<TabContent>`, the `bsClass` of the `<TabContent>` suffixed by `-pane`.
   * If otherwise not explicitly specified, `tab-pane`.
   */
  bsClass: _propTypes.default.string,

  /**
   * Transition onEnter callback when animation is not `false`
   */
  onEnter: _propTypes.default.func,

  /**
   * Transition onEntering callback when animation is not `false`
   */
  onEntering: _propTypes.default.func,

  /**
   * Transition onEntered callback when animation is not `false`
   */
  onEntered: _propTypes.default.func,

  /**
   * Transition onExit callback when animation is not `false`
   */
  onExit: _propTypes.default.func,

  /**
   * Transition onExiting callback when animation is not `false`
   */
  onExiting: _propTypes.default.func,

  /**
   * Transition onExited callback when animation is not `false`
   */
  onExited: _propTypes.default.func,

  /**
   * Wait until the first "enter" transition to mount the tab (add it to the DOM)
   */
  mountOnEnter: _propTypes.default.bool,

  /**
   * Unmount the tab (remove it from the DOM) when it is no longer visible
   */
  unmountOnExit: _propTypes.default.bool
};
const contextTypes = {
  $bs_tabContainer: _propTypes.default.shape({
    getTabId: _propTypes.default.func,
    getPaneId: _propTypes.default.func
  }),
  $bs_tabContent: _propTypes.default.shape({
    bsClass: _propTypes.default.string,
    animation: _propTypes.default.oneOfType([_propTypes.default.bool, _elementType.default]),
    activeKey: _propTypes.default.any,
    mountOnEnter: _propTypes.default.bool,
    unmountOnExit: _propTypes.default.bool,
    onPaneEnter: _propTypes.default.func.isRequired,
    onPaneExited: _propTypes.default.func.isRequired,
    exiting: _propTypes.default.bool.isRequired
  })
};
/**
 * We override the `<TabContainer>` context so `<Nav>`s in `<TabPane>`s don't
 * conflict with the top level one.
 */

const childContextTypes = {
  $bs_tabContainer: _propTypes.default.oneOf([null])
};

class TabPane extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExited = this.handleExited.bind(this);
    this.in = false;
  }

  getChildContext() {
    return {
      $bs_tabContainer: null
    };
  }

  componentDidMount() {
    if (this.shouldBeIn()) {
      // In lieu of the action event firing.
      this.handleEnter();
    }
  }

  componentDidUpdate() {
    if (this.in) {
      if (!this.shouldBeIn()) {
        // We shouldn't be active any more. Notify the parent.
        this.handleExited();
      }
    } else if (this.shouldBeIn()) {
      // We are the active child. Notify the parent.
      this.handleEnter();
    }
  }

  componentWillUnmount() {
    if (this.in) {
      // In lieu of the action event firing.
      this.handleExited();
    }
  }

  getAnimation() {
    if (this.props.animation != null) {
      return this.props.animation;
    }

    const tabContent = this.context.$bs_tabContent;
    return tabContent && tabContent.animation;
  }

  handleEnter() {
    const tabContent = this.context.$bs_tabContent;

    if (!tabContent) {
      return;
    }

    this.in = tabContent.onPaneEnter(this, this.props.eventKey);
  }

  handleExited() {
    const tabContent = this.context.$bs_tabContent;

    if (!tabContent) {
      return;
    }

    tabContent.onPaneExited(this);
    this.in = false;
  }

  isActive() {
    const tabContent = this.context.$bs_tabContent;
    const activeKey = tabContent && tabContent.activeKey;
    return this.props.eventKey === activeKey;
  }

  shouldBeIn() {
    return this.getAnimation() && this.isActive();
  }

  render() {
    const {
      eventKey,
      className,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      mountOnEnter: propsMountOnEnter,
      unmountOnExit: propsUnmountOnExit,
      ...props
    } = this.props;
    const {
      $bs_tabContent: tabContent,
      $bs_tabContainer: tabContainer
    } = this.context;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['animation']);
    const active = this.isActive();
    const animation = this.getAnimation();
    const mountOnEnter = propsMountOnEnter != null ? propsMountOnEnter : tabContent && tabContent.mountOnEnter;
    const unmountOnExit = propsUnmountOnExit != null ? propsUnmountOnExit : tabContent && tabContent.unmountOnExit;

    if (!active && !animation && unmountOnExit) {
      return null;
    }

    const Transition = animation === true ? _Fade.default : animation || null;

    if (tabContent) {
      bsProps.bsClass = (0, _bootstrapUtils.prefix)(tabContent, 'pane');
    }

    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      active
    };

    if (tabContainer) {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!elementProps.id && !elementProps['aria-labelledby'], 'In the context of a `<TabContainer>`, `<TabPanes>` are given ' + 'generated `id` and `aria-labelledby` attributes for the sake of ' + 'proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly provide a `generateChildId` ' + 'prop to the parent `<TabContainer>`.') : void 0;
      elementProps.id = tabContainer.getPaneId(eventKey);
      elementProps['aria-labelledby'] = tabContainer.getTabId(eventKey);
    }

    const pane = _react.default.createElement("div", _extends({}, elementProps, {
      role: "tabpanel",
      "aria-hidden": !active,
      className: (0, _classnames.default)(className, classes)
    }));

    if (Transition) {
      const exiting = tabContent && tabContent.exiting;
      return _react.default.createElement(Transition, {
        in: active && !exiting,
        onEnter: (0, _createChainedFunction.default)(this.handleEnter, onEnter),
        onEntering: onEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: onExiting,
        onExited: (0, _createChainedFunction.default)(this.handleExited, onExited),
        mountOnEnter: mountOnEnter,
        unmountOnExit: unmountOnExit
      }, pane);
    }

    return pane;
  }

}

TabPane.propTypes = propTypes;
TabPane.contextTypes = contextTypes;
TabPane.childContextTypes = childContextTypes;

var _default = (0, _bootstrapUtils.bsClass)('tab-pane', TabPane);

exports.default = _default;
module.exports = exports["default"];