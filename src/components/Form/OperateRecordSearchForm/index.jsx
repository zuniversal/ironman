import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';

const OperateRecordSearchForm = props => {
  console.log(' OperateRecordSearchForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    {
      itemProps: {
        label: '模块',
      },
    },

    {
      noLabel: true,
      itemProps: {
        label: '内容关键字',
        name: 'value',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return (
    <div className={' OperateRecordSearchForm '}>
      <SearchForm
        config={config}
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

OperateRecordSearchForm.defaultProps = {};

export default OperateRecordSearchForm;
