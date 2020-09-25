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
import { formatConfig } from '@/utils'//


const choiceRadios = [
  { label: '是', value: 'yes', key: 'yes',  },
  { label: '否', value: 'no', key: 'no',  },
]


const config = [
  {
    itemProps: {
      label: '单号',
    },
  },
  {
    itemProps: {
      label: '工单类型',
    },
  },
  {
    itemProps: {
      label: '客户',
    },
  },
  {
    formType: 'Radio',
    noRule: true,
    itemProps: {
      label: '类型',
    },
    radioData: choiceRadios,
    opType: 'group',
  },
  {
    itemProps: {
      label: '工作内容',
    },
  },
  {
    formType: 'TextArea',
    itemProps: {
      label: '安全措施',
    },
  },
  {
    itemProps: {
      label: '施工日期',
    },
  },
  {
    itemProps: {
      label: '施工人员',
    },
  },
  {
    itemProps: {
      label: '施工负责人',
    },
  },
  {
    itemProps: {
      label: '天气',
    },
  },

  
];



const WorkOrderActionForm = props => {
  console.log(' WorkOrderActionForm ： ', props); //
  const {formBtn, ...rest } = props// 
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' WorkOrderActionForm '}>
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

WorkOrderActionForm.defaultProps = {};

export default WorkOrderActionForm;
