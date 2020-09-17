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

import { Form, Input, Button, Spin,  } from 'antd';



const Loading = () => {
  return <Spin className={'loadingWrapper'}></Spin>;
};

export default Loading;
