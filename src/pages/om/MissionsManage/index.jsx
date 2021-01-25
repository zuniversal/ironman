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
  MissionsClientForm,
} from '@/components/Form/MissionsManageActionForm'; //
import MissionsManageTable from '@/components/Table/MissionsManageTable'; //
import ClientForm from '@/components/Form/ClientForm';
import ContractForm from '@/components/Form/ContractForm';
import MissionsHouseNoTable from '@/components/Table/MissionsHouseNoTable';
import SmartInput from '@/common/SmartInput';

import { actions, mapStateToProps } from '@/models/missionsManage'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import WorkOrderTicketForm from '@/components/Form/WorkOrderForm';
import { tips } from '@/utils';
import moment from 'moment'; //

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
  missionsManageDetailAsync: '任务详情',
};

const detailFormMap = {
  missionsManageDetailAsync: MissionsManageForm,
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
        getClientAsync={params => this.props.getClientAsync({ name: params })}
        clientList={this.props.clientList}
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
            {...this.props.common.extraData}
          ></DetailForm>
        )}
      </SmartFormModal>
    );
  };

  formatData = data => {
    console.log(' formatData,  , ： ', data);
    const validateConfig = [
      'power_number',
      'meter_number',
      'incoming_line_name',
      'magnification',
      'transformer_capacity',
      'real_capacity',
      // 'outline_number',
      'voltage_level',
    ];
    validateConfig.forEach(v => {
      data[v];
    });
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

      const customer_id = res.customer ? null : this.props.clientItem.id;

      const repair_time = res.repair_time
        ? res.repair_time.format('YYYY-MM-DD HH:mm:ss')
        : null;
      console.log(' repair_time ： ', res, repair_time); //

      if (action === 'add') {
        this.props.addItemAsync({
          ...res,
          // customer_id: this.props.clientItem.id,
          customer_id,
          repair_time,
        });
      }
      // if (action === 'edit') {
      //   this.props.editItemAsync({
      //     ...res,
      //     customer_id,
      //   });
      // }
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
      getTeamLeaderAsync: params =>
        this.props.getTeamLeaderAsync({ value: params }),
      teamLeaderList: this.props.teamLeaderList,
      getServiceStaffAsync: params =>
        this.props.getServiceStaffAsync({ name: params }),
      serviceStaffList: this.props.serviceStaffList,
      clientData: this.props.clientData,
      selectClient: this.props.selectClient,
      clientItem: this.props.clientItem,
      onCancel: this.props.onCancel,
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
        plan_date: moment(this.props.itemDetail.plan_date),
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
    console.log(' formComProps ： ', formComProps, this.props); //

    const tableProps = {
      // dataSource: this.props.houseNoList,
      // count: this.props.houseNoCount,
      // getListAsync: this.props.getHouseNoAsync,
      // searchInfo: this.props.houseNoSearchInfo,
      dataSource: this.props.missionClientList,
      count: this.props.clientCount,
      getListAsync: this.props.getMissionClientAsync,
      selectClient: this.props.selectClient,
      getClientDetailAsync: this.props.getClientItemAsync,
      // getClientDetailAsync: params => this.props.getClientItemAsync({ ...params, }),
      searchInfo: this.props.clientSearchInfo,
      // showDetail: this.props.getItemAsync,
      // edit: this.props.getItemAsync,
      // remove: this.onRemove,
      // showFormModal: this.props.showFormModal,
      // showItemAsync: this.props.showItemAsync,
    };
    console.log(' tableProps ： ', tableProps, this.props.clientItem); //

    const {
      customer_admin = [],
      person,
      team_id,
      team = [],
      electricity_user = [],
    } = this.props.clientItem;

    const formInfo =
      this.props.action === 'detail'
        ? this.props.itemDetail
        : {
            // station_id: this.props.clientItem.,
            // addr: this.props.clientItem.address,
            addr:
              electricity_user && electricity_user.length > 0
                ? `${electricity_user[0]?.addr}`
                : null,
            customer_admin: customer_admin,
            // team: this.props.clientItem.team,
            // person: customer_admin[0]?.nickname,
            team_id: team && team.length > 0 ? `${team[0]?.id}` : null,
            repair_time: moment(),
            team,
            person,
            // team_id,
          };

    return (
      <MissionsManageForm
        {...formComProps}
        onFieldChange={this.onFormFieldChange}
        // houseNotable={this.renderHouseNoTable()}
        // missionsClientForm={this.renderMissionsClientForm()}
        onOk={this.onOk}
        init={formInfo}
        clientItem={this.props.clientItem}
        onChange={this.onClientChange}
        // onChange={(e, rest) => {
        //   console.log(' e ： ', e, e.target.value); //
        //   this.props.getHouseNoAsync({ keyword: e.target.value });
        // }}
        tableProps={tableProps}
      ></MissionsManageForm>
    );
  };
  // onChange = params => this.props.getHouseNoAsync({ keyword: e.target.value })
  // onClientChange = params => this.props.getClientAsync({ keyword: e.target.value })
  onClientChange = e =>
    this.props.getMissionClientAsync({ keyword: e.target.value });
  // renderHouseNoTable = e => {
  //   const tableProps = {
  //     dataSource: this.props.houseNoList,
  //     count: this.props.houseNoCount,
  //     getListAsync: this.props.getHouseNoAsync,
  //     selectClient: this.props.selectClient,
  //     getClientDetailAsync: this.props.getClientDetailAsync,
  //     // showDetail: this.props.getItemAsync,
  //     // edit: this.props.getItemAsync,
  //     // remove: this.onRemove,
  //     // showFormModal: this.props.showFormModal,
  //     // showItemAsync: this.props.showItemAsync,
  //   };
  //   return (
  //     <>
  //       <SmartInput onChange={this.onChange}></SmartInput>
  //       <MissionsHouseNoTable {...tableProps}></MissionsHouseNoTable>
  //     </>
  //   );
  // };
  // renderMissionsClientForm = e => {
  //   const formProps = {
  //     init: this.props.clientItem,
  //   };
  //   return <MissionsClientForm {...formProps}></MissionsClientForm>;
  // };
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
    const isMission = ['add', 'edit'].includes(this.props.action);
    const detailProps = isMission
      ? {
          footer: null,
        }
      : {}; //
    console.log('  detailProps ：', detailProps); //
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        size={this.size}
        isNoForm={this.isNoForm}
        {...detailProps}
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
    this.props.getMissionClientAsync();
    // this.props.getPowerAsync();
    // this.props.getAssetsAsync();
    this.props.getTeamAsync();
    this.props.getContractAsync(); //
    this.props.getHouseNoAsync(); //
    this.props.getServiceStaffAsync(); //
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
