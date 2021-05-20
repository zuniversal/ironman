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

import SmartTable from '@/common/SmartTable';
import { history } from 'umi';
import { DRAW_PANEL } from '@/constants';

const PowerStationTable = props => {
  const { showModal, edit, remove, tdClick } = props;

  const columns = [
    // {
    //   title: '序号',
    //   dataIndex: 'id',
    // },
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
      noCutText: true,
      width: 400,
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
      width: 300,
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
    //   title: '一次系统图',
    //   dataIndex: 'file',
    //   render: (text, record, index) => {
    //     // console.log(' text, record ： ', text, record,  )//
    //     return text ? <img src={text} className={`thumbImg`} /> : null;
    //   },
    // },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          history.push(
            `${DRAW_PANEL}?powerstation_id=${record.id}&number=${record.electricity_user.number}`,
          )
        }
      >
        一次系统图
      </a>
      <a
        onClick={() => {
          console.log('Received values of form: ', props);
          history.push(`/om/powerStation/smartMonitor/${record.id}`);
        }}
      >
        智能监控
      </a>
      <a
        onClick={() => {
          console.log('Received values of form: ', props);
          props.showQRCode({
            title: `${record.name}`,
            record,
            d_id: record.id,
          });
        }}
      >
        生成二维码
      </a>
      <a
        onClick={() => {
          // props.showFormModal({ action: 'inspectReport' })
          // props.showExportPdf({ action: 'showExportPdf', d_id: record.id });
          props.showFormModal({
            action: 'exportDutyData',
            d_id: record.id,
          });
        }}
      >
        导出巡检报告
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      isQRCode
      {...props}
    ></SmartTable>
  );
};

PowerStationTable.defaultProps = {
  // showModal: () => {},
  tdClick: () => {},
  // remove: () => {},
};

export default PowerStationTable;
