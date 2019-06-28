"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _PaginationItem = _interopRequireWildcard(require("./PaginationItem"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Pagination extends _react.default.Component {
  render() {
    const {
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react.default.createElement("ul", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), children);
  }

}

(0, _bootstrapUtils.bsClass)('pagination', Pagination);
Pagination.First = _PaginationItem.First;
Pagination.Prev = _PaginationItem.Prev;
Pagination.Ellipsis = _PaginationItem.Ellipsis;
Pagination.Item = _PaginationItem.default;
Pagination.Next = _PaginationItem.Next;
Pagination.Last = _PaginationItem.Last;
var _default = Pagination;
exports.default = _default;
module.exports = exports["default"];