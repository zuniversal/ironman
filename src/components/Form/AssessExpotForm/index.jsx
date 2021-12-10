import React from 'react';
import SmartForm from '@/common/SmartForm';

export const config = [
  {
    formType: 'DatePicker',
    itemProps: {
      label: '选择月份',
    },
  },
];

const AssessExpotForm = props => {
  return <SearchForm config={config} {...props}></SearchForm>;
};

AssessExpotForm.defaultProps = {};

export default AssessExpotForm;
