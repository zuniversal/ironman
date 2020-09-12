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
    },
  },
  {
    itemProps: {
      label: '手机',
    },
  },
  {
    itemProps: {
      label: '邮箱',
    },
  },
  {
    itemProps: {
      label: '密码',
    },
  },
  {
    itemProps: {
      label: '角色',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '角色',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '所属业务部门',
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
