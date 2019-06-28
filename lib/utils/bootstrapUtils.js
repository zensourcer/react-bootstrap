"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefix = prefix;
exports.getClassSet = getClassSet;
exports.splitBsProps = splitBsProps;
exports.splitBsPropsAndOmit = splitBsPropsAndOmit;
exports.addStyle = addStyle;
exports._curry = exports.bsSizes = exports.bsStyles = exports.bsClass = void 0;

var _invariant = _interopRequireDefault(require("invariant"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _StyleConfig = require("./StyleConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: The publicly exposed parts of this should be in lib/BootstrapUtils.
function curry(fn) {
  return (...args) => {
    let last = args[args.length - 1];

    if (typeof last === 'function') {
      return fn(...args);
    }

    return Component => fn(...args, Component);
  };
}

function prefix(props, variant) {
  let bsClass = (props.bsClass || '').trim();
  !(bsClass != null) ? process.env.NODE_ENV !== "production" ? (0, _invariant.default)(false, 'A `bsClass` prop is required for this component') : invariant(false) : void 0;
  return bsClass + (variant ? `-${variant}` : '');
}

const bsClass = curry((defaultClass, Component) => {
  let propTypes = Component.propTypes || (Component.propTypes = {});
  let defaultProps = Component.defaultProps || (Component.defaultProps = {});
  propTypes.bsClass = _propTypes.default.string;
  defaultProps.bsClass = defaultClass;
  return Component;
});
exports.bsClass = bsClass;
const bsStyles = curry((styles, defaultStyle, Component) => {
  if (typeof defaultStyle !== 'string') {
    Component = defaultStyle;
    defaultStyle = undefined;
  }

  let existing = Component.STYLES || [];
  let propTypes = Component.propTypes || {};
  styles.forEach(style => {
    if (existing.indexOf(style) === -1) {
      existing.push(style);
    }
  });

  let propType = _propTypes.default.oneOf(existing); // expose the values on the propType function for documentation


  Component.STYLES = existing;
  propType._values = existing;
  Component.propTypes = { ...propTypes,
    bsStyle: propType
  };

  if (defaultStyle !== undefined) {
    let defaultProps = Component.defaultProps || (Component.defaultProps = {});
    defaultProps.bsStyle = defaultStyle;
  }

  return Component;
});
exports.bsStyles = bsStyles;
const bsSizes = curry((sizes, defaultSize, Component) => {
  if (typeof defaultSize !== 'string') {
    Component = defaultSize;
    defaultSize = undefined;
  }

  let existing = Component.SIZES || [];
  let propTypes = Component.propTypes || {};
  sizes.forEach(size => {
    if (existing.indexOf(size) === -1) {
      existing.push(size);
    }
  });
  const values = [];
  existing.forEach(size => {
    const mappedSize = _StyleConfig.SIZE_MAP[size];

    if (mappedSize && mappedSize !== size) {
      values.push(mappedSize);
    }

    values.push(size);
  });

  const propType = _propTypes.default.oneOf(values);

  propType._values = values; // expose the values on the propType function for documentation

  Component.SIZES = existing;
  Component.propTypes = { ...propTypes,
    bsSize: propType
  };

  if (defaultSize !== undefined) {
    if (!Component.defaultProps) {
      Component.defaultProps = {};
    }

    Component.defaultProps.bsSize = defaultSize;
  }

  return Component;
});
exports.bsSizes = bsSizes;

function getClassSet(props) {
  const classes = {
    [prefix(props)]: true
  };

  if (props.bsSize) {
    const bsSize = _StyleConfig.SIZE_MAP[props.bsSize] || props.bsSize;
    classes[prefix(props, bsSize)] = true;
  }

  if (props.bsStyle) {
    classes[prefix(props, props.bsStyle)] = true;
  }

  return classes;
}

function getBsProps(props) {
  return {
    bsClass: props.bsClass,
    bsSize: props.bsSize,
    bsStyle: props.bsStyle,
    bsRole: props.bsRole
  };
}

function isBsProp(propName) {
  return propName === 'bsClass' || propName === 'bsSize' || propName === 'bsStyle' || propName === 'bsRole';
}

function splitBsProps(props) {
  const elementProps = {};
  Object.entries(props).forEach(([propName, propValue]) => {
    if (!isBsProp(propName)) {
      elementProps[propName] = propValue;
    }
  });
  return [getBsProps(props), elementProps];
}

function splitBsPropsAndOmit(props, omittedPropNames) {
  const isOmittedProp = {};
  omittedPropNames.forEach(propName => {
    isOmittedProp[propName] = true;
  });
  const elementProps = {};
  Object.entries(props).forEach(([propName, propValue]) => {
    if (!isBsProp(propName) && !isOmittedProp[propName]) {
      elementProps[propName] = propValue;
    }
  });
  return [getBsProps(props), elementProps];
}
/**
 * Add a style variant to a Component. Mutates the propTypes of the component
 * in order to validate the new variant.
 */


function addStyle(Component, ...styleVariant) {
  bsStyles(styleVariant, Component);
}

const _curry = curry;
exports._curry = _curry;