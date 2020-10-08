import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import {
  Form,
  Input,
  Statistic,
  Tabs,
  DatePicker,
  Row,
  Col,
  List,
  Avatar,
} from 'antd';

import one from '@/static/assets/one.png'; //
import two from '@/static/assets/two.png'; //
import three from '@/static/assets/three.png'; //

const groupData = [
  { title: '小组 1', right: '323222' },
  { title: '小组 1', right: '323222' },
  { title: '小组 1', right: '323222' },
  { title: '小组 1', right: '323222' },
  { title: '小组 1', right: '323222' },
  { title: '小组 1', right: '323222' },
];

const rankIconMap = {
  0: one,
  1: two,
  2: three,
};

const HomeGroupRank = props => {
  return (
    <div className={'homeGroupRank '}>
      {props.dataSource.map((v, i) => (
        <div className="rowWrapper" key={i}>
          <div className="left">
            {i < 3 ? (
              <img src={rankIconMap[i]} className="iconMg" />
            ) : (
              <div className="iconMg iconBall">{i + 1}</div>
            )}
            {v.title}
          </div>
          <div className={`right val${i < 3 ? i : ''}`}>
            <Statistic value={v.right} />
          </div>
        </div>
      ))}
    </div>
  );
};

HomeGroupRank.defaultProps = {
  dataSource: groupData,
};

HomeGroupRank.propTypes = {
  dataSource: PropTypes.array,
};

export default HomeGroupRank;
