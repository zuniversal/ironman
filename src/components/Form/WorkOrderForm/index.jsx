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
      itemProps: {
        label: '类型',
        name: 'type',
      },
    },
    {
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },
    {
      itemProps: {
        label: '创建时间',
        name: '',
      },
    },
    {
      itemProps: {
        label: '客户',
        name: 'customer.name',
      },
    },
    {
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
    {
      itemProps: {
        label: '反馈人',
        name: 'customer.name',
      },
    },
    {
      itemProps: {
        label: '反馈电话',
        name: '',
      },
    },
    {
      itemProps: {
        label: '详细内容',
        name: 'job_content',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: createArr(12).map((v, i) => (
        <WeakDetailImg key={i}></WeakDetailImg>
      )),
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
      itemProps: {
        label: '处理人',
        name: 'person_liable',
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
      CustomCom: createArr(4).map((v, i) => (
        <WeakDetailImg key={i}></WeakDetailImg>
      )),
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
