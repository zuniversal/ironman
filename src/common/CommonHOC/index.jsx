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

import { Form, Input, Button, Spin,  } from 'antd';



export default ({actions,  }) => Com => (class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      action: '',  
      title: '',  

      commonContent: null,  
      commonTitle: '',  
      isShowModal: false,  

      modalContent: null,  

 
      editData: {},  


      selectedRowKeys: [],
      selectedRows: [],
      

    };
  }
  
  // syncOAAsync = (params,  ) => {
  //   console.log(' syncOAAsync,  , ： ', params,    )
  //   const {dispatch,    } = this.props// 

  //   dispatch(syncOAAsync({
  //   }))
    
  // }
  // getPortraitAsync = (params,  ) => {
  //   console.log(' getPortraitAsync,  , ： ', params,    )
  //   const {dispatch,    } = this.props// 
    
  //   dispatch(
  //     getPortraitAsync({
  //     })
  //   )
    
  // }


  // showFormModal = (params, ) => {
  //   const {action,  } = params
  //   console.log('    showFormModal ： ', action, params, this.state, this.props,  );
  //   const isEdit = action === 'edit'
  //   if (isEdit) {
  //     const {dispatch,  } = this.props// 
  //     dispatch(getItemAsync({
  //       d_id: 100, 
  //     }))
      
  //   }
    
  //   this.setState({
  //     action,
  //     show: true,
  //     title: this.state.titleMap[action],  
  //     modalForm: ClientForm,

  //     editData: action === 'edit' ? params.record : {}, 
  //   });
  // };

  // renderModalForm = (e,  ) => {
  //   console.log('    renderModalForm ： ', e, this.state, this.props,   )
  //   const {modalForm,  } = this.state// 
  //   if (modalForm) {
  //     return modalForm
  //   }
    
  //   // return null
  // }
  // renderModalContent = (e,  ) => {
  //   console.log('    renderModalContent ： ', e,   )
  //   const {modalContent,  } = this.state// 
    
  //   return modalContent
  // }
  
  
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

  // // onSubmit = (e, rest) => {
  // //   console.log('    onSubmit ： ', e, rest);
  // // };
  // // onFail = (e, rest) => {
  // //   console.log('    onFail ： ', e, rest);
  // // };

  // // renderClientTable(params) {
  // //   console.log(' renderClientTable ： ', params);
  // // }

  // showModal = (params, ) => {
  //   const {action,  } = params
  //   console.log('    showModal ： ', action, params, this.state, this.props,  );
  //   this.setState({
  //     action,
  //     show: true,
  //     title: this.state.titleMap[action],  
  //   });
  // };


  // onOk = async (props, ) => {
  //   console.log(' onOkonOk ： ', props, this.state, this.props); 
  //   const {action,  } = this.state// 
  //   let actionFn = addItemAsync
  //   if (action === 'edit') { 
  //     actionFn = editItemAsync
  //   }
    
  //   const { form } = props; //

  //   try {
  //     const res = await form.validateFields();
  //     console.log('  res await 结果  ：', res, action, actionFn,    ); //
  //     const {dispatch,    } = this.props// 
  //     dispatch(actionFn({
  //       data: res,
  //     }))
  //     // const {addItemAsync,  } = this.props// 
  //     //addItemAsync(res)
      
  //     const {newTbData,  } = this.state// 
  //     this.setState({
  //       show: false,
  //       newTbData: [res, ...newTbData,  ],
  //     })
  //   } catch (error) {
  //     console.log(' error ： ', error); //
  //   }

  //   // form
  //   // .validateFields()
  //   // .then(values => {
  //   //   console.log('  values await 结果  ：', values,  )//
  //   //   form.resetFields();
  //   //   // onCreate(values);
  //   // })
  //   // .catch(info => {
  //   //   console.log('Validate Failed:', info);
  //   // });

  // };
  // onCancel = e => {
  //   console.log(' onCancel ： ', e, this.state, this.props); //
  //   this.setState({
  //     show: false,
  //   });
  // };


  // showCapture = (params, ) => {
  //   const {action,  } = params
  //   console.log(' showCapture,  , ： ', action,    )
  //   const {dispatch, portraitData,    } = this.props// 
  //   dispatch(getPortraitAsync({
  //     d_id: 999, 
  //   }))

  //   this.setState({
  //     isShowModal: true,
  //     action,
  //     commonTitle: this.state.titleMap[action],  
  //     commonContent: <ClientRadar data={portraitData}  ></ClientRadar>, 
  //   })
  // }
  // showCommonModal = (params,  ) => {
  //   console.log(' showCommonModal,  , ： ', params,    )
  //   this.setState({
  //     isShowModal: true,
  //     // commonContent: , 
  //   })
  // }
  // onModalOk = (params,  ) => {
  //   console.log(' onModalOk,  , ： ', params,    )
  //   this.setState({
  //     isShowModal: false,
  //   })
  // }
  // onModalCancel = (params,  ) => {
  //   console.log(' onModalCancel,  , ： ', params,    )
  //   this.setState({
  //     isShowModal: false,
  //   })
  // }
  // renderContent = (e,  ) => {
  //   console.log('    renderContent ： ', e,   )
  //   const {commonContent,  } = this.state// 
  //   return commonContent
  // }

  

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(' onSelectChange ： ', selectedRowKeys, selectedRows, this.state, this.props,    )// 

    this.setState({ 
      selectedRowKeys, 
      selectedRows,
    });
  }
  onRemove = (props, ) => {
    console.log(' onRemove ： ', props, this.state, this.props); 
    const {dispatch,    } = this.props// 

    dispatch(
      actions.removeItemAsync([
        // d_id: props.record.id,
        // ...props.record,
        // props.record,
        record,
      ])
    )

  };
  onBatchRemove = (props, ) => {
    console.log(' onBatchRemove ： ', props, this.state, this.props); 
    const {dispatch,    } = this.props// 
    const {selectedRows,  } = this.state// 

    dispatch(
      actions.removeItemAsync(selectedRows)
    )

  };
  getList = (e,  ) => {
    console.log('    getList ： ', e, this.state, this.props,   )
    
    const {dispatch,    } = this.props// 
    
    dispatch(
      actions.getListAsync({
      })
    )




  }




  componentDidMount() {
    console.log(
      ' CURD 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //
    // this.showModal();
    // this.showModal({action: 'edit',  });
    // this.showCapture({action: 'userCapture',  });

    this.getList()
    
  }



  render() {
    // console.log('CRUDHoc 组件 this.state, this.props ：', config, this.state, this.props, )
    console.log('CRUDHoc 组件 this.state, this.props ：', this.state, this.props, )
    // const { show, showForm, title, isShowModal, commonTitle,   } = this.state; //

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

    // const formComProps = {
    //   getCapture: this.showCapture,
    //   action: this.state.action,
    //   // init: this.state.editData, 
    // }

    const {show, } = this.state 
    return <div className="CRUDHocWrapper">
      <Com   
        {...this.state} {...this.props}  
        onRemove={this.onRemove}
        onBatchRemove={this.onBatchRemove}
        onSelectChange={this.onSelectChange}
        
      />
      
    </div>
  }

})

