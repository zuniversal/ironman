import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import ShiftsTransferTable from '@/components/Table/ShiftsTransferTable'; //
import ShiftsTransferForm from '@/components/Form/ShiftsTransferForm'; //
import ShiftsTransferSearchForm from '@/components/Form/ShiftsTransferSearchForm'; //
import ShiftsTransferDetailForm from '@/components/Form/ShiftsTransferDetailForm'; //
import ShiftsTransferHandInForm from '@/components/Form/ShiftsTransferHandInForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //

import { actions, mapStateToProps } from '@/models/shiftsTransfer'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { teamTypeMap } from '@/configs';

const TITLE = '交接班';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
};

// const mapStateToProps = ({ shiftsTransfer, }) => shiftsTransfer;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: ShiftsTransferHandInForm,
})
class ShiftsTransfer extends PureComponent {
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
    return (
      <div className={'btnWrapper'}>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出{TITLE}数据
        </Button>
      </div>
    );
  };
  renderSearchForm = params => {
    console.log(
      ' %c renderSearchForm 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    ); //
    return (
      <ShiftsTransferSearchForm
        formBtn={this.renderFormBtn}
        getUser={this.props.getUserAsync}
        getPower={this.props.getPowerAsync}
        userList={this.props.userList}
        powerList={this.props.powerList}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        getTeamAsync={this.props.getTeamAsync}
        teamList={this.props.teamList}
      ></ShiftsTransferSearchForm>
    );
  };

  // showTransferDetail = params => {
  //   console.log(' showTransferDetail,  , ： ', params);
  //   this.props.showFormModal({
  //     ...params,
  //     formModalProps: {
  //       top: (
  //         <div className="fje btnWrapper ">
  //           <Button type="primary " onClick={() => this.props.exportData()}>
  //             导出数据
  //           </Button>
  //         </div>
  //       ),
  //     },
  //   });
  // };

  renderTable = params => {
    const tableProps = {
      onSelectChange: this.props.onSelectChange,
      dataSource: this.props.dataList,
      count: this.props.count,
      searchInfo: this.props.searchInfo,
      getListAsync: this.props.getListAsync,
      showDetail: this.props.getItemAsync,
      edit: this.props.getItemAsync,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,

      // showTransferDetail: this.showTransferDetail,
    };

    return <ShiftsTransferTable {...tableProps}></ShiftsTransferTable>;
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail } = this.props; //
    const { form, init } = props; //
    if (action === 'detail') {
      this.props.onCancel({});
      return;
    }
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
    const { action, itemDetail } = this.props; //
    const formComProps = {
      action,
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
    };
    if (action !== 'add') {
      const radioInit = {};
      if (itemDetail.type == 1) {
        new Array(20).fill(false).forEach((v, i) => {
          // console.log(' i, radioInit, v ： ', i, radioInit, v,  )//
          radioInit[`radio${i}`] = v;
        });
        itemDetail.dispatch_options.split(',').map((v, i) => {
          radioInit[`radio${i + 1}`] = v ? v : false;
        });
        console.log(' radioInit ： ', radioInit); //
      }
      formComProps.init = {
        ...itemDetail,
        type: teamTypeMap[itemDetail.type],
        handover_time: itemDetail.handover_time
          ? itemDetail.handover_time.split('T')[0]
          : null,
        ...radioInit,
        // [`radio1`]: false
        // dispatch_options: itemDetail.type == 1 ? : [],
      };
    }
    console.log(' formComProps ： ', formComProps, itemDetail, itemDetail.type); //
    if (itemDetail.type == 0) {
      return <ShiftsTransferForm {...formComProps}></ShiftsTransferForm>;
    } else if (itemDetail.type == 1) {
      return (
        <ShiftsTransferDetailForm {...formComProps}></ShiftsTransferDetailForm>
      );
    }
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
    this.props.getUserAsync(); //
    this.props.getTeamAsync(); //
  }

  render() {
    return (
      <div className="ShiftsTransfer">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}
      </div>
    );
  }
}

export default ShiftsTransfer;
