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
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const choiceRadios = [
  { label: '种类1', value: 'yes', key: 'yes' },
  { label: '种类2', value: 'no', key: 'no' },
];

const WorkOrderTicketForm = props => {
  console.log(' WorkOrderTicketForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '单号',
        name: 'code',
      },
    },
    {
      itemProps: {
        label: '工单类型',
        name: 'type',
      },
    },
    {
      itemProps: {
        label: '客户',
        name: 'customer_id',
      },
    },
    {
      radioData: choiceRadios,
      formType: 'Radio',
      itemProps: {
        label: '类型',
        name: 'type',
      },
    },
    {
      itemProps: {
        label: '工作内容',
        name: 'job_content',
      },
    },
    {
      itemProps: {
        label: '安全措施',
        name: 'safety_measure',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '施工日期',
        name: 'work_date',
      },
    },
    {
      itemProps: {
        label: '施工人员',
        name: 'team_id',
      },
    },
    {
      itemProps: {
        label: '施工负责人',
        name: 'person_liable',
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

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

WorkOrderTicketForm.defaultProps = {};

export default WorkOrderTicketForm;
