import React from 'react';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const UserManageSearchForm = props => {
  const config = [
    {
      noRule: true,
      formType: 'TreeSelect',
      itemProps: {
        label: '业务部门',
        name: 'organization_id',
      },
      comProps: {
        treeData: props.organizeList,
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getRoleAsync,
      selectData: props.roleList,
      itemProps: {
        label: '角色',
        name: 'tag_id',
      },
    },
    // {
    //   // formType: 'Search',
    //   // selectSearch: props.getRoleAsync,
    //   // selectData: props.roleList,
    //   itemProps: {
    //     label: '职位',
    //     name: 'tag_id',
    //   },
    // },

    {
      noLabel: true,
      itemProps: {
        label: '名字、邮箱、手机号、职位',
        name: 'value',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return (
    <SearchForm config={config} searchRight noRuleAll {...props}></SearchForm>
  );
};

UserManageSearchForm.defaultProps = {};

export default UserManageSearchForm;
