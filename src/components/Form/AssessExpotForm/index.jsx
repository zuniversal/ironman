import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //

export const config = [
  {
    formType: 'DatePicker',
    itemProps: {
      label: '选择月份',
    },
  },
];

const AssessExpotForm = props => {
  console.log(' AssessExpotForm ： ', props); //
  const { formBtn, ...rest } = props; //

  return (
    <div className={' AssessExpotForm '}>
      <SearchForm config={config} {...rest}></SearchForm>

      {formBtn}
    </div>
  );
};

AssessExpotForm.defaultProps = {};

export default AssessExpotForm;
