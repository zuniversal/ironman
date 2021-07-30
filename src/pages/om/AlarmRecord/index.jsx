import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm';
import AlarmRecordTable from '@/components/Table/AlarmRecordTable';
import AlarmRecordForm from '@/components/Form/AlarmRecordForm';
import AlarmTemplateForm from '@/components/Form/AlarmTemplateForm';
import AlarmRecordSearchForm from '@/components/Form/AlarmRecordForm/AlarmRecordSearchForm';
import AlarmRecordHandleForm from '@/components/Form/AlarmRecordForm/AlarmRecordHandleForm';
import SmartFormModal from '@/common/SmartFormModal';
import HouseNoForm from '@/components/Form/HouseNoForm';
import ClientForm from '@/components/Form/ClientForm';
import MonitorManageForm from '@/components/Form/MonitorManageForm';

import { actions, mapStateToProps } from '@/models/alarmRecord';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

const TITLE = '告警';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  handleAlarm: `确认处理`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  monitorManageDetailAsync: `监控点详情`,
  alarmTemplateDetailAsync: `监控模板详情`,
};

const detailFormMap = {
  alarmTemplateDetailAsync: AlarmTemplateForm,
  monitorManageDetailAsync: MonitorManageForm,
  clientDetailAsync: ClientForm,
  houseNoDetailAsync: HouseNoForm,
};

// const mapStateToProps = ({ alarmRecord, }) => alarmRecord;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class AlarmRecord extends PureComponent {
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
        order_ids: this.props.selectedRowKeys,
      });
    } else {
      tips('请勾选导出项！', 2);
    }
  };
  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button
          type="primary"
          onClick={this.exportDataAsync}
          // onClick={this.props.exportData}
        >
          导出
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <AlarmRecordSearchForm
        // formBtn={this.renderFormBtn}
        // getUser={this.props.getUserAsync}
        // getPower={this.props.getPowerAsync}
        // userList={this.props.userList}
        // powerList={this.props.powerList}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></AlarmRecordSearchForm>
    );
  };
  // renderSearchForm = params => {
  //   return (
  //     <SearchKwForm
  //       formBtn={this.renderFormBtn}
  //       className={'fje'}
  //       init={this.props.searchInfo}
  //       onFieldChange={this.onFieldChange}
  //       label={'监控点名称、告警名，户号，客户名，imei'}
  //       keyword={'keyword'}
  //       noLabel
  //     ></SearchKwForm>
  //   );
  // };
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
      showFormModal: this.props.showFormModal,
      showItemAsync: this.props.showItemAsync,
    };

    return <AlarmRecordTable {...tableProps}></AlarmRecordTable>;
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
            showItemAsync={this.props.showItemAsync}
          ></DetailForm>
        )}
      </SmartFormModal>
    );
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    if (
      [
        // 'handleAlarm',
        'notifyClient',
      ].includes(action)
    ) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
        });
      }
      if (action === 'handleAlarm') {
        this.props.handleAlarmAsync({
          ...res,
          status: 2,
          d_id: this.props.d_id,
          alarm_id: this.props.d_id,
        });
      }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ name: params }),
      clientList: this.props.clientList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'handleAlarm') {
      return <AlarmRecordHandleForm {...formComProps}></AlarmRecordHandleForm>;
    }
    if (action === 'notifyClient') {
      return <AlarmRecordForm {...formComProps}></AlarmRecordForm>;
    }
    if (action === 'alarmTemplateDetailAsync') {
      return <AlarmTemplateForm {...formComProps}></AlarmTemplateForm>;
    }
    console.log(' formComProps ： ', formComProps);
    return <AlarmRecordForm {...formComProps}></AlarmRecordForm>;
  };
  get size() {
    return [
      'handleAlarm',
      // 'notifyClient'
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

  render() {
    return (
      <div className="alarmRecord">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default AlarmRecord;
