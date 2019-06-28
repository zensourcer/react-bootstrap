"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _style = _interopRequireDefault(require("dom-helpers/style"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Transition = _interopRequireWildcard(require("react-transition-group/Transition"));

var _capitalize = _interopRequireDefault(require("./utils/capitalize"));

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
}; // reading a dimension prop will cause the browser to recalculate,
// which will let our animations work

function triggerBrowserReflow(node) {
  node.offsetHeight; // eslint-disable-line no-unused-expressions
}

function getDimensionValue(dimension, elem) {
  let value = elem[`offset${(0, _capitalize.default)(dimension)}`];
  let margins = MARGINS[dimension];
  return value + parseInt((0, _style.default)(elem, margins[0]), 10) + parseInt((0, _style.default)(elem, margins[1]), 10);
}

const collapseStyles = {
  [_Transition.EXITED]: 'collapse',
  [_Transition.EXITING]: 'collapsing',
  [_Transition.ENTERING]: 'collapsing',
  [_Transition.ENTERED]: 'collapse in'
};
const propTypes = {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  in: _propTypes.default.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: _propTypes.default.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit: _propTypes.default.bool,

  /**
   * Run the expand animation when the component mounts, if it is initially
   * shown
   */
  appear: _propTypes.default.bool,

  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout: _propTypes.default.number,

  /**
   * Callback fired before the component expands
   */
  onEnter: _propTypes.default.func,

  /**
   * Callback fired after the component starts to expand
   */
  onEntering: _propTypes.default.func,

  /**
   * Callback fired after the component has expanded
   */
  onEntered: _propTypes.default.func,

  /**
   * Callback fired before the component collapses
   */
  onExit: _propTypes.default.func,

  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: _propTypes.default.func,

  /**
   * Callback fired after the component has collapsed
   */
  onExited: _propTypes.default.func,

  /**
   * The dimension used when collapsing, or a function that returns the
   * dimension
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
   */
  dimension: _propTypes.default.oneOfType([_propTypes.default.oneOf(['height', 'width']), _propTypes.default.func]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   */
  getDimensionValue: _propTypes.default.func,

  /**
   * ARIA role of collapsible element
   */
  role: _propTypes.default.string
};
const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  dimension: 'height',
  getDimensionValue
};

class Collapse extends _react.default.Component {
  constructor(...args) {
    super(...args);

    this.handleEnter = elem => {
      elem.style[this.getDimension()] = '0';
    };

    this.handleEntering = elem => {
      const dimension = this.getDimension();
      elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
    };

    this.handleEntered = elem => {
      elem.style[this.getDimension()] = null;
    };

    this.handleExit = elem => {
      const dimension = this.getDimension();
      elem.style[dimension] = `${this.props.getDimensionValue(dimension, elem)}px`;
      triggerBrowserReflow(elem);
    };

    this.handleExiting = elem => {
      elem.style[this.getDimension()] = '0';
    };
  }

  getDimension() {
    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
  } // for testing


  _getScrollDimensionValue(elem, dimension) {
    return `${elem[`scroll${(0, _capitalize.default)(dimension)}`]}px`;
  }
  /* -- Expanding -- */


  render() {
    const {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      className,
      children,
      ...props
    } = this.props;
    delete props.dimension;
    delete props.getDimensionValue;
    const handleEnter = (0, _createChainedFunction.default)(this.handleEnter, onEnter);
    const handleEntering = (0, _createChainedFunction.default)(this.handleEntering, onEntering);
    const handleEntered = (0, _createChainedFunction.default)(this.handleEntered, onEntered);
    const handleExit = (0, _createChainedFunction.default)(this.handleExit, onExit);
    const handleExiting = (0, _createChainedFunction.default)(this.handleExiting, onExiting);
    return _react.default.createElement(_Transition.default, _extends({}, props, {
      "aria-expanded": props.role ? props.in : null,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered: handleEntered,
      onExit: handleExit,
      onExiting: handleExiting
    }), (state, innerProps) => _react.default.cloneElement(children, { ...innerProps,
      className: (0, _classnames.default)(className, children.props.className, collapseStyles[state], this.getDimension() === 'width' && 'width')
    }));
  }

}

Collapse.propTypes = propTypes;
Collapse.defaultProps = defaultProps;
var _default = Collapse;
exports.default = _default;