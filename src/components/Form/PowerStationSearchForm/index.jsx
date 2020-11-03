import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

export const config = [
  {
    // formType: 'Select',
    itemProps: {
      label: '',
      name: 'keyword',
      className: 'w50',
    },
    searchSuffix: true,
  },
];

const PowerStationSearchForm = props => {
  console.log(' PowerStationSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //
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
