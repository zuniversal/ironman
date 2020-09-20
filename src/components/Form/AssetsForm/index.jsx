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
// import AssetsFormTable from 'smartTb/AssetsFormTable'; //
import { regoins } from '@/configs'//
import { formatConfig } from '@/utils'//
import {UploadCom,  } from '@/components/Temp'// 







const AssetsForm = props => {
  console.log(' AssetsForm ： ', props, config,  )//
  const {action,  } = props// 

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  // const formConfig = formatConfig(config);
    
  


  const config = [
    {
      formType: 'Select',
      itemProps: {
        label: '户号',
        name: '',  
      },
    },
    {
      formType: 'Select',
      itemProps: {
        label: '电站',
        name: 'station',  
      },
    },
    // {
    //   formType: 'Divider',
    //   itemProps: {
    //     label: '',
    //     name: '',  
    //   },
    // },
    {
      formType: 'Select',
      noRule: true,  
      itemProps: {
        label: '上级设备',
        name: 'parent_id',  
      },
    },
    {
      formType: 'Select',
      noRule: true,  
      itemProps: {
        label: '设备名称',
        name: 'name',  
      },
    },
    {
      noRule: true,  
      itemProps: {
        label: '设备编号',
        name: 'code',  
      },
    },
    {
      noRule: true,  
      itemProps: {
        label: '出厂号',
        name: '',  
      },
    },
    {
      itemProps: {
        label: '设备型号',
        name: 'type',  
      },
    },
    {
      itemProps: {
        label: '额定电压',
        name: 'voltage',  
      },
    },
    {
      itemProps: {
        label: '额定电流',
        name: 'electricity',  
      },
    },
    {
      itemProps: {
        label: '变压容量',
        name: 'transformer_capacity',  
      },
    },
    {
      formType: 'DatePicker',
      noRule: true,  
      itemProps: {
        label: '出厂日期',
        name: 'production_date',  
      },
    },
    {
      formType: 'DatePicker',
      noRule: true,  
      itemProps: {
        label: '投运日期',
        name: 'operation_date',  
      },
    },

    <UploadCom label={'上传铭牌'} key={'uploadCom'}    ></UploadCom>,
    
  ];

  // if (action === 'detail') {
  //   config.push(
  //     <AssetsFormTable></AssetsFormTable>
  //   )
  // }





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

AssetsForm.defaultProps = {}

export default AssetsForm
