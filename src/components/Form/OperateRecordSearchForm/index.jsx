import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const OperateRecordSearchForm = props => {
  console.log(' OperateRecordSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '模块',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' OperateRecordSearchForm '}>
      <SearchForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SearchForm>

      {formBtn}
    </div>
  );
};

OperateRecordSearchForm.defaultProps = {};

export default OperateRecordSearchForm;
