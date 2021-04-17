import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import { regoins } from '@/configs';
import { formatConfig } from '@/utils';

export const InspectPlanNotifyForm = props => {
  console.log(' InspectPlanNotifyForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    {
      formType: 'Checkbox',
      itemProps: {
        label: '短信通知客户',
        name: '',
      },
    },
  ];

  return (
    <div className={' InspectPlanNotifyForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

InspectPlanNotifyForm.defaultProps = {};

export default InspectPlanNotifyForm;
