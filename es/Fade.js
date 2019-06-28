"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Transition = _interopRequireWildcard(require("react-transition-group/Transition"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: _propTypes.default.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: _propTypes.default.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: _propTypes.default.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: _propTypes.default.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: _propTypes.default.number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: _propTypes.default.func,

  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: _propTypes.default.func,

  /**
   * Callback fired after the has component faded in
   */
  onEntered: _propTypes.default.func,

  /**
   * Callback fired before the component fades out
   */
  onExit: _propTypes.default.func,

  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: _propTypes.default.func,

  /**
   * Callback fired after the component has faded out
   */
  onExited: _propTypes.default.func
};
const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
const fadeStyles = {
  [_Transition.ENTERING]: 'in',
  [_Transition.ENTERED]: 'in'
};

class Fade extends _react.default.Component {
  render() {
    const {
      className,
      children,
      ...props
    } = this.props;
    return _react.default.createElement(_Transition.default, props, (status, innerProps) => _react.default.cloneElement(children, { ...innerProps,
      className: (0, _classnames.default)('fade', className, children.props.className, fadeStyles[status])
    }));
  }

}

Fade.propTypes = propTypes;
Fade.defaultProps = defaultProps;
var _default = Fade;
exports.default = _default;