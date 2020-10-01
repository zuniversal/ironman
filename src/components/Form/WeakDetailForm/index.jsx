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
import { formatConfig } from '@/utils'; //

const WeakDetailForm = props => {
  console.log(' WeakDetailForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '名称',
      },
    },
    {
      itemProps: {
        label: '电站',
      },
    },
    {
      itemProps: {
        label: '客户',
      },
    },
    {
      itemProps: {
        label: '登记日期',
      },
    },
    {
      itemProps: {
        label: '状态',
      },
    },
    {
      itemProps: {
        label: '巡检人',
      },
    },
    {
      itemProps: {
        label: '巡检组长',
      },
    },
    {
      itemProps: {
        label: '缺陷描述',
      },
    },
    {
      itemProps: {
        label: '使用耗材',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: [1, 2, 3, 4, 5, 6, 7].map((v, i) => (
        <WeakDetailImg key={i}></WeakDetailImg>
      )),
      itemProps: {
        label: '图片',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '备注',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' WeakDetailForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        isDisabledAll
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

WeakDetailForm.defaultProps = {};

export default WeakDetailForm;
