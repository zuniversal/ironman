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
      // comProps: {},
    },
    {
      formType: 'Select',
      itemProps: {
        label: '是否加急',
      },
      // comProps: {},
    },
    {
      formType: 'Select',
      itemProps: {
        label: '客户',
      },
      // comProps: {},
    },
    {
      formType: 'Select',
      itemProps: {
        label: ' 户号',
      },
      // comProps: {},
    },
    {
      formType: 'Select',
      itemProps: {
        label: '巡检组长',
      },
      // comProps: {},
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={''}>
      {/* <SmartForm
        // flexRow={4}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        isSearchForm
        {...props}
      ></SmartForm> */}

      <SearchForm config={config} formProps={formProps}></SearchForm>
    </div>
  );
};

ClientReportSearchForm.defaultProps = {};

export default ClientReportSearchForm;
