import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import {
  bsClass,
  bsSizes,
  getBsRole,
  getClassSet,
  splitBsPropsAndOmit
} from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';
import ValidComponentChildren from './utils/ValidComponentChildren';
import bsContext from './utils/bsContext';

const propTypes = {
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: PropTypes.string,
  validationState: PropTypes.oneOf(['success', 'warning', 'error', null])
};

class FormGroup extends React.Component {
  getBsChildContext() {
    const { controlId, validationState } = this.props;

    return {
      $bs_formGroup: {
        controlId,
        validationState
      }
    };
  }

  hasFeedback(children) {
    return ValidComponentChildren.some(
      children,
      child =>
        getBsRole(child) === 'feedback' ||
        (child.props.children && this.hasFeedback(child.props.children))
    );
  }

  renderBsChildren() {
    const { validationState, className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsPropsAndOmit(props, ['controlId']);

    const classes = {
      ...getClassSet(bsProps),
      'has-feedback': this.hasFeedback(children)
    };
    if (validationState) {
      classes[`has-${validationState}`] = true;
    }

    return (
      <div {...elementProps} className={classNames(className, classes)}>
        {children}
      </div>
    );
  }

  render() {
    return (
      <bsContext.Provider
        value={{ ...this.context, ...this.getBsChildContext() }}
      >
        {this.renderBsChildren()}
      </bsContext.Provider>
    );
  }
}

FormGroup.propTypes = propTypes;
FormGroup.contextType = bsContext;

export default bsClass(
  'form-group',
  bsSizes([Size.LARGE, Size.SMALL], FormGroup)
);
