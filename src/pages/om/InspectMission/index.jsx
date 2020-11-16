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
import InspectMissionForm from '@/components/Form/InspectMissionForm'; //
import InspectMissionSearchForm from '@/components/Form/InspectMissionSearchForm'; //
import {
  InspectMissionAssignForm,
  InspectMissionEditDateForm,
} from '@/components/Form/InspectMissionActionForm'; //
import InspectMissionDetailForm from '@/components/Form/InspectMissionDetailForm'; //
import InspectMissionTable from '@/components/Table/InspectMissionTable'; //
import ResultModal, { ErrorInfo } from '@/components/Modal/ResultModal'; //

import { actions, mapStateToProps } from '@/models/inspectMission'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { inspectMissionStatusMap } from '@/configs';

const TITLE = '巡检任务';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  assignMission: `分配任务`,
  editDate: `修改日期`,
  mission: `确认领取/开始/完成该任务`,
};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: InspectMissionDetailForm,
})
class InspectMission extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <InspectMissionSearchForm
        formBtn={this.renderFormBtn}
        getUserAsync={params => this.props.getUserAsync({ keyword: params })}
        userList={this.props.userList}
        getClientAsync={this.props.getClientAsync}
        clientList={this.props.clientList}
        onFieldChange={this.onFieldChange}
        init={this.props.searchInfo}
      ></InspectMissionSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };

  renderTable = params => {
    const tableProps = {
      onSelectChange: this.props.onSelectChange,
      dataSource: this.props.dataList,
      count: this.props.count,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.getItemAsync,
    };

    return <InspectMissionTable {...tableProps}></InspectMissionTable>;
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    if (action === 'detail') {
      this.props.onCancel({});
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
      if (action === 'assignMission') {
        this.props.editItemAsync({
          ...itemDetail,
          ...res,
          d_id: itemDetail.id,
        });
      }
      if (action === 'editDate') {
        this.props.editItemAsync({
          ...itemDetail,
          ...res,
          d_id: itemDetail.id,
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
      getUserAsync: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ keyword: params }),
      clientList: this.props.clientList,
      getTeamAsync: params => this.props.getTeamAsync({ keyword: params }),
      teamList: this.props.teamList,
    };
    if (action !== 'add') {
      formComProps.init = {
        ...this.props.itemDetail,
        status: inspectMissionStatusMap[this.props.itemDetail.status],
      };
    }
    if (action === 'assignMission') {
      return (
        <InspectMissionAssignForm {...formComProps}></InspectMissionAssignForm>
      );
    }
    if (action === 'editDate') {
      return (
        <InspectMissionEditDateForm
          {...formComProps}
        ></InspectMissionEditDateForm>
      );
    }
    console.log(' formComProps ： ', formComProps); //
    return (
      <InspectMissionDetailForm {...formComProps}></InspectMissionDetailForm>
    );
  };
  get size() {
    return ['assignMission', 'editDate'].some(v => v === this.props.action)
      ? 'small'
      : 'default';
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
    this.props.getUserAsync();
    this.props.getTeamAsync();
    // this.props.getListAsync();
  }

  render() {
    return (
      <div className="InspectMission">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default InspectMission;
