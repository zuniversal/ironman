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
import ClientRadar from '@/components/Echarts/ClientRadar'; //
import SmartModal from '@/common/SmartModal'; //
import SmartFormModal from '@/common/SmartFormModal'; //


import {
  getList, 
  getItem, 
  getListAsync,
  getItemAsync,
  addItemAsync,
  editItemAsync,
  removeItemAsync,  
  
  syncOAAsync,
  getPortraitAsync,

} from '@/models/client'//
import { connect } from 'umi';

console.log(' getListAsync ： ', getListAsync,  )// 
// import { getItem,  } from '@/services/client'//
// const res = getItem().then(res => {
//   console.log('  getItem  ： ', res, getItem, getListAsync,   )
//   getItem({
//   })
//   getListAsync()
// })




export const TITLE = '客户'


// const mapStateToProps = ({ client, }) => ({client});
// const mapStateToProps = ({ client, }) => ({...client});
const mapStateToProps = ({ client, }) => client;
const mapActions = {
  getListAsync,
  getItemAsync,
  getList,
  getItem,

}

// const mapActions = (...rest) => {
//   console.log(' mapActions ： ', rest,  )// 
//   return {
//     addItemAsync,
//     getListAsync,
//     getList,
//     getItem,
  
//   } 
// }


// @connect(mapStateToProps, mapActions)
@connect(mapStateToProps, )
// @connect((state) => {
//   console.log(' statestate ： ', state,  )// 
//   return state.client
// }, )
class Client extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,

      action: '',  
      title: '',  
      Title: '',  
      titleMap: {
        add: `新增${TITLE}`,
        edit: `编辑${TITLE}`,
        detail: `${TITLE}详情`,
        userCapture: `${TITLE}画像`,
      },

      commonContent: null,  
      commonTitle: '',  
      isShowModal: false,  

      modalContent: null,  


      newTbData: [], 
      editData: {},  


      selectedRowKeys: [],
      selectedRows: [],
      

    };
  }
  
  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(' onSelectChange ： ', selectedRowKeys, selectedRows, this.state, this.props,    )// 

    this.setState({ 
      selectedRowKeys, 
      selectedRows,
    });
  }
  syncOAAsync = (params,  ) => {
    console.log(' syncOAAsync,  , ： ', params,    )
    const {dispatch,    } = this.props// 

    dispatch(syncOAAsync({
    }))
    
  }
  getPortraitAsync = (params,  ) => {
    console.log(' getPortraitAsync,  , ： ', params,    )
    const {dispatch,    } = this.props// 
    
    dispatch(
      getPortraitAsync({
      })
    )
    
  }


  showFormModal = (params, ) => {
    const {action,  } = params
    console.log('    showFormModal ： ', action, params, this.state, this.props,  );
    const isEdit = action === 'edit'
    if (isEdit) {
      const {dispatch,  } = this.props// 
      dispatch(getItemAsync({
        d_id: 100, 
      }))
      
    }
    
    this.setState({
      action,
      show: true,
      title: this.state.titleMap[action],  
      modalForm: ClientForm,

      editData: action === 'edit' ? params.record : {}, 
    });
  };

  renderFormBtn = (params, ) => (
    <div className={'btnWrapper'}>
      {/* <Button type="primary" htmlType="submit"   >保存</Button> */}
      {/* <Button type="primary" onClick={this.showModal}>show</Button> */}
      <Button type="primary" onClick={this.syncOAAsync}>同步OA</Button>
      <Button type="primary " onClick={() => this.showFormModal({action: 'add',  })}  >新增客户</Button>
      <Button type="primary" onClick={() => this.syncOAAsync({action: 'add',  })} >导出客户数据</Button>
      <Button type="primary" onClick={() => this.onBatchRemove()} >删除</Button>
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
      modalForm: ClientForm,
    });
  };

  onSubmit = (e, rest) => {
    console.log('    onSubmit ： ', e, rest);
  };
  onFail = (e, rest) => {
    console.log('    onFail ： ', e, rest);
  };

  renderClientTable(params) {
    console.log(' renderClientTable ： ', params);
  }

  showModal = (params, ) => {
    const {action,  } = params
    console.log('    showModal ： ', action, params, this.state, this.props,  );
    this.setState({
      action,
      show: true,
      title: this.state.titleMap[action],  
    });
  };

  onRemove = (props, ) => {
    console.log(' onRemove ： ', props, this.state, this.props); 
    const {dispatch,    } = this.props// 

    dispatch(removeItemAsync([
      // d_id: props.record.id,
      // ...props.record,
      props.record,
    ]))

  };
  onBatchRemove = (props, ) => {
    console.log(' onBatchRemove ： ', props, this.state, this.props); 
    const {dispatch,    } = this.props// 
    const {selectedRows,  } = this.state// 

    dispatch(removeItemAsync(selectedRows))

  };
  onOk = async (props, ) => {
    console.log(' onOkonOk ： ', props, this.state, this.props); 
    const {action,  } = this.state// 
    let actionFn = addItemAsync
    if (action === 'edit') { 
      actionFn = editItemAsync
    }
    
    const { form } = props; //

    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action, actionFn,    ); //
      const {dispatch,    } = this.props// 
      dispatch(actionFn({
        data: res,
      }))
      // const {addItemAsync,  } = this.props// 
      //addItemAsync(res)
      
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


  showCapture = (params, ) => {
    const {action,  } = params
    console.log(' showCapture,  , ： ', action,    )
    const {dispatch, portraitData,    } = this.props// 
    dispatch(getPortraitAsync({
      d_id: 999, 
    }))

    this.setState({
      isShowModal: true,
      action,
      commonTitle: this.state.titleMap[action],  
      commonContent: <ClientRadar data={portraitData}  ></ClientRadar>, 
    })
  }
  showCommonModal = (params,  ) => {
    console.log(' showCommonModal,  , ： ', params,    )
    this.setState({
      isShowModal: true,
      // commonContent: , 
    })
  }
  onModalOk = (params,  ) => {
    console.log(' onModalOk,  , ： ', params,    )
    this.setState({
      isShowModal: false,
    })
  }
  onModalCancel = (params,  ) => {
    console.log(' onModalCancel,  , ： ', params,    )
    this.setState({
      isShowModal: false,
    })
  }
  renderContent = (e,  ) => {
    console.log('    renderContent ： ', e,   )
    const {commonContent,  } = this.state// 
    return commonContent
  }

  getList = (e,  ) => {
    console.log('    getList ： ', e, this.state, this.props,   )
    
    const {dispatch,    } = this.props// 
    dispatch(getListAsync({
    }))


    // const {dispatch, getItem, getListAsync, getItemAsync,   } = this.props// 
    // dispatch({ type: 'client/getItem' })
    // getItem({
    // })

    // getListAsync({
    // })
    // getItemAsync({
    //   d_id: 100, 
    // })



  }




  componentDidMount() {
    console.log(
      ' Client 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    // this.showModal();
    // this.showModal({action: 'edit',  });
    // this.showCapture({action: 'userCapture',  });

    this.getList()
    
  }

  render() {
    console.log(
      ' %c Client 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const { show, showForm, title, isShowModal, commonTitle,   } = this.state; //


    const tableProps = {
      // edit: this.showModal,
      // remove: this.showModal,
      // tdClick: this.showModal,
      
      edit: this.showFormModal,
      remove: this.showFormModal,
      remove: this.onRemove,
      tdClick: this.showModalContent,
      newTbData: this.state.newTbData,
      dataSource: this.props.clientList,
      onSelectChange: this.onSelectChange,
    }

    const formComProps = {
      getCapture: this.showCapture,
      action: this.state.action,
      // init: this.state.editData, 
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


        <ClientSearchForm
          formBtn={this.renderFormBtn()}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        ></ClientSearchForm>

        {/* {this.renderClientTable()} */}

        <ClientTable {...tableProps}  showModal={this.showModal} ></ClientTable>



        <SmartFormModal
          // width={'900px'}

          title={title}
          show={show}
          onOk={this.onOk}
          onCancel={this.onCancel}
          // FormCom={<FormCom showRelativeForm={this.showRelativeForm}  ></FormCom>}

          formComProps={formComProps}
          FormCom={this.renderModalForm()}
          // onSubmit={this.onSubmit}
          // onFail={this.onFail}
        >
          {this.renderModalContent()}
        </SmartFormModal>


        <SmartModal 
          title={commonTitle} 
          show={isShowModal} 
          onOk={this.onModalOk} 
          onCancel={this.onModalCancel}
          
        >
          {this.renderContent()}
        </SmartModal>


        {/* <SmartModal show={show} onOk={this.onOk} onCancel={this.onCancel}>
          <ClientForm
            onSubmit={this.onSubmit}
            onFail={this.onFail}
          ></ClientForm>
        </SmartModal> */}





      </div>
    );
  }
}

export default Client;
