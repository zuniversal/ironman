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
import { HOUSENO } from '@/constants'; //
import { linkUrlFn } from '@/utils'; //

const ClientTable = props => {
  console.log(' ClientTable ： ', props); //
  const { tdClick, showDetail } = props; //

  const columns = [
    {
      title: '客户编号',
      dataIndex: 'id',
      // link: true,
      // render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
      linkUrlFn: linkUrlFn(['code', 'id', 'ids'], HOUSENO),
    },
    {
      title: '客户名称',
      dataIndex: 'name',
      noFilter: true,
      d_item: 'id',
      // detailFn: (text, record, index) => {
      //   console.log(' text, record, index ： ', text, record, index,  )//
      //   showDetail(record.id)
      // }
    },
    {
      // noFilter: true,
      title: '客户类型',
      dataIndex: 'type',
    },
    {
      // noFilter: true,
      title: '所属行业',
      dataIndex: 'industry',
    },
    {
      // noFilter: true,
      title: '企业规模',
      dataIndex: 'scale',
    },
    {
      title: '资产规模',
      dataIndex: 'asset',
    },
    {
      title: '管理员',
      // dataIndex: 'customer_admin',
      dataIndex: ['customer_admin', 'nickname'],
      // detail: true,
      // detailFn: (text, record, index) => showDetail(record.id),
    },
    {
      title: '户号',
      dataIndex: 'code',
      // linkUrl: '/om/houseNo',
      // linkUrlFn: (text, record, index) => {
      //   let linkUrl = HOUSENO
      //   let res = ['code', 'id', ].forEach((key) => linkUrl += `${key}=${record[key]}`)
      //   console.log(' linkUrl ： ', linkUrl,  )//
      //   return linkUrl
      // },
      linkUrlFn: linkUrlFn(['code', 'id'], HOUSENO),
    },
    {
      title: '客户地址',
      dataIndex: 'address',
    },
  ];

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      {...props}
    ></SmartTable>
  );
};

ClientTable.defaultProps = {
  showModal: () => {},
};

export default ClientTable;
