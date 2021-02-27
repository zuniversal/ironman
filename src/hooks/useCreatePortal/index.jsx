import React, { useState, useEffect } from 'react';
import { tips } from '@/utils';

const useCreatePortal = props => {
  return ReactDOM.createPortal(
    <div className={'fullScreen  '}>{props.children}</div>,
    document.getElementById('root'),
  );
};

export default useCreatePortal;
