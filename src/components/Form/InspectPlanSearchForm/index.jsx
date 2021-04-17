import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const InspectPlanSearchForm = props => {
  console.log(' InspectPlanSearchForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    // {
    //   formType: 'DatePicker',
    //   itemProps: {
    //     label: '年',
    //     name: '',
    //   },
    // },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      // selectData: props.tagUserList,
      itemProps: {
        label: '客户代表',
        name: 'leader',
      },
    },
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '月',
        name: 'month',
      },
    },
  ];

  return (
    <div className={' inspectPlanSearchForm '}>
      <SearchForm
        config={config}
        noRule={false}
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

InspectPlanSearchForm.defaultProps = {};

export default InspectPlanSearchForm;
