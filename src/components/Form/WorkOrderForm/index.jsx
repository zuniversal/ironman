import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import WeakDetailImg from '@/components/Widgets/WeakDetailImg'; //
import { regoins, workOrderStatusConfig } from '@/configs'; //
import { formatConfig, createArr } from '@/utils'; //
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';
import SmartImg from '@/common/SmartImg';

const choiceRadios = [
  { label: '种类1', value: 'yes', key: 'yes' },
  { label: '种类2', value: 'no', key: 'no' },
];

const WorkOrderTicketForm = props => {
  console.log(' WorkOrderTicketForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const { task = {}, file } = props.init;
  const buildFile = file ? file : [];
  const responseFile = task.file ? task.file : [];
  console.log(
    ' buildFile, file ： ',
    buildFile,
    responseFile,
    props.init,
    task,
    props.init.work_log,
  ); //

  const logTimeLine = [
    {
      formType: 'CustomCom',
      CustomCom: (
        <InspectMissionTimeline
          datas={props.init.work_log}
        ></InspectMissionTimeline>
      ),
      itemProps: {
        label: '任务日志',
        name: ' ',
      },
    },
  ];

  const clientConfig = [
    {
      formType: 'rowText',
      itemProps: {
        label: '客户评价',
      },
    },
    {
      itemProps: {
        label: '评价等级',
        name: ['evaluate', 'level'],
      },
    },
    {
      itemProps: {
        label: '评价内容',
        name: ['evaluate', 'content'],
      },
    },
  ];

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息',
      },
    },
    {
      itemProps: {
        label: '标题',
        name: 'name',
      },
    },
    {
      // formType: 'Search',
      // // selectData: props.userList,
      itemProps: {
        label: '类型',
        name: 'type',
      },
    },
    {
      // formType: 'Search',
      // selectData: workOrderStatusConfig,
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },
    {
      itemProps: {
        label: '创建时间',
        name: 'created_time',
      },
    },
    {
      // formType: 'Search',
      // // selectSearch: props.getUserAsync,
      // selectData: props.userList,
      itemProps: {
        label: '客户',
        name: ['task', 'customer', 'name'],
      },
    },
    {
      // formType: 'Search',
      // // selectSearch: props.getPowerAsync,
      // selectData: props.powerList,
      itemProps: {
        label: '设备id',
        name: ['task', 'equipments', 'name'],
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '反馈信息',
      },
    },
    // 反馈人是填客户的账号信息
    {
      itemProps: {
        label: '反馈人',
        name: ['task', 'contacts'],
      },
    },
    {
      itemProps: {
        label: '反馈电话',
        name: ['task', 'contacts_phone'],
      },
    },
    {
      itemProps: {
        label: '详细内容',
        name: ['task', 'describe'],
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          {/* {createArr(12).map((v, i) => (
            <WeakDetailImg key={i}></WeakDetailImg>
          ))} */}
          {responseFile.map((v, i) => (
            // <img src={v} className={`detailImg`} key={i} />
            <SmartImg src={v} key={i} />
          ))}
        </>
      ),
      itemProps: {
        label: '反馈图片',
        name: ['task', 'file'],
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '派单信息',
      },
    },
    {
      // formType: 'Search',
      // selectSearch: props.getTeamAsync,
      // selectData: props.teamList,
      itemProps: {
        label: '处理人',
        name: ['team', 'team_headman'],
      },
    },
    {
      itemProps: {
        label: '领取时间',
        name: 'receiving_time',
      },
    },
    {
      itemProps: {
        label: '处理时间',
        // name: 'commencement_date',
        name: 'finish_time',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          {/* {createArr(4).map((v, i) => (
            <WeakDetailImg key={i}></WeakDetailImg>
          ))} */}
          {buildFile.map((v, i) => (
            // <img src={v} className={`detailImg`} key={i} />
            <SmartImg src={v} key={i} />
          ))}
        </>
      ),
      itemProps: {
        label: '施工图片',
        name: 'file',
      },
    },
    // ...  ? clientConfig : [],
    ...clientConfig,
    ...(props.action === 'detail' ? logTimeLine : []),
  ];

  return (
    <div className={' WorkOrderTicketForm '}>
      <SmartForm
        config={config}
        isDisabledAll
        noRuleAll
        // {...rest}
        {...props}
      ></SmartForm>

      {/* {formBtn} */}
    </div>
  );
};

WorkOrderTicketForm.defaultProps = {};

export default WorkOrderTicketForm;
