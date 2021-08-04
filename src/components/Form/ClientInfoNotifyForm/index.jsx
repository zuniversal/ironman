import React, { useEffect } from 'react';
import SmartForm from '@/common/SmartForm';
import {
  notifyTypeWithAllConfig,
  notifyClientEventConfig,
  notifyClientLinkConfig,
} from '@/configs';

const ClientInfoNotifyForm = props => {
  console.log(' ClientInfoNotifyForm ： ', props); //

  const config = [
    {
      itemProps: {
        label: '名称',
        name: '',
      },
    },
    {
      formType: 'Checkbox',
      itemProps: {
        label: '通知方法',
        name: 'send_type',
      },
      checkboxData: notifyTypeWithAllConfig,
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '通知事件',
      },
    },
    // {
    //   formType: 'Checkbox',
    //   itemProps: {
    //     label: '客户',
    //     name: 'send_type',
    //   },
    //   checkboxData: notifyClientEventConfig,
    // },
    // {
    //   formType: 'Checkbox',
    //   itemProps: {
    //     label: '通知人员',
    //     name: 'send_type',
    //   },
    //   checkboxData: notifyClientLinkConfig,
    // },
    {
      itemProps: {
        label: '客户',
        name: 'send_type',
      },
    },
    {
      noRule: true,
      formType: 'Checkbox',
      itemProps: {
        label: ' ',
        name: 'send_type2',
      },
      checkboxData: notifyClientEventConfig,
    },
    {
      itemProps: {
        label: '通知人员',
        name: 'send_type',
      },
      // comProps: {
      //   extra: <div>extra</div>,
      // },
      // extra: <div>extra</div>,
    },
    {
      noRule: true,
      formType: 'Checkbox',
      itemProps: {
        label: ' ',
        name: 'send_type2',
      },
      checkboxData: notifyClientLinkConfig,
    },
  ];

  return (
    <SmartForm
      config={config}
      {...props}
      className={`clientInfoNotifyForm`}
    ></SmartForm>
  );
};

export default ClientInfoNotifyForm;
