import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { prefix } from './utils/bootstrapUtils';
import bsContext from './utils/bsContext';

class NavbarHeader extends React.Component {
  render() {
    const { className, ...props } = this.props;
    const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'header');

    return <div {...props} className={classNames(className, bsClassName)} />;
  }
}

NavbarHeader.contextType = bsContext;

export default NavbarHeader;
