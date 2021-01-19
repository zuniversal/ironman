import React, { PureComponent } from 'react';
import './style.less';
import { Button, Spin } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
import InspectPlanForm from '@/components/Form/InspectPlanForm'; //
import InspectPlanAddForm from '@/components/Form/InspectPlanAddForm'; //
import InspectPlanSearchForm from '@/components/Form/InspectPlanSearchForm'; //
import InspectPlanCalendar from '@/components/Calendar/InspectPlanCalendar'; //

import {
  actions,
  // mapStateToProps
} from '@/models/inspectPlan'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips, nowYearMonthDay } from '@/utils';
import moment from 'moment';

const TITLE = '操作';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  addPlan: `修改日期`,
};

const mapStateToProps = ({ inspectPlan, loading, user }) => ({
  ...inspectPlan,
  loading: loading.effects['inspectPlan/getListAsync'],
  userInfo: user.userInfo,
  // loading: loading.effects,
});

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  noMountFetch: true,
  modalForm: InspectPlanForm,
})
class InspectPlan extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }
  savePlan = e => {
    console.log('    savePlan ： ', e, this.state, this.props);
    this.props.showFormModal({
      action: 'addPlan',
    });
    return;
    const { dragList, scheduleList } = this.props;
    const dragListlen = dragList.length; //
    const scheduleListlen = scheduleList.length; //
    console.log(' savePlan dragList ： ', dragListlen, scheduleListlen); //
    if (dragListlen) {
      dragListlen == scheduleListlen
        ? this.props.editItemAsync()
        : this.props.addItemAsync();
    } else {
      tips('请先对电站进行操作！', 2);
    }
  };
  onSearch = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action } = this.props; //
    const { form } = props; //
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      if (res.leader && res.month) {
        this.props.getListAsync({
          ...res,
          // month: res.month.format('YYYY-MM'),
        });
      } else {
        tips('请先选择客户代表及月份！', 2);
      }
    } catch (error) {
      console.log(' error ： ', error); //
      tips('请先选择客户代表及月份！', 2);
    }
  };
  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button
          type="primary"
          onClick={() =>
            this.props.getListAsync({
              ...this.props.searchInfo,
              isReset: true,
            })
          }
        >
          {/* <Button type="primary" onClick={() => this.props.reset()}> */}
          重置
        </Button>
        {/* <Button type="primary" onClick={() => this.props.addItemAsync()}> */}
        <Button type="primary" onClick={this.savePlan}>
          保存计划
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <InspectPlanSearchForm
        formBtn={this.renderFormBtn}
        getUserAsync={params => this.props.getUserAsync({ keyword: params })}
        // userList={this.props.userList}
        userList={[
          {
            label: this.props.userInfo.nickname,
            value: `${this.props.userInfo.id}`,
          },
          ...this.props.userList,
        ]}
        tagUserList={this.props.tagUserList}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        date={this.props.searchInfo?.month?.format('YYYY-MM-DD')}
      ></InspectPlanSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    if (params.formData.leader && params.formData.month) {
      this.props.getListAsync(params.formData);
    } else {
      tips('需要同时选择客户代表及月份进行搜索！', 2);
    }
  };

  eventsSet = params => {
    console.log(' eventsSet,  , ： ', params);
    if (params.length > 0) {
      this.props.changeStationPlan(params);
    }
    // const latestDrag = params[params.length - 1]; //
    // if (latestDrag && latestDrag.id) {
    //   this.props.showFormModal({
    //     action: 'addPlan',
    //   });
    // }

    // this.props.addItemAsync();
  };
  remove = e => {
    console.log('    remove ： ', e);
    tips('暂未开发！', 2);
  };
  renderInspectPlanCalendar = params => {
    // console.log(' renderInspectPlanCalendar ： ', params,  )
    const { loading, searchInfo } = this.props; //
    // const isLoading = loading['inspectPlan/getTagUserAsync']
    return (
      // !loading && <InspectPlanCalendar
      !loading && (
        <InspectPlanCalendar
          // eventsSet={this.props.changeStationPlan}
          eventsSet={this.eventsSet}
          // scheduleList={this.props.scheduleList}
          scheduleList={this.props.scheduleList}
          unScheduleList={this.props.unScheduleList}
          dateList={this.props.dateList}
          dayEvents={this.props.dayEvents}
          monthEvents={this.props.monthEvents}
          dayInfo={this.props.dayInfo}
          initialDate={
            searchInfo.month ? searchInfo.month.format('YYYY-MM-DD') : null
          }
          remove={this.remove}
          removePlanAsync={this.props.removePlanAsync}
          eventClick={this.props.getScheduledDetailListAsync}
          unScheduleFilter={this.props.unScheduleFilter}
          onUnScheduleListChange={this.props.onUnScheduleListChange}
        ></InspectPlanCalendar>
      )
    );
  };

  onCancel = e => {
    console.log('    onCancel ： ', e);
    this.props.onCancel();
    this.props.getListAsync();
  };
  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    if (action === 'removeAsync') {
      this.props.removeAsync({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      if (action === 'addPlan') {
        this.props.addItemAsync({
          ...res,
        });
      }
      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...res,
        });
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
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    if (action === 'addPlan') {
      return <InspectPlanAddForm {...formComProps}></InspectPlanAddForm>;
    }
    return <InspectPlanAddForm {...formComProps}></InspectPlanAddForm>;
  };
  get size() {
    return 'small';
    return ['removeStation'].some(v => v === this.props.action)
      ? 'small'
      : 'default';
  }
  get isNoForm() {
    return true;
    // return [, ].some((v) => v === this.props.action);
  }
  renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        // onCancel={this.props.onCancel}
        onCancel={this.onCancel}
        size={this.size}
        isNoForm={this.isNoForm}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };
  componentDidMount() {
    console.log('  组件componentDidMount挂载 ： ', this.state, this.props); //
    // this.props.getTagUserAsync();
    // this.props.getUserAsync();

    // 目前区块链经理ID为2去获取用户
    // 根据职位获取到所有的客户代表，然后选中客户代表之后把客户代表的ID传递获取待排计划的电站
    // this.props.getTagUserAsync({
    //   d_id: 2,
    // });
    this.props.getUserAsync({
      // team_headman: 1,
      // page_size: 100,
    });
    // this.props.getListAsync({
    //   // leader: 79640,
    //   leader: 1,
    //   //   // month: '2020-10',
    //   // leader: 2,
    //   // month: '2020-10',
    //   // month: moment('2020-11-11',)
    //   // month: moment('2020-11',)
    //   // month: moment('2020-12'),
    //   leader: 79612,
    //   month: moment('2021-01'),
    // });
    this.props.getListAsync({
      leader: `${this.props.userInfo.id}`,
      // leader: 119,
      // month: nowYearMonthDay,
      month: moment(),
    });
  }

  render() {
    console.log(
      ' %c InspectPlan 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
      this.props.loading,
    ); //

    const { loading } = this.props; //

    return (
      <div className="inspectPlan">
        {this.renderSearchForm()}

        <Spin
          className={'loadingWrapper'}
          spinning={!!loading}
          tip="请求发送中，请稍等！"
          size="large"
        >
          {this.renderInspectPlanCalendar()}
        </Spin>

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default InspectPlan;
