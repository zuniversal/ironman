import React from 'react';
import PropTypes from 'prop-types'
import './style.less';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
} from 'antd';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { regoins,  } from '@/configs'; //
import { formatConfig,  } from '@/utils'; //

const ShiftsArrangeSearchForm = props => {
  console.log(' ShiftsArrangeSearchForm ： ', props); //

  const { getCapture, showFormModal } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getTeam,
      selectData: props.teamList,
      itemProps: {
        label: '班组',
        name: 'team',
      },
    },
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '月',
        name: 'schedule_date',
      },
    },
    // {
    //   formType: 'DatePicker',
    //   itemProps: {
    //     label: '月',
    //     name: 'month',
    //   },
    // },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'ShiftsArrangeSearchForm'}>
      {/* <div className="fje btnWrapper ">
        <Button type="primary "onClick={() => {}}  >导出数据</Button>
      </div> */}

      <SearchForm
        // flexRow={4}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}
        // init={{
        //   key9: regoins,
        // }}

        noRuleAll
        {...props}
      ></SearchForm>
    </div>
  );
};

ShiftsArrangeSearchForm.defaultProps = {
  teamList: [],
};

ShiftsArrangeSearchForm.propTypes = {
  teamList: PropTypes.array,
};

export default ShiftsArrangeSearchForm;
