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

var _ValidComponentChildren = _interopRequireDefault(require("./utils/ValidComponentChildren"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ROUND_PRECISION = 1000;
/**
 * Validate that children, if any, are instances of `<ProgressBar>`.
 */

function onlyProgressBar(props, propName, componentName) {
  const children = props[propName];

  if (!children) {
    return null;
  }

  let error = null;

  _react.default.Children.forEach(children, child => {
    if (error) {
      return;
    }
    /**
     * Compare types in a way that works with libraries that patch and proxy
     * components like react-hot-loader.
     *
     * see https://github.com/gaearon/react-hot-loader#checking-element-types
     */


    const element = _react.default.createElement(ProgressBar, null);

    if (child.type === element.type) return;
    const childIdentifier = _react.default.isValidElement(child) ? child.type.displayName || child.type.name || child.type : child;
    error = new Error(`Children of ${componentName} can contain only ProgressBar ` + `components. Found ${childIdentifier}.`);
  });

  return error;
}

const propTypes = {
  min: _propTypes.default.number,
  now: _propTypes.default.number,
  max: _propTypes.default.number,
  label: _propTypes.default.node,
  srOnly: _propTypes.default.bool,
  striped: _propTypes.default.bool,
  active: _propTypes.default.bool,
  children: onlyProgressBar,

  /**
   * @private
   */
  isChild: _propTypes.default.bool
};
const defaultProps = {
  min: 0,
  max: 100,
  active: false,
  isChild: false,
  srOnly: false,
  striped: false
};

function getPercentage(now, min, max) {
  const percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}

class ProgressBar extends _react.default.Component {
  renderProgressBar({
    min,
    now,
    max,
    label,
    srOnly,
    striped,
    active,
    className,
    style,
    ...props
  }) {
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      active,
      [(0, _bootstrapUtils.prefix)(bsProps, 'striped')]: active || striped
    };
    return _react.default.createElement("div", _extends({}, elementProps, {
      role: "progressbar",
      className: (0, _classnames.default)(className, classes),
      style: {
        width: `${getPercentage(now, min, max)}%`,
        ...style
      },
      "aria-valuenow": now,
      "aria-valuemin": min,
      "aria-valuemax": max
    }), srOnly ? _react.default.createElement("span", {
      className: "sr-only"
    }, label) : label);
  }

  render() {
    const {
      isChild,
      ...props
    } = this.props;

    if (isChild) {
      return this.renderProgressBar(props);
    }

    const {
      min,
      now,
      max,
      label,
      srOnly,
      striped,
      active,
      bsClass,
      bsStyle,
      className,
      children,
      ...wrapperProps
    } = props;
    return _react.default.createElement("div", _extends({}, wrapperProps, {
      className: (0, _classnames.default)(className, 'progress')
    }), children ? _ValidComponentChildren.default.map(children, child => (0, _react.cloneElement)(child, {
      isChild: true
    })) : this.renderProgressBar({
      min,
      now,
      max,
      label,
      srOnly,
      striped,
      active,
      bsClass,
      bsStyle
    }));
  }

}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('progress-bar', (0, _bootstrapUtils.bsStyles)(Object.values(_StyleConfig.State), ProgressBar));

exports.default = _default;