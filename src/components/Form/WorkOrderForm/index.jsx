import React from 'react';
import './style.less';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
} from 'antd';

import SmartForm from '@/common/SmartForm'; //
import WeakDetailImg from '@/components/Widgets/WeakDetailImg'; //
import { regoins } from '@/configs'; //
import { formatConfig, createArr } from '@/utils'; //

const choiceRadios = [
  { label: '种类1', value: 'yes', key: 'yes' },
  { label: '种类2', value: 'no', key: 'no' },
];

const WorkOrderTicketForm = props => {
  console.log(' WorkOrderTicketForm ： ', props); //
  const { formBtn, ...rest } = props; //

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
      formType: 'Search',
      selectData: props.userList,
      itemProps: {
        label: '类型',
        name: 'type',
      },
    },
    {
      formType: 'Search',
      selectData: props.userList,
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
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '客户',
        name: 'customer.name',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getPowerAsync,
      selectData: props.powerList,
      itemProps: {
        label: '设备id',
        name: 'task.id',
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
        name: 'account.name',
      },
    },
    {
      itemProps: {
        label: '反馈电话',
        name: 'contacts_phone',
      },
    },
    {
      itemProps: {
        label: '详细内容',
        name: 'content',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          {createArr(12).map((v, i) => (
            <WeakDetailImg key={i}></WeakDetailImg>
          ))}
        </>
      ),
      itemProps: {
        label: '反馈图片',
        name: 'task.file',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '派单信息',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '处理人',
        // name: 'recipient.name',
        name: ['recipient', 'nickname'],
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
        name: 'commencement_date',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          {createArr(4).map((v, i) => (
            <WeakDetailImg key={i}></WeakDetailImg>
          ))}
        </>
      ),
      itemProps: {
        label: '施工图片',
        name: 'file',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '客户评价',
      },
    },
    {
      itemProps: {
        label: '评价等级',
        name: 'evaluate.level',
      },
    },
    {
      itemProps: {
        label: '评价内容',
        name: 'evaluate.content',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' WorkOrderTicketForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

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
