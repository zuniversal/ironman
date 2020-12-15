import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { inspectMissionsSearchConfig } from '@/configs';

const InspectMissionSearchForm = props => {
  console.log(' InspectMissionSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      // 职位 班组组长
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '处理人',
        name: 'team',
      },
    },
    {
      formType: 'Search',
      selectData: inspectMissionsSearchConfig,
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },
    // {
    //   formType: 'Divider',
    //   itemProps: {
    //     label: '',
    //   },
    //
    // },

    {
      // formType: 'Select',
      noLabel: true,
      itemProps: {
        label: '名称',
        name: 'keyword',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return (
    <div className={' InspectMissionSearchForm '}>
      <SearchForm
        config={config}
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

InspectMissionSearchForm.defaultProps = {};

export default InspectMissionSearchForm;
