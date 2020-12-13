import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import AlarmNotifyForm from '@/components/Form/AlarmNotifyForm'; //
import AlarmNotifySearchForm from '@/components/Form/AlarmNotifySearchForm'; //
import AlarmNotifyTable from '@/components/Table/AlarmNotifyTable'; //
import AlarmNotifyInfo from '@/components/Widgets/AlarmNotifyInfo'; //
import { actions, mapStateToProps } from '@/models/alarmNotify'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '告警通知';

const titleMap = {
  add: `${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class AlarmNotify extends PureComponent {
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
          查询1
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <AlarmNotifySearchForm
        formBtn={this.renderFormBtn}
      ></AlarmNotifySearchForm>
    );
  };

  renderTable = params => {
    const tableProps = {
      onSelectChange: this.props.onSelectChange,
      dataSource: this.props.dataList,
      count: this.props.count,
      searchInfo: this.props.searchInfo,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
    };

    return <AlarmNotifyTable {...tableProps}></AlarmNotifyTable>;
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
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <AlarmNotifyInfo></AlarmNotifyInfo>;
    return <AlarmNotifyForm {...formComProps}></AlarmNotifyForm>;
  };
  get size() {
    // console.log(' get 取属 size ： ', this.state, this.props);
    return ['detail'].some(v => v === this.props.action) ? 'small' : 'default';
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
      <div className="AlarmRecord">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default AlarmNotify;
