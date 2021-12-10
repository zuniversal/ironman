import React from 'react';
import SmartForm from '@/common/SmartForm';
import { MeterTable } from '@/components/Table/PowerStationInfoTable';
import { voltageLevelConfig } from '@/configs';

const MeterForm = props => {
  const config = [
    {
      noRule: true,
      itemProps: {
        label: '电源编号',
        name: 'power_number',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '电表号',
        name: 'meter_number',
      },
    },

    {
      itemProps: {
        label: '进线名称',
        name: 'incoming_line_name',
      },
    },
    {
      itemProps: {
        label: '考核功率因数',
        name: 'ep_factor',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: voltageLevelConfig,
      itemProps: {
        label: '电压等级',
        name: 'voltage_level',
      },
    },
    {
      itemProps: {
        label: '倍率',
        name: 'magnification',
      },
    },
  ];

  return (
    <div className={' meterForm '}>
      <SmartForm config={config} {...props}></SmartForm>

      <MeterTable dataSource={props.init.transformer}></MeterTable>
    </div>
  );
};

export default MeterForm;
