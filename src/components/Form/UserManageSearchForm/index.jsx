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
import { formatConfig } from '@/utils'//

export const config = [
  {
    formType: 'Select',
    itemProps: {
      label: '业务部门',
    },
    comProps: {
      className: 'w-240',  
    },  
  },
  {
    formType: 'Select',
    itemProps: {
      label: '角色',
    },
    comProps: {
      className: 'w-240',  
    },  
  },

  
];



const UserManageSearchForm = props => {
  console.log(' UserManageSearchForm ： ', props); //
  const {formBtn, ...rest } = props// 
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'fsb UserManageSearchForm '}>
      <SearchForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        noRuleAll
        {...rest}
      ></SearchForm>

      {formBtn}
    </div>
  );
};

UserManageSearchForm.defaultProps = {};

export default UserManageSearchForm;
