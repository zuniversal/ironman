import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm';
import SmartFormModal from '@/common/SmartFormModal';
import IotAccountForm from '@/components/Form/IotAccountForm';
import IotAccountTable from '@/components/Table/IotAccountTable';
import ClientForm from '@/components/Form/ClientForm';
import HouseNoForm from '@/components/Form/HouseNoForm';
import PowerStationForm from '@/components/Form/PowerStationForm';
import AssetsForm from '@/components/Form/AssetsForm';
import UploadCom from '@/components/Widgets/UploadCom';

import { actions, mapStateToProps } from '@/models/iotAccount';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import RealDataImei from '@/pages/om/SmartMonitor/RealDataImei';

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
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
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
          action={'/api/v1/upload'}
          name={'file'}
          extra={'支持扩展名:xls、xlsx、csv'}
          uploadProps={{
            accept:
              'text/csv,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }}
          formItemLayout={smallLayout}
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

export default MonitorManage;
