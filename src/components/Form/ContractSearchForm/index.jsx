import React from 'react';
import './style.less';
import SmartForm, { SearchForm } from '@/common/SmartForm';
import { contractTypeConfig } from '@/configs';

const ContractSearchForm = props => {
  console.log(' ContractSearchForm ： ', props);

  const { formBtn } = props;

  const config = [
    // {
    //   itemProps: {
    //     label: '合同名称',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '客户',
    //   },
    // },
    // {
    //   formType: 'Select',
    //   itemProps: {
    //     label: '合同类型',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '户号',
    //   },
    // },
    {
      formType: 'Select',
      selectData: contractTypeConfig,
      itemProps: {
        label: '合同类型',
        name: 'type',
      },
    },
  ];

  return (
    <div className={'flex-bw'}>
      <SearchForm
        config={config}
        // {...rest}
        {...props}
      ></SearchForm>
    </div>
  );
};

ContractSearchForm.defaultProps = {};

export default ContractSearchForm;
