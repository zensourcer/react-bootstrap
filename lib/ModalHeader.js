"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _Modal = require("./Modal");

var _CloseButton = _interopRequireDefault(require("./CloseButton"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// TODO: `aria-label` should be `closeLabel`.
const propTypes = {
  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: _propTypes.default.string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: _propTypes.default.bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a Modal component, the onHide will automatically be propagated up to the
   * parent Modal `onHide`.
   */
  onHide: _propTypes.default.func
};
const defaultProps = {
  closeLabel: 'Close',
  closeButton: false
};

class ModalHeader extends _react.default.Component {
  render() {
    const {
      closeLabel,
      closeButton,
      onHide,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    const classes = (0, _bootstrapUtils.getClassSet)(bsProps);
    return _react.default.createElement(_Modal.ModalContext.Consumer, null, modal => _react.default.createElement("div", _extends({}, elementProps, {
      className: (0, _classnames.default)(className, classes)
    }), closeButton && _react.default.createElement(_CloseButton.default, {
      label: closeLabel,
      onClick: (0, _createChainedFunction.default)(modal && modal.onHide, onHide)
    }), children));
  }

}

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('modal-header', ModalHeader);

exports.default = _default;
module.exports = exports["default"];