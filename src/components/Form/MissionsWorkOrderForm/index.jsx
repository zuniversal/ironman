import React from 'react';
import SmartForm from '@/common/SmartForm';

const MissionsWorkOrderForm = props => {
  const config = [
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '客户',
      },
    },
    {
      itemProps: {
        label: '名称',
      },
    },
    {
      itemProps: {
        label: '类型',
      },
    },
    {
      itemProps: {
        label: '分配给',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

MissionsWorkOrderForm.defaultProps = {};

export default MissionsWorkOrderForm;
