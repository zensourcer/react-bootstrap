"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Overlay = _interopRequireDefault(require("react-overlays/lib/Overlay"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _Fade = _interopRequireDefault(require("./Fade"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = { ..._Overlay.default.propTypes,

  /**
   * Set the visibility of the Overlay
   */
  show: _propTypes.default.bool,

  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: _propTypes.default.bool,

  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide: _propTypes.default.func,

  /**
   * Use animation
   */
  animation: _propTypes.default.oneOfType([_propTypes.default.bool, _elementType.default]),

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: _propTypes.default.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: _propTypes.default.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: _propTypes.default.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: _propTypes.default.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: _propTypes.default.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: _propTypes.default.func,

  /**
   * Sets the direction of the Overlay.
   */
  placement: _propTypes.default.oneOf(['top', 'right', 'bottom', 'left'])
};
const defaultProps = {
  animation: _Fade.default,
  rootClose: false,
  show: false,
  placement: 'right'
};

class Overlay extends _react.default.Component {
  render() {
    const {
      animation,
      children,
      ...props
    } = this.props;
    const transition = animation === true ? _Fade.default : animation || null;
    let child;

    if (!transition) {
      child = (0, _react.cloneElement)(children, {
        className: (0, _classnames.default)(children.props.className, 'in')
      });
    } else {
      child = children;
    }

    return _react.default.createElement(_Overlay.default, _extends({}, props, {
      transition: transition
    }), child);
  }

}

Overlay.propTypes = propTypes;
Overlay.defaultProps = defaultProps;
var _default = Overlay;
exports.default = _default;