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
import HouseNoFormTable from '@/components/Table/HouseNoFormTable'; //
import { regoins } from '@/configs'//
import { formatConfig, reportRadioOp,  } from '@/utils'//  



const reportConfig = [
  { value: '是', key: 'yes',  },
  { value: '否', key: 'no',  },
]

const reportOption = reportRadioOp(reportConfig,  )




const HouseNoForm = props => {
  console.log(' HouseNoForm ： ', props, config,  )//
  const {action,  } = props// 

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  // const formConfig = formatConfig(config);
    
  


  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息:',
      },
    },
    {
      itemProps: {
        label: '客户',
      },
    },
    {
      itemProps: {
        label: '户号',
      },
    },
    {
      itemProps: {
        label: '签约公司',
      },
    },
    {
      itemProps: {
        label: '客户代表',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '位置信息',
      },
    },
    {
      formType: 'Cascader',
      itemProps: {
        label: '区域',
      },
    },
    {
      itemProps: {
        label: '详细用电地址',
      },
    },
    {
      itemProps: {
        label: '邮编',
      },
    },
    {
      itemProps: {
        label: '经度',
      },
    },
    {
      itemProps: {
        label: '纬度',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '电气信息',
      },
    },
    {
      formType: 'Select',
      itemProps: {
        label: '变压器容量',
      },
    },
    
    {
      formType: 'Select',
      itemProps: {
        label: '电压等级',
      },
    },
    
    {
      formType: 'Select',
      itemProps: {
        label: '电价类型',
      },
    },
    
    {
      itemProps: {
        label: '电站数',
      },
    },
    
    
  ];

  if (action === 'detail') {
    config.push(
      <HouseNoFormTable key={'table'}  ></HouseNoFormTable>
    )
  }





  return (
    <div className={''}>
      <SmartForm
        // config={config}
        config={formatConfig(config)}
        // config={configs}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...props}
      ></SmartForm>



    </div>
  )
}

HouseNoForm.defaultProps = {}

export default HouseNoForm
