import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //

export const PowerstationMonthForm = props => {
  console.log(' PowerstationMonthForm ： ', props); //
  const { formBtn, ...rest } = props; //

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
        {...rest}
      ></SmartForm>
    </div>
  );
};

PowerstationMonthForm.defaultProps = {};
