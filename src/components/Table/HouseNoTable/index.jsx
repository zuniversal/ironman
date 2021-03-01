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

import SmartTable from '@/common/SmartTable'; //
import { electricTypeMap } from '@/configs'; //

const HouseNoTable = props => {
  const { tdClick } = props; //

  const columns = [
    {
      title: '户号',
      // dataIndex: 'code',
      dataIndex: 'number',
      // detailFn: (text, record, index) => props.showDetail(record.id),
      detailFn: record =>
        props.showItemAsync({
          action: 'houseNoDetailAsync',
          d_id: record.id,
        }),
    },
    {
      noCutText: true,
      width: 300,
      title: '所属客户',
      dataIndex: ['customer', 'name'],
      // className: 'textCenter',
      // detailFn: (text, record, index) => showDetail(record.id),
      // detailFn: record =>
      //   props.showDetail({ action: 'detail', d_id: record.id }),
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer.id,
        }),
    },
    // {
    //   title: '签约公司',
    //   dataIndex: 'signing_company',
    // },
    {
      title: '客户代表',
      dataIndex: 'service_staff',
    },
    {
      title: '用电地址',
      dataIndex: 'addr',
    },
    {
      title: '用电类型',
      dataIndex: 'type',
      dataMap: electricTypeMap,
    },
    {
      title: '托管电站数',
      dataIndex: 'trusteeship_num',
      // detailFn: (text, record, index) => props.showDetail(record.id),
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'powerStationDetailAsync',
      //     d_id: record.id,
      //   }),
    },
    {
      title: '录入日期',
      dataIndex: 'created_time',
    },
  ];

  return <SmartTable columns={columns} {...props}></SmartTable>;
};

HouseNoTable.defaultProps = {
  // showModal: () => {},
  tdClick: () => {},
  // remove: () => {},
};

export default HouseNoTable;
