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

import { Form, Input, Button, Checkbox } from 'antd';


import { DragDropContext, Droppable, Draggable,   } from 'react-beautiful-dnd';
import Dnd from './Dnd'// 
import CalendarCom from './CalendarCom'// 
// import SmartHOC from '@/common/SmartHOC';
import DashMap from '@/components/Echarts/DashMap';
import CURD from './CURD'// 
import ProvinceForm from '@/components/Form/ProvinceForm'; //
import { connect } from 'umi';


const mapStateToProps = ({ client, }) => client;


@connect(mapStateToProps, )
// @SmartHOC()
class Test extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,

      action: '',  
      title: '',  
      contractTitle: '',  
      titleMap: {
        add: '新增客户',
        edit: '编辑客户',
        detail: '客户详情',
      },

    };
  }

  renderFormBtn = (
    <div className={'btnWrapper'}>
      {/* <Button type="primary" htmlType="submit"   >保存</Button> */}
      {/* <Button type="primary" onClick={this.showModal}>show</Button> */}
      <Button type="primary" htmlType="submit" onClick={this.onSubmit}>同步OA</Button>
      <Button type="primary "onClick={() => this.showContractModal({action: 'add',  })}  >新增合同</Button>
      <Button type="primary">导出客户数据</Button>
      <Button type="primary">删除</Button>
    </div>
  );

  onSubmit = (e, rest) => {
    console.log('    onSubmit ： ', e, rest);
  };
  onFail = (e, rest) => {
    console.log('    onFail ： ', e, rest);
  };

  renderTestTable(params) {
    console.log(' renderTestTable ： ', params);
  }

  showContractModal = (params, ) => {
    const {action,  } = params
    console.log('    showContractModal ： ', action, params, this.state, this.props,  );
    this.setState({
      action,
      show: true,
      title: this.state.titleMap[action],  
    });
  };
  showModal = e => {
    console.log('    showModal ： ', e);
    this.setState({
      show: true,
    });
  };
  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { form } = props; //

    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res); //
    } catch (error) {
      console.log(' error ： ', error); //
    }

    // form
    // .validateFields()
    // .then(values => {
    //   console.log('  values await 结果  ：', values,  )//
    //   form.resetFields();
    //   // onCreate(values);
    // })
    // .catch(info => {
    //   console.log('Validate Failed:', info);
    // });

    this.setState({
      // show: false,
    });
  };
  onCancel = e => {
    console.log(' onCancel ： ', e, this.state, this.props); //
    this.setState({
      show: false,
    });
  };

  componentDidMount() {
    console.log(
      ' Test 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    // this.showModal();
  }

  render() {
    console.log(
      ' %c Test 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const { show, showContractForm, title,   } = this.state; //

    const tableProps = {
      edit: this.showContractModal,
      remove: this.showContractModal,
      tdClick: this.showContractModal,
    }



    return (
      <div className="Test   ">


        {/* <ProvinceForm></ProvinceForm> */}
        {/* <Dnd></Dnd> */}
        {/* <CalendarCom></CalendarCom> */}
        {/* <DashMap></DashMap> */}
        

        <CURD></CURD>




      </div>
    );
  }
}

export default Test;
