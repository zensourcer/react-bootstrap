import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { prefix, bsClass, splitBsProps } from './utils/bootstrapUtils';
import bsContext from './utils/bsContext';

class PanelFooter extends React.Component {
  render() {
    let { children, className } = this.props;
    let { bsClass: _bsClass } = this.context.$bs_panel || {};

    const [bsProps, elementProps] = splitBsProps(this.props);
    bsProps.bsClass = _bsClass || bsProps.bsClass;

    return (
      <div
        {...elementProps}
        className={cn(className, prefix(bsProps, 'footer'))}
      >
        {children}
      </div>
    );
  }
}

PanelFooter.contextType = bsContext;

export default bsClass('panel', PanelFooter);
