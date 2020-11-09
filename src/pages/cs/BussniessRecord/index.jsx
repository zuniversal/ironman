import React, { Component, PureComponent } from 'react';
import './style.less';

import { Button, Tag } from 'antd';

import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import BussniessRecordForm from '@/components/Form/BussniessRecordForm'; //
import BussniessRecordTable from '@/components/Table/BussniessRecordTable'; //
import { actions, mapStateToProps } from '@/models/bussniessRecord'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { PRIMARY } from '@/constants';

const TITLE = '账户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
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

  renderSearchForm = params => {
    return (
      <div className={'fsb '}>
        <div>
          <Tag color={PRIMARY}>
            最多支持创建3个账户，每个账户可在小程序接受通知
          </Tag>
        </div>
        <div className={'btnWrapper'}>
          <Button
            type="primary"
            onClick={() => this.props.showFormModal({ action: 'add' })}
          >
            新增{TITLE}
          </Button>
        </div>
      </div>
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
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      if (action === 'setting') {
        // this.props.homeSetting({
        //   ...res,
        // });
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
    return <BussniessRecordForm {...formComProps}></BussniessRecordForm>;
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
