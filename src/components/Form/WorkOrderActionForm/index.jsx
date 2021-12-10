import React from 'react';

import SmartForm from '@/common/SmartForm';

const choiceRadios = [
  { label: '是', value: 'yes', key: 'yes' },
  { label: '否', value: 'no', key: 'no' },
];

export const WorkOrderDispatchOrderForm = props => {
  const config = [
    {
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '分配给',
        name: 'team_id',
      },
      comProps: {
        // mode: 'multiple',
        className: 'w-280',
      },
    },
  ];

  return <SmartForm config={config} size={'small'} {...props}></SmartForm>;
};

WorkOrderDispatchOrderForm.defaultProps = {};

export default WorkOrderDispatchOrderForm;
