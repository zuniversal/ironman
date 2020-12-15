import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { workOrderStatusConfig } from '@/configs';

const CsInspectRecordSearchForm = props => {
  console.log(' CsInspectRecordSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      // formType: 'Select',
      noLabel: true,
      itemProps: {
        label: '关键字',
        name: 'keyword',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
    {
      formType: 'RangePicker',
      itemProps: {
        label: '日期',
        name: '',
      },
    },
  ];

  return (
    <div className={' CsInspectRecordSearchForm '}>
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

CsInspectRecordSearchForm.defaultProps = {};

export default CsInspectRecordSearchForm;
