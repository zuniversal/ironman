import React from 'react';

import SmartForm from '@/common/SmartForm';
import WeakDetailImg from '@/components/Widgets/WeakDetailImg';
import { fullFormLayouts, workOrderStatusConfig } from '@/configs';
import { formatConfig, createArr } from '@/utils';
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';
import OrderConsumeTable from '@/components/Table/OrderConsumeTable';
import SmartImg from '@/common/SmartImg';

const WorkOrderTicketForm = props => {
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
  );

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

    // {
    //   formType: 'CustomCom',
    //   CustomCom: (
    //     <>
    //       {buildFile.map((v, i) => (
    //         // <img src={v} className={`detailImg`} key={i} />
    //         <SmartImg src={v} key={i} />
    //       ))}
    //     </>
    //   ),
    //   itemProps: {
    //     label: '使用耗材',
    //     name: '',
    //   },
    // },

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
    {
      formType: 'TextArea',
      itemProps: {
        label: '事故描述',
        name: ['order_record', 0, 'describe'],
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '事故排查',
        name: ['order_record', 0, 'investigation'],
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '事故处理',
        name: ['order_record', 0, 'handle'],
      },
    },

    {
      formType: 'TextArea',
      itemProps: {
        label: '事故措施与建议',
        name: ['order_record', 0, 'proposal'],
      },
    },
    {
      itemProps: {
        label: '是否完成任务',
        name: ['order_record', 0, 'is_finish'],
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '使用耗材',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <OrderConsumeTable
          dataSource={props.extraReqData}
          rowSelection={null}
          noActionCol
        ></OrderConsumeTable>
      ),
      itemProps: {
        label: '',
        name: 'file',
        ...fullFormLayouts,
      },
    },
    // ...  ? clientConfig : [],
    ...clientConfig,
    // ...(props.action === 'detail' ? logTimeLine : []),
  ];

  return (
    <SmartForm config={config} isDisabledAll noRuleAll {...props}></SmartForm>
  );
};

WorkOrderTicketForm.defaultProps = {};

export default WorkOrderTicketForm;
