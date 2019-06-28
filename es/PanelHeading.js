"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _elementType = _interopRequireDefault(require("react-prop-types/lib/elementType"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  componentClass: _elementType.default
};
const defaultProps = {
  componentClass: 'div'
};
const contextTypes = {
  $bs_panel: _propTypes.default.shape({
    headingId: _propTypes.default.string,
    bsClass: _propTypes.default.string
  })
};

class PanelHeading extends _react.default.Component {
  render() {
    const {
      children,
      className,
      componentClass: Component,
      ...props
    } = this.props;
    const {
      headingId,
      bsClass: _bsClass
    } = this.context.$bs_panel || {};
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (headingId) {
      elementProps.role = elementProps.role || 'tab';
      elementProps.id = headingId;
    }

    return _react.default.createElement(Component, _extends({}, elementProps, {
      className: (0, _classnames.default)(className, (0, _bootstrapUtils.prefix)(bsProps, 'heading'))
    }), children);
  }

}

PanelHeading.propTypes = propTypes;
PanelHeading.defaultProps = defaultProps;
PanelHeading.contextTypes = contextTypes;

var _default = (0, _bootstrapUtils.bsClass)('panel', PanelHeading);

exports.default = _default;