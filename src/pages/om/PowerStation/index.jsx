import React, { PureComponent } from 'react';
import { Button } from 'antd';
import PowerStationTable from '@/components/Table/PowerStationTable';
import PowerStationForm from '@/components/Form/PowerStationForm';
import PowerStationSearchForm from '@/components/Form/PowerStationSearchForm';
import SmartFormModal from '@/common/SmartFormModal';
import { PowerstationMonthForm } from '@/components/Form/PowerStationActionForm';

import { actions, mapStateToProps } from '@/models/powerStation';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';
import HouseNoForm from '@/components/Form/HouseNoForm';
import ClientForm from '@/components/Form/ClientForm';
import PowerNumberForm from '@/components/Form/PowerNumberForm';
import OutlineForm from '@/components/Form/OutlineForm';

const TITLE = '电站';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  exportDutyData: `导出巡检报告`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
  powerStationDetailAsync: `电站详情`,
  inspectDetailAsync: `巡检详情`,

  powerNumberForm: `电源编号`,
  outlineForm: `出线侧`,
  addPowerNumberAsync: '电源编号',
  editPowerNumberAsync: '电源编号',
  addOutlineAsync: `出线侧`,
  editOutlineAsync: `出线侧`,
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
      <PowerStationSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        // getClientAsync={params => this.props.getClientAsync({ name: params })}
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
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail, d_id } = this.props;
    const { form, init } = props;
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
      console.log('  res await 结果  ：', res, action);
      if (action === 'exportDutyData') {
        this.props.exportData({
          reqMethod: 'exportDutyDataAsync',
          // type: 'month',
          station_id: this.props.d_id,
          year_month: res.month.format('YYYY-MM'),
        });
        return;
      }

      if (typeof res.file !== 'string') {
        if (res.file && res.file.fileList.length > 0) {
          const fileList = res.file.fileList;
          res.file = fileList[fileList.length - 1].response.url;
        } else {
          // tips('文件不能为空！', 2);
          // return;
          res.file = '';
        }
      }

      const params = {
        ...res,
        end_time: res.end_time ? res.end_time.format('YYYY-MM-DD') : null,
      };
      if (res.inspection_type === 1) {
        params.service_team = res.service_team.join(',');
      }

      if (action === 'add') {
        this.props.addItemAsync({
          ...params,
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...params,
          id: d_id,
          d_id,
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
      // getClientAsync: params => this.props.getClientAsync({ name: params }),
      clientList: this.props.clientList,
      getHouseNoAsync: params => this.props.getHouseNoAsync({ number: params }),
      houseNoList: this.props.houseNoList,
      getTeamAsync: params => this.props.getTeamAsync({ name: params }),
      teamList: this.props.teamList,
      showFormModal2: this.props.showFormModal2,
      removeOutlineAsync: this.props.removeOutlineAsync,
      // editPowerInfo: this.props.editPowerInfo,
      // addPowerInfoAsync: this.props.addPowerInfoAsync,
      // editPowerInfo: this.props.editPowerInfo,
      // dataSource: this.props.powerInfoData,
      // removePowerInfoAsync: this.props.removePowerInfoAsync,
    };

    const powerNumberFormProps = {};
    const outlineFormProps = {};

    if (action === 'exportDutyData') {
      return <PowerstationMonthForm></PowerstationMonthForm>;
    }
    if (action === 'powerNumberForm') {
      return <PowerNumberForm {...powerNumberFormProps}></PowerNumberForm>;
    }
    if (action === 'outlineForm') {
      return <OutlineForm {...outlineFormProps}></OutlineForm>;
    }

    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps);
    return (
      <PowerStationForm
        {...formComProps}
        addPowerInfoAsync={this.props.addPowerInfoAsync}
        editPowerInfoAsync={this.props.editPowerInfoAsync}
        removePowerInfoAsync={this.props.removePowerInfoAsync}
        powerInfoData={this.props.powerInfoData}
        outLineTableData={this.props.outLineTableData}

        // modifyPowerInfo={this.props.modifyPowerInfo}
        // getPowerInfoAsync={this.getPowerInfoAsync}
        // powerInfoList={this.props.powerInfoList}
        // addOutLineTableItemAsync={this.props.addOutLineTableItemAsync}
        // editOutLineTableItemAsync={this.props.editOutLineTableItemAsync}
        // removeOutLineTableItemAsync={this.props.removeOutLineTableItemAsync}
        // modifyOutLineTableItem={this.props.modifyOutLineTableItem}
        // removeCircuitItemAsync={this.removeCircuitItemAsync}
      ></PowerStationForm>
    );
  };
  // removeCircuitItemAsync = params => {
  //   console.log(
  //     ' removeCircuitItemAsync ： ',
  //     params,
  //     this.props,
  //     this.props.location.query.powerstation_id,
  //   );
  //   this.props.removeCircuitItemAsync({
  //     power_station_id: this.props.location.query.powerstation_id,
  //     circuit_id: params.circuit_id,
  //   });
  // };
  // getPowerInfoAsync = params =>
  //   this.props.getPowerInfoAsync({ power_number: params });
  get size() {
    return ['removeStation', 'exportDutyData'].some(
      v => v === this.props.action,
    )
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

  onOk2 = async props => {
    console.log(' onOk2 ： ', props, this.state, this.props);
    const { action2, record } = this.props;
    const { form } = props;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action2);
      if (action2 === 'addPowerNumberAsync') {
        const { itemDetail } = this.props;
        const params = {
          ...record,
          ...res,
          powerstation: itemDetail.id,
          // powerstation: itemDetail.id,
        };
        console.log(' params ： ', params); //
        this.props.addPowerInfoAsync(params);
      }
      if (action2 === 'editPowerNumberAsync') {
        const { itemDetail } = this.props;
        const params = {
          ...record,
          ...res,
          powerstation: itemDetail.id,
          // powerstation: itemDetail.id,
        };
        console.log(' params ： ', params); //
        this.props.editPowerInfoAsync(params);
      }
      if (action2 === 'addOutlineAsync') {
        const { itemDetail } = this.props;
        const params = {
          outline_list: [
            {
              ...res,
              powerstation: itemDetail.id,
            },
          ],
        };
        console.log(' params ： ', params); //
        this.props.addOutlineAsync(params);
      }
      if (action2 === 'editOutlineAsync') {
        const { itemDetail } = this.props;
        const params = {
          ...res,
          d_id: res.id,
          powerstation: record.id,
        };
        console.log(' params ： ', params); //
        this.props.editOutlineAsync(params);
      }
      // if (action2 === 'edit') {
      //   this.props.editItemAsync({
      //     ...params,
      //   });
      // }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };
  renderModalContent2 = e => {
    const { action2 } = this.props;
    const formComProps = {
      action: action2,
      getClientAsync: params => this.props.getClientAsync({ name: params }),
      clientList: this.props.clientList,
      getHouseNoAsync: params => this.props.getHouseNoAsync({ number: params }),
      houseNoList: this.props.houseNoList,
      getTeamAsync: params => this.props.getTeamAsync({ name: params }),
      teamList: this.props.teamList,
      showFormModal2: this.props.showFormModal2,
      // editPowerInfo: this.props.editPowerInfo,
      // addPowerInfoAsync: this.props.addPowerInfoAsync,
      // editPowerInfo: this.props.editPowerInfo,
      // dataSource: this.props.powerInfoData,
      // removePowerInfoAsync: this.props.removePowerInfoAsync,
    };

    const powerNumberFormProps = {
      init: this.props.record,
    };
    const outlineFormProps = {
      init: this.props.record,
      ...this.props.extraData2,
    };
    if (['addPowerNumberAsync', 'editPowerNumberAsync'].includes(action2)) {
      return <PowerNumberForm {...powerNumberFormProps}></PowerNumberForm>;
    }
    if (['addOutlineAsync', 'editOutlineAsync'].includes(action2)) {
      return <OutlineForm {...outlineFormProps}></OutlineForm>;
    }
  };
  renderSmartFormModal2 = params => {
    return (
      <SmartFormModal
        show={this.props.isShowModal2}
        action={this.props.action2}
        titleMap={this.state.titleMap}
        onOk={this.onOk2}
        onCancel={this.props.onCancel2}
      >
        {this.renderModalContent2()}
      </SmartFormModal>
    );
  };
  componentDidMount() {
    // this.props.getBelongHouseNoAsync();
    // this.props.getPowerAsync();
    this.props.getPowerAsync();
    // this.props.getClientAsync();
    this.props.getHouseNoAsync();
    this.props.getTeamAsync();
    this.props.getDistrictAsync({});

    // this.props.showFormModal({
    //   action: 'exportDutyData',
    // });
    // this.props.getPowerInfoAsync({});
    // setTimeout(() => {
    //   console.log('  延时器 ： ');
    //   this.props.getListAsync({
    //     page: 249,
    //     page_size: 10,
    //   });
    // }, 1000);

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
    console.log(
      ' %c PowerStation 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return (
      <div className="PowerStation">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderSmartFormModal2()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default PowerStation;
