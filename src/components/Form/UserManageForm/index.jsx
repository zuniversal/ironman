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
    itemProps: {
      label: '姓名',
      name: 'name',
    },
  },
  {
    itemProps: {
      label: '手机',
      name: 'phone',
    },
  },
  {
    itemProps: {
      label: '邮箱',
      name: 'email',
    },
  },
  {
    itemProps: {
      label: '密码',
      name: 'password',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '角色',
      name: '',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '所属业务部门',
      name: '',
    },
  },

  
];



const UserManageForm = props => {
  console.log(' UserManageForm ： ', props); //
  const {formBtn, ...rest } = props// 
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' UserManageForm '}>
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

UserManageForm.defaultProps = {};

export default UserManageForm;
