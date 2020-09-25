import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';
import PropTypes from 'prop-types';

import { Descriptions, Input, Button, Spin } from 'antd';

const DescriptionsCom = props => {
  console.log(' DescriptionsCom ： ', props); //
  const { config, size, column,   } = props; //
  
  return <Descriptions size={size} column={column}>
    {config.map((v, i) => <Descriptions.Item label={`${v.label}${v.noColon ? ': ' : ''}`} key={i}  >{v.value}</Descriptions.Item>)}
  </Descriptions>
};

DescriptionsCom.defaultProps = {
  config: [],
  size: 'small',
  column: 3,
  noColon: false,  
};

DescriptionsCom.propTypes = {
  config: PropTypes.array,
  size: PropTypes.string,
  column: PropTypes.number,
  noColon: PropTypes.bool,

};

export default DescriptionsCom;
