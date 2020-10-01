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

import SmartTable from '@/common/SmartTable'; //

const HomeInspectMissionTable = props => {
  console.log(' HomeInspectMissionTable  ： ', props); //
  const { showModal, edit, remove, tdClick, complete } = props; //

  const columns = [
    {
      title: 'id',
    },
    {
      title: '名称',
    },
    {
      title: '电站',
    },
    {
      title: '客户名称',
    },
    {
      title: '当前状态',
    },
    {
      title: '领取人',
    },
    {
      title: '领取时间',
    },
  ];

  const extra = props => (
    <>
      <a onClick={() => complete({ action: 'complete' })}>完成</a>
      <a onClick={() => remove({ action: 'remove' })}>删除</a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}

      rowLength={3}
      pagination={false}
      extra={extra}
      noDefault
      {...props}
    ></SmartTable>
  );
};

HomeInspectMissionTable.defaultProps = {
  tdClick: () => {},
};

export default HomeInspectMissionTable;
