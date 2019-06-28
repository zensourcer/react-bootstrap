"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SafeAnchor = _interopRequireDefault(require("./SafeAnchor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * If set to true, renders `span` instead of `a`
   */
  active: _propTypes.default.bool,

  /**
   * `href` attribute for the inner `a` element
   */
  href: _propTypes.default.string,

  /**
   * `title` attribute for the inner `a` element
   */
  title: _propTypes.default.node,

  /**
   * `target` attribute for the inner `a` element
   */
  target: _propTypes.default.string
};
const defaultProps = {
  active: false
};

class BreadcrumbItem extends _react.default.Component {
  render() {
    const {
      active,
      href,
      title,
      target,
      className,
      ...props
    } = this.props; // Don't try to render these props on non-active <span>.

    const linkProps = {
      href,
      title,
      target
    };
    return _react.default.createElement("li", {
      className: (0, _classnames.default)(className, {
        active
      })
    }, active ? _react.default.createElement("span", props) : _react.default.createElement(_SafeAnchor.default, _extends({}, props, linkProps)));
  }

}

BreadcrumbItem.propTypes = propTypes;
BreadcrumbItem.defaultProps = defaultProps;
var _default = BreadcrumbItem;
exports.default = _default;
module.exports = exports["default"];