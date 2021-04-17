import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { regoins, onDutyTypeConfig } from '@/configs';
import { formatConfig } from '@/utils';

const ShiftsManageSearchForm = props => {
  console.log(' ShiftsManageSearchForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    {
      formType: 'Search',
      selectData: onDutyTypeConfig, //
      itemProps: {
        label: '类型',
        name: 'type',
      },
      comProps: {
        notFoundContent: '请先创建班组',
      },
    },
    // {
    //   formType: 'Divider',
    //   itemProps: {
    //     label: '',
    //   },
    //
    // },

    {
      // formType: 'Select',
      itemProps: {
        label: '班组名称',
        name: 'name',
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
        config={config}
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
