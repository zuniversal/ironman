import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const WeakSearchForm = props => {
  console.log(' WeakSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Select',
      itemProps: {
        label: '处理状态',
      },
    },
    {
      formType: 'Select',
      itemProps: {
        label: '审批状态',
      },
    },
    {
      formType: 'Divider',
      itemProps: {
        label: '',
      },
      comProps: {},
    },

    {
      // formType: 'Select',
      itemProps: {
        label: '',
        name: 'keyword',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' WeakSearchForm '}>
      <SearchForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

WeakSearchForm.defaultProps = {};

export default WeakSearchForm;
