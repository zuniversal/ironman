import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import { regoins, onDutyTypeConfig } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const ShiftsManageForm = props => {
  console.log(' ShiftsManageForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  const config = [
    {
      itemProps: {
        label: '班组名称',
        name: 'name',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUser,
      selectData: props.userList,
      itemProps: {
        label: '组长姓名',
        name: 'team_headman',
      },
    },
    {
      formType: 'DynamicItem',
      itemProps: {
        label: '组员姓名',
        className: 'noMargin',
        name: 'member',
      },
      comProps: {
        limit: 5,
        extra: true,
        filterSelect: true,
        formType: 'Search',
        // selectSearch: props.getUser,
        selectData: props.userList,
        itemProps: {
          label: '组员',
        },
        comProps: {
          className: 'w-320',
          // name: 'member',
        },
      },
    },
    {
      formType: 'Search',
      selectData: onDutyTypeConfig,
      itemProps: {
        label: '类型',
        name: 'type',
      },
    },
    {
      itemProps: {
        label: '车辆牌照',
        name: 'car_number',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUser,
      selectData: props.userList,
      itemProps: {
        label: '区块链经理',
        name: 'leader',
      },
    },
  ];

  return (
    <div className={' ShiftsManageForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        isDisabledAll={props.action === 'detail'}
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

ShiftsManageForm.defaultProps = {
  typeList: [],
};

ShiftsManageForm.propTypes = {
  typeList: PropTypes.array,
};

export default ShiftsManageForm;
