"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Button = _interopRequireDefault(require("./Button"));

var _SafeAnchor = _interopRequireDefault(require("./SafeAnchor"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  noCaret: _propTypes.default.bool,
  open: _propTypes.default.bool,
  title: _propTypes.default.string,
  useAnchor: _propTypes.default.bool
};
const defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle'
};

class DropdownToggle extends _react.default.Component {
  render() {
    const {
      noCaret,
      open,
      useAnchor,
      bsClass,
      className,
      children,
      ...props
    } = this.props;
    delete props.bsRole;
    const Component = useAnchor ? _SafeAnchor.default : _Button.default;
    const useCaret = !noCaret; // This intentionally forwards bsSize and bsStyle (if set) to the
    // underlying component, to allow it to render size and style variants.
    // FIXME: Should this really fall back to `title` as children?

    return _react.default.createElement(Component, _extends({}, props, {
      role: "button",
      className: (0, _classnames.default)(className, bsClass),
      "aria-haspopup": true,
      "aria-expanded": open
    }), children || props.title, useCaret && ' ', useCaret && _react.default.createElement("span", {
      className: "caret"
    }));
  }

}

DropdownToggle.propTypes = propTypes;
DropdownToggle.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('dropdown-toggle', DropdownToggle);

exports.default = _default;