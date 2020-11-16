import React, { Component, PureComponent } from 'react';
import './style.less';

import {
  Form,
  Input,
  Button,
  Checkbox,
  Menu,
  Upload,
  Result,
  Typography,
  Spin,
} from 'antd';

import SmartModal from '@/common/SmartModal'; //
import SearchForm from '@/common/SearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import InspectPlanForm from '@/components/Form/InspectPlanForm'; //
import InspectPlanSearchForm from '@/components/Form/InspectPlanSearchForm'; //
import InspectPlanTable from '@/components/Table/InspectPlanTable'; //
import InspectPlanCalendar from '@/components/Calendar/InspectPlanCalendar'; //
import ResultModal, { ErrorInfo } from '@/components/Modal/ResultModal'; //

import {
  actions,
  // mapStateToProps
} from '@/models/inspectPlan'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

const TITLE = '操作';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

const mapStateToProps = ({ inspectPlan, loading }) => ({
  ...inspectPlan,
  loading: loading.effects['inspectPlan/getListAsync'],
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
        userList={this.props.userList}
        onFieldChange={this.onFieldChange}
        init={this.props.searchInfo}
      ></InspectPlanSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };

  eventsSet = params => {
    console.log(' eventsSet,  , ： ', params);
  };
  renderInspectPlanCalendar = params => {
    // console.log(' renderInspectPlanCalendar ： ', params,  )
    return (
      <InspectPlanCalendar
        eventsSet={this.props.changeStationPlan}
        // scheduleList={this.props.scheduleList}
        scheduleList={this.props.scheduleList}
        unScheduleList={this.props.unScheduleList}
      ></InspectPlanCalendar>
    );
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
      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...itemDetail,
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
      // getUser: params => this.props.getUserAsync({ keyword: params }),
      // userList: this.props.userList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    // return <PowerStationForm {...formComProps} ></PowerStationForm>;
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
        onCancel={this.props.onCancel}
        size={this.size}
        isNoForm={this.isNoForm}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };
  componentDidMount() {
    console.log('  组件componentDidMount挂载 ： ', this.state, this.props); //
    this.props.getUserAsync();
    // this.props.getListAsync({
    //   leader: 1,
    //   // month: '2020-10',
    // });
  }

  render() {
    console.log(
      ' %c InspectPlan 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

    const { loading } = this.props; //

    return (
      <div className="InspectPlan">
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
