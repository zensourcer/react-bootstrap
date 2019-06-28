"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PaginationItem;
exports.Last = exports.Next = exports.Ellipsis = exports.Prev = exports.First = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _SafeAnchor = _interopRequireDefault(require("./SafeAnchor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  eventKey: _propTypes.default.any,
  className: _propTypes.default.string,
  onSelect: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  active: _propTypes.default.bool,
  activeLabel: _propTypes.default.string.isRequired
};
const defaultProps = {
  active: false,
  disabled: false,
  activeLabel: '(current)'
};

function PaginationItem({
  active,
  disabled,
  className,
  style,
  activeLabel,
  children,
  ...props
}) {
  const Component = active || disabled ? 'span' : _SafeAnchor.default;
  return _react.default.createElement("li", {
    style: style,
    className: (0, _classnames.default)(className, {
      active,
      disabled
    })
  }, _react.default.createElement(Component, _extends({
    disabled: disabled
  }, props), children, active && _react.default.createElement("span", {
    className: "sr-only"
  }, activeLabel)));
}

PaginationItem.propTypes = propTypes;
PaginationItem.defaultProps = defaultProps;

function createButton(name, defaultValue, label = name) {
  var _class, _temp;

  return _temp = _class = class extends _react.default.Component {
    render() {
      const {
        disabled,
        children,
        className,
        ...props
      } = this.props;
      const Component = disabled ? 'span' : _SafeAnchor.default;
      return _react.default.createElement("li", _extends({
        "aria-label": label,
        className: (0, _classnames.default)(className, {
          disabled
        })
      }, props), _react.default.createElement(Component, null, children || defaultValue));
    }

  }, _class.displayName = name, _class.propTypes = {
    disabled: _propTypes.default.bool
  }, _temp;
}

const First = createButton('First', '\u00ab');
exports.First = First;
const Prev = createButton('Prev', '\u2039');
exports.Prev = Prev;
const Ellipsis = createButton('Ellipsis', '\u2026', 'More');
exports.Ellipsis = Ellipsis;
const Next = createButton('Next', '\u203a');
exports.Next = Next;
const Last = createButton('Last', '\u00bb');
exports.Last = Last;