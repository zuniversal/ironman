import React, { Component, PureComponent } from 'react';
import './style.less';

import { Form, Input, Button, Checkbox, Menu, Upload, Result } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import SearchForm from '@/common/SearchForm'; //
import ClientReportTable from '@/components/Table/ClientReportTable'; //
import ClientReportForm from '@/components/Form/ClientReportForm'; //
import ClientReportSearchForm from '@/components/Form/ClientReportSearchForm'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //
import ClientReportPdf from '@/components/Pdf/ClientReportPdf'; //

import { actions, mapStateToProps } from '@/models/clientReport'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '客户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
  pdf: `月报`,
};

// const mapStateToProps = ({ clientReport, }) => clientReport;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: ClientReportForm,
})
class ClientReport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <div className={'fsb '}>
        <ClientReportSearchForm></ClientReportSearchForm>
        {/* <div className={'btnWrapper'}>
          <Button
            type="primary"
            onClick={() => this.props.showFormModal({ action: 'add' })}
          >
            新增{TITLE}
          </Button>
          <Button type="primary" onClick={() => this.props.exportData()}>
            导出{TITLE}数据
          </Button>
        </div> */}
      </div>
    );
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
      showFormModal: this.props.showFormModal,

      add: this.props.showFormModal,
    };

    return <ClientReportTable {...tableProps}></ClientReportTable>;
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    if (action === 'pdf') {
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
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  renderModalContent = e => {
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
    if (action === 'pdf') {
      return <ClientReportPdf></ClientReportPdf>;
    }
    console.log(' formComProps ： ', formComProps); //
    return <ClientReportForm {...formComProps}></ClientReportForm>;
  };
  get size() {
    console.log(' get 取属 size ： ', this.state, this.props);
    return ['uploadFile'].some(v => v === this.props.action)
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
    console.log(
      ' %c ClientReport 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="ClientReport">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default ClientReport;
