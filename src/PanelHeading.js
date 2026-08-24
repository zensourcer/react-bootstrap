import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import elementType from 'react-prop-types/lib/elementType';

import { prefix, bsClass, splitBsProps } from './utils/bootstrapUtils';
import bsContext from './utils/bsContext';

const propTypes = {
  componentClass: elementType
};

const defaultProps = {
  componentClass: 'div'
};

class PanelHeading extends React.Component {
  render() {
    const {
      children,
      className,
      componentClass: Component,
      ...props
    } = this.props;
    const { headingId, bsClass: _bsClass } = this.context.$bs_panel || {};

    const [bsProps, elementProps] = splitBsProps(props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    if (headingId) {
      elementProps.role = elementProps.role || 'tab';
      elementProps.id = headingId;
    }

    return (
      <Component
        {...elementProps}
        className={cn(className, prefix(bsProps, 'heading'))}
      >
        {children}
      </Component>
    );
  }
}

PanelHeading.propTypes = propTypes;
PanelHeading.defaultProps = defaultProps;
PanelHeading.contextType = bsContext;

export default bsClass('panel', PanelHeading);
