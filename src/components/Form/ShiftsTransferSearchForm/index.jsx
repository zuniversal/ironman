import React from 'react';
import PropTypes from 'prop-types';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const ShiftsTransferSearchForm = props => {
  const config = [
    {
      // formType: 'Search',
      // selectSearch: props.getTeamAsync,
      // selectData: props.teamList,
      itemProps: {
        label: '交班班组',
        name: 'transfer_team',
      },
    },
    // {
    //   formType: 'Search',
    //   selectSearch: props.getPower,
    //   selectData: props.powerList,
    //   itemProps: {
    //     label: '值班站',
    //     name: 'type',
    //   },
    // },
    {
      // formType: 'Search',
      // selectSearch: props.getTeamAsync,
      // selectData: props.teamList,
      itemProps: {
        label: '接班班组',
        name: 'recieve_team',
      },
    },
    {
      // formType: 'MonthPicker',
      formType: 'DatePicker',
      itemProps: {
        label: '选择日期',
        name: 'handover_time',
      },
    },
    // {
    //   formType: 'Select',
    //   itemProps: {
    //     label: '电站',
    //   },
    // },
  ];

  return <SearchForm config={config} noRuleAll {...props}></SearchForm>;
};

ShiftsTransferSearchForm.defaultProps = {
  powerList: [],
  userList: [],
};

ShiftsTransferSearchForm.propTypes = {
  powerList: PropTypes.array,
  userList: PropTypes.array,
};

export default ShiftsTransferSearchForm;
