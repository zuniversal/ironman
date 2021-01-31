import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig, reportRadioOp } from '@/utils'; //

const ClientReportSearchForm = props => {
  console.log(' ClientReportSearchForm ： ', props); //

  const { getCapture } = props; //

  const config = [
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '选择月份',
        name: 'year_month',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '户号/客户名称/客户代表/巡检组长',
        name: 'filter',
      },
      comProps: {
        className: 'keywordInput',
      },
    },
    // {
    //   itemProps: {
    //     label: ' 户号',
    //     name: 'number',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '客户名称',
    //     name: 'name',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '客户代表',
    //     name: 'service_staff_name',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '巡检组长',
    //     name: 'service_team_name',
    //   },
    // },
    // {
    //   formType: 'Select',
    //   itemProps: {
    //     label: '是否加急',
    //     name: '',
    //   },
    // },
  ];

  return (
    <div className={''}>
      <SearchForm
        config={config}
        className={'clientReportSearchForm'}
        {...props}
      ></SearchForm>
    </div>
  );
};

ClientReportSearchForm.defaultProps = {};

export default ClientReportSearchForm;
