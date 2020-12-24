import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchForm from '@/common/SearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import CsHomeStationTable from '@/components/Table/CsHomeStationTable';
import CsHomeTabsTable from '@/components/Table/CsHomeTabsTable';
import CsHomeMonitor from '@/components/Widgets/CsHomeMonitor';
import CsHomeVideo from '@/components/Widgets/CsHomeVideo';
import CsHomeStatBox from '@/components/Widgets/CsHomeStatBox';
import CsHomeMonitorVideo from '@/components/Widgets/CsHomeMonitorVideo';
import CsHomeStatEcharts from '@/components/Widgets/CsHomeStatEcharts';
import HomeTitleRow from '@/components/Widgets/HomeTitleRow';
import SmartVideo from '@/common/SmartVideo'; //

import {
  actions,
  // mapStateToProps,
} from '@/models/csHome'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { ANIMATE, MINI_POWER } from '@/constants'; //
import Icon from '@/components/Widgets/Icons'; //
import WeakForm from '@/components/Form/WeakForm';

export const TITLE = '';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  weakDetailAsync: `缺陷详情`,
};

const detailFormMap = {
  weakDetailAsync: WeakForm,
};

const mapStateToProps = ({ csHome, user }) => ({
  ...csHome,
  user,
});

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class CsHome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderCsHomeMonitor = params => {
    return (
      <div className="monitorWrapper df">
        <div className={`left ${ANIMATE.bounceInLeft} `}>
          <CsHomeMonitor data={this.props.deviceStatus}></CsHomeMonitor>
        </div>
        <div className={`center ${ANIMATE.zoomIn} `}>
          <CsHomeVideo></CsHomeVideo>
          <div className="csHomeVideo ">{/* <SmartVideo></SmartVideo> */}</div>
        </div>
        <div className={`right ${ANIMATE.bounceInRight} `}>
          <CsHomeMonitorVideo></CsHomeMonitorVideo>
        </div>
      </div>
    );
  };
  renderCsHomeStationTable = params => {
    return (
      <>
        <div className="homeTitle">电站状态</div>
        <CsHomeStationTable
          showFormModal={this.props.showFormModal}
          dataSource={this.props.stationStatusList}
          count={this.props.stationStatusCount}
          getListAsync={this.props.getStationStatusAsync}
          showItemAsync={this.props.showItemAsync}
          extraLoading={['getStationStatusAsync']}
          pathMap={'csHome'}
        ></CsHomeStationTable>
      </>
    );
  };
  renderCommonModal = params => {
    const DetailForm = detailFormMap[this.props.common.action];
    return (
      <SmartFormModal
        show={this.props.common.isShowCommonModal}
        action={this.props.common.action}
        titleMap={titleMap}
        onOk={this.props.closeCommonModal}
        onCancel={this.props.closeCommonModal}
      >
        {DetailForm && (
          <DetailForm
            init={this.props.common.itemDetail}
            action={'detail'}
          ></DetailForm>
        )}
      </SmartFormModal>
    );
  };
  renderSelectForm = params => {
    return (
      <div className="selectWrapper">
        <div className="label">站点</div>
        <SearchForm suffixIcon={null}></SearchForm>
      </div>
    );
  };
  renderPageTitle = params => {
    return (
      <HomeTitleRow
        {...this.props}
        title={this.props.route.title}
        right={
          <div className={`dfc`} onClick={() => window.open(MINI_POWER)}>
            <Icon icon={'miniPower'} className={'miniPower'}></Icon>
            <div className="pageSubTitle">我的微电网</div>
          </div>
        }
      ></HomeTitleRow>
    );
  };
  renderCsHomeStatBox = params => {
    return <CsHomeStatBox data={this.props.statisticData}></CsHomeStatBox>;
  };
  onOptionChange = params => {
    console.log(' onOptionChange,  , ： ', params, this.state, this.props);
    const data = {
      ...this.props.chartSearchInfo,
      ...params,
    };
    // if (params.requestFn) {
    //   data.start_time = null;
    //   data.end_time = null;
    // }
    console.log(' data ： ', data); // [params.requestFn]
    this.props.getPowerInfoAsync(data);
  };
  renderCsHomeStatEcharts = params => {
    return (
      <CsHomeStatEcharts
        data={this.props.chartData}
        onOptionChange={this.onOptionChange}
      ></CsHomeStatEcharts>
    );
  };
  renderCsHomeTabsTable = params => {
    return <CsHomeTabsTable></CsHomeTabsTable>;
  };
  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    if (action === 'weakDetail') {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      if (action === 'setting') {
        // this.props.homeSetting({
        //   ...res,
        // });
      }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  renderModalContent = e => {
    const { action } = this.props; //
    const formComProps = {
      action,
    };
    if (action === 'weakDetail') {
      return (
        <CsHomeTabsTable
          showFormModal={this.props.showFormModal}
        ></CsHomeTabsTable>
      );
    }
  };
  renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };
  componentDidMount() {
    console.log(
      ' CsHome 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
      this.props.user,
    ); //
    this.props.getStatisticAsync({});
    this.props.getDeviceStatusAsync();
    this.props.getPowerInfoAsync({
      customer: 5996,
      // customer: this.props.user.userInfo.id,
    });
    this.props.getStationStatusAsync({});
  }

  render() {
    console.log(
      ' %c CsHome 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //
    return (
      <div className="csHome">
        {this.renderPageTitle()}
        {this.renderCsHomeStatBox()}
        {this.renderSelectForm()}
        {this.renderCsHomeMonitor()}
        {this.renderCsHomeStatEcharts()}
        {this.renderCsHomeStationTable()}
        {this.renderSmartFormModal()}
        {this.renderCommonModal()}
      </div>
    );
  }
}

export default CsHome;
