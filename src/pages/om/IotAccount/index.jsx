import React, { PureComponent } from 'react';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm';
import SmartFormModal from '@/common/SmartFormModal';
import IotAccountSearchForm from '@/components/Form/IotAccountSearchForm';
import IotAccountForm from '@/components/Form/IotAccountForm';
import IotAccountTable from '@/components/Table/IotAccountTable';
import ClientForm from '@/components/Form/ClientForm';
import HouseNoForm from '@/components/Form/HouseNoForm';
import PowerStationForm from '@/components/Form/PowerStationForm';
import MonitorDeviceForm from '@/components/Form/MonitorDeviceForm';
import AssetsForm from '@/components/Form/AssetsForm';
import UploadCom from '@/components/Widgets/UploadCom';

import { actions, mapStateToProps } from '@/models/iotAccount';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { SIM_XLSX } from '@/constants';
import { downLoad } from '@/utils';

const TITLE = '物联网卡';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  uploadFile: `文件上传`,
  monitorManageAsync: `${TITLE}详情`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  powerStationDetailAsync: `电站详情`,
  assetsDetailAsync: `设备详情`,
  getMonitorDeviceDetailAsync: `监控设备详情`,
};

const detailFormMap = {
  // monitorManageAsync: MonitorManageDetailForm,
  clientDetailAsync: ClientForm,
  houseNoDetailAsync: HouseNoForm,
  powerStationDetailAsync: PowerStationForm,
  assetsDetailAsync: AssetsForm,
};

// const mapStateToProps = ({ monitorManage, }) => monitorManage;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class IotAccount extends PureComponent {
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
          // disabled={this.props.authInfo.create !== true}
        >
          新增{TITLE}
        </Button>
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'uploadFile' })}
        >
          Excel导入
        </Button>
        <Button
          type="primary"
          onClick={() => downLoad(SIM_XLSX, { name: 'SIM卡模板' })}
        >
          下载模板
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <SearchKwForm
        formBtn={this.renderFormBtn}
        className={'fje'}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        label={'关键字'}
        keyword={'keyword'}
        noLabel
      ></SearchKwForm>
    );
  };
  renderSearchForm = params => {
    return (
      <IotAccountSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></IotAccountSearchForm>
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
      showItemAsync: this.props.showItemAsync,

      getMonitorDeviceDetailAsync: this.props.getMonitorDeviceDetailAsync,
    };

    return <IotAccountTable {...tableProps}></IotAccountTable>;
  };

  onRemove = params => {
    console.log(' onRemove    ： ', params);
    this.props.onRemove({
      d_id: `${params.record.id}`,
    });
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
    const { form, init } = props;
    if (['uploadFile', 'getMonitorDeviceDetailAsync'].includes(action)) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      // if (action === 'uploadFile') {
      // }
      const params = {
        ...res,
        start_time: res.start_time
          ? res.start_time.format('YYYY-MM-DD HH:mm:ss')
          : null,
      };
      if (action === 'add') {
        this.props.addItemAsync({
          ...params,
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...params,
          d_id: itemDetail.id,
        });
      }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };
  succ = params => {
    console.log(' succ,  , ： ', params);
  };
  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
      init: this.props.itemDetail,
    };
    // if (action !== 'add') {
    //   formComProps.init = this.props.itemDetail;
    // }
    console.log(' formComProps ： ', formComProps, this.props);
    if (action === 'detail') {
      return (
        <MonitorManageDetailForm {...formComProps}></MonitorManageDetailForm>
      );
    }
    if (action === 'getMonitorDeviceDetailAsync') {
      formComProps.action = 'detail';
      return <MonitorDeviceForm {...formComProps}></MonitorDeviceForm>;
    }
    if (action === 'uploadFile') {
      const smallLayout = {
        labelCol: {
          sm: { span: 5 }, //
        },
        wrapperCol: {
          sm: { span: 19 }, //
        },
      };
      return (
        <UploadCom
          label={this.state.titleMap[action]}
          action={'file'}
          isInputUpload
          contentClass={'dfc'}
          formItemCls={'assetsUpload'}
          action={'/api/v1/console/sim_card/import'}
          name={'file'}
          extra={'支持扩展名:xls、xlsx、csv'}
          uploadProps={{
            accept:
              'text/csv,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }}
          formItemLayout={smallLayout}
          succ={this.succ}
        ></UploadCom>
      );
    }
    return <IotAccountForm {...formComProps}></IotAccountForm>;
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

  render() {
    return (
      <div className="iotAccount">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default IotAccount;
