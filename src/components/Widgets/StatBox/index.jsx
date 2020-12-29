import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Form, Input, Statistic } from 'antd';

import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import completeInspect from '@/static/assets/completeInspect.png'; //
import completeMissionNum from '@/static/assets/completeMissionNum.png'; //
import completeWorkOrder from '@/static/assets/completeWorkOrder.png'; //

const { Countdown } = Statistic;

const statConfig = [
  {
    title: '完成工单数',
    num: '126560',
    week: '周同比  ↑12%',
    day: '日环比  ↓11%',
    style: {
      background: 'linear-gradient(135deg, #31C8FF 0%, #009DFF 100%)',
      boxShadow: '0px 5px 10px rgba(27, 163, 252, 0.5)',
    },
    icon: completeWorkOrder,
  },
  {
    title: '完成客户任务数',
    num: '126560',
    week: '周同比  ↑12%',
    day: '日环比  ↓11%',
    style: {
      background: 'linear-gradient(135deg, #FEB833 0%, #FE9833 100%)',
      boxShadow: '0px 5px 10px rgba(253, 156, 51, 0.5)',
    },
    icon: completeMissionNum,
  },
  {
    title: '完成巡检数',
    num: '126560',
    week: '周同比  ↑12%',
    day: '日环比  ↓11%',
    style: {
      background: 'linear-gradient(135deg, #FF8E8E 0%, #FF6969 100%)',
      boxShadow: '0px 5px 10px rgba(252, 27, 27, 0.3)',
    },
    icon: completeInspect,
  },
];

const StatBox = props => {
  // console.log(' StatBox   props, ,   ： ', props);
  return (
    <div style={props.style} className={`statBox ${props.statBoxCls}`}>
      <div className="left">{props.left}</div>
      <div className="right">{props.right}</div>
    </div>
  );
};

const HomeStatBox = props => {
  console.log(' HomeStatBox   props, ,   ： ', props);
  return (
    <div className="statBoxWrapper">
      {statConfig.map((v, i) => (
        <StatBox {...v} key={i}></StatBox>
      ))}
    </div>
  );
};

HomeStatBox.defaultProps = {};

HomeStatBox.propTypes = {};

export default StatBox;
