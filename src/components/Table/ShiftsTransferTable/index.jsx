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

import { onDutyTypeMap } from '@/configs'; //
import SmartTable from '@/common/SmartTable'; //

const ShiftsTransferTable = props => {
  console.log(' ShiftsTransferTable  ： ', props); //
  const { showModal, edit, remove, tdClick, showTransferDetail } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '交班人',
      dataIndex: 'transfer_team',
    },
    {
      title: '接班人',
      dataIndex: 'recieve_team',
    },
    {
      title: '类型',
      dataIndex: 'type',
      dataMap: onDutyTypeMap,
    },
    {
      title: '创建时间',
      dataIndex: 'handover_time',
    },
  ];

  // const extra = (text, record, index, ) => {
  //   console.log(' text, record, index  ： ', text, record, index); //
  //   return (
  //     <>
  //       <a onClick={() => showDetail({ action: 'detail', record: record.id })}>查看</a>
  //     </>
  //   )
  // };
  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          console.log(' propsprops ： ', props); //
          showTransferDetail({
            action: 'detail',
            d_id: record[props.rowKey],
            // [d_item]: record[d_item],
            // record,
          });
        }}
      >
        查看
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}

      extra={extra}
      noDefault
      {...props}
    ></SmartTable>
  );
};

ShiftsTransferTable.defaultProps = {
  tdClick: () => {},
};

export default ShiftsTransferTable;
