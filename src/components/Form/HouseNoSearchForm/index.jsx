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
import { formatConfig, reportRadioOp } from '@/utils'; //

const HouseNoSearchForm = props => {
  console.log(' HouseNoSearchForm ： ', props); //
  const [form] = Form.useForm();

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getClientAsync,
      selectData: props.clientList,
      itemProps: {
        label: '客户',
        name: 'customer',
      },
      comProps: {
        className: 'w-160',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getListAsync,
      selectData: props.dataList,
      itemProps: {
        label: '户号',
        name: 'code',
      },
      comProps: {
        className: 'w-160',
      },
    },
    {
      // formType: 'Cascader',
      itemProps: {
        label: '区域',
        name: 'region',
      },
      comProps: {
        className: 'w-160',
      },
    },
    {
      // formType: 'Input',
      itemProps: {
        label: '邮编',
        name: 'postcode',
      },
      comProps: {
        className: 'w-160',
      },
    },
    {
      formType: 'Divider',
      itemProps: {
        label: '',
      },
    },
  ];

  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'fsb HouseNoSearchForm '}>
      <SearchForm
        // flexRow={4}
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn && formBtn({ form })} */}
    </div>
  );
};

HouseNoSearchForm.defaultProps = {};

export default HouseNoSearchForm;
