import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchForm from '@/common/SearchForm'; //
import OperateRecordTable from '@/components/Table/OperateRecordTable'; //
import OperateRecordForm from '@/components/Form/OperateRecordForm'; //
import OperateRecordSearchForm from '@/components/Form/OperateRecordSearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //

import { actions, mapStateToProps } from '@/models/operateRecord'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '操作记录';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ operateRecord, }) => operateRecord;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: OperateRecordForm,
})
class OperateRecord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <OperateRecordSearchForm
        formBtn={this.renderFormBtn}
        getUser={this.props.getUserAsync}
        userList={this.props.userList}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></OperateRecordSearchForm>
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

    return <OperateRecordTable {...tableProps}></OperateRecordTable>;
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
    console.log(' formComProps ： ', formComProps); //
    return <OperateRecordForm {...formComProps}></OperateRecordForm>;
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
      <div className="AlarmRecord">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default OperateRecord;
