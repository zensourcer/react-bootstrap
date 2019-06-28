"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _ListGroupItem = _interopRequireDefault(require("./ListGroupItem"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * You can use a custom element type for this component.
   *
   * If not specified, it will be treated as `'li'` if every child is a
   * non-actionable `<ListGroupItem>`, and `'div'` otherwise.
   */
  componentClass: _elementType.default
};

function getDefaultComponent(children) {
  if (!children) {
    // FIXME: This is the old behavior. Is this right?
    return 'div';
  }

  if (_ValidComponentChildren.default.some(children, child => child.type !== _ListGroupItem.default || child.props.href || child.props.onClick)) {
    return 'div';
  }

  return 'ul';
}

class ListGroup extends _react.default.Component {
  render() {
    const {
      children,
      componentClass: Component = getDefaultComponent(children),
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);

    const useListItem = Component === 'ul' && _ValidComponentChildren.default.every(children, child => child.type === _ListGroupItem.default);

    return _react.default.createElement(Component, _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), useListItem ? _ValidComponentChildren.default.map(children, child => (0, _react.cloneElement)(child, {
      listItem: true
    })) : children);
  }

}

ListGroup.propTypes = propTypes;

var _default = (0, _bootstrapUtils.bsClass)('list-group', ListGroup);

exports.default = _default;
module.exports = exports["default"];