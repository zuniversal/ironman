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
    itemProps: {
      label: '班组姓名',
      name: 'name',
    },
  },
  {
    itemProps: {
      label: '组长姓名',
      name: 'team_headman',
    },
  },
  {
    formType: 'Dynamic',
    itemProps: {
      label: '组员姓名',
      className: 'noMargin',
    },
    comProps: {
      extra: true,
      itemProps: {
        label: '用户名',
        name: 'member',
      },
      comProps: {
        className: 'w-320',
      },
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '类型',
      name: 'type',
    },
  },
  {
    itemProps: {
      label: '车辆牌照',
      name: 'car_number',
    },
  },
];

const ShiftsManageForm = props => {
  console.log(' ShiftsManageForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' ShiftsManageForm '}>
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

ShiftsManageForm.defaultProps = {};

export default ShiftsManageForm;
