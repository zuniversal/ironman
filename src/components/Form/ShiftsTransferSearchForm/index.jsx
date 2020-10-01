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

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

export const config = [
  {
    formType: 'Select',
    itemProps: {
      label: '交班人',
    },
  },
  // {
  //   formType: 'Select',
  //   itemProps: {
  //     label: '值班站',
  //   },
  // },
  // {
  //   formType: 'Select',
  //   itemProps: {
  //     label: '接班人',
  //   },
  // },
  {
    formType: 'DatePicker',
    itemProps: {
      label: '选择日期',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '电站',
    },
  },
];

const ShiftsTransferSearchForm = props => {
  console.log(' ShiftsTransferSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'ShiftsTransferSearchForm '}>
      <SearchForm
        // flexRow={4}
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        noRuleAll
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

ShiftsTransferSearchForm.defaultProps = {};

export default ShiftsTransferSearchForm;
