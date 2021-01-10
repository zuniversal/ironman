import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
import InspectMissionSearchForm from '@/components/Form/InspectMissionSearchForm'; //
import {
  InspectMissionAssignForm,
  InspectMissionEditDateForm,
} from '@/components/Form/InspectMissionActionForm'; //
import InspectMissionDetailForm from '@/components/Form/InspectMissionDetailForm'; //
import InspectMissionTable from '@/components/Table/InspectMissionTable'; //

import { actions, mapStateToProps } from '@/models/inspectMission'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { inspectMissionStatusMap } from '@/configs';
import { tips } from '@/utils';
import PowerStationForm from '@/components/Form/PowerStationForm';
import ClientForm from '@/components/Form/ClientForm';
import InspectMissionForm from '@/components/Form/InspectMissionForm';

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
  clientDetailAsync: `客户详情`,
  powerStationDetailAsync: `电站详情`,
  inspectMissionDetailAsync: `巡检任务详情`,
};

const detailFormMap = {
  clientDetailAsync: ClientForm,
  powerStationDetailAsync: PowerStationForm,
  inspectMissionDetailAsync: InspectMissionDetailForm,
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

  exportDataAsync = e => {
    console.log('    exportDataAsync ： ', e, this.props.selectedRowKeys);
    if (this.props.selectedRowKeys.length > 0) {
      this.props.exportData({
        ids: this.props.selectedRowKeys,
      });
    } else {
      tips('请勾选导出项！', 2);
    }
  };
  batchDispatch = e => {
    console.log('    batchDispatch ： ', e, this.props.selectedRowKeys);
    if (this.props.selectedRowKeys.length > 0) {
      // this.props.batchDispatch({
      this.props.showFormModal({
        // ids: this.props.selectedRowKeys,
        action: 'batchDispatch',
      });
    } else {
      tips('请勾选派发项！', 2);
    }
  };
  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        {/* <Button type="primary" onClick={() => this.props.exportExcelAsync({
          ids: [1],
        })}> */}
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
          disabled={this.props.authInfo.create !== true}
        >
          新增
        </Button>
        <Button type="primary" onClick={this.batchDispatch}>
          派发
        </Button>
        <Button
          type="primary"
          onClick={this.exportDataAsync}
          // onClick={this.props.exportData}
        >
          {/* <Button type="primary" onClick={() => tips('暂未接口！', 2)}> */}
          导出
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <InspectMissionSearchForm
        formBtn={this.renderFormBtn}
        getUserAsync={params =>
          this.props.getUserAsync({
            team_headman: 1,
            keyword: params,
          })
        }
        userList={this.props.userList}
        getClientAsync={params => this.props.getClientAsync({ name: params })}
        clientList={this.props.clientList}
        getPowerAsync={params => this.props.getPowerAsync({ name: params })}
        powerList={this.props.powerList}
        init={this.props.searchInfo}
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
      authInfo: this.props.authInfo,
      searchInfo: this.props.searchInfo,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.getItemAsync,
      showItemAsync: this.props.showItemAsync,
    };

    return <InspectMissionTable {...tableProps}></InspectMissionTable>;
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
          // ...itemDetail,
          ...res,
          d_id: itemDetail.id,
        });
      }
      if (action === 'dispatchMission') {
        this.props.batchDispatchAsync({
          // ...itemDetail,
          ...res,
          task_list: [itemDetail.id],
        });
      }
      if (['batchDispatch'].includes(action)) {
        this.props.batchDispatchAsync({
          // ...itemDetail,
          ...res,
          task_list: this.props.selectedRowKeys,
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
      getUserAsync: params => this.props.getUserAsync({ value: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ name: params }),
      clientList: this.props.clientList,
      getTeamAsync: params => this.props.getTeamAsync({ name: params }),
      teamList: this.props.teamList,
      getPowerAsync: params => this.props.getPowerAsync({ name: params }),
      powerList: this.props.powerList,
    };
    if (action !== 'add') {
      formComProps.init = {
        ...this.props.itemDetail,
        status: inspectMissionStatusMap[this.props.itemDetail.status],
      };
    }
    // if (action === 'assignMission') {
    // if (['assignMission', 'batchDispatch'].includes(action)) {
    if (['dispatchMission', 'batchDispatch'].includes(action)) {
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
    if (action === 'detail') {
      return (
        <InspectMissionDetailForm {...formComProps}></InspectMissionDetailForm>
      );
    }
    console.log(' formComProps ： ', formComProps); //
    return <InspectMissionForm {...formComProps}></InspectMissionForm>;
  };
  get size() {
    return [
      'assignMission',
      'dispatchMission',
      'batchDispatch',
      'editDate',
    ].some(v => v === this.props.action)
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
    this.props.getUserAsync({
      team_headman: 1,
    });
    this.props.getTeamAsync();
    this.props.getClientAsync();
    this.props.getPowerAsync();
    // this.props.getListAsync();
  }

  render() {
    return (
      <div className="InspectMission">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default InspectMission;
