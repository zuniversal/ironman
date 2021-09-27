import React, { PureComponent } from 'react';
import { Button, Tabs } from 'antd';
import ClientForm from '@/components/Form/ClientForm';
import PlanContractStep from './PlanContractStep';
import { MyTaskApproveForm } from '@/components/Form/MyTaskActionForm';
import MyTaskSearchForm from '@/components/Form/MyTaskSearchForm';
// import MyTaskForm from '@/components/Form/MyTaskForm';
import MyTaskTable from '@/components/Table/MyTaskTable';
import SmartFormModal from '@/common/SmartFormModal';
import { actions, mapStateToProps } from '@/models/myTask';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { mytaskTabConfig } from '@/configs';

const { TabPane } = Tabs;

const TITLE = '任务';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  getPlanContract: `任务详情`,
  approveTaskAsync: `${TITLE}审核`,
  clientDetailAsync: `客户详情`,
};

const detailFormMap = {
  clientDetailAsync: ClientForm,
};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  noMountFetch: true,
})
class MyTask extends PureComponent {
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
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <MyTaskSearchForm
        // formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></MyTaskSearchForm>
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
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
      showItemAsync: this.props.showItemAsync,
      taskType: this.props.tabType,
      getItemAsync: this.props.getItemAsync,
    };

    return <MyTaskTable {...tableProps}></MyTaskTable>;
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
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    if (['other', 'getPlanContract'].includes(action)) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'approveTaskAsync') {
        this.props.approveTaskAsync({
          d_id: this.props.taskInfo.d_id,
          result: true,
          ...res,
        });
        return;
      }
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps);
    if (action === 'approveTaskAsync') {
      return <MyTaskApproveForm {...formComProps}></MyTaskApproveForm>;
    }
    if (action === 'getPlanContract') {
      formComProps.planStepInfo = this.props.planStepInfo;
      formComProps.planStepId = this.props.planStepId;
      return <PlanContractStep {...formComProps}></PlanContractStep>;
    }
    // return <MyTaskForm {...formComProps}></MyTaskForm>;
  };
  get size() {
    return ['approveTaskAsync'].some(v => v === this.props.action)
      ? 'small'
      : 'default';
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
        extraBtn={this.renderExtraBtn}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };
  confirmHandle = async (params, type) => {
    console.log('    confirmHandle ： ', params, type, this.props);
    const { action } = this.props;
    const { form } = params;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      this.props.approveTaskAsync({
        d_id: this.props.taskInfo.d_id,
        result: false,
        ...res,
      });
    } catch (error) {
      console.log(' error ： ', error);
    }
  };
  renderExtraBtn = params => {
    console.log('    renderExtraBtn ： ', params);
    if (this.props.action === 'approveTaskAsync') {
      return (
        <Button key="reject" onClick={e => this.confirmHandle(params, 'onOk')}>
          驳回
        </Button>
      );
    }
    return null;
  };
  onTabChange = tabType => {
    console.log('    onTabChange ： ', tabType);
    this.props.onTabChange({ tabType });
    this.props.getListAsync({
      // tabType,
      status: tabType,
      page: 1,
    });
  };
  renderTabPanes = params => (
    <div className={'tabWrapper'}>
      <Tabs defaultActiveKey="0" onChange={this.onTabChange}>
        {mytaskTabConfig.map((v, i) => (
          <TabPane {...v}></TabPane>
        ))}
      </Tabs>
    </div>
  );
  componentDidMount() {
    console.log(
      ' %c MyTask 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //
    this.props.getListAsync({
      status: this.props.tabType,
    });
  }

  render() {
    return (
      <div className="">
        {/* <PlanContractStep></PlanContractStep> */}
        {this.renderTabPanes()}

        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default MyTask;
