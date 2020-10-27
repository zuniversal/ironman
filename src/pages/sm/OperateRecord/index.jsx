import React, { Component, PureComponent } from 'react';
import './style.less';

import { Form, Input, Button, Checkbox, Menu, Upload, Result } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import SearchForm from '@/common/SearchForm'; //
import OperateRecordTable from '@/components/Table/OperateRecordTable'; //
import OperateRecordForm from '@/components/Form/OperateRecordForm'; //
import OperateRecordSearchForm from '@/components/Form/OperateRecordSearchForm'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //

import { actions, mapStateToProps } from '@/models/operateRecord'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '操作记录';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ operateRecord, }) => operateRecord;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: OperateRecordForm,
})
class OperateRecord extends PureComponent {
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
        <OperateRecordSearchForm></OperateRecordSearchForm>
        <div className={'btnWrapper'}>
          <SearchForm></SearchForm>
          <Button type="primary" onClick={() => this.props.exportData()}>
            导出{TITLE}数据
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

    return <OperateRecordTable {...tableProps}></OperateRecordTable>;
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
      ' %c OperateRecord 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const { show, title, action, titleMap } = this.state; //

    const formComProps = {
      getCapture: this.showCapture,
      action: this.state.action,
    };

    return (
      <div className="OperateRecord">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartModal()}

        {/* <SmartFormModal
          // width={'900px'}
          formComProps={{...tableProps, ...formComProps, action, }} 

          title={title}
          show={show}
          onOk={this.onOk}
          onCancel={this.onCancel}
          show={show}
          FormCom={this.renderModalForm()}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        ></SmartFormModal> */}
      </div>
    );
  }
}

export default OperateRecord;
