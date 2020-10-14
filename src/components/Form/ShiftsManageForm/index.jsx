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

const ShiftsManageForm = props => {
  console.log(' ShiftsManageForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  const config = [
    {
      itemProps: {
        label: '班组名称',
        name: 'name',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUser,
      itemProps: {
        label: '组长姓名',
        name: 'team_headman',
      },
    },
    {
      formType: 'DynamicItem',
      itemProps: {
        label: '组员姓名',
        className: 'noMargin',
        name: 'member',
      },
      comProps: {
        extra: true,
        itemProps: {
          label: '用户名',
        },
        comProps: {
          className: 'w-320',
          name: 'member',
        },
      },
    },
    {
      // formType: 'Select',
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
    {
      itemProps: {
        label: 'leader',
        name: 'leader',
      },
    },
  ];

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
