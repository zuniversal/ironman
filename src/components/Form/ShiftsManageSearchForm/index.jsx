import React from 'react';
import PropTypes from 'prop-types';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { regoins, onDutyTypeConfig } from '@/configs';
import { formatConfig } from '@/utils';

const ShiftsManageSearchForm = props => {
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
      // searchSuffix: true,
    },
  ];

  return <SearchForm config={config} noRuleAll {...props}></SearchForm>;
};

ShiftsManageSearchForm.defaultProps = {
  typeList: [],
};

ShiftsManageSearchForm.propTypes = {
  typeList: PropTypes.array,
};

export default ShiftsManageSearchForm;
