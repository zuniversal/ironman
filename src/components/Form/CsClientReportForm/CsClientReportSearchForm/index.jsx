import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { workOrderStatusConfig } from '@/configs';

const CsClientReportSearchForm = props => {
  console.log(' CsClientReportSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    // {
    //   noLabel: true,
    //   itemProps: {
    //     label: '报告名称',
    //     name: 'keyword',
    //   },
    // },
    // {
    //   formType: 'RangePicker',
    //   itemProps: {
    //     label: '日期',
    //     name: '',
    //   },
    // },

    // {
    //   noRule: false,
    //   formType: 'Search',
    //   selectData: props.clientList,
    //   itemProps: {
    //     label: '客户',
    //     name: 'customer_id',
    //   },
    //   comProps: {
    //     mode: 'multiple',
    //   },
    // },
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '选择月份',
        name: 'year_month',
      },
    },
    // {
    //   noLabel: true,
    //   itemProps: {
    //     label: '户号/客户名称/客户代表/巡检组长',
    //     name: 'filter',
    //   },
    //   comProps: {
    //     className: 'keywordInput',
    //   },
    // },
  ];

  return (
    <div className={' CsClientReportSearchForm '}>
      <SearchForm
        config={config}
        noRule={false}
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

CsClientReportSearchForm.defaultProps = {};

export default CsClientReportSearchForm;
