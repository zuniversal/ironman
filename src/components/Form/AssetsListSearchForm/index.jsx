import React from 'react';
import './style.less';
import { SearchForm } from '@/common/SmartForm';

const AssetsListSearchForm = props => {
  console.log(' AssetsListSearchForm ： ', props); //
  const config = [
    {
      customLabel: '',
      itemProps: {
        label: '关键字',
        name: 'keyword',
      },
      comProps: {
        // placeholder: '客户名称、户号、设备名称、设备厂家、设备型号',
      },
    },
    {
      itemProps: {
        label: '设备类型',
        name: 'type',
      },
    },
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
  ];

  return (
    <div className={'fsb assetsListSearchForm '}>
      <SearchForm config={config} {...props}></SearchForm>
    </div>
  );
};

AssetsListSearchForm.defaultProps = {};

export default AssetsListSearchForm;
