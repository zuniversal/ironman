import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Form, Input, Statistic } from 'antd';

import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import completeInspect from '@/static/assets/completeInspect.png';
import completeMissionNum from '@/static/assets/completeMissionNum.png';
import completeWorkOrder from '@/static/assets/completeWorkOrder.png';
import StatBox from '@/components/Widgets/StatBox';
import { ANIMATE } from '@/constants';
import Icon from '@/components/Widgets/Icons';

const { bounceIn, slideInDown } = ANIMATE;

const { Countdown } = Statistic;

const statConfig = [
  {
    dataKey: 'order_data',
    title: 'CPU',
    val: '23 / 88',
    unit: '核',
    day: '日环比 ',
    style: {
      background: 'linear-gradient(135deg, #31C8FF 0%, #009DFF 100%)',
      boxShadow: '0px 5px 10px rgba(27, 163, 252, 0.5)',
    },
    icon: 'csMonitorCPU',
  },
  {
    dataKey: 'task_data',
    title: '内存',
    val: '23 / 88',
    unit: 'G',
    day: '日环比 ',
    style: {
      background: 'linear-gradient(135deg, #FEB833 0%, #FE9833 100%)',
      boxShadow: '0px 5px 10px rgba(253, 156, 51, 0.5)',
    },
    icon: 'csMonitorRAM',
  },
  {
    dataKey: 'inspe_data',
    title: '存储',
    val: '23 / 88',
    unit: 'T',
    day: '日环比 ',
    style: {
      background: 'linear-gradient(135deg, #FF8E8E 0%, #FF6969 100%)',
      boxShadow: '0px 5px 10px rgba(252, 27, 27, 0.3)',
    },
    icon: 'csMonitorMemory',
  },
  {
    dataKey: 'inspe_data',
    title: '网络',
    val: '23 / 88',
    unit: 'M',
    day: '日环比 ',
    style: {
      background: 'linear-gradient(135deg, #3CD07F 0%, #1AB460 100%)',
      boxShadow: '0px 5px 10px #1AB460',
    },
    icon: 'csMonitorNetwork',
  },
];

const StatBoxCom = props => {
  // console.log(' StatBoxCom   props, ,   ： ', props);
  const { data } = props;
  return (
    <StatBox
      {...props}
      statBoxCls={`${ANIMATE.flipInX}`}
      left={
        <>
          <div className="unit">{props.title}</div>
        </>
      }
      right={
        <>
          {props.iconCom ? props.iconCom : <Icon icon={props.icon} />}
          <div className="statInfo">
            {props.val} {props.unit}
          </div>
        </>
      }
    ></StatBox>
  );
};

StatBoxCom.defaultProps = {
  data: {},
};

const CsMonitorStatBox = props => {
  // console.log(' CsMonitorStatBox   props, ,   ： ', props);
  return (
    <div className="csMonitorStatBoxWrapper dfc">
      {props.config.map((v, i) => (
        <StatBoxCom {...v} data={props.data[v.dataKey]} key={i}></StatBoxCom>
      ))}
    </div>
  );
};

CsMonitorStatBox.defaultProps = {
  data: {},
  config: statConfig,
};

export default CsMonitorStatBox;
