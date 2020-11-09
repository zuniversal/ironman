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
import InspectRecordForm from '@/components/Form/InspectRecordForm'; //
import InspectMissionDetailForm from '@/components/Form/InspectMissionDetailForm'; //
import InspectRecordTable from '@/components/Table/InspectRecordTable'; //
import ResultModal, { ErrorInfo } from '@/components/Modal/ResultModal'; //
import ExportPdf from '@/components/Pdf/ExportPdf'; //
import ExportHeader from '@/components/Pdf/ExportPdf/ExportHeader'; //

import { actions, mapStateToProps } from '@/models/inspectRecord'; //
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

// const mapStateToProps = ({ inspectRecord, }) => inspectRecord;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: InspectMissionDetailForm,
})
class InspectRecord extends PureComponent {
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
      <SearchKwForm
        formBtn={this.renderFormBtn}
        onFieldChange={this.onFieldChange}
      ></SearchKwForm>
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

    return <InspectRecordTable {...tableProps}></InspectRecordTable>;
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
        // status: inspectMissionStatusMap[this.props.itemDetail.status],
      };
    }
    if (action === 'inspectMission') {
      return (
        <InspectMissionDetailForm {...formComProps}></InspectMissionDetailForm>
      );
    }
    console.log(' formComProps ： ', formComProps); //
    return <InspectRecordForm {...formComProps}></InspectRecordForm>;
    // if (action === 'inspectReport') {
    //   return <InspectRecordForm {...formComProps}></InspectRecordForm>;
    // }
    // return (
    //   <InspectMissionDetailForm {...formComProps}></InspectMissionDetailForm>
    // );
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

  get renderInspectRecordForm() {
    return (
      <div className={`pdfDetail`}>
        {!this.state.isShowExportPdf && (
          <ExportHeader
            goBack={this.showExportPdf}
            print={this.exportPdf}
          ></ExportHeader>
        )}
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
  renderExportPdf = params => {
    console.log(' renderExportPdf ： '); //
    const formComProps = {
      init: {
        ...this.props.itemDetail,
      },
    };
    return this.state.isShowExportPdf
      ? ReactDOM.createPortal(
          <ExportPdf>
            <InspectRecordForm {...formComProps}></InspectRecordForm>
          </ExportPdf>,
          document.getElementById('root'),
        )
      : null;
  };

  close = e => {
    console.log('    close ： ', e);
  };
  doPrint = () => {
    console.log(' doPrint   ,   ： ');
    // const newStr = counterRef.current.innerHTML
    // document.body.innerHTML = newStr
    // this.current = document.body.innerHTML
    this.setState(
      {
        isShowExportPdf: true,
      },
      () =>
        setTimeout(() => {
          console.log('  延时器 ： ');
          // window.print()
        }, 2000),
    );
    const { matchMedia } = window;
    const mediaQueryList = matchMedia('print');
    console.log(' InspectRecordForm  useEffect ： ', mediaQueryList);
    if (matchMedia) {
      console.log(' InspectRecordForm matchMediamatchMedia ： ', matchMedia);
      mediaQueryList.addListener(mql => {
        console.log(' InspectRecordForm mql ： ', mql, mql.matches);
      });
    }
    window.onafterprint = e => {
      console.log('    close ： ', e);
    };
    // setTimeout(() => {
    //   console.log('  延时器 ： ',  )
    //   window.print()
    // }, 2000)
  };

  render() {
    console.log(
      ' %c InspectRecord 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

    if (this.state.isShowExportPdf) {
      console.log(' 111111111 ： '); //
      return (
        <ExportPdf goBack={this.showExportPdf} onClose={this.onClose}>
          {this.renderInspectRecordForm}
        </ExportPdf>
      );
    }
    if (this.state.isShowPdfDetail) {
      return this.renderInspectRecordForm;
    }

    return (
      <div className="InspectRecord">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {/* <Button type="primary" onClick={this.doPrint}>
          导出
        </Button> */}
        {/* {this.renderExportPdf()} */}
      </div>
    );
  }
}

export default InspectRecord;
