import React from 'react'
import './style.less'
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
  Upload,
  Result,

} from 'antd'
import {
  UploadOutlined,
  PlusOutlined,
  
} from '@ant-design/icons'

import SmartForm from '@/common/SmartForm' //
import { regoins } from '@/configs'//
import { formatConfig } from '@/utils'//




export const config = [
  {
    noRule: true,  
    itemProps: {
      label: '姓名',
    },
  },
  {
    noRule: true,  
    itemProps: {
      label: '角色',
    },
    comProps: {
      disabled: true,  
    }
  },
  {
    noRule: true,  
    itemProps: {
      label: '手机',
    },
  },
  {
    noRule: true,  
    itemProps: {
      label: '邮箱',
    },
  },
  {
    noRule: true,  
    itemProps: {
      label: '业务部门',
    },
    comProps: {
      disabled: true,  
    }
  },
  {
    formType: 'Password',
    
    noRule: true,  noRule: true,
    itemProps: {
      label: '密码重置',
    },
  },
  {
    formType: 'Password',
    
    noRule: true,  noRule: true,
    itemProps: {
      label: '再次输入密码',
    },
  },
  
  
  
  
];




const UserCenterForm = props => {
  console.log(' UserCenterForm ： ', props,  )//

  const {index,  } = props// 

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  // const formConfig = formatConfig(config);

  const handleOk = (e, ) => {
    console.log(' handleOk   e, ,   ： ', e,   )
    
  }
  

  return (
    <div className={'userCenterForm'}>
      <SmartForm
        // config={config}
        config={formatConfig(config)}
        // config={configs}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...props}
      ></SmartForm>

      <div className="dfc actionBtn ">
        <Button type="primary" onClick={handleOk}>确认修改</Button>
      </div>
      

    </div>
  )
}

UserCenterForm.defaultProps = {}

export default UserCenterForm
