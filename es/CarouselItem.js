"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _transition = _interopRequireDefault(require("dom-helpers/transition"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  direction: _propTypes.default.oneOf(['prev', 'next']),
  onAnimateOutEnd: _propTypes.default.func,
  active: _propTypes.default.bool,
  animateIn: _propTypes.default.bool,
  animateOut: _propTypes.default.bool,
  index: _propTypes.default.number
};
const defaultProps = {
  active: false,
  animateIn: false,
  animateOut: false
};

class CarouselItem extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handleAnimateOutEnd = this.handleAnimateOutEnd.bind(this);
    this.state = {
      direction: null
    };
    this.isUnmounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({
        direction: null
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      active
    } = this.props;
    const prevActive = prevProps.active;

    if (!active && prevActive) {
      _transition.default.end(_reactDom.default.findDOMNode(this), this.handleAnimateOutEnd);
    }

    if (active !== prevActive) {
      setTimeout(() => this.startAnimation(), 20);
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleAnimateOutEnd() {
    if (this.isUnmounted) {
      return;
    }

    if (this.props.onAnimateOutEnd) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  }

  startAnimation() {
    if (this.isUnmounted) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ? 'right' : 'left'
    });
  }

  render() {
    const {
      direction,
      active,
      animateIn,
      animateOut,
      className,
      ...props
    } = this.props;
    delete props.onAnimateOutEnd;
    delete props.index;
    const classes = {
      item: true,
      active: active && !animateIn || animateOut
    };

    if (direction && active && animateIn) {
      classes[direction] = true;
    }

    if (this.state.direction && (animateIn || animateOut)) {
      classes[this.state.direction] = true;
    }

    return _react.default.createElement("div", _extends({}, props, {
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

CarouselItem.propTypes = propTypes;
CarouselItem.defaultProps = defaultProps;
var _default = CarouselItem;
exports.default = _default;