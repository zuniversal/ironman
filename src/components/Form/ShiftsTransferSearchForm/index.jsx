import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const ShiftsTransferSearchForm = props => {
  console.log(' ShiftsTransferSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      // formType: 'Search',
      // selectSearch: props.getTeamAsync,
      // selectData: props.teamList,
      itemProps: {
        label: '交班人',
        name: 'transfer_team_name',
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
        label: '接班人',
        name: 'receive_team_name',
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

  return (
    <div className={'ShiftsTransferSearchForm '}>
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

ShiftsTransferSearchForm.defaultProps = {
  powerList: [],
  userList: [],
};

ShiftsTransferSearchForm.propTypes = {
  powerList: PropTypes.array,
  userList: PropTypes.array,
};

export default ShiftsTransferSearchForm;
