"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

var _PropTypes = require("./utils/PropTypes");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  accordion: _propTypes.default.bool,

  /**
   * When `accordion` is enabled, `activeKey` controls the which child `Panel` is expanded. `activeKey` should
   * match a child Panel `eventKey` prop exactly.
   *
   * @controllable onSelect
   */
  activeKey: _propTypes.default.any,

  /**
   * A callback fired when a child Panel collapse state changes. It's called with the next expanded `activeKey`
   *
   * @controllable activeKey
   */
  onSelect: _propTypes.default.func,

  /**
   * An HTML role attribute
   */
  role: _propTypes.default.string,

  /**
   * A function that takes an eventKey and type and returns a
   * unique id for each Panel heading and Panel Collapse. The function _must_ be a pure function,
   * meaning it should always return the _same_ id for the same set of inputs. The default
   * value requires that an `id` to be set for the PanelGroup.
   *
   * The `type` argument will either be `"body"` or `"heading"`.
   *
   * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
   */
  generateChildId: _propTypes.default.func,

  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   */
  id: (0, _PropTypes.generatedId)('PanelGroup')
};
const defaultProps = {
  accordion: false
};
const childContextTypes = {
  $bs_panelGroup: _propTypes.default.shape({
    getId: _propTypes.default.func,
    headerRole: _propTypes.default.string,
    panelRole: _propTypes.default.string,
    activeKey: _propTypes.default.any,
    onToggle: _propTypes.default.func
  })
};

class PanelGroup extends _react.default.Component {
  constructor(...args) {
    super(...args);

    this.handleSelect = (key, expanded, e) => {
      if (expanded) {
        this.props.onSelect(key, e);
      } else if (this.props.activeKey === key) {
        this.props.onSelect(null, e);
      }
    };
  }

  getChildContext() {
    const {
      activeKey,
      accordion,
      generateChildId,
      id
    } = this.props;
    let getId = null;

    if (accordion) {
      getId = generateChildId || ((key, type) => id ? `${id}-${type}-${key}` : null);
    }

    return {
      $bs_panelGroup: {
        getId,
        headerRole: 'tab',
        panelRole: 'tabpanel',
        ...(accordion && {
          activeKey,
          onToggle: this.handleSelect
        })
      }
    };
  }

  render() {
    const {
      accordion,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['onSelect', 'activeKey']);

    if (accordion) {
      elementProps.role = elementProps.role || 'tablist';
    }

    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react.default.createElement("div", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), _ValidComponentChildren.default.map(children, child => (0, _react.cloneElement)(child, {
      bsStyle: child.props.bsStyle || bsProps.bsStyle
    })));
  }

}

PanelGroup.propTypes = propTypes;
PanelGroup.defaultProps = defaultProps;
PanelGroup.childContextTypes = childContextTypes;

var _default = (0, _uncontrollable.default)((0, _bootstrapUtils.bsClass)('panel-group', PanelGroup), {
  activeKey: 'onSelect'
});

exports.default = _default;