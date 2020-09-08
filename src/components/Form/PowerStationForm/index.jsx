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


const reportConfig = [
  { value: '是', key: 'key1',  },
  { value: '否', key: 'key2',  },
]

const reportOption = reportConfig.map((v) => <Radio value={v.key} key={v.key} >{v.value}</Radio>)
console.log(' reportOption  reportConfig.map v ： ', reportOption,   )



export const config = [
  {
    formType: 'rowText',
    // rowText: '基本信息:',
    // noRule: true,
    itemProps: {
      label: '基本信息:',
    },
  },
  {
    itemProps: {
      label: '所属客户',
    },
  },
  {
    itemProps: {
      label: '户号',
    },
  },
  
  {
    itemProps: {
      label: '电站名称',
    },
  },
  
  {
    itemProps: {
      label: '托管电站数',
    },
  },
  
  {
    formType: 'rowText',
    itemProps: {
      label: '电气信息',
    },
  },
  
  {
    itemProps: {
      label: '电源编号',
    },
  },
  
  {
    itemProps: {
      label: '进线名称',
    },
  },
  
  {
    itemProps: {
      label: '电压等级',
    },
  },
  
  {
    itemProps: {
      label: '倍率',
    },
  },
  
  {
    itemProps: {
      label: '变压器容童',
    },
  },


  {
    itemProps: {
      label: '电表号',
    },
  },
  {
    itemProps: {
      label: '电价类型',
    },
  },
  {
    itemProps: {
      label: '电功率考核因数',
    },
  },
  {
    itemProps: {
      label: '计费方式',
    },
  },

  
  
  
  {
    formType: 'rowText',
    itemProps: {
      label: '设备信息',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '请筛选设备',
    },
  },


  {
    formType: 'rowText',
    itemProps: {
      label: '监控信息',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '请筛选监控点',
    },
  },
  {
    formType: 'rowText',
    itemProps: {
      label: '一次电气图',
    },
  },
  
  <Form.Item
    key={'attach'} 
    name="upload"
    label="一次电气图"
    // extra="支持扩展名：.pdf"
  >
    <Upload name="logo" action="/upload.do" listType="picture">
      <Button icon={<UploadOutlined />}>文件</Button>
    </Upload>
  </Form.Item>,

  
  
];




const PowerStationForm = props => {
  console.log(' PowerStationForm ： ', props, config,  )//


  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  // const formConfig = formatConfig(config);
  

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

PowerStationForm.defaultProps = {}

export default PowerStationForm
