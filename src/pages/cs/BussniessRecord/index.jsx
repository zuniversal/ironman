import React, { Component, PureComponent } from 'react';
import './style.less';

import { Button, Tag } from 'antd';

import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import BussniessRecordSearchForm from '@/components/Form/BussniessRecordSearchForm'; //
import BussniessRecordForm from '@/components/Form/BussniessRecordForm'; //
import BussniessRecordPowerForm from '@/components/Form/BussniessRecordPowerForm'; //
import BussniessRecordTable from '@/components/Table/BussniessRecordTable'; //
import { actions, mapStateToProps } from '@/models/bussniessRecord'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '业务记录';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `抢修详情`,
  powerDetail: `电力施工详情（同电气试验详情）`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ bussniessRecord, }) => bussniessRecord;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: BussniessRecordForm,
})
class BussniessRecord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <BussniessRecordSearchForm
        formBtn={this.renderFormBtn}
        onFieldChange={this.onFieldChange}
      ></BussniessRecordSearchForm>
    );
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

    return <BussniessRecordTable {...tableProps}></BussniessRecordTable>;
  };
  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    if (action === 'detail') {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      if (action === 'setting') {
        return <BussniessRecordForm {...formComProps}></BussniessRecordForm>;
      }
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  renderModalContent = e => {
    const { action } = this.props; //
    const formComProps = {
      action,
    };

    if (action === 'powerDetail') {
      return (
        <BussniessRecordPowerForm {...formComProps}></BussniessRecordPowerForm>
      );
    }

    if (action === 'detail' || action === 'powerDetail') {
      return <BussniessRecordForm {...formComProps}></BussniessRecordForm>;
    }
  };
  renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        hideCancel
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  render() {
    return (
      <div className="bussniessRecord">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default BussniessRecord;
