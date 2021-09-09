import React, { PureComponent } from 'react';
import { Button, Spin, Row, Col, Divider, Progress } from 'antd';
import PageTitle from '@/components/Widgets/PageTitle';
import TimeChoice from '@/components/Widgets/TimeChoice';
import HomeGroupRank from '@/components/Widgets/HomeGroupRank';
import RingPieEchart from '@/components/Echarts/RingPieEchart';
import CsMonitorStatBox from '@/components/Widgets/CsMonitorStatBox';
import HomeStatEcharts from '@/components/Widgets/HomeStatEcharts';
// import SaleDataSearchForm from '@/components/Form/SaleDataSearchForm';
// import SaleDataForm from '@/components/Form/SaleDataForm';
// import SaleDataTable from '@/components/Table/SaleDataTable';
import SmartFormModal from '@/common/SmartFormModal';
import {
  actions,
  // mapStateToProps
} from '@/models/client';
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

// const mapStateToProps = ({ houseNo, }) => houseNo;
const mapStateToProps = ({ home, loading }) => ({
  ...home,
  loading,
});

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
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
        dataKey: 'this_month',
        title: '总线索数',
        val: '10',
        unit: 'kWh',
        style: {
          background: 'linear-gradient(135deg, #31C8FF 0%, #009DFF 100%)',
          boxShadow: '0px 5px 10px rgba(27, 163, 252, 0.5)',
        },
        iconCom: <img src={power1} className="icon" />,
      },
      {
        dataKey: 'task_data',
        title: '总线索转化率',
        val: '23 / 88',
        unit: 'G',
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
        <PageTitle title={'销售额'}></PageTitle>
        <CsMonitorStatBox
          data={this.props.statisticData}
          config={statConfig}
        ></CsMonitorStatBox>
        <Divider className={''} />
      </>
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
    // const titleMap = {
    //   : getOrdersChartAsync,
    //   : ,
    // };
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
        <div className={`fje`}>
          <TimeChoice></TimeChoice>
        </div>
        {/* <HomeGroupRank></HomeGroupRank> */}

        <HomeStatEcharts
          barData={barData}
          // rankData={this.props.chartData}
          onOptionChange={this.onOptionChange}
          getChartAsync={this.props.getChartAsync}
          homeTitle={'销售额趋势'}
          groupTitle={'员工销售额排名'}
        ></HomeStatEcharts>

        <Divider />
      </Spin>
    );
  };

  renderEcharts = params => {
    return (
      <div className={`clientPortraitEchartsWrapper`}>
        <Row gutter={[24, 16]}>
          {saleDataEchartsConfig.map((v, i) => (
            <Col span={12} {...v} key={i}>
              <div className={`homeTitle`}>{v.label}</div>
              <RingPieEchart />
            </Col>
          ))}
        </Row>
      </div>
    );
  };

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
