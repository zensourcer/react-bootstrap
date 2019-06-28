"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// TODO: `pullRight` doesn't belong here. There's no special handling here.
const propTypes = {
  pullRight: _propTypes.default.bool
};
const defaultProps = {
  pullRight: false
};

class Badge extends _react.default.Component {
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
      pullRight,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      'pull-right': pullRight,
      // Hack for collapsing on IE8.
      hidden: !this.hasContent(children)
    };
    return _react.default.createElement("span", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), children);
  }

}

Badge.propTypes = propTypes;
Badge.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('badge', Badge);

exports.default = _default;
module.exports = exports["default"];