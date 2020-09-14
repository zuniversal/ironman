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
import SearchForm from '@/common/SearchForm'; //
import AssetsTable from '@/components/Table/AssetsTable'; //
import AssetsDetailTable from '@/components/Table/AssetsDetailTable'; //
import AssetsForm from '@/components/Form/AssetsForm'; //
import AssetsSearchForm from '@/components/Form/AssetsSearchForm'; //
import ResultModal from '@/components/Modal/ResultModal'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //
import ErrorInfo from '@/components/Widgets/ErrorInfo';





export const SuccResult = props => {

  return <Result
    status="success"
    title="关联新增成功"
    // subTitle="subTitle"
    extra={[
      <Button type="primary" key="console">
        返回{TITLE}列表
      </Button>,
    ]}
  
  /> 
}

export const UploadCom = props => <div className="contentWrapper">
    <Upload
      listType="picture"
      onChange={props.onChange}
    >
      {TITLE}列表<Button icon={<UploadOutlined />}>上传文件</Button>
      <div className="extra">
        支持扩展名：xls, xlsx, csv,...
      </div>
    </Upload>
  </div>// 


const menuConfig = [
  { key: 'upload', text: '上传文件' },
  { key: 'down', text: '下载数据模板' },
];


export const TITLE = '资产'
export const DEVICE = '设备'




class Assets extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showResultModal: false,  
      
      showModalCom: null,  
      modalContent: null,  

      action: '',  
      title: '',  
      assetsTitle: '',  

      titleMap: {
        add: `新增${DEVICE}`,
        edit: `编辑${DEVICE}`,
        detail: `${DEVICE}详情`,
        newRelated: `关联新增`,
        upload: `文件上传`,
        down: `文件下载`,
      },

      newTbData: [],  

    };
  }



  menuClick = (params,  ) => {
    console.log(' menuClick,  , ： ', params, this.state.titleMap,    )
  //   const {item,  } = this.props// 
    this.setState({
      showResultModal: true,
      // title: this.state.titleMap[params.key],  
      // modalContent: <ResultModal  ></ResultModal>,
      // modalContent: <UploadCom onChange={this.onUploadChange}   ></UploadCom>,
      // modalForm: UploadCom,
    })
  }
  onResultModalCancel = (e,  ) => {
    console.log('    onResultModalCancel ： ', e,   )
    this.setState({
      showResultModal: false,
    })
    
  }
  showFormModal = (params, ) => {
    const {action,  } = params
    console.log('    showFormModal ： ', action, params, this.state, this.props,  );
    this.setState({
      action,
      show: true,
      title: this.state.titleMap[action],  
      modalForm: AssetsForm,
    });
  };


  renderForm = (
    <div>
      <AssetsSearchForm></AssetsSearchForm>
      <Divider />
      <div className={'fsb '}  >
        <SearchForm></SearchForm>
        <div className={'btnWrapper'}>
          <DropDownBtn menuConfig={menuConfig} menuClick={this.menuClick}   >Excel导入</DropDownBtn>
          <Button type="primary" htmlType="submit" onClick={this.onSubmit}>同步OA</Button>
          <Button type="primary "onClick={() => this.showFormModal({action: 'add',  })}  >新增{TITLE}</Button>
          <Button type="primary">导出{TITLE}数据</Button>
          <Button type="primary">删除</Button>
        </div>
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
      modalContent: <AssetsDetailTable></AssetsDetailTable>,
    });
  };
  
  // onUploadChange = (params,  ) => {
  //   console.log(' onUploadChange,  , ： ', params,    )
  //   if (params.file.status === 'done') {
  //     this.setState({
  //       showModalCom: <ResultModal></ResultModal>,
  //     })
  //   }
    
  // }
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
    console.log(' onOkonOk ： ', props, this.state, this.props); //
    const { form } = props; //

    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res); //
      const {newTbData,  } = this.state// 
      this.setState({
        show: false,
        newTbData: [res, ...newTbData,  ],
      })
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

  };
  onCancel = e => {
    console.log(' onCancel ： ', e, this.state, this.props); //
    this.setState({
      show: false,
      modalForm: null,  
      modalContent: null,  
    });
  };

  componentDidMount() {
    console.log(
      ' Assets 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //

    // this.showFormModal();
    // this.menuClick();

  }

  render() {
    console.log(
      ' %c Assets 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const { show, title, assetsTitle, action, showResultModal,  } = this.state; //

    const tableProps = {
      edit: this.showFormModal,
      remove: this.showFormModal,
      tdClick: this.showModalContent,
      newTbData: this.state.newTbData,
    }

    const formComProps = {
      getCapture: this.showCapture,
      action: this.state.action,
    }

    const modalProps = {
      title: title,
      show: showResultModal,
      onOk: this.onResultModalOk,
      onCancel: this.onResultModalCancel,
    }
    const resProps = {
      status: 'error',  
      title: '导入失败',  
      subTitle: '请核对并修改以下信息后，再重新提交。',  
      // extra: [
      //   <Button  key="console" >返回列表</Button>,
      // ],
      // children: <ErrorInfo></ErrorInfo>,
    }
    
    return (
      <div className="Assets">

        {this.renderForm}


        <AssetsTable {...tableProps}  ></AssetsTable>

        {/* <SmartModal show={show} onOk={this.onOk} onCancel={this.onCancel}
          title={title}
        >
          {this.renderModalContent()}
        </SmartModal> */}

        <SmartFormModal
          // width={'900px'}
          formComProps={{...tableProps, ...formComProps, action, }} 

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
          {/* {this.renderModalContent()} */}
          <ErrorInfo></ErrorInfo>
        </ResultModal>
        


      </div>
    );
  }
}

export default Assets;