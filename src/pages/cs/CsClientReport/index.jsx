import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import CsClientReportTable from '@/components/Table/CsClientReportTable'; //
import ClientReportForm from '@/components/Form/ClientReportForm'; //
import CsClientReportSearchForm from '@/components/Form/CsClientReportForm/CsClientReportSearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import ClientReportPdf from '@/components/Pdf/ClientReportPdf'; //
import CsClientReportDescription from '@/components/Description/CsClientReportDescription'; //
// import ExportPdf from '@/components/Pdf/ExportPdf'; //
import usePrintPdf, { ExportPdf } from '@/hooks/usePrintPdf'; //

import { actions, mapStateToProps } from '@/models/csClientReport'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '客户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
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
  noMountFetch: true,
})
class ClientReport extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
      isExportPdf: false,
    };
  }

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button
          type="primary"
          // onClick={this.exportDataAsync}
        >
          查询
        </Button>
        <Button
          type="primary"
          onClick={() => {
            console.log(' xxxxx ： ', this.props.itemDetail, this.props); //
            this.props.showFormModal({
              action: 'pdfss',
            });
          }}
        >
          导出PDF
        </Button>
        <Button
          type="primary"
          onClick={() => {
            console.log(' xxxxx ： ', this.props.itemDetail, this.props); //
            this.props.toggleExportPDF();
          }}
        >
          导出PDF
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <CsClientReportSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></CsClientReportSearchForm>
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
      authInfo: this.props.authInfo,
      searchInfo: this.props.searchInfo,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,

      add: this.props.showFormModal,
    };

    return <CsClientReportTable {...tableProps}></CsClientReportTable>;
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
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'pdf') {
      return <ClientReportPdf></ClientReportPdf>;
    }
    console.log(' formComProps ： ', formComProps); //
    return this.renderExportPdf;
    return <ClientReportForm {...formComProps}></ClientReportForm>;
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
          init={this.props.itemDetail}
          closeExportPdf={this.closeExportPdf}
          toggleExportPDF={this.props.toggleExportPDF}
          isExportPDF
          // className={this.props.isShowExportPdf ? '' : 'hide'}
          className={this.state.isExportPdf ? 'posAbs' : ''}
          top={
            <div className={'fje noPrint '}>
              {/* <Button
              type="primary"
              onClick={() => {
                this.setState({
                  isExportPdf: true,
                }, () => {
                  console.log(' xxxxx ： ', ); //
                  window.print();
                })
              }}
            >
              导出PDFx
            </Button> */}
              <Button
                type="primary"
                onClick={() => {
                  console.log(' xxxxx ： ', this.props.itemDetail, this.props); //
                  this.props.toggleExportPDF();
                }}
              >
                导出PDF
              </Button>
            </div>
          }
        ></CsClientReportDescription>
      </div>
    );
  }

  render() {
    // const com = this.renderExportPdf
    // // console.log(' comcom ：com &&  ', com,  )//   isShowExportPdf={this.props.isShowExportPdf}
    // if (this.props.isShowExportPdf) {
    // // if (true) {
    //   return (
    //     <ExportPdf onClose={this.props.closePdf}>

    //         {/* {com} */}
    //         {this.renderExportPdf}

    //     </ExportPdf>
    //   );
    // }

    return (
      <div className="ClientReport">
        {this.renderSearchForm()}

        {this.renderExportPdf}
        {/* {this.props.isShowExportPdf && <ExportPdf onClose={this.props.closePdf} com={this.ref}></ExportPdf>} */}
        <ExportPdf
          onClose={this.props.closePdf}
          com={this.ref}
          isPrintPdf={this.props.isShowExportPdf}
        ></ExportPdf>
        {/* <CsClientReportDescription></CsClientReportDescription> */}

        {this.renderSmartFormModal()}

        {/* {this.renderTable()}

        {this.renderSmartFormModal()} */}
      </div>
    );
  }
}

export default ClientReport;
