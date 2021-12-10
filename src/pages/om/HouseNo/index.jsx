import React, { PureComponent } from 'react';
import { Button } from 'antd';
import HouseNoTable from '@/components/Table/HouseNoTable';
import PowerStationForm from '@/components/Form/PowerStationForm';
import HouseNoForm from '@/components/Form/HouseNoForm';
import ClientForm from '@/components/Form/ClientForm';
import HouseNoSearchForm from '@/components/Form/HouseNoSearchForm';
import SmartFormModal from '@/common/SmartFormModal';
import DropDownBtn from '@/common/DropDownBtn';
import UploadFileCom from '@/components/Widgets/UploadFileCom';
import SuccResult from '@/components/Widgets/SuccResult';

import { actions, mapStateToProps } from '@/models/houseNo';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

const menuConfig = [
  {
    key: 'upload',
    clickFn: 'showUploadModal',
    action: 'uploadFile',
    text: '上传文件',
  },
  {
    key: 'down',
    clickFn: 'downloadFile',
    action: 'down',
    text: '下载数据模板',
  },
];

const TITLE = '户号';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  powerStationDetailAsync: `电站详情`,
};

const detailFormMap = {
  clientDetailAsync: ClientForm,
  houseNoDetailAsync: HouseNoForm,
  powerStationDetailAsync: PowerStationForm,
};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: HouseNoForm,
})
class HouseNo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

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
  showUploadModal = params => {
    console.log('    showUploadModal ： ', params);
    //   const {item,  } = this.props//
    const { action } = params;

    this.setState({
      show: true,
      action,
      modalContent: (
        <UploadFileCom
          onChange={this.onUploadChange}
          label={titleMap[action]}
        ></UploadFileCom>
      ),
    });
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
        {/* <DropDownBtn menuConfig={menuConfig} menuClick={this.menuClick}>
          Excel导入
        </DropDownBtn> */}
        {/* <Button
          type="primary"
          // onClick={() => this.props.showUploadModal({ action: 'uploadFile' })}
          onClick={() => tips('暂未开发！')}
        >
          Excel导入
        </Button> */}
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
          disabled={this.props.authInfo.create !== true}
        >
          新增{TITLE}
        </Button>
        {/* <Button type="primary" onClick={() => this.props.exportData()}>
          导出Excel
        </Button> */}
        {/* <Button type="primary" onClick={() => this.props.onBatchRemove()}> */}
        <Button
          type="primary"
          disabled={this.props.authInfo.delete !== true}
          onClick={this.onBatchRemove}
        >
          删除
        </Button>
      </div>
    );
  };

  renderSearchForm = params => {
    return (
      <HouseNoSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        getClientAsync={params => this.props.getClientAsync({ name: params })}
        clientList={this.props.clientList}
        getListAsync={params => this.props.getListAsync({ keyword: params })}
        dataList={this.props.dataList}
        provinceList={this.props.provinceList}
        citytList={this.props.citytList}
        countryList={this.props.countryList}
        getHouseNoAsync={params =>
          this.props.getHouseNoAsync({ number: params })
        }
        houseNoList={this.props.houseNoList}
      ></HouseNoSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(
      ' onFieldChange,  , ： ',
      params,
      params.value,
      params.formData,
      this.props,
    );
    const { form } = params;
    if (params.value.province) {
      console.log(' onFieldChange 清空 province ： ');
      const resetParams = {
        city: null,
        area: null,
      };
      form.setFieldsValue(resetParams);
      const { city, area, ...data } = params.formData;
      console.log(' onFieldChange 搜索 province ： ', params.value.province);
      this.props.getDistrictAsync(data);
      // this.props.getDistrictAsync({province: params.value.province});
      this.props.getListAsync({ ...params.formData, ...resetParams });
      return;
    }
    if (params.value.city) {
      console.log(' onFieldChange 清空 city ： ');
      const resetParams = {
        area: null,
      };
      form.setFieldsValue(resetParams);
      const { area, ...data } = params.formData;
      console.log(' onFieldChange 搜索 city ： ', params.value.city);
      this.props.getDistrictAsync(data);
      // this.props.getDistrictAsync({city: params.value.city});
      this.props.getListAsync({ ...params.formData, ...resetParams });
      return;
    }
    console.log(' onFieldChange 列表搜索 ： ');
    this.props.getListAsync({ ...params.formData, page: 1 });
  };

  onRemove = params => {
    console.log(' onRemove    ： ', params);
    this.props.onRemove({
      id: `${params.record.id}`,
      d_id: `${params.record.id}`,
    });
  };
  onBatchRemove = params => {
    console.log(' onBatchRemove    ： ', params, this.state, this.props);
    this.props.onBatchRemove({
      id: `${this.props.selectedRowKeys.join(',')}`,
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
    };

    return <HouseNoTable {...tableProps}></HouseNoTable>;
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
    const { form, d_id } = props;
    if (['detail'].includes(action)) {
      this.props.onCancel({});
      return;
    }
    if (action === 'removeAsync') {
      this.props.removeAsync({});
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
      if (action === 'edit') {
        this.props.editItemAsync({
          ...res,
          d_id: itemDetail.id,
          id: itemDetail.id,
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
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ name: params }),
      clientList: this.props.clientList,
      getListAsync: params => this.props.getListAsync({ keyword: params }),
      dataList: this.props.dataList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'uploadFile') {
      return (
        <UploadFileCom
          onChange={this.onUploadChange}
          label={this.state.titleMap[action]}
        ></UploadFileCom>
      );
    }
    console.log(' formComProps ： ', formComProps);
    return <HouseNoForm {...formComProps}></HouseNoForm>;
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
  componentDidMount() {
    this.props.getUserAsync();
    this.props.getClientAsync();
    this.props.getListAsync();
    this.props.getDistrictAsync({});
    this.props.getHouseNoAsync({});
  }

  render() {
    console.log(
      ' %c HouseNo 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="HouseNo">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default HouseNo;
