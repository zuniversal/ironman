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
      formType: 'DatePicker',
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
    <div className={' CsInspectRecordSearchForm '}>
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

CsInspectRecordSearchForm.defaultProps = {};

export default CsInspectRecordSearchForm;
