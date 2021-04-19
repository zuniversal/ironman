import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm';
import MonitorApprovalTable from '@/components/Table/MonitorApprovalTable';
import MonitorApprovalForm from '@/components/Form/MonitorApprovalForm';
import SmartFormModal from '@/common/SmartFormModal';

import { actions, mapStateToProps } from '@/models/monitorApproval';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';
import PowerStationForm from '@/components/Form/PowerStationForm';
import HouseNoForm from '@/components/Form/HouseNoForm';
import ClientForm from '@/components/Form/ClientForm';

const TITLE = '电站';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  add: `监控审批单`,
  approval: `审批通过`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  PowerStationDetailAsync: `电站详情`,
};

const detailFormMap = {
  clientDetailAsync: ClientForm,
  houseNoDetailAsync: HouseNoForm,
  powerStationDetailAsync: PowerStationForm,
};

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class MonitorApproval extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderFormBtn = params => {
    return <div className={'btnWrapper'}></div>;
  };
  renderSearchForm = params => {
    return (
      <SearchKwForm
        formBtn={this.renderFormBtn}
        className={'fje'}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        // label={'检测点、客户、户号、电站、设备'}
        label={'关键字'}
        keyword={'keyword'}
        noLabel
      ></SearchKwForm>
    );
  };
  onFieldChange = params => {
    console.log(
      ' onFieldChange,  , ： ',
      params,
      params.value,
      params.formData,
      this.props,
    );
    const { form } = params;
    this.props.getListAsync({ ...params.formData, page: 1 });
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

    return <MonitorApprovalTable {...tableProps}></MonitorApprovalTable>;
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
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail, d_id } = this.props;
    const { form, init } = props;
    if (['detail'].includes(action)) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'exportDutyData') {
        this.props.exportData({
          reqMethod: 'exportDutyDataAsync',
          // type: 'month',
          station_id: this.props.d_id,
          year_month: res.month.format('YYYY-MM'),
        });
        return;
      }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
    };

    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps);
    if (action === 'approval') {
      return <div className={`approvalContent`}>确认审批通过？</div>;
    }
    return <MonitorApprovalForm {...formComProps}></MonitorApprovalForm>;
  };
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
  componentDidMount() {}

  render() {
    console.log(
      ' %c MonitorApproval 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return (
      <div className="MonitorApproval">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default MonitorApproval;
