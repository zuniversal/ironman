import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const BussniessRecordPowerForm = props => {
  console.log(' BussniessRecordPowerForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '单号',
        name: '',
      },
    },
    {
      itemProps: {
        label: '状态',
        name: '',
      },
    },
    {
      itemProps: {
        label: '类型',
        name: '',
      },
    },
    {
      itemProps: {
        label: '申请时间',
        name: '',
      },
    },
    {
      itemProps: {
        label: '设备名称',
        name: '',
      },
    },
    {
      itemProps: {
        label: '设备厂名',
        name: '',
      },
    },
    {
      itemProps: {
        label: '设备厂号',
        name: '',
      },
    },
    {
      itemProps: {
        label: '设备容量',
        name: '',
      },
    },
    {
      itemProps: {
        label: '设备电压',
        name: '',
      },
    },
    {
      itemProps: {
        label: '设备电流',
        name: '',
      },
    },
    {
      itemProps: {
        label: '设备阻抗',
        name: '',
      },
    },
    {
      itemProps: {
        label: '结线方式',
        name: '',
      },
    },
    {
      itemProps: {
        label: '分接开关位置',
        name: '',
      },
    },
    {
      itemProps: {
        label: '出厂年份',
        name: '',
      },
    },
    {
      itemProps: {
        label: '试验理由',
        name: '',
      },
    },
    {
      itemProps: {
        label: '工作内容',
        name: '',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' BussniessRecordPowerForm '}>
      <SmartForm
        config={config}
        // config={configs}
        formProps={formProps}
        // init={init}
        // init={{}}

        isDisabledAll
        {...props}
      ></SmartForm>
    </div>
  );
};

BussniessRecordPowerForm.defaultProps = {};

export default BussniessRecordPowerForm;
