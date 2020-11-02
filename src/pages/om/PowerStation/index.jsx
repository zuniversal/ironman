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

const TITLE = '电站';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
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
    console.log(' renderFormBtn ： ', params); //
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
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
          导出{TITLE}数据
        </Button>
        {/* <Button type="primary" onClick={() => this.props.onBatchRemove()}> */}
        <Button type="primary" onClick={() => this.onBatchRemove()}>
          删除
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <PowerStationSearchForm
        formBtn={this.renderFormBtn}
        getClientAsync={params =>
          this.props.getClientAsync({ keyword: params })
        }
        clientList={this.props.clientList}
        getHouseNoAsync={params =>
          this.props.getHouseNoAsync({ keyword: params })
        }
        houseNoList={this.props.houseNoList}
      ></PowerStationSearchForm>
    );
  };

  onRemove = paramssss => {
    console.log(' onRemove    ： ', paramssss);
    this.props.removeItemsAsync({ id: `${paramssss.record.id}` });
  };
  onBatchRemove = params => {
    console.log(' onBatchRemove    ： ', params, this.state, this.props);
    this.props.removeItemsAsync({
      id: `${this.props.selectedRowKeys.join(',')}`,
    });
  };
  renderTable = params => {
    console.log(' renderTable ： ', params, this.state, this.props);
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
    if (action === 'removeAsync') {
      this.props.removeAsync({});
      return;
    }
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
          d_id,
        });
      }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  renderModalContent = e => {
    console.log('    renderModalContent ： ', e, this.state, this.props);
    const { action } = this.props; //
    const formComProps = {
      action,
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ keyword: params }),
      clientList: this.props.clientList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <PowerStationForm {...formComProps}></PowerStationForm>;
  };
  get size() {
    console.log(' get 取属 size ： ', this.state, this.props);
    return ['removeStation'].some(v => v === this.props.action)
      ? 'small'
      : 'default';
  }
  get isNoForm() {
    console.log(' get 取属 isNoForm ： ', this.state, this.props);
    return ['removeStation'].some(v => v === this.props.action);
  }
  renderSmartFormModal = params => {
    console.log(' renderSmartFormModal ： ', params, this.state, this.props);
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
      </div>
    );
  }
}

export default PowerStation;
