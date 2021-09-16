import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import UploadCom from '@/components/Widgets/UploadCom';
import { certificateTypeConfig, userStatusConfig, genderRadios,  } from '@/configs';
import useHttp from '@/hooks/useHttp';
import {
  getList as getOrganizeList,
} from '@/services/organize';
import {
  getList as getRoleList,
} from '@/services/role';
import {
  getList as getTagsList,
} from '@/services/tags';
import { recursiveHandle } from '@/models/organize';

const UserManageForm = props => {
  console.log(' UserManageForm ： ', props);
  const { data: organizeList, req: getOrganizeListAsync } = useHttp(
    getOrganizeList,
    {
      format: res => recursiveHandle(res),
    },
  );
  const { data: roleList, req: getRoleListAsync } = useHttp(
    () => getRoleList({
      page_size: 1000,
    }),
  );
  const { data: tagsList, req: getTagsListAsync } = useHttp(
    () => getTagsList({
      page_size: 1000,
    }),
  );

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
      noRule: true,
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
      noRule: true,
      formType: 'Search',
      selectSearch: props.getTagsAsync,
      // selectData: props.tagsList,
      selectData: tagsList,
      itemProps: {
        label: '职位',
        name: 'tag_ids',
      },
      comProps: {
        // mode: 'multiple',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectSearch: props.getRoleAsync,
      // selectData: props.roleList,
      selectData: roleList,
      itemProps: {
        label: '角色',
        name: 'role_ids',
      },
      comProps: {
        // mode: 'multiple',
      },
    },
    {
      noRule: true,
      formType: 'TreeSelect',
      itemProps: {
        label: '所属业务部门',
        name: 'organization_ids',
      },
      comProps: {
        // treeData: props.organizeList,
        treeData: organizeList,
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

  const { 
    gender, cert, status, 
    tag_ids = null,
    role_ids = null,
    organization_ids = [],
  } = props.init; //

  return (
    <SmartForm
      config={config}
      {...props}
      init={{
        ...props.init,
        gender: gender != undefined ? gender : 1,
        cert: cert != undefined ? `${cert}` : '1',
        status: status != undefined ? `${status}` : '1',
        tag_ids,
        role_ids,
        organization_ids,
      }}
    ></SmartForm>
  );
};

UserManageForm.defaultProps = {
  init: {},  
};

export default UserManageForm;
