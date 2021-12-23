"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CarouselCaption = _interopRequireDefault(require("./CarouselCaption"));

var _CarouselItem = _interopRequireDefault(require("./CarouselItem"));

var _Glyphicon = _interopRequireDefault(require("./Glyphicon"));

var _SafeAnchor = _interopRequireDefault(require("./SafeAnchor"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// TODO: `slide` should be `animate`.
// TODO: Use uncontrollable.
const propTypes = {
  slide: _propTypes.default.bool,
  indicators: _propTypes.default.bool,

  /**
   * The amount of time to delay between automatically cycling an item.
   * If `null`, carousel will not automatically cycle.
   */
  interval: _propTypes.default.number,
  controls: _propTypes.default.bool,
  pauseOnHover: _propTypes.default.bool,
  wrap: _propTypes.default.bool,

  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: any, ?event: Object) => any
   * ```
   *
   * If this callback takes two or more arguments, the second argument will
   * be a persisted event object with `direction` set to the direction of the
   * transition.
   */
  onSelect: _propTypes.default.func,
  onSlideEnd: _propTypes.default.func,
  activeIndex: _propTypes.default.number,
  defaultActiveIndex: _propTypes.default.number,
  direction: _propTypes.default.oneOf(['prev', 'next']),
  prevIcon: _propTypes.default.node,

  /**
   * Label shown to screen readers only, can be used to show the previous element
   * in the carousel.
   * Set to null to deactivate.
   */
  prevLabel: _propTypes.default.string,
  nextIcon: _propTypes.default.node,

  /**
   * Label shown to screen readers only, can be used to show the next element
   * in the carousel.
   * Set to null to deactivate.
   */
  nextLabel: _propTypes.default.string
};
const defaultProps = {
  slide: true,
  interval: 5000,
  pauseOnHover: true,
  wrap: true,
  indicators: true,
  controls: true,
  prevIcon: _react.default.createElement(_Glyphicon.default, {
    glyph: "chevron-left"
  }),
  prevLabel: 'Previous',
  nextIcon: _react.default.createElement(_Glyphicon.default, {
    glyph: "chevron-right"
  }),
  nextLabel: 'Next'
};

class Carousel extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleItemAnimateOutEnd = this.handleItemAnimateOutEnd.bind(this);
    const {
      defaultActiveIndex
    } = props;
    this.state = {
      activeIndex: defaultActiveIndex != null ? defaultActiveIndex : 0,
      previousActiveIndex: null,
      direction: null
    };
    this.isUnmounted = false;
  }

  componentDidMount() {
    this.waitForNext();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const activeIndex = this.getActiveIndex();

    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
      clearTimeout(this.timeout);
      this.setState({
        previousActiveIndex: activeIndex,
        direction: nextProps.direction != null ? nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }

    if (nextProps.activeIndex == null && this.state.activeIndex >= nextProps.children.length) {
      this.setState({
        activeIndex: 0,
        previousActiveIndex: null,
        direction: null
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.isUnmounted = true;
  }

  getActiveIndex() {
    const activeIndexProp = this.props.activeIndex;
    return activeIndexProp != null ? activeIndexProp : this.state.activeIndex;
  }

  getDirection(prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ? 'prev' : 'next';
  }

  handleItemAnimateOutEnd() {
    this.setState({
      previousActiveIndex: null,
      direction: null
    }, () => {
      this.waitForNext();

      if (this.props.onSlideEnd) {
        this.props.onSlideEnd();
      }
    });
  }

  handleMouseOut() {
    if (this.isPaused) {
      this.play();
    }
  }

  handleMouseOver() {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  }

  handleNext(e) {
    let index = this.getActiveIndex() + 1;

    const count = _ValidComponentChildren.default.count(this.props.children);

    if (index > count - 1) {
      if (!this.props.wrap) {
        return;
      }

      index = 0;
    }

    this.select(index, e, 'next');
  }

  handlePrev(e) {
    let index = this.getActiveIndex() - 1;

    if (index < 0) {
      if (!this.props.wrap) {
        return;
      }

      index = _ValidComponentChildren.default.count(this.props.children) - 1;
    }

    this.select(index, e, 'prev');
  } // This might be a public API.


  pause() {
    this.isPaused = true;
    clearTimeout(this.timeout);
  } // This might be a public API.


  play() {
    this.isPaused = false;
    this.waitForNext();
  }

  select(index, e, direction) {
    clearTimeout(this.timeout); // TODO: Is this necessary? Seems like the only risk is if the component
    // unmounts while handleItemAnimateOutEnd fires.

    if (this.isUnmounted) {
      return;
    }

    const previousActiveIndex = this.props.slide ? this.getActiveIndex() : null;
    direction = direction || this.getDirection(previousActiveIndex, index);
    const {
      onSelect
    } = this.props;

    if (onSelect) {
      if (onSelect.length > 1) {
        // React SyntheticEvents are pooled, so we need to remove this event
        // from the pool to add a custom property. To avoid unnecessarily
        // removing objects from the pool, only do this when the listener
        // actually wants the event.
        if (e) {
          e.persist();
          e.direction = direction;
        } else {
          e = {
            direction
          };
        }

        onSelect(index, e);
      } else {
        onSelect(index);
      }
    }

    if (this.props.activeIndex == null && index !== previousActiveIndex) {
      if (this.state.previousActiveIndex != null) {
        // If currently animating don't activate the new index.
        // TODO: look into queueing this canceled call and
        // animating after the current animation has ended.
        return;
      }

      this.setState({
        activeIndex: index,
        previousActiveIndex,
        direction
      });
    }
  }

  waitForNext() {
    const {
      slide,
      interval,
      activeIndex: activeIndexProp
    } = this.props;

    if (!this.isPaused && slide && interval && activeIndexProp == null) {
      this.timeout = setTimeout(this.handleNext, interval);
    }
  }

  renderControls(properties) {
    const {
      wrap,
      children,
      activeIndex,
      prevIcon,
      nextIcon,
      bsProps,
      prevLabel,
      nextLabel
    } = properties;
    const controlClassName = (0, _bootstrapUtils.prefix)(bsProps, 'control');

    const count = _ValidComponentChildren.default.count(children);

    return [(wrap || activeIndex !== 0) && _react.default.createElement(_SafeAnchor.default, {
      key: "prev",
      className: (0, _classnames.default)(controlClassName, 'left'),
      onClick: this.handlePrev
    }, prevIcon, prevLabel && _react.default.createElement("span", {
      className: "sr-only"
    }, prevLabel)), (wrap || activeIndex !== count - 1) && _react.default.createElement(_SafeAnchor.default, {
      key: "next",
      className: (0, _classnames.default)(controlClassName, 'right'),
      onClick: this.handleNext
    }, nextIcon, nextLabel && _react.default.createElement("span", {
      className: "sr-only"
    }, nextLabel))];
  }

  renderIndicators(children, activeIndex, bsProps) {
    let indicators = [];

    _ValidComponentChildren.default.forEach(children, (child, index) => {
      indicators.push(_react.default.createElement("li", {
        key: index,
        className: index === activeIndex ? 'active' : null,
        onClick: e => this.select(index, e)
      }), // Force whitespace between indicator elements. Bootstrap requires
      // this for correct spacing of elements.
      ' ');
    });

    return _react.default.createElement("ol", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'indicators')
    }, indicators);
  }

  render() {
    const {
      slide,
      indicators,
      controls,
      wrap,
      prevIcon,
      prevLabel,
      nextIcon,
      nextLabel,
      className,
      children,
      ...props
    } = this.props;
    const {
      previousActiveIndex,
      direction
    } = this.state;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['interval', 'pauseOnHover', 'onSelect', 'onSlideEnd', 'activeIndex', // Accessed via this.getActiveIndex().
    'defaultActiveIndex', 'direction']);
    const activeIndex = this.getActiveIndex();
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      slide
    };
    return _react.default.createElement("div", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes),
      onMouseOver: this.handleMouseOver,
      onMouseOut: this.handleMouseOut
    }), indicators && this.renderIndicators(children, activeIndex, bsProps), _react.default.createElement("div", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'inner')
    }, _ValidComponentChildren.default.map(children, (child, index) => {
      const active = index === activeIndex;
      const previousActive = slide && index === previousActiveIndex;
      return (0, _react.cloneElement)(child, {
        active,
        index,
        animateOut: previousActive,
        animateIn: active && previousActiveIndex != null && slide,
        direction,
        onAnimateOutEnd: previousActive ? this.handleItemAnimateOutEnd : null
      });
    })), controls && this.renderControls({
      wrap,
      children,
      activeIndex,
      prevIcon,
      prevLabel,
      nextIcon,
      nextLabel,
      bsProps
    }));
  }

}

Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;
Carousel.Caption = _CarouselCaption.default;
Carousel.Item = _CarouselItem.default;

var _default = (0, _bootstrapUtils.bsClass)('carousel', Carousel);

exports.default = _default;