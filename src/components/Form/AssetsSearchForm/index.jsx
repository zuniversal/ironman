import React from 'react';
import './style.less';
import { SearchForm } from '@/common/SmartForm';

const AssetsSearchForm = props => {
  console.log(' AssetsSearchForm ： ', props);
  const configs = [
    {
      itemProps: {
        label: '所属客户',
        name: 'keyword',
      },
    },
    {
      formType: 'Search',
      selectData: props.houseNoList,
      itemProps: {
        label: '户号',
        name: 'number',
      },
    },
  ];

  return (
    <div className={'fsb  '}>
      <SearchForm config={configs} {...props}></SearchForm>
    </div>
  );
};

export default AssetsSearchForm;
