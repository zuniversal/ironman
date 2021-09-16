import React, { PureComponent } from 'react';
import { Button, Spin, Row, Col, Divider, Progress } from 'antd';
import PageTitle from '@/components/Widgets/PageTitle';
import TimeChoice from '@/components/Widgets/TimeChoice';
import HomeStatBox from '@/components/Widgets/HomeStatBox';
import HomeGroupRank from '@/components/Widgets/HomeGroupRank';
import RingPieEchart from '@/components/Echarts/RingPieEchart';
import CsMonitorStatBox from '@/components/Widgets/CsMonitorStatBox';
import HomeStatEcharts from '@/components/Widgets/HomeStatEcharts';
// import SaleDataSearchForm from '@/components/Form/SaleDataSearchForm';
// import SaleDataForm from '@/components/Form/SaleDataForm';
// import SaleDataTable from '@/components/Table/SaleDataTable';
import SmartFormModal from '@/common/SmartFormModal';
import { actions, mapStateToProps } from '@/models/saleData';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { saleDataEchartsConfig } from '@/configs';

import power1 from '@/static/assets/cs/power1.png';
import power2 from '@/static/assets/cs/power2.png';
import power3 from '@/static/assets/cs/power3.png';
import power4 from '@/static/assets/cs/power4.png';
import completeInspect from '@/static/assets/completeInspect.png';
import completeMissionNum from '@/static/assets/completeMissionNum.png';
import completeWorkOrder from '@/static/assets/completeWorkOrder.png';

const TITLE = '';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
};

const detailFormMap = {};

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  noMountFetch: true,
})
class SaleData extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderStatBox = params => {
    const statConfig = [
      {
        dataKey: 'contract_amount_status',
        title: '总线索数',
        key: 'contract_amount_status',
        num: this.props.saleCountData.amount,
        week: '周同比 ',
        day: '日环比 ',
        style: {
          background: 'linear-gradient(135deg, #31C8FF 0%, #009DFF 100%)',
          boxShadow: '0px 5px 10px rgba(27, 163, 252, 0.5)',
        },
        icon: completeWorkOrder,
        rightTopKey: 'month_increase_amount',
        rightBottomKey: 'month_compare',
        numKey: 'amount',
      },
      {
        dataKey: 'contract_number_status',
        title: '总线索转化率',
        key: 'contract_number_status',
        num: this.props.saleCountData.number,
        week: '周同比 ',
        day: '日环比 ',
        style: {
          background: 'linear-gradient(135deg, #FEB833 0%, #FE9833 100%)',
          boxShadow: '0px 5px 10px rgba(253, 156, 51, 0.5)',
        },
        icon: completeMissionNum,
        rightTopKey: 'month_increase_number',
        rightBottomKey: 'month_compare',
        numKey: 'number',
      },
    ];
    return (
      <>
        <PageTitle title={'销售额'}></PageTitle>
        {/* <CsMonitorStatBox
          data={this.props.saleCountData}
          config={statConfig}
        ></CsMonitorStatBox> */}
        <HomeStatBox
          data={this.props.saleCountData}
          config={statConfig}
        ></HomeStatBox>
        <Divider className={''} />
      </>
    );
  };

  onSaleAmountChange = params => {
    console.log(
      ' onSaleAmountChange,  , ： ',
      params,
      this.props.saleAmountSearchInfo,
      this.state,
      this.props,
    );
    const data = {
      ...this.props.saleAmountSearchInfo,
      ...params,
    };
    if (params.requestFn) {
      data.start_time = null;
      data.end_time = null;
    }
    console.log(' data ： ', data);
    this.props.getSaleAmountAsync(data);
  };
  renderStatEcharts = params => {
    const barData = this.props.saleAmountData.amount;
    // const isLoading = this.props.loading.effects['home/getChartAsync'];
    const isLoading = false;
    return (
      <Spin spinning={isLoading} className={'loadingWrapper'} size="large">
        <div className={`fje`}>
          <TimeChoice onOptionChange={this.onSaleAmountChange}></TimeChoice>
        </div>
        {/* <HomeGroupRank></HomeGroupRank> */}

        <HomeStatEcharts
          barData={barData}
          rankData={this.props.saleAmountData.rank}
          getChartAsync={this.props.getChartAsync}
          homeTitle={'销售额趋势'}
          groupTitle={'员工销售额排名'}
          countData={this.props.saleAmountData.amount?.data}
          xAxisData={this.props.saleAmountData.amount?.date}
        ></HomeStatEcharts>

        <Divider />
      </Spin>
    );
  };

  renderEcharts = params => {
    return (
      <div className={`clientPortraitEchartsWrapper`}>
        <Row gutter={[24, 16]}>
          {saleDataEchartsConfig.map(({ subtextKey, ...v }, i) => (
            <Col span={12} {...v} key={i}>
              <div className={`homeTitle`}>{v.label}</div>
              <RingPieEchart
                data={this.props.saleAreaData[v.key]}
                // option={{
                //   subtext: this.props.saleAreaData[v.subtextKey],
                // }}
                subtextKey={this.props.saleAreaData[v.subtextKey]}
                text={'销售额'}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  componentDidMount() {
    this.props.getSaleCountAsync();
    this.props.getSaleAmountAsync();
    this.props.getSaleAreaAsync();
  }

  render() {
    return (
      <div className="">
        {this.renderStatBox()}

        {this.renderStatEcharts()}

        {this.renderEcharts()}
      </div>
    );
  }
}

export default SaleData;
