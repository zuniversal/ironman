import React, { Component, PureComponent } from 'react';
import './style.less';

import { Form, Input, Button, Checkbox, Menu, Upload, Radio } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import SearchForm from '@/common/SearchForm'; //
import VisitManageWaitTable from '@/components/Table/VisitManageWaitTable'; //
import VisitManageRecordTable from '@/components/Table/VisitManageRecordTable'; //
import VisitManageForm from '@/components/Form/VisitManageForm'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //

import { actions, mapStateToProps } from '@/models/visitManage'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const visitManageOptions = [
  { label: '待回访', value: 'waitVisible' },
  { label: '回访记录', value: 'visitRecord' },
];

const TITLE = '回访';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  complete: `文件下载`,
};

// const mapStateToProps = ({ VisitManage, }) => VisitManage;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: VisitManageForm,
})
class VisitManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }
  renderFormBtn = params => {
    return <div className={'btnWrapper'}></div>;
  };
  renderSearchForm = params => {
    return (
      <div>
        <Radio.Group
          options={visitManageOptions}
          onChange={this.props.onRadioChange}
          value={this.props.chenckItem}
          optionType="button"
        />
        {/* <ShiftsManageSearchForm
          formBtn={this.renderFormBtn}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        ></ShiftsManageSearchForm> */}
      </div>
    );
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

    return <VisitManageWaitTable {...tableProps}></VisitManageWaitTable>;
    return <VisitManageRecordTable {...tableProps}></VisitManageRecordTable>;
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
      getClientAsync: params => this.props.getClientAsync({ keyword: params }),
      clientList: this.props.clientList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <VisitManageForm {...formComProps}></VisitManageForm>;
  };
  get size() {
    return ['complete'].some(v => v === this.props.action)
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

  render() {
    return (
      <div className="VisitManage">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default VisitManage;
