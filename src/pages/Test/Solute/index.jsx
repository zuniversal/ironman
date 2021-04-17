import React from 'react';
import './style.less';
import { getItem } from '@/utils';
import {
  Card,
  Button,
  Input,
  Icon,
  Modal,
  Switch,
  Form,
  Row,
  Col,
  Select,
} from 'antd';

class Fb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    // this.getExec()
    const datas = getItem('daan');
    console.log('  datas ：', datas);
    this.setState({
      data: datas,
    });
  }
  render() {
    console.log(
      ' %c Fb 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    return (
      <div>
        {this.state.data
          .map(v => {
            const str = v.replace(/data-src/gi, 'src');
            // console.log('  str ：', str);
            // return v
            return str;
          })
          .map((v, i) => {
            console.log('  v ：', v);
            return (
              <div className={'row'} key={i}>
                {i + 1}. <span dangerouslySetInnerHTML={{ __html: v }}></span>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Fb;
