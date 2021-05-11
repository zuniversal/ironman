import React, { PureComponent } from 'react';
import './style.less';
import { Spin } from 'antd';
import SmartFormModal from '@/common/SmartFormModal';
import HomeSettingForm from '@/components/Form/HomeSettingForm';
import HomeInspectMissionTable from '@/components/Table/HomeInspectMissionTable';
import HomeWorkOrderTable from '@/components/Table/HomeWorkOrderTable';
import HomeStatBox from '@/components/Widgets/HomeStatBox';
import HomeStatEcharts from '@/components/Widgets/HomeStatEcharts';
import HomeTitleRow, {
  HomeSettingBtn,
} from '@/components/Widgets/HomeTitleRow';

import {
  actions,
  // mapStateToProps
} from '@/models/home';
import { userActions } from '@/models/user';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { SettingOutlined } from '@ant-design/icons';
import Icon from '@/components/Widgets/Icons';
import WorkOrderForm from '@/components/Form/WorkOrderForm';
import InspectMissionDetailForm from '@/components/Form/InspectMissionDetailForm';
import { WorkOrderDispatchOrderForm } from '@/components/Form/WorkOrderActionForm';

export const TITLE = '首页';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  setting: `${TITLE}设置`,
  dispatchOrder: `派单`,
  addTicket: `添加工作票`,
  workOrderDetailAsync: `工单详情`,
  inspectMissionDetailAsync: `巡检任务详情`,
};

const detailFormMap = {
  workOrderDetailAsync: WorkOrderForm,
  inspectMissionDetailAsync: InspectMissionDetailForm,
};

// const mapStateToProps = ({ home, }) => home;
const mapStateToProps = ({ home, user, loading }) => ({
  ...home,
  loading: loading,
  // homeSettings: user.homeSettings,
});

@connect(mapStateToProps)
@SmartHOC({
  actions: {
    ...actions,
    // saveHomeSetting: userActions.saveHomeSetting,
    // showFormModal: userActions.showFormModal,
  },
  titleMap,
  // modalForm: HomeSettingForm,
})
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  goPage = page => {
    console.log(' goPage,  , ： ', page, this.state, this.props);
    const { history } = this.props;
    history.push(page);
  };

  renderPageTitle = params => {
    return (
      <HomeTitleRow
        {...this.props}
        title={this.pageTitle}
        showSetting={this.showSetting}
        right={
          <div className="settingWrapper dfc" onClick={this.showSetting}>
            {/* <Icon icon={'setting'} ></Icon> */}
            <Icon icon={'setting'} className={'setting'}></Icon>
            {/* <SettingOutlined className={'setting'} /> */}
            <div className="settingText">首页设置</div>
          </div>
        }
      ></HomeTitleRow>
    );
  };
  renderHomeStatBox = params => {
    return (
      <HomeStatBox
        data={this.props.statisticData}
        homeSettings={this.props.homeSettings}
      ></HomeStatBox>
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
  renderHomeStatEcharts = params => {
    const barData =
      this.props.requestFn === 'getOrdersChart'
        ? this.props.chartData.order_data
        : this.props.chartData.inspection_task_data;
    const isLoading = this.props.loading.effects['home/getChartAsync'];
    return (
      <Spin spinning={isLoading} className={'loadingWrapper'} size="large">
        <HomeStatEcharts
          // ordersChartList={this.props.ordersChartList}
          // inspectionsChartList={this.props.inspectionsChartList}
          barData={barData}
          // chartData={this.props.chartData}
          // barData={this.props.chartData.order_data}
          // barData={this.props.chartData.inspection_task_data}
          rankData={this.props.chartData.rank_data?.slice(0, 8)}
          getEchartData={this.getEchartData}
          onOptionChange={this.onOptionChange}
          homeSettings={this.props.homeSettings}
        ></HomeStatEcharts>
      </Spin>
    );
  };
  renderHomeInspectMissionTable = params => {
    return this.props.homeSettings.includes('inspectMission') ? (
      <div className="">
        <div className="homeTitle">待巡检任务</div>
        <HomeInspectMissionTable
          dataSource={this.props.inspectionTasksList}
          count={this.props.inspectionTasksCount}
          getListAsync={this.props.getInspectionTasksAsync}
          showItemAsync={this.props.showItemAsync}
          showFormModal={this.props.showFormModal}
          extraLoading={['getInspectionTasksAsync']}
        ></HomeInspectMissionTable>
      </div>
    ) : null;
  };
  renderHomeWorkOrderTable = params => {
    return this.props.homeSettings.includes('pendingOrder') ? (
      <div className="">
        <div className="homeTitle">待处理工单</div>
        <HomeWorkOrderTable
          dataSource={this.props.pendingOrdersList}
          count={this.props.pendingOrdersCount}
          getListAsync={this.props.getPendingOrdersAsync}
          showItemAsync={this.props.showItemAsync}
          showFormModal={this.props.showFormModal}
          extraLoading={['getPendingOrdersAsync']}
          searchInfo={this.props.pendingOrdersSearchInfo}
        ></HomeWorkOrderTable>
      </div>
    ) : null;
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
  get pageTitle() {
    const { title } = this.props.route;
    return title;
  }
  showSetting = e => {
    console.log('    showSetting ： ', e, this.state, this.props);
    this.props.showFormModal({
      action: 'setting',
    });
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail, extraData } = this.props;
    const { form, init } = props;
    // if (['setting'].includes(action)) {
    //   this.props.onCancel({});
    //   return;
    // }
    if (['addTicket'].includes(action)) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'setting') {
        this.props.saveHomeSetting({
          ...res,
        });
      }
      if (action === 'dispatchOrder') {
        this.props.dispatchOrderAsync({
          ...res,
          d_id: extraData.id,
        });
      }
      // if (action === 'addTicket') {
      //   this.props.addTicketAsync({
      //     ...res,
      //     d_id,
      //   });
      // }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
      getTeamAsync: params => this.props.getTeamAsync({ name: params }),
      teamList: this.props.teamList,
    };
    if (action === 'setting') {
      formComProps.init = {
        homeSettings: this.props.homeSettings,
      };
    }
    if (action === 'dispatchOrder') {
      return (
        <WorkOrderDispatchOrderForm
          {...formComProps}
        ></WorkOrderDispatchOrderForm>
      );
    }
    return <HomeSettingForm {...formComProps}></HomeSettingForm>;
  };
  get size() {
    return this.props.action === 'dispatchOrder' ? 'small' : 'default';
  }
  renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        size={this.size}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };
  componentDidMount() {
    console.log('  组件componentDidMount挂载 ： ', this.state, this.props);
    this.props.getStatisticAsync();
    this.props
      .getChartAsync
      // { requestFn: 'getInspectionsChart', }
      ();
    // this.props.getOrdersChartAsync();
    // this.props.getInspectionsChartAsync();
    this.props.getPendingOrdersAsync({ page: 1, page_size: 10 });
    this.props.getInspectionTasksAsync();
    this.props.getTeamAsync();
  }

  render() {
    console.log(
      ' %c Home 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="omHome">
        {this.renderPageTitle()}
        {this.renderHomeStatBox()}
        {this.renderHomeStatEcharts()}
        {this.renderHomeInspectMissionTable()}
        {this.renderHomeWorkOrderTable()}
        {this.renderSmartFormModal()}
        {this.renderCommonModal()}
      </div>
    );
  }
}

export default Home;
