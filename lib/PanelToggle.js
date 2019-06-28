"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _elementType = _interopRequireDefault(require("react-prop-types/lib/elementType"));

var _SafeAnchor = _interopRequireDefault(require("./SafeAnchor"));

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const propTypes = {
  /**
   * only here to satisfy linting, just the html onClick handler.
   *
   * @private
   */
  onClick: _propTypes.default.func,

  /**
   * You can use a custom element for this component
   */
  componentClass: _elementType.default
};
const defaultProps = {
  componentClass: _SafeAnchor.default
};
const contextTypes = {
  $bs_panel: _propTypes.default.shape({
    bodyId: _propTypes.default.string,
    onToggle: _propTypes.default.func,
    expanded: _propTypes.default.bool
  })
};

class PanelToggle extends _react.default.Component {
  constructor(...args) {
    super(...args);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    const {
      onToggle
    } = this.context.$bs_panel || {};

    if (onToggle) {
      onToggle(event);
    }
  }

  render() {
    const {
      onClick,
      className,
      componentClass,
      ...props
    } = this.props;
    const {
      expanded,
      bodyId
    } = this.context.$bs_panel || {};
    const Component = componentClass;
    props.onClick = (0, _createChainedFunction.default)(onClick, this.handleToggle);
    props['aria-expanded'] = expanded;
    props.className = (0, _classnames.default)(className, !expanded && 'collapsed');

    if (bodyId) {
      props['aria-controls'] = bodyId;
    }

    return _react.default.createElement(Component, props);
  }

}

PanelToggle.propTypes = propTypes;
PanelToggle.defaultProps = defaultProps;
PanelToggle.contextTypes = contextTypes;
var _default = PanelToggle;
exports.default = _default;
module.exports = exports["default"];