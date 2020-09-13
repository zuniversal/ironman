import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import PropTypes from 'prop-types'
import './style.less'
import {
  Table,
  Icon,
  notification,
  Modal,
  Button,
  Tag,
  Form,
  Input,
  Row,
  Col,
  Menu,
  Dropdown,
} from 'antd'
import QRCode from 'qrcode.react'

const QRCodeCom = (props,  ) => {
  console.log(' QRCodeCom ： ', props, ) //

  const { value = 'zyb', children = '按钮',    } = props //
  let str = value
  if (typeof value === 'object') {
    str = JSON.stringify(value)
  }
  console.log(' str ： ', str,  )// 
  return (
    <QRCode {...props} value={str}   />
  )
}

// QRCodeCom.defaultProps = {
//   placeholder: '按钮',
//   noEllipsis: false,
//   menuConfig: [],
//   menuClick: () => {},  
// }

// QRCodeCom.propTypes = {
//   noEllipsis: PropTypes.bool,
//   noEllipsis: PropTypes.bool,
//   menuConfig: PropTypes.array,
//   menuClick: PropTypes.func,

// }

export default QRCodeCom
