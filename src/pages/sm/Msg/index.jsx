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

import { Form, Input, Button, Checkbox, Menu, Upload, Result, Typography, Divider,  } from 'antd';
import {
  UploadOutlined,
  PlusOutlined,
  CloseCircleOutlined,

} from '@ant-design/icons';

import SmartModal from '@/common/SmartModal'; //
import SearchForm from '@/common/SearchForm'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import MsgForm from '@/components/Form/MsgForm'; //
import MsgTable from '@/components/Table/MsgTable'; //
import ResultModal, {ErrorInfo, } from '@/components/Modal/ResultModal'; //






export const TITLE = '消息'




class Msg extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showResultModal: false,  
      
      showModalCom: null,  
      modalContent: null,  

      action: '',  
      title: '',  
      msgTitle: '',  

      titleMap: {
        add: `新增${TITLE}`,
        edit: `编辑${TITLE}`,
        detail: `${TITLE}详情`,
        newRelated: `关联新增`,
        upload: `文件上传`,
        down: `文件下载`,
      },

    };
  }



  onResultModalCancel = (e,  ) => {
    console.log('    onResultModalCancel ： ', e,   )
    this.setState({
      showResultModal: false,
    })
    
  }
  showFormModal = (params, ) => {
    const {action ,  } = params
    console.log('    showFormModal ： ', action, params, this.state, this.props,  );
    this.setState({
      action,
      show: true,
      title: this.state.titleMap[action],  
      modalForm: MsgForm,
    });
  };


  renderForm = (
    <div className={'fsb '}  >
      <SearchForm></SearchForm>
      <div className={'btnWrapper'}>
        <Button type="primary "onClick={() => this.showFormModal({action: 'add',  })}  >新增{TITLE}</Button>
      </div>
    </div>
  );

  renderModalForm = (e,  ) => {
    console.log('    renderModalForm ： ', e, this.state, this.props,   )
    const {modalForm,  } = this.state// 
    if (modalForm) {
      return modalForm
    }
    
    // return null
  }
  renderModalContent = (e,  ) => {
    console.log('    renderModalContent ： ', e,   )
    const {modalContent,  } = this.state// 
    
    return modalContent
  }
  showModalContent = (params, ) => {
    const {action,  } = params
    console.log('    showModalContent ： ', action, params, this.state, this.props,  );
    this.setState({
      action,
      show: true,
      title: this.state.titleMap[action],  
    });
  };
  
  onSubmit = (e, rest) => {
    console.log('    onSubmit ： ', e, rest);
  };
  onFail = (e, rest) => {
    console.log('    onFail ： ', e, rest);
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
      modalForm: null,  
      modalContent: null,  
    });
  };

  renderTable = (e,  ) => {
    console.log('    renderTable ： ', e,   )
    const tableProps = {
      edit: this.showFormModal,
      remove: this.showFormModal,
      tdClick: this.showModalContent,
    }

    return <MsgTable {...tableProps}  ></MsgTable>
  }

  componentDidMount() {
    console.log(
      ' Msg 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //

    this.showFormModal({action: 'add',  });

  }

  render() {
    console.log(
      ' %c Msg 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const { show, title, msgTitle, action, showResultModal,  } = this.state; //


    const modalProps = {
      title: title,
      show: showResultModal,
      onOk: this.onResultModalOk,
      onCancel: this.onResultModalCancel,
    }
    const resProps = {
      status: 'error',  
      title: '导入成功',  
      subTitle: '请核对并修改以下信息后，再重新提交。',  
      // extra: [
      //   <Button  key="console" >返回列表</Button>,
      // ],
      // children: <ErrorInfo></ErrorInfo>,
    }
    
    return (
      <div className="Msg">
        
        {this.renderForm}


        {this.renderTable()}

 

        <SmartFormModal
          // width={'900px'}
          formComProps={{action, }} 

          title={title}
          onOk={this.onOk}
          onCancel={this.onCancel}
          show={show}
          FormCom={this.renderModalForm()}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        >
          {this.renderModalContent()}
        </SmartFormModal>


        <ResultModal
          modalProps={modalProps} 
          resProps={resProps} 
          
        >
          <ErrorInfo></ErrorInfo>
        </ResultModal>
        


      </div>
    );
  }
}

export default Msg;