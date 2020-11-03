import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //

export const MissionsManageWorkOrderForm = props => {
  console.log(' MissionsManageWorkOrderForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getClientAsync,
      selectData: props.clientData,
      itemProps: {
        label: '客户',
        name: 'client',
      },
      comProps: {
        // disabled: true,
      },
    },
    {
      itemProps: {
        label: '名称',
        name: 'name',
      },
    },
    {
      // formType: 'Search',
      // selectData: props.userList,
      itemProps: {
        label: '类型',
        name: 'type',
      },
      comProps: {
        // disabled: true,
      },
    },
    {
      // formType: 'Search',
      // selectSearch: props.getTeamAsync,
      // selectData: props.teamList,
      itemProps: {
        label: '分配给',
        name: 'team_id',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageWorkOrderForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageWorkOrderForm.defaultProps = {};

export const MissionsManageContractForm = props => {
  console.log(' MissionsManageContractForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getContractAsync,
      selectData: props.contractList,
      itemProps: {
        label: '选择合同',
        name: 'contract_id',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageContractForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        size={'small'}
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageContractForm.defaultProps = {};

export const MissionsManageScheduleForm = props => {
  console.log(' MissionsManageScheduleForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '选择日期',
        name: 'plan_date',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageScheduleForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        size={'small'}
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageScheduleForm.defaultProps = {};

const scheduleRadios = [
  { label: '通过', value: 'yes', key: 'yes' },
  { label: '驳回', value: 'no', key: 'no' },
];

export const MissionsManageConfirmScheduleForm = props => {
  console.log(' MissionsManageConfirmScheduleForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Radio',
      radioData: scheduleRadios,
      itemProps: {
        label: '确认排期',
        name: '',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '理由',
        name: '',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageConfirmScheduleForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        size={'small'}
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageConfirmScheduleForm.defaultProps = {};
