import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';

const datas = [
  {
    title: '20200808 10:10',
    description:
      '李四因巡检员身体欠佳原因将任务巡检日期由20200810 调整成20200810',
  },
  {
    title: '20200808 10:10',
    description:
      '李四因巡检员身体欠佳原因将任务巡检日期由20200810 调整成20200810',
  },
];

const InspectMissionDetailForm = props => {
  console.log(' InspectMissionDetailForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    {
      itemProps: {
        label: '名称',
        name: 'name',
      },
    },
    {
      itemProps: {
        label: '电站',
        name: ['plan', 'station', 'name'],
      },
    },
    {
      itemProps: {
        label: '当前状态',
        name: 'status',
      },
    },
    {
      itemProps: {
        label: '创建日期',
        name: 'created_time',
      },
    },
    {
      itemProps: {
        label: '客户名称',
        name: ['customer', 'name'],
      },
    },
    {
      itemProps: {
        label: '领取人',
        name: ['team', 'team_headman'],
      },
    },
    {
      itemProps: {
        label: '领取时间',
        name: 'assign_date',
      },
    },
    {
      itemProps: {
        label: '开始时间',
        name: 'start_time',
      },
    },
    {
      itemProps: {
        label: '完成时间',
        name: 'end_time',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        // <InspectMissionTimeline datas={datas}></InspectMissionTimeline>
        <InspectMissionTimeline
          datas={props.init?.task_log}
        ></InspectMissionTimeline>
      ),
      itemProps: {
        label: '任务日志',
        name: 'task_log',
      },
    },
  ];

  return (
    <div className={' inspectMissionDetailForm '}>
      <SmartForm config={config} noRuleAll isDisabledAll {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

InspectMissionDetailForm.defaultProps = {};

export default InspectMissionDetailForm;
