import React from 'react';
import ReactDOM from 'react-dom';
import './style.less';

const CreatePortal = props => {
  return ReactDOM.createPortal(
    <div className={'fullScreen  '}>{props.children}</div>,
    document.getElementById('root'),
  );
};

export default CreatePortal;
