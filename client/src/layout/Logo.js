/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const Logo = (props) => (
  <img
    alt="Logo"
    style={{ width: '50px' }}
    src="/static/upLogo.svg"
    {...props}
  />
);

export default Logo;
