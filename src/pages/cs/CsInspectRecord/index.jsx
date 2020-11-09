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
import SearchKwForm from '@/components/Form/SearchKwForm'; //
import CsInspectRecordForm from '@/components/Form/CsInspectRecordForm'; //
import CsInspectRecordSearchForm from '@/components/Form/CsInspectRecordSearchForm'; //
import InspectMissionDetailForm from '@/components/Form/InspectMissionDetailForm'; //
import CsInspectRecordTable from '@/components/Table/CsInspectRecordTable'; //
import ResultModal, { ErrorInfo } from '@/components/Modal/ResultModal'; //
import ExportPdf from '@/components/Pdf/ExportPdf'; //
import ExportHeader from '@/components/Pdf/ExportPdf/ExportHeader'; //

import { actions, mapStateToProps } from '@/models/csInspectRecord'; //
import ReactDOM from 'react-dom';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { inspectMissionStatusMap } from '@/configs';

const TITLE = '巡检';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  inspectMission: `任务详情`,
  upload: `文件上传inspectReport`,
  down: `文件下载`,
  detail: `${TITLE}报告`,
};

// const mapStateToProps = ({ CsInspectRecord, }) => CsInspectRecord;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: InspectMissionDetailForm,
})
class CsInspectRecord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
      isShowExportPdf: false,
      isShowPdfDetail: false,
    };
  }

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <CsInspectRecordSearchForm
        formBtn={this.renderFormBtn}
        onFieldChange={this.onFieldChange}
      ></CsInspectRecordSearchForm>
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
      showFormModal: this.props.showFormModal,
      getMissionItemAsync: this.props.getMissionItemAsync,
      showExportPdf: this.showExportPdf,
    };

    return <CsInspectRecordTable {...tableProps}></CsInspectRecordTable>;
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    if (
      action === 'detail' ||
      action === 'inspectReport' ||
      action === 'inspectMission'
    ) {
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
      if (action === 'inspectReport') {
        // this.props.inspectReportAsync({
        //   ...itemDetail,
        //   ...res,
        // });
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
      formComProps.init = {
        ...this.props.itemDetail,
      };
    }
    if (action === 'inspectMission') {
      return (
        <InspectMissionDetailForm {...formComProps}></InspectMissionDetailForm>
      );
    }
    console.log(' formComProps ： ', formComProps); //
    return <CsInspectRecordForm {...formComProps}></CsInspectRecordForm>;
  };
  renderSmartFormModal = params => {
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

  get renderCsInspectRecordForm() {
    return (
      <div className={`pdfDetail`}>
        {!this.state.isShowExportPdf && (
          <ExportHeader
            goBack={this.showExportPdf}
            print={this.exportPdf}
          ></ExportHeader>
        )}
        <CsInspectRecordForm init={this.props.itemDetail}></CsInspectRecordForm>
      </div>
    );
  }

  showExportPdf = e => {
    console.log('    showExportPdf ： ', e);
    this.props.toggleShowTitle();
    this.setState({
      isShowPdfDetail: !this.state.isShowPdfDetail,
    });
  };
  onClose = e => {
    console.log('    onClose ： ', e, this.state, this.props);
    this.setState({
      isShowExportPdf: false,
    });
  };
  exportPdf = e => {
    console.log('    exportPdfexportPdf ： ', e, this.state, this.props);
    this.setState(
      {
        isShowExportPdf: !this.state.isShowExportPdf,
      },
      () => window.print(),
    );
  };

  render() {
    console.log(
      ' %c CsInspectRecord 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

    if (this.state.isShowExportPdf) {
      return (
        <ExportPdf goBack={this.showExportPdf} onClose={this.onClose}>
          {this.renderCsInspectRecordForm}
        </ExportPdf>
      );
    }
    if (this.state.isShowPdfDetail) {
      return this.renderCsInspectRecordForm;
    }

    return (
      <div className="CsInspectRecord">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default CsInspectRecord;
