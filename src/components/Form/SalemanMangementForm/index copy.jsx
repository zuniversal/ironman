import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import UploadCom from '@/components/Widgets/UploadCom';
import { certificateTypeConfig, userStatusConfig,  } from '@/configs';

const genderRadios = [
  { label: '男', value: 1, key: '1' },
  { label: '女', value: 0, key: '0' },
];

const UserManageForm = props => {
  console.log(' UserManageForm ： ', props);
  //  account 对象里的   password    account_type -  客户 管理着 - 默认  certification_status 1
  const config = [
    {
      itemProps: {
        label: '账号',
        name: 'username',
      },
      comProps: {
        disabled: props.action !== 'add',
      },
    },
    {
      itemProps: {
        label: '姓名',
        name: 'nickname',
      },
    },
    {
      noRule: props.action !== 'add',
      itemProps: {
        label: '密码',
        name: 'password',
        className: props.action !== 'add' ? 'hidden' : '',
      },
    },
    {
      noRule: props.action !== 'add',
      itemProps: {
        label: '再次确认密码',
        name: 'rePassword',
        className: props.action !== 'add' ? 'hidden' : '',
        // dependencies: 'password', 
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '手机',
        name: 'phone',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '微信',
        name: 'wechat',
      },
    },
    {
      // noRule: true,
      itemProps: {
        label: '邮箱',
        name: 'email',
      },
    },
    {
      noRule: true,
      formType: 'DatePicker',
      itemProps: {
        label: '入职时间',
        name: 'join_date',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: certificateTypeConfig,
      itemProps: {
        label: '证件类型',
        name: 'cert',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '证件编号',
        name: 'cert_number',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getTagsAsync,
      selectData: props.tagsList,
      itemProps: {
        label: '职位',
        name: 'tag_ids',
      },
      comProps: {
        // mode: 'multiple',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getRoleAsync,
      selectData: props.roleList,
      itemProps: {
        label: '角色',
        name: 'role_ids',
      },
      comProps: {
        // mode: 'multiple',
      },
    },
    {
      formType: 'TreeSelect',
      itemProps: {
        label: '所属业务部门',
        name: 'organization_ids',
      },
      comProps: {
        treeData: props.organizeList,
        multiple: true,
      },
    },
    ...props.action !== 'add' ? [{
        formType: 'Search',
        selectData: userStatusConfig,
        itemProps: {
          label: '状态',
          name: 'status',
        },
      },] : [],
    {
      noRule: true,
      formType: 'Radio',
      itemProps: {
        label: '性别',
        name: 'gender',
      },
      radioData: genderRadios,
    },
    <UploadCom
      label={'头像'}
      key={'head_img'}
      action={'/api/v1/upload'}
      name={'head_img'}
      extra={'支持扩展名:pdf、jpg、png'}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
        multiple: true,
      }}
      init={props.init}
      formAction={props.action}
      noRule
    ></UploadCom>,
  ];

  const { gender, cert, status, } = props.init; //

  return (
    <SmartForm
      config={config}
      {...props}
      init={{
        ...props.init,
        gender: gender != undefined ? gender : 1,
        cert: cert != undefined ? `${cert}` : '1',
        status: status != undefined ? `${status}` : '1',
      }}
    ></SmartForm>
  );
};

UserManageForm.defaultProps = {
  init: {},  
};

export default UserManageForm;
