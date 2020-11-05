import React, { Component, PureComponent } from 'react';
import './style.less';

import {
  Form,
  Input,
  Button,
  Checkbox,
  Menu,
  Upload,
  Result,
  Typography,
  Divider,
} from 'antd';

import SmartModal from '@/common/SmartModal'; //
import SearchForm from '@/common/SearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import WeakForm from '@/components/Form/WeakForm'; //
import WeakSearchForm from '@/components/Form/WeakSearchForm'; //
import WeakDetailForm from '@/components/Form/WeakDetailForm'; //
import WeakTable from '@/components/Table/WeakTable'; //
import ResultModal, { ErrorInfo } from '@/components/Modal/ResultModal'; //

import { actions, mapStateToProps } from '@/models/weak'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '缺陷';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}单`,
  upload: `文件上传`,
  down: `文件下载`,
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
    };
  }

  renderFormBtn = params => {
    console.log(' renderFormBtn ： ', params); //
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
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
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <WeakSearchForm
      // formBtn={this.renderFormBtn}
      // onSubmit={this.onSubmit}
      // onFail={this.onFail}
      ></WeakSearchForm>
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

    return <WeakTable {...tableProps}></WeakTable>;
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
      if (action === 'inspectReport') {
        this.props.inspectReportAsync({
          ...itemDetail,
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
    // if (action === 'inspectReport') {
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
    console.log(
      ' %c Weak 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //

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
