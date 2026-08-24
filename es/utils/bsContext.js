"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// React 19 removed legacy context. These components used it to cascade $bs_*
// descriptors down the tree; this single context carries the same merged
// object, so every existing this.context.$bs_* read keeps working unchanged.
// Each provider merges the context it inherits, the way legacy context
// accumulated keys on the way down.
var _default = _react.default.createContext({});

exports.default = _default;