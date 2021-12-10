import React from 'react';
import SmartForm from '@/common/SmartForm';

export const PowerstationMonthForm = props => {
  const config = [
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '选择月份',
        name: 'month',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return (
    <div className={' powerstationMonthForm '}>
      <SmartForm
        config={config}
        size={'small'}
        // noRuleAll
        {...props}
      ></SmartForm>
    </div>
  );
};

PowerstationMonthForm.defaultProps = {};
