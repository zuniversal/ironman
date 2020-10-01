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
    // formType: 'Select',
    itemProps: {
      label: '',
      name: 'keyword',
      className: 'w50',
    },
    searchSuffix: true,
  },
];

const PowerStationSearchForm = props => {
  console.log(' PowerStationSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'fsb PowerStationSearchForm '}>
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

PowerStationSearchForm.defaultProps = {};

export default PowerStationSearchForm;
