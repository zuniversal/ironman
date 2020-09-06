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

import { Form, Input, Button, Checkbox, Menu } from 'antd';
import SmartTable from '@/common/SmartTable'; //
import ContractForm from '@/components/Form/ContractForm'; //
import ContractSearchForm from '@/components/Form/ContractSearchForm'; //
import ContractFormModal from '@/components/Modal/ContractFormModal'; //
import ContractTable from '@/components/Table/ContractTable'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //

const menuConfig = [
  { key: 'upload', text: '上传文件' },
  { key: 'down', text: '下载数据模板' },
];

class Contract extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  renderFormBtn = (
    <div className={'btnWrapper'}>
      {/* <Button type="primary" htmlType="submit"   >保存</Button> */}
      {/* <Button type="primary" onClick={this.showModal}>show</Button> */}
      <DropDownBtn menuConfig={menuConfig}>新增合同</DropDownBtn>
      <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
        同步OA
      </Button>
      <Button type="primary">新增合同</Button>
      <Button type="primary">导出合同数据</Button>
      <Button type="primary">删除</Button>
    </div>
  );

  onSubmit = (e, rest) => {
    console.log('    onSubmit ： ', e, rest);
  };
  onFail = (e, rest) => {
    console.log('    onFail ： ', e, rest);
  };

  renderContractTable(params) {
    console.log(' renderContractTable ： ', params);
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
      ' Contract 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    this.showModal();
  }

  render() {
    console.log(
      ' %c Contract 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const { show } = this.state; //

    return (
      <div className="contract">
        {/* Contract */}

        <ContractSearchForm
          formBtn={this.renderFormBtn}
          onSubmit={this.onSubmit}
          onFail={this.onFail}
        ></ContractSearchForm>

        {/* {this.renderContractTable()} */}

        <ContractTable showModal={this.showModal}></ContractTable>

        {/* <SmartModal show={show} handleOk={this.handleOk} onClose={this.onClose}>
        </SmartModal> */}

        {/* <SmartFormModal
          show={show} handleOk={this.handleOk} onClose={this.onClose}
          onSubmit={this.onSubmit}
          onFail={this.onFail}
        >
        </SmartFormModal> */}

        <ContractFormModal
          show={show}
          handleOk={this.handleOk}
          onClose={this.onClose}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        ></ContractFormModal>
      </div>
    );
  }
}

export default Contract;
