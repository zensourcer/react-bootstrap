"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _contains = _interopRequireDefault(require("dom-helpers/query/contains"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _warning = _interopRequireDefault(require("warning"));

var _Overlay = _interopRequireDefault(require("./Overlay"));

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */
function isOneOf(one, of) {
  if (Array.isArray(of)) {
    return of.indexOf(one) >= 0;
  }

  return one === of;
}

const triggerType = _propTypes.default.oneOf(['click', 'hover', 'focus']);

const propTypes = { ..._Overlay.default.propTypes,

  /**
   * Specify which action or actions trigger Overlay visibility
   */
  trigger: _propTypes.default.oneOfType([triggerType, _propTypes.default.arrayOf(triggerType)]),

  /**
   * A millisecond delay amount to show and hide the Overlay once triggered
   */
  delay: _propTypes.default.number,

  /**
   * A millisecond delay amount before showing the Overlay once triggered.
   */
  delayShow: _propTypes.default.number,

  /**
   * A millisecond delay amount before hiding the Overlay once triggered.
   */
  delayHide: _propTypes.default.number,
  // FIXME: This should be `defaultShow`.

  /**
   * The initial visibility state of the Overlay. For more nuanced visibility
   * control, consider using the Overlay component directly.
   */
  defaultOverlayShown: _propTypes.default.bool,

  /**
   * An element or text to overlay next to the target.
   */
  overlay: _propTypes.default.node.isRequired,

  /**
   * @private
   */
  onBlur: _propTypes.default.func,

  /**
   * @private
   */
  onClick: _propTypes.default.func,

  /**
   * @private
   */
  onFocus: _propTypes.default.func,

  /**
   * @private
   */
  onMouseOut: _propTypes.default.func,

  /**
   * @private
   */
  onMouseOver: _propTypes.default.func,
  // Overridden props from `<Overlay>`.

  /**
   * @private
   */
  target: _propTypes.default.oneOf([null]),

  /**
   * @private
   */
  onHide: _propTypes.default.oneOf([null]),

  /**
   * @private
   */
  show: _propTypes.default.oneOf([null])
};
const defaultProps = {
  defaultOverlayShown: false,
  trigger: ['hover', 'focus']
};

class OverlayTrigger extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelayedShow = this.handleDelayedShow.bind(this);
    this.handleDelayedHide = this.handleDelayedHide.bind(this);
    this.handleHide = this.handleHide.bind(this);

    this.handleMouseOver = e => this.handleMouseOverOut(this.handleDelayedShow, e, 'fromElement');

    this.handleMouseOut = e => this.handleMouseOverOut(this.handleDelayedHide, e, 'toElement');

    this._mountNode = null;
    this.state = {
      show: props.defaultOverlayShown
    };
  }

  componentDidMount() {
    this._mountNode = document.createElement('div');
    document.body.appendChild(this._mountNode);
    this.renderOverlay();
  }

  componentDidUpdate() {
    this.renderOverlay();
  }

  componentWillUnmount() {
    _reactDom.default.unmountComponentAtNode(this._mountNode);

    document.body.removeChild(this._mountNode);
    this._mountNode = null;
    clearTimeout(this._hoverShowDelay);
    clearTimeout(this._hoverHideDelay);
  }

  handleDelayedHide() {
    if (this._hoverShowDelay != null) {
      clearTimeout(this._hoverShowDelay);
      this._hoverShowDelay = null;
      return;
    }

    if (!this.state.show || this._hoverHideDelay != null) {
      return;
    }

    const delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverHideDelay = setTimeout(() => {
      this._hoverHideDelay = null;
      this.hide();
    }, delay);
  }

  handleDelayedShow() {
    if (this._hoverHideDelay != null) {
      clearTimeout(this._hoverHideDelay);
      this._hoverHideDelay = null;
      return;
    }

    if (this.state.show || this._hoverShowDelay != null) {
      return;
    }

    const delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverShowDelay = setTimeout(() => {
      this._hoverShowDelay = null;
      this.show();
    }, delay);
  }

  handleHide() {
    this.hide();
  } // Simple implementation of mouseEnter and mouseLeave.
  // React's built version is broken: https://github.com/facebook/react/issues/4251
  // for cases when the trigger is disabled and mouseOut/Over can cause flicker
  // moving from one child element to another.


  handleMouseOverOut(handler, e, relatedNative) {
    const target = e.currentTarget;
    const related = e.relatedTarget || e.nativeEvent[relatedNative];

    if ((!related || related !== target) && !(0, _contains.default)(target, related)) {
      handler(e);
    }
  }

  handleToggle() {
    if (this.state.show) {
      this.hide();
    } else {
      this.show();
    }
  }

  hide() {
    this.setState({
      show: false
    });
  }

  makeOverlay(overlay, props) {
    return _react.default.createElement(_Overlay.default, _extends({}, props, {
      show: this.state.show,
      onHide: this.handleHide,
      target: this
    }), overlay);
  }

  show() {
    this.setState({
      show: true
    });
  }

  renderOverlay() {
    _reactDom.default.createPortal(this._overlay, this._mountNode);
  }

  render() {
    const {
      trigger,
      overlay,
      children,
      onBlur,
      onClick,
      onFocus,
      onMouseOut,
      onMouseOver,
      ...props
    } = this.props;
    delete props.delay;
    delete props.delayShow;
    delete props.delayHide;
    delete props.defaultOverlayShown;

    const child = _react.default.Children.only(children);

    const childProps = child.props;
    const triggerProps = {};

    if (this.state.show) {
      triggerProps['aria-describedby'] = overlay.props.id;
    } // FIXME: The logic here for passing through handlers on this component is
    // inconsistent. We shouldn't be passing any of these props through.


    triggerProps.onClick = (0, _createChainedFunction.default)(childProps.onClick, onClick);

    if (isOneOf('click', trigger)) {
      triggerProps.onClick = (0, _createChainedFunction.default)(triggerProps.onClick, this.handleToggle);
    }

    if (isOneOf('hover', trigger)) {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(trigger === 'hover'), '[react-bootstrap] Specifying only the `"hover"` trigger limits the ' + 'visibility of the overlay to just mouse users. Consider also ' + 'including the `"focus"` trigger so that touch and keyboard only ' + 'users can see the overlay as well.') : void 0;
      triggerProps.onMouseOver = (0, _createChainedFunction.default)(childProps.onMouseOver, onMouseOver, this.handleMouseOver);
      triggerProps.onMouseOut = (0, _createChainedFunction.default)(childProps.onMouseOut, onMouseOut, this.handleMouseOut);
    }

    if (isOneOf('focus', trigger)) {
      triggerProps.onFocus = (0, _createChainedFunction.default)(childProps.onFocus, onFocus, this.handleDelayedShow);
      triggerProps.onBlur = (0, _createChainedFunction.default)(childProps.onBlur, onBlur, this.handleDelayedHide);
    }

    this._overlay = this.makeOverlay(overlay, props);
    return (0, _react.cloneElement)(child, triggerProps);
  }

}

OverlayTrigger.propTypes = propTypes;
OverlayTrigger.defaultProps = defaultProps;
var _default = OverlayTrigger;
exports.default = _default;
module.exports = exports["default"];