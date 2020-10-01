import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Form, Input, Statistic } from 'antd';

import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import operateDays from '@/static/assets/operateDays.png'; //
import weights from '@/static/assets/weights.png'; //
import completeInspect from '@/static/assets/completeInspect.png'; //
import StatBox from '@/components/Widgets/StatBox';

const { Countdown } = Statistic;

const statConfig = [
  {
    title: '运营总天数',
    num: '126560',
    style: {
      background: 'linear-gradient(135deg, #31C8FF 0%, #009DFF 100%)',
      boxShadow: '0px 5px 10px rgba(27, 163, 252, 0.5)',
    },
    icon: operateDays,
  },
  {
    title: '总负荷',
    num: '126560',
    style: {
      background: 'linear-gradient(135deg, #FEB833 0%, #FE9833 100%)',
      boxShadow: '0px 5px 10px rgba(253, 156, 51, 0.5)',
    },
    icon: weights,
  },
  {
    title: '完成遇检数',
    num: '126560',
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
          <img src={props.icon} className="icon" />
        </>
      }
    ></StatBox>
  );
};

const CsHomeStatBox = props => {
  // console.log(' CsHomeStatBox   props, ,   ： ', props);
  return (
    <div className="csHomeStatBoxWrapper">
      {statConfig.map((v, i) => (
        <StatBoxCom {...v} key={i}></StatBoxCom>
      ))}
    </div>
  );
};

CsHomeStatBox.defaultProps = {};

CsHomeStatBox.propTypes = {};

export default CsHomeStatBox;
