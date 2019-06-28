"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _PanelCollapse = _interopRequireDefault(require("./PanelCollapse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * A convenience prop that renders a Collapse component around the Body for
   * situations when the parent Panel only contains a single Panel.Body child.
   *
   * renders:
   * ```jsx
   * <Panel.Collapse>
   *  <Panel.Body />
   * </Panel.Collapse>
   * ```
   */
  collapsible: _propTypes.default.bool.isRequired
};
const defaultProps = {
  collapsible: false
};
const contextTypes = {
  $bs_panel: _propTypes.default.shape({
    bsClass: _propTypes.default.string
  })
};

class PanelBody extends _react.default.Component {
  render() {
    const {
      children,
      className,
      collapsible
    } = this.props;
    const {
      bsClass: _bsClass
    } = this.context.$bs_panel || {};
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsPropsAndOmit)(this.props, ['collapsible']);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    let body = _react.default.createElement("div", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, (0, _bootstrapUtils.prefix)(bsProps, 'body'))
    }), children);

    if (collapsible) {
      body = _react.default.createElement(_PanelCollapse.default, null, body);
    }

    return body;
  }

}

PanelBody.propTypes = propTypes;
PanelBody.defaultProps = defaultProps;
PanelBody.contextTypes = contextTypes;

var _default = (0, _bootstrapUtils.bsClass)('panel', PanelBody);

exports.default = _default;
module.exports = exports["default"];