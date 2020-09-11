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


export const ImgBlock = (props, ) => {
  console.log(' ImgBlock   props, ,   ： ', props,   )
  return <div className="imgBlock">
    {props.children}
  </div> 
}


export const UploadCom = (props, ) => {
  console.log(' UploadCom   props, ,   ： ', props,   )
  return <Form.Item
    key={'attach'} 
    name="upload"
    label={props.label}
    colon={false}
    // extra="支持扩展名：.pdf"
  >
    <Upload name="logo" action="/upload.do"  listType="picture-card" >
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传照片</div>
      </div>
    </Upload>
  </Form.Item> 
}





class Temp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>

      </>
    );
  }
}

export default Temp;
