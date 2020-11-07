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

import { actions, mapStateToProps } from '@/models/inspectRecord'; //
import ReactDOM from 'react-dom';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { inspectMissionStatusMap } from '@/configs';

const TITLE = '巡检';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `任务详情`,
  upload: `文件上传`,
  down: `文件下载`,
  inspectReport: `${TITLE}报告`,
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
    };
  }

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
        {/* <Button
        type="primary"
        onClick={() => this.props.showFormModal({ action: 'add' })}
      >
        新增{TITLE}
      </Button> */}
        {/* <Button type="primary" onClick={() => this.props.onBatchRemove()}>
        删除
      </Button> */}
      </div>
    );
  };
  renderSearchForm = params => {
    return <SearchKwForm formBtn={this.renderFormBtn}></SearchKwForm>;
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
    };

    return <InspectRecordTable {...tableProps}></InspectRecordTable>;
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
        status: inspectMissionStatusMap[this.props.itemDetail.status],
      };
    }
    if (action === 'inspectReport') {
      return <InspectRecordForm {...formComProps}></InspectRecordForm>;
    }
    console.log(' formComProps ： ', formComProps); //
    return (
      <InspectMissionDetailForm {...formComProps}></InspectMissionDetailForm>
    );
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

  renderExportPdf = params => {
    return this.state.isShowPdf ? <ExportPdf></ExportPdf> : null;
  };

  renderExportPdf2 = params => {
    console.log(' renderExportPdf2 ： '); //
    const formComProps = {
      init: {
        ...this.props.itemDetail,
      },
    };
    return this.state.isShowPdf
      ? ReactDOM.createPortal(
          <ExportPdf>
            <InspectRecordForm {...formComProps}></InspectRecordForm>
          </ExportPdf>,
          document.getElementById('root'),
        )
      : null;
  };

  doPrint = () => {
    console.log(' doPrint   ,   ： ');
    // const newStr = counterRef.current.innerHTML
    // document.body.innerHTML = newStr
    // this.current = document.body.innerHTML
    this.setState(
      {
        isShowPdf: true,
      },
      () =>
        setTimeout(() => {
          console.log('  延时器 ： ');
          // window.print()
        }, 2000),
    );

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

    return (
      <div className="InspectRecord">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        <Button type="primary" onClick={this.doPrint}>
          导出
        </Button>
        {/* {this.renderExportPdf()} */}
        {this.renderExportPdf2()}
      </div>
    );
  }
}

export default InspectRecord;
