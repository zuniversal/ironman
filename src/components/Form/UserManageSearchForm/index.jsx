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

import SmartForm from '@/common/SmartForm'; //
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
    layout: 'inline',
  };

  return (
    <div className={'fsb UserManageSearchForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

UserManageSearchForm.defaultProps = {};

export default UserManageSearchForm;
