import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Tabs } from 'antd';
import SmartTable from '@/common/SmartTable';
import { ANIMATE } from '@/constants';

const CsHomeTabsTable = props => {
  const columns = [
    {
      title: '监控设备编号(变压器编号)',
    },
    {
      title: '线路号',
    },
    {
      title: 'A相电流',
    },
    {
      title: 'B相电流',
    },
    {
      title: 'C相电流',
    },
    {
      title: 'A相功率',
    },
    {
      title: 'B相功率',
    },
    {
      title: 'C相功率',
    },
    {
      title: '总功率',
    },
    {
      title: 'A相无功功率',
    },
    {
      title: 'B相无功功率',
    },
    {
      title: 'C相无功功率',
    },
    {
      title: '总无功功率',
    },
    {
      title: 'A相功率因数',
    },
    {
      title: 'B相功率因数',
    },
    {
      title: 'C相功率因数',
    },
    {
      title: '总功率因数',
    },
    {
      title: '频率有功需量',
    },
    {
      title: '感性无功',
    },
    {
      title: '容性无功',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => props.showFormModal({ action: 'complete' })}>完成</a>
      <a onClick={() => props.showFormModal({ action: 'remove' })}>删除</a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      scroll={{ x: 800 }}
      rowLength={3}
      pagination={false}
      extra={extra}
      noDefault
      animation={ANIMATE.bounceInLeft}
      {...props}
    ></SmartTable>
  );
};

const CsHomeAssetsTable = props => {
  const columns = [
    {
      title: '出厂设备编号',
    },
    {
      title: '设备名称',
    },
    {
      title: '一级下属设备',
    },
    {
      title: '二级下属设备',
    },
    {
      title: '三级下属设备',
    },
    {
      title: '设备类型',
    },
    {
      title: '制造厂家',
    },
    {
      title: '设备型号',
    },
    {
      title: '出产日',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a onClick={() => props.showFormModal({ action: 'complete' })}>完成</a>
      <a onClick={() => props.showFormModal({ action: 'remove' })}>删除</a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      rowLength={3}
      pagination={false}
      extra={extra}
      noDefault
      animation={ANIMATE.bounceInRight}
      {...props}
    ></SmartTable>
  );
};

const tableConfig = [
  {
    tab: '电站传感信息',
    Table: CsHomeTabsTable,
  },
  {
    tab: '电站资产',
    Table: CsHomeAssetsTable,
  },
];

const { TabPane } = Tabs;

const CsHomeTableCom = props => {
  const callback = key => {
    console.log(' callback   ,   ： ', key);
  };

  return (
    <div className="statTabPanes">
      <Tabs defaultActiveKey="0" onChange={callback}>
        {tableConfig.map((v, i) => (
          <TabPane tab={v.tab} key={i}>
            <v.Table></v.Table>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default CsHomeTableCom;
