"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ModalContext = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _events = _interopRequireDefault(require("dom-helpers/events"));

var _ownerDocument = _interopRequireDefault(require("dom-helpers/ownerDocument"));

var _inDOM = _interopRequireDefault(require("dom-helpers/util/inDOM"));

var _scrollbarSize = _interopRequireDefault(require("dom-helpers/util/scrollbarSize"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _elementType = _interopRequireDefault(require("prop-types-extra/lib/elementType"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Modal = _interopRequireDefault(require("react-overlays/lib/Modal"));

var _isOverflowing = _interopRequireDefault(require("react-overlays/lib/utils/isOverflowing"));

var _Fade = _interopRequireDefault(require("./Fade"));

var _ModalBody = _interopRequireDefault(require("./ModalBody"));

var _ModalDialog = _interopRequireDefault(require("./ModalDialog"));

var _ModalFooter = _interopRequireDefault(require("./ModalFooter"));

var _ModalHeader = _interopRequireDefault(require("./ModalHeader"));

var _ModalTitle = _interopRequireDefault(require("./ModalTitle"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _createChainedFunction = _interopRequireDefault(require("./utils/createChainedFunction"));

var _splitComponentProps = _interopRequireDefault(require("./utils/splitComponentProps"));

var _StyleConfig = require("./utils/StyleConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const propTypes = { ..._Modal.default.propTypes,
  ..._ModalDialog.default.propTypes,

  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: _propTypes.default.oneOf(['static', true, false]),

  /**
   * Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in".
   */
  backdropClassName: _propTypes.default.string,

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: _propTypes.default.bool,

  /**
   * Open and close the Modal with a slide and fade animation.
   */
  animation: _propTypes.default.bool,

  /**
   * A Component type that provides the modal content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * modal component.
   */
  dialogComponentClass: _elementType.default,

  /**
   * When `true` The modal will automatically shift focus to itself when it
   * opens, and replace it to the last focused element when it closes.
   * Generally this should never be set to false as it makes the Modal less
   * accessible to assistive technologies, like screen-readers.
   */
  autoFocus: _propTypes.default.bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while
   * open. Consider leaving the default value here, as it is necessary to make
   * the Modal work well with assistive technologies, such as screen readers.
   */
  enforceFocus: _propTypes.default.bool,

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: _propTypes.default.bool,

  /**
   * When `true` The modal will show itself.
   */
  show: _propTypes.default.bool,

  /**
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onHide: _propTypes.default.func,

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: _propTypes.default.func,

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: _propTypes.default.func,

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: _propTypes.default.func,

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: _propTypes.default.func,

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: _propTypes.default.func,

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: _propTypes.default.func,

  /**
   * @private
   */
  container: _Modal.default.propTypes.container
};
const defaultProps = { ..._Modal.default.defaultProps,
  animation: true,
  dialogComponentClass: _ModalDialog.default
};
/* eslint-disable no-use-before-define, react/no-multi-comp */

function DialogTransition(props) {
  return _react.default.createElement(_Fade.default, _extends({}, props, {
    timeout: Modal.TRANSITION_DURATION
  }));
}

function BackdropTransition(props) {
  return _react.default.createElement(_Fade.default, _extends({}, props, {
    timeout: Modal.BACKDROP_TRANSITION_DURATION
  }));
}
/* eslint-enable no-use-before-define */


const ModalContext = _react.default.createContext({
  onHide: () => {}
});

exports.ModalContext = ModalContext;

class Modal extends _react.default.Component {
  constructor(props, context) {
    super(props, context);
    this.handleEntering = this.handleEntering.bind(this);
    this.handleExited = this.handleExited.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);
    this.setModalRef = this.setModalRef.bind(this);
    this.state = {
      style: {}
    };
  }

  componentWillUnmount() {
    // Clean up the listener if we need to.
    this.handleExited();
  }

  setModalRef(ref) {
    this._modal = ref;
  }

  handleDialogClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onHide();
  }

  handleEntering() {
    // FIXME: This should work even when animation is disabled.
    _events.default.on(window, 'resize', this.handleWindowResize);

    this.updateStyle();
  }

  handleExited() {
    // FIXME: This should work even when animation is disabled.
    _events.default.off(window, 'resize', this.handleWindowResize);
  }

  handleWindowResize() {
    this.updateStyle();
  }

  updateStyle() {
    if (!_inDOM.default) {
      return;
    }

    const dialogNode = this._modal.getDialogElement();

    const dialogHeight = dialogNode.scrollHeight;
    const document = (0, _ownerDocument.default)(dialogNode);
    const bodyIsOverflowing = (0, _isOverflowing.default)(_reactDom.default.findDOMNode(this.props.container || document.body));
    const modalIsOverflowing = dialogHeight > document.documentElement.clientHeight;
    this.setState({
      style: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? (0, _scrollbarSize.default)() : undefined,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? (0, _scrollbarSize.default)() : undefined
      }
    });
  }

  render() {
    const {
      backdrop,
      backdropClassName,
      animation,
      show,
      dialogComponentClass: Dialog,
      className,
      style,
      children,
      // Just in case this get added to BaseModal propTypes.
      onEntering,
      onExited,
      ...props
    } = this.props;
    const [baseModalProps, dialogProps] = (0, _splitComponentProps.default)(props, _Modal.default);
    const inClassName = show && !animation && 'in';
    return _react.default.createElement(ModalContext.Provider, {
      value: {
        onHide: this.props.onHide
      }
    }, _react.default.createElement(_Modal.default, _extends({}, baseModalProps, {
      ref: this.setModalRef,
      show: show,
      containerClassName: (0, _bootstrapUtils.prefix)(props, 'open'),
      transition: animation ? DialogTransition : undefined,
      backdrop: backdrop,
      backdropTransition: animation ? BackdropTransition : undefined,
      backdropClassName: (0, _classnames.default)((0, _bootstrapUtils.prefix)(props, 'backdrop'), backdropClassName, inClassName),
      onEntering: (0, _createChainedFunction.default)(onEntering, this.handleEntering),
      onExited: (0, _createChainedFunction.default)(onExited, this.handleExited)
    }), _react.default.createElement(Dialog, _extends({}, dialogProps, {
      style: { ...this.state.style,
        ...style
      },
      className: (0, _classnames.default)(className, inClassName),
      onClick: backdrop === true ? this.handleDialogClick : null
    }), children)));
  }

}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
Modal.Body = _ModalBody.default;
Modal.Header = _ModalHeader.default;
Modal.Title = _ModalTitle.default;
Modal.Footer = _ModalFooter.default;
Modal.Dialog = _ModalDialog.default;
Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

var _default = (0, _bootstrapUtils.bsClass)('modal', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], Modal));

exports.default = _default;