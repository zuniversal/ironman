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
import SearchForm from '@/common/SearchForm'; //
import HouseNoTable from '@/components/Table/HouseNoTable'; //
import HouseNoForm from '@/components/Form/HouseNoForm'; //
import HouseNoSearchForm from '@/components/Form/HouseNoSearchForm'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //
import DropDownBtn from '@/common/DropDownBtn'; //



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


const TITLE = '资产'




class Assets extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,

      showModalCom: null,  

      action: '',  
      title: '',  
      houseNoTitle: '',  

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



  menuClick = (params,  ) => {
    console.log(' menuClick,  , ： ', params, this.state.titleMap, params.key,    )
  //   const {item,  } = this.props// 
    this.setState({
      show: true,
      title: this.state.titleMap[params.key],  
      modalContent: <UploadCom onChange={this.onUploadChange}   ></UploadCom>,
      // modalForm: UploadCom,
    })
  }
  
  showModalContent = (params, ) => {
    const {action,  } = params
    console.log('    showModalContent ： ', action, params, this.state, this.props,  );
    this.setState({
      action,
      show: true,
      title: this.state.titleMap[action],  
      modalForm: HouseNoForm,
    });
  };


  renderForm = (
    <div className={'fsb '}  >
      <HouseNoSearchForm></HouseNoSearchForm>
      <div className={'btnWrapper'}>
        <DropDownBtn menuConfig={menuConfig} menuClick={this.menuClick}   >Excel导入</DropDownBtn>
        <Button type="primary" htmlType="submit" onClick={this.onSubmit}>同步OA</Button>
        <Button type="primary "onClick={() => this.showModalContent({action: 'add',  })}  >新增{TITLE}</Button>
        <Button type="primary">导出{TITLE}数据</Button>
        <Button type="primary">删除</Button>
      </div>
    </div>
  );

  renderModalForm = (e,  ) => {
    console.log('    renderModalContent ： ', e, this.state, this.props,   )
    const {modalForm,  } = this.state// 
    if (modalForm) {
      return modalForm
    }
    
    // return null
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
      ' Assets 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //

    // this.showModalContent();
    // this.showModal();

  }

  render() {
    console.log(
      ' %c Assets 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const { show, title, houseNoTitle, action,  } = this.state; //

    const tableProps = {
      edit: this.showModalContent,
      remove: this.showModalContent,
      tdClick: this.showModalContent,
    }



    return (
      <div className="Assets">

        {this.renderForm}


        <HouseNoTable {...tableProps}  ></HouseNoTable>

        {/* <SmartModal show={show} onOk={this.onOk} onCancel={this.onCancel}
          title={title}
        >
          {this.renderModalContent()}
        </SmartModal> */}

        <SmartFormModal
          // width={'900px'}
          formComProps={{...tableProps, action, }} 

          title={title}
          show={show}
          onOk={this.onOk}
          onCancel={this.onCancel}
          show={show}
          FormCom={this.renderModalForm()}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        ></SmartFormModal>


      </div>
    );
  }
}

export default Assets;