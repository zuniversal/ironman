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

import { Form, Input, Button, Checkbox } from 'antd';



const Loading = () => {
  return <div className={'Loading'}>Loading加载中</div>;
};

export default Loading;
