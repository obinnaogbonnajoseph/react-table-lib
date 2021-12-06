import React from 'react';
import PropTypes from 'prop-types';
import './Icon.css';

const Icon = ({ iconName, className }) => (
  <span className={className}>
    {iconName}
  </span>
);

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

Icon.defaultProps = {};

export default Icon;
