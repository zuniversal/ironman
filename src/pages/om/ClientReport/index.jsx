import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import ClientReportTable from '@/components/Table/ClientReportTable';
import ClientReportForm from '@/components/Form/ClientReportForm';
import ClientReportSearchForm from '@/components/Form/ClientReportSearchForm';
import SmartFormModal from '@/common/SmartFormModal';
import ClientReportPdf from '@/components/Pdf/ClientReportPdf';
import CsClientReportDescription from '@/components/Description/CsClientReportDescription';
import SmartShowPDF from '@/common/SmartShowPDF';
import usePrintPdf, { ExportPdf } from '@/hooks/usePrintPdf';
import ClientForm from '@/components/Form/ClientForm';
import HouseNoForm from '@/components/Form/HouseNoForm';
import * as services from '@/services/clientReport';

import { actions, mapStateToProps } from '@/models/clientReport';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips, filterObjArr } from '@/utils';

const TITLE = '客户';

const titleMap = {
  add: `新建电费账单`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  pdf: `月报`,
  clientReportDetailPdf: `月报`,
  sendClientReportDetailPdf: `月报`,
  batchClientReportDetailPdf: `月报`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  addElectricBillItemAsync: `新建电费账单`,
  editElectricBillItemAsync: `编辑电费账单`,
  getClientReportUpgradeAsync: `升级版月报`,
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
          // table={this.renderTable()}
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
    );
    // if (this.props.selectedRowKeys.length > 0) {
    // const datas = (this.props.selectedRows.length > 0
    //   ? this.props.selectedRows
    //   // : this.props.dataList
    //   : []
    // ).filter(v => v.finish == 1);
    const datas = this.props.dataList.filter(v => v.finish == 1);
    const filterData = filterObjArr(datas, 'number');
    console.log(' datas ： ', datas, filterData);

    // const res = await Promise.allSettled(
    //   filterData.map(v =>
    //     services.getItem({
    //       d_id: v.electricity_user_id,
    //       year_month: this.props.searchInfo.year_month
    //         ? this.props.searchInfo.year_month.format('YYYY-MM')
    //         : '',
    //     }),
    //   ),
    // );
    // this.props.batchExportPDF({
    //   action: 'batchClientReportDetailPdf',
    //   payload: res.filter(v => v.status === 'fulfilled').map(v => v.value.bean),
    // });
    const res = await services.batchGetReport({
      electrical_user_ids: filterData.map(v => v.electricity_user_id),
      year_month: this.props.searchInfo.year_month
        ? this.props.searchInfo.year_month.format('YYYY-MM')
        : '',
    });
    console.log(' res ： ', res);
    this.props.batchExportPDF({
      action: 'batchClientReportDetailPdf',
      payload: res.list,
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
    const { value, formData } = params;
    if (!formData.year_month) {
      tips('请选择月份！', 1);
      return;
    }

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
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
      showItemAsync: this.props.showItemAsync,

      noRequest: true,
      count: this.props.dataList.length,
      exportData: this.props.exportData,
      edit: this.props.getElectricBillItemAsync,
    };

    return <ClientReportTable {...tableProps}></ClientReportTable>;
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    if (['pdf', 'clientReportDetailPdf'].includes(this.props.action)) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      // return
      if (action === 'addElectricBillItemAsync') {
        this.props.addElectricBillItemAsync({
          ...res,
          year_month: res.year_month.format('YYYY-MM'),
        });
      }
      if (action === 'editElectricBillItemAsync') {
        this.props.editElectricBillItemAsync({
          ...res,
          electrical_id: this.props.d_id,
          d_id: this.props.d_id,
          year_month: res.year_month.format('YYYY-MM'),
        });
      }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ name: params }),
      clientList: this.props.clientList,
      electricBillList: this.props.electricBillList,
      init: this.props.itemDetail,
      onOk: this.onOk,
    };
    // if (action !== 'add') {
    //   formComProps.init = this.props.itemDetail;
    // }
    // if (['add', 'edit'].includes(action)) {
    //   // return <ClientReportPdf></ClientReportPdf>;
    //   return this.renderExportPdf;
    // }
    if (action === 'getClientReportUpgradeAsync') {
      console.log(
        'getClientReportUpgradeAsync this.state, this.props ： ',
        this.state,
        this.props,
        this.props.extraData,
      );
      return (
        <SmartShowPDF
          src={`${this.props.extraData.path}`}
          // path={`${this.props.extraData.path}`}
        ></SmartShowPDF>
      );
    }
    if (
      ['clientReportDetailPdf', 'sendClientReportDetailPdf'].includes(action)
    ) {
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
                      );
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
    console.log(' formComProps ： ', formComProps);
    return <ClientReportForm {...formComProps}></ClientReportForm>;
    // return this.renderExportPdf;
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
    console.log(' ExportPdf this.ref ： ', data, this.ref);
    return (
      <div
        className={`pdfDetail `}
        ref={ref => (this.ref = ref)}
        key={Math.random()}
      >
        {this.props.pdfDataList.length == 0 ? (
          <CsClientReportDescription
            onCancel={this.props.onCancel}
            action={this.props.action}
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
                    );
                    tips('开始打印');
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
              onCancel={this.props.onCancel}
              action={this.props.action}
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
                      );
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
    console.log('  组件componentDidMount挂载 ： ', this.state, this.props);
    this.props.getBillTypeListAsync();
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
      // this.props.getItemAsync({
      //   action: 'clientReportDetailPdf',
      //   d_id: 6419,
      //   year_month: '2020-12'
      // });
    }, 3000);
  }

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

        {this.renderCommonModal()}

        {/* {this.renderExportPdf} */}

        {this.props.isShowExportPdf && (
          <ExportPdf
            onClose={this.props.closePdf}
            com={this.ref}
            isPrintPdf={this.props.isShowExportPdf}
          ></ExportPdf>
        )}
      </div>
    );
  }
}

export default ClientReport;
