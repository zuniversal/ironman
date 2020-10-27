import React, { Component, PureComponent } from 'react';
import './style.less';

import { Button } from 'antd';

import SmartModal from '@/common/SmartModal'; //
import SearchForm from '@/common/SearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import SmOrganizeForm from '@/components/Form/SmOrganizeForm'; //
import SmOrganizeTable from '@/components/Table/SmOrganizeTable'; //

import { actions, mapStateToProps } from '@/models/smOrganize'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '部门';

const titleMap = {
  add: `新增${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ smOrganize, }) => smOrganize;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: SmOrganizeForm,
})
class SmOrganize extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <div className={'fsb '}>
        <SearchForm></SearchForm>
        <div className={'btnWrapper'}>
          <Button
            type="primary"
            onClick={() => this.props.showFormModal({ action: 'add' })}
          >
            新增{TITLE}
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

    return <SmOrganizeTable {...tableProps}></SmOrganizeTable>;
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
      ' %c SmOrganize 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );

    return (
      <div className="SmOrganize">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartModal()}
      </div>
    );
  }
}

export default SmOrganize;
