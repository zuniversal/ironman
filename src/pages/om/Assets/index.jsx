import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import AssetsTable from '@/components/Table/AssetsTable'; //
import AssetsDetailTable from '@/components/Table/AssetsDetailTable'; //
import AssetsForm from '@/components/Form/AssetsForm'; //
import PowerStationForm from '@/components/Form/PowerStationForm'; //
import HouseNoForm from '@/components/Form/HouseNoForm';
import HouseNoSearchForm from '@/components/Form/HouseNoSearchForm'; //
import AssetsSearchForm from '@/components/Form/AssetsSearchForm'; //
import ResultModal from '@/components/Modal/ResultModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import ErrorInfo from '@/components/Widgets/ErrorInfo';
import UploadCom from '@/components/Widgets/UploadCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //

import { actions, mapStateToProps } from '@/models/assets'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

const smallLayout = {
  labelCol: {
    sm: { span: 5 }, //
  },
  wrapperCol: {
    sm: { span: 19 }, //
  },
};

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

export const TITLE = '资产';
export const DEVICE = '设备';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  uploadFile: `资产列表`,
  down: `文件下载`,
  assetsDetailAsync: `资产详情`,
  houseNoDetailAsync: `户号详情`,
  powerStationDetailAsync: `电站详情`,
};

const detailFormMap = {
  assetsDetailAsync: AssetsForm,
  houseNoDetailAsync: HouseNoForm,
  powerStationDetailAsync: PowerStationForm,
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
        {/* <Button
          type="primary"
          // onClick={() => this.props.search({ keyword: params })}
          onClick={() => this.props.search(params)}
        >
          搜索
        </Button> */}
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
        getPowerAsync={params => this.props.getPowerAsync({ name: params })}
        getClientAsync={params => this.props.getClientAsync({ name: params })}
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
    // this.props.removeItemAsync({
    //   // id: `${params.record.id}`,
    //   d_id: `${params.record.id}`,
    // });
    this.props.onRemove({
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
      searchInfo: this.props.searchInfo,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,

      add: this.props.showFormModal,
      showFormModal: this.props.showFormModal,
      showItemAsync: this.props.showItemAsync,
    };

    return <AssetsTable {...tableProps}></AssetsTable>;
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
    if (['uploadFile'].includes(action)) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      if (typeof res.file !== 'string') {
        if (res.file && res.file.fileList.length > 0) {
          const fileList = res.file.fileList;
          res.file = fileList[fileList.length - 1].response.url;
          // } else {
          //   tips('文件不能为空！', 2);
          //   return;
        }
      }
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
      getPowerAsync: params => this.props.getPowerAsync({ name: params }),
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
        <UploadCom
          label={this.state.titleMap[action]}
          action={'file'}
          isInputUpload
          contentClass={'dfc'}
          formItemCls={'assetsUpload'}
          action={'/api/v1/upload'}
          name={'file'}
          extra={'支持扩展名:xls、xlsx、csv'}
          uploadProps={{
            disabled: props.isDisabledAll || props.action === 'detail',
            accept:
              'text/csv,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }}
          formItemLayout={smallLayout}
        ></UploadCom>
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
      <div className="assets">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}

        {this.renderResultModal()}
      </div>
    );
  }
}

export default Assets;
