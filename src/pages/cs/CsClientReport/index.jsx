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

import * as services from '@/services/clientReport';
import { actions, mapStateToProps } from '@/models/csClientReport'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

const TITLE = '客户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  pdf: `月报`,
  clientReportDetailPdf: `月报`,
  batchClientReportDetailPdf: `月报`,
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
      isExportPdf: false,
    };
  }

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        {/* <Button
          type="primary"
          // onClick={this.exportDataAsync}
        >
          查询
        </Button> */}
        {/* <Button
          type="primary"
          onClick={() => {
            console.log(' xxxxx ： ', this.props.itemDetail, this.props); //
            this.props.showFormModal({
              action: 'pdfss',
            });
          }}
        >
          导出PDF
        </Button> */}
        {/* <Button
          type="primary"
          onClick={() => {
            console.log(' xxxxx ： ', this.props.itemDetail, this.props); //
            this.props.toggleExportPDF();
          }}
        >
          导出PDF
        </Button> */}
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <div className={'fsb '}>
        <CsClientReportSearchForm
          formBtn={this.renderFormBtn}
          init={this.props.searchInfo}
          onFieldChange={this.onFieldChange}
          clientList={this.props.clientList}
        ></CsClientReportSearchForm>
        <div className={'btnWrapper'}>
          <Button type="primary" onClick={this.batchExportPDF}>
            批量导出PDF
          </Button>
        </div>
      </div>
    );
  };

  batchExportPDF = async props => {
    console.log(
      ' batchExportPDF ： ',
      props,
      this.state,
      this.props,
      this.props.selectedRows,
    ); //
    // if (this.props.selectedRowKeys.length > 0) {
    const res = await Promise.allSettled(
      (this.props.selectedRows.length > 0
        ? this.props.selectedRows
        : this.props.dataList
      )
        .filter(v => v.finish == 1)
        .map(v =>
          services.getItem({
            d_id: v.electricity_user_id,
            year_month: this.props.searchInfo.year_month
              ? this.props.searchInfo.year_month.format('YYYY-MM')
              : '',
          }),
        ),
    );
    console.log(' res ： ', res); //
    this.props.batchExportPDF({
      action: 'batchClientReportDetailPdf',
      payload: res.filter(v => v.status === 'fulfilled').map(v => v.value.bean),
    });
    // } else {
    //   tips('请勾选打印项！', 2);
    // }
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
      console.log('  对吗  params.value.length ', params.value.length);
      // if (params.value?.customer_id?.length) {
      this.props.getListAsync(params.formData);
      // } else {
      //   tips('请至少选择一个客户！', 2);
      // }
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
    };

    return <CsClientReportTable {...tableProps}></CsClientReportTable>;
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
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'pdf') {
      return <ClientReportPdf></ClientReportPdf>;
    }
    console.log(' formComProps ： ', formComProps); //
    // return this.renderExportPdf;
    if (['clientReportDetailPdf'].includes(action)) {
      // return <ClientReportPdf></ClientReportPdf>;
      return this.renderExportPdf(this.props.itemDetail);
      // return <div ref={ref => (this.ref = ref)} >
      //   {this.renderExportPdf(this.props.itemDetail)}
      // </div>;
    }
    if (['batchClientReportDetailPdf'].includes(action)) {
      // const com = this.props.pdfDataList.map(this.renderExportPdf)
      // console.log(' com ： ', com,  )//
      return this.renderExportPdf(this.props.itemDetail);
      return (
        <div className={`pdfDetail `} ref={ref => (this.ref = ref)}>
          {this.props.pdfDataList.map(v => (
            <CsClientReportDescription
              key={Math.random()}
              data={this.props.itemDetail}
              data={v}
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
                      console.log(
                        ' xxxxx ： ',
                        this.props.itemDetail,
                        this.props,
                      ); //
                      this.props.toggleExportPDF();
                    }}
                  >
                    打印/导出PDF
                  </Button>
                </div>
              }
            ></CsClientReportDescription>
          ))}
        </div>
      );
    }
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

  renderExportPdf = data => {
    console.log(' ExportPdf this.ref ： ', data, this.ref); //
    return (
      <div
        className={`pdfDetail `}
        ref={ref => (this.ref = ref)}
        key={Math.random()}
      >
        {this.props.pdfDataList.length == 0 ? (
          <CsClientReportDescription
            data={this.props.itemDetail}
            data={data}
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
                    console.log(
                      ' xxxxx ： ',
                      this.props.itemDetail,
                      this.props,
                    ); //
                    this.props.toggleExportPDF();
                  }}
                >
                  打印/导出PDF
                </Button>
              </div>
            }
          ></CsClientReportDescription>
        ) : (
          this.props.pdfDataList.map(v => (
            <CsClientReportDescription
              data={this.props.itemDetail}
              data={v}
              key={Math.random()}
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
                      console.log(
                        ' xxxxx ： ',
                        this.props.itemDetail,
                        this.props,
                      ); //
                      this.props.toggleExportPDF();
                    }}
                  >
                    打印/导出PDF
                  </Button>
                </div>
              }
            ></CsClientReportDescription>
          ))
        )}
      </div>
    );
  };

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

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {/* {this.renderCommonModal()} */}

        {/* {this.renderExportPdf} */}

        {/* {this.props.isShowExportPdf && <ExportPdf onClose={this.props.closePdf} com={this.ref}></ExportPdf>} */}
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
