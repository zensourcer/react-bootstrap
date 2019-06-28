"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PagerItem = _interopRequireDefault(require("./PagerItem"));

var _deprecationWarning = _interopRequireDefault(require("./utils/deprecationWarning"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _deprecationWarning.default.wrapper(_PagerItem.default, '`<PageItem>`', '`<Pager.Item>`');

exports.default = _default;