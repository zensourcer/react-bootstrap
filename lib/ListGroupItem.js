"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const propTypes = {
  active: _propTypes.default.any,
  disabled: _propTypes.default.any,
  header: _propTypes.default.node,
  listItem: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  href: _propTypes.default.string,
  type: _propTypes.default.string
};
const defaultProps = {
  listItem: false
};

class ListGroupItem extends _react.default.Component {
  renderHeader(header, headingClassName) {
    if (_react.default.isValidElement(header)) {
      return (0, _react.cloneElement)(header, {
        className: (0, _classnames.default)(header.props.className, headingClassName)
      });
    }

    return _react.default.createElement("h4", {
      className: headingClassName
    }, header);
  }

  render() {
    const {
      active,
      disabled,
      className,
      header,
      listItem,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      active,
      disabled
    };
    let Component;

    if (elementProps.href) {
      Component = 'a';
    } else if (elementProps.onClick) {
      Component = 'button';
      elementProps.type = elementProps.type || 'button';
    } else if (listItem) {
      Component = 'li';
    } else {
      Component = 'span';
    }

    elementProps.className = (0, _classnames.default)(className, classes); // TODO: Deprecate `header` prop.

    if (header) {
      return _react.default.createElement(Component, elementProps, this.renderHeader(header, (0, _bootstrapUtils.prefix)(bsProps, 'heading')), _react.default.createElement("p", {
        className: (0, _bootstrapUtils.prefix)(bsProps, 'text')
      }, children));
    }

    return _react.default.createElement(Component, elementProps, children);
  }

}

ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('list-group-item', (0, _bootstrapUtils.bsStyles)(Object.values(_StyleConfig.State), ListGroupItem));

exports.default = _default;
module.exports = exports["default"];