import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import ClientReportTable from '@/components/Table/ClientReportTable'; //
import ClientReportForm from '@/components/Form/ClientReportForm'; //
import ClientReportSearchForm from '@/components/Form/ClientReportSearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import ClientReportPdf from '@/components/Pdf/ClientReportPdf'; //
import CsClientReportDescription from '@/components/Description/CsClientReportDescription'; //
import usePrintPdf, { ExportPdf } from '@/hooks/usePrintPdf'; //
import ClientForm from '@/components/Form/ClientForm';
import HouseNoForm from '@/components/Form/HouseNoForm';

import { actions, mapStateToProps } from '@/models/clientReport'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '客户';

const titleMap = {
  add: `新建电费账单`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  pdf: `月报`,
  clientReportDetailPdf: `月报`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
};

const detailFormMap = {
  clientDetailAsync: ClientForm,
  houseNoDetailAsync: HouseNoForm,
};

// const mapStateToProps = ({ clientReport, }) => clientReport;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: ClientReportForm,
  // noMountFetch: true,
})
class ClientReport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderSearchForm = params => {
    return (
      <div className={'fsb '}>
        <ClientReportSearchForm
          init={this.props.searchInfo}
          onFieldChange={this.onFieldChange}
        ></ClientReportSearchForm>
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

  onFieldChange = params => {
    console.log(
      ' onFieldChange,  , ： ',
      params,
      params.value,
      params.formData,
      this.props,
    );
    const { value } = params;
    if (value.filter) {
      this.props.getListFilter({ ...params.value });
    } else {
      this.props.getListAsync(params.formData);
    }
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

      noRequest: true,
      count: this.props.dataList.length,
      exportData: this.props.exportData,
      add: this.props.addItemAsync,
    };

    return <ClientReportTable {...tableProps}></ClientReportTable>;
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    if (['pdf', 'clientReportDetailPdf'].includes(this.props.action)) {
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
      getClientAsync: params => this.props.getClientAsync({ name: params }),
      clientList: this.props.clientList,
      electricBillList: this.props.electricBillList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'add') {
      return <ClientReportForm {...formComProps}></ClientReportForm>;
    }
    if (['add', 'edit'].includes(action)) {
      // return <ClientReportPdf></ClientReportPdf>;
      return this.renderExportPdf;
    }
    console.log(' formComProps ： ', formComProps); //
    return this.renderExportPdf;
  };
  get size() {
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

  get renderExportPdf() {
    console.log(' ExportPdf this.ref ： ', this.ref); //
    return (
      <div className={`pdfDetail `} ref={ref => (this.ref = ref)}>
        <CsClientReportDescription
          data={this.props.itemDetail}
          closeExportPdf={this.closeExportPdf}
          toggleExportPDF={this.props.toggleExportPDF}
          isExportPDF
          // className={this.props.isShowExportPdf ? '' : 'hide'}
          className={this.state.isExportPdf ? 'posAbs' : ''}
          top={
            <div className={'fje noPrint '}>
              <Button
                type="primary"
                onClick={() => {
                  console.log(' xxxxx ： ', this.props.itemDetail, this.props); //
                  this.props.toggleExportPDF();
                }}
              >
                打印/导出PDF
              </Button>
            </div>
          }
        ></CsClientReportDescription>
      </div>
    );
  }

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

  componentDidMount() {
    console.log('  组件componentDidMount挂载 ： ', this.state, this.props); //
    this.props.getElectricBillAsync();
    setTimeout(() => {
      console.log('  延时器 ： ');
      // this.props.getListAsync({
      //   page: 38,
      //   page_size: 10,
      // });
      // this.props.getItemAsync({
      //   action: 'pdf',
      //   d_id: 5977,
      //   d_id: 6358,
      //   year_month: '2020-12',
      // });
      // this.props.getListAsync({
      //   year_month: '2020-12',
      // });
    }, 2000);
  }

  render() {
    return (
      <div className="ClientReport">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}

        {/* {this.renderExportPdf} */}

        <ExportPdf
          onClose={this.props.closePdf}
          com={this.ref}
          isPrintPdf={this.props.isShowExportPdf}
        ></ExportPdf>
      </div>
    );
  }
}

export default ClientReport;
