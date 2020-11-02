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

import { TabletOutlined, ScheduleFilled } from '@ant-design/icons';
import SmartEcharts from '@/common/SmartEcharts'; //
import TimeChoice from '@/components/Widgets/TimeChoice';
import HomeGroupRank from '@/components/Widgets/HomeGroupRank';
import one from '@/static/assets/one.png'; //
import two from '@/static/assets/two.png'; //
import three from '@/static/assets/three.png'; //
import { ANIMATE } from '@/constants'; //

const statConfig = [
  {
    tab: '巡检统计',
    num: '126560',
  },
  {
    tab: '工单统计',
    num: '126560',
  },
];

const legend = ['趋势'];

const xAxis = [
  '10月',
  '11月',
  '12月',
  '01月',
  '02月',
  '03月',
  '04月',
  '05月',
  '06月',
  '07月',
  '08月',
  '09月',
];

const { TabPane } = Tabs;

const StatTabPanes = props => {
  const callback = key => {
    console.log(' callback   ,   ： ', key);
  };

  return (
    <div className="statTabPanes">
      <Tabs
        defaultActiveKey="0"
        onChange={callback}
        tabBarExtraContent={<TimeChoice></TimeChoice>}
      >
        {statConfig.map((v, i) => (
          <TabPane tab={v.tab} key={i}>
            <Row gutter={24}>
              <Col span={16} className={`${ANIMATE.slideInLeft} `}>
                <div className="homeTitle">趋势</div>
                <SmartEcharts
                  data={[]}
                  type="bar"
                  legend={legend}
                  xAxis={xAxis}
                  noToolBox
                  {...props}
                ></SmartEcharts>
              </Col>
              <Col
                span={8}
                className={`rankWrapper df ${ANIMATE.slideInRight} `}
              >
                <div className="homeGroupRankWrapper">
                  <div className="homeTitle">小组排名</div>
                  <HomeGroupRank></HomeGroupRank>
                </div>
              </Col>
            </Row>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

const HomeStatEcharts = props => {
  console.log(' HomeStatEcharts   props, ,   ： ', props);
  return (
    <div className="homeStatEchartsWrapper">
      <StatTabPanes></StatTabPanes>
    </div>
  );
};

HomeStatEcharts.defaultProps = {};

HomeStatEcharts.propTypes = {};

export default HomeStatEcharts;
