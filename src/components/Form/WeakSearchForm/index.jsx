import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { weakStatusConfig } from '@/configs';

const WeakSearchForm = props => {
  console.log(' WeakSearchForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    {
      formType: 'Search',
      selectData: weakStatusConfig,
      itemProps: {
        label: '处理状态',
        name: 'status',
      },
    },
    // {
    //   formType: 'Select',
    //   itemProps: {
    //     label: '审批状态',
    //   },
    // },
    // {
    //   formType: 'Divider',
    //   itemProps: {
    //     label: '',
    //   },
    //
    // },

    {
      noLabel: true,
      itemProps: {
        label: '名称',
        name: 'name',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return (
    <div className={' WeakSearchForm '}>
      <SearchForm
        config={config}
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

WeakSearchForm.defaultProps = {};

export default WeakSearchForm;
