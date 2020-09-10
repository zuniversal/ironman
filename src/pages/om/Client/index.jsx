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
      <Button type="primary "onClick={() => this.showContractModal({action: 'add',  })}  >新增客户</Button>
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

  renderClientTable(params) {
    console.log(' renderClientTable ： ', params);
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
      ' Client 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    // this.showModal();
  }

  render() {
    console.log(
      ' %c Client 组件 this.state, this.props ： ',
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
      <div className="Client">
        {/* Client */}

        {/* <ClientFormModal
          // modalProps={
          //   {
          //     show: show,
          //     onOk: this.onOk,
          //     onCancel: this.onCancel,

          //   }

          // }
          // formsProps={
          //   {
          //     onSubmit: this.onSubmit,
          //     onFail: this.onFail,

          //   }
          // }
          show={show}
          onOk={this.onOk}
          onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          onFail={this.onFail}
        ></ClientFormModal> */}


        <SmartFormModal
          // width={'900px'}
          title={title}
          show={show}
          onOk={this.onOk}
          onCancel={this.onCancel}
          // FormCom={<ContractFormCom showRelativeForm={this.showRelativeForm}  ></ContractFormCom>}
          FormCom={ClientForm}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        ></SmartFormModal>




        {/* <SmartModal show={show} onOk={this.onOk} onCancel={this.onCancel}>
          <ClientForm
            onSubmit={this.onSubmit}
            onFail={this.onFail}
          ></ClientForm>
        </SmartModal> */}

        <ClientSearchForm
          formBtn={this.renderFormBtn}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        ></ClientSearchForm>

        {/* {this.renderClientTable()} */}

        <ClientTable {...tableProps}  showModal={this.showModal} ></ClientTable>
      </div>
    );
  }
}

export default Client;
