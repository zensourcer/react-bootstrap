"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: _propTypes.default.string
};

class ModalDialog extends _react.default.Component {
  render() {
    const {
      dialogClassName,
      className,
      style,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const bsClassName = (0, _bootstrapUtils.prefix)(bsProps);
    const modalStyle = {
      display: 'block',
      ...style
    };
    const dialogClasses = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      [bsClassName]: false,
      [(0, _bootstrapUtils.prefix)(bsProps, 'dialog')]: true
    };
    return _react.default.createElement("div", _extends({}, elementProps, {
      tabIndex: "-1",
      role: "dialog",
      style: modalStyle,
      className: (0, _classnames.default)(className, bsClassName)
    }), _react.default.createElement("div", {
      className: (0, _classnames.default)(dialogClassName, dialogClasses)
    }, _react.default.createElement("div", {
      className: (0, _bootstrapUtils.prefix)(bsProps, 'content'),
      role: "document"
    }, children)));
  }

}

ModalDialog.propTypes = propTypes;

var _default = (0, _bootstrapUtils.bsClass)('modal', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], ModalDialog));

exports.default = _default;
module.exports = exports["default"];