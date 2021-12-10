import React, { PureComponent } from 'react';
import './style.less';
import { Button, Spin, Row, Col, Divider, Progress, Tooltip } from 'antd';
import PageTitle from '@/components/Widgets/PageTitle';
import TimeChoice from '@/components/Widgets/TimeChoice';
import RingPieEchart from '@/components/Echarts/RingPieEchart';
import CsMonitorStatBox from '@/components/Widgets/CsMonitorStatBox';
import HomeStatEcharts from '@/components/Widgets/HomeStatEcharts';
import TurnRateSearchForm from '@/components/Form/TurnRateSearchForm';
import { actions, mapStateToProps } from '@/models/turnRate';
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

// const mapStateToProps = ({ home, loading }) => ({
//   ...home,
//   loading,
// });

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  noMountFetch: true,
})
class TurnRate extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  onTurnRateProgressChange = params => {
    console.log(
      ' onTurnRateProgressChange,  , ： ',
      params,
      this.props.turnRateSearchInfo,
      this.state,
      this.props,
    );
    const data = {
      ...this.props.turnRateSearchInfo,
      ...params,
    };
    if (params.requestFn) {
      data.start_time = null;
      data.end_time = null;
    }
    console.log(' data ： ', data);
    this.props.getTurnRateProgressAsync(data);
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.onTurnRateProgressChange(params.formData);
  };
  renderRateBar = params => {
    console.log(
      ' renderRateBar 修改  ： ',
      this.props,
      this.props.turnRateData,
    );
    const turnRateBarConfig = [
      {
        label: '客户线索',
        value: '80',
        value: this.props.turnRateData.customerCluePercent,
        color: '#36C7EA',
        title: this.props.turnRateData.customer_clue_number,
      },
      {
        label: '拜访客户数',
        value: '60',
        value: this.props.turnRateData.visitCustomerPercent,
        color: '#FCA149',
        title: this.props.turnRateData.visit_customer_number,
      },
      {
        label: '提交方案数',
        value: '50',
        value: this.props.turnRateData.schemePercent,
        color: '#00B460',
        title: this.props.turnRateData.scheme_number,
      },
      {
        label: '已签约',
        value: '30',
        value: this.props.turnRateData.contractPercent,
        color: '#F569CA',
        title: this.props.turnRateData.contract_number,
      },
    ];
    return (
      <div className={`progressWrappper`}>
        <PageTitle title={'转化率'}>
          <div className={`fsb turnRateSearchForm`}>
            <TurnRateSearchForm
              init={this.props.searchInfo}
              onFieldChange={this.onFieldChange}
            ></TurnRateSearchForm>
            {/* <TimeChoice
              onOptionChange={this.onClientSignTrendChange}
            ></TimeChoice> */}
          </div>
        </PageTitle>
        {turnRateBarConfig.map((v, i) => (
          <Row gutter={[24, 16]} key={i}>
            <Col span={3} className={`t-r`}>
              {v.label}
            </Col>
            <Col span={21}>
              <Tooltip title={v.title}>
                <Progress
                  percent={v.value}
                  strokeColor={v.color}
                  status="active"
                  width={80}
                />
              </Tooltip>
            </Col>
          </Row>
        ))}

        <Divider />
      </div>
    );
  };

  onSaleAmountChange = params => {
    console.log(
      ' onSaleAmountChange,  , ： ',
      params,
      this.props.clientSignSearchInfo,
      this.state,
      this.props,
    );
    const data = {
      ...this.props.clientSignSearchInfo,
      ...params,
    };
    if (params.requestFn) {
      data.start_time = null;
      data.end_time = null;
    }
    console.log(' data ： ', data);
    this.props.getClientSignTrendAsync(data);
  };
  renderStatEcharts = params => {
    const barData = this.props.clientSignData.sign_contract_status;
    // const isLoading = this.props.loading.effects['home/getChartAsync'];
    const isLoading = false;
    return (
      <Spin spinning={isLoading} className={'loadingWrapper'} size="large">
        <div className={`fsb`}>
          <PageTitle title={'客户签约'}></PageTitle>
          <TimeChoice onOptionChange={this.onSaleAmountChange}></TimeChoice>
        </div>
        {/* <HomeGroupRank></HomeGroupRank> */}
        {/* <PageTitle title={'客户签约'}></PageTitle> */}
        <HomeStatEcharts
          barData={barData}
          rankData={this.props.clientSignData.rank}
          onOptionChange={this.onOptionChange}
          getChartAsync={this.props.getChartAsync}
          homeTitle={'签约客户转化趋势'}
          groupTitle={'员工转化排名'}
          countData={this.props.clientSignData.sign_contract_status?.data}
          xAxisData={this.props.clientSignData.sign_contract_status?.date}
        ></HomeStatEcharts>

        <Divider />
      </Spin>
    );
  };

  componentDidMount() {
    this.props.getTurnRateProgressAsync();
    this.props.getClientSignTrendAsync();
  }

  render() {
    console.log(
      ' %c turnRateBarConfig 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //
    return (
      <div className="turnRate">
        {this.renderRateBar()}

        {this.renderStatEcharts()}
      </div>
    );
  }
}

export default TurnRate;
