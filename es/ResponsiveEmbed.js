"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _warning = _interopRequireDefault(require("warning"));

var _bootstrapUtils = require("./utils/bootstrapUtils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: This should probably take a single `aspectRatio` prop.
const propTypes = {
  /**
   * This component requires a single child element
   */
  children: _propTypes.default.element.isRequired,

  /**
   * 16by9 aspect ratio
   */
  a16by9: _propTypes.default.bool,

  /**
   * 4by3 aspect ratio
   */
  a4by3: _propTypes.default.bool
};
const defaultProps = {
  a16by9: false,
  a4by3: false
};

class ResponsiveEmbed extends _react.default.Component {
  render() {
    const {
      a16by9,
      a4by3,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = (0, _bootstrapUtils.splitBsProps)(props);
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(a16by9 || a4by3, 'Either `a16by9` or `a4by3` must be set.') : void 0;
    process.env.NODE_ENV !== "production" ? (0, _warning.default)(!(a16by9 && a4by3), 'Only one of `a16by9` or `a4by3` can be set.') : void 0;
    const classes = { ...(0, _bootstrapUtils.getClassSet)(bsProps),
      [(0, _bootstrapUtils.prefix)(bsProps, '16by9')]: a16by9,
      [(0, _bootstrapUtils.prefix)(bsProps, '4by3')]: a4by3
    };
    return _react.default.createElement("div", {
      className: (0, _classnames.default)(classes)
    }, (0, _react.cloneElement)(children, { ...elementProps,
      className: (0, _classnames.default)(className, (0, _bootstrapUtils.prefix)(bsProps, 'item'))
    }));
  }

}

ResponsiveEmbed.propTypes = propTypes;
ResponsiveEmbed.defaultProps = defaultProps;

var _default = (0, _bootstrapUtils.bsClass)('embed-responsive', ResponsiveEmbed);

exports.default = _default;