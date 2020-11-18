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
      title: '所属客户',
      dataIndex: 'electricity_user',
      d_item: 'id',
    },
    {
      title: '所属户号',
      dataIndex: 'electricity_user',
      d_item: 'id',
    },
    {
      title: '电站名称',
      dataIndex: 'name',
      d_item: 'id',
    },
    {
      title: '电站地址',
      dataIndex: 'addr',
    },
    // {
    //   title: '业务主体',
    //   dataIndex: 'service_staff',
    //   d_item: 'id',
    // },
    {
      title: '巡检次数',
      dataIndex: 'inspections_number',
      className: 'textCenter',
      d_item: 'id',
    },
    // {
    //   title: '设备数',
    //   dataIndex: 'equipment_num',
    //   className: 'textCenter',
    //   d_item: 'id',
    // },
    // {
    //   title: '监控次数',
    //   // dataIndex: '',
    //   className: 'textCenter',
    //   d_item: 'id',
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
