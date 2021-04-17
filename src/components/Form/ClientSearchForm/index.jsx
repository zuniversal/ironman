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
  Divider,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import SmartForm, { SearchForm } from '@/common/SmartForm';
// import SearchForm from '@/common/SearchForm';
import ProvinceForm, { config } from '@/components/Form/ProvinceForm';
import { regoins, customerTypeConfig } from '@/configs';

console.log(' config ： ', config);

const ClientSearchForm = props => {
  console.log(' ClientSearchForm ： ', props);

  const [form] = Form.useForm();

  const { formBtn, ...rest } = props;

  const configs = [
    // ...config(props),
    // {
    //   noLabel: true,
    //   itemProps: {
    //     label: '客户名称',
    //     name: 'name',
    //   },
    //   comProps: {
    //     className: 'lastFormItem',
    //   },
    //   searchSuffix: true,
    // },
    {
      formType: 'Search',
      selectData: customerTypeConfig,
      itemProps: {
        label: '客户类型',
        name: 'type',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '客户名称/地址',
        name: 'keyword',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
    // {
    //   // formType: 'Select',
    //   itemProps: {
    //     label: '',
    //     name: 'keyword',
    //     className: 'w50',
    //   },
    //   comProps: {
    //     // suffix: <SearchOutlined className="searchIcon" />,
    //     // suffixIcon: <SearchOutlined className="searchIcon" />,
    //   },
    // },
    // {
    //   formType: 'Divider',
    //   itemProps: {
    //     label: '',
    //   },
    // },
  ];
  console.log(' configs ： ', configs);

  return (
    <div className="clientSearchForm">
      <SearchForm
        config={configs}
        noRuleAll
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn && formBtn(
        {form,  }
      )} */}
    </div>
  );
};

ClientSearchForm.defaultProps = {};

export default ClientSearchForm;
