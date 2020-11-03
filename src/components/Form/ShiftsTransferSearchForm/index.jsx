import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const ShiftsTransferSearchForm = props => {
  console.log(' ShiftsTransferSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getUser,
      selectData: props.userList,
      itemProps: {
        label: '交班人',
        name: 'transfer_team',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getPower,
      selectData: props.powerList,
      itemProps: {
        label: '值班站',
        name: 'type',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUser,
      selectData: props.userList,
      itemProps: {
        label: '接班人',
        name: 'receive_team',
      },
    },
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '选择日期',
        name: 'data',
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

ShiftsTransferSearchForm.defaultProps = {
  powerList: [],
  userList: [],
};

ShiftsTransferSearchForm.propTypes = {
  powerList: PropTypes.array,
  userList: PropTypes.array,
};

export default ShiftsTransferSearchForm;
