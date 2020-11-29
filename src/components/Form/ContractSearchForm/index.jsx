import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import SearchForm from '@/common/SearchForm'; //
import { regoins } from '@/configs'; //

const ContractSearchForm = props => {
  console.log(' ContractSearchForm ： ', props); //

  const { formBtn } = props; //

  const config = [
    {
      itemProps: {
        label: '合同名称',
      },
    },
    {
      itemProps: {
        label: '客户',
      },
    },
    {
      formType: 'Select',
      itemProps: {
        label: '合同类型',
      },
    },
    {
      itemProps: {
        label: '户号',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'flex-bw'}>
      <SearchForm
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        // {...rest}
        {...props}
      ></SearchForm>

      {/* <SearchForm></SearchForm> */}

      {/* {formBtn} */}
    </div>
  );
};

ContractSearchForm.defaultProps = {};

export default ContractSearchForm;
