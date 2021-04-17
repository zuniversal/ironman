import React, { PureComponent } from 'react';
import './style.less';
import { Button } from 'antd';
import ClientForm from '@/components/Form/ClientForm';
import ClientSearchForm from '@/components/Form/ClientSearchForm';
import ClientTable from '@/components/Table/ClientTable';
import ClientRadar from '@/components/Echarts/ClientRadar';
import SmartModal from '@/common/SmartModal';
import SmartFormModal from '@/common/SmartFormModal';

import { actions, mapStateToProps } from '@/models/client';
import SmartHOC from '@/common/SmartHOC';
import { connect } from 'umi';
import { tips, format2Null, getItem, formatSelectList } from '@/utils';
import HouseNoForm from '@/components/Form/HouseNoForm';
import { formatClientFormData } from '@/format';

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
  // noMountFetch: true,
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
    const { action } = this.state;
    const { propsForm } = props;
    try {
      const res = await propsForm.validateFields();
      console.log('  res await 结果  ：', res, res.values);
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
      // console.log(' customeradmin ： ', admin);
      // const customerAdmin = res.customer_admin.map(v => ({
      //   account: {
      //     ...v,
      //     certification_status: true,
      //     account_type: 'manager',
      //   },
      // }))//
      console.log(' customeradmin ： ', res);
      this.props.addUserAsync({ customer_admin_list: res.customer_admin });
      // this.props.addUserAsync(res.customer_admin[0]);
    } catch (error) {
      console.log(' error ： ', error);
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
    const { action, addItemAsync, editItemAsync, tableData } = this.props;
    console.log(' adminList ： ', tableData);

    // const adminIdLen = tableData.filter(v => v.id).length;
    const adminIdLen = tableData.length;
    console.log('  adminIdLen ：', adminIdLen);
    // if (adminIdLen === 0) {
    //   tips('必须添加管理员信息！', 2);
    //   return;
    // }

    if (['detail'].includes(action)) {
      this.props.onCancel({});
      return;
    }

    let actionFn = addItemAsync;
    if (action === 'edit') {
      actionFn = editItemAsync;
    }

    const { form, init } = props;

    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res, action, actionFn);
      const { adminList, itemDetail } = this.props;
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
        // customer_admin: tableData,
        contact: res.contact.map(v => ({
          ...v,
          is_urge: v.is_urge && v.is_urge.length > 0 ? true : false,
          is_quit: v.is_quit && v.is_quit.length > 0 ? true : false,
        })),
      };
      // if (typeof res.file !== 'string') {
      // if (res.file && res.file.length > 0) {
      if (res.file) {
        if (res.file && res.file.fileList && res.file.fileList.length > 0) {
          const fileList = res.file.fileList;
          // params.file = fileList[fileList.length - 1].response.url;
          console.log(' fileList ： ', fileList);
          params.file = fileList.map(v => v.response.url).join(',');
          // } else {
          //   tips('文件不能为空！', 2);
          //   return;
        } else {
          params.file = null;
        }
      } else {
        params.file = null;
      }
      // if (typeof res.logo !== 'string') {
      //   console.log(' logologo ： ', res.logo);
      //   if (res.logo && res.logo.fileList.length > 0) {
      //     const fileList = res.logo.fileList;
      //     params.logo = fileList[fileList.length - 1].response.url;
      //   } else {
      //     // tips('logo不能为空！', 2);
      //     // return;
      //     console.log(' paramsparamsparams ： ', params);
      //     params.logo = null;
      //   }
      // }
      if (res.file) {
        if (res.logo && res.logo.fileList && res.logo.fileList.length > 0) {
          const fileList = res.logo.fileList;
          // params.file = fileList[fileList.length - 1].response.url;
          console.log(' fileList ： ', fileList);
          params.logo = fileList.map(v => v.response.url).join(',');
          // } else {
          //   tips('文件不能为空！', 2);
          //   return;
        } else {
          params.logo = null;
        }
      } else {
        params.logo = null;
      }
      params.enterprise.file = params.file;
      params.enterprise.logo = params.logo;

      const datas = formatClientFormData(params);

      // const datas = format2Null(params, [
      //   'last_service_staff',
      //   'industry',
      //   'scale',
      //   'asset',
      //   'covered_area',
      // ]);
      console.log(' params ： ', params, datas);
      actionFn(datas);
      // const { dispatch } = this.props;
      // dispatch(
      //   actionFn(params),
      // );
    } catch (error) {
      console.log(' error ： ', error);
      console.log(' errorerrorerror ： ', error, error?.values);
    }
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
  renderContent = e => {
    console.log('    renderContent ： ', e);
    const { commonContent } = this.state;
    return commonContent;
  };

  search = async params => {
    console.log('    search ： ', params);
    const { form } = params;

    const res = await form.validateFields();
    console.log('  res await 结果  ：', res, form);
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
    // if (params.value.province) {
    //   console.log(' onFieldChange 清空 province ： ');
    //   const resetParams = {
    //     city: null,
    //     area: null,
    //   };
    //   form.setFieldsValue(resetParams);
    //   const { city, area, ...data } = params.formData;
    //   console.log(' onFieldChange 搜索 province ： ', params.value.province);
    //   this.props.getDistrictAsync(data);
    //   // this.props.getDistrictAsync({province: params.value.province});
    //   this.props.getListAsync({ ...params.formData, ...resetParams });
    //   return;
    // }
    // if (params.value.city) {
    //   console.log(' onFieldChange 清空 city ： ');
    //   const resetParams = {
    //     area: null,
    //   };
    //   form.setFieldsValue(resetParams);
    //   const { area, ...data } = params.formData;
    //   console.log(' onFieldChange 搜索 city ： ', params.value.city);
    //   this.props.getDistrictAsync(data);
    //   // this.props.getDistrictAsync({city: params.value.city});
    //   this.props.getListAsync({ ...params.formData, ...resetParams });
    //   return;
    // }
    console.log(' onFieldChange 列表搜索 ： ');
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
    const { action } = this.props;
    const keys = ['nickname', 'password', 'phone'];
    let isRight = true;
    keys.forEach((v, i) => {
      console.log(' keys v ： ', v, i, params.data[v]);
      if (!params.data[v]) {
        isRight = v;
      }
    });
    console.log(' isRight ： ', isRight);
    if (isRight !== true) {
      tips('管理员信息不能为空！', 2);
      return;
    }

    // this.props.addUserAsync({ customer_admin_list: [params.data] });
    this.props.addUserAsync(params.data);
  };

  getDistrictAsync = async params => {
    console.log('    getDistrictAsync ： ', params);
    const { form } = params;
    if (params.value.enterprise?.province) {
      console.log(' onFieldChange 清空 province ： ');
      const resetParams = {
        city: null,
        area: null,
      };
      form.setFieldsValue(resetParams);
      const { city, area, ...data } = params.formData.enterprise;
      console.log(' onFieldChange 搜索 province ： ', params.value.province);
      this.props.getDistrictAsync(data);
      return;
    }
    if (params.value.enterprise?.city) {
      console.log(' onFieldChange 清空 city ： ');
      const resetParams = {
        area: null,
      };
      form.setFieldsValue(resetParams);
      const { area, ...data } = params.formData.enterprise;
      console.log(' onFieldChange 搜索 city ： ', params.value.city);
      const res = await this.props.getDistrictAsync(data);
      console.log('  res await 结果  ：', res);
      if (params.isFormChange) {
        // form.setFieldsValue({
        //   adcode: ,
        // });
      }
      return;
    }
    if (params.value.enterprise?.area) {
      console.log(' onFieldChange 清空 area ： ');
      const res = await this.props.getRegionAsync({
        subdistrict: '1',
        keywords: params.value?.enterprise?.area,
      });
      // const res = await this.props.getGeoAsync({ address: params.value?.area, })
      const adcode = res[0]?.adcode;
      const city_code = res[0]?.citycode;
      const { province, city, area } = params.formData.enterprise;
      const address = province + city + area;
      console.log('  res await 结果  ：', res, adcode, city_code, address);
      if (params.isFormChange && adcode) {
        form.setFieldsValue({
          enterprise: { adcode, city_code, address },
        });
      }
      return;
    }
  };
  checkOne = params => {
    console.log(' checkOne,  , ： ', params);
    const { form, formData } = params;
    if (params.value?.contact) {
      const isUrge = params.value?.contact[0]?.is_urge;
      console.log(' isUrge ： ', isUrge);
      if (isUrge) {
        const { contact } = formData;
        console.log('  formData ：', formData, contact);
        form.setFieldsValue(formData);
      }
    }
  };
  onCollectorChange = async (e, params, rest) => {
    console.log(
      ' onCollectorChange,  , ： ',
      e,
      rest,
      params,
      e.target.value,
      params.form.getFieldsValue(),
      this.props,
    );
    // const { form } = params;
    // const formVal = params
    // console.log(' params.value?.enterprise ： ', params.value?.enterprise);
    // if (params.value?.enterprise?.address) {
    //   console.log(' onFieldChange 清空 address ： ');
    //   const { address } = params.value.enterprise;
    //   const res = await this.props.getGeoAsync({ address });
    //   // const res = await this.props.getGeoAsync({ address: '南山区' })
    //   const setFields = {
    //     enterprise: res,
    //   };
    //   console.log(' address res ：', res, setFields);
    //   form.setFieldsValue(setFields);
    // }
    // // this.checkOne(params)
    // this.getDistrictAsync({
    //   ...params,
    //   isFormChange: true,
    // });
  };
  onClientFormChange = async params => {
    console.log(
      ' onClientFormChange,  , ： ',
      params,
      params.value,
      params.formData,
      this.props,
    );
    const { form } = params;
    console.log(' params.value?.enterprise ： ', params.value?.enterprise);
    if (params.value?.enterprise?.address) {
      console.log(' onFieldChange 清空 address ： ');
      const { address } = params.value.enterprise;
      const res = await this.props.getGeoAsync({ address });
      // const res = await this.props.getGeoAsync({ address: '南山区' })
      const setFields = {
        enterprise: res,
      };
      console.log(' address res ：', res, setFields);
      form.setFieldsValue(setFields);
    }
    // this.checkOne(params)
    this.getDistrictAsync({
      ...params,
      isFormChange: true,
    });
  };
  onHouseNoRegionChange = async (value, rest, params) => {
    console.log(' onHouseNoRegionChange,  , ： ', value, rest, params);
    const { name } = params;

    const formVal = params.form.getFieldsValue();
    const { index } = params;
    const { electricity_user } = formVal;
    const item = electricity_user[index];
    const reqParams = {
      province: item?.province,
      city: item?.city,
      area: item?.area,
      [name]: value,
    };
    console.log(
      ' onHouseNoRegionChange res ：',
      reqParams,
      item,
      index,
      formVal,
      electricity_user,
    );
    let res;
    if (name === 'area') {
      res = await this.props.getRegionAsync({
        subdistrict: '1',
        keywords: value,
      });
    } else {
      res = await this.props.getDistrictAsync(reqParams);
    }
    // const res = await this.props.getDistrictAsync(reqParams);
    console.log(' onHouseNoRegionChange res ： ', res);
    let matchItem = {
      ...item,
      [name]: value,
    };
    if (name === 'province') {
      matchItem.city = null;
      matchItem.area = null;
    }
    if (name === 'city') {
      matchItem.area = null;
    }
    if (name === 'area') {
      matchItem.ad_code = res[0]?.adcode;
      matchItem.city_code = res[0]?.citycode;
    }

    console.log(
      ' onHouseNoRegionChange item ： ',
      name,
      item,
      index,
      matchItem,
    );
    const setFields = {
      electricity_user: electricity_user.map((v, i) =>
        index === i ? matchItem : v,
      ),
    };
    console.log(' onHouseNoRegionChange setFields ： ', setFields);
    params.form.setFieldsValue(setFields);
  };
  onAddrChange = async (e, params) => {
    console.log(' onAddrChange,  , ： ', e, params, e.target.value);
    const res = await this.props.getGeoAsync({ address: e.target.value });
    const formVal = params.form.getFieldsValue();
    const { index } = params;
    const { electricity_user } = formVal;
    const item = electricity_user[index];
    console.log('  res ：', res, index, formVal, electricity_user);
    const matchItem = {
      ...item,
      latitude: res.latitude,
      longitude: res.longitude,
    };
    console.log(' item ： ', item, index, matchItem);
    const setFields = {
      electricity_user: electricity_user.map((v, i) =>
        index === i ? matchItem : v,
      ),
    };
    console.log(' setFields ： ', setFields);
    // console.log(' address res ：', res, setFields);
    params.form.setFieldsValue(setFields);
  };
  renderModalContent = e => {
    const { action } = this.props;
    const formComProps = {
      action,
      getCapture: this.showCapture,
      addUserAsync: this.addUserAsync,
      getUserAsync: params => this.props.getUserAsync({ value: params }),
      userList: this.props.userList,
      // saveAdmin: params => {
      //   console.log(' saveAdmin params ： ', params);
      //   // this.props.addUserAsync({ customer_admin_list: params.data, })
      // },
      adminList: this.props.adminList,
      saveAdmin: this.saveAdmin,
      removeAdmin: this.props.removeUserAsync,
      onAdminChange: (changedFields, allFields) =>
        this.props.onAdminChange({ changedFields, allFields }),

      addTableItemAsync: this.props.addTableItemAsync,
      editTableItemAsync: this.props.editTableItemAsync,
      removeTableItemAsync: this.props.removeTableItemAsync,
      modifyTableItem: this.props.modifyTableItem,
      tableData: this.props.tableData,
      showItemAsync: this.props.showItemAsync,

      contactTableData: this.props.contactTableData,

      onCollectorChange: this.onCollectorChange,
      onAddrChange: this.onAddrChange,
      onHouseNoRegionChange: this.onHouseNoRegionChange,
      getTagsAsync: params => this.props.getTagsAsync({ keyword: params }),
      tagsList: this.props.tagsList,
      getOrganizeAsync: params =>
        this.props.getOrganizeAsync({ keyword: params }),
      organizeList: this.props.organizeList,
      getGeoAsync: params => this.props.getGeoAsync({ address: params }),
      geoList: this.props.geoList,
      onFieldChange: this.onClientFormChange,
      // getDistrictAsync: this.props.getDistrictAsync,
      provinceList: this.props.provinceList,
      // provinceList: [
      //   {
      //     label: '福建省',
      //     value: '福建省',
      //   }
      // ],
      citytList: this.props.citytList,
      countryList: this.props.countryList,
      // countryList: [
      //   {
      //     label: '泉港区',
      //     value: '泉港区',
      //   }
      // ],
    };

    if (action !== 'add') {
      // const { customer_admin } = this.props.itemDetail;
      // console.log(' customer_admin ： ', customer_admin);
      // formComProps.init = {
      //   ...this.props.itemDetail,
      //   customer_admin: customer_admin && customer_admin.length > 0 ? customer_admin : [{}]
      // };
      // formComProps.init = this.props.itemDetail;
      formComProps.init = {
        ...this.props.itemDetail,
        customer_admin: this.props.adminList,
      };
    } else {
      const { enterprises = [] } = getItem('userInfo');
      const serviceEnterpriseId = `${enterprises[0]?.id}`;
      console.log('  serviceEnterpriseId ：', enterprises, serviceEnterpriseId);
      formComProps.enterpriseList = formatSelectList(enterprises);
      formComProps.init = {
        service_enterprise_id: serviceEnterpriseId,
        // trusteeship_num: 0,
      };
    }

    // formComProps.init = {
    //   ...this.props.itemDetail,
    //   customer_admin: this.props.adminList,
    // };
    console.log(' formComProps ： ', formComProps);
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
    );

    // this.getList()
    this.props.getTagsAsync();
    this.props.getUserAsync();
    this.props.getDistrictAsync({});
    this.props.getOrganizeAsync({ page_size: 1000 });
    // this.props.getGeoAsync({ address: '上海浦东' });
    // this.props.getRegionAsync({
    //   subdistrict: '0',
    //   // subdistrict: '2',
    //   keywords: '泉州市',
    // });
    // this.props.getRegionAsync({
    //   subdistrict: '1',
    //   // subdistrict: '2',
    //   keywords: '泉州市',
    // });
    // this.props.getRegionAsync({
    //   // subdistrict: '1',
    //   subdistrict: '2',
    //   keywords: '福建省',
    // });
    // this.props.getRegionAsync({
    //   // subdistrict: '1',
    //   subdistrict: '2',
    //   keywords: '泉州市',
    // });
    // this.props.getRegionAsync({
    //   // subdistrict: '1',
    //   subdistrict: '2',
    //   keywords: '泉港区',
    // });
    // this.props.getRegionAsync({
    //   // subdistrict: '1',
    //   subdistrict: '3',
    //   keywords: '泉州市',
    // });
    // setTimeout(() => {
    //   console.log('  延时器 ： ');
    //   this.props.showFormModal({
    //     action: 'add',
    //   });
    // }, 2000);
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
    } = this.state;

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
