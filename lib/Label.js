"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Label extends _react.default.Component {
  hasContent(children) {
    let result = false;

    _react.default.Children.forEach(children, child => {
      if (result) {
        return;
      }

      if (child || child === 0) {
        result = true;
      }
    });

    return result;
  }

  render() {
    const {
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      // Hack for collapsing on IE8.
      hidden: !this.hasContent(children)
    };
    return _react.default.createElement("span", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), children);
  }

}

var _default = (0, _bootstrapUtils.bsClass)('label', (0, _bootstrapUtils.bsStyles)([...Object.values(_StyleConfig.State), _StyleConfig.Style.DEFAULT, _StyleConfig.Style.PRIMARY], _StyleConfig.Style.DEFAULT, Label));

exports.default = _default;
module.exports = exports["default"];