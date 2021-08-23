import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal';
import SystemNotifyForm from '@/components/Form/SystemNotifyForm';
import SystemNotifySearchForm from '@/components/Form/SystemNotifySearchForm';
import SystemNotifyTable from '@/components/Table/SystemNotifyTable';

import { actions, mapStateToProps } from '@/models/systemNotify';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '系统通知';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `抢修合同通知`,
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
})
class SystemNotify extends PureComponent {
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
          查询
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <SystemNotifySearchForm
      // formBtn={this.renderFormBtn}
      ></SystemNotifySearchForm>
    );
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
    };

    return <SystemNotifyTable {...tableProps}></SystemNotifyTable>;
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
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
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ name: params }),
      clientList: this.props.clientList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
      // formComProps.init = {
      //   合同ID: '合同ID',
      //   业务员: '业务员',
      //   对应抢修单ID: '对应抢修单ID',
      //   合同类型: '合同类型',
      //   处理时间: '处理时间',
      //   关联工单ID: '关联工单ID',
      // };
    }
    console.log(' formComProps ： ', formComProps);
    return <SystemNotifyForm {...formComProps}></SystemNotifyForm>;
  };
  get size() {
    // console.log(' get 取属 size ： ', this.state, this.props);
    return ['detail'].some(v => v === this.props.action) ? 'small' : 'default';
  }
  renderSmartFormModal = params => {
    if (this.props.action === 'detail') {
      this.state.titleMap.detail = this.props.itemDetail.typeMap;
    }
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        size={this.size}
        hideOk={['detail'].some(v => v === this.props.action)}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  render() {
    return (
      <div className="AlarmRecord">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default SystemNotify;
