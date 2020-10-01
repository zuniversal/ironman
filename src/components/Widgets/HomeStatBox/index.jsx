import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Form, Input, Statistic } from 'antd';

import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import completeInspect from '@/static/assets/completeInspect.png'; //
import completeMissionNum from '@/static/assets/completeMissionNum.png'; //
import completeWorkOrder from '@/static/assets/completeWorkOrder.png'; //
import StatBox from '@/components/Widgets/StatBox';

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

const StatBoxCom = props => {
  // console.log(' StatBoxCom   props, ,   ： ', props);
  return (
    <StatBox
      {...props}
      left={
        <>
          <img src={props.icon} className="icon" />
          <div className="info">
            {/* <div className='title'>
            {props.title}
          </div> */}
            <div className="num">
              <Statistic title={props.title} value={props.num} />
            </div>
          </div>
        </>
      }
      right={
        <>
          <div className="stat">
            <div className="statInfo">{props.week}</div>
            <div className="statInfo">{props.day}</div>
          </div>
        </>
      }
    ></StatBox>
  );
};

const HomeStatBox = props => {
  // console.log(' HomeStatBox   props, ,   ： ', props);
  return (
    <div className="homeStatBoxWrapper">
      {statConfig.map((v, i) => (
        <StatBoxCom {...v} key={i}></StatBoxCom>
      ))}
    </div>
  );
};

HomeStatBox.defaultProps = {};

HomeStatBox.propTypes = {};

export default HomeStatBox;
