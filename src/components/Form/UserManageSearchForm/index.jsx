import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

export const config = [
  {
    formType: 'Select',
    itemProps: {
      label: '业务部门',
    },
    comProps: {},
  },
  {
    formType: 'Select',
    itemProps: {
      label: '角色',
    },
    comProps: {},
  },

  {
    // formType: 'Select',
    itemProps: {
      label: '',
      name: 'keyword',
    },
    comProps: {
      className: 'lastFormItem',
    },
    searchSuffix: true,
  },
];

const UserManageSearchForm = props => {
  console.log(' UserManageSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //
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
