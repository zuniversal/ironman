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
      label: '客户',
      name: 'customer',
    },
    comProps: {},
  },
  {
    formType: 'Select',
    itemProps: {
      label: '电站',
      name: 'station',
    },
    comProps: {},
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
    searchSuffix: true,
  },
];

const AssetsSearchForm = props => {
  console.log(' AssetsSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'fsb assetsSearchForm '}>
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

AssetsSearchForm.defaultProps = {};

export default AssetsSearchForm;
