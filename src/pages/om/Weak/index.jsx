import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
import WeakForm from '@/components/Form/WeakForm'; //
import WeakSearchForm from '@/components/Form/WeakSearchForm'; //
import WeakTable from '@/components/Table/WeakTable'; //
import ExportPdf from '@/components/Pdf/ExportPdf'; //

import { actions, mapStateToProps } from '@/models/weak'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '缺陷';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}单`,
  upload: `文件上传`,
  handleWeak: `缺陷单`,
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
        >
          新增{TITLE}
        </Button>
        {/* <Button type="primary" onClick={() => this.props.onBatchRemove()}>
        删除
      </Button> */}
      </div>
    );
  };
  renderSearchForm = params => {
    return <WeakSearchForm onFieldChange={this.onFieldChange}></WeakSearchForm>;
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
      searchInfo: this.props.searchInfo,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
      handleWeakAsync: this.props.handleWeakAsync,
      exportDataAsync: this.props.exportDataAsync,
      showExportPdf: this.showExportPdf,
    };

    return <WeakTable {...tableProps}></WeakTable>;
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
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    if (action === 'handleWeak' || action === 'detail') {
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
      formComProps.init = this.props.itemDetail;
    }
    // if (action === 'handleWeak') {
    //   return <InspectMissionDetailForm {...formComProps} ></InspectMissionDetailForm>
    // }
    console.log(' formComProps ： ', formComProps); //
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
      console.log(' 111111111 ： ', this.props.itemDetail); //
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
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default Weak;
