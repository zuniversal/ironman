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

import SearchForm from '@/common/SearchForm'; //
import ContractTable from '@/components/Table/ContractTable'; //
import ContractForm from '@/components/Form/ContractForm'; //
import ContractSearchForm from '@/components/Form/ContractSearchForm'; //
import ResultModal from '@/components/Modal/ResultModal'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import ErrorInfo from '@/components/Widgets/ErrorInfo';
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //
import ContractStepForm from '@/components/Form/ContractStepForm'; //

import { actions, mapStateToProps } from '@/models/contract'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const menuConfig = [
  {
    key: 'upload',
    clickFn: 'showUploadModal',
    action: 'uploadFile',
    text: '上传文件',
  },
  {
    key: 'down',
    // clickFn: 'showResultModal',
    clickFn: 'downloadFile',
    action: 'down',
    text: '下载数据模板',
    downFile: 'OMS/equipment/getTemplate',
  },
];

export const TITLE = '合同';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ contract, }) => contract;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: ContractForm,
})
class Contract extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }
  addUserAsync = async props => {
    console.log(' addUserAsync,  , ： ', props);
    const { propsForm, init } = props; //
    try {
      const res = await propsForm.validateFields();
      console.log('  res await 结果  ：', res); //
      // this.props.addUserAsync({
      //   ...res,
      // });
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };
  showResultModal = e => {
    console.log('    showResultModal ： ', e);
    this.setState({
      showResultModal: true,
    });
  };
  onResultModalCancel = e => {
    console.log('    onResultModalCancel ： ', e);
    this.setState({
      showResultModal: false,
    });
  };

  onUploadChange = params => {
    console.log(' onUploadChange,  , ： ', params);
    if (params.file.status === 'done') {
      setTimeout(() => {
        console.log('  延时器 ： ');
        this.setState({
          modalContent: <SuccResult></SuccResult>,
        });
      }, 2000);
    }
  };
  downloadFile = params => {
    console.log('    downloadFile ： ', params);
    this.props.downloadFile();
  };

  menuClick = params => {
    const { key, clickFn, action } = params;
    console.log(' menuClick,  , ： ', params, this.state.titleMap, params.key);
    if (action === 'uploadFile') {
      this.props.showFormModal(params);
      return;
    }
    if (clickFn) {
      this[clickFn](params);
      return;
    }
  };
  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <div className={'fsb '}>
        <SearchForm></SearchForm>
        {/* <div className={'btnWrapper'}>
          <DropDownBtn menuConfig={menuConfig} menuClick={this.menuClick}>
            Excel导入
          </DropDownBtn>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.props.syncOAAsync}
          >
            同步OA
          </Button>
          <Button
            type="primary"
            onClick={() => this.props.showFormModal({ action: 'add' })}
          >
            新增{TITLE}
          </Button>
          <Button type="primary" onClick={() => this.props.exportData()}>
            导出{TITLE}数据
          </Button>
          <Button type="primary" onClick={() => this.props.onBatchRemove()}>
            删除
          </Button>
        </div> */}
      </div>
    );
  };

  renderResultModal = params => {
    console.log(' renderResultModal ： ', params, this.state, this.props);
    const { show, title, action, titleMap, showResultModal } = this.state; //

    const modalProps = {
      title: title,
      show: showResultModal,
      onOk: this.onResultModalOk,
      onCancel: this.onResultModalCancel,
    };
    const resProps = {
      status: 'error',
      title: '导入失败',
      subTitle: '请核对并修改以下信息后，再重新提交。',
      // extra: [
      //   <Button  key="console" >返回列表</Button>,
      // ],
      // children: <ErrorInfo></ErrorInfo>,
    };

    return (
      <ResultModal modalProps={modalProps} resProps={resProps}>
        <ErrorInfo></ErrorInfo>
      </ResultModal>
    );
  };

  onModalOk = async props => {
    console.log(' onModalOk,  , ： ', props);
    const { modalAction, itemDetail } = this.props; //
    const { form, init } = props; //
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, modalAction); //
      if (modalAction === 'add') {
        this.props.addItemAsync({
          ...res,
        });
      }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };
  renderContent = e => {
    console.log('    renderContent ： ', e, this.state, this.props);
    const { modalAction } = this.props; //
    const formComProps = {
      modalAction,
      getUserAsync: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      addUserAsync: this.addUserAsync,
    };
    if (modalAction !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <ContractStepForm {...formComProps}></ContractStepForm>;
  };
  renderFormModal = params => {
    console.log(' renderFormModal ： ', params, this.state, this.props);
    return (
      <SmartFormModal
        show={this.props.isShowFormModal}
        action={this.props.modalAction}
        titleMap={this.state.titleMap}
        onOk={this.onModalOk}
        onCancel={this.props.onModalCancel}
      >
        {this.renderContent()}
      </SmartFormModal>
    );
  };

  renderTable = params => {
    console.log(' renderTable ： ', params, this.state, this.props);
    const tableProps = {
      onSelectChange: this.props.onSelectChange,
      dataSource: this.props.dataList,
      count: this.props.count,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,

      add: this.props.showFormModal,
      showFormModal: this.props.showFormModal,
      exportData: this.props.exportData,
    };

    return <ContractTable {...tableProps}></ContractTable>;
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
          ...itemDetail,
          ...res,
        });
      }
      if (action === 'detail') {
        this.props.detailAsync({
          ...res,
        });
      }
      if (action === 'uploadFile') {
        this.props.onCancel();
      }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };
  renderModalContent = e => {
    console.log('    renderModalContent ： ', e, this.state, this.props);
    const { action } = this.props; //
    const formComProps = {
      action,
      getUserAsync: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'detail') {
      return <ContractForm {...formComProps}></ContractForm>;
    }
    if (action === 'uploadFile') {
      return (
        <UploadFileCom
          onChange={this.onUploadChange}
          label={this.state.titleMap[action]}
        ></UploadFileCom>
      );
    }

    console.log(' formComProps ： ', formComProps); //
    return (
      <>
        <div className={'fje'}>
          {/* <Button
            type="primary "
            onClick={() => this.props.showModal({ action: 'newRelated' })}
          >
            关联新增
          </Button> */}
        </div>
        <ContractForm {...formComProps}></ContractForm>
      </>
    );
  };
  renderSmartFormModal = params => {
    console.log(' renderSmartFormModal ： ', params, this.state, this.props);
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

  componentDidMount() {
    console.log(
      ' Contract 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    // this.showRelativeForm({action: 'edit',  });
  }

  render() {
    console.log(
      ' %c Contract 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="Contract">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderFormModal()}

        {this.renderResultModal()}
      </div>
    );
  }
}

export default Contract;
