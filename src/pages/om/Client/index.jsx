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
import HouseNoForm from '@/components/Form/HouseNoForm';

export const TITLE = '客户';

const titleMap = {
  add: `新建${TITLE}`,
  edit: `编辑${TITLE}`,
  detail: `${TITLE}详情`,
  userCapture: `${TITLE}画像`,
  clientDetailAsync: `客户详情`,
  houseNoDetailAsync: `户号详情`,
};

const detailFormMap = {
  clientDetailAsync: ClientForm,
  houseNoDetailAsync: HouseNoForm,
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
      // }))//
      console.log(' customeradmin ： ', res); //
      this.props.addUserAsync({ customer_admin_list: res.customer_admin });
      // this.props.addUserAsync(res.customer_admin[0]);
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
          disabled={this.props.authInfo.create !== true}
        >
          新增客户
        </Button>
        <Button type="primary" onClick={() => this.props.exportData()}>
          导出{TITLE}数据
        </Button>
        {/* <Button type="primary" onClick={() => this.props.onBatchRemove()}> */}
        <Button
          type="primary"
          disabled={this.props.authInfo.delete !== true}
          onClick={this.onBatchRemove}
        >
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
    const { action, addItemAsync, editItemAsync, tableData } = this.props; //
    console.log(' adminList ： ', tableData); //

    // const adminIdLen = tableData.filter(v => v.id).length;
    const adminIdLen = tableData.length;
    console.log('  adminIdLen ：', adminIdLen); //
    if (adminIdLen === 0) {
      tips('必须添加管理员信息！', 2);
      return;
    }

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
      // // if (tableData.length === 0 && action !== 'add') {
      // // if (tableData.length === 0) {
      // const adminIdLen = tableData.filter((v) => v.id).length
      // console.log('  adminIdLen ：', adminIdLen,  )//
      // if (adminIdLen.length === 0) {
      //   tips('必须添加管理员信息！', 2);
      //   return;
      // }
      const params = {
        ...init,
        ...res,
        customer_admin: tableData,
      };
      // if (typeof res.file !== 'string') {
      // if (res.file && res.file.length > 0) {
      if (res.file) {
        if (res.file && res.file.fileList && res.file.fileList.length > 0) {
          const fileList = res.file.fileList;
          // params.file = fileList[fileList.length - 1].response.url;
          console.log(' fileList ： ', fileList); //
          params.file = fileList.map(v => v.response.url).join(',');
          // } else {
          //   tips('文件不能为空！', 2);
          //   return;
        } else {
          params.file = '';
        }
      } else {
        params.file = '';
      }
      if (typeof res.logo !== 'string') {
        console.log(' logologo ： ', res.logo); //
        if (res.logo && res.logo.fileList.length > 0) {
          const fileList = res.logo.fileList;
          params.logo = fileList[fileList.length - 1].response.url;
          // } else {
          //   tips('logo不能为空！', 2);
          //   return;
        }
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
        init={this.props.searchInfo}
        onFieldChange={this.onFieldChange}
        getDistrictAsync={this.props.getDistrictAsync}
        provinceList={this.props.provinceList}
        citytList={this.props.citytList}
        countryList={this.props.countryList}
      ></ClientSearchForm>
    );
  };
  onFieldChange = params => {
    console.log(
      ' onFieldChange,  , ： ',
      params,
      params.value,
      params.formData,
      this.props,
    );
    const { form } = params;
    if (params.value.province) {
      console.log(' onFieldChange 清空 province ： '); //
      const resetParams = {
        city: null,
        area: null,
      };
      form.setFieldsValue(resetParams);
      const { city, area, ...data } = params.formData;
      console.log(' onFieldChange 搜索 province ： ', params.value.province); //
      this.props.getDistrictAsync(data);
      // this.props.getDistrictAsync({province: params.value.province});
      this.props.getListAsync({ ...params.formData, ...resetParams });
      return;
    }
    if (params.value.city) {
      console.log(' onFieldChange 清空 city ： '); //
      const resetParams = {
        area: null,
      };
      form.setFieldsValue(resetParams);
      const { area, ...data } = params.formData;
      console.log(' onFieldChange 搜索 city ： ', params.value.city); //
      this.props.getDistrictAsync(data);
      // this.props.getDistrictAsync({city: params.value.city});
      this.props.getListAsync({ ...params.formData, ...resetParams });
      return;
    }
    console.log(' onFieldChange 列表搜索 ： '); //
    this.props.getListAsync({ ...params.formData, page: 1 });
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
      authInfo: this.props.authInfo,
      searchInfo: this.props.searchInfo,
      getListAsync: this.props.getListAsync,
      // edit: this.showFormModalWithProps,
      edit: this.props.getItemAsync,
      // remove: this.props.onRemove,
      remove: this.onRemove,
      showFormModal: this.props.showFormModal,
      showItemAsync: this.props.showItemAsync,
    };

    return <ClientTable {...tableProps}></ClientTable>;
  };
  renderCommonModal = params => {
    const DetailForm = detailFormMap[this.props.common.action];
    return (
      <SmartFormModal
        show={this.props.common.isShowCommonModal}
        action={this.props.common.action}
        titleMap={titleMap}
        onOk={this.props.closeCommonModal}
        onCancel={this.props.closeCommonModal}
      >
        {DetailForm && (
          <DetailForm
            init={this.props.common.itemDetail}
            action={'detail'}
          ></DetailForm>
        )}
      </SmartFormModal>
    );
  };

  saveAdmin = params => {
    console.log('    saveAdmin ： ', params, this.state, this.props);
    const { action } = this.props; //
    const keys = ['nickname', 'password', 'phone'];
    let isRight = true;
    keys.forEach((v, i) => {
      console.log(' keys v ： ', v, i, params.data[v]);
      if (!params.data[v]) {
        isRight = v;
      }
    });
    console.log(' isRight ： ', isRight); //
    if (isRight !== true) {
      tips('管理员信息不能为空！', 2);
      return;
    }

    // this.props.addUserAsync({ customer_admin_list: [params.data] });
    this.props.addUserAsync(params.data);
  };
  renderModalContent = e => {
    const { action } = this.props; //
    const formComProps = {
      action,
      getCapture: this.showCapture,
      addUserAsync: this.addUserAsync,
      getUserAsync: params => this.props.getUserAsync({ keyword: params }),
      userList: this.props.userList,
      // saveAdmin: params => {
      //   console.log(' saveAdmin params ： ', params); //
      //   // this.props.addUserAsync({ customer_admin_list: params.data, })
      // },
      adminList: this.props.adminList,
      saveAdmin: this.saveAdmin,
      removeAdmin: this.props.removeUserAsync,
      onAdminChange: (changedFields, allFields) =>
        this.props.onAdminChange({ changedFields, allFields }),
    };

    if (action !== 'add') {
      // const { customer_admin } = this.props.itemDetail; //
      // console.log(' customer_admin ： ', customer_admin); //
      // formComProps.init = {
      //   ...this.props.itemDetail,
      //   customer_admin: customer_admin && customer_admin.length > 0 ? customer_admin : [{}]
      // };
      // formComProps.init = this.props.itemDetail;
      formComProps.init = {
        ...this.props.itemDetail,
        customer_admin: this.props.adminList,
      };
    }

    // formComProps.init = {
    //   ...this.props.itemDetail,
    //   customer_admin: this.props.adminList,
    // };
    console.log(' formComProps ： ', formComProps); //
    return (
      <ClientForm
        {...formComProps}
        addTableItemAsync={this.props.addTableItemAsync}
        editTableItemAsync={this.props.editTableItemAsync}
        removeTableItemAsync={this.props.removeTableItemAsync}
        modifyTableItem={this.props.modifyTableItem}
        tableData={this.props.tableData}
      ></ClientForm>
    );
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

        {this.renderCommonModal()}

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
