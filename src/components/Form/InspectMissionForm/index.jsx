import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //

const InspectMissionForm = props => {
  console.log(' InspectMissionForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '电气告警条件',
      },
    },
    {
      itemProps: {
        label: '设备状态',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '能耗阈值',
      },
    },
    {
      itemProps: {
        label: '能耗过低',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '能耗过高',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '电流阈值',
      },
    },
    {
      itemProps: {
        label: '电流过低',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '电流过高',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '电压阈值',
      },
    },
    {
      itemProps: {
        label: '电压过低',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '电压过高',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '温度阈值',
      },
    },
    {
      itemProps: {
        label: '温度过低',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '温度过高',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '湿度阈值',
      },
    },
    {
      itemProps: {
        label: '湿度过低',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '湿度过高',
        // name: '',
      },
    },
    {
      itemProps: {
        label: '持续',
        // name: '',
      },
    },
  ];

  return (
    <div className={' InspectMissionForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

InspectMissionForm.defaultProps = {};

export default InspectMissionForm;
