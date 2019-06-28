"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _elementType = _interopRequireDefault(require("react-prop-types/lib/elementType"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _PanelToggle = _interopRequireDefault(require("./PanelToggle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  componentClass: _elementType.default,

  /**
   * A convenience prop that renders the Panel.Title as a panel collapse toggle component
   * for the common use-case.
   */
  toggle: _propTypes.default.bool
};
const contextTypes = {
  $bs_panel: _propTypes.default.shape({
    bsClass: _propTypes.default.string
  })
};
const defaultProps = {
  componentClass: 'div'
};

class PanelTitle extends _react.default.Component {
  render() {
    let {
      children,
      className,
      toggle,
      componentClass: Component,
      ...props
    } = this.props;
    const {
      bsClass: _bsClass
    } = this.context.$bs_panel || {};
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (toggle) {
      children = _react.default.createElement(_PanelToggle.default, null, children);
    }

    return _react.default.createElement(Component, _extends({}, elementProps, {
      className: (0, _classnames.default)(className, (0, _bootstrapUtils.prefix)(bsProps, 'title'))
    }), children);
  }

}

PanelTitle.propTypes = propTypes;
PanelTitle.defaultProps = defaultProps;
PanelTitle.contextTypes = contextTypes;

var _default = (0, _bootstrapUtils.bsClass)('panel', PanelTitle);

exports.default = _default;