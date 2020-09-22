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
import { formatConfig, reportRadioOp } from '@/utils'; //

const ClientReportForm = props => {
  console.log(' ClientReportForm ： ', props); //

  const { getCapture } = props; //

  const config = [
    {
      itemProps: {
        label: '电价类型',
      },
    },
    {
      itemProps: {
        label: '客户名称',
      },
    },
    {
      itemProps: {
        label: '电源编号',
      },
    },
    {
      itemProps: {
        label: '装接总容量',
      },
    },
    {
      itemProps: {
        label: '申报MD',
      },
    },
    {
      itemProps: {
        label: '尖电量1',
      },
    },
    {
      itemProps: {
        label: '峰电量1 ',
      },
    },
    {
      itemProps: {
        label: '平电量1',
      },
    },
    {
      itemProps: {
        label: '谷电量1',
      },
    },
    {
      itemProps: {
        label: '尖电量2',
      },
    },
    {
      itemProps: {
        label: '峰电量2',
      },
    },
    {
      itemProps: {
        label: '平电量2',
      },
    },
    {
      itemProps: {
        label: '谷电量2',
      },
    },
    {
      itemProps: {
        label: '其他电量',
      },
    },
    {
      itemProps: {
        label: '实际MD',
      },
    },
    {
      itemProps: {
        label: '代征费用',
      },
    },
    {
      itemProps: {
        label: '功率因数考核',
      },
    },
    {
      itemProps: {
        label: '力率(%)',
      },
    },
    {
      itemProps: {
        label: '应付账款',
      },
    },

    {
      itemProps: {
        label: '倍率',
      },
    },
    {
      itemProps: {
        label: '电价类型',
      },
    },
    {
      itemProps: {
        label: '实际总容量',
      },
    },
    {
      itemProps: {
        label: '基本电价单价',
      },
    },
    {
      itemProps: {
        label: '尖电价1',
      },
    },
    {
      itemProps: {
        label: '峰电价1',
      },
    },
    {
      itemProps: {
        label: '平电价1',
      },
    },
    {
      itemProps: {
        label: '谷电价1',
      },
    },
    {
      itemProps: {
        label: '尖电价2',
      },
    },
    {
      itemProps: {
        label: '峰电价2',
      },
    },
    {
      itemProps: {
        label: '平电价2',
      },
    },
    {
      itemProps: {
        label: '谷电价2',
      },
    },
    {
      itemProps: {
        label: '其他电价',
      },
    },
    {
      itemProps: {
        label: '小计金额',
      },
    },
    {
      itemProps: {
        label: '无功电量',
      },
    },
    {
      itemProps: {
        label: '功率因数考核',
      },
    },
    {
      itemProps: {
        label: '力率调整',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={''}>
      <SmartForm
        // flexRow={4}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}
        // init={{
        //   key9: regoins,
        // }}
        {...props}
      ></SmartForm>
    </div>
  );
};

ClientReportForm.defaultProps = {};

export default ClientReportForm;
