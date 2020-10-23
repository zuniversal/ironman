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

import { actions, mapStateToProps } from '@/models/client'; //
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips } from '@/utils';

export const TITLE = '客户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  userCapture: `${TITLE}画像`,
};

// const mapStateToProps = ({ client }) => client;

@connect(mapStateToProps)
@SmartHOC({
  actions,
  titleMap,
  modalForm: ClientForm,
})
class Client extends PureComponent {
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

  addUserAsync = async props => {
    console.log(' addUserAsync ： ', props, this.state, this.props);
    const { action } = this.state; //
    const { propsForm } = props; //
    try {
      const res = await propsForm.validateFields();
      console.log('  res await 结果  ：', res, res.values); //
      const admin = {
        ...res.customer_admin.map(v => ({
          nickname: v.username,
          account: {
            ...v,
            certification_status: true,
            account_type: 'manager',
          },
        })),
      };
      console.log(' admin ： ', admin); //
      this.props.addUserAsync(admin[0]);
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };
  renderFormBtn = params => {
    console.log(' renderFormBtn ： ', params); //
    return (
      <div className={'btnWrapper'}>
        {/* <Button type="primary" htmlType="submit"   >保存</Button> */}
        {/* <Button type="primary" onClick={this.showModal}>show</Button> */}
        {/* <Button type="primary" onClick={() => this.search(params)}>搜索</Button> */}
        <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          onClick={this.props.syncOAAsync}
        >
          同步OA
        </Button>
        <Button
          type="primary"
          onClick={() => this.showFormModal({ action: 'add' })}
        >
          新增客户
        </Button>
        <Button
          type="primary"
          onClick={() =>
            this.props.showFormModal({
              action: 'add',
              formComProps: {
                getCapture: this.showCapture,
                // addUserAsync: this.props.addUserAsync,
                addUserAsync: this.addUserAsync,
              },
            })
          }
        >
          新增客户
        </Button>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出{TITLE}数据
        </Button>
        {/* <Button type="primary" onClick={() => this.props.onBatchRemove()}> */}
        <Button type="primary" onClick={() => this.onBatchRemove()}>
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
    ); //

    this.setState({
      selectedRowKeys,
      selectedRows,
    });
  };
  syncOAAsync = params => {
    console.log(' syncOAAsync,  , ： ', params);
    const { dispatch } = this.props; //

    // dispatch(syncOAAsync({
    // }))
  };
  getPortraitAsync = params => {
    console.log(' getPortraitAsync,  , ： ', params);
    const { dispatch } = this.props; //

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
    this.props.dispatchAction(action, params);

    this.setState({
      action,
      show: true,
      formComProps: {
        getCapture: this.showCapture,
        addUserAsync: this.addUserAsync,
        onClientChange: this.props.onClientChange,
      },
      modalForm: ClientForm,
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
    const { action } = this.state; //
    let actionFn = actions.addItemAsync;
    if (action === 'edit') {
      actionFn = actions.editItemAsync;
    }

    const { form, init } = props; //

    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action, actionFn); //
      const { adminList } = this.props; //
      console.log(' adminList ： ', adminList); //
      if (adminList.length === 0) {
        tips('必须添加管理员信息！', 2);
        return;
      }
      const { dispatch } = this.props; //
      dispatch(
        actionFn({
          ...init,
          ...res,
          customer_admin: adminList,
        }),
      );

      // this.setState({
      //   isShow: false,
      // });
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };
  onCancel = e => {
    console.log(' onCancel ： ', e, this.state, this.props); //
    this.setState({
      show: false,
    });
  };

  showCapture = params => {
    const { action } = params;
    console.log(' showCapture,  , ： ', action);
    const { dispatch, portraitData } = this.props; //
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
    const { modalForm } = this.state; //
    if (modalForm) {
      return modalForm;
    }

    // return null
  };
  renderModalContent = e => {
    console.log('    renderModalContent ： ', e);
    const { modalContent } = this.state; //

    return modalContent;
  };
  renderContent = e => {
    console.log('    renderContent ： ', e);
    const { commonContent } = this.state; //
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
    console.log('  res await 结果  ：', res, form); //
  };

  renderSearchForm = params => {
    // console.log(' renderSearchForm ： ', params,  )
    return (
      <ClientSearchForm
        formBtn={this.renderFormBtn}
        // onSubmit={this.onSubmit}
        // onFail={this.onFail}
      ></ClientSearchForm>
    );
  };

  showFormModalWithProps = params => {
    console.log('    showFormModalWithProps ： ', params);
    const { form } = params;
    this.props.showFormModal({
      ...params,
      formComProps: {
        getCapture: this.showCapture,
        onClientChange: this.props.onClientChange,
      },
    });
  };
  onRemove = params => {
    console.log(' onRemove    ： ', params);
    this.props.removeItemsAsync({ id: `${params.record.id}` });
  };
  onBatchRemove = params => {
    console.log(' onBatchRemove    ： ', params, this.state, this.props);
    this.props.removeItemsAsync({
      id: `${this.props.selectedRowKeys.join(',')}`,
    });
  };
  renderTable = params => {
    console.log(' renderTable ： ', params, this.state, this.props);

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
      showDetail: this.showFormModalWithProps,
      showDetail: this.showFormModal,
      dataSource: this.props.dataList,
      // edit: this.showFormModalWithProps,
      edit: this.showFormModal,
      // remove: this.props.onRemove,
      remove: this.onRemove,
      count: this.props.count,
      getList: this.props.getListAsync,
    };

    return <ClientTable {...tableProps}></ClientTable>;
  };
  renderSmartFormModal = params => {
    console.log(' renderSmartFormModal ： ', params, this.state, this.props);
    const { action, show, titleMap } = this.state; //

    const formComProps = {
      action: this.state.action,
      getCapture: this.showCapture,
      addUserAsync: this.addUserAsync,
      getUser: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
    };

    if (action !== 'add') {
      formComProps.init = this.props.itemDetail;
    }

    return (
      <SmartFormModal
        show={show}
        onOk={this.onOk}
        onCancel={this.onCancel}
        action={action}
        titleMap={titleMap}
        formComProps={formComProps}
        FormCom={this.state.modalForm}
      >
        {this.renderModalContent()}
      </SmartFormModal>
    );
  };

  componentDidMount() {
    console.log(
      ' Client 组件componentDidMount挂载 ： ',
      this.state,
      this.props,
    ); //

    // this.getList()
  }

  render() {
    console.log(
      ' %c Client 组件 this.state, this.props ： ',
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
    } = this.state; //

    return (
      <div className="Client">
        {/* Client */}

        {this.renderSearchForm()}

        {this.renderTable()}

        {this.renderSmartFormModal()}

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
