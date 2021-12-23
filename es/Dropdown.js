"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _activeElement = _interopRequireDefault(require("dom-helpers/activeElement"));

var _contains = _interopRequireDefault(require("dom-helpers/query/contains"));

var _keycode = _interopRequireDefault(require("keycode"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _all = _interopRequireDefault(require("prop-types-extra/lib/all"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _isRequiredForA11y = _interopRequireDefault(require("prop-types-extra/lib/isRequiredForA11y"));

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _warning = _interopRequireDefault(require("warning"));

var _ButtonGroup = _interopRequireDefault(require("./ButtonGroup"));

var _DropdownMenu = _interopRequireDefault(require("./DropdownMenu"));

var _DropdownToggle = _interopRequireDefault(require("./DropdownToggle"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

var _PropTypes = require("./utils/PropTypes");

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const TOGGLE_ROLE = _DropdownToggle.default.defaultProps.bsRole;
const MENU_ROLE = _DropdownMenu.default.defaultProps.bsRole;
const propTypes = {
  /**
   * The menu will open above the dropdown button, instead of below it.
   */
  dropup: _propTypes.default.bool,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: (0, _isRequiredForA11y.default)(_propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number])),
  componentClass: _elementType.default,

  /**
   * The children of a Dropdown may be a `<Dropdown.Toggle>` or a `<Dropdown.Menu>`.
   * @type {node}
   */
  children: (0, _all.default)((0, _PropTypes.requiredRoles)(TOGGLE_ROLE, MENU_ROLE), (0, _PropTypes.exclusiveRoles)(MENU_ROLE)),

  /**
   * Whether or not component is disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  pullRight: _propTypes.default.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  open: _propTypes.default.bool,
  defaultOpen: _propTypes.default.bool,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `open` value, the DOM event, and the source that fired it: `'click'`,`'keydown'`,`'rootClose'`, or `'select'`.
   *
   * ```js
   * function(Boolean isOpen, Object event, { String source }) {}
   * ```
   * @controllable open
   */
  onToggle: _propTypes.default.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: _propTypes.default.func,

  /**
   * If `'menuitem'`, causes the dropdown to behave like a menu item rather than
   * a menu button.
   */
  role: _propTypes.default.string,

  /**
   * Which event when fired outside the component will cause it to be closed
   *
   * *Note: For custom dropdown components, you will have to pass the
   * `rootCloseEvent` to `<RootCloseWrapper>` in your custom dropdown menu
   * component ([similarly to how it is implemented in `<Dropdown.Menu>`](https://github.com/react-bootstrap/react-bootstrap/blob/v0.31.5/src/DropdownMenu.js#L115-L119)).*
   */
  rootCloseEvent: _propTypes.default.oneOf(['click', 'mousedown']),

  /**
   * @private
   */
  onMouseEnter: _propTypes.default.func,

  /**
   * @private
   */
  onMouseLeave: _propTypes.default.func
};
const defaultProps = {
  componentClass: _ButtonGroup.default
};

class Dropdown extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this._focusInDropdown = false;
    this.lastOpenEventType = null;
  }

  componentDidMount() {
    this.focusNextOnOpen();
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (!nextProps.open && this.props.open) {
      this._focusInDropdown = (0, _contains.default)(_reactDom.default.findDOMNode(this.menu), (0, _activeElement.default)(document));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      open
    } = this.props;
    const prevOpen = prevProps.open;

    if (open && !prevOpen) {
      this.focusNextOnOpen();
    }

    if (!open && prevOpen) {
      // if focus hasn't already moved from the menu let's return it
      // to the toggle
      if (this._focusInDropdown) {
        this._focusInDropdown = false;
        this.focus();
      }
    }
  }

  focus() {
    const toggle = _reactDom.default.findDOMNode(this.toggle);

    if (toggle && toggle.focus) {
      toggle.focus();
    }
  }

  focusNextOnOpen() {
    const menu = this.menu;

    if (!menu || !menu.focusNext) {
      return;
    }

    if (this.lastOpenEventType === 'keydown' || this.props.role === 'menuitem') {
      menu.focusNext();
    }
  }

  handleClick(event) {
    if (this.props.disabled) {
      return;
    }

    this.toggleOpen(event, {
      source: 'click'
    });
  }

  handleClose(event, eventDetails) {
    if (!this.props.open) {
      return;
    }

    this.toggleOpen(event, eventDetails);
  }

  handleKeyDown(event) {
    if (this.props.disabled) {
      return;
    }

    switch (event.keyCode) {
      case _keycode.default.codes.down:
        if (!this.props.open) {
          this.toggleOpen(event, {
            source: 'keydown'
          });
        } else if (this.menu.focusNext) {
          this.menu.focusNext();
        }

        event.preventDefault();
        break;

      case _keycode.default.codes.esc:
      case _keycode.default.codes.tab:
        this.handleClose(event, {
          source: 'keydown'
        });
        break;

      default:
    }
  }

  toggleOpen(event, eventDetails) {
    let open = !this.props.open;

    if (open) {
      this.lastOpenEventType = eventDetails.source;
    }

    if (this.props.onToggle) {
      this.props.onToggle(open, event, eventDetails);
    }
  }

  renderMenu(child, {
    id,
    onSelect,
    rootCloseEvent,
    ...props
  }) {
    let ref = c => {
      this.menu = c;
    };

    if (typeof child.ref === 'string') {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'String refs are not supported on `<Dropdown.Menu>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute') : void 0;
    } else {
      ref = (0, _createChainedFunction.default)(child.ref, ref);
    }

    return (0, _react.cloneElement)(child, { ...props,
      ref,
      labelledBy: id,
      bsClass: (0, _bootstrapUtils.prefix)(props, 'menu'),
      onClose: (0, _createChainedFunction.default)(child.props.onClose, this.handleClose),
      onSelect: (0, _createChainedFunction.default)(child.props.onSelect, onSelect, (key, event) => this.handleClose(event, {
        source: 'select'
      })),
      rootCloseEvent
    });
  }

  renderToggle(child, props) {
    let ref = c => {
      this.toggle = c;
    };

    if (typeof child.ref === 'string') {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(false, 'String refs are not supported on `<Dropdown.Toggle>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute') : void 0;
    } else {
      ref = (0, _createChainedFunction.default)(child.ref, ref);
    }

    return (0, _react.cloneElement)(child, { ...props,
      ref,
      bsClass: (0, _bootstrapUtils.prefix)(props, 'toggle'),
      onClick: (0, _createChainedFunction.default)(child.props.onClick, this.handleClick),
      onKeyDown: (0, _createChainedFunction.default)(child.props.onKeyDown, this.handleKeyDown)
    });
  }

  render() {
    const {
      componentClass: Component,
      id,
      dropup,
      disabled,
      pullRight,
      open,
      onSelect,
      role,
      bsClass,
      className,
      rootCloseEvent,
      children,
      ...props
    } = this.props;
    delete props.onToggle;
    const classes = {
      [bsClass]: true,
      open,
      disabled
    };

    if (dropup) {
      classes[bsClass] = false;
      classes.dropup = true;
    } // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.


    return _react.default.createElement(Component, _extends({}, props, {
      className: (0, _classnames.default)(className, classes)
    }), _ValidComponentChildren.default.map(children, child => {
      switch (child.props.bsRole) {
        case TOGGLE_ROLE:
          return this.renderToggle(child, {
            id,
            disabled,
            open,
            role,
            bsClass
          });

        case MENU_ROLE:
          return this.renderMenu(child, {
            id,
            open,
            pullRight,
            bsClass,
            onSelect,
            rootCloseEvent
          });

        default:
          return child;
      }
    }));
  }

}

Dropdown.propTypes = propTypes;
Dropdown.defaultProps = defaultProps;
(0, _bootstrapUtils.bsClass)('dropdown', Dropdown);
const UncontrolledDropdown = (0, _uncontrollable.default)(Dropdown, {
  open: 'onToggle'
});
UncontrolledDropdown.Toggle = _DropdownToggle.default;
UncontrolledDropdown.Menu = _DropdownMenu.default;
var _default = UncontrolledDropdown;
exports.default = _default;