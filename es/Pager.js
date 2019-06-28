"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _PagerItem = _interopRequireDefault(require("./PagerItem"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  onSelect: _propTypes.default.func
};

class Pager extends _react.default.Component {
  render() {
    const {
      onSelect,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react.default.createElement("ul", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), _ValidComponentChildren.default.map(children, child => (0, _react.cloneElement)(child, {
      onSelect: (0, _createChainedFunction.default)(child.props.onSelect, onSelect)
    })));
  }

}

Pager.propTypes = propTypes;
Pager.Item = _PagerItem.default;

var _default = (0, _bootstrapUtils.bsClass)('pager', Pager);

exports.default = _default;