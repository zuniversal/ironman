import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //

const InspectMissionSearchForm = props => {
  console.log(' InspectMissionSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '处理人',
        name: 'team',
      },
    },
    {
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },
    {
      formType: 'Divider',
      itemProps: {
        label: '',
      },
      comProps: {},
    },

    // {
    //   // formType: 'Select',
    //   itemProps: {
    //     label: '',
    //     name: 'keyword',
    //   },
    //   comProps: {
    //     className: 'lastFormItem',
    //   },
    //   searchSuffix: true,
    // },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' InspectMissionSearchForm '}>
      <SearchForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        // {...rest}
        {...props}
      ></SearchForm>

      {formBtn}
    </div>
  );
};

InspectMissionSearchForm.defaultProps = {};

export default InspectMissionSearchForm;
