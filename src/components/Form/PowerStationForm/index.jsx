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
import {DeviceInfoTable, WatchInfoTable, } from '@/components/Table/PowerStationInfoTable'; //
import UploadCom from '@/components/Widgets/UploadCom'; //
import { regoins } from '@/configs'//
import { formatConfig, reportRadioOp,  } from '@/utils'//  






const PowerStationForm = props => {
  console.log(' PowerStationForm ： ', props, config,  )//
  const {action,  } = props// 

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  // const formConfig = formatConfig(config);
    
    
  const deciveRow = {
    formType: 'rowText',
    itemProps: {
      label: '设备信息',
    },
  }
  const watchRow = {
    formType: 'rowText',
    itemProps: {
      label: '设备信息',
    },
  }
  


  const addCol = [
    deciveRow,
    {
      noRule: true,  
      formType: 'Select',
      itemProps: {
        label: '请筛选设备',
      },
    },
    watchRow,
    {
      noRule: true,  
      formType: 'Select',
      itemProps: {
        label: '请筛选监控点',
      },
    }

  ]

  const editCol = [
    deciveRow,
    <DeviceInfoTable key={'DeviceInfoTable'}  pagination={false} ></DeviceInfoTable>,
    watchRow,
    <WatchInfoTable key={'WatchInfoTable'}  pagination={false} ></WatchInfoTable>,
    {
      formType: 'rowText',
      itemProps: {
        label: '电气信息',
      },
    },
    
    {
      itemProps: {
        label: '详细地址',
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
  ]

  let typeCols = []
  
  if (action === 'add') {
    typeCols = addCol
  } else if (action === 'edit') {
    typeCols = editCol
  }
  
  



  const config = [
    {
      formType: 'rowText',
      // rowText: '基本信息',
      // noRule: true,
      itemProps: {
        label: '基本信息',
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

    
    
    ...typeCols, 



    {
      formType: 'rowText',
      itemProps: {
        label: '一次电气图',
      },
    },

    <UploadCom label={'上传铭牌'} key={'uploadCom'}    ></UploadCom>,
    
    
    // <Form.Item
    //   key={'attach'} 
    //   name="upload"
    //   label="上传电气图"
    //   colon={false}
    //   // extra="支持扩展名：.pdf"
    // >
    //   <Upload name="logo" action="/upload.do"  listType="picture-card" >
    //     <div>
    //       <PlusOutlined />
    //       <div style={{ marginTop: 8 }}>上传照片</div>
    //     </div>
    //   </Upload>
    // </Form.Item>,

    
    
  ];



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
