"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _keycode = _interopRequireDefault(require("keycode"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _all = _interopRequireDefault(require("prop-types-extra/lib/all"));

var _warning = _interopRequireDefault(require("warning"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// TODO: Should we expose `<NavItem>` as `<Nav.Item>`?
// TODO: This `bsStyle` is very unlike the others. Should we rename it?
// TODO: `pullRight` and `pullLeft` don't render right outside of `navbar`.
// Consider renaming or replacing them.
const propTypes = {
  /**
   * Marks the NavItem with a matching `eventKey` as active. Has a
   * higher precedence over `activeHref`.
   */
  activeKey: _propTypes.default.any,

  /**
   * Marks the child NavItem with a matching `href` prop as active.
   */
  activeHref: _propTypes.default.string,

  /**
   * NavItems are be positioned vertically.
   */
  stacked: _propTypes.default.bool,
  justified: (0, _all.default)(_propTypes.default.bool, ({
    justified,
    navbar
  }) => justified && navbar ? Error('justified navbar `Nav`s are not supported') : null),

  /**
   * A callback fired when a NavItem is selected.
   *
   * ```js
   * function (
   *  Any eventKey,
   *  SyntheticEvent event?
   * )
   * ```
   */
  onSelect: _propTypes.default.func,

  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "tablist" NavItem focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role: _propTypes.default.string,

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: _propTypes.default.bool,

  /**
   * Float the Nav to the right. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullRight: _propTypes.default.bool,

  /**
   * Float the Nav to the left. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullLeft: _propTypes.default.bool
};
const defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false
};
const contextTypes = {
  $bs_navbar: _propTypes.default.shape({
    bsClass: _propTypes.default.string,
    onSelect: _propTypes.default.func
  }),
  $bs_tabContainer: _propTypes.default.shape({
    activeKey: _propTypes.default.any,
    onSelect: _propTypes.default.func.isRequired,
    getTabId: _propTypes.default.func.isRequired,
    getPaneId: _propTypes.default.func.isRequired
  })
};

class Nav extends _react.default.Component {
  componentDidUpdate() {
    if (!this._needsRefocus) {
      return;
    }

    this._needsRefocus = false;
    const {
      children
    } = this.props;
    const {
      activeKey,
      activeHref
    } = this.getActiveProps();

    const activeChild = _ValidComponentChildren.default.find(children, child => this.isActive(child, activeKey, activeHref));

    const childrenArray = _ValidComponentChildren.default.toArray(children);

    const activeChildIndex = childrenArray.indexOf(activeChild);

    const childNodes = _reactDom.default.findDOMNode(this).children;

    const activeNode = childNodes && childNodes[activeChildIndex];

    if (!activeNode || !activeNode.firstChild) {
      return;
    }

    activeNode.firstChild.focus();
  }

  getActiveProps() {
    const tabContainer = this.context.$bs_tabContainer;

    if (tabContainer) {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(this.props.activeKey == null && !this.props.activeHref, 'Specifying a `<Nav>` `activeKey` or `activeHref` in the context of ' + 'a `<TabContainer>` is not supported. Instead use `<TabContainer ' + `activeKey={${this.props.activeKey}} />\`.`) : void 0;
      return tabContainer;
    }

    return this.props;
  }

  getNextActiveChild(offset) {
    const {
      children
    } = this.props;
    const validChildren = children.filter(child => child.props.eventKey != null && !child.props.disabled);
    const {
      activeKey,
      activeHref
    } = this.getActiveProps();

    const activeChild = _ValidComponentChildren.default.find(children, child => this.isActive(child, activeKey, activeHref)); // This assumes the active child is not disabled.


    const activeChildIndex = validChildren.indexOf(activeChild);

    if (activeChildIndex === -1) {
      // Something has gone wrong. Select the first valid child we can find.
      return validChildren[0];
    }

    let nextIndex = activeChildIndex + offset;
    const numValidChildren = validChildren.length;

    if (nextIndex >= numValidChildren) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = numValidChildren - 1;
    }

    return validChildren[nextIndex];
  }

  getTabProps(child, tabContainer, navRole, active, onSelect) {
    if (!tabContainer && navRole !== 'tablist') {
      // No tab props here.
      return null;
    }

    let {
      id,
      'aria-controls': controls,
      eventKey,
      role,
      onKeyDown,
      tabIndex
    } = child.props;

    if (tabContainer) {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(!id && !controls, 'In the context of a `<TabContainer>`, `<NavItem>`s are given ' + 'generated `id` and `aria-controls` attributes for the sake of ' + 'proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly, provide a `generateChildId` ' + 'prop to the parent `<TabContainer>`.') : void 0;
      id = tabContainer.getTabId(eventKey);
      controls = tabContainer.getPaneId(eventKey);
    }

    if (navRole === 'tablist') {
      role = role || 'tab';
      onKeyDown = (0, _createChainedFunction.default)(event => this.handleTabKeyDown(onSelect, event), onKeyDown);
      tabIndex = active ? tabIndex : -1;
    }

    return {
      id,
      role,
      onKeyDown,
      'aria-controls': controls,
      tabIndex
    };
  }

  handleTabKeyDown(onSelect, event) {
    let nextActiveChild;

    switch (event.keyCode) {
      case _keycode.default.codes.left:
      case _keycode.default.codes.up:
        nextActiveChild = this.getNextActiveChild(-1);
        break;

      case _keycode.default.codes.right:
      case _keycode.default.codes.down:
        nextActiveChild = this.getNextActiveChild(1);
        break;

      default:
        // It was a different key; don't handle this keypress.
        return;
    }

    event.preventDefault();

    if (onSelect && nextActiveChild && nextActiveChild.props.eventKey != null) {
      onSelect(nextActiveChild.props.eventKey);
    }

    this._needsRefocus = true;
  }

  isActive({
    props
  }, activeKey, activeHref) {
    if (props.active || activeKey != null && props.eventKey === activeKey || activeHref && props.href === activeHref) {
      return true;
    }

    return props.active;
  }

  render() {
    const {
      stacked,
      justified,
      onSelect,
      role: propsRole,
      navbar: propsNavbar,
      pullRight,
      pullLeft,
      className,
      children,
      ...props
    } = this.props;
    const tabContainer = this.context.$bs_tabContainer;
    const role = propsRole || (tabContainer ? 'tablist' : null);
    const {
      activeKey,
      activeHref
    } = this.getActiveProps();
    delete props.activeKey; // Accessed via this.getActiveProps().

    delete props.activeHref; // Accessed via this.getActiveProps().

    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      [(0, _bootstrapUtils.prefix)(bsProps, 'stacked')]: stacked,
      [(0, _bootstrapUtils.prefix)(bsProps, 'justified')]: justified
    };
    const navbar = propsNavbar != null ? propsNavbar : this.context.$bs_navbar;
    let pullLeftClassName;
    let pullRightClassName;

    if (navbar) {
      const navbarProps = this.context.$bs_navbar || {
        bsClass: 'navbar'
      };
      classes[(0, _bootstrapUtils.prefix)(navbarProps, 'nav')] = true;
      pullRightClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'right');
      pullLeftClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'left');
    } else {
      pullRightClassName = 'pull-right';
      pullLeftClassName = 'pull-left';
    }

    classes[pullRightClassName] = pullRight;
    classes[pullLeftClassName] = pullLeft;
    return _react.default.createElement("ul", _extends({}, elementProps, {
      role: role,
      className: (0, _classnames.default)(className, classes)
    }), _ValidComponentChildren.default.map(children, child => {
      const active = this.isActive(child, activeKey, activeHref);
      const childOnSelect = (0, _createChainedFunction.default)(child.props.onSelect, onSelect, navbar && navbar.onSelect, tabContainer && tabContainer.onSelect);
      return (0, _react.cloneElement)(child, { ...this.getTabProps(child, tabContainer, role, active, childOnSelect),
        active,
        activeKey,
        activeHref,
        onSelect: childOnSelect
      });
    }));
  }

}

Nav.propTypes = propTypes;
Nav.defaultProps = defaultProps;
Nav.contextTypes = contextTypes;

var _default = (0, _bootstrapUtils.bsClass)('nav', (0, _bootstrapUtils.bsStyles)(['tabs', 'pills'], Nav));

exports.default = _default;