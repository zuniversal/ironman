import React, { Component, PureComponent } from 'react';
import './style.less';

import { Form, Input, Button, Checkbox, Menu, Upload, Result } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import SearchForm from '@/common/SearchForm'; //
import VisitManageWaitTable from '@/components/Table/VisitManageWaitTable'; //
import VisitManageRecordTable from '@/components/Table/VisitManageRecordTable'; //
import VisitManageForm from '@/components/Form/VisitManageForm'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //

import { actions, mapStateToProps } from '@/models/visitManage'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

const TITLE = '物料';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ VisitManage, }) => VisitManage;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: VisitManageForm,
})
class VisitManage extends PureComponent {
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
      onSelectChange: this.props.onSelectChange,
      dataSource: this.props.dataList,
      count: this.props.count,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
    };

    return <VisitManageWaitTable {...tableProps}></VisitManageWaitTable>;
    return <VisitManageRecordTable {...tableProps}></VisitManageRecordTable>;
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
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };

  renderModalContent = e => {
    console.log('    renderModalContent ： ', e, this.state, this.props);
    const { action } = this.props; //
    const formComProps = {
      action,
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      getClientAsync: params => this.props.getClientAsync({ keyword: params }),
      clientList: this.props.clientList,
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <VisitManageForm {...formComProps}></VisitManageForm>;
  };
  renderSmartFormModal = params => {
    console.log(' renderSmartFormModal ： ', params, this.state, this.props);
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
      <div className="VisitManage">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default VisitManage;
