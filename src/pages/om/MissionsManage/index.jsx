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
  Divider,
} from 'antd';

import SmartModal from '@/common/SmartModal'; //
import SearchForm from '@/common/SearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import MissionsManageForm from '@/components/Form/MissionsManageForm'; //
import MissionsManageSearchForm from '@/components/Form/MissionsManageSearchForm'; //
import {
  MissionsManageWorkOrderForm,
  MissionsManageContractForm,
  MissionsManageScheduleForm,
  MissionsManageConfirmScheduleForm,
} from '@/components/Form/MissionsManageActionForm'; //
import MissionsManageTable from '@/components/Table/MissionsManageTable'; //
import ResultModal, { ErrorInfo } from '@/components/Modal/ResultModal'; //

import { actions, mapStateToProps } from '@/models/missionsManage'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '任务';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  startWorkOrder: '发起工单',
  linkContract: '关联合同',
  schedule: '排期',
  confirmSchedule: '确认排期',
  closeMission: `关闭${TITLE}`,
};

// const mapStateToProps = ({ missionsManage, }) => missionsManage;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: MissionsManageForm,
})
class MissionsManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
      titleMap,
    };
  }

  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };
  renderFormBtn = params => {
    console.log(' renderFormBtn ： ', params); //
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
        >
          新增{TITLE}
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <MissionsManageSearchForm
        formBtn={this.renderFormBtn}
        onFieldChange={this.onFieldChange}
      ></MissionsManageSearchForm>
    );
  };
  renderTable = params => {
    console.log(' renderTable ： ', params, this.state, this.props);
    const tableProps = {
      onSelectChange: this.props.onSelectChange,
      dataSource: this.props.dataList,
      count: this.props.count,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
      closeMissionAsync: this.props.closeMissionAsync,
    };

    return <MissionsManageTable {...tableProps}></MissionsManageTable>;
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail, d_id } = this.props; //
    const { form, init } = props; //
    if (action === 'closeMission') {
      this.props.closeMissionAsync({
        d_id,
        id: d_id,
      });
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
      if (action === 'startWorkOrder') {
        this.props.startWorkOrderAsync({
          ...res,
          task_id: d_id,
        });
      }
      if (action === 'linkContract') {
        this.props.linkContractAsync({
          ...res,
          id: d_id,
        });
      }
      if (action === 'schedule') {
        this.props.scheduleAsync({
          ...res,
          d_id,
          plan_date: res.plan_date.format('YYYY-MM-DD'),
        });
      }
      if (action === 'confirmSchedule') {
        this.props.confirmScheduleAsync({
          ...res,
        });
      }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  renderModalContent = e => {
    console.log('    renderModalContent ： ', e, this.state, this.props);
    const { action } = this.props; //
    const formComProps = {
      action,
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ keyword: params }),
      clientList: this.props.clientList,
      getAssetsAsync: params => this.props.getAssetsAsync({ keyword: params }),
      assetsList: this.props.assetsList,
      getPowerAsync: params => this.props.getPowerAsync({ keyword: params }),
      powerList: this.props.powerList,
      getTeamAsync: params => this.props.getTeamAsync({ keyword: params }),
      teamList: this.props.teamList,
      getContractAsync: params =>
        this.props.getContractAsync({ keyword: params }),
      contractList: this.props.contractList,
      clientData: this.props.clientData,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'startWorkOrder') {
      return (
        <MissionsManageWorkOrderForm
          {...formComProps}
        ></MissionsManageWorkOrderForm>
      );
    }
    if (action === 'closeMission') {
      return <div className="dfc">确认关闭任务？</div>;
    }
    if (action === 'linkContract') {
      return (
        <MissionsManageContractForm
          {...formComProps}
        ></MissionsManageContractForm>
      );
    }
    if (action === 'schedule') {
      return (
        <MissionsManageScheduleForm
          {...formComProps}
        ></MissionsManageScheduleForm>
      );
    }
    if (action === 'confirmSchedule') {
      return (
        <MissionsManageConfirmScheduleForm
          {...formComProps}
        ></MissionsManageConfirmScheduleForm>
      );
    }
    console.log(' formComProps ： ', formComProps); //
    return <MissionsManageForm {...formComProps}></MissionsManageForm>;
  };
  get size() {
    console.log(' get 取属 size ： ', this.state, this.props);
    return ['closeMission', 'linkContract', 'schedule', 'confirmSchedule'].some(
      v => v === this.props.action,
    )
      ? 'small'
      : 'default';
  }
  get isNoForm() {
    console.log(' get 取属 isNoForm ： ', this.state, this.props);
    return ['closeMission'].some(v => v === this.props.action);
  }
  renderSmartFormModal = params => {
    console.log(' renderSmartFormModal ： ', params, this.state, this.props);
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
    console.log(
      ' %c MissionsManage componentDidMount 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //
    this.props.getEnumListAsync({
      model: '任务管理',
      name: '任务类型',
    });
    this.props.getEnumListAsync({
      model: '任务管理',
      name: '工单类型',
    });
  }

  render() {
    console.log(
      ' %c MissionsManage 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

    return (
      <div className="MissionsManage">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default MissionsManage;
