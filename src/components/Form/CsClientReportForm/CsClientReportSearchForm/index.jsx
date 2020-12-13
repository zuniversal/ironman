import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { workOrderStatusConfig } from '@/configs';

const CsClientReportSearchForm = props => {
  console.log(' CsClientReportSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      noLabel: true,
      itemProps: {
        label: '报告名称',
        name: 'keyword',
      },
    },
    {
      formType: 'RangePicker',
      itemProps: {
        label: '日期',
        name: '',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' CsClientReportSearchForm '}>
      <SearchForm
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

CsClientReportSearchForm.defaultProps = {};

export default CsClientReportSearchForm;
