import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import { iotAccountConfig } from '@/configs';

const IotAccountForm = props => {
  const config = [
    {
      itemProps: {
        label: 'ICCID',
        name: '',
      },
    },
    {
      itemProps: {
        label: 'SIM卡号',
        name: '',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '开户时间',
        name: '',
      },
    },
    {
      itemProps: {
        label: '套餐流量',
        name: '',
      },
    },
    {
      itemProps: {
        label: '套餐有效期',
        name: '',
      },
    },
    {
      itemProps: {
        label: '运营商',
        name: '',
      },
    },
    {
      itemProps: {
        label: '供应商',
        name: '',
      },
    },
    {
      formType: 'Select',
      selectData: iotAccountConfig,
      itemProps: {
        label: '状态',
        name: '',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '激活时间',
        name: '',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '到期时间',
        name: '',
      },
    },

    // {
    //   noRule: true,
    //   formType: 'Select',
    //   selectData: iotAccountConfig,
    //   itemProps: {
    //     label: '状态',
    //     name: 'status',
    //   },
    // },
  ];

  return <SmartForm config={config} {...props} init={props.init}></SmartForm>;
};

IotAccountForm.defaultProps = {};

export default IotAccountForm;
