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

const InspectMissionSearchForm = props => {
  console.log(' InspectMissionSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '处理人',
        name: 'team',
      },
    },
    {
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' InspectMissionSearchForm '}>
      <SearchForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        // {...rest}
        {...props}
      ></SearchForm>

      {formBtn}
    </div>
  );
};

InspectMissionSearchForm.defaultProps = {};

export default InspectMissionSearchForm;
