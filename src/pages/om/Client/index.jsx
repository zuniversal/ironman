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
import SmartTable from '@/common/SmartTable'; //
import ClientForm from '@/components/Form/ClientForm'; //
import ClientSearchForm from '@/components/Form/ClientSearchForm'; //
import ClientTable from '@/components/Table/ClientTable'; //
import ClientFormModal from '@/components/Modal/ClientFormModal'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //

class Client extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  renderFormBtn = (
    <>
      {/* <Button type="primary" htmlType="submit"   >保存</Button> */}
      {/* <Button type="primary" onClick={this.showModal}>show</Button> */}
      <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
        同步OA
      </Button>
      <Button type="primary">新建客户</Button>
      <Button type="primary">导出客户数据</Button>
      <Button type="primary">删除</Button>
    </>
  );

  onSubmit = (e, rest) => {
    console.log('    onSubmit ： ', e, rest);
  };
  onFail = (e, rest) => {
    console.log('    onFail ： ', e, rest);
  };

  renderClientTable(params) {
    console.log(' renderClientTable ： ', params);
  }

  showModal = e => {
    console.log('    showModal ： ', e);
    this.setState({
      show: true,
    });
  };
  handleOk = async props => {
    console.log(' handleOkhandleOk ： ', props, this.state, this.props); //
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
  onClose = e => {
    console.log(' onClose ： ', e, this.state, this.props); //
    this.setState({
      show: false,
    });
  };

  componentDidMount() {
    console.log(
      ' Client 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    this.showModal();
  }

  render() {
    console.log(
      ' %c Client 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const { show } = this.state; //

    return (
      <div className="Client">
        {/* Client */}

        <ClientFormModal
          // modalProps={
          //   {
          //     show: show,
          //     handleOk: this.handleOk,
          //     onClose: this.onClose,

          //   }

          // }
          // formsProps={
          //   {
          //     onSubmit: this.onSubmit,
          //     onFail: this.onFail,

          //   }
          // }
          show={show}
          handleOk={this.handleOk}
          onClose={this.onClose}
          onSubmit={this.onSubmit}
          onFail={this.onFail}
        ></ClientFormModal>

        {/* <SmartModal show={show} handleOk={this.handleOk} onClose={this.onClose}>
          <ClientForm
            onSubmit={this.onSubmit}
            onFail={this.onFail}
          ></ClientForm>
        </SmartModal> */}

        <ClientSearchForm
          formBtn={this.renderFormBtn}
          onSubmit={this.onSubmit}
          onFail={this.onFail}
        ></ClientSearchForm>

        {/* {this.renderClientTable()} */}

        <ClientTable showModal={this.showModal}></ClientTable>
      </div>
    );
  }
}

export default Client;
