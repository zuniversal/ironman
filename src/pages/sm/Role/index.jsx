import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SmartFormModal from '@/common/SmartFormModal';
import RoleForm from '@/components/Form/RoleForm';
import SearchKwForm from '@/components/Form/SearchKwForm';
import RoleTable from '@/components/Table/RoleTable';

import {
  actions,
  // mapStateToProps
} from '@/models/role';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { filterArr } from '@/utils';

const TITLE = '角色';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

const mapStateToProps = ({ role, user }) => ({
  ...role,
  getRoutes: user.getRoutes,
});

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: RoleForm,
})
class Role extends PureComponent {
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
    return (
      <SearchKwForm
        formBtn={this.renderFormBtn}
        className={'fje'}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        keyword={'name'}
        label={'角色名'}
        noLabel
      ></SearchKwForm>
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
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
    };

    return <RoleTable {...tableProps}></RoleTable>;
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
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action, itemDetail } = this.props;
    const { form, init } = props;
    const filterData = this.props.permsData.filter(v => v !== 'all');
    const permsCodesMain = filterArr(
      filterData.map(v => `${v}`.slice(0, 4)).map(v => Number(v + '00')),
    );
    const permsCodesRoot = filterArr(
      filterData.map(v => `${v}`.slice(0, 3)).map(v => Number(v + '000')),
    );
    const permsCodes = filterArr([
      ...this.props.permsData,
      ...permsCodesMain,
      ...permsCodesRoot,
    ]);
    console.log(
      ' permsCodes0 ： ',
      filterData,
      permsCodesMain,
      permsCodesRoot,
      permsCodes,
    );
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action);
      // return
      if (!res.comments) {
        res.comments = undefined;
      }

      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
          perms_codes: permsCodes,
        });
      }
      if (action === 'edit') {
        this.props.editItemAsync({
          ...res,
          d_id: itemDetail.id,
          perms_codes: permsCodes,
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
      permission: this.props.permission,
      permsData: this.props.permsData,
      onPermsCheck: this.props.onPermsCheck,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps);
    return <RoleForm {...formComProps}></RoleForm>;
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
    this.props.getPermissionAsync(this.props.getRoutes.route.routes);
    // this.props.addItemAsync({
    //   "name":"12323","comments":"12312",
    //   "perms_codes": [100000, 180000]

    // });
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

export default Role;
