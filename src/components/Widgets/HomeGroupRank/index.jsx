import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import {
  Form,
  Empty,
  Statistic,
  Tabs,
  DatePicker,
  Row,
  Col,
  List,
  Avatar,
} from 'antd';

import one from '@/static/assets/one.png';
import two from '@/static/assets/two.png';
import three from '@/static/assets/three.png';
import noData from '@/static/assets/noData.png';
import { ANIMATE } from '@/constants';

const groupData = [
  { name: '小组 1', count: '323' },
  { name: '小组 2', count: '312' },
  { name: '小组 3', count: '265' },
  { name: '小组 4', count: '241' },
  { name: '小组 5', count: '213' },
  { name: '小组 6', count: '207' },
];

const rankIconMap = {
  0: one,
  1: two,
  2: three,
};

const HomeGroupRank = props => {
  return (
    <div className="homeGroupRankWrapper">
      <div className="homeTitle">{props.groupTitle}</div>
      <div className={'homeGroupRank '}>
        {props.data.length ? (
          props.data.map((v, i) => (
            <div className={`rowWrapper ${ANIMATE.flipInX} `} key={i}>
              <div className="left">
                {i < 3 ? (
                  <img src={rankIconMap[i]} className="iconMg" />
                ) : (
                  <div className="iconMg iconBall">{i + 1}</div>
                )}
                {v.name}
              </div>
              <div className={`right val${i < 3 ? i : ''}`}>
                <Statistic value={v.count} />
              </div>
            </div>
          ))
        ) : (
          <Empty image={noData} />
        )}
      </div>
    </div>
  );
};

HomeGroupRank.defaultProps = {
  data: groupData,
  groupTitle: '小组排名',
};

HomeGroupRank.propTypes = {
  data: PropTypes.array,
};

export default HomeGroupRank;
