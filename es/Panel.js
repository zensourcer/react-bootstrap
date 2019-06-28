"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _uncontrollable = _interopRequireDefault(require("uncontrollable"));

var _warning = _interopRequireDefault(require("warning"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

var _StyleConfig = require("./utils/StyleConfig");

var _PanelBody = _interopRequireDefault(require("./PanelBody"));

var _PanelHeading = _interopRequireDefault(require("./PanelHeading"));

var _PanelTitle = _interopRequireDefault(require("./PanelTitle"));

var _PanelFooter = _interopRequireDefault(require("./PanelFooter"));

var _PanelToggle = _interopRequireDefault(require("./PanelToggle"));

var _PanelCollapse = _interopRequireDefault(require("./PanelCollapse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const has = Object.prototype.hasOwnProperty;

const defaultGetId = (id, type) => id ? `${id}--${type}` : null;

const propTypes = {
  /**
   * Controls the collapsed/expanded state ofthe Panel. Requires
   * a `Panel.Collapse` or `<Panel.Body collapsible>` child component
   * in order to actually animate out or in.
   *
   * @controllable onToggle
   */
  expanded: _propTypes.default.bool,

  /**
   * A callback fired when the collapse state changes.
   *
   * @controllable expanded
   */
  onToggle: _propTypes.default.func,
  eventKey: _propTypes.default.any,

  /**
   * An HTML `id` attribute uniquely identifying the Panel component.
   */
  id: _propTypes.default.string
};
const contextTypes = {
  $bs_panelGroup: _propTypes.default.shape({
    getId: _propTypes.default.func,
    activeKey: _propTypes.default.any,
    onToggle: _propTypes.default.func
  })
};
const childContextTypes = {
  $bs_panel: _propTypes.default.shape({
    headingId: _propTypes.default.string,
    bodyId: _propTypes.default.string,
    bsClass: _propTypes.default.string,
    onToggle: _propTypes.default.func,
    expanded: _propTypes.default.bool
  })
};

class Panel extends _react.default.Component {
  constructor(...args) {
    super(...args);

    this.handleToggle = e => {
      const panelGroup = this.context.$bs_panelGroup;
      const expanded = !this.getExpanded();

      if (panelGroup && panelGroup.onToggle) {
        panelGroup.onToggle(this.props.eventKey, expanded, e);
      } else {
        this.props.onToggle(expanded, e);
      }
    };
  }

  getChildContext() {
    const {
      eventKey,
      id
    } = this.props;
    const idKey = eventKey == null ? id : eventKey;
    let ids;

    if (idKey !== null) {
      const panelGroup = this.context.$bs_panelGroup;
      const getId = panelGroup && panelGroup.getId || defaultGetId;
      ids = {
        headingId: getId(idKey, 'heading'),
        bodyId: getId(idKey, 'body')
      };
    }

    return {
      $bs_panel: { ...ids,
        bsClass: this.props.bsClass,
        expanded: this.getExpanded(),
        onToggle: this.handleToggle
      }
    };
  }

  getExpanded() {
    const panelGroup = this.context.$bs_panelGroup;

    if (panelGroup && has.call(panelGroup, 'activeKey')) {
      process.env.NODE_ENV !== "production" ? (0, _warning.default)(this.props.expanded == null, 'Specifying `<Panel>` `expanded` in the context of an accordion ' + '`<PanelGroup>` is not supported. Set `activeKey` on the ' + '`<PanelGroup>` instead.') : void 0;
      return panelGroup.activeKey === this.props.eventKey;
    }

    return !!this.props.expanded;
  }

  render() {
    let {
      className,
      children
    } = this.props;
    const [bsProps, props] = (0, _bootstrapUtils.splitBsPropsAndOmit)(this.props, ['onToggle', 'eventKey', 'expanded']);
    return _react.default.createElement("div", _extends({}, props, {
      className: (0, _classnames.default)(className, (0, _bootstrapUtils.getClassSet)(bsProps))
    }), children);
  }

}

Panel.propTypes = propTypes;
Panel.contextTypes = contextTypes;
Panel.childContextTypes = childContextTypes;
const UncontrolledPanel = (0, _uncontrollable.default)((0, _bootstrapUtils.bsClass)('panel', (0, _bootstrapUtils.bsStyles)([...Object.values(_StyleConfig.State), _StyleConfig.Style.DEFAULT, _StyleConfig.Style.PRIMARY], _StyleConfig.Style.DEFAULT, Panel)), {
  expanded: 'onToggle'
});
Object.assign(UncontrolledPanel, {
  Heading: _PanelHeading.default,
  Title: _PanelTitle.default,
  Body: _PanelBody.default,
  Footer: _PanelFooter.default,
  Toggle: _PanelToggle.default,
  Collapse: _PanelCollapse.default
});
var _default = UncontrolledPanel;
exports.default = _default;