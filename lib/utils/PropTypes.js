"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatedId = generatedId;
exports.requiredRoles = requiredRoles;
exports.exclusiveRoles = exclusiveRoles;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _createChainableTypeChecker = _interopRequireDefault(require("prop-types-extra/lib/utils/createChainableTypeChecker"));

var _ValidComponentChildren = _interopRequireDefault(require("./ValidComponentChildren"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const idPropType = _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]);

function generatedId(name) {
  return (props, ...args) => {
    let error = null;

    if (!props.generateChildId) {
      error = idPropType(props, ...args);

      if (!error && !props.id) {
        error = new Error(`In order to properly initialize the ${name} in a way that is accessible to assistive technologies ` + `(such as screen readers) an \`id\` or a \`generateChildId\` prop to ${name} is required`);
      }
    }

    return error;
  };
}

function requiredRoles(...roles) {
  return (0, _createChainableTypeChecker.default)((props, propName, component) => {
    let missing;
    roles.every(role => {
      if (!_ValidComponentChildren.default.some(props.children, child => child.props.bsRole === role)) {
        missing = role;
        return false;
      }

      return true;
    });

    if (missing) {
      return new Error(`(children) ${component} - Missing a required child with bsRole: ` + `${missing}. ${component} must have at least one child of each of ` + `the following bsRoles: ${roles.join(', ')}`);
    }

    return null;
  });
}

function exclusiveRoles(...roles) {
  return (0, _createChainableTypeChecker.default)((props, propName, component) => {
    let duplicate;
    roles.every(role => {
      const childrenWithRole = _ValidComponentChildren.default.filter(props.children, child => child.props.bsRole === role);

      if (childrenWithRole.length > 1) {
        duplicate = role;
        return false;
      }

      return true;
    });

    if (duplicate) {
      return new Error(`(children) ${component} - Duplicate children detected of bsRole: ` + `${duplicate}. Only one child each allowed with the following ` + `bsRoles: ${roles.join(', ')}`);
    }

    return null;
  });
}