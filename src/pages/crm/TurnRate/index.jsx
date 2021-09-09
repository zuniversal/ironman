import React, { PureComponent } from 'react';
import './style.less';
import { Button, Spin, Row, Col, Divider, Progress } from 'antd';
import PageTitle from '@/components/Widgets/PageTitle';
import TimeChoice from '@/components/Widgets/TimeChoice';
import RingPieEchart from '@/components/Echarts/RingPieEchart';
import CsMonitorStatBox from '@/components/Widgets/CsMonitorStatBox';
import HomeStatEcharts from '@/components/Widgets/HomeStatEcharts';
import TurnRateSearchForm from '@/components/Form/TurnRateSearchForm';
import {
  actions,
  // mapStateToProps
} from '@/models/turnRate';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { saleDataEchartsConfig } from '@/configs';

import power1 from '@/static/assets/cs/power1.png';
import power2 from '@/static/assets/cs/power2.png';
import power3 from '@/static/assets/cs/power3.png';
import power4 from '@/static/assets/cs/power4.png';

const TITLE = '';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
};

const detailFormMap = {};

const mapStateToProps = ({ home, loading }) => ({
  ...home,
  loading,
});

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class TurnRate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderRateBar = params => {
    console.log(' renderRateBar 修改  ： ', this.props);
    const turnRateBarConfig = [
      {
        label: '客户线索',
        value: '80',
        // value: this.props.turnRateData.customer_clue_number,
        color: '#36C7EA',
      },
      {
        label: '拜访客户数',
        value: '60',
        // value: this.props.turnRateData.visit_customer_number,
        color: '#FCA149',
      },
      {
        label: '提交方案数',
        value: '50',
        // value: this.props.turnRateData.scheme_number,
        color: '#00B460',
      },
      {
        label: '已签约',
        value: '30',
        // value: this.props.turnRateData.contract_number,
        color: '#F569CA',
      },
    ];
    return (
      <div className={`progressWrappper`}>
        <PageTitle title={'转化率'}>
          <div className={`fsb`}>
            <TurnRateSearchForm
              init={this.props.searchInfo}
              onFieldChange={this.onFieldChange}
            ></TurnRateSearchForm>
            <TimeChoice></TimeChoice>
          </div>
        </PageTitle>
        {turnRateBarConfig.map((v, i) => (
          <Row gutter={[24, 16]} key={i}>
            <Col span={3} className={`t-r`}>
              {v.label}
            </Col>
            <Col span={21}>
              <Progress
                percent={v.value}
                strokeColor={v.color}
                status="active"
                width={80}
              />
            </Col>
          </Row>
        ))}

        <Divider />
      </div>
    );
  };

  onOptionChange = params => {
    console.log(
      ' onOptionChange,  , ： ',
      params,
      this.props.chartSearchInfo,
      this.state,
      this.props,
    );
    const data = {
      ...this.props.chartSearchInfo,
      ...params,
    };
    if (params.requestFn) {
      data.start_time = null;
      data.end_time = null;
    }
    console.log(' data ： ', data);
    this.props.getChartAsync(data);
  };
  renderStatEcharts = params => {
    // const barData = this.props.chartData;
    const barData = [];
    // const isLoading = this.props.loading.effects['home/getChartAsync'];
    const isLoading = false;
    return (
      <Spin spinning={isLoading} className={'loadingWrapper'} size="large">
        <div className={`fsb`}>
          <PageTitle title={'客户签约'}></PageTitle>
          <TimeChoice></TimeChoice>
        </div>
        {/* <HomeGroupRank></HomeGroupRank> */}
        {/* <PageTitle title={'客户签约'}></PageTitle> */}
        <HomeStatEcharts
          barData={barData}
          rankData={this.props.chartData}
          onOptionChange={this.onOptionChange}
          getChartAsync={this.props.getChartAsync}
          homeTitle={'签约客户转化趋势'}
          groupTitle={'员工转化排名'}
        ></HomeStatEcharts>

        <Divider />
      </Spin>
    );
  };

  componentDidMount() {
    this.props.getTurnRateProgressAsync();
  }

  render() {
    return (
      <div className="turnRate">
        {this.renderRateBar()}

        {this.renderStatEcharts()}
      </div>
    );
  }
}

export default TurnRate;
