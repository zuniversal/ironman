import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const AssetsSearchForm = props => {
  console.log(' AssetsSearchForm ： ', props);

  const config = [
    // {
    //   formType: 'Search',
    //   selectSearch: props.getClientAsync,
    //   selectData: props.clientList,
    //   itemProps: {
    //     label: '客户',
    //     name: 'customer',
    //   },
    //
    // },
    {
      formType: 'Search',
      selectSearch: props.getPowerAsync,
      selectData: props.powerList,
      itemProps: {
        label: '电站',
        // name: 'station',
        name: 'powerStation',
      },
    },
    // {
    //   itemProps: {
    //     label: '资产名称',
    //     name: '',
    //   },
    // },

    // {
    //   formType: 'Divider',
    //   itemProps: {
    //     label: '',
    //   },
    // },
    // {
    //   // formType: 'Select',
    //   itemProps: {
    //     label: '',
    //     name: 'keyword',
    //   },
    //   searchSuffix: true,
    // },
  ];

  return (
    <div className={'fsb assetsSearchForm '}>
      <SearchForm
        config={config}
        noRuleAll
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

AssetsSearchForm.defaultProps = {};

export default AssetsSearchForm;
