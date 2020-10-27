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

const TITLE = '用户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
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
    console.log(' renderFormBtn ： ', params); //
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
        >
          新增{TITLE}
        </Button>
        <Button type="primary" onClick={() => this.props.onBatchRemove()}>
          删除
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <UserManageSearchForm
        formBtn={this.renderFormBtn}
        // onSubmit={this.onSubmit}
        // onFail={this.onFail}
      ></UserManageSearchForm>
    );
  };
  // renderSearchForm = params => {
  //   // console.log(' renderSearchForm ： ', params,  )
  //   return <div className={'fsb '}  >
  //     <UserManageSearchForm></UserManageSearchForm>
  //     <div className={'fsb '}  >
  //       <SearchForm></SearchForm>
  //       <div className={'btnWrapper'}>
  //         <Button type="primary" onClick={() => this.props.showFormModal({action: 'add',  })}  >新增{TITLE}</Button>
  //       </div>
  //     </div>
  //   </div>
  // }

  renderTable = params => {
    console.log(' renderTable ： ', params, this.state, this.props);

    const tableProps = {
      newTbData: this.state.newTbData,

      onSelectChange: this.props.onSelectChange,
      tdClick: this.props.showFormModal,
      showDetail: this.props.showFormModal,
      dataSource: this.props.dataList,
      edit: this.props.showFormModal,
      remove: this.props.onRemove,
    };

    return <UserManageTable {...tableProps}></UserManageTable>;
  };

  renderSmartModal = params => {
    console.log(' renderSmartModal ： ', params, this.state, this.props);
    const { show, title, action, titleMap } = this.state; //

    return (
      <SmartModal
        show={show}
        onOk={this.onOk}
        onCancel={this.onCancel}
        action={action}
        titleMap={titleMap}
      >
        {this.renderModalContent()}
      </SmartModal>
    );
  };

  render() {
    console.log(
      ' %c UserManage 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="UserManage">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartModal()}
      </div>
    );
  }
}

export default UserManage;
