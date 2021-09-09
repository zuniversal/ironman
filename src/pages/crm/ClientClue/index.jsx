import React, { PureComponent } from 'react';
import { Button } from 'antd';
import { ClientClueApproveForm } from '@/components/Form/ClientClueActionForm';
import ClientListSearchForm from '@/components/Form/ClientListSearchForm';
import ClientClueForm from '@/components/Form/ClientClueForm';
import ClientClueTable from '@/components/Table/ClientClueTable';
import SmartFormModal from '@/common/SmartFormModal';
import { actions, mapStateToProps } from '@/models/clientClue';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '客户线索';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  approveClientClueAsync: `${TITLE}审批`,
};

const detailFormMap = {};

// const mapStateToProps = ({ houseNo, }) => houseNo;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
})
class ClientClue extends PureComponent {
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
        formBtn={this.renderFormBtn}
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
    };

    return <ClientClueTable {...tableProps}></ClientClueTable>;
  };

  onRemove = params => {
    console.log(' onRemove    ： ', params);
    // this.props.removeItemAsync({ d_id: `${params.record.id}` });
    this.props.onRemove({
      d_id: `${params.record.id}`,
    });
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
      if (action === 'approveClientClueAsync') {
        this.props.approveClientClueAsync(res);
        return;
      }

      const { province, city, area, ...enterprise } = res.enterprise;
      console.log(' enterprise ： ', enterprise);

      const params = {
        // ...init,
        id: this.props.itemDetail.id,
        ...res,
        content: {
          ...res,
          base: {
            name: res.name,
            level: res.level,
          },
          enterprise,
          contact: res.contact.map(v => ({
            ...v,
            is_urge: v.is_urge && v.is_urge.length > 0 ? true : false,
            is_quit: v.is_quit && v.is_quit.length > 0 ? true : false,
          })),
        },
        address: res.enterprise.address,
        longitude: res.enterprise.longitude,
        latitude: res.enterprise.latitude,
        adcode: res.enterprise.adcode,
        city_code: res.enterprise.city_code,
        district: res.enterprise.district,
      };
      if (res.file) {
        if (res.file && res.file.fileList && res.file.fileList.length > 0) {
          const fileList = res.file.fileList;
          console.log(' fileList ： ', fileList);
          params.content.enterprise.file = fileList
            .map(v => v.response.url)
            .join(',');
        } else {
          params.content.enterprise.file = null;
        }
      } else {
        params.content.enterprise.file = null;
      }
      if (res.logo) {
        if (res.logo && res.logo.fileList && res.logo.fileList.length > 0) {
          const fileList = res.logo.fileList;
          console.log(' fileList ： ', fileList);
          params.content.enterprise.logo = fileList
            .map(v => v.response.url)
            .join(',');
        } else {
          params.content.enterprise.logo = null;
        }
      } else {
        params.content.enterprise.logo = null;
      }

      const isUrgeRes = params.contact.filter(v => v.is_urge);

      console.log(' paramsparams ： ', params, isUrgeRes);
      // return
      if (isUrgeRes.length > 1) {
        tips('催款联系人只能勾选1人！', 2);
        return;
      }

      if (action === 'add') {
        this.props.addItemAsync({
          ...params,
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...params,
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
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'approveClientClueAsync') {
      formComProps.init = this.props.formInitData;
      return <ClientClueApproveForm {...formComProps}></ClientClueApproveForm>;
    }
    console.log(' formComProps ： ', formComProps);
    return <ClientClueForm {...formComProps}></ClientClueForm>;
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

export default ClientClue;
