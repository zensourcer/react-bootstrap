"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TabContainer = _interopRequireDefault(require("./TabContainer"));

var _TabContent = _interopRequireDefault(require("./TabContent"));

var _TabPane = _interopRequireDefault(require("./TabPane"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const propTypes = { ..._TabPane.default.propTypes,
  disabled: _propTypes.default.bool,
  title: _propTypes.default.node,

  /**
   * tabClassName is used as className for the associated NavItem
   */
  tabClassName: _propTypes.default.string
};

class Tab extends _react.default.Component {
  render() {
    const props = { ...this.props
    }; // These props are for the parent `<Tabs>` rather than the `<TabPane>`.

    delete props.title;
    delete props.disabled;
    delete props.tabClassName;
    return _react.default.createElement(_TabPane.default, props);
  }

}

Tab.propTypes = propTypes;
Tab.Container = _TabContainer.default;
Tab.Content = _TabContent.default;
Tab.Pane = _TabPane.default;
var _default = Tab;
exports.default = _default;
module.exports = exports["default"];