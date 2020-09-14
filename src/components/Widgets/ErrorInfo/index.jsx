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
  Divider,

} from 'antd'
import {
  UploadOutlined,
  PlusOutlined,
  CloseCircleOutlined,

} from '@ant-design/icons';







const ErrorInfo = (props) => {
  return <div className="errorInfo">
    <Divider></Divider>
    <div className={'errText'}  >错误信息</div>
    <div className={'errorRow'}  >
      <CloseCircleOutlined  className={'closeIcon'} /> 
      <span className="errorText">与公司名称不符</span>
    </div>
    <div className={'errorRow'}  >
      <CloseCircleOutlined  className={'closeIcon'} /> 
      <span className="errorText">与公司名称不符</span>
    </div>
    <div className="btnWrapper">
      <Button key="buy">返回列表</Button>
      <Button type="primary" >重新导入</Button>
    </div>
  </div> 
}

export default ErrorInfo // 



