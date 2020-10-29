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

const ContractTable = props => {
  console.log(' ContractTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '所属客户',
      dataIndex: 'key',
      d_item: 'id',
      render: (text, record, index) => (
        <a onClick={() => tdClick({ action: 'detail' })}>{text}</a>
      ),
    },
    {
      title: '合同编号',
      dataIndex: 'field2',
      d_item: 'id',
      render: (text, record, index) => (
        <a onClick={() => tdClick({ action: 'detail' })}>{text}</a>
      ),
    },
    {
      title: '业务主体',
      dataIndex: 'field3',
      d_item: 'id',
      link: true,
    },
    {
      title: '业务员',
      dataIndex: 'field4',
    },
    {
      title: '合同类型',
      dataIndex: 'field5',
    },
    {
      title: '失效日期',
      dataIndex: 'field6',
    },
    {
      title: '户号',
      dataIndex: 'field7',
    },
    {
      title: '电站数量',
      dataIndex: 'field8',
    },
    // {
    //   noFilter: true,
    //   title: '操作',
    //   className: 'actionCol',
    //   render: (text, record, index) => {
    //     // console.log(' text, record, index ： ', text, record, index,  )//
    //     return (
    //       <span>
    //         <a onClick={() => showModal('edit', record)}>编辑</a>
    //         <a onClick={() => showModal('remove', record)}>删除</a>
    //       </span>
    //     );
    //   },
    // },
  ];

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}

      noDefault
      {...props}
    ></SmartTable>
  );
};

ContractTable.defaultProps = {
  // showModal: () => {},
  tdClick: () => {},
  // remove: () => {},
};

export default ContractTable;
