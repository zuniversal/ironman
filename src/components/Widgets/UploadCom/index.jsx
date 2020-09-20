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



const UploadCom = (props, ) => {
  console.log(' UploadCom   props, ,   ： ', props,   )
  return <Form.Item
    key={'attach'} 
    name="upload"
    label={props.label}
    colon={false}
    // extra="支持扩展名：.pdf"
  >
    <Upload name="logo" action="/upload.do" 
      // devScripts.js:5836 Warning: [antd: Upload] `value` is not a valid prop, do you mean `fileList`? 
      fileList={[]}
      listType="picture-card" className={'uploadCom'}  >
      <div>
        <PlusOutlined className={'icon'}  />
        <div className={'text'}  >上传照片</div>
      </div>
    </Upload>
  </Form.Item> 
}



export default UploadCom;
