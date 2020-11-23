import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const UserManageSearchForm = props => {
  console.log(' UserManageSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

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
        name: 'role_id',
      },
    },

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

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'fsb UserManageSearchForm '}>
      <SearchForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        searchRight
        noRuleAll
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

UserManageSearchForm.defaultProps = {};

export default UserManageSearchForm;
