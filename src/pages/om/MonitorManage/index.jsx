import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchKwForm from '@/components/Form/SearchKwForm';
import SmartFormModal from '@/common/SmartFormModal';
import MonitorManageForm from '@/components/Form/MonitorManageForm';
import MonitorManageTable from '@/components/Table/MonitorManageTable';
import MonitorManageSearchForm from '@/components/Form/MonitorManageForm/MonitorManageSearchForm';
import MonitorManageDetailForm from '@/components/Form/MonitorManageForm/MonitorManageDetailForm';
import ClientForm from '@/components/Form/ClientForm';
import HouseNoForm from '@/components/Form/HouseNoForm';
import PowerStationForm from '@/components/Form/PowerStationForm';
import MonitorDeviceForm from '@/components/Form/MonitorDeviceForm';
import AssetsForm from '@/components/Form/AssetsForm';
import AlarmTemplateForm from '@/components/Form/AlarmTemplateForm';

import { actions, mapStateToProps } from '@/models/monitorManage';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import RealDataImei from '@/pages/om/SmartMonitor/RealDataImei';
import { tips } from '@/utils';

const TITLE = '监控点';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  monitorManageAsync: `${TITLE}详情`,
  getRealDataAsync: `监控数据`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  powerStationDetailAsync: `电站详情`,
  assetsDetailAsync: `设备详情`,
  monitorDeviceDetailAsync: `监控设备详情`,
  alarmTemplateDetailAsync: `监控模板详情`,
  monitorManageDetailAsync: `监控点详情`,
};

const detailFormMap = {
  monitorManageDetailAsync: MonitorManageForm,
  alarmTemplateDetailAsync: AlarmTemplateForm,
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
        {/* <Button
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
        </Button> */}
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

      getRealDataAsync: this.props.getRealDataAsync,
    };

    return <MonitorManageTable {...tableProps}></MonitorManageTable>;
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
            showItemAsync={this.props.showItemAsync}
          ></DetailForm>
        )}
      </SmartFormModal>
    );
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    if (['getRealDataAsync'].includes(action)) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      console.log(
        '  对吗  res.phone_list.length ',
        res.phone_list,
        !!res.phone_list?.length,
        res.phone_list?.length,
      );
      let isLength11 = false;
      let isNumber = false;
      if (!!res.phone_list?.length) {
        res.phone_list.some(v => {
          if (`${v}`.length !== 11) {
            isLength11 = true;
          }
          if (isNaN(v)) {
            isNumber = true;
          }
        });
      }
      if (isNumber) {
        tips('手机号必须是数字！', 2);
        return;
      }
      if (isLength11) {
        tips('手机号必须是11位！', 2);
        return;
      }

      res.phone_list = !!res.phone_list?.length
        ? res.phone_list.join(',')
        : null;

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
      console.log(' error ： ', error);
    }
  };

  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
      init: this.props.itemDetail,
      showItemAsync: this.props.showItemAsync,
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
    if (action === 'getRealDataAsync') {
      const paramProps = {
        // number,
        // stationId,
        // point,
        // startTime: date[0] ? `${date[0].format('YYYY-MM-DD')} 00:00:00` : null,
        // endTime: date[1] ? `${date[1].format('YYYY-MM-DD')} 23:59:59` : null,
      };
      return <RealDataImei {...this.props.realDataParams}></RealDataImei>;
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
