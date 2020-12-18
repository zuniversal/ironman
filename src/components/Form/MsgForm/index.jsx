import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import { notifyTypeConfig, treeList } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const selectData = [
  { label: '应用内通知', value: 'app' },
  { label: '短信', value: 'msg' },
  { label: '邮件', value: 'email' },
];

const MsgForm = props => {
  console.log(' MsgForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'TextArea',
      itemProps: {
        label: '消息内容',
        name: 'content',
      },
    },
    // {
    //   formType: 'CheckboxGroup',
    //   itemProps: {
    //     label: '通知方法',
    //     name: 'send_type',
    //   },
    //   comProps: {
    //     options: notifyTypeConfig,
    //   },
    //   // checkboxContent:
    // },
    {
      formType: 'Checkbox',
      checkboxData: notifyTypeConfig,
      itemProps: {
        label: '通知方法',
        name: 'send_type',
      },
    },
    // {
    //   noRule: true,
    //   formType: 'TreeSelect',
    //   itemProps: {
    //     label: '通知人员',
    //     name: 'reciever',
    //   },
    //   comProps: {
    //     treeData: props.organizeList,
    //     treeData: treeList,
    //   },
    // },
    {
      noRule: true,
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '通知人员',
        name: 'reciever',
      },
      comProps: {
        mode: 'multiple',
      },
    },
  ];

  return (
    <div className={' MsgForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

MsgForm.defaultProps = {};

export default MsgForm;
