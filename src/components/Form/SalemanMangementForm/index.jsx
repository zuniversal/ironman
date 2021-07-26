import React, { useEffect } from 'react';
import SmartForm from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { getList } from '@/services/clientList';

const SalemanMangementForm = props => {
  console.log(' SalemanMangementForm ： ', props); //

  const config = [
    {
      itemProps: {
        label: '姓名',
        name: '',
      },
    },
    {
      itemProps: {
        label: '工号',
        name: '',
      },
    },
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '角色',
        name: '',
      },
    },
    {
      itemProps: {
        label: '性别',
        name: '',
      },
    },
    {
      itemProps: {
        label: '所属子公司',
        name: '',
      },
    },
    {
      itemProps: {
        label: '邮箱',
        name: '',
      },
    },
    {
      itemProps: {
        label: '手机',
        name: '',
      },
    },
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '证件类型',
        name: '',
      },
    },
    {
      itemProps: {
        label: '证件号码',
        name: '',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '入职时间',
        name: '',
      },
    },
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '状态',
        name: '',
      },
    },
    {
      itemProps: {
        label: '个人照片',
        name: '',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

export default SalemanMangementForm;
