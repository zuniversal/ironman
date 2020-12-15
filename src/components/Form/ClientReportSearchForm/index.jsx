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
      formType: 'DatePicker',
      itemProps: {
        label: '选择月份',
      },
      //
    },
    {
      formType: 'Select',
      itemProps: {
        label: '是否加急',
      },
      //
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '客户',
      },
      //
    },
    {
      // formType: 'Select',
      itemProps: {
        label: ' 户号',
      },
      //
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '巡检组长',
      },
      //
    },
  ];

  return (
    <div className={''}>
      <SearchForm config={config} formProps={formProps}></SearchForm>
    </div>
  );
};

ClientReportSearchForm.defaultProps = {};

export default ClientReportSearchForm;
