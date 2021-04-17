import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { weakStatusConfig } from '@/configs';

const MonitorManageSearchForm = props => {
  console.log(' MonitorManageSearchForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    {
      itemProps: {
        label: '客户',
        name: 'customer_name',
      },
    },
    {
      // formType: 'Search',
      // selectSearch: props.getPowerAsync,
      // selectData: props.powerList,
      itemProps: {
        label: '电站',
        name: 'name',
      },
      searchSuffix: true,
    },
  ];

  return (
    <div className={' MonitorManageSearchForm '}>
      <SearchForm
        config={config}
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

MonitorManageSearchForm.defaultProps = {};

export default MonitorManageSearchForm;
