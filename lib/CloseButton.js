"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const propTypes = {
  label: _propTypes.default.string.isRequired,
  onClick: _propTypes.default.func
};
const defaultProps = {
  label: 'Close'
};

class CloseButton extends _react.default.Component {
  render() {
    const {
      label,
      onClick
    } = this.props;
    return _react.default.createElement("button", {
      type: "button",
      className: "close",
      onClick: onClick
    }, _react.default.createElement("span", {
      "aria-hidden": "true"
    }, "\xD7"), _react.default.createElement("span", {
      className: "sr-only"
    }, label));
  }

}

CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;
var _default = CloseButton;
exports.default = _default;
module.exports = exports["default"];