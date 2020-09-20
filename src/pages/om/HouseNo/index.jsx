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
import UploadFileCom from '@/components/Widgets/UploadFileCom'; //
import SuccResult from '@/components/Widgets/SuccResult'; //

import { actions, mapStateToProps,  } from '@/models/houseNo'//
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';






const menuConfig = [
  { key: 'upload', clickFn: 'showUploadModal', action: 'upload', text: '上传文件' },
  { key: 'down', clickFn: 'downloadFile', action: 'down', text: '下载数据模板' },
];


const TITLE = '户号'


const titleMap =  {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  newRelated: `关联新增`,
  upload: `文件上传`,
  down: `文件下载`,
}

// const mapStateToProps = ({ houseNo, }) => houseNo;


@connect(mapStateToProps, )
@SmartHOC({
  actions,
  titleMap,
  modalForm: HouseNoForm,

})
class HouseNo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,

      showModalCom: null,  

      action: '',  
      title: '',  

      titleMap,
      
      newTbData: [],  

    };
  }


  onUploadChange = (params,  ) => {
    console.log(' onUploadChange,  , ： ', params,    )
    if (params.file.status === 'done') {
      setTimeout(() => {
        console.log('  延时器 ： ',  )
        this.setState({
          modalContent: <SuccResult></SuccResult>,
        })
        
      }, 2000)
      
    }
  }
  showUploadModal = (params, ) => {
    console.log('    showUploadModal ： ', params,  )
    //   const {item,  } = this.props// 
    const {action,  } = params
    
    this.setState({
      show: true,
      action,
      modalContent: <UploadFileCom onChange={this.onUploadChange} label={titleMap[action]}  ></UploadFileCom>,
    })
  }
  downloadFile = (params, ) => {
    console.log('    downloadFile ： ', params,  )
    this.props.downloadFile()
  }

  menuClick = (params,  ) => {
    const {key, clickFn, } = params
    console.log(' menuClick,  , ： ', params, this.state.titleMap, params.key,    )
    if (clickFn) {
      this[clickFn](params)
      return  
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


  
  // renderFormBtn = (params, ) => {
  //   console.log(' renderFormBtn ： ', params,    )// 
  //   return <div className={'fsb '}  >
  //     <HouseNoSearchForm></HouseNoSearchForm>
  //     <div className={'btnWrapper'}>
  //       <DropDownBtn menuConfig={menuConfig} menuClick={this.menuClick}   >Excel导入</DropDownBtn>
  //       <Button type="primary" htmlType="submit" onClick={this.props.syncOAAsync}>同步OA</Button>
  //       <Button type="primary" onClick={() => this.props.showFormModal({action: 'add',  })}  >新增{TITLE}</Button>
  //       <Button type="primary">导出{TITLE}数据</Button>
  //       <Button type="primary">删除</Button>
  //     </div>
  //   </div>
  // }

  renderModalContent = (e,  ) => {
    console.log('    renderModalContent ： ', e, this.state, this.props,   )
    const {modalContent,  } = this.state// 
    if (modalContent) {
      return modalContent
    }
    
    // return null
  }

  renderSearchForm(params,  ) {
    // console.log(' renderSearchForm ： ', params,  )
    return <div className={'fsb '}  >
      <HouseNoSearchForm></HouseNoSearchForm>
      <div className={'btnWrapper'}>
        <DropDownBtn menuConfig={menuConfig} menuClick={this.menuClick}   >Excel导入</DropDownBtn>
        <Button type="primary" htmlType="submit" onClick={this.props.syncOAAsync}>同步OA</Button>
        <Button type="primary" onClick={() => this.props.showFormModal({action: 'add',  })}  >新增{TITLE}</Button>
        <Button type="primary" onClick={() => this.props.exportData()} >导出{TITLE}数据</Button>
        <Button type="primary" onClick={() => this.props.onBatchRemove()} >删除</Button>
      </div>
    </div>
    return <HouseNoSearchForm
      formBtn={this.renderFormBtn}
      // onSubmit={this.onSubmit}
      // onFail={this.onFail}
    ></HouseNoSearchForm>
  }
  
  renderTable(params,  ) {
    console.log(' renderTable ： ', params, this.state, this.props,  )

    const tableProps = {
      newTbData: this.state.newTbData,


      onSelectChange: this.props.onSelectChange,
      tdClick: this.props.showFormModal,
      showDetail: this.props.showFormModal,
      dataSource: this.props.dataList,
      edit: this.props.showFormModal,
      remove: this.props.onRemove,
    }

    return <HouseNoTable {...tableProps}   ></HouseNoTable>
  }
  
  renderSmartModal(params,  ) {
    console.log(' renderSmartModal ： ', params, this.state, this.props,  )
    const { show, title, action, titleMap,   } = this.state; //

    return <SmartModal 
      show={show} onOk={this.onOk} onCancel={this.onCancel}
      action={action}
      titleMap={titleMap}
    >
      {this.renderModalContent()}
    </SmartModal>
  }
  

  render() {
    console.log(
      ' %c HouseNo 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const { show, title, action, titleMap,   } = this.state; //

    const formComProps = {
      getCapture: this.showCapture,
      action: this.state.action,
    }



    return (
      <div className="HouseNo">

        {this.renderSearchForm()}

        {this.renderTable()}
        
        {this.renderSmartModal()}



        

        {/* <SmartFormModal
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
        ></SmartFormModal> */}


      </div>
    );
  }
}

export default HouseNo;