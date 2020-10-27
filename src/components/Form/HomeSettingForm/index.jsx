import React from 'react';
import './style.less';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
} from 'antd';

import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const checkboxData = [
  { label: '待巡检任务', value: 'yes1', key: 'yes1' },
  { label: '待处理工单', value: 'yes2', key: 'yes2' },
  { label: '未领取巡检任务', value: 'yes3', key: 'yes3' },
  { label: '未领取工单', value: 'yes4', key: 'yes4' },
  { label: '小组数据统计', value: 'yes5', key: 'yes5' },
  { label: '完成工单数', value: 'yes6', key: 'yes6' },
  { label: '完成巡检数', value: 'yes7', key: 'yes7' },
];

export const config = [
  {
    formType: 'Checkbox',
    checkboxData: checkboxData,
    itemProps: {
      label: '',
      name: 'settings',
    },
  },
];

const HomeSettingForm = props => {
  console.log(' HomeSettingForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' HomeSettingForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}

        noLabelLayout
        {...rest}
      ></SmartForm>

      {/* {formBtn} */}
    </div>
  );
};

HomeSettingForm.defaultProps = {};

export default HomeSettingForm;
