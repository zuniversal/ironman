import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
import WorkOrderForm from '@/components/Form/WorkOrderForm'; //
import WorkOrderSearchForm from '@/components/Form/WorkOrderSearchForm'; //
import WorkOrderTicketForm from '@/components/Form/WorkOrderTicketForm'; //
import { WorkOrderDispatchOrderForm } from '@/components/Form/WorkOrderActionForm'; //
import WorkOrderTable from '@/components/Table/WorkOrderTable'; //
import ExportPdf from '@/components/Pdf/ExportPdf'; //

import { actions, mapStateToProps } from '@/models/workOrder'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import MissionsManageForm from '@/components/Form/MissionsManageForm';
import ClientForm from '@/components/Form/ClientForm';
import { tips } from '@/utils';

const TITLE = '工单';

const titleMap = {
  // add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  addTicket: `添加工作票`,
  add: `添加工作票`,
  dispatchOrder: `派单`,
  clientDetailAsync: `客户详情`,
  workOrderDetailAsync: `工单详情`,
  missionsManageDetailAsync: `任务详情`,
};

const detailFormMap = {
  clientDetailAsync: ClientForm,
  workOrderDetailAsync: WorkOrderForm,
  missionsManageDetailAsync: MissionsManageForm,
};

// const mapStateToProps = ({ workOrder, }) => workOrder;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: WorkOrderForm,
})
class WorkOrder extends PureComponent {
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
        {/* <Button type="primary" onClick={() => this.props.exportExcelAsync({
          order_ids: [1],
        })}> */}
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
      <WorkOrderSearchForm
        formBtn={this.renderFormBtn}
        getUserAsync={params =>
          this.props.getUserAsync({
            tag_id: 10,
            keyword: params,
          })
        }
        userList={this.props.userList}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></WorkOrderSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };

  onFormFieldChange = params => {
    console.log(' onFormFieldChange,  , ： ', params);
    // this.props.getListAsync(params.formData);
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

      add: this.props.showFormModal,
      showFormModal: this.props.showFormModal,
      showItemAsync: this.props.showItemAsync,
      exportDataAsync: this.props.exportData,
    };

    return <WorkOrderTable {...tableProps}></WorkOrderTable>;
  };
  showWorkOrderInfo = params => {
    console.log(' showWorkOrderInfo,  , ： ', params);
    // this.props.showItemAsync(params.formData);
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
    const { action, itemDetail, d_id } = this.props; //
    const { form, init } = props; //
    // return
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
      if (action === 'edit') {
        this.props.editItemAsync({
          ...itemDetail,
          ...res,
        });
      }
      if (action === 'dispatchOrder') {
        this.props.dispatchOrderAsync({
          ...res,
          d_id,
        });
      }
      if (action === 'addTicket') {
        this.props.addTicketAsync({
          ...res,
          d_id,
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
      getTeamAsync: params => this.props.getTeamAsync({ name: params }),
      teamList: this.props.teamList,
      onFieldChange: this.onFormFieldChange,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'detail') {
      return <WorkOrderForm {...formComProps}></WorkOrderForm>;
    }
    if (action === 'dispatchOrder') {
      return (
        <WorkOrderDispatchOrderForm
          {...formComProps}
        ></WorkOrderDispatchOrderForm>
      );
    }
    if (action === 'addTicket') {
      // return <WorkOrderTicketForm></WorkOrderTicketForm>;
      return <WorkOrderTicketForm {...formComProps}></WorkOrderTicketForm>;
    }

    console.log(' formComProps ： ', formComProps); //
    return <WorkOrderForm {...formComProps}></WorkOrderForm>;
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
    this.props.getUserAsync({
      tag_id: 10,
    });
    this.props.getTeamAsync();
    // this.props.addTicketAsync();
  }

  render() {
    const formComProps = {
      getUserAsync: params => this.props.getUserAsync({ value: params }),
      userList: this.props.userList,
      getTeamAsync: params => this.props.getTeamAsync({ name: params }),
      teamList: this.props.teamList,
      onFieldChange: this.onFormFieldChange,
    };
    // return <WorkOrderTicketForm {...formComProps} ></WorkOrderTicketForm>;
    // return (
    //   <ExportPdf goBack={this.showExportPdf} onClose={this.onClose}>
    //     <WorkOrderTicketForm></WorkOrderTicketForm>
    //   </ExportPdf>
    // );
    return (
      <div className="WorkOrder">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default WorkOrder;
