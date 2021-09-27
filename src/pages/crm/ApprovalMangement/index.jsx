import React, { PureComponent } from 'react';
import { Button } from 'antd';
import ClientForm from '@/components/Form/ClientForm';
import PlanContractStep from '@/pages/crm/MyTask/PlanContractStep';
import MyTaskSearchForm from '@/components/Form/MyTaskSearchForm';
import ApprovalMangementSearchForm from '@/components/Form/ApprovalMangementSearchForm';
// import ApprovalMangementForm from '@/components/Form/ApprovalMangementForm';
import ApprovalMangementTable from '@/components/Table/ApprovalMangementTable';
import SmartFormModal from '@/common/SmartFormModal';
import { actions, mapStateToProps } from '@/models/approvalMangement';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  getPlanContract: `任务详情`,
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
})
class ApprovalMangement extends PureComponent {
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
    return (
      <ApprovalMangementSearchForm
        formBtn={this.renderFormBtn}
        onFieldChange={this.onFieldChange}
      ></ApprovalMangementSearchForm>
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
      getItemAsync: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
      showItemAsync: this.props.showItemAsync,
    };

    return <ApprovalMangementTable {...tableProps}></ApprovalMangementTable>;
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
    if (action === 'getPlanContract') {
      formComProps.planStepInfo = this.props.planStepInfo;
      formComProps.planStepId = this.props.planStepId;
      return <PlanContractStep {...formComProps}></PlanContractStep>;
    }
    // return <ApprovalMangementForm {...formComProps}></ApprovalMangementForm>;
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
      <div className="">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default ApprovalMangement;
