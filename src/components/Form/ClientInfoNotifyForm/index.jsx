import React, { useState } from 'react';
import SmartForm from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { getList as getClientList } from '@/services/clientList';
import { getSearchList } from '@/services/user';
import { crmNotifyTypeConfig, crmMsgRadioCofig } from '@/configs';

const ClientInfoNotifyForm = props => {
  const { data: userList, req: getUserListAsync } = useHttp(getSearchList, {
    formatVal: 'nickname',
  });

  const { data: clientList, req: getClientListAsync } = useHttp(getClientList);

  const onTypeChange = e => {
    console.log('  onTypeChange   e, 改变设置  ： ', e, e.target.value);
  };

  const config = [
    {
      itemProps: {
        label: '标题',
        name: 'title',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '消息内容',
        name: 'content',
      },
    },
    // {
    //   formType: 'Radio',
    //   itemProps: {
    //     label: '通知方法',
    //     name: 'send_type',
    //   },
    //   comProps: {
    //     onChange: onTypeChange,
    //   },
    //   radioData: crmNotifyTypeConfig,
    // },
    {
      formType: 'Checkbox',
      itemProps: {
        label: '通知方法',
        name: 'send_type',
      },
      checkboxData: crmNotifyTypeConfig,
      checkboxData: [
        {
          label: '短信',
          value: 0,
          key: 0,
        },
        {
          label: '邮件',
          value: 1,
          key: 1,
        },
      ],
    },
    {
      formType: 'Radio',
      itemProps: {
        label: '消息类型',
        name: 'type',
      },
      comProps: {
        onChange: onTypeChange,
      },
      radioData: crmMsgRadioCofig,
    },
    // {
    //   formType: 'Checkbox',
    //   itemProps: {
    //     label: '消息类型',
    //     name: 'type',
    //   },
    //   checkboxData: choiceRadios,
    // },

    {
      formType: 'Search',
      selectSearch: e =>
        getClientListAsync(() => getClientList({ keyword: e })),
      selectData: clientList,
      itemProps: {
        label: '关联客户',
        name: 'customer_id',
      },
      comProps: {},
    },
    {
      formType: 'Search',
      selectData: userList,
      itemProps: {
        label: '消息接收人',
        name: 'user_id',
      },
      comProps: {
        mode: 'multiple',
      },
    },
  ];

  const { send_type, type } = props.init; //

  return (
    <SmartForm
      config={config}
      {...props}
      init={{
        ...props.init,
        type: type != undefined ? type : 1,
        send_type: [send_type != undefined ? send_type : 1],
      }}
    ></SmartForm>
  );
};

ClientInfoNotifyForm.defaultProps = {
  init: {},
};

export default ClientInfoNotifyForm;
