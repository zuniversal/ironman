import React, { PureComponent } from 'react';
import { Button, Tabs } from 'antd';
import ClientRemark from './ClientRemark';
import ClientPlanList from './ClientPlanList';
import ClientForm from '@/components/Form/ClientForm';
import ClientListSearchForm from '@/components/Form/ClientListSearchForm';
import ClientListForm from '@/components/Form/ClientListForm';
import {
  ClientListAssignPeopleForm,
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
import { clientListTabConfig, clientListTabMap } from '@/configs';
import { connect } from 'umi';
import { tips } from '@/utils';
import { formatClientData } from '@/format/client';

const { TabPane } = Tabs;

const TITLE = '客户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  uploadFile: `上传方案`,
  clientListPlan: `计划`,
  clientListPullContract: `拉取合同`,
  clientListPullContract: `拉取计划`,
  clientListRemark: `添加备注`,
  clientListAssignPeople: `分配人员`,
  getClientPlanAsync: `${TITLE}计划详情`,
  clientDetailAsync: `客户详情`,
  addClientPlanAsync: `新建计划`,
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
      <ClientListSearchForm
        // formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></ClientListSearchForm>
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

      getClientPlanAsync: this.props.getClientPlanAsync,
      getRemarkAsync: this.props.getRemarkAsync,
      getClientRemarkListAsync: this.props.getClientRemarkListAsync,
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
    if (['uploadFile', 'getClientPlanAsync'].includes(action)) {
      this.props.onCancel({});
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      if (action === 'edit') {
        const formatRes = formatClientData(res, {
          itemDetail,
          action,
        });
        console.log(' formatRes ： ', formatRes); //
        const isUrgeOneRes = formatRes.contacts.filter(v => v.is_urge);
        console.log(' formatResformatRes ： ', formatRes, res, isUrgeOneRes);
        if (isUrgeOneRes.length > 1) {
          tips('催款联系人只能勾选1人！', 2);
          return;
        }
        this.props.editItemAsync({
          ...formatRes,
          d_id: this.props.itemDetail.id,
        });
        return;
      }
      if (action === 'addClientPlanAsync') {
        const { duration1, duration2, duration3 } = res;
        const params = {
          ...res,
          customer_id: [this.props.customer_id],
          plan_code: [
            {
              id: 1,
              index: 1,
              file: null,
              duration: duration1,
            },
            {
              id: 2,
              index: 2,
              file: null,
              duration: duration2,
            },
            {
              id: 3,
              index: 3,
              file: null,
              duration: duration3,
            },
          ],
        };
        this.props.addClientPlanAsync(params);
      }

      if (action === 'clientListAssignPeople') {
        this.props.assignPeopleAsync({
          ...res,
          d_id: this.props.customer_id,
        });
        return;
      }
      if (action === 'clientListRemark') {
        this.props.addRemarkAsync({
          ...res,
          customer_id: this.props.itemDetail.id,
        });
        return;
      }
      if (action === 'clientListRemark') {
        this.props.editRemarkAsync({
          ...res,
          d_id: this.props.itemDetail.id,
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
      clientRemarkList: this.props.clientRemarkList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps, this.props);
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
    if (action === 'clientListAssignPeople') {
      formComProps.init = this.props.formInitData;
      return (
        <ClientListAssignPeopleForm
          {...formComProps}
        ></ClientListAssignPeopleForm>
      );
    }
    if (action === 'addClientPlanAsync') {
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
    if (action === 'getClientPlanAsync') {
      formComProps.clientPlanList = this.props.clientPlanList;
      formComProps.getClientAsync = this.props.getClientAsync;
      formComProps.getClientClueAsync = this.props.getClientClueAsync;
      return <ClientPlanList {...formComProps}></ClientPlanList>;
    }
    const clientForm = <ClientForm {...formComProps}></ClientForm>;
    return (
      <>
        {clientForm}
        {action === 'edit' && (
          <ClientRemark
            clientRemarkList={this.props.clientRemarkList}
          ></ClientRemark>
        )}
      </>
    );
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
    console.log('    onTabChange ： ', tabType, clientListTabMap);
    this.props.onTabChange({ tabType });
    this.props.getListAsync({
      tabType,
      is_hub: clientListTabMap[tabType],
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
