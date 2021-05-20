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

import SmartTable from '@/common/SmartTable';
import ClientForm from '@/components/Form/ClientForm';
import ClientSearchForm from '@/components/Form/ClientSearchForm';
import ClientTable from '@/components/Table/ClientTable';
import ClientFormModal from '@/components/Modal/ClientFormModal';
import ClientRadar from '@/components/Echarts/ClientRadar';
import SmartModal from '@/common/SmartModal';
import SmartFormModal from '@/common/SmartFormModal';

// import {
//   getList,
//   getItem,
//   getListAsync,
//   getItemAsync,
//   addItemAsync,
//   editItemAsync,
//   removeItemAsync,

//   syncOAAsync,
//   getPortraitAsync,

// } from '@/models/client'//
import { actions } from '@/models/test';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';

console.log(' getListAsync ： ', getListAsync);
// import { getItem,  } from '@/services/client'//
// const res = getItem().then(res => {
//   console.log('  getItem  ： ', res, getItem, getListAsync,   )
//   getItem({
//   })
//   getListAsync()
// })

// const mapStateToProps = ({ client, }) => ({client});
// const mapStateToProps = ({ client, }) => ({...client});
const mapStateToProps = ({ test }) => test;
const mapActions = {
  getListAsync,
  getItemAsync,
  getList,
  getItem,
};

// const mapActions = (...rest) => {
//   console.log(' mapActions ： ', rest,  )//
//   return {
//     addItemAsync,
//     getListAsync,
//     getList,
//     getItem,

//   }
// }

export const TITLE = '客户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  userCapture: `${TITLE}画像`,
};

// @connect(mapStateToProps, mapActions)
@connect(mapStateToProps)
// @connect((state) => {
//   console.log(' statestate ： ', state,  )//
//   return state.client
// }, )
// @SmartHOC
@SmartHOC({
  actions,
  titleMap,
  modalForm: ClientForm,
})
class CRUD extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false,

      action: '',
      title: '',
      Title: '',
      titleMap,

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

  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        {/* <Button type="primary" htmlType="submit"   >保存</Button> */}
        {/* <Button type="primary" onClick={this.showModal}>show</Button> */}
        {/* <Button type="primary" onClick={() => this.search(params)}>搜索</Button> */}
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
        <Button type="primary" onClick={this.syncOAAsync}>
          同步OA
        </Button>
        {/* <Button type="primary" onClick={() => this.showFormModal({action: 'add',  })}  >新增客户</Button> */}
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
          disabled={this.props.authInfo.create !== true}
        >
          新增客户
        </Button>
        <Button
          type="primary"
          onClick={() => this.syncOAAsync({ action: 'add' })}
        >
          导出客户数据
        </Button>
        <Button type="primary" onClick={() => this.props.onBatchRemove()}>
          删除
        </Button>
      </div>
    );
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log(
      ' onSelectChange ： ',
      selectedRowKeys,
      selectedRows,
      this.state,
      this.props,
    );

    this.setState({
      selectedRowKeys,
      selectedRows,
    });
  };
  syncOAAsync = params => {
    console.log(' syncOAAsync,  , ： ', params);
    const { dispatch } = this.props;

    // dispatch(syncOAAsync({
    // }))
  };
  getPortraitAsync = params => {
    console.log(' getPortraitAsync,  , ： ', params);
    const { dispatch } = this.props;

    // dispatch(
    //   getPortraitAsync({
    //   })
    // )
  };

  showFormModal = params => {
    const { action } = params;
    console.log(
      '    showFormModal ： ',
      action,
      params,
      this.state,
      this.props,
    );
    const isEdit = action === 'edit';
    if (isEdit) {
      const { dispatch } = this.props;
      // dispatch(getItemAsync({
      //   d_id: 100,
      // }))
    }

    this.setState({
      action,
      show: true,
      // title: this.state.titleMap[action],
      modalForm: ClientForm,

      editData: action === 'edit' ? params.record : {},
    });
  };

  showModalContent = params => {
    const { action } = params;
    console.log(
      '    showModalContent ： ',
      action,
      params,
      this.state,
      this.props,
    );
    this.setState({
      action,
      show: true,
      // title: this.state.titleMap[action],
      modalForm: ClientForm,
    });
  };

  // onSubmit = (e, rest) => {
  //   console.log('    onSubmit ： ', e, rest);
  // };
  // onFail = (e, rest) => {
  //   console.log('    onFail ： ', e, rest);
  // };

  // renderClientTable = params => {
  //   console.log(' renderClientTable ： ', params);
  // }

  // showModal = (params, ) => {
  //   const {action,  } = params
  //   console.log('    showModal ： ', action, params, this.state, this.props,  );
  //   this.setState({
  //     action,
  //     show: true,
  //   });
  // };

  // onRemove = (props, ) => {
  //   console.log(' onRemove ： ', props, this.state, this.props);
  //   const {dispatch,    } = this.props//

  //   // dispatch(removeItemAsync([
  //   //   // d_id: props.record.id,
  //   //   // ...props.record,
  //   //   // props.record,
  //   //   record,
  //   // ]))

  // };
  // onBatchRemove = (props, ) => {
  //   console.log(' onBatchRemove ： ', props, this.state, this.props);
  //   const {dispatch,    } = this.props//
  //   const {selectedRows,  } = this.state//

  //   // dispatch(removeItemAsync(selectedRows))

  // };
  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    const { action } = this.state;
    let actionFn = addItemAsync;
    if (action === 'edit') {
      actionFn = editItemAsync;
    }

    const { form } = props;

    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action, actionFn);
      const { dispatch } = this.props;
      // dispatch(actionFn({
      //   data: res,
      // }))
      // const {addItemAsync,  } = this.props//
      //addItemAsync(res)

      const { newTbData } = this.state;
      this.setState({
        show: false,
        newTbData: [res, ...newTbData],
      });
    } catch (error) {
      console.log(' error ： ', error);
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
    console.log(' onCancel ： ', e, this.state, this.props);
    this.setState({
      show: false,
    });
  };

  showCapture = params => {
    const { action } = params;
    console.log(' showCapture,  , ： ', action);
    const { dispatch, portraitData } = this.props;
    // dispatch(getPortraitAsync({
    //   d_id: 999,
    // }))

    this.setState({
      isShowModal: true,
      action,
      // commonTitle: this.state.titleMap[action],
      commonContent: <ClientRadar data={portraitData}></ClientRadar>,
    });
  };
  // showCommonModal = (params,  ) => {
  //   console.log(' showCommonModal,  , ： ', params,    )
  //   this.setState({
  //     isShowModal: true,
  //     // commonContent: ,
  //   })
  // }
  onModalOk = params => {
    console.log(' onModalOk,  , ： ', params);
    this.setState({
      isShowModal: false,
    });
  };
  onModalCancel = params => {
    console.log(' onModalCancel,  , ： ', params);
    this.setState({
      isShowModal: false,
    });
  };

  renderModalForm = e => {
    console.log('    renderModalForm ： ', e, this.state, this.props);
    const { modalForm } = this.state;
    if (modalForm) {
      return modalForm;
    }

    // return null
  };
  renderModalContent = e => {
    console.log('    renderModalContent ： ', e);
    const { modalContent } = this.state;

    return modalContent;
  };
  renderContent = e => {
    console.log('    renderContent ： ', e);
    const { commonContent } = this.state;
    return commonContent;
  };

  // getList = (e,  ) => {
  //   console.log('    getList ： ', e, this.state, this.props,   )

  //   const {dispatch,    } = this.props//

  //   // dispatch(getListAsync(params))

  // }

  search = async params => {
    console.log('    search ： ', params);
    const { form } = params;

    const res = await form.validateFields();
    console.log('  res await 结果  ：', res, form);
  };

  renderSearchForm = params => {
    return <ClientSearchForm formBtn={this.renderFormBtn}></ClientSearchForm>;
  };

  renderTable = params => {
    // console.log(' renderTable ： ', params,  )

    const tableProps = {
      // edit: this.showModal,
      // remove: this.showModal,
      // tdClick: this.showModal,

      // edit: this.showFormModal,
      // remove: this.showFormModal,
      // tdClick: this.showModalContent,
      newTbData: this.state.newTbData,

      onSelectChange: this.props.onSelectChange,
      tdClick: this.props.showFormModal,
      dataSource: this.props.dataList,
      edit: this.props.showFormModal,
      remove: this.props.onRemove,
    };

    return <ClientTable {...tableProps}></ClientTable>;
  };

  componentDidMount() {
    console.log(' CURD 组件componentDidMount挂载 ： ', this.state, this.props);

    // this.getList()
  }

  render() {
    console.log(
      ' %c CURD 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      this.state,
      this.props,
    );
    const {
      show,
      showForm,
      title,
      isShowModal,
      commonTitle,
      action,
      titleMap,
    } = this.state;

    const formComProps = {
      getCapture: this.showCapture,
      action: this.state.action,
      // init: this.state.editData,
    };

    return (
      <div className="CRUD">
        {/* CRUD */}

        {this.renderSearchForm()}

        {this.renderTable()}

        <SmartFormModal
          // width={'900px'}

          title={title}
          show={show}
          onOk={this.onOk}
          onCancel={this.onCancel}
          action={action}
          titleMap={titleMap}
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

export default CRUD;
