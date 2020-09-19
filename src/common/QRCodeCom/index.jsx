import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import './style.less'

import PropTypes from 'prop-types'
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


QRCodeCom.defaultProps = {
  value: '按钮',

}

QRCodeCom.propTypes = {
  value: PropTypes.string,
  
}

export default QRCodeCom
