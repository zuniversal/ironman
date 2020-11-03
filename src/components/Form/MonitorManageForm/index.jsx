import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const checkboxGroupOptions = [
  { label: '应用内通知', value: 'app' },
  { label: '短信', value: 'msg' },
  { label: '邮件', value: 'email' },
];

const selectData = [
  { label: '应用内通知', value: 'app' },
  { label: '短信', value: 'msg' },
  { label: '邮件', value: 'email' },
];

export const config = [
  {
    formType: 'Select',
    itemProps: {
      label: '户号',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '电站',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '关联客户设备',
    },
  },
  {
    itemProps: {
      label: '监控点名称',
    },
  },
  {
    itemProps: {
      label: '设备编码',
    },
  },
  {
    itemProps: {
      label: '设备名称',
    },
  },
  {
    itemProps: {
      label: 'IMEI号',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '设备类型',
    },
  },
  {
    itemProps: {
      label: '品牌',
    },
  },
  {
    itemProps: {
      label: '告警策略',
    },
  },
  {
    itemProps: {
      label: '状态',
    },
  },
  {
    itemProps: {
      label: '说明',
    },
  },
];

const MonitorManageForm = props => {
  console.log(' MonitorManageForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MonitorManageForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MonitorManageForm.defaultProps = {};

export default MonitorManageForm;
