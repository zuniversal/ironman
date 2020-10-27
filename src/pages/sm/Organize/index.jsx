import React, { Component, PureComponent } from 'react';
import './style.less';

import {
  Form,
  Input,
  Button,
  Checkbox,
  Menu,
  Upload,
  Result,
  Typography,
  Divider,
  Tag,
} from 'antd';

import SmartModal from '@/common/SmartModal'; //
import SearchForm from '@/common/SearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import OrganizeForm from '@/components/Form/OrganizeForm'; //
import OrganizeTable from '@/components/Table/OrganizeTable'; //
import ResultModal, { ErrorInfo } from '@/components/Modal/ResultModal'; //

import { actions, mapStateToProps } from '@/models/organize'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { PRIMARY } from '@/constants';

const TITLE = '部门';

const titleMap = {
  add: `新增${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ organize, }) => organize;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: OrganizeForm,
})
class Organize extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <div className={'fje '}>
        {/* <SearchForm></SearchForm> */}
        <div className={'btnWrapper'}>
          <Button
            type="primary"
            onClick={() => this.props.showFormModal({ action: 'add' })}
          >
            新增账户
          </Button>
        </div>
      </div>
    );
  };

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

    return <OrganizeTable {...tableProps}></OrganizeTable>;
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
      ' %c Organize 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="Organize">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartModal()}
      </div>
    );
  }
}

export default Organize;
