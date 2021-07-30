import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import CsMonitorTable from '@/components/Table/CsMonitorTable';
import CsMonitorForm from '@/components/Form/CsMonitorForm';
import SmartFormModal from '@/common/SmartFormModal';
import CsMonitorStatBox from '@/components/Widgets/CsMonitorStatBox';

import { actions, mapStateToProps } from '@/models/csMonitor';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import SearchKwForm from '@/components/Form/SearchKwForm';

const statConfig = [
  {
    dataKey: 'order_data',
    title: 'CPU',
    val: '23 / 88',
    unit: '核',
    day: '日环比 ',
    style: {
      background: 'linear-gradient(135deg, #31C8FF 0%, #009DFF 100%)',
      boxShadow: '0px 5px 10px rgba(27, 163, 252, 0.5)',
    },
    icon: 'csMonitorCPU',
  },
  {
    dataKey: 'task_data',
    title: '内存',
    val: '23 / 88',
    unit: 'G',
    day: '日环比 ',
    style: {
      background: 'linear-gradient(135deg, #FEB833 0%, #FE9833 100%)',
      boxShadow: '0px 5px 10px rgba(253, 156, 51, 0.5)',
    },
    icon: 'csMonitorRAM',
  },
  {
    dataKey: 'inspe_data',
    title: '存储',
    val: '23 / 88',
    unit: 'T',
    day: '日环比 ',
    style: {
      background: 'linear-gradient(135deg, #FF8E8E 0%, #FF6969 100%)',
      boxShadow: '0px 5px 10px rgba(252, 27, 27, 0.3)',
    },
    icon: 'csMonitorMemory',
  },
  {
    dataKey: 'inspe_data',
    title: '网络',
    val: '23 / 88',
    unit: 'M',
    day: '日环比 ',
    style: {
      background: 'linear-gradient(135deg, #3CD07F 0%, #1AB460 100%)',
      boxShadow: '0px 5px 10px #1AB460',
    },
    icon: 'csMonitorNetwork',
  },
];

const TITLE = '物料';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ csMonitor, }) => csMonitor;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: CsMonitorForm,
})
class CsMonitor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderStatBox = params => (
    <CsMonitorStatBox data={this.props.statisticData}></CsMonitorStatBox>
  );
  renderSearchForm = params => {
    return (
      <SearchKwForm
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        keyword={'name'}
        label={'名称'}
        noLabel
      ></SearchKwForm>
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

    return <CsMonitorTable {...tableProps}></CsMonitorTable>;
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
    }
    console.log(' formComProps ： ', formComProps);
    return <CsMonitorForm {...formComProps}></CsMonitorForm>;
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
      <div className="csMonitor">
        {this.renderStatBox()}

        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default CsMonitor;
