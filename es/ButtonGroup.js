"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _all = _interopRequireDefault(require("prop-types-extra/lib/all"));

var _Button = _interopRequireDefault(require("./Button"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  vertical: _propTypes.default.bool,
  justified: _propTypes.default.bool,

  /**
   * Display block buttons; only useful when used with the "vertical" prop.
   * @type {bool}
   */
  block: (0, _all.default)(_propTypes.default.bool, ({
    block,
    vertical
  }) => block && !vertical ? new Error('`block` requires `vertical` to be set to have any effect') : null)
};
const defaultProps = {
  block: false,
  justified: false,
  vertical: false
};

class ButtonGroup extends _react.default.Component {
  render() {
    const {
      block,
      justified,
      vertical,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      [(0, _bootstrapUtils.prefix)(bsProps)]: !vertical,
      [(0, _bootstrapUtils.prefix)(bsProps, 'vertical')]: vertical,
      [(0, _bootstrapUtils.prefix)(bsProps, 'justified')]: justified,
      // this is annoying, since the class is `btn-block` not `btn-group-block`
      [(0, _bootstrapUtils.prefix)(_Button.default.defaultProps, 'block')]: block
    };
    return _react.default.createElement("div", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }));
  }

}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('btn-group', ButtonGroup);

exports.default = _default;