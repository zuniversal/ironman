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
import UserCenterForm from '@/components/Form/UserCenterForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //

import { actions, mapStateToProps } from '@/models/userCenter'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

@connect(mapStateToProps)
@SmartHOC({
  actions,
})
class UserCenter extends PureComponent {
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
      <Button type="primary" htmlType="submit" onClick={this.onSubmit}>
        同步OA
      </Button>
      <Button
        type="primary "
        onClick={() => this.showContractModal({ action: 'add' })}
      >
        新增合同
      </Button>
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

  renderUserCenterTable = params => {
    console.log(' renderUserCenterTable ： ', params);
  }

  showContractModal = params => {
    const { action } = params;
    console.log(
      '    showContractModal ： ',
      action,
      params,
      this.state,
      this.props,
    );
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
      ' UserCenter 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    // this.showModal();
  }

  render() {
    console.log(
      ' %c UserCenter 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const { show, showContractForm, title } = this.state; //

    const tableProps = {
      edit: this.showContractModal,
      remove: this.showContractModal,
      tdClick: this.showContractModal,
    };

    return (
      <div className="userCenter dfc  ">
        <UserCenterForm init={this.props.itemDetail}></UserCenterForm>

        <SmartFormModal
          // width={'900px'}
          title={title}
          show={show}
          onOk={this.onOk}
          onCancel={this.onCancel}
          // FormCom={<ContractFormCom showRelativeForm={this.showRelativeForm}  ></ContractFormCom>}
          FormCom={UserCenterForm}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        ></SmartFormModal>

        {/* <UserCenterSearchForm
          formBtn={this.renderFormBtn}
          onSubmit={this.onSubmit}
          onFail={this.onFail}
        ></UserCenterSearchForm>
        

        <UserCenterTable {...tableProps}  showModal={this.showModal} ></UserCenterTable> */}
      </div>
    );
  }
}

export default UserCenter;
