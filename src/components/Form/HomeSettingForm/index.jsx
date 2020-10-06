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

export const config = [
  {
    formType: 'Checkbox',
    itemProps: {
      label: '待巡检任务',
    },
  },
  {
    formType: 'Checkbox',
    itemProps: {
      label: '待处理工单',
    },
  },
  {
    formType: 'Checkbox',
    itemProps: {
      label: '未领取巡检任务',
    },
  },
  {
    formType: 'Checkbox',
    itemProps: {
      label: '未领取工单',
    },
  },
  {
    formType: 'Checkbox',
    itemProps: {
      label: '小组数据统计',
    },
  },
  {
    formType: 'Checkbox',
    itemProps: {
      label: '完成工单数',
    },
  },
  {
    formType: 'Checkbox',
    itemProps: {
      label: '完成巡检数',
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
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

HomeSettingForm.defaultProps = {};

export default HomeSettingForm;
