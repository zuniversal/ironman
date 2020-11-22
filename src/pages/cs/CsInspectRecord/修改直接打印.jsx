import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
import CsInspectRecordForm from '@/components/Form/CsInspectRecordForm'; //
import CsInspectRecordSearchForm from '@/components/Form/CsInspectRecordSearchForm'; //
import InspectMissionDetailForm from '@/components/Form/InspectMissionDetailForm'; //
import InspectRecordForm from '@/components/Form/InspectRecordForm'; //
import CsInspectRecordTable from '@/components/Table/CsInspectRecordTable'; //
import ExportPdf from '@/components/Pdf/ExportPdf'; //
import ExportHeader from '@/components/Pdf/ExportPdf/ExportHeader'; //

import { actions, mapStateToProps } from '@/models/csInspectRecord'; //
import ReactDOM from 'react-dom';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '巡检';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  inspectMission: `任务详情`,
  upload: `文件上传inspectReport`,
  down: `文件下载`,
  detail: `${TITLE}报告`,
  inspectRecordDetailAsync: `巡检任务详情`,
};

const detailFormMap = {
  inspectRecordDetailAsync: InspectRecordForm,
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
    return <div className={'btnWrapper'}></div>;
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
      showItemAsync: this.props.showItemAsync,
      getMissionItemAsync: this.props.getMissionItemAsync,
      showExportPdf: this.showExportPdf,
    };

    return <CsInspectRecordTable {...tableProps}></CsInspectRecordTable>;
  };
  renderCommonModal = params => {
    const DetailForm = detailFormMap[this.props.common.action];
    console.log(
      ' renderCommonModal ： ',
      this.props.showItemAsync,
      this.props.closeCommonModal,
      params,
      DetailForm,
      this.state,
      this.props,
    ); //
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
      if (action === 'confirmInspectAsync   ') {
        this.props.confirmInspectAsync({
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
        hideCancel={this.isHideCancel}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  get isHideCancel() {
    // console.log(' get 取属 isHideCancel ： ', this.state, this.props);
    return ['detail'].some(v => v === this.props.action);
  }
  get renderCsInspectRecordForm() {
    return (
      <div className={`pdfDetail`}>
        {!this.state.isShowExportPdf && (
          <ExportHeader
            goBack={this.showExportPdf}
            print={this.exportPdf}
          ></ExportHeader>
        )}
        {/* <CsInspectRecordForm init={this.props.itemDetail}></CsInspectRecordForm> */}
        <InspectRecordForm init={this.props.itemDetail}></InspectRecordForm>
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

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default CsInspectRecord;
