"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _MediaBody = _interopRequireDefault(require("./MediaBody"));

var _MediaHeading = _interopRequireDefault(require("./MediaHeading"));

var _MediaLeft = _interopRequireDefault(require("./MediaLeft"));

var _MediaList = _interopRequireDefault(require("./MediaList"));

var _MediaListItem = _interopRequireDefault(require("./MediaListItem"));

var _MediaRight = _interopRequireDefault(require("./MediaRight"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  componentClass: _elementType.default
};
const defaultProps = {
  componentClass: 'div'
};

class Media extends _react.default.Component {
  render() {
    const {
      componentClass: Component,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react.default.createElement(Component, _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

Media.propTypes = propTypes;
Media.defaultProps = defaultProps;
Media.Heading = _MediaHeading.default;
Media.Body = _MediaBody.default;
Media.Left = _MediaLeft.default;
Media.Right = _MediaRight.default;
Media.List = _MediaList.default;
Media.ListItem = _MediaListItem.default;

var _default = (0, _bootstrapUtils.bsClass)('media', Media);

exports.default = _default;