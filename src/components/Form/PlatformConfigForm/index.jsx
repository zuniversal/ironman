import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';

const PlatformConfigForm = props => {
  console.log(' PlatformConfigForm ： ', props);
  const config = [
    {
      itemProps: {
        label: '自定义名称',
        name: '',
      },
    },
    {
      formType: 'Search',
      selectData: props.xx,
      itemProps: {
        label: '平台类型',
        name: '',
      },
    },
    {
      itemProps: {
        label: '服务地址(元)',
        name: '',
      },
    },
    {
      itemProps: {
        label: '账号',
        name: '',
      },
    },
    {
      itemProps: {
        label: '密码',
        name: '',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

export default PlatformConfigForm;
