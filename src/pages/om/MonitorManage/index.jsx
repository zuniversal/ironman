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
import SearchKwForm from '@/components/Form/SearchKwForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import MonitorManageForm from '@/components/Form/MonitorManageForm'; //
import MonitorManageTable from '@/components/Table/MonitorManageTable'; //
import ResultModal, { ErrorInfo } from '@/components/Modal/ResultModal'; //

import { actions, mapStateToProps } from '@/models/monitorManage'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '操作';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ monitorManage, }) => monitorManage;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: MonitorManageForm,
})
class MonitorManage extends PureComponent {
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
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
        >
          新增{TITLE}
        </Button>
        <Button type="primary" onClick={() => this.props.exportData()}>
          Excel导入设备
        </Button>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出{TITLE}设备数据
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <SearchKwForm
        formBtn={this.renderFormBtn}
        // onSubmit={this.onSubmit}
        // onFail={this.onFail}
      ></SearchKwForm>
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
    };

    return <MonitorManageTable {...tableProps}></MonitorManageTable>;
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
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
    console.log('    renderModalContent ： ', e, this.state, this.props);
    const { action } = this.props; //
    const formComProps = {
      action,
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ keyword: params }),
      clientList: this.props.clientList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <MonitorManageForm {...formComProps}></MonitorManageForm>;
  };
  renderSmartFormModal = params => {
    console.log(' renderSmartFormModal ： ', params, this.state, this.props);
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  render() {
    console.log(
      ' %c MonitorManage 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

    return (
      <div className="MonitorManage">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default MonitorManage;
