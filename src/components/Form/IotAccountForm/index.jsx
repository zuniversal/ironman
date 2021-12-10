import React from 'react';
import SmartForm from '@/common/SmartForm';
import { validityPeriodConfig, iotAccountConfig } from '@/configs';

const IotAccountForm = props => {
  const detailConfig = [
    {
      // formType: 'Checkbox',
      // checkboxData: [
      //   { label: '激活', value: true, key: 'yes' },
      //   { label: '未激活', value: false, key: 'yes' },
      // ],
      noRule: true,
      formType: 'Switch',
      // formType: 'Select',
      // selectData: iotAccountConfig,
      itemProps: {
        label: '状态',
        name: 'status',
      },
      comProps: {
        disabled: true,
        checkedChildren: '激活',
        unCheckedChildren: '未激活',
        // valuePropName: 'checked',
      },
    },
    {
      noRule: true,
      formType: 'DatePicker',
      itemProps: {
        label: '激活时间',
        name: 'activate_time',
      },
      comProps: {
        disabled: true,
      },
    },
    // 到期时间=套餐时间+激活时间
    {
      noRule: true,
      formType: 'DatePicker',
      itemProps: {
        label: '到期时间',
        name: 'end_time',
      },
      comProps: {
        disabled: true,
      },
    },
  ];

  const config = [
    {
      itemProps: {
        label: 'ICCID',
        name: 'iccid',
      },
    },
    {
      itemProps: {
        label: 'SIM卡号',
        name: 'sim_number',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '开户时间',
        name: 'start_time',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '套餐流量',
        name: 'flow',
      },
    },
    {
      formType: 'Select',
      selectData: validityPeriodConfig,
      itemProps: {
        label: '套餐有效期',
        name: 'validity_period',
      },
    },
    {
      itemProps: {
        label: '运营商',
        name: 'operator',
      },
    },
    {
      itemProps: {
        label: '供应商',
        name: 'supplier',
      },
    },

    ...(props.action !== 'add' ? detailConfig : []),

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
