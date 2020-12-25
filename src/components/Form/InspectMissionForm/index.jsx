import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import { dayHours } from '@/configs';

const InspectMissionForm = props => {
  console.log(' InspectMissionForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getClientAsync,
      selectData: props.clientList,
      itemProps: {
        label: '客户',
        name: 'customer_id',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getPowerAsync,
      selectData: props.powerList,
      itemProps: {
        label: '电站',
        name: 'station_id',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '班组',
        name: 'team_id',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '执行日期',
        name: 'work_date',
      },
    },
    {
      formType: 'Search',
      selectData: dayHours,
      itemProps: {
        label: '执行时间',
        name: 'work_time',
      },
      // comProps: {
      //   mode: 'multiple',
      // },
    },
  ];

  return (
    <div className={' InspectMissionForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

InspectMissionForm.defaultProps = {};

export default InspectMissionForm;
