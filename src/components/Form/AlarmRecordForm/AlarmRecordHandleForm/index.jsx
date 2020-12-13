import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //

const AlarmRecordHandleForm = props => {
  console.log(' AlarmRecordHandleForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'TextArea',
      itemProps: {
        label: '处理信息',
        name: '',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return <SmartForm size={'small'} config={config} {...props}></SmartForm>;
};

AlarmRecordHandleForm.defaultProps = {};

export default AlarmRecordHandleForm;
