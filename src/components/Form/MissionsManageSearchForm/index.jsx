import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { missionsStatusConfig } from '@/configs';

const MissionsManageSearchForm = props => {
  console.log(' MissionsManageSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectData: missionsStatusConfig,
      itemProps: {
        label: '状态',
      },
    },
    {
      formType: 'Divider',
      itemProps: {
        label: '',
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

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageSearchForm '}>
      <SearchForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        noRuleAll
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

MissionsManageSearchForm.defaultProps = {};

export default MissionsManageSearchForm;
