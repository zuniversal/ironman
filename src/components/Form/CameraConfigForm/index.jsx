import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import {
  getManufacturerList,
  getList as getMonitorPointList,
} from '@/services/monitorManage';
import { getRelatived } from '@/services/client';
import { formatSelectList } from '@/utils';

const CameraConfigForm = props => {
  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息',
      },
      comProps: {
        disabled: props.action === 'edit',
      },
    },
    {
      formType: 'Search',
      selectData: props.xx,
      itemProps: {
        label: '摄像头类型',
        name: '',
      },
    },
    {
      itemProps: {
        label: '摄像头名称',
        name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '关联摄像头',
      },
    },
    {
      formType: 'Search',
      selectData: props.xx,
      itemProps: {
        label: '平台名称',
        name: '',
      },
    },
    {
      formType: 'Search',
      selectData: props.xx,
      itemProps: {
        label: '摄像头编号',
        name: '',
      },
    },
    {
      formType: 'Search',
      selectData: props.xx,
      itemProps: {
        label: '所属客户',
        name: '',
      },
    },
    {
      formType: 'Search',
      selectData: props.xx,
      itemProps: {
        label: '所属电站',
        name: '',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

export default CameraConfigForm;
