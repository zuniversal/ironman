import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import PowerStationTable from '@/components/Table/PowerStationTable'; //
import PowerStationForm from '@/components/Form/PowerStationForm'; //
import PowerStationSearchForm from '@/components/Form/PowerStationSearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //

import { commonActions } from '@/models/common'; //
import { actions, mapStateToProps } from '@/models/powerStation'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';
import { PowerStationDetailTable } from '@/components/Table/PowerStationInfoTable';
import HouseNoForm from '@/components/Form/HouseNoForm';
import ClientForm from '@/components/Form/ClientForm';

const TITLE = '电站';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  powerStationDetailAsync: `电站详情`,
  inspectDetailAsync: `巡检详情`,
};

const detailFormMap = {
  clientDetailAsync: ClientForm,
  houseNoDetailAsync: HouseNoForm,
  powerStationDetailAsync: PowerStationForm,
  // inspectDetailAsync: ,
};

// const mapStateToProps = ({ powerStation, common }) => ({
//   ...powerStation,
//   common,
// });

@connect(mapStateToProps)
@SmartHOC({
  // actions: {
  //   ...actions,
  //   // ...commonActions,
  // },
  actions,
  titleMap,
  modalForm: PowerStationForm,
})
class PowerStation extends PureComponent {
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
          htmlType="submit"
          onClick={this.props.syncOAAsync}
        >
          同步OA
        </Button> */}
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出Excel
        </Button>
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
      <PowerStationSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        getClientAsync={params => this.props.getClientAsync({ name: params })}
        clientList={this.props.clientList}
        getPowerAsync={params =>
          this.props.getPowerAsync({ name: params, type: '搜索' })
        }
        powerList={this.props.powerList}
        getDistrictAsync={this.props.getDistrictAsync}
        provinceList={this.props.provinceList}
        citytList={this.props.citytList}
        countryList={this.props.countryList}
      ></PowerStationSearchForm>
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
      console.log(' onFieldChange 清空 province ： '); //
      const resetParams = {
        city: null,
        area: null,
      };
      form.setFieldsValue(resetParams);
      const { city, area, ...data } = params.formData;
      console.log(' onFieldChange 搜索 province ： ', params.value.province); //
      this.props.getDistrictAsync(data);
      // this.props.getDistrictAsync({province: params.value.province});
      this.props.getListAsync({ ...params.formData, ...resetParams });
      return;
    }
    if (params.value.city) {
      console.log(' onFieldChange 清空 city ： '); //
      const resetParams = {
        area: null,
      };
      form.setFieldsValue(resetParams);
      const { area, ...data } = params.formData;
      console.log(' onFieldChange 搜索 city ： ', params.value.city); //
      this.props.getDistrictAsync(data);
      // this.props.getDistrictAsync({city: params.value.city});
      this.props.getListAsync({ ...params.formData, ...resetParams });
      return;
    }
    console.log(' onFieldChange 列表搜索 ： '); //
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

    return <PowerStationTable {...tableProps}></PowerStationTable>;
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
    const { action, itemDetail, d_id } = this.props; //
    const { form, init } = props; //
    // if (action === 'add') {
    //   this.props.addItemAsync({
    //   });
    // }
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
      console.log('  res await 结果  ：', res, action); //
      if (typeof res.file !== 'string') {
        if (res.file && res.file.fileList.length > 0) {
          const fileList = res.file.fileList;
          res.file = fileList[fileList.length - 1].response.url;
        } else {
          tips('文件不能为空！', 2);
          return;
        }
      }

      const params = {
        ...init,
        ...res,
      };
      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          // ...itemDetail,
          ...res,
          id: d_id,
          d_id,
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
      getHouseNoAsync: params =>
        this.props.getHouseNoAsync({ keyword: params }),
      houseNoList: this.props.houseNoList,
      // editPowerInfo: this.props.editPowerInfo,
      // addPowerInfoAsync: this.props.addPowerInfoAsync,
      // editPowerInfo: this.props.editPowerInfo,
      // dataSource: this.props.powerInfoData,
      // removePowerInfoAsync: this.props.removePowerInfoAsync,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    const powerTable = (
      <PowerStationDetailTable
        addPowerInfoAsync={this.props.addPowerInfoAsync}
        editPowerInfoAsync={this.props.editPowerInfoAsync}
        removePowerInfoAsync={this.props.removePowerInfoAsync}
        modifyPowerInfo={this.props.modifyPowerInfo}
        dataSource={this.props.powerInfoData}
        init={this.props.itemDetail}
      ></PowerStationDetailTable>
    );
    return (
      <PowerStationForm
        {...formComProps}
        addPowerInfoAsync={this.props.addPowerInfoAsync}
        editPowerInfoAsync={this.props.editPowerInfoAsync}
        removePowerInfoAsync={this.props.removePowerInfoAsync}
        modifyPowerInfo={this.props.modifyPowerInfo}
        powerInfoData={this.props.powerInfoData}
        init={this.props.itemDetail}
        // extra={powerTable}
      ></PowerStationForm>
    );
  };
  get size() {
    return ['removeStation'].some(v => v === this.props.action)
      ? 'small'
      : 'default';
  }
  get isNoForm() {
    return ['removeStation'].some(v => v === this.props.action);
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
        isNoForm={this.isNoForm}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };
  componentDidMount() {
    // this.props.getBelongHouseNoAsync();
    this.props.getPowerAsync();
    this.props.getClientAsync();
    this.props.getHouseNoAsync();
    this.props.getDistrictAsync({});
    // this.props.showItemAsync({
    //   action: 'clientDetailAsync',
    //   d_id: 1,
    // })
    // this.props.showFormModal({
    //   action: 'add',
    // })
    // this.props.addPowerInfoAsync();
    // this.props.addItemAsync(datas);
    // this.props.addItemAsync({});
  }

  render() {
    // return <PowerStationDetailTable
    //   addPowerInfoAsync={this.props.addPowerInfoAsync}
    //   editPowerInfoAsync={this.props.editPowerInfoAsync}
    //   removePowerInfoAsync={this.props.removePowerInfoAsync}
    //   modifyPowerInfo={this.props.modifyPowerInfo}
    //   dataSource={this.props.powerInfoData}
    // ></PowerStationDetailTable>
    console.log(
      ' %c PowerStation 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //
    return (
      <div className="PowerStation">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default PowerStation;
