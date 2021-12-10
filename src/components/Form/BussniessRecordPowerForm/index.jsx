import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { regoins } from '@/configs';
import { formatConfig } from '@/utils';

const BussniessRecordPowerForm = props => {
  const config = [
    {
      itemProps: {
        label: '单号',
        name: 'number',
      },
    },
    {
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },
    {
      itemProps: {
        label: '类型',
        name: 'type',
      },
    },
    {
      itemProps: {
        label: '申请时间',
        name: 'created_time',
      },
    },
    {
      itemProps: {
        label: '设备名称',
        name: ['equipments', 'name'],
      },
    },
    {
      itemProps: {
        label: '设备厂名',
        name: ['equipments', 'factory'],
      },
    },
    // {
    //   itemProps: {
    //     label: '设备厂号',
    //     name: '',
    //   },
    // },
    {
      itemProps: {
        label: '出厂编号',
        name: ['equipments', 'production_code'],
      },
    },
    {
      itemProps: {
        label: '设备容量',
        name: ['equipments', 'transformer_capacity'],
      },
    },
    {
      itemProps: {
        label: '设备电压',
        name: ['equipments', 'voltage'],
      },
    },
    {
      itemProps: {
        label: '设备电流',
        name: ['equipments', 'electricity'],
      },
    },
    {
      itemProps: {
        label: '设备阻抗',
        name: ['equipments', 'impedance'],
      },
    },
    {
      itemProps: {
        label: '结线方式',
        name: ['equipments', 'line_type'],
      },
    },
    {
      itemProps: {
        label: '分接开关位置',
        name: ['equipments', 'switch_position'],
      },
    },
    {
      itemProps: {
        label: '出厂年份',
        name: ['equipments', 'production_date'],
      },
    },
    {
      itemProps: {
        label: '试验理由',
        name: ['equipments', 'test_reason'],
      },
    },
    {
      itemProps: {
        label: '工作内容',
        name: 'describe',
      },
    },
  ];

  return (
    <SmartForm
      config={config}
      // config={configs}

      isDisabledAll
      {...props}
    ></SmartForm>
  );
};

BussniessRecordPowerForm.defaultProps = {};

export default BussniessRecordPowerForm;
