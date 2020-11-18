import React, { Component, PureComponent } from 'react';
import './style.less';

import { Button } from 'antd';
import SmartModal from '@/common/SmartModal'; //
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
      getRoleAsync: params => this.props.getRoleAsync({ keyword: params }),
      roleList: this.props.roleList,
    };

    return (
      <UserManageSearchForm
        formBtn={this.renderFormBtn}
        onFieldChange={this.onFieldChange}
        {...formProps}
      ></UserManageSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    const { value } = params;
    if (value.role_id != undefined || value.organization_id != undefined) {
      console.log(' 列表搜索 ： ', !value.role_id, !value.organization_id); //
      this.props.getListAsync();
      return;
    }
    if (!`${value.value}`.trim() && !`${formData.value}`.trim()) {
      console.log(' onFieldChange,22  , ： ', params);
      tips('搜索参数不能为空！', 2);
      return;
    }
    console.log(' 搜索 ： '); //
    this.props.getSearchListAsync(params.formData);
  };
  renderTable = params => {
    const tableProps = {
      onSelectChange: this.props.onSelectChange,
      dataSource: this.props.dataList,
      count: this.props.count,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
    };

    return <UserManageTable {...tableProps}></UserManageTable>;
  };

  onRemove = params => {
    console.log(' onRemove    ： ', params);
    this.props.removeItemAsync({ d_id: `${params.record.id}` });
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
      if (action === 'edit') {
        this.props.editItemAsync({
          ...res,
          d_id: itemDetail.id,
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
      getOrganizeAsync: params =>
        this.props.getOrganizeAsync({ keyword: params }),
      organizeList: this.props.organizeList,
      getRoleAsync: params => this.props.getRoleAsync({ keyword: params }),
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
    this.props.getOrganizeAsync(); //
    this.props.getRoleAsync(); //
    this.props.getTagsAsync(); //
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
