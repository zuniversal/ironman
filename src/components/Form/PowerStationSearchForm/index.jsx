import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const PowerStationSearchForm = props => {
  console.log(' PowerStationSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getListAsync,
      selectData: props.dataList,
      itemProps: {
        label: '电站名称',
        name: 'keyword',
        className: 'w50',
      },
      searchSuffix: true,
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'fsb PowerStationSearchForm '}>
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

PowerStationSearchForm.defaultProps = {};

export default PowerStationSearchForm;
