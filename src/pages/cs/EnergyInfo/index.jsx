import React, { PureComponent } from 'react';
import './style.less';
import PageTitle from '@/components/Widgets/PageTitle';
import CsMonitorStatBox from '@/components/Widgets/CsMonitorStatBox';
import SmartFormModal from '@/common/SmartFormModal';
import { actions, mapStateToProps } from '@/models/energyInfo';
import LineEcharts, { weekArr } from './LineEcharts';
import SmartHOC from '@/common/SmartHOC';
import {
  recentPowerAxisConfig,
  powerMoneyAxisConfig,
  dayHoursNum,
} from '@/configs';
import { connect } from 'umi';

import power1 from '@/static/assets/cs/power1.png';
import power2 from '@/static/assets/cs/power2.png';
import power3 from '@/static/assets/cs/power3.png';
import power4 from '@/static/assets/cs/power4.png';
import { Row, Col, Tabs, Collapse } from 'antd';
import { arrMapObj } from '@/utils';
const { TabPane } = Tabs;
const { Panel } = Collapse;

const TITLE = '';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `kw{TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

const detailFormMap = {};

// const mapStateToProps = ({ houseNo, }) => houseNo;

const CollapseCom = props => {
  const { com, header = '', extra } = props;
  console.log(' CollapseCom   props,   ： ', props);
  return (
    <Collapse
      defaultActiveKey={['1']}
      expandIconPosition={'right'}
      className={`collapseCom`}
      showArrow={false}
      collapsible={false}
    >
      <Panel header={header} key="1" extra={extra}>
        {com}
      </Panel>
    </Collapse>
  );
};

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class EnergyInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderStatBox = params => {
    const statConfig = [
      {
        dataKey: 'today',
        title: '今日用电量',
        val: '10',
        unit: 'kWh',
        style: {
          background: 'linear-gradient(135deg, #FEB833 0%, #FE9833 100%)',
          boxShadow: '0px 5px 10px rgba(253, 156, 51, 0.5)',
        },
        iconCom: <img src={power2} className="icon" />,
      },
      {
        dataKey: 'yesterday',
        title: '昨日用电量',
        val: '10',
        unit: 'kWh',
        style: {
          background: 'linear-gradient(135deg, #FF8E8E 0%, #FF6969 100%)',
          boxShadow: '0px 5px 10px rgba(252, 27, 27, 0.3)',
        },
        iconCom: <img src={power3} className="icon" />,
      },
      {
        dataKey: 'this_month',
        title: '本月用电量',
        val: '10',
        unit: 'kWh',
        style: {
          background: 'linear-gradient(135deg, #31C8FF 0%, #009DFF 100%)',
          boxShadow: '0px 5px 10px rgba(27, 163, 252, 0.5)',
        },
        iconCom: <img src={power1} className="icon" />,
      },
      {
        dataKey: 'last_month',
        title: '上月用电量',
        val: '10',
        unit: 'kWh',
        style: {
          background: 'linear-gradient(135deg, #3CD07F 0%, #1AB460 100%)',
          boxShadow: '0px 5px 10px #1AB460',
        },
        iconCom: <img src={power4} className="icon" />,
      },
    ];
    return (
      <CsMonitorStatBox
        data={this.props.statisticData}
        config={statConfig}
      ></CsMonitorStatBox>
    );
  };
  renderHavePowerEcharts = params => {
    const config = {
      yAxisTitleArr: [
        '有功电量:kWh',
        // '单价:元'
        '',
      ],
      xAxis: this.props.powerData.xAxis,
      xAxis: dayHoursNum,
      data: [this.props.powerData.data],
      lineNameArr: [],
    };
    console.log(' renderHavePowerEcharts ： ', config); //
    const tabs = (
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        {[
          {
            tab: '有功电量',
            key: 'power_data',
          },
        ].map((v, i) => (
          <TabPane {...v}></TabPane>
        ))}
      </Tabs>
    );
    return (
      <>
        {/* <PageTitle title={'实时有功电量'}></PageTitle> */}
        {tabs}
        <LineEcharts {...config}></LineEcharts>
      </>
    );
  };
  renderMonthPowerEcharts = params => {
    const powerTabConfig = [
      {
        tab: '有功电量',
        key: 'power_data',
        yAxis: '电量:kWh',
      },
      // {
      //   tab: '电量电费',
      //   key: '电量电费',
      // },
      {
        tab: '累计有功电量',
        key: 'power',
        yAxis: '电量:kWh',
      },
      // {
      //   tab: '累计电量电费',
      //   key: '累计电量电费',
      // },
      {
        tab: '平均有功功率',
        key: 'active_power',
        yAxis: '功率:kW',
      },
      {
        tab: '功率因数',
        key: 'power_factor',
        yAxis: '',
      },
    ];
    console.log(
      ' renderMonthPowerEcharts ： ',
      this.props.recentPowerType,
      arrMapObj(powerTabConfig, { key: 'key', label: 'yAxis' }),
    ); //
    let yAxisTitle = arrMapObj(powerTabConfig, { key: 'key', label: 'yAxis' })[
      this.props.recentPowerType
    ];
    const onChange = type => {
      console.log(' onChange   ,   ： ', type);
      this.props.getRecentPowerAsync({
        type,
      });
    };

    const lineNameArr =
      this.props.recentPowerType === 'power'
        ? ['累计有功电量']
        : recentPowerAxisConfig;

    const config = {
      // yAxisTitle: '',
      yAxisTitle2: '',
      xAxis: this.props.powerUseData.xAxis,
      data: this.props.powerUseData.data,
      yAxisTitleArr: [yAxisTitle],
      lineNameArr: recentPowerAxisConfig,
      lineNameArr,
    };
    const tabs = (
      <Tabs defaultActiveKey="1" onChange={onChange}>
        {powerTabConfig.map((v, i) => (
          <TabPane {...v}></TabPane>
        ))}
      </Tabs>
    );
    return (
      <>
        {/* <PageTitle title={'本月用电曲线'}></PageTitle> */}
        {tabs}
        <LineEcharts {...config}></LineEcharts>
      </>
    );
  };
  render10DayPowerEcharts = params => {
    const config = {
      yAxisTitle2: '电量电费:元',
      xAxis: this.props.recentPower10DayData.xAxis,
      data: this.props.recentPower10DayData.data,
      yAxisTitleArr: [
        '有功电量:kWh',
        // '电量电费:元'
        '电费:元',
      ],
      lineNameArr: powerMoneyAxisConfig,
      yAxisIndex: 3,
    };
    console.log(' render10DayPowerEcharts ： ', config); //
    return (
      <>
        {/* <PageTitle title={'近10日用电曲线'}></PageTitle> */}
        <LineEcharts {...config}></LineEcharts>
      </>
    );
  };
  render6DayPowerEcharts = params => {
    const config = {
      yAxisTitle2: '电量电费:元',
      xAxis: this.props.recentPower6MonthData.xAxis,
      data: [
        [
          121.6,
          151.9,
          191.0,
          201.7,
          231.4,
          261.7,
          281.6,
          221.2,
          284.3,
          321.7,
          371.0,
          351.8,
        ].map(v => v + 100),
        [
          121.6,
          151.9,
          191.0,
          201.7,
          231.4,
          261.7,
          281.6,
          221.2,
          284.3,
          321.7,
          371.0,
          351.8,
        ],
      ],
      data: this.props.recentPower6MonthData.data,
      yAxisTitleArr: [
        '有功电量:kWh',
        // '电量电费:元'
        '电费:元',
      ],
      lineNameArr: powerMoneyAxisConfig,
      yAxisIndex: 3,
    };
    return (
      <>
        {/* <PageTitle title={'近6月用电曲线'}></PageTitle> */}
        <LineEcharts {...config}></LineEcharts>
      </>
    );
  };
  renderEcharts1 = params => {
    return (
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <CollapseCom
            com={this.renderHavePowerEcharts()}
            header={'实时有功电量'}
            key={'ContactCollapseCom'}
          ></CollapseCom>
        </Col>
        <Col span={12}>
          <CollapseCom
            com={this.renderMonthPowerEcharts()}
            header={'本月用电曲线'}
            key={'ContactCollapseCom'}
          ></CollapseCom>
        </Col>
      </Row>
    );
  };
  renderEcharts2 = params => {
    return (
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <CollapseCom
            com={this.render10DayPowerEcharts()}
            header={'近10日用电曲线'}
            key={'ContactCollapseCom'}
          ></CollapseCom>
        </Col>
        <Col span={12}>
          <CollapseCom
            com={this.render6DayPowerEcharts()}
            header={'近6月用电曲线'}
            key={'ContactCollapseCom'}
          ></CollapseCom>
        </Col>
      </Row>
    );
  };
  componentDidMount() {
    this.props.getPowerStatisticAsync({});
    this.props.getRecentPowerAsync({
      type: 'power_data',
    });
    this.props.getPowerDataAsync({});
    this.props.getRecentPower10DayAsync();
    this.props.getRecentPower6MonthAsync();
  }

  render() {
    console.log(
      ' EnergyInfo 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    return (
      <div className="energyInfo">
        {this.renderStatBox()}
        {this.renderEcharts1()}
        {this.renderEcharts2()}
      </div>
    );
  }
}

export default EnergyInfo;
