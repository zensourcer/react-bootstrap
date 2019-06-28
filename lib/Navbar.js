"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _Grid = _interopRequireDefault(require("./Grid"));

var _NavbarBrand = _interopRequireDefault(require("./NavbarBrand"));

var _NavbarCollapse = _interopRequireDefault(require("./NavbarCollapse"));

var _NavbarHeader = _interopRequireDefault(require("./NavbarHeader"));

var _NavbarToggle = _interopRequireDefault(require("./NavbarToggle"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * Create a fixed navbar along the top of the screen, that scrolls with the
   * page
   */
  fixedTop: _propTypes.default.bool,

  /**
   * Create a fixed navbar along the bottom of the screen, that scrolls with
   * the page
   */
  fixedBottom: _propTypes.default.bool,

  /**
   * Create a full-width navbar that scrolls away with the page
   */
  staticTop: _propTypes.default.bool,

  /**
   * An alternative dark visual style for the Navbar
   */
  inverse: _propTypes.default.bool,

  /**
   * Allow the Navbar to fluidly adjust to the page or container width, instead
   * of at the predefined screen breakpoints
   */
  fluid: _propTypes.default.bool,

  /**
   * Set a custom element for this component.
   */
  componentClass: _elementType.default,

  /**
   * A callback fired when the `<Navbar>` body collapses or expands. Fired when
   * a `<Navbar.Toggle>` is clicked and called with the new `expanded`
   * boolean value.
   *
   * @controllable expanded
   */
  onToggle: _propTypes.default.func,

  /**
   * A callback fired when a descendant of a child `<Nav>` is selected. Should
   * be used to execute complex closing or other miscellaneous actions desired
   * after selecting a descendant of `<Nav>`. Does nothing if no `<Nav>` or `<Nav>`
   * descendants exist. The callback is called with an eventKey, which is a
   * prop from the selected `<Nav>` descendant, and an event.
   *
   * ```js
   * function (
   *  Any eventKey,
   *  SyntheticEvent event?
   * )
   * ```
   *
   * For basic closing behavior after all `<Nav>` descendant onSelect events in
   * mobile viewports, try using collapseOnSelect.
   *
   * Note: If you are manually closing the navbar using this `OnSelect` prop,
   * ensure that you are setting `expanded` to false and not *toggling* between
   * true and false.
   */
  onSelect: _propTypes.default.func,

  /**
   * Sets `expanded` to `false` after the onSelect event of a descendant of a
   * child `<Nav>`. Does nothing if no `<Nav>` or `<Nav>` descendants exist.
   *
   * The onSelect callback should be used instead for more complex operations
   * that need to be executed after the `select` event of `<Nav>` descendants.
   */
  collapseOnSelect: _propTypes.default.bool,

  /**
   * Explicitly set the visiblity of the navbar body
   *
   * @controllable onToggle
   */
  expanded: _propTypes.default.bool,
  role: _propTypes.default.string
};
const defaultProps = {
  componentClass: 'nav',
  fixedTop: false,
  fixedBottom: false,
  staticTop: false,
  inverse: false,
  fluid: false,
  collapseOnSelect: false
};
const childContextTypes = {
  $bs_navbar: _propTypes.default.shape({
    bsClass: _propTypes.default.string,
    expanded: _propTypes.default.bool,
    onToggle: _propTypes.default.func.isRequired,
    onSelect: _propTypes.default.func
  })
};

class Navbar extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleCollapse = this.handleCollapse.bind(this);
  }

  getChildContext() {
    const {
      bsClass,
      expanded,
      onSelect,
      collapseOnSelect
    } = this.props;
    return {
      $bs_navbar: {
        bsClass,
        expanded,
        onToggle: this.handleToggle,
        onSelect: (0, _createChainedFunction.default)(onSelect, collapseOnSelect ? this.handleCollapse : null)
      }
    };
  }

  handleCollapse() {
    const {
      onToggle,
      expanded
    } = this.props;

    if (expanded) {
      onToggle(false);
    }
  }

  handleToggle() {
    const {
      onToggle,
      expanded
    } = this.props;
    onToggle(!expanded);
  }

  render() {
    const {
      componentClass: Component,
      fixedTop,
      fixedBottom,
      staticTop,
      inverse,
      fluid,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['expanded', 'onToggle', 'onSelect', 'collapseOnSelect']); // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one

    if (elementProps.role === undefined && Component !== 'nav') {
      elementProps.role = 'navigation';
    }

    if (inverse) {
      bsProps.bsStyle = _StyleConfig.Style.INVERSE;
    }

    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      [(0, _bootstrapUtils.prefix)(bsProps, 'fixed-top')]: fixedTop,
      [(0, _bootstrapUtils.prefix)(bsProps, 'fixed-bottom')]: fixedBottom,
      [(0, _bootstrapUtils.prefix)(bsProps, 'static-top')]: staticTop
    };
    return _react.default.createElement(Component, _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), _react.default.createElement(_Grid.default, {
      fluid: fluid
    }, children));
  }

}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;
Navbar.childContextTypes = childContextTypes;
(0, _bootstrapUtils.bsClass)('navbar', Navbar);
const UncontrollableNavbar = (0, _uncontrollable.default)(Navbar, {
  expanded: 'onToggle'
});

function createSimpleWrapper(tag, suffix, displayName) {
  const Wrapper = ({
    componentClass: Component,
    className,
    pullRight,
    pullLeft,
    ...props
  }, {
    $bs_navbar: navbarProps = {
      bsClass: 'navbar'
    }
  }) => _react.default.createElement(Component, _extends({}, props, {
    className: (0, _classnames.default)(className, (0, _bootstrapUtils.prefix)(navbarProps, suffix), pullRight && (0, _bootstrapUtils.prefix)(navbarProps, 'right'), pullLeft && (0, _bootstrapUtils.prefix)(navbarProps, 'left'))
  }));

  Wrapper.displayName = displayName;
  Wrapper.propTypes = {
    componentClass: _elementType.default,
    pullRight: _propTypes.default.bool,
    pullLeft: _propTypes.default.bool
  };
  Wrapper.defaultProps = {
    componentClass: tag,
    pullRight: false,
    pullLeft: false
  };
  Wrapper.contextTypes = {
    $bs_navbar: _propTypes.default.shape({
      bsClass: _propTypes.default.string
    })
  };
  return Wrapper;
}

UncontrollableNavbar.Brand = _NavbarBrand.default;
UncontrollableNavbar.Header = _NavbarHeader.default;
UncontrollableNavbar.Toggle = _NavbarToggle.default;
UncontrollableNavbar.Collapse = _NavbarCollapse.default;
UncontrollableNavbar.Form = createSimpleWrapper('div', 'form', 'NavbarForm');
UncontrollableNavbar.Text = createSimpleWrapper('p', 'text', 'NavbarText');
UncontrollableNavbar.Link = createSimpleWrapper('a', 'link', 'NavbarLink'); // Set bsStyles here so they can be overridden.

var _default = (0, _bootstrapUtils.bsStyles)([_StyleConfig.Style.DEFAULT, _StyleConfig.Style.INVERSE], _StyleConfig.Style.DEFAULT, UncontrollableNavbar);

exports.default = _default;
module.exports = exports["default"];