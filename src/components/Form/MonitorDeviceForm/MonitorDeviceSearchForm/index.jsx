import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { weakStatusConfig } from '@/configs';

const MonitorDeviceSearchForm = props => {
  console.log(' MonitorDeviceSearchForm ： ', props);
  const { formBtn, ...rest } = props;

  const config = [
    {
      itemProps: {
        label: '厂商',
        name: 'manufacturer',
      },
    },
    {
      itemProps: {
        label: '型号',
        name: 'model',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: 'IMEI号、sim号',
        name: 'keyword',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return (
    <div className={' monitorDeviceSearchForm '}>
      <SearchForm
        config={config}
        // {...rest}
        {...props}
      ></SearchForm>
    </div>
  );
};

MonitorDeviceSearchForm.defaultProps = {};

export default MonitorDeviceSearchForm;
