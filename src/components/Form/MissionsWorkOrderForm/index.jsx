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

const MissionsWorkOrderForm = props => {
  console.log(' MissionsWorkOrderForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '客户',
      },
    },
    {
      itemProps: {
        label: '名称',
      },
    },
    {
      itemProps: {
        label: '类型',
      },
    },
    {
      itemProps: {
        label: '分配给',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsWorkOrderForm '}>
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

MissionsWorkOrderForm.defaultProps = {};

export default MissionsWorkOrderForm;
