import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import MonitorManageForm from '@/components/Form/MonitorManageForm'; //
import MonitorManageTable from '@/components/Table/MonitorManageTable'; //
import MonitorManageSearchForm from '@/components/Form/MonitorManageForm/MonitorManageSearchForm'; //
import MonitorManageDetailForm from '@/components/Form/MonitorManageForm/MonitorManageDetailForm'; //
import ClientForm from '@/components/Form/ClientForm';
import HouseNoForm from '@/components/Form/HouseNoForm';
import PowerStationForm from '@/components/Form/PowerStationForm'; //
import MonitorDeviceForm from '@/components/Form/MonitorDeviceForm'; //
import AssetsForm from '@/components/Form/AssetsForm'; //

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
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  powerStationDetailAsync: `电站详情`,
  assetsDetailAsync: `设备详情`,
  monitorDeviceDetailAsync: `监测设备详情`,
};

const detailFormMap = {
  monitorManageAsync: MonitorManageDetailForm,
  clientDetailAsync: ClientForm,
  houseNoDetailAsync: HouseNoForm,
  powerStationDetailAsync: PowerStationForm,
  assetsDetailAsync: AssetsForm,
  monitorDeviceDetailAsync: MonitorDeviceForm,
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
  // renderSearchForm = params => {
  //   return (
  //     <MonitorManageSearchForm
  //       formBtn={this.renderFormBtn}
  //       // getClientAsync={this.props.getClientAsync}
  //       // clientList={this.props.clientList}
  //       init={this.props.searchInfo}
  //       onFieldChange={this.onFieldChange}
  //       init={this.props.searchInfo}
  //     ></MonitorManageSearchForm>
  //   );
  // };
  renderSearchForm = params => {
    return (
      <SearchKwForm
        formBtn={this.renderFormBtn}
        className={'fje'}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        // label={'检测点、客户、户号、电站、设备'}
        label={'关键字'}
        keyword={'keyword'}
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

    return <MonitorManageTable {...tableProps}></MonitorManageTable>;
  };

  onRemove = params => {
    console.log(' onRemove    ： ', params);
    // this.props.removeItemAsync({ d_id: `${params.record.id}` });
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
          id: itemDetail.id,
          d_id: itemDetail.id,
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
      init: this.props.itemDetail,
    };
    // if (action !== 'add') {
    //   formComProps.init = this.props.itemDetail;
    // }
    console.log(' formComProps ： ', formComProps); //
    if (action === 'detail') {
      return (
        <MonitorManageDetailForm {...formComProps}></MonitorManageDetailForm>
      );
    }
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
    // return <MonitorManageForm ></MonitorManageForm>;
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
