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
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
} from 'antd';

const WeakDetail = props => {
  console.log(' WeakDetail  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const config = [
    {
      label: '备注',
      value: 'remark',
    },
  ];

  const extra = props => (
    <>
      <a onClick={() => tdClick({ action: 'showList' })}>处理</a>
      <a onClick={() => tdClick({ action: 'showList' })}>通知客户</a>
      <a onClick={() => tdClick({ action: 'showList' })}>导出</a>
    </>
  );

  return <div></div>;
};

WeakDetail.defaultProps = {};

WeakDetail.propTypes = {};

export default WeakDetail;
