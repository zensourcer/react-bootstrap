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

const propTypes = {
  striped: _propTypes.default.bool,
  bordered: _propTypes.default.bool,
  condensed: _propTypes.default.bool,
  hover: _propTypes.default.bool,
  responsive: _propTypes.default.bool
};
const defaultProps = {
  bordered: false,
  condensed: false,
  hover: false,
  responsive: false,
  striped: false
};

class Table extends _react.default.Component {
  render() {
    const {
      striped,
      bordered,
      condensed,
      hover,
      responsive,
      className,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      [(0, _bootstrapUtils.prefix)(bsProps, 'striped')]: striped,
      [(0, _bootstrapUtils.prefix)(bsProps, 'bordered')]: bordered,
      [(0, _bootstrapUtils.prefix)(bsProps, 'condensed')]: condensed,
      [(0, _bootstrapUtils.prefix)(bsProps, 'hover')]: hover
    };

    const table = _react.default.createElement("table", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }));

    if (responsive) {
      return _react.default.createElement("div", {
        className: (0, _bootstrapUtils.prefix)(bsProps, 'responsive')
      }, table);
    }

    return table;
  }

}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('table', Table);

exports.default = _default;