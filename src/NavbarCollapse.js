import React from 'react';
import PropTypes from 'prop-types';

import Collapse from './Collapse';
import { prefix } from './utils/bootstrapUtils';
import bsContext from './utils/bsContext';

class NavbarCollapse extends React.Component {
  render() {
    const { children, ...props } = this.props;
    const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'collapse');

    return (
      <Collapse in={navbarProps.expanded} {...props}>
        <div className={bsClassName}>{children}</div>
      </Collapse>
    );
  }
}

NavbarCollapse.contextType = bsContext;

export default NavbarCollapse;
