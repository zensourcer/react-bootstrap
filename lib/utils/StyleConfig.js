"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Style = exports.State = exports.DEVICE_SIZES = exports.SIZE_MAP = exports.Size = void 0;
const Size = {
  LARGE: 'large',
  SMALL: 'small',
  XSMALL: 'xsmall'
};
exports.Size = Size;
const SIZE_MAP = {
  large: 'lg',
  medium: 'md',
  small: 'sm',
  xsmall: 'xs',
  lg: 'lg',
  md: 'md',
  sm: 'sm',
  xs: 'xs'
};
exports.SIZE_MAP = SIZE_MAP;
const DEVICE_SIZES = ['lg', 'md', 'sm', 'xs'];
exports.DEVICE_SIZES = DEVICE_SIZES;
const State = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info'
};
exports.State = State;
const Style = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  LINK: 'link',
  INVERSE: 'inverse'
};
exports.Style = Style;