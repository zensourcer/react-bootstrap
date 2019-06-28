"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createChainedFunction", {
  enumerable: true,
  get: function () {
    return _createChainedFunction2.default;
  }
});
Object.defineProperty(exports, "ValidComponentChildren", {
  enumerable: true,
  get: function () {
    return _ValidComponentChildren2.default;
  }
});
exports.bootstrapUtils = void 0;

var _bootstrapUtils = _interopRequireWildcard(require("./bootstrapUtils"));

exports.bootstrapUtils = _bootstrapUtils;

var _createChainedFunction2 = _interopRequireDefault(require("./createChainedFunction"));

var _ValidComponentChildren2 = _interopRequireDefault(require("./ValidComponentChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }