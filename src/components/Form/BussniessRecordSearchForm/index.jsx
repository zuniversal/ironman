import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const BussniessRecordSearchForm = props => {
  console.log(' BussniessRecordSearchForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    {
      noLabel: true,
      itemProps: {
        label: 'id或关键字',
        // label: '任务/客户名称',
        name: 'keyword',
      },
      searchSuffix: true,
    },
    {
      formType: 'RangePicker',
      itemProps: {
        label: '日期',
        name: 'date',
      },
    },
  ];

  return (
    <div className={'BussniessRecordSearchForm '}>
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

BussniessRecordSearchForm.defaultProps = {};

BussniessRecordSearchForm.propTypes = {};

export default BussniessRecordSearchForm;
