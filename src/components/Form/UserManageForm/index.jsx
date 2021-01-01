import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const UserManageForm = props => {
  console.log(' UserManageForm ： ', props); //
  const { formBtn, ...rest } = props; //
  //  account 对象里的   password    account_type -  客户 管理着 - 默认  certification_status 1
  const config = [
    {
      itemProps: {
        label: '用户名',
        name: 'username',
      },
    },
    {
      itemProps: {
        label: '账号',
        name: 'nickname',
      },
    },
    {
      itemProps: {
        label: '手机',
        name: 'phone',
      },
    },
    // {
    //   itemProps: {
    //     label: '微信',
    //     name: 'wechat',
    //   },
    // },
    {
      noRule: true,
      itemProps: {
        label: '邮箱',
        name: 'email',
      },
    },
    {
      noRule: props.action !== 'add',
      itemProps: {
        label: '密码',
        name: 'password',
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
  ];

  return (
    <div className={' UserManageForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

UserManageForm.defaultProps = {};

export default UserManageForm;
