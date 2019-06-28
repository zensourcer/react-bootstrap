"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _capitalize = _interopRequireDefault(require("./utils/capitalize"));

var _StyleConfig = require("./utils/StyleConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  componentClass: _elementType.default,

  /**
   * Apply clearfix
   *
   * on Extra small devices Phones
   *
   * adds class `visible-xs-block`
   */
  visibleXsBlock: _propTypes.default.bool,

  /**
   * Apply clearfix
   *
   * on Small devices Tablets
   *
   * adds class `visible-sm-block`
   */
  visibleSmBlock: _propTypes.default.bool,

  /**
   * Apply clearfix
   *
   * on Medium devices Desktops
   *
   * adds class `visible-md-block`
   */
  visibleMdBlock: _propTypes.default.bool,

  /**
   * Apply clearfix
   *
   * on Large devices Desktops
   *
   * adds class `visible-lg-block`
   */
  visibleLgBlock: _propTypes.default.bool
};
const defaultProps = {
  componentClass: 'div'
};

class Clearfix extends _react.default.Component {
  render() {
    const {
      componentClass: Component,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);

    _StyleConfig.DEVICE_SIZES.forEach(size => {
      const propName = `visible${(0, _capitalize.default)(size)}Block`;

      if (elementProps[propName]) {
        classes[`visible-${size}-block`] = true;
      }

      delete elementProps[propName];
    });

    return _react.default.createElement(Component, _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

Clearfix.propTypes = propTypes;
Clearfix.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('clearfix', Clearfix);

exports.default = _default;
module.exports = exports["default"];