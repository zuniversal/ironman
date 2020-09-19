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
import PowerStationForm from '@/components/Form/PowerStationForm'; //
import PowerStationTable from '@/components/Table/PowerStationTable'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //



export const SuccResult = props => {

  return <Result
    status="success"
    title="关联新增成功"
    // subTitle="subTitle"
    extra={[
      <Button type="primary" key="console">
        返回电站列表
      </Button>,
    ]}
  
  /> 
}

export const UploadCom = props => <div className="contentWrapper">
    <Upload
      listType="picture"
      onChange={props.onChange}
    >
      电站列表<Button icon={<UploadOutlined />}>上传文件</Button>
      <div className="extra">
        支持扩展名：xls, xlsx, csv,...
      </div>
    </Upload>
  </div>// 




class Contract extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showPowerStationForm: false,  

      showModalCom: null,  

      action: '',  
      title: '',  

      titleMap: {
        add: '新增电站',
        edit: '编辑电站',
        detail: '电站详情',
        newRelated: '关联新增',
        upload: '文件上传',
        down: '文件下载',
      },

      newTbData: [],  

    };
  }


  renderForm = (
    <div className={'fsb '}  >
      <SearchForm></SearchForm>
      <div className={'btnWrapper '}  >
        <Button type="primary "onClick={() => this.showContractModal({action: 'add',  })}  >新建电站</Button>
        <Button type="primary">同步OA数据</Button>
        <Button type="primary">导出电站数据</Button>
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


  showContractModal = (params, ) => {
    const {action,  } = params
    console.log('    showContractModal ： ', action, params, this.state, this.props,  );
    this.setState({
      action,
      show: true,
      title: this.state.titleMap[action],  
      modalForm: PowerStationForm,
    });
  };

  onPowerStationFormOk = async props => {
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
      showPowerStationForm: false,
    });
  };

  closePowerStationForm = e => {
    console.log('    closePowerStationForm ： ', e);
    this.setState({
      showPowerStationForm: false,
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
    const { show, showPowerStationForm, title, action,  } = this.state; //

    const tableProps = {
      edit: this.showContractModal,
      remove: this.showContractModal,
      tdClick: this.showContractModal,
      newTbData: this.state.newTbData,
    }

    const formComProps = {
      getCapture: this.showCapture,
      action: this.state.action,
    }


    return (
      <div className="contract">

        {this.renderForm}


        <PowerStationTable {...tableProps}  ></PowerStationTable>

        {/* <SmartModal show={show} onOk={this.onOk} onCancel={this.onCancel}
          title={title}
        >
          {this.renderModalContent()}
        </SmartModal> */}

        <SmartFormModal
          // width={'900px'}
          formComProps={{...tableProps, ...formComProps, action, }} 

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

export default Contract;