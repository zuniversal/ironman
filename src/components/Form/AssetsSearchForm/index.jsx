import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const AssetsSearchForm = props => {
  console.log(' AssetsSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

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

    {
      formType: 'Divider',
      itemProps: {
        label: '',
      },
    },
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
        // flexRow={4}
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

AssetsSearchForm.defaultProps = {};

export default AssetsSearchForm;
