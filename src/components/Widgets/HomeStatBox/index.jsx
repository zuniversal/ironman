import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Form, Input, Statistic } from 'antd';

import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import completeInspect from '@/static/assets/completeInspect.png'; //
import completeMissionNum from '@/static/assets/completeMissionNum.png'; //
import completeWorkOrder from '@/static/assets/completeWorkOrder.png'; //
import StatBox from '@/components/Widgets/StatBox';
import { ANIMATE } from '@/constants'; //

const { bounceIn, slideInDown } = ANIMATE;

const { Countdown } = Statistic;

const statConfig = [
  {
    dataKey: 'order_data',
    title: '完成工单数',
    num: '126560',
    week: '周同比 ',
    day: '日环比 ',
    style: {
      background: 'linear-gradient(135deg, #31C8FF 0%, #009DFF 100%)',
      boxShadow: '0px 5px 10px rgba(27, 163, 252, 0.5)',
    },
    icon: completeWorkOrder,
  },
  {
    dataKey: 'task_data',
    title: '完成客户任务数',
    num: '126560',
    week: '周同比 ',
    day: '日环比 ',
    style: {
      background: 'linear-gradient(135deg, #FEB833 0%, #FE9833 100%)',
      boxShadow: '0px 5px 10px rgba(253, 156, 51, 0.5)',
    },
    icon: completeMissionNum,
  },
  {
    dataKey: 'inspe_data',
    title: '完成巡检数',
    num: '126560',
    week: '周同比 ',
    day: '日环比 ',
    style: {
      background: 'linear-gradient(135deg, #FF8E8E 0%, #FF6969 100%)',
      boxShadow: '0px 5px 10px rgba(252, 27, 27, 0.3)',
    },
    icon: completeInspect,
  },
];

const StatBoxCom = props => {
  // console.log(' StatBoxCom   props, ,   ： ', props);
  const { data } = props; //
  const weekDirectionText = data.week_compare >= 0 ? '↑' : '↓';
  const dayDirectionText = data.day_compare >= 0 ? '↑' : '↓';
  return (
    <StatBox
      {...props}
      statBoxCls={`${ANIMATE.flipInX}`}
      left={
        <>
          <img src={props.icon} className="icon" />
          <div className="info">
            {/* <div className='title'>
            {props.title}
          </div> */}
            <div className="num">
              <Statistic title={props.title} value={data.total_count ?? 0} />
            </div>
          </div>
        </>
      }
      right={
        <>
          <div className="stat">
            <div className="statInfo">
              {props.week} {weekDirectionText}{' '}
              {Math.abs(data.week_compare) * 100}%
            </div>
            <div className="statInfo">
              {props.day} {dayDirectionText} {Math.abs(data.day_compare) * 100}%
            </div>
          </div>
        </>
      }
    ></StatBox>
  );
};

StatBoxCom.defaultProps = {
  data: {},
};

const HomeStatBox = props => {
  // console.log(' HomeStatBox   props, ,   ： ', props);
  return (
    <div className="homeStatBoxWrapper">
      {statConfig.map((v, i) => (
        <StatBoxCom {...v} data={props.data[v.dataKey]} key={i}></StatBoxCom>
      ))}
    </div>
  );
};

HomeStatBox.defaultProps = {};

HomeStatBox.propTypes = {};

export default HomeStatBox;
