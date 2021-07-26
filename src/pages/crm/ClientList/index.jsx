import React, { PureComponent } from 'react';
import { Button, Tabs } from 'antd';
import ClientListSearchForm from '@/components/Form/ClientListSearchForm';
import ClientListForm from '@/components/Form/ClientListForm';
import {
  ClientListAsignPeopleForm,
  ClientListPlanForm,
  ClientListPullContractForm,
  ClientListRemarkForm,
} from '@/components/Form/ClientListActionForm';
import {
  ClientListPrivateTable,
  ClientListPublicTable,
} from '@/components/Table/ClientListTable';
import SmartFormModal from '@/common/SmartFormModal';
import UploadCom from '@/components/Widgets/UploadCom';
import { actions, mapStateToProps } from '@/models/clientList';
import SmartHOC from '@/common/SmartHOC';
import { clientListTabConfig } from '@/configs';
import { connect } from 'umi';

const { TabPane } = Tabs;

const TITLE = '';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  uploadFile: `上传方案`,
  clientListPlan: `计划`,
  clientListPullContract: `拉取合同`,
  clientListRemark: `添加备注`,
  clientListAsignPeople: `分配人员`,
};

const detailFormMap = {};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class ClientList extends PureComponent {
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
          // disabled={this.props.authInfo.create !== true}
        >
          新增{TITLE}
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <ClientListSearchForm formBtn={this.renderFormBtn}></ClientListSearchForm>
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
    };

    const tableMap = {
      private: ClientListPrivateTable,
      public: ClientListPublicTable,
    };
    const TableCom = tableMap[this.props.tabType];
    // const TableCom = tableMap['private'];
    return <TableCom {...tableProps}></TableCom>;
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
    if (['uploadFile'].includes(action)) {
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
    if (action === 'uploadFile') {
      const smallLayout = {
        labelCol: {
          sm: { span: 5 }, //
        },
        wrapperCol: {
          sm: { span: 19 }, //
        },
      };
      return (
        <UploadCom
          label={this.state.titleMap[action]}
          action={'file'}
          isInputUpload
          contentClass={'dfc'}
          formItemCls={'assetsUpload'}
          action={'/api/v1/upload'}
          name={'file'}
          extra={'支持扩展名:rar.zip.doc.docx.pdf,jpg...'}
          uploadProps={{
            accept:
              'aplication/zip,application/msword,application/pdf,image/jpeg',
          }}
          formItemLayout={smallLayout}
        ></UploadCom>
      );
    }
    if (action === 'clientListAsignPeople') {
      return (
        <ClientListAsignPeopleForm
          {...formComProps}
        ></ClientListAsignPeopleForm>
      );
    }
    if (action === 'clientListPlan') {
      return <ClientListPlanForm {...formComProps}></ClientListPlanForm>;
    }
    if (action === 'clientListPullContract') {
      return (
        <ClientListPullContractForm
          {...formComProps}
        ></ClientListPullContractForm>
      );
    }
    if (action === 'clientListRemark') {
      return <ClientListRemarkForm {...formComProps}></ClientListRemarkForm>;
    }
    console.log(' formComProps ： ', formComProps);
    return <ClientListForm {...formComProps}></ClientListForm>;
  };
  get size() {
    return ['clientListPullContract', 'clientListRemark', 'uploadFile'].some(
      v => v === this.props.action,
    )
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
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  onTabChange = tabType => {
    console.log('    onTabChange ： ', tabType);
    this.props.onTabChange({ tabType });
    this.props.getListAsync({
      tabType,
      page: 1,
    });
  };
  renderTabPanes = params => (
    <div className={'tabWrapper'}>
      <Tabs defaultActiveKey="0" onChange={this.onTabChange}>
        {clientListTabConfig.map((v, i) => (
          <TabPane {...v}></TabPane>
        ))}
      </Tabs>
    </div>
  );

  render() {
    return (
      <div className="">
        {this.renderTabPanes()}

        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default ClientList;
