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
import { ANIMATE } from '@/constants'; //

const groupData = [
  { title: '小组 1', right: '323' },
  { title: '小组 2', right: '312' },
  { title: '小组 3', right: '265' },
  { title: '小组 4', right: '241' },
  { title: '小组 5', right: '213' },
  { title: '小组 6', right: '207' },
];

const rankIconMap = {
  0: one,
  1: two,
  2: three,
};

const HomeGroupRank = props => {
  return (
    <div className={'homeGroupRank '}>
      {props.data.map((v, i) => (
        <div className={`rowWrapper ${ANIMATE.flipInX} `} key={i}>
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
  data: groupData,
};

HomeGroupRank.propTypes = {
  data: PropTypes.array,
};

export default HomeGroupRank;
