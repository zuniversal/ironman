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

import { Form, Input, Button, Checkbox, Menu, Upload, Result,   } from 'antd';
import {
  UploadOutlined,
  PlusOutlined,
  
} from '@ant-design/icons';
import SmartTable from '@/common/SmartTable'; //
import ContractForm from '@/components/Form/ContractForm'; //
import ContractSearchForm from '@/components/Form/ContractSearchForm'; //
import ContractFormModal from '@/components/Modal/ContractFormModal'; //
import ContractTable from '@/components/Table/ContractTable'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import ContractStepForm from '@/components/Form/ContractStepForm'; //

const menuConfig = [
  { key: 'upload', text: '上传文件' },
  { key: 'down', text: '下载数据模板' },
];



export const SuccResult = props => {

  return <Result
    status="success"
    title="关联新增成功"
    // subTitle="subTitle"
    extra={[
      <Button type="primary" key="console">
        返回合同列表
      </Button>,
    ]}
  
  /> 
}

export const UploadCom = props => <div className="contentWrapper">
    <Upload
      listType="picture"
      onChange={props.onChange}
    >
      合同列表<Button icon={<UploadOutlined />}>上传文件</Button>
      <div className="extra">
        支持扩展名：xls, xlsx, csv,...
      </div>
    </Upload>
  </div>// 

export const ContractFormCom = props => {
  console.log(' ContractFormCom ： ', props,    )// 
  return <div className={''}  >
    <div className={'fje'}  >
      <Button type="primary " onClick={() => props.showRelativeForm('newRelated')}  >关联新增</Button>
    </div>
    <ContractForm></ContractForm>
  </div>


}


class Contract extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showContractForm: false,  

      showModalCom: null,  

      action: '',  
      title: '',  
      contractTitle: '',  

      titleMap: {
        add: '新增合同',
        edit: '编辑合同',
        detail: '合同详情',
        newRelated: '关联新增',
        upload: '文件上传',
        down: '文件下载',
      },

    };
  }

  menuClick = (params,  ) => {
    console.log(' menuClick,  , ： ', params, this.state.titleMap, params.key,    )
  //   const {item,  } = this.props// 
    this.setState({
      show: true,
      title: this.state.titleMap[params.key],  
      showModalCom: <UploadCom onChange={this.onUploadChange}   ></UploadCom>,
    })
  }

  renderFormBtn = (
    <div className={'btnWrapper'}>
      {/* <Button type="primary" htmlType="submit"   >保存</Button> */}
      {/* <Button type="primary" onClick={this.showModal}>show</Button> */}
      {/* 注意 如果静态属性返回jsx 组件等内容 传递的方法必须放到属性之前 否则子组件得到的方法是 undefined */}
      <DropDownBtn menuConfig={menuConfig} menuClick={this.menuClick}   >Excel导入</DropDownBtn>
      <Button type="primary" htmlType="submit" onClick={this.onSubmit}>同步OA</Button>
      <Button type="primary "onClick={() => this.showContractModal({action: 'add',  })}  >新增合同</Button>
      <Button type="primary">导出合同数据</Button>
      <Button type="primary">删除</Button>
    </div>
  );

  renderModalContent = (e,  ) => {
    console.log('    renderModalContent ： ', e,   )
    const {showModalCom,  } = this.state// 
    if (showModalCom) {
      return showModalCom
    }
    

    
    return 
  }
  onUploadChange = (params,  ) => {
    console.log(' onUploadChange,  , ： ', params,    )
    if (params.file.status === 'done') {
      this.setState({
        showModalCom: <SuccResult></SuccResult>,
      })
    }
    
  }
  onSubmit = (e, rest) => {
    console.log('    onSubmit ： ', e, rest);
  };
  onFail = (e, rest) => {
    console.log('    onFail ： ', e, rest);
  };

  renderContractTable(params) {
    console.log(' renderContractTable ： ', params);
  }

  showContractModal = (params, ) => {
    const {action,  } = params
    console.log('    showContractModal ： ', action, params, this.state, this.props,  );
    this.setState({
      action,
      show: true,
      title: this.state.titleMap[action],  
      showModalCom: <ContractFormCom showRelativeForm={this.showRelativeForm}  ></ContractFormCom>,
    });
  };
  showRelativeForm = (action, ) => {
    console.log('    showRelativeForm ： ', action, this.state, this.props,  );
    this.setState({
      action,
      showContractForm: true,
      contractTitle: this.state.titleMap[action],  
    });
  };

  onContractFormOk = async props => {
    console.log(' onOk ： ', props, this.state, this.props); //
    const { form } = props; //
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
      showContractForm: false,
    });
  };

  closeContractForm = e => {
    console.log('    closeContractForm ： ', e);
    this.setState({
      showContractForm: false,
    });
  };
  showModal = e => {
    console.log('    showModal ： ', e);
    this.setState({
      show: true,
    });
  };
  onOk = async props => {
    console.log(' onOk ： ', props, this.state, this.props); //
    const { form } = props; //

    // try {
    //   const res = await form.validateFields();
    //   console.log('  res await 结果  ：', res); //
    // } catch (error) {
    //   console.log(' error ： ', error); //
    // }

    form
    .validateFields()
    .then(values => {
      console.log('  values await 结果  ：', values,  )//
      form.resetFields();
      // onCreate(values);
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });

    // this.setState({
    //   show: false,
    // });
  };
  onCancel = e => {
    console.log(' onCancel ： ', e, this.state, this.props); //
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

    // this.showContractModal();
    // this.showModal();

  }

  render() {
    console.log(
      ' %c Contract 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const { show, showContractForm, title, contractTitle,   } = this.state; //

    const tableProps = {
      edit: this.showContractModal,
      remove: this.showContractModal,
      tdClick: this.showContractModal,
    }

    return (
      <div className="contract">
        {/* Contract */}

        <ContractSearchForm
          formBtn={this.renderFormBtn}
          onSubmit={this.onSubmit}
          onFail={this.onFail}
        ></ContractSearchForm>

        {/* {this.renderContractTable()} */}

        <ContractTable {...tableProps}  ></ContractTable>

        {/* <SmartModal show={show} onOk={this.onOk} onCancel={this.onCancel}
          title={title}
        >
          {this.renderModalContent()}
        </SmartModal> */}

        <SmartFormModal
          // width={'900px'}
          title={title}
          show={show}
          onOk={this.onOk}
          onCancel={this.onCancel}
          top={
            <div className={'fje'}  >
              <Button type="primary " onClick={() => this.showRelativeForm('newRelated')}  >关联新增</Button>
            </div>
          }
          // FormCom={<ContractFormCom showRelativeForm={this.showRelativeForm}  ></ContractFormCom>}
          FormCom={ContractForm}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        ></SmartFormModal>

        {/* <SmartFormModal
          show={show} onOk={this.onOk} onCancel={this.onCancel}
          onSubmit={this.onSubmit}
          onFail={this.onFail}
        >
        </SmartFormModal> */}

        {/* <ContractFormModal
          width={'700px'}
          title={contractTitle}
          show={showContractForm}
          onOk={this.onOk}
          onCancel={this.closeContractForm}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        ></ContractFormModal> */}

        <SmartFormModal
          width={'900px'}
          title={contractTitle}
          show={showContractForm}
          onOk={this.onContractFormOk}
          onCancel={this.closeContractForm}
          FormCom={ContractStepForm}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        ></SmartFormModal>
      </div>
    );
  }
}

export default Contract;
