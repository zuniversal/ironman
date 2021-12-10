import React from 'react';
import SmartForm from '@/common/SmartForm';
import { regoins } from '@/configs';
import { formatConfig } from '@/utils';

export const InspectPlanNotifyForm = props => {
  const config = [
    {
      formType: 'Checkbox',
      itemProps: {
        label: '短信通知客户',
        name: '',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

InspectPlanNotifyForm.defaultProps = {};

export default InspectPlanNotifyForm;
