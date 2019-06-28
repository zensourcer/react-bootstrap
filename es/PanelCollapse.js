"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _Collapse = _interopRequireDefault(require("./Collapse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
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
  onExited: _propTypes.default.func
};
const contextTypes = {
  $bs_panel: _propTypes.default.shape({
    headingId: _propTypes.default.string,
    bodyId: _propTypes.default.string,
    bsClass: _propTypes.default.string,
    expanded: _propTypes.default.bool
  })
};

class PanelCollapse extends _react.default.Component {
  render() {
    const {
      children
    } = this.props;
    const {
      headingId,
      bodyId,
      bsClass: _bsClass,
      expanded
    } = this.context.$bs_panel || {};
    const [bsProps, props] = (0, _bootstrapUtils.splitBsProps)(this.props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (headingId && bodyId) {
      props.id = bodyId;
      props.role = props.role || 'tabpanel';
      props['aria-labelledby'] = headingId;
    }

    return _react.default.createElement(_Collapse.default, _extends({
      in: expanded
    }, props), _react.default.createElement("div", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'collapse')
    }, children));
  }

}

PanelCollapse.propTypes = propTypes;
PanelCollapse.contextTypes = contextTypes;

var _default = (0, _bootstrapUtils.bsClass)('panel', PanelCollapse);

exports.default = _default;