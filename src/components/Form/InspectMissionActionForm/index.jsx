import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';

const renderCheckboxOp = [{ label: '短信通知客户', value: 'yes', key: 'yes' }];

export const InspectMissionAssignForm = props => {
  const config = [
    {
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '分配给',
        name: 'team_id',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return (
    <SmartForm
      config={config}
      size={'small'}
      // noRuleAll
      {...props}
    ></SmartForm>
  );
};

InspectMissionAssignForm.defaultProps = {};

export const InspectMissionEditDateForm = props => {
  const config = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '选择日期',
        name: 'date',
      },
      comProps: {
        className: 'w-280',
      },
    },
    {
      formType: 'Checkbox',
      noRule: true,
      itemProps: {
        label: '',
        className: 'centerFormItem',
      },
      // checkboxContent: '短信通知客户',
      checkboxData: renderCheckboxOp,
      // noLabel: true,
      comProps: {
        labelCol: {
          xs: { span: 0 },
          sm: { span: 0 }, //
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 }, //
        },
      },
    },
  ];

  return (
    <SmartForm
      config={config}
      size={'small'}
      // noRuleAll
      {...props}
    ></SmartForm>
  );
};

InspectMissionEditDateForm.defaultProps = {};
