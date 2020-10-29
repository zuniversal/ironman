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

const InspectPlanSearchForm = props => {
  console.log(' InspectPlanSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    // {
    //   formType: 'DatePicker',
    //   itemProps: {
    //     label: '年',
    //     name: '',
    //   },
    // },
    {
      formType: 'Search',
      selectSearch: props.getClientAsync,
      selectData: props.clientList,
      itemProps: {
        label: '客户代表',
        name: 'leader',
      },
    },
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '月',
        name: 'month',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' InspectPlanSearchForm '}>
      <SearchForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        noRule={false}
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

InspectPlanSearchForm.defaultProps = {};

export default InspectPlanSearchForm;
