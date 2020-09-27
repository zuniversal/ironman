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

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
// import SearchForm from '@/common/SearchForm'; //
import ProvinceForm, { config } from '@/components/Form/ProvinceForm'; //
import { regoins } from '@/configs'; //

console.log(' config ： ', config); //

export const configs = [
  ...config,
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
      className: 'w50',
    },
    comProps: {
      suffix: <SearchOutlined className="searchIcon" />,
      // suffixIcon: <SearchOutlined className="searchIcon" />,
    },
  },
];

const ClientSearchForm = props => {
  console.log(' ClientSearchForm ： ', props); //

  const [form] = Form.useForm();

  const { formBtn, ...rest } = props; //

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };
  console.log(' configs ： ', configs); //

  return (
    <div className="clientSearchForm">
      <SearchForm
        // flexRow={6}
        config={configs}
        formProps={formProps}
        // init={init}
        // init={{}}

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
