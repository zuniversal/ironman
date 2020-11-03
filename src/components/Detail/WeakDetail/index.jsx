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

import Descriptions from '@/common/Descriptions'; //

const WeakDetail = props => {
  console.log(' WeakDetail  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const config = [
    {
      label: '名称',
      value: '名称',
    },
    {
      label: '电站',
      value: '电站',
    },

    {
      label: '当前状态',
      value: '当前状态',
    },

    {
      label: '创建日期',
      value: '创建日期',
    },

    {
      label: '领取人',
      value: '领取人',
    },

    {
      label: '领取时间',
      value: '领取时间',
    },

    {
      label: '开始时间',
      value: '开始时间',
    },

    {
      label: '完成时间',
      value: '完成时间',
    },

    {
      label: '任务日志',
      value:
        '20200808 10:10李四因巡检员身体欠佳原因将任务巡检日期由20200810 调整成20200810',
    },
    {
      label: '任务日志',
      value:
        '220200809 10:10李四因巡检员身体欠佳原因将任务巡检日期由20200810 调整成20200811',
    },
  ];

  return (
    <div>
      <Descriptions config={config}></Descriptions>
    </div>
  );
};

WeakDetail.defaultProps = {};

WeakDetail.propTypes = {};

export default WeakDetail;
