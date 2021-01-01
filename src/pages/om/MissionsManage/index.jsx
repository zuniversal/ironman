import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import SearchForm from '@/common/SearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import MissionsManageForm from '@/components/Form/MissionsManageForm'; //
import MissionsManageSearchForm from '@/components/Form/MissionsManageSearchForm'; //
import {
  MissionsManageWorkOrderForm,
  MissionsManageContractForm,
  MissionsManageScheduleForm,
  MissionsManageConfirmScheduleForm,
  MissionsManageOrderInfoForm,
} from '@/components/Form/MissionsManageActionForm'; //
import MissionsManageTable from '@/components/Table/MissionsManageTable'; //
import ClientForm from '@/components/Form/ClientForm';
import ContractForm from '@/components/Form/ContractForm';

import { actions, mapStateToProps } from '@/models/missionsManage'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import WorkOrderTicketForm from '@/components/Form/WorkOrderForm';
import { tips } from '@/utils';

const TITLE = '任务';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  upload: `文件上传`,
  down: `文件下载`,
  startWorkOrder: '发起工单',
  linkContract: '关联合同',
  schedule: '排期',
  confirmSchedule: '确认排期',
  closeMission: `关闭${TITLE}`,
  clientDetail: '客户详情',
  contractDetail: '合同详情',
  orderInfoDetail: '发起工单详情',
  workOrderDetailAsync: '工单详情',
};

const detailFormMap = {
  workOrderDetailAsync: MissionsManageOrderInfoForm,
};

// const mapStateToProps = ({ missionsManage, }) => missionsManage;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: MissionsManageForm,
})
class MissionsManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      action: '',
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
      </div>
    );
  };
  renderSearchForm = params => {
    return (
      <MissionsManageSearchForm
        formBtn={this.renderFormBtn}
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
      ></MissionsManageSearchForm>
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
      showItemAsync: this.props.showItemAsync,
      closeMissionAsync: this.props.closeMissionAsync,
      showClientAsync: this.props.showClientAsync,
      showContractAsync: this.props.showContractAsync,
    };

    return <MissionsManageTable {...tableProps}></MissionsManageTable>;
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
            showItemAsync={this.props.showItemAsync}
          ></DetailForm>
        )}
      </SmartFormModal>
    );
  };

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { action, itemDetail, d_id } = this.props; //
    const { form, init } = props; //
    if (
      ['detail', 'clientDetail', 'contractDetail', 'orderInfoDetail'].includes(
        action,
      )
    ) {
      this.props.onCancel({});
      return;
    }
    if (action === 'closeMission') {
      this.props.closeMissionAsync({
        d_id,
        id: d_id,
      });
      return;
    }
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action); //
      if (action === 'startWorkOrder') {
        this.props.startWorkOrderAsync({
          ...res,
          task_id: d_id,
        });
      }
      if (action === 'linkContract') {
        this.props.linkContractAsync({
          ...res,
          id: d_id,
        });
      }
      if (action === 'schedule') {
        this.props.scheduleAsync({
          ...res,
          d_id,
          plan_date: res.plan_date.format('YYYY-MM-DD'),
        });
      }
      if (action === 'confirmSchedule') {
        this.props.confirmScheduleAsync({
          ...res,
          d_id: d_id,
        });
      }

      if (!res.station_id) {
        res.station_id = null;
      }
      if (!res.equipment_id) {
        res.equipment_id = null;
      }
      if (typeof res.file !== 'string') {
        console.log(' filefile ： ', res.file); //
        if (res.file && res.file.fileList.length > 0) {
          const fileList = res.file.fileList;
          // res.file = fileList[fileList.length - 1].response.url;
          res.file = fileList.map(v => v.response.url);
        }
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
      getClientAsync: params => {
        console.log(' getClientAsync params ： ', params); //
        return this.props.getClientAsync({ name: params });
      },
      clientList: this.props.clientList,
      getAssetsAsync: params =>
        this.props.getAssetsAsync({ station: params, page_size: 1000 }),
      assetsList: this.props.assetsList,
      getPowerAsync: params => this.props.getPowerAsync({ name: params }),
      powerList: this.props.powerList,
      getTeamAsync: params => this.props.getTeamAsync({ keyword: params }),
      teamList: this.props.teamList,
      getContractAsync: params =>
        this.props.getContractAsync({ keyword: params }),
      contractList: this.props.contractList,
      clientData: this.props.clientData,
    };
    if (action === 'clientDetail') {
      formComProps.init = this.props.clientDetail;
      return <ClientForm isDisabledAll {...formComProps}></ClientForm>;
    }
    if (action === 'contractDetail') {
      formComProps.init = this.props.contractDetail;
      return <ContractForm isDisabledAll {...formComProps}></ContractForm>;
    }
    if (action === 'closeMission') {
      return <div className="dfc">确认关闭任务？</div>;
    }
    if (action === 'schedule') {
      return (
        <MissionsManageScheduleForm
          {...formComProps}
        ></MissionsManageScheduleForm>
      );
    }
    if (action === 'confirmSchedule') {
      formComProps.init = {
        plan_date: this.props.itemDetail.plan_date,
      };
      return (
        <MissionsManageConfirmScheduleForm
          {...formComProps}
        ></MissionsManageConfirmScheduleForm>
      );
    }
    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }
    if (action === 'linkContract') {
      const { contract } = this.props.itemDetail;

      formComProps.init = {
        contract_id: `${contract && contract.id ? contract.id : ''}`,
      };

      return (
        <MissionsManageContractForm
          {...formComProps}
        ></MissionsManageContractForm>
      );
    }
    if (action === 'startWorkOrder') {
      return (
        <MissionsManageWorkOrderForm
          {...formComProps}
        ></MissionsManageWorkOrderForm>
      );
    }
    if (action === 'detail') {
      formComProps.isDisabledAll = true;
    }
    if (action === 'orderInfoDetail') {
      return (
        <MissionsManageOrderInfoForm
          {...formComProps}
        ></MissionsManageOrderInfoForm>
      );
    }
    console.log(' formComProps ： ', formComProps); //
    return (
      <MissionsManageForm
        {...formComProps}
        onFieldChange={this.onFormFieldChange}
      ></MissionsManageForm>
    );
  };
  onFormFieldChange = params => {
    console.log(' onFormFieldChange,  , ： ', params);
    if (params.value.customer_id) {
      console.log(' onFormFieldChange,  搜索 customer_id, ： ', params);
      params.form.setFieldsValue({
        station_id: '',
      });
      this.props.getPowerAsync({
        customer: params.value.customer_id,
        // page_size: 1000,
      });
    }
    if (params.value.station_id) {
      console.log(' onFormFieldChange,  搜索 station_id, ： ', params);
      params.form.setFieldsValue({
        equipment_id: '',
      });
      this.props.getAssetsAsync({
        station: params.value.station_id,
        // page_size: 1000,
      });
    }
  };
  get size() {
    // console.log(' get 取属 size ： ', this.state, this.props);
    return ['closeMission', 'linkContract', 'schedule', 'confirmSchedule'].some(
      v => v === this.props.action,
    )
      ? 'small'
      : 'default';
  }
  get isNoForm() {
    // console.log(' get 取属 isNoForm ： ', this.state, this.props);
    return ['closeMission'].some(v => v === this.props.action);
  }
  renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        size={this.size}
        isNoForm={this.isNoForm}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };
  componentDidMount() {
    // this.props.getEnumListAsync({
    //   model: '任务管理',
    //   name: '任务类型',
    // });
    // this.props.getEnumListAsync({
    //   model: '任务管理',
    //   name: '工单类型',
    // });
    this.props.getClientAsync();
    // this.props.getPowerAsync();
    // this.props.getAssetsAsync();
    this.props.getTeamAsync();
    this.props.getContractAsync(); //
  }

  render() {
    // return (
    //   <MissionsManageOrderInfoForm
    //     getWorkOrderDetailAsync={this.getWorkOrderDetailAsync}
    //   ></MissionsManageOrderInfoForm>
    // );
    // return (
    //   <MissionsManageOrderInfoForm
    //     init={{}}
    //   ></MissionsManageOrderInfoForm>
    // );
    // return <WorkOrderTicketForm></WorkOrderTicketForm>;
    return (
      <div className="MissionsManage">
        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

        {this.renderCommonModal()}
      </div>
    );
  }
}

export default MissionsManage;
