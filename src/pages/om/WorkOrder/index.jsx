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
import WorkOrderForm from '@/components/Form/WorkOrderForm'; //
import WorkOrderSearchForm from '@/components/Form/WorkOrderSearchForm'; //
import WorkOrderTicketForm from '@/components/Form/WorkOrderTicketForm'; //
import { WorkOrderDispatchOrderForm } from '@/components/Form/WorkOrderActionForm'; //
import WorkOrderTable from '@/components/Table/WorkOrderTable'; //
import WorkOrderDetail from '@/components/Detail/WorkOrderDetail'; //
import ResultModal, { ErrorInfo } from '@/components/Modal/ResultModal'; //

import { actions, mapStateToProps } from '@/models/workOrder'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

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

  renderFormBtn = params => {
    console.log(' renderFormBtn ： ', params); //
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
        <Button type="primary" onClick={() => this.props.exportData({})}>
          导出
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <WorkOrderSearchForm
        formBtn={this.renderFormBtn}
        // onSubmit={this.onSubmit}
        // onFail={this.onFail}
      ></WorkOrderSearchForm>
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

      add: this.props.showFormModal,
      showFormModal: this.props.showFormModal,
      exportData: this.props.exportData,
    };

    return <WorkOrderTable {...tableProps}></WorkOrderTable>;
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail, d_id } = this.props; //
    const { form, init } = props; //
    // return
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
      if (action === 'detail') {
        this.props.detailAsync({
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
    console.log('    renderModalContent ： ', e, this.state, this.props);
    const { action } = this.props; //
    const formComProps = {
      action,
      getUserAsync: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
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
      return <WorkOrderTicketForm {...formComProps}></WorkOrderTicketForm>;
    }

    console.log(' formComProps ： ', formComProps); //
    return <WorkOrderForm {...formComProps}></WorkOrderForm>;
  };
  get size() {
    console.log(' get 取属 size ： ', this.state, this.props);
    return this.props.action === 'dispatchOrder' ? 'small' : 'default';
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
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  render() {
    console.log(
      ' %c WorkOrder 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

    return (
      <div className="WorkOrder">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default WorkOrder;
