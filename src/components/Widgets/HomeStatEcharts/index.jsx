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
import SmartEcharts from '@/common/SmartEcharts';
import TimeChoice from '@/components/Widgets/TimeChoice';
import HomeGroupRank from '@/components/Widgets/HomeGroupRank';
import HomeBar from '@/components/Echarts/HomeBar';
import one from '@/static/assets/one.png';
import two from '@/static/assets/two.png';
import three from '@/static/assets/three.png';
import { ANIMATE } from '@/constants';

const statConfig = [
  {
    tab: '巡检统计',
    requestFn: 'getInspectionsChart',
    // num: '126560',
  },
  {
    tab: '工单统计',
    requestFn: 'getOrdersChart',
    // num: '126560',
  },
];

const legend = ['工单数'];

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
  console.log(' %c StatTabPanes xx 组件 this.state, this.props ： ', props); //
  const [activeKey, setActiveKey] = useState('0');
  const onChange = index => {
    console.log(' onChange   ,   ： ', index, activeKey);
    setActiveKey(index);
    props.onOptionChange(statConfig[index]);
  };

  const countData = props.countData ?? props.barData.map(v => v.count);
  const xAxisData = props.xAxisData ?? props.barData.map(v => v.date);
  // console.log(' countData  .map v ： ', props.barData, countData, xAxisData);

  const barGroupRankCom = (
    <Row gutter={24}>
      <Col span={16} className={`${ANIMATE.slideInLeft} `}>
        <div className="homeTitle">{props.homeTitle}</div>
        <HomeBar
          // {...props}
          data={countData}
          xAxisData={xAxisData}
        ></HomeBar>
        {/* <SmartEcharts
        data={[]}
        type="bar"
        legend={legend}
        xAxis={xAxis}
        noToolBox
        {...props}
      ></SmartEcharts> */}
      </Col>
      <Col span={8} className={`rankWrapper df ${ANIMATE.slideInRight} `}>
        {/* <div className="homeGroupRankWrapper">
        <div className="homeTitle">小组排名</div>
        <HomeGroupRank data={props.rankData}></HomeGroupRank>
      </div> */}
        <HomeGroupRank
          data={props.rankData}
          groupTitle={props.groupTitle}
        ></HomeGroupRank>
      </Col>
    </Row>
  );

  const withTabPanes = (
    <div className="statTabPanes">
      <Tabs
        // defaultActiveKey="0"
        activeKey={activeKey}
        onChange={onChange}
        tabBarExtraContent={
          <TimeChoice
            onOptionChange={props.onOptionChange}
            key={activeKey}
            activeVal={props.activeVal}
          ></TimeChoice>
        }
      >
        {props.statConfig.map((v, i) => (
          <TabPane tab={v.tab} key={i}>
            {barGroupRankCom}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );

  if (props.withTabpanes) {
    return withTabPanes;
  }

  return barGroupRankCom;
};

StatTabPanes.defaultProps = {
  barData: [],
  statConfig: [
    {
      tab: '',
      requestFn: '',
    },
  ],
};

const HomeStatEcharts = props => {
  console.log(' HomeStatEcharts   props, ,   ： ', props);
  return (
    <div className="homeStatEchartsWrapper">
      <StatTabPanes {...props}></StatTabPanes>
    </div>
  );
};

HomeStatEcharts.defaultProps = {
  // chartData: {},
};

HomeStatEcharts.propTypes = {};

export default HomeStatEcharts;
