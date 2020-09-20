import React from 'react'
import PropTypes from 'prop-types'
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






const SuccResult = props => {

  return <Result
    status="success"
    title={props.title}
    // subTitle="subTitle"
    // extra={extra}
    {...props} 
  /> 
}



SuccResult.defaultProps = {
  title: '操作成功',
  extra: [
    <Button type="primary" key="console"  >
      返回列表
    </Button>
  ],  
  // Click: () => {}, 


};

SuccResult.propTypes = {
  className: PropTypes.string,
  extra: PropTypes.array,
  // Click: PropTypes.func,

}

export default SuccResult // 



