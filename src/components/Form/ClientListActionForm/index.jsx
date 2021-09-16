import React from 'react';
import SmartForm from '@/common/SmartForm';
import { clientListPlanTypeConfig } from '@/configs';
import useHttp from '@/hooks/useHttp';
import { getList } from '@/services/clientList';

export const ClientListAsignPeopleForm = props => {
  const config = [
    {
      itemProps: {
        label: '客户名称',
        name: 'name',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '销售',
        name: '',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

export const ClientListPlanForm = props => {
  const config = [
    // {
    //   itemProps: {
    //     label: 'customer_id',
    //     name: 'customer_id',
    //     className: 'hidden',
    //   },
    // },
    {
      itemProps: {
        label: '计划名称',
        name: 'name',
      },
    },
    {
      formType: 'Search',
      selectData: clientListPlanTypeConfig,
      itemProps: {
        label: '计划类型',
        name: 'type',
      },
    },
    {
      itemProps: {
        label: '分配客户后',
        name: 'duration1',
      },
      extra: <div className="m-l-5">天出方案</div>,
    },
    {
      itemProps: {
        label: '方案审批通过后',
        name: 'duration2',
      },
      extra: <div className="m-l-5">天出合同</div>,
    },
    {
      itemProps: {
        label: '合同审批通过后',
        name: 'duration3',
      },
      extra: <div className="m-l-5">天签约</div>,
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

export const ClientListPullContractForm = props => {
  // const { data: contractList } = useHttp(getServiceStaff, {
  //   formatVal: 'nickname',
  // });

  const config = [
    {
      // formType: 'Search',
      // selectData: contractList,
      itemProps: {
        label: '合同',
        label: '计划',
        name: '',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return <SmartForm config={config} size={'small'} {...props}></SmartForm>;
};

export const ClientListRemarkForm = props => {
  const config = [
    {
      formType: 'TextArea',
      itemProps: {
        label: '备注',
        name: 'content',
      },
    },
  ];

  return <SmartForm config={config} size={'small'} {...props}></SmartForm>;
};
