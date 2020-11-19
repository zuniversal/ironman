import React, { Component, PureComponent } from 'react';
import './style.less';

import { Form, Input, Button, Checkbox, Menu, Upload, Result } from 'antd';
import SearchForm from '@/common/SearchForm'; //
import PowerStationTable from '@/components/Table/PowerStationTable'; //
import PowerStationForm from '@/components/Form/PowerStationForm'; //
import PowerStationSearchForm from '@/components/Form/PowerStationSearchForm'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //

import { actions, mapStateToProps } from '@/models/powerStation'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

const TITLE = '电站';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ houseNo, }) => houseNo;

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
        <Button type="primary" onClick={this.onBatchRemove}>
          删除
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <PowerStationSearchForm
        formBtn={this.renderFormBtn}
        getClientAsync={params =>
          this.props.getClientAsync({ keyword: params })
        }
        clientList={this.props.clientList}
        onFieldChange={this.onFieldChange}
      ></PowerStationSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };

  onRemove = paramssss => {
    console.log(' onRemove    ： ', paramssss);
    this.props.onRemove({ id: `${paramssss.record.id}` });
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
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
    };

    return <PowerStationTable {...tableProps}></PowerStationTable>;
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
      if (res.file && res.file.fileList) {
        const fileList = res.file.fileList;
        res.file = fileList[fileList.length - 1].response.url;
      } else {
        tips('文件不能为空！', 2);
        return;
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
      editPowerInfo: this.props.editPowerInfo,
      addPowerInfoAsync: this.props.addPowerInfoAsync,
      editPowerInfo: this.props.editPowerInfo,
      dataSource: this.props.powerInfoData,
      removePowerInfoAsync: this.props.removePowerInfoAsync,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <PowerStationForm {...formComProps}></PowerStationForm>;
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
    this.props.getBelongHouseNoAsync();
    this.props.getClientAsync();
    this.props.getHouseNoAsync();
    const datas = {
      // "name": "电站1",
      // "addr": "上海普天科创电子有限公司",
      // "customer": 1,
      // "electricity_user":1,
      // "operation_level": "2354",
      // "person": "234",
      // "phone": "2343546",
      // "file": "qwsdfgh",
      // "status": true,
      // "inspections_number": 3,
      // "total_capacity": 123.0,
      // "real_capacity": 123.0,

      // electricity_user: '1',
      // // customer: "5774",
      // name: '1',
      // person: '13',
      // status: true,
      // operation_level: '1',
      // inspections_number: 1,
      // phone: '11',
      // addr: '清华大学',
      // file: 'http://localhost:8000/#/om/powerStation',
      elecrical_info_list: [
        // {
        //   id: 1,
        // },
        1,
      ],
      // elecrical_info_list: [
      //   {
      //     id: 8,
      //     // power_number: '',
      //     // meter_number: '',
      //     // incoming_line_name: '',
      //     // magnification: '',
      //     // transformer_capacity: '',
      //     // real_capacity: '',
      //     // outline_number: '',
      //   },
      // ],
    };
    // this.props.showFormModal({
    //   action: 'add',
    // })
    // this.props.addPowerInfoAsync();
    // this.props.addItemAsync(datas);
    // this.props.addItemAsync({});
  }

  render() {
    const formComProps = {
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ keyword: params }),
      clientList: this.props.clientList,
      getHouseNoAsync: params =>
        this.props.getHouseNoAsync({ keyword: params }),
      houseNoList: this.props.houseNoList,
      editPowerInfo: this.props.editPowerInfo,
    };
    // return (
    //   <PowerStationForm
    //     addPowerInfoAsync={this.props.addPowerInfoAsync}
    //     editPowerInfo={this.props.editPowerInfo}
    //     {...formComProps}
    //     dataSource={this.props.powerInfoData}
    //   ></PowerStationForm>
    // );
    return (
      <div className="PowerStation">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default PowerStation;
