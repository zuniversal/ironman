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
      label: '类型',
      name: 'type',
    },
  },
  {
    formType: 'Divider',
    itemProps: {
      label: '',
    },
    comProps: {},
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '',
      name: 'keyword',
    },
    comProps: {
      className: 'lastFormItem',
    },
    searchSuffix: true,
  },
];

const ShiftsManageSearchForm = props => {
  console.log(' ShiftsManageSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'ShiftsManageSearchForm '}>
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

ShiftsManageSearchForm.defaultProps = {};

export default ShiftsManageSearchForm;
