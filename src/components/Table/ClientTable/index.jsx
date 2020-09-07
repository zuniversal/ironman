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

const ClientTable = props => {
  console.log(' ClientTable ： ', props); //
  const { showModal, edit, remove } = props; //

  const columns = [
    {
      title: '客户编号',
      dataIndex: 'key',
      // link: true,
      render: (text, record, index) => <a onClick={showModal}>{text}</a>,
    },
    {
      noFilter: true,
      title: '客户名称',
      dataIndex: 'field2',
    },
    {
      // noFilter: true,
      title: '客户类型',
      dataIndex: 'field3',
    },
    {
      // noFilter: true,
      title: '所属行业',
      dataIndex: 'field4',
    },
    {
      // noFilter: true,
      title: '企业规模',
      dataIndex: 'field5',
    },
    {
      title: '资产规模',
      dataIndex: 'field6',
    },
    {
      title: '管理员',
      dataIndex: 'field7',
    },
    {
      title: '户号',
      dataIndex: 'field8',
    },
    {
      title: '客户地址',
      dataIndex: 'field9',
    },
    {
      noFilter: true,
      title: '操作',
      className: 'actionCol',
      render: (text, record, index) => {
        // console.log(' text, record, index ： ', text, record, index,  )//
        return (
          <span>
            <a onClick={() => showModal('edit', record)}>编辑</a>
            <a onClick={() => showModal('remove', record)}>删除</a>
          </span>
        );
      },
    },
  ];

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      dataSource={[]}
      // rowKey={'source_no'}
    ></SmartTable>
  );
};

ClientTable.defaultProps = {
  showModal: () => {},
  edit: () => {},
  remove: () => {},
};

export default ClientTable;