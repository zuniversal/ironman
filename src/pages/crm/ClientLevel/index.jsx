import React, { PureComponent } from 'react';
import { Button } from 'antd';
// import ClientLevelSearchForm from '@/components/Form/ClientLevelSearchForm';
import ClientLevelForm from '@/components/Form/ClientLevelForm';
// import ClientLevelTable from '@/components/Table/ClientLevelTable';
import SmartFormModal from '@/common/SmartFormModal';
import { actions, mapStateToProps } from '@/models/clientList';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
};

const detailFormMap = {};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class ClientLevel extends PureComponent {
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
    return this.renderFormBtn();
    // return (
    //   <ClientLevelSearchForm
    //     formBtn={this.renderFormBtn}
    //   ></ClientLevelSearchForm>
    // );
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
    };

    // return <ClientLevelTable {...tableProps}></ClientLevelTable>;
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
    if (['other'].includes(action)) {
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
    // return <ClientLevelForm {...formComProps}></ClientLevelForm>;
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
  renderForm = params => {
    return <ClientLevelForm></ClientLevelForm>;
  };

  render() {
    return (
      <div className="">
        {/* {this.renderSearchForm()} */}

        {/* {this.renderTable()} */}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}

        {this.renderForm()}
      </div>
    );
  }
}

export default ClientLevel;