import React, { PureComponent } from 'react';
import { Button, Spin, Row, Col, Divider, Progress } from 'antd';
import PageTitle from '@/components/Widgets/PageTitle';
import TimeChoice from '@/components/Widgets/TimeChoice';
import RingPieEchart from '@/components/Echarts/RingPieEchart';
import CsMonitorStatBox from '@/components/Widgets/CsMonitorStatBox';
import HomeStatEcharts from '@/components/Widgets/HomeStatEcharts';
import { actions, mapStateToProps } from '@/models/saleClue';
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

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  noMountFetch: true,
})
class SaleClue extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderStatBox = params => {
    console.log(' renderStatBox ： ', this.props.saleClueCountData); //
    const statConfig = [
      {
        dataKey: 'count',
        title: '总线索数',
        val: '',
        unit: '',
        style: {
          background: 'linear-gradient(135deg, #31C8FF 0%, #009DFF 100%)',
          boxShadow: '0px 5px 10px rgba(27, 163, 252, 0.5)',
        },
        iconCom: <img src={power1} className="icon" />,
      },
      {
        dataKey: 'rate',
        title: '总线索转化率',
        val: '',
        unit: '%',
        day: '日环比 ',
        style: {
          background: 'linear-gradient(135deg, #FEB833 0%, #FE9833 100%)',
          boxShadow: '0px 5px 10px rgba(253, 156, 51, 0.5)',
        },
        icon: 'csMonitorRAM',
      },
    ];
    return (
      <>
        <PageTitle title={'线索数'}></PageTitle>
        <CsMonitorStatBox
          data={this.props.saleClueCountData}
          config={statConfig}
        ></CsMonitorStatBox>
        <Divider className={''} />
      </>
    );
  };

  onSaleClueChange = params => {
    console.log(
      ' onSaleClueChange,  , ： ',
      params,
      this.props.saleClueSearchInfo,
      this.state,
      this.props,
    );
    const data = {
      ...this.props.saleClueSearchInfo,
      ...params,
    };
    if (params.requestFn) {
      data.start_time = null;
      data.end_time = null;
    }
    console.log(' data ： ', data);
    this.props.getSaleClueTrendAsync(data);
  };
  renderStatEcharts = params => {
    const barData = this.props.saleClueTrendData.clue_statis;
    // const isLoading = this.props.loading.effects['home/getChartAsync'];
    const isLoading = false;
    return (
      <Spin spinning={isLoading} className={'loadingWrapper'} size="large">
        <div className={`fje`}>
          <TimeChoice onOptionChange={this.onSaleClueChange}></TimeChoice>
        </div>
        {/* <HomeGroupRank></HomeGroupRank> */}

        <HomeStatEcharts
          barData={barData}
          rankData={this.props.saleClueTrendData.rank}
          onOptionChange={this.onOptionChange}
          getChartAsync={this.props.getChartAsync}
          homeTitle={'新增线索数趋势'}
          groupTitle={'员工线索排名'}
        ></HomeStatEcharts>

        <Divider />
      </Spin>
    );
  };
  componentDidMount() {
    this.props.getSaleClueCountAsync();
    this.props.getSaleClueTrendAsync();
  }

  render() {
    return (
      <div className="">
        {this.renderStatBox()}

        {this.renderStatEcharts()}
      </div>
    );
  }
}

export default SaleClue;
