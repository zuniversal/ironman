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

import bell from '@/static/img/bell.png'// 
import search from '@/static/img/search.png'// 
import ok from '@/static/img/ok.png'// 
import close from '@/static/img/close.png'// 
import warning from '@/static/img/warning.png'// 

// import * as Imgs from '@/static/img'// 

const iconMap = {
  bell,
  search,
  ok,
  close,
  warning,
}




export const Bell = (props, ) => {
  console.log(' Bell   props, ,   ： ', props,   )
  return <img
    src={bell}  
    {...props}
  /> 
}

const Icon = (props, ) => {
  // console.log(' Icon   props, ,   ： ', props,   )
  const {icon = 'bell',  } = props
  return <img
    src={iconMap[icon]}  
    {...props}
  /> 
}

export default Icon // 



