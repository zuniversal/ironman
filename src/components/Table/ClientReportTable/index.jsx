import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
  use,
} from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable'; //
import { HOUSENO } from '@/constants'; //
import { linkUrlFn } from '@/utils'; //
import { voltageLevelMap } from '@/configs';

const ClientReportTable = props => {
  const { tdClick, add, edit, showDetail } = props; //

  const columns = [
    {
      title: '户号',
      dataIndex: 'number',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'houseNoDetailAsync',
      //     d_id: record.number,
      //   }),
    },
    {
      title: '客户名称',
      dataIndex: 'name',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'clientDetailAsync',
      //     d_id: record.id,
      //   }),
    },
    {
      title: '客户代表',
      dataIndex: 'service_staff_name',
    },
    // {
    //   title: '服务班组',
    //   dataIndex: 'service_staff_name',
    // },
    {
      title: '巡检组长',
      dataIndex: 'service_team_name',
    },
    {
      title: '电源编号',
      dataIndex: 'power_number',
    },
    {
      title: '电压等级',
      dataIndex: 'voltage_level',
      dataMap: voltageLevelMap,
    },

    {
      title: '电表号',
      dataIndex: 'meter_number',
    },

    {
      title: '容量',
      dataIndex: 'capacity',
    },
    {
      title: '力率调整',
      dataIndex: 'amount_adjust',
    },
    {
      title: '功率因数',
      dataIndex: 'power_factor',
    },
    {
      title: '实际功率因数',
      dataIndex: 'power_factor_real',
    },
    {
      title: '总金额(元)',
      dataIndex: 'amount',
    },
    {
      title: '总电量(千瓦时)',
      dataIndex: 'volume',
    },
    // {
    //   title: '巡检组长',
    //   dataIndex: 'team_headman',
    // },

    // {
    //   title: '加急',
    //   dataIndex: '',
    // },
  ];

  const extra = (text, record, index, props) => (
    <>
      {record.finish == 1 && (
        <a
          onClick={() =>
            props.showDetail({
              // action: 'clientReportDetailAsync',
              action: 'clientReportDetailPdf',
              d_id: record.electricity_user_id,
              year_month: props.searchInfo.year_month
                ? props.searchInfo.year_month.format('YYYY-MM')
                : '',
            })
          }
        >
          基本版月报
        </a>
      )}
      {record.finish == 1 && (
        <a
          onClick={() => {
            console.log(
              ' 1111111 ： ',
              props.searchInfo.year_month,
              props.searchInfo.year_month.format('YYYY-MM'),
            ); //
            // return
            props.exportData({
              action: 'getClientReportUpgradeAsync',
              reqMethod: 'getClientReportUpgradeAsync',
              ele_number: record.number,
              year_month: props.searchInfo.year_month
                ? props.searchInfo.year_month.format('YYYY-MM')
                : '',
            });
          }}
        >
          升级版月报
        </a>
      )}
      {record.finish == 0 && <a disabled>未录入电费账单</a>}
      <a onClick={() => props.showFormModal({ action: 'add' })}>录入</a>
      {/* <a onClick={() => showDetail({ action: 'detail' })}>查看</a> */}
      {/* <a onClick={() => showDetail({ action: 'detail' })}>查看加急账单</a> */}
      {/* <a onClick={() => add({ action: 'add' })}>录入</a>
      <a onClick={() => edit({ action: 'edit' })}>修改</a>
      <a onClick={() => props.showFormModal({ action: 'pdf' })}>打印</a> */}
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      noDefault
      {...props}
    ></SmartTable>
  );
};

ClientReportTable.defaultProps = {
  showModal: () => {},
};

export default ClientReportTable;
