import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import SmartTim from '@/common/SmartTim'; //
import { Form, Input } from 'antd';

const ChatBox = props => {
  // console.log(' ChatBox ： ', props, props.title); //
  return (
    <div className={`ChatBoxWrapper`}>
      <SmartTim></SmartTim>
    </div>
  );
};

ChatBox.defaultProps = {
  className: '',
};

ChatBox.propTypes = {
  className: PropTypes.string,
};

export default ChatBox;
