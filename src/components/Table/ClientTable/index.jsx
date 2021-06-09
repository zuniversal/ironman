import React from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable';
import { HOUSENO, csElectricInfo } from '@/constants';
import { linkUrlFn, openTab } from '@/utils';
import { industryTypeMap, clientLevelMap } from '@/configs';
import { history } from 'umi';

const ClientTable = props => {
  const columns = [
    // {
    //   title: '客户编号',
    //   className: 'textCenter',
    //   dataIndex: 'id',
    //   // link: true,
    //   // render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
    //   // linkUrlFn: linkUrlFn(['code', 'id', 'ids'], HOUSENO),
    // },
    {
      noFilter: true,
      noCutText: true,
      width: 400,
      className: 'clientCol',
      title: '客户名称',
      dataIndex: 'name',
      detailFn: record =>
        // props.showDetail({
        //   action: 'detail',
        //   d_id: record.id,
        // }),
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.id,
        }),
      // detailFn: record =>
      // props.showDetail({ action: 'detail', d_id: record.id }),
      // detailFn: (text, record, index) => {
      //   console.log(' text, record, index ： ', text, record, index,  )//
      //   showDetail(record.id)
      // }
    },
    // {
    //   // noFilter: true,
    //   title: '客户类型',
    //   dataIndex: 'type',
    // },
    // {
    //   // noFilter: true,
    //   title: '所属行业',
    //   dataIndex: 'industry',
    //   dataMap: industryTypeMap,
    // },
    // {
    //   // noFilter: true,
    //   title: '企业规模',
    //   dataIndex: 'scale',
    // },
    // {
    //   title: '资产规模',
    //   dataIndex: 'asset',
    // },
    {
      title: '客户等级',
      dataIndex: 'level',
      dataMap: clientLevelMap,
      // render: (text, record, index, config) => (
      //   <div className={`tableItem`}>
      //   </div>
      // ),
    },

    {
      title: '客户代表',
      dataIndex: 'service_staff_name',
    },

    // {
    //   title: '管理员',
    //   // dataIndex: 'customer_admin',
    //   // dataIndex: ['customer_admin', 'nickname'],
    //   dataIndex: 'admin',
    //   // detail: true,
    //   // detailFn: (text, record, index) => showDetail(record.id),
    // },
    {
      title: '户号数',
      dataIndex: 'electricity_user_count',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'houseNoDetailAsync',
      //     d_id: record.electricity_user.id,
      //
      //   }),
      // linkUrl: '/om/houseNo',
      // linkUrlFn: (text, record, index) => {
      //   let linkUrl = HOUSENO
      //   let res = ['code', 'id', ].forEach((key) => linkUrl += `${key}=${record[key]}`)
      //   console.log(' linkUrl ： ', linkUrl,  )//
      //   return linkUrl
      // },
      // linkUrlFn: linkUrlFn(['code', 'id'], HOUSENO),
    },
    {
      noCutText: true,
      width: 300,
      title: '客户地址',
      dataIndex: ['enterprise', 'address'],
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      {props.showClientView && (
        <a
          onClick={
            () => history.push(`${csElectricInfo}customer_id=${record.id}`)
            // openTab(
            //   `${window.location.origin}/#${csElectricInfo}customer_id=${record.id}`,
            // )
          }
        >
          客户视图
        </a>
      )}
    </>
  );

  return (
    <SmartTable
      noEdit
      columns={columns}
      extra={extra}
      {...props}
      className={`clientTable`}
    ></SmartTable>
  );
};

ClientTable.defaultProps = {
  showModal: () => {},
};

export default ClientTable;
