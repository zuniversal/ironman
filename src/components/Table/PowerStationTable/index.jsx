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

const PowerStationTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
    },
    {
      title: '所属客户',
      dataIndex: ['customer', 'name'],
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer.id,
        }),
    },
    {
      title: '所属户号',
      dataIndex: ['electricity_user', 'number'],
      detailFn: record =>
        props.showItemAsync({
          action: 'houseNoDetailAsync',
          d_id: record.electricity_user.id,
        }),
    },
    {
      title: '电站名称',
      dataIndex: 'name',
      detailFn: record =>
        props.showItemAsync({
          action: 'powerStationDetailAsync',
          d_id: record.id,
        }),
    },
    {
      title: '电站地址',
      dataIndex: 'addr',
    },
    // {
    //   title: '业务主体',
    //   dataIndex: 'service_staff',
    // },
    {
      title: '巡检次数',
      dataIndex: 'inspections_number',
      className: 'textCenter',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'inspectDetailAsync',
      //     d_id: record.id,
      // }),
    },
    // {
    //   title: '设备数',
    //   dataIndex: 'equipment_num',
    //   className: 'textCenter',
    // },
    // {
    //   title: '监控次数',
    //   // dataIndex: '',
    //   className: 'textCenter',
    // },
    // {
    //   title: '一次电气图',
    //   dataIndex: 'file',
    //   render: (text, record, index) => {
    //     // console.log(' text, record ： ', text, record,  )//
    //     return text ? <img src={text} className={`thumbImg`} /> : null;
    //   },
    // },
  ];

  return <SmartTable columns={columns} isQRCode {...props}></SmartTable>;
};

PowerStationTable.defaultProps = {
  // showModal: () => {},
  tdClick: () => {},
  // remove: () => {},
};

export default PowerStationTable;
