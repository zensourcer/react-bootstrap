"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SafeAnchor = _interopRequireDefault(require("./SafeAnchor"));

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = {
  disabled: _propTypes.default.bool,
  previous: _propTypes.default.bool,
  next: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  eventKey: _propTypes.default.any
};
const defaultProps = {
  disabled: false,
  previous: false,
  next: false
};

class PagerItem extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    const {
      disabled,
      onSelect,
      eventKey
    } = this.props;

    if (disabled) {
      e.preventDefault();
      return;
    }

    if (onSelect) {
      onSelect(eventKey, e);
    }
  }

  render() {
    const {
      disabled,
      previous,
      next,
      onClick,
      className,
      style,
      ...props
    } = this.props;
    delete props.onSelect;
    delete props.eventKey;
    return _react.default.createElement("li", {
      className: (0, _classnames.default)(className, {
        disabled,
        previous,
        next
      }),
      style: style
    }, _react.default.createElement(_SafeAnchor.default, _extends({}, props, {
      disabled: disabled,
      onClick: (0, _createChainedFunction.default)(onClick, this.handleSelect)
    })));
  }

}

PagerItem.propTypes = propTypes;
PagerItem.defaultProps = defaultProps;
var _default = PagerItem;
exports.default = _default;