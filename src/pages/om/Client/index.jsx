import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import ClientForm from '@/components/Form/ClientForm'; //
import ClientSearchForm from '@/components/Form/ClientSearchForm'; //
import ClientTable from '@/components/Table/ClientTable'; //
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
      action: '',
      titleMap,
      commonContent: null,
      commonTitle: '',
      isShowModal: false,

      modalContent: null,
    };
  }
  onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params, this.props);
    const { form } = params;
    // if (params.value.city) {
    //   form.setFieldsValue({
    //     test: '',
    //   });
    //   // return
    // }
    if (params.value.city) {
      this.props.getDistrictAsync(params.formData);
    } else {
      this.props.getDistrictAsync(params.value);
    }
    // this.props.getListAsync(params.formData);
  };
  addUserAsync = async props => {
    console.log(' addUserAsync ： ', props, this.state, this.props);
    const { action } = this.state; //
    const { propsForm } = props; //
    try {
      const res = await propsForm.validateFields();
      console.log('  res await 结果  ：', res, res.values); //
      // const admin = {
      //   ...res.customer_admin.map(v => ({
      //     nickname: v.username,
      //     account: {
      //       ...v,
      //       certification_status: true,
      //       account_type: 'manager',
      //     },
      //   })),
      // };
      // console.log(' customeradmin ： ', admin); //
      // const customerAdmin = res.customer_admin.map(v => ({
      //   account: {
      //     ...v,
      //     certification_status: true,
      //     account_type: 'manager',
      //   },
      // }))
      console.log(' customeradmin ： ', res); //
      this.props.addUserAsync({ customer_admin_list: res.customer_admin });
    } catch (error) {
      console.log(' error ： ', error); //
    }
  };
  renderFormBtn = params => {
    return (
      <div className={'btnWrapper'}>
        {/* <Button type="primary" onClick={() => this.props.search(params)}>
          搜索
        </Button> */}
        {/* <Button
          type="primary"
          htmlType="submit"
          onClick={this.props.syncOAAsync}
        >
          同步OA
        </Button> */}
        <Button
          type="primary"
          onClick={() => this.props.showFormModal({ action: 'add' })}
        >
          新增客户
        </Button>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出{TITLE}数据
        </Button>
        {/* <Button type="primary" onClick={() => this.props.onBatchRemove()}> */}
        <Button type="primary" onClick={this.onBatchRemove}>
          删除
        </Button>
      </div>
    );
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
    if (action === 'add') {
      this.props.showFormModal(action, params);
    }
    if (action === 'edit' || action === 'detail') {
      this.props.getItemAsync(action, params);
    }

    // this.setState({
    //   action,
    //   show: true,
    //   // formComProps: {
    //   //   getCapture: this.showCapture,
    //   //   addUserAsync: this.addUserAsync,
    //   //   onClientChange: this.props.onClientChange,
    //   // },
    // });
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

  onOk = async props => {
    console.log(' onOkonOk ： ', props, this.state, this.props);
    // const { action } = this.state; //
    const { action, addItemAsync, editItemAsync } = this.props; //
    // let actionFn = actions.addItemAsync;
    // if (action === 'edit') {
    //   actionFn = actions.editItemAsync;
    // }

    if (['detail'].includes(action)) {
      this.props.onCancel({});
      return;
    }

    let actionFn = addItemAsync;
    if (action === 'edit') {
      actionFn = editItemAsync;
    }

    const { form, init } = props; //

    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action, actionFn); //
      const { adminList, itemDetail } = this.props; //
      console.log(' adminList ： ', adminList); //
      // if (adminList.length === 0 && action !== 'add') {
      if (adminList.length === 0) {
        tips('必须添加管理员信息！', 2);
        return;
      }
      const params = {
        ...init,
        ...res,
        customer_admin: adminList,
      };
      if (res.file && res.file.fileList) {
        const fileList = res.file.fileList;
        params.file = fileList[fileList.length - 1].response.url;
      }
      if (res.logo && res.logo.fileList) {
        const logoFileList = res.logo.fileList;
        params.logo = fileList[fileList.length - 1].response.url;
      }
      console.log(' params ： ', params); //
      actionFn(params);
      // const { dispatch } = this.props; //
      // dispatch(
      //   actionFn(params),
      // );
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
  renderContent = e => {
    console.log('    renderContent ： ', e);
    const { commonContent } = this.state; //
    return commonContent;
  };

  search = async params => {
    console.log('    search ： ', params);
    const { form } = params;

    const res = await form.validateFields();
    console.log('  res await 结果  ：', res, form); //
  };

  renderSearchForm = params => {
    return (
      <ClientSearchForm
        formBtn={this.renderFormBtn}
        // onFieldChange={params => this.getDistrictAsync({ keyword: params })}
        onFieldChange={this.onFieldChange}
        getDistrictAsync={this.props.getDistrictAsync}
        provinceList={this.props.provinceList}
        citytList={this.props.citytList}
        countryList={this.props.countryList}
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
    // this.props.removeItemsAsync({ id: `${params.record.id}` });
    this.props.onRemove({
      id: `${params.record.id}`,
      d_id: `${params.record.id}`,
    });
  };
  onBatchRemove = params => {
    console.log(' onBatchRemove    ： ', params, this.state, this.props);
    // this.props.removeItemsAsync({
    //   id: `${this.props.selectedRowKeys.join(',')}`,
    // });
    this.props.onBatchRemove({
      id: `${this.props.selectedRowKeys.join(',')}`,
    });
  };
  renderTable = params => {
    const tableProps = {
      onSelectChange: this.props.onSelectChange,
      // tdClick: this.props.showFormModal,
      // showDetail: this.showFormModalWithProps,
      // showDetail: this.showFormModal,
      showDetail: this.props.getItemAsync,
      dataSource: this.props.dataList,
      count: this.props.count,
      getListAsync: this.props.getListAsync,
      // edit: this.showFormModalWithProps,
      edit: this.props.getItemAsync,
      // remove: this.props.onRemove,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
    };

    return <ClientTable {...tableProps}></ClientTable>;
  };

  renderModalContent = e => {
    const { action } = this.props; //
    const formComProps = {
      action,
      getCapture: this.showCapture,
      addUserAsync: this.addUserAsync,
      getUserAsync: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
    };
    if (action !== 'add') {
      // const { customer_admin } = this.props.itemDetail; //
      // console.log(' customer_admin ： ', customer_admin); //
      // formComProps.init = {
      //   ...this.props.itemDetail,
      //   customer_admin: customer_admin && customer_admin.length > 0 ? customer_admin : [{}]
      // };
      formComProps.init = this.props.itemDetail;
    }
    console.log(' formComProps ： ', formComProps); //
    return <ClientForm {...formComProps}></ClientForm>;
  };
  renderSmartFormModal = params => {
    return (
      <SmartFormModal
        show={this.props.isShowModal}
        action={this.props.action}
        titleMap={this.state.titleMap}
        onOk={this.onOk}
        onCancel={this.props.onCancel}
        // formComProps={formComProps}
        // FormCom={this.state.modalForm}
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
    this.props.getUserAsync();
    this.props.getDistrictAsync({});
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
          title={'客户画像'}
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
