import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal'; //
import UserManageForm from '@/components/Form/UserManageForm'; //
import UserManageSearchForm from '@/components/Form/UserManageSearchForm'; //
import UserManageTable from '@/components/Table/UserManageTable'; //

import { actions, mapStateToProps } from '@/models/userManage'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

const TITLE = '用户';

const titleMap = {
  add: `新建${TITLE}`,
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
  modalForm: UserManageForm,
})
class UserManage extends PureComponent {
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
        {/* <Button type="primary" onClick={() => this.props.onBatchRemove()}>
          删除
        </Button> */}
      </div>
    );
  };
  renderSearchForm = params => {
    const formProps = {
      getOrganizeAsync: params =>
        this.props.getOrganizeAsync({ keyword: params }),
      organizeList: this.props.organizeList,
      getRoleAsync: params => this.props.getRoleAsync({ name: params }),
      roleList: this.props.roleList,
    };

    return (
      <UserManageSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        {...formProps}
      ></UserManageSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    const { value, formData } = params;
    if (
      formData.role_id != undefined ||
      formData.organization_id != undefined ||
      (value.value && `${value.value}`.trim()) ||
      (formData.value && `${formData.value}`.trim())
    ) {
      console.log(
        ' 参数搜索 ： ',
        formData.role_id != undefined,
        formData.organization_id != undefined,
        `${value.value}`.trim(),
        `${formData.value}`.trim(),
      ); //
      this.props.getSearchListAsync(formData);
      return;
    }
    // if (!`${value.value}`.trim() && !`${formData.value}`.trim()) {
    //   console.log(' onFieldChange,22  , ： ', params);
    //   tips('搜索参数不能为空！', 2);
    //   return;
    // }
    console.log(' 列表搜索 ： '); //
    this.props.getListAsync(formData);
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
      extraLoading: ['getSearchListAsync'],
    };

    return <UserManageTable {...tableProps}></UserManageTable>;
  };

  onRemove = params => {
    console.log(' onRemove    ： ', params);
    // this.props.removeItemAsync({ d_id: `${params.record.id}` });
    this.props.onRemove({
      id: `${params.record.id}`,
      d_id: `${params.record.id}`,
    });
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
          role_ids: [res.role_ids],
          tag_ids: [res.tag_ids],
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...itemDetail,
          ...res,
          role_ids: [res.role_ids],
          tag_ids: [res.tag_ids],
          d_id: itemDetail.id,
          account: {
            ...itemDetail.account,
            username: res.username,
          },
          customer_id: null,
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
      getClientAsync: params => this.props.getClientAsync({ name: params }),
      clientList: this.props.clientList,
      getOrganizeAsync: params =>
        this.props.getOrganizeAsync({ keyword: params }),
      organizeList: this.props.organizeList,
      getRoleAsync: params => this.props.getRoleAsync({ name: params }),
      roleList: this.props.roleList,
      getTagsAsync: params => this.props.getTagsAsync({ keyword: params }),
      tagsList: this.props.tagsList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <UserManageForm {...formComProps}></UserManageForm>;
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
  componentDidMount() {
    this.props.getAllAsync(); //
    this.props.getOrganizeAsync({ page_size: 1000 }); //
    this.props.getRoleAsync({ page_size: 1000 }); //
    this.props.getTagsAsync({ page_size: 1000 }); //
  }

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

export default UserManage;
