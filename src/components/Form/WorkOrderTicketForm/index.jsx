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






const WorkOrderTicketForm = props => {
  console.log(' WorkOrderTicketForm ： ', props); //
  const {formBtn, ...rest } = props// 

    
  const config = [
    {
      itemProps: {
        label: '添加工作票',
      },
    },
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
      itemProps: {
        label: '类型',
      },
    },
    {
      itemProps: {
        label: '工作内容',
      },
    },
    {
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
