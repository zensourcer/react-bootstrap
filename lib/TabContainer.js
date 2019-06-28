"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TAB = 'tab';
const PANE = 'pane';

const idPropType = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]);

const propTypes = {
  /**
   * HTML id attribute, required if no `generateChildId` prop
   * is specified.
   */
  id(props, ...args) {
    let error = null;

    if (!props.generateChildId) {
      error = idPropType(props, ...args);

      if (!error && !props.id) {
        error = new Error('In order to properly initialize Tabs in a way that is accessible ' + 'to assistive technologies (such as screen readers) an `id` or a ' + '`generateChildId` prop to TabContainer is required');
      }
    }

    return error;
  },

  /**
   * A function that takes an `eventKey` and `type` and returns a unique id for
   * child tab `<NavItem>`s and `<TabPane>`s. The function _must_ be a pure
   * function, meaning it should always return the _same_ id for the same set
   * of inputs. The default value requires that an `id` to be set for the
   * `<TabContainer>`.
   *
   * The `type` argument will either be `"tab"` or `"pane"`.
   *
   * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
   */
  generateChildId: _propTypes.default.func,

  /**
   * A callback fired when a tab is selected.
   *
   * @controllable activeKey
   */
  onSelect: _propTypes.default.func,

  /**
   * The `eventKey` of the currently active tab.
   *
   * @controllable onSelect
   */
  activeKey: _propTypes.default.any
};
const childContextTypes = {
  $bs_tabContainer: _propTypes.default.shape({
    activeKey: _propTypes.default.any,
    onSelect: _propTypes.default.func.isRequired,
    getTabId: _propTypes.default.func.isRequired,
    getPaneId: _propTypes.default.func.isRequired
  })
};

class TabContainer extends _react.default.Component {
  getChildContext() {
    const {
      activeKey,
      onSelect,
      generateChildId,
      id
    } = this.props;

    const getId = generateChildId || ((key, type) => id ? `${id}-${type}-${key}` : null);

    return {
      $bs_tabContainer: {
        activeKey,
        onSelect,
        getTabId: key => getId(key, TAB),
        getPaneId: key => getId(key, PANE)
      }
    };
  }

  render() {
    const {
      children,
      ...props
    } = this.props;
    delete props.generateChildId;
    delete props.onSelect;
    delete props.activeKey;
    return _react.default.cloneElement(_react.default.Children.only(children), props);
  }

}

TabContainer.propTypes = propTypes;
TabContainer.childContextTypes = childContextTypes;

var _default = (0, _uncontrollable.default)(TabContainer, {
  activeKey: 'onSelect'
});

exports.default = _default;
module.exports = exports["default"];