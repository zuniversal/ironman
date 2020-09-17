import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';

import { Form, Input, Button, Spin,  } from 'antd';



export default Com => (class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      exportData: [],
      path: '',
    }
  }

  render() {
    console.log('CRUDHoc 组件 this.state, this.props ：', this.state, this.props, )
    const {show, exportData, path, } = this.state 
    return <div className="CRUDHocWrapper">
      <Com {...this.props} exportReport={this.exportReport} />
      
    </div>
  }

})

