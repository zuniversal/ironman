import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import MonitorManageForm from '@/components/Form/MonitorManageForm'; //
import MonitorManageTable from '@/components/Table/MonitorManageTable'; //
import MonitorManageSearchForm from '@/components/Form/MonitorManageForm/MonitorManageSearchForm'; //
import MonitorManageDetailForm from '@/components/Form/MonitorManageForm/MonitorManageDetailForm'; //

import { actions, mapStateToProps } from '@/models/monitorManage'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '监测';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  monitorManageAsync: `${TITLE}详情`,
};

const detailFormMap = {
  monitorManageAsync: MonitorManageDetailForm,
};

// const mapStateToProps = ({ monitorManage, }) => monitorManage;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: MonitorManageForm,
})
class MonitorManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
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
        <Button
          type="primary"
          // onClick={() => this.props.exportData()}
        >
          Excel导入设备
        </Button>
        <Button
          type="primary"
          // onClick={() => this.props.exportData()}
        >
          导出{TITLE}设备数据
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <MonitorManageSearchForm
        formBtn={this.renderFormBtn}
        // getClientAsync={this.props.getClientAsync}
        // clientList={this.props.clientList}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        init={this.props.searchInfo}
      ></MonitorManageSearchForm>
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
    };

    return <MonitorManageTable {...tableProps}></MonitorManageTable>;
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
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
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
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return (
      <MonitorManageDetailForm {...formComProps}></MonitorManageDetailForm>
    );
    return <MonitorManageForm {...formComProps}></MonitorManageForm>;
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
    return (
      <div className="MonitorManage">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default MonitorManage;
