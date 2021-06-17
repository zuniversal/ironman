import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal';
import WeakForm from '@/components/Form/WeakForm';
import WeakSearchForm from '@/components/Form/WeakSearchForm';
import WeakTable from '@/components/Table/WeakTable';
import ExportPdf from '@/components/Pdf/ExportPdf';
import WeakFormPdf from '@/components/Pdf/WeakFormPdf';

import { actions, mapStateToProps } from '@/models/weak';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import ClientForm from '@/components/Form/ClientForm';
import PowerStationForm from '@/components/Form/PowerStationForm';

const TITLE = '缺陷';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}单`,
  upload: `文件上传`,
  handleWeak: `缺陷单`,
  weakDetailAsync: `缺陷单`,
  clientDetailAsync: `客户详情`,
  powerStationDetailAsync: `电站详情`,
};

const detailFormMap = {
  weakDetailAsync: WeakForm,
  clientDetailAsync: ClientForm,
  powerStationDetailAsync: PowerStationForm,
};

// const mapStateToProps = ({ weak, }) => weak;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: WeakForm,
})
class Weak extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
      isShowExportPdf: false,
    };
  }

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
          disabled={this.props.authInfo.create !== true}
        >
          新增{TITLE}
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <WeakSearchForm
        // formBtn={this.renderFormBtn}
        getUser={this.props.getUserAsync}
        userList={this.props.userList}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></WeakSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };
  handleAction = params => {
    console.log('    handleAction ： ', params, this.state, this.props);
    this.props.setData({
      isShowRemoveModal: true,
      removeParams: {
        noRemove: true,
        removeTitle: '提示',
        removeContent: '是否确认处理',
        okFn: e => {
          console.log(' okFnokFnokFnokFn ： ', e, params);
          this.props.handleWeakAsync(params);
          this.props.onResultModalCancel();
        },
      },
    });
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
      handleWeakAsync: this.props.handleWeakAsync,
      exportDataAsync: this.props.exportData,
      showExportPdf: this.showExportPdf,
      handleAction: this.handleAction,
    };

    return <WeakTable {...tableProps}></WeakTable>;
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

  showExportPdf = params => {
    console.log('    showExportPdf ： ', params);
    this.props.getItemAsync(params);
    // window.print()
    // this.setState(
    //   {
    //     isShowExportPdf: !this.state.isShowExportPdf,
    //   },
    //   // () => window.print(),
    // );
  };
  onClose = e => {
    console.log('    onClose ： ', e, this.state, this.props);
    this.setState({
      isShowExportPdf: false,
    });
  };
  get renderWeakForm() {
    return (
      <div className={`pdfDetail`}>
        <WeakForm init={this.props.itemDetail}></WeakForm>
      </div>
    );
    return this.props.itemDetail ? (
      <div className={`pdfDetail`}>
        <WeakForm init={this.props.itemDetail}></WeakForm>
      </div>
    ) : null;
  }

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    if (action === 'handleWeak' || action === 'detail') {
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
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    // if (action === 'handleWeak') {
    //   return <InspectMissionDetailForm {...formComProps} ></InspectMissionDetailForm>
    // }
    console.log(' formComProps ： ', formComProps);
    return <WeakForm {...formComProps}></WeakForm>;
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

  render() {
    if (this.props.isShowExportPdf) {
      // if (this.state.isShowExportPdf) {
      console.log(' 111111111 ： ', this.props.itemDetail);
      return (
        <ExportPdf onClose={this.props.closePdf}>
          {this.renderWeakForm}
        </ExportPdf>
      );
      return (
        Object.keys(this.props.itemDetail).length > 0 && (
          <ExportPdf goBack={this.showExportPdf} onClose={this.onClose}>
            {this.renderWeakForm}
          </ExportPdf>
        )
      );
    }
    return (
      <div className="Weak">
        {/* <WeakFormPdf></WeakFormPdf> */}
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default Weak;
