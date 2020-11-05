import React, { Component, PureComponent } from 'react';
import './style.less';

import { Form, Input, Button, Checkbox, Menu, Upload, Result } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import SearchForm from '@/common/SearchForm'; //
import ShiftsManageTable from '@/components/Table/ShiftsManageTable'; //
import ShiftsManageForm from '@/components/Form/ShiftsManageForm'; //
import ShiftsManageSearchForm from '@/components/Form/ShiftsManageSearchForm'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //

import {
  actions,
  // mapStateToProps
} from '@/models/shiftsManage'; //
import { arrangeActions } from '@/models/shiftsArrange'; //
import SmartHOC from '@/common/SmartHOC';
import { history, connect } from 'umi';
import { SHIFTSARRANGE } from '@/constants';
import { nowYearMonth, tips } from '@/utils';

const TITLE = '班组';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
};

const mapStateToProps = ({ shiftsManage, user }) => ({
  ...shiftsManage,
  teamList: user.dataList,
});

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: ShiftsManageForm,
})
class ShiftsManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      titleMap,
    };
  }

  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
  };
  renderFormBtn = params => {
    console.log(' renderFormBtn ： ', params); //
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
        <Button
          type="primary"
          // onClick={() =>
          //   this.props.showFormModal({
          //     action: 'add',
          //     formComProps: {
          //       userList: this.props.userList,
          //       getUser: params => this.props.getUserAsync({ keyword: params }),
          //       // getUser: params => {
          //       //   console.log(' params ： ', params); //
          //       //   this.props.dispatch(actions.getUserAsync(params));
          //       // },
          //     },
          //   })
          // }
          onClick={() => this.props.showFormModal({ action: 'add' })}
        >
          新增{TITLE}
        </Button>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出{TITLE}数据
        </Button>
        {/* <Button type="primary" onClick={() => this.props.onBatchRemove()}> */}
        <Button type="primary" onClick={() => this.onBatchRemove()}>
          删除
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <ShiftsManageSearchForm
        formBtn={this.renderFormBtn}
        onFieldChange={this.onFieldChange}
      ></ShiftsManageSearchForm>
    );
  };

  showFormModal = params => {
    console.log(' showFormModalshowFormModal    ： ', params);
    this.props.showFormModal({
      ...params,
      formComProps: {
        userList: this.props.userList,
        getUser: params => this.props.getUserAsync({ keyword: params }),
        // getUser: params => {
        //   console.log(' params ： ', params); //
        //   this.props.dispatch(actions.getUserAsync(params));
        // },
      },
    });
  };
  onRemove = params => {
    console.log(' onRemove    ： ', params);
    this.props.removeItemsAsync({ id: `${params.record.id}` });
  };
  onBatchRemove = params => {
    console.log(' onBatchRemove    ： ', params, this.state, this.props);
    console.log(
      '  对吗  this.props.selectedRowKeys.length ',
      this.props.selectedRowKeys.length,
    );
    if (this.props.selectedRowKeys.length > 0) {
      this.props.removeItemsAsync({
        id: `${this.props.selectedRowKeys.join(',')}`,
      });
    } else {
      tips('请您选中数据！', 2);
    }
  };

  goPage = params => {
    console.log(' goPage,  , ： ', params, this.state, this.props);
    this.props.dispatch({
      type: 'shiftsArrange/setSearchAsync',
      payload: {
        team: params.id,
        // schedule_date: nowYearMonth,
      },
    });
    const page = `${SHIFTSARRANGE}team=${params.id}&schedule_date=${nowYearMonth}`;
    history.push(page);
  };
  renderTable = params => {
    const tableProps = {
      onPageChange: this.props.onPageChange,
      onSelectChange: this.props.onSelectChange,
      // tdClick: this.props.showFormModal,
      showDetail: this.props.getItemAsync,
      dataSource: this.props.dataList,
      count: this.props.count,
      getListAsync: this.props.getListAsync,
      // edit: this.props.showFormModal,
      // edit: this.showFormModal,
      edit: this.props.getItemAsync,
      // remove: this.props.onRemove,
      remove: this.onRemove,
      goPage: this.goPage,
      showFormModal: this.props.showFormModal,
    };

    return <ShiftsManageTable {...tableProps}></ShiftsManageTable>;
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
          ...itemDetail,
          ...res,
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
    };
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <ShiftsManageForm {...formComProps}></ShiftsManageForm>;
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
    console.log(
      ' ShiftsManage 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    // this.props.dispatch(actions.getUserAsync());
    this.props.getUserAsync(); //
  }

  render() {
    return (
      <div className="ShiftsManage">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default ShiftsManage;
