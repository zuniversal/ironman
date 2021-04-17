import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Button } from 'antd';

const SmartButton = props => {
  console.log(' SmartButton ： ', props);
  const { onClick } = props;

  return <Button {...props} />;
};

SmartButton.defaultProps = {};

SmartButton.propTypes = {};

export default SmartButton;
