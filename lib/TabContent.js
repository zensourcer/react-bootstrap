"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  componentClass: _elementType.default,

  /**
   * Sets a default animation strategy for all children `<TabPane>`s. Use
   * `false` to disable, `true` to enable the default `<Fade>` animation or
   * a react-transition-group v2 `<Transition/>` component.
   */
  animation: _propTypes.default.oneOfType([_propTypes.default.bool, _elementType.default]),

  /**
   * Wait until the first "enter" transition to mount tabs (add them to the DOM)
   */
  mountOnEnter: _propTypes.default.bool,

  /**
   * Unmount tabs (remove it from the DOM) when they are no longer visible
   */
  unmountOnExit: _propTypes.default.bool
};
const defaultProps = {
  componentClass: 'div',
  animation: true,
  mountOnEnter: false,
  unmountOnExit: false
};
const contextTypes = {
  $bs_tabContainer: _propTypes.default.shape({
    activeKey: _propTypes.default.any
  })
};
const childContextTypes = {
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

class TabContent extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handlePaneEnter = this.handlePaneEnter.bind(this);
    this.handlePaneExited = this.handlePaneExited.bind(this); // Active entries in state will be `null` unless `animation` is set. Need
    // to track active child in case keys swap and the active child changes
    // but the active key does not.

    this.state = {
      activeKey: null,
      activeChild: null
    };
  }

  getChildContext() {
    const {
      bsClass,
      animation,
      mountOnEnter,
      unmountOnExit
    } = this.props;
    const stateActiveKey = this.state.activeKey;
    const containerActiveKey = this.getContainerActiveKey();
    const activeKey = stateActiveKey != null ? stateActiveKey : containerActiveKey;
    const exiting = stateActiveKey != null && stateActiveKey !== containerActiveKey;
    return {
      $bs_tabContent: {
        bsClass,
        animation,
        activeKey,
        mountOnEnter,
        unmountOnExit,
        onPaneEnter: this.handlePaneEnter,
        onPaneExited: this.handlePaneExited,
        exiting
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.animation && this.state.activeChild) {
      this.setState({
        activeKey: null,
        activeChild: null
      });
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  getContainerActiveKey() {
    const tabContainer = this.context.$bs_tabContainer;
    return tabContainer && tabContainer.activeKey;
  }

  handlePaneEnter(child, childKey) {
    if (!this.props.animation) {
      return false;
    } // It's possible that this child should be transitioning out.


    if (childKey !== this.getContainerActiveKey()) {
      return false;
    }

    this.setState({
      activeKey: childKey,
      activeChild: child
    });
    return true;
  }

  handlePaneExited(child) {
    // This might happen as everything is unmounting.
    if (this.isUnmounted) {
      return;
    }

    this.setState(({
      activeChild
    }) => {
      if (activeChild !== child) {
        return null;
      }

      return {
        activeKey: null,
        activeChild: null
      };
    });
  }

  render() {
    const {
      componentClass: Component,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['animation', 'mountOnEnter', 'unmountOnExit']);
    return _react.default.createElement(Component, _extends({}, elementProps, {
      className: (0, _classnames.default)(className, (0, _bootstrapUtils.prefix)(bsProps, 'content'))
    }));
  }

}

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;
TabContent.contextTypes = contextTypes;
TabContent.childContextTypes = childContextTypes;

var _default = (0, _bootstrapUtils.bsClass)('tab', TabContent);

exports.default = _default;
module.exports = exports["default"];