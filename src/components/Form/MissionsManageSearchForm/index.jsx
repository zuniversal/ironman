import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { missionsStatusConfig, missionsTypeConfig } from '@/configs';

const MissionsManageSearchForm = props => {
  console.log(' MissionsManageSearchForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectData: missionsStatusConfig,
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
      noLabel: true,
      itemProps: {
        label: '名称',
        name: 'keyword',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getClientAsync,
      selectData: props.clientList,
      itemProps: {
        label: '客户',
        name: 'customer_id',
      },
    },
    {
      formType: 'Search',
      selectData: missionsTypeConfig,
      itemProps: {
        label: '任务类型',
        name: 'type',
      },
    },
  ];

  return (
    <div className={' MissionsManageSearchForm '}>
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

MissionsManageSearchForm.defaultProps = {};

export default MissionsManageSearchForm;
