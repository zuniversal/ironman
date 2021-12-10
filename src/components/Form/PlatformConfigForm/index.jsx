import React from 'react';
import SmartForm from '@/common/SmartForm';
import { cameraSystemConfig } from '@/configs';

const PlatformConfigForm = props => {
  const config = [
    {
      itemProps: {
        label: '自定义名称',
        name: 'name',
      },
    },
    {
      formType: 'Search',
      selectData: cameraSystemConfig,
      itemProps: {
        label: '平台类型',
        name: 'system',
      },
    },
    {
      itemProps: {
        label: '服务地址',
        name: 'home_url',
      },
    },
    {
      itemProps: {
        label: '账号',
        label: 'app_secret',
        name: 'app_secret',
      },
    },
    {
      itemProps: {
        label: '密码',
        label: 'app_key',
        name: 'app_key',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

export default PlatformConfigForm;
