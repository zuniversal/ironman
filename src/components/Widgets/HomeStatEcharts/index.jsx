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
import one from '@/static/assets/one.png'; //
import two from '@/static/assets/two.png'; //
import three from '@/static/assets/three.png'; //

const { RangePicker } = DatePicker;

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

const timeChoices = ['今日', '本周', '本月', '全年'];

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

// //
// const StatExtra = () => {
//   const [ active, setActive ] = useState(0)
//   console.log(' StatExtra   ,   ： ', active,   )
//   const timeClick = (v, i) => {
//     console.log(' timeClick   v, i,   ： ', v, i  )
//     setActive(i)
//   }

//   return <div className={'extraWrapper dfc '}  >
//     <div className={'statExtra'}  >
//       {timeChoices.map((v, i) => <a key={i} onClick={() => timeClick(v, i)} className={`${active === i ? 'active' : ''}`}  >
//         {v}
//       </a>)}
//     </div>
//     <RangePicker />
//   </div>
// }

const rankIconMap = {
  0: one,
  1: two,
  2: three,
};

const GroupRank = props => {
  return (
    <div className={'groupRank '}>
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

const groupData = [
  { title: '小组 1', right: '323222' },
  { title: '小组 1', right: '323222' },
  { title: '小组 1', right: '323222' },
  { title: '小组 1', right: '323222' },
  { title: '小组 1', right: '323222' },
  { title: '小组 1', right: '323222' },
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
              <Col span={16}>
                <SmartEcharts
                  data={[]}
                  type="bar"
                  legend={legend}
                  xAxis={xAxis}
                  noToolBox
                  {...props}
                ></SmartEcharts>
              </Col>
              <Col span={8}>
                <div className="title">小组排名</div>
                <GroupRank dataSource={groupData}></GroupRank>
              </Col>
            </Row>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

const StatBox = props => {
  console.log(' StatBox   props, ,   ： ', props);
  return <div style={props.style} className={'statBox'}></div>;
};

const HomeStatEcharts = props => {
  console.log(' HomeStatEcharts   props, ,   ： ', props);
  return (
    <div className="homeStatEchartsWrapper">
      {/* {statConfig.map((v, i) => <StatBox {...v}  key={i}  ></StatBox>)} */}
      <StatTabPanes></StatTabPanes>
    </div>
  );
};

HomeStatEcharts.defaultProps = {};

HomeStatEcharts.propTypes = {};

export default HomeStatEcharts;
