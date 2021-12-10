import React, { PureComponent } from 'react';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal';
import SearchKwForm from '@/components/Form/SearchKwForm';
import InspectRecordSearchForm from '@/components/Form/InspectRecordSearchForm';
import InspectRecordForm from '@/components/Form/InspectRecordForm';
import InspectMissionDetailForm from '@/components/Form/InspectMissionDetailForm';
import InspectRecordTable from '@/components/Table/InspectRecordTable';
import ExportPdf from '@/components/Pdf/ExportPdf';
import ExportHeader from '@/components/Pdf/ExportPdf/ExportHeader';

import { actions, mapStateToProps } from '@/models/inspectRecord';
import ReactDOM from 'react-dom';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { inspectMissionStatusMap } from '@/configs';
import ClientForm from '@/components/Form/ClientForm';
import PowerStationForm from '@/components/Form/PowerStationForm';

const TITLE = '巡检';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  inspectMission: `任务详情`,
  upload: `文件上传inspectReport`,
  down: `文件下载`,
  detail: `${TITLE}报告`,
  clientDetailAsync: `客户详情`,
  powerStationDetailAsync: `电站详情`,
  inspectRecordDetailAsync: `巡检记录详情`,
};

const detailFormMap = {
  clientDetailAsync: ClientForm,
  powerStationDetailAsync: PowerStationForm,
  inspectRecordDetailAsync: InspectRecordForm,
};

// const mapStateToProps = ({ inspectRecord, }) => inspectRecord;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: InspectMissionDetailForm,
  // noMountFetch: true,
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
    return <div className={'btnWrapper'}></div>;
  };
  renderSearchForm = params => {
    return (
      <SearchKwForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        label={'名称'}
        noLabel
      ></SearchKwForm>
    );
  };
  renderSearchForm = params => {
    return (
      <InspectRecordSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></InspectRecordSearchForm>
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
      showItemAsync: this.props.showItemAsync,
      getMissionItemAsync: this.props.getMissionItemAsync,
      showExportPdf: this.showExportPdf,
    };

    return <InspectRecordTable {...tableProps}></InspectRecordTable>;
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

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
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
      console.log('  res await 结果  ：', res, action);
      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
        });
      }
      // if (action === 'detail') {
      //   // this.props.editItemAsync({
      //   //   ...res,
      //   // });
      // }
      if (action === 'inspectReport') {
        // this.props.inspectReportAsync({
        //   ...res,
        // });
      }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  renderExportBtn = params => {
    const btnCom = (
      <div className="fje ">
        <Button
          type="primary"
          // onClick={this.exportDataAsync}
          onClick={() => {
            console.log(' xxxxx ： ', this.props.itemDetail, this.props);
            this.props.toggleExportPDF();
            return;
            this.showExportPdf({
              action: 'detail',
              extraAction: 'showExportPdf',
              d_id: this.props.itemDetail?.id,
            });
          }}
        >
          导出PDF
        </Button>
      </div>
    );
    return btnCom;
  };
  renderModalContent = e => {
    const { action } = this.props;

    const formComProps = {
      action,
      // isExportPDF: this.props.isExportPDF,
      // isExportPDF: this.props.isShowExportPdf,
      isExportPDF: this.props.isExportPDF,
      closeExportPdf: this.closeExportPdf,
      toggleExportPDF: this.props.toggleExportPDF,
    };
    if (action !== 'add') {
      formComProps.init = {
        ...this.props.itemDetail,
        // status: inspectMissionStatusMap[this.props.itemDetail.status],
      };
    }
    if (action === 'inspectMission') {
      formComProps.init = {
        ...this.props.missionItemDetail,
        // status: inspectMissionStatusMap[this.props.itemDetail.status],
      };
      return (
        <InspectMissionDetailForm {...formComProps}></InspectMissionDetailForm>
      );
    }
    console.log(' formComProps ： ', formComProps);
    // {this.renderExportBtn()}
    return (
      <InspectRecordForm
        {...formComProps}
        // action={'edit'}
        showActionBtn
        type={'comExportPdf'}
        editItem={this.props.editItem}
        toggleEdit={this.props.toggleEdit}
        isEdit={this.props.isEdit}
        // onFieldChange={this.props.onFieldChange}
        onMaxChange={this.props.onFieldChange}
        formKey={this.props.formKey}
        formData={this.props.formData}
        editItemAsync={this.props.editItemAsync}
        onCancel={this.props.onCancel}
        // key={this.props.formKey}
      ></InspectRecordForm>
    );
    // if (action === 'inspectReport') {
    //   return <InspectRecordForm {...formComProps}></InspectRecordForm>;
    // }
    // return (
    //   <InspectMissionDetailForm {...formComProps}></InspectMissionDetailForm>
    // );
  };
  renderSmartFormModal = params => {
    const isNoFooter = ['detail'].includes(this.props.action);
    const detailProps = isNoFooter
      ? {
          footer: null,
        }
      : {};
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        // {...detailProps}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  get renderInspectRecordForm() {
    console.log(' renderInspectRecordForm ： ', this.props);
    return (
      <div className={`pdfDetail`}>
        {/* {!this.state.isShowExportPdf && (
          <ExportHeader
            // goBack={this.showExportPdf}
            goBack={this.closeExportPdf}
            print={this.exportPdf}
          ></ExportHeader>
        )} */}
        <InspectRecordForm
          extraAction={this.props.extraAction}
          init={this.props.itemDetail}
          closeExportPdf={this.closeExportPdf}
          toggleExportPDF={this.props.toggleExportPDF}
          // isExportPDF={this.props.isExportPDF}
          isExportPDF
        ></InspectRecordForm>
      </div>
    );
  }

  showExportPdf = params => {
    console.log('    showExportPdf ： ', params);
    // this.props.toggleShowTitle();
    this.props.getItemAsync(params);
    // this.setState({
    //   isShowPdfDetail: !this.state.isShowPdfDetail,
    // });
  };
  closeExportPdf = params => {
    console.log('    closeExportPdf ： ', params);
    this.props.toggleShowTitle();
    this.props.closePdf();
    this.setState({
      isShowExportPdf: false,
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
    console.log(' renderExportPdf ： ');
    const formComProps = {
      init: {
        ...this.props.itemDetail,
      },
    };
    return this.state.isShowExportPdf
      ? ReactDOM.createPortal(
          <ExportPdf>
            <InspectRecordForm
              {...formComProps}
              closeExportPdf={this.closeExportPdf}
            ></InspectRecordForm>
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
  componentDidMount() {
    setTimeout(() => {
      console.log('  延时器 ： ');
      // this.props.getListAsync({
      //   page: 38,
      //   page_size: 10,
      // });
      // this.props.showFormModal({
      //   action: 'detail', d_id: 10601
      // });
      // this.props.getItemAsync({
      //   action: 'detail',
      //   d_id: 84,
      // });
    }, 2000);
  }

  render() {
    console.log(
      ' %c InspectRecord 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    // if (this.props.isShowExportPdf) {
    //   console.log(' 111111111 ： ');
    //   return (
    //     <ExportPdf onClose={this.props.closePdf} noPrint>
    //       {this.renderInspectRecordForm}
    //     </ExportPdf>
    //   );
    // }

    if (this.props.isShowPdfDetail) {
      // if (this.props.isExportPDF) {
      return this.renderInspectRecordForm;
    }

    return (
      <div className="inspectRecord">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}

        {/* <Button type="primary" onClick={this.doPrint}>
          导出
        </Button> */}
        {/* {this.renderExportPdf()} */}
      </div>
    );
  }
}

export default InspectRecord;
