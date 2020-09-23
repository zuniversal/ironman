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

const ClientReportSearchForm = props => {
  console.log(' ClientReportSearchForm ： ', props); //

  const { getCapture } = props; //

  const config = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '选择月份',
      },
      // comProps: {},
    },
    {
      formType: 'Select',
      itemProps: {
        label: '巡检组长',
      },
      // comProps: {},
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={''}>
      {/* <SmartForm
        // flexRow={4}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}
        // init={{
        //   key9: regoins,
        // }}

        isSearchForm
        {...props}
      ></SmartForm> */}

      <SearchForm
        config={formatConfig(config)}
        formProps={formProps}
      ></SearchForm>
    </div>
  );
};

ClientReportSearchForm.defaultProps = {};

export default ClientReportSearchForm;
