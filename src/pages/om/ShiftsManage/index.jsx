import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import ShiftsManageTable from '@/components/Table/ShiftsManageTable'; //
import ShiftsManageForm from '@/components/Form/ShiftsManageForm'; //
import ShiftsManageSearchForm from '@/components/Form/ShiftsManageSearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //

import { actions, mapStateToProps } from '@/models/shiftsManage'; //
import SmartHOC from '@/common/SmartHOC';
import { history, connect } from 'umi';
import { SHIFTSARRANGE } from '@/constants';
import { nowYearMonth, tips } from '@/utils';
import moment from 'moment';

const TITLE = '班组';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  shiftsManageDetailAsync: `班组详情`,
};

const detailFormMap = {
  shiftsManageDetailAsync: ShiftsManageForm,
};

// const mapStateToProps = ({ shiftsManage, user }) => ({
//   ...shiftsManage,
//   teamList: user.dataList,
// });

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

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
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
          // disabled
          onClick={() => this.props.showFormModal({ action: 'add' })}
          disabled={this.props.authInfo.create !== true}
        >
          新增{TITLE}
        </Button>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出{TITLE}数据
        </Button>
        {/* <Button type="primary" onClick={() => this.props.onBatchRemove()}> */}
        <Button
          type="primary"
          disabled={this.props.authInfo.delete !== true}
          onClick={this.onBatchRemove}
        >
          删除
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <ShiftsManageSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></ShiftsManageSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    this.props.getListAsync(params.formData);
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
    // this.props.removeItemsAsync({ id: `${params.record.id}` });
    this.props.onRemove({
      d_id: `${params.record.id}`,
      id: `${params.record.id}`,
    });
  };
  onBatchRemove = params => {
    console.log(' onBatchRemove    ： ', params, this.state, this.props);
    // if (this.props.selectedRowKeys.length > 0) {
    //   this.props.removeItemsAsync({
    //     id: `${this.props.selectedRowKeys.join(',')}`,
    //   });
    // } else {
    //   tips('请您选中数据！', 2);
    // }
    this.props.onBatchRemove({
      id: `${this.props.selectedRowKeys.join(',')}`,
    });
  };

  goPage = params => {
    console.log(' goPage,  , ： ', params, this.state, this.props);
    this.props.dispatch({
      type: 'shiftsArrange/setSearchAsync',
      payload: {
        team: `${params.id}`,
        teamName: params.name,
        // schedule_date: nowYearMonth,
        schedule_date: moment(),
      },
    });
    const page = `${SHIFTSARRANGE}team=${params.id}&name=${params.name}&schedule_date=${nowYearMonth}`;
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
      authInfo: this.props.authInfo,
      searchInfo: this.props.searchInfo,
      getListAsync: this.props.getListAsync,
      // edit: this.props.showFormModal,
      // edit: this.showFormModal,
      edit: this.props.getItemAsync,
      // remove: this.props.onRemove,
      remove: this.onRemove,
      goPage: this.goPage,
      showFormModal: this.props.showFormModal,
      showItemAsync: this.props.showItemAsync,
    };

    return <ShiftsManageTable {...tableProps}></ShiftsManageTable>;
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
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      console.log('  对吗  .length ', res.member);
      if (res.member.length > 5) {
        tips('最多添加5个组员！', 2);
        return;
      }
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
      this.props.authInfo,
    ); //
    // this.props.dispatch(actions.getUserAsync());
    this.props.getUserAsync({ page_size: 1000 }); //
    // this.props.getTeamAsync({}); //
    // this.props.getUserAsync({ page: 1, page_size: 50 }); //
  }

  render() {
    return (
      <div className="ShiftsManage">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default ShiftsManage;
