import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { regoins, onDutyTypeConfig } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const ShiftsManageSearchForm = props => {
  console.log(' ShiftsManageSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  const config = [
    {
      formType: 'Search',
      selectData: onDutyTypeConfig,
      itemProps: {
        label: '类型',
        name: 'type',
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

  return (
    <div className={'ShiftsManageSearchForm '}>
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

ShiftsManageSearchForm.defaultProps = {
  typeList: [],
};

ShiftsManageSearchForm.propTypes = {
  typeList: PropTypes.array,
};

export default ShiftsManageSearchForm;
