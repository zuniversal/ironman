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
import AssetsTable from '@/components/Table/AssetsTable'; //
import AssetsDetailTable from '@/components/Table/AssetsDetailTable'; //
import AssetsForm from '@/components/Form/AssetsForm'; //
import AssetsSearchForm from '@/components/Form/AssetsSearchForm'; //
import ResultModal from '@/components/Modal/ResultModal'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import ErrorInfo from '@/components/Widgets/ErrorInfo';
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //

import { actions, mapStateToProps } from '@/models/assets'; //
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

export const TITLE = '设备';
export const DEVICE = '设备';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  uploadFile: `资产列表`,
  down: `文件下载`,
};

// const mapStateToProps = ({ assets, }) => assets;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: AssetsForm,
})
class Assets extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showResultModal: false,

      modalContent: null,

      action: '',
      title: '',
      assetsTitle: '',
      titleMap,
    };
  }

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

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button
          type="primary"
          // onClick={() => this.props.search({ keyword: params })}
          onClick={() => this.props.search(params)}
        >
          搜索
        </Button>
        <DropDownBtn menuConfig={menuConfig} menuClick={this.menuClick}>
          Excel导入
        </DropDownBtn>
        {/* <Button
          type="primary"
          htmlType="submit"
          onClick={this.props.syncOAAsync}
        >
          同步OA
        </Button> */}
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
        >
          新增{TITLE}
        </Button>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出{TITLE}数据
        </Button>
        <Button type="primary" onClick={this.onBatchRemove}>
          删除
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <AssetsSearchForm
        formBtn={this.renderFormBtn}
        getHouseNoAsync={this.props.getHouseNoAsync}
        getPowerAsync={this.props.getPowerAsync}
        getClientAsync={this.props.getClientAsync}
        clientList={this.props.clientList}
        powerList={this.props.powerList}
        houseNoList={this.props.houseNoList}
        onFieldChange={this.onFieldChange}
      ></AssetsSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };

  onRemove = params => {
    console.log(' onRemove    ： ', params);
    this.props.removeItemAsync({
      // id: `${params.record.id}`,
      d_id: `${params.record.id}`,
    });
  };
  onBatchRemove = params => {
    console.log(' onBatchRemove    ： ', params, this.state, this.props);
    this.props.onBatchRemove({
      ids: this.props.selectedRowKeys,
    });
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

      add: this.props.showFormModal,
      showFormModal: this.props.showFormModal,
    };

    return <AssetsTable {...tableProps}></AssetsTable>;
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
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };
  renderModalContent = e => {
    const { action, itemDetail } = this.props; //
    const formComProps = {
      action,
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getHouseNoAsync: params =>
        this.props.getHouseNoAsync({ keyword: params }),
      getPowerAsync: params => this.props.getPowerAsync({ keyword: params }),
      getListAsync: params => this.props.getListAsync({ keyword: params }),
      dataList: this.props.dataList,
      powerList: this.props.powerList,
      houseNoList: this.props.houseNoList,
    };
    if (action === 'detail') {
      return <AssetsDetailTable data={itemDetail}></AssetsDetailTable>;
    }
    if (action === 'uploadFile') {
      return (
        <UploadFileCom
          onChange={this.onUploadChange}
          label={this.state.titleMap[action]}
        ></UploadFileCom>
      );
    }
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <AssetsForm {...formComProps}></AssetsForm>;
  };
  get size() {
    if (this.props.action === 'uploadFile') {
      return 'small';
    }
    return 'default';
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
  componentDidMount() {
    this.props.getPowerAsync();
  }

  render() {
    console.log(
      ' %c Assets 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="Assets">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderResultModal()}
      </div>
    );
  }
}

export default Assets;
