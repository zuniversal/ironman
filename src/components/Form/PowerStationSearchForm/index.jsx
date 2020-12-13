import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import ProvinceForm, {
  provinceFormConfig,
} from '@/components/Form/ProvinceForm'; //

const PowerStationSearchForm = props => {
  console.log(' PowerStationSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      // formType: 'Search',
      // selectSearch: props.getPowerAsync,
      // selectData: props.powerList,
      itemProps: {
        label: '电站名称',
        name: 'name',
        // className: 'w50',
      },
      searchSuffix: true,
    },
    {
      itemProps: {
        label: '客户名称',
        name: 'customer_name',
      },
    },
    ...provinceFormConfig(props),
    {
      formType: 'Divider',
      itemProps: {
        label: '',
      },
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
