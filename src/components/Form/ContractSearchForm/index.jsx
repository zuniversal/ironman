import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import SearchForm from '@/common/SearchForm'; //
import { regoins } from '@/configs'; //

const ContractSearchForm = props => {
  console.log(' ContractSearchForm ： ', props); //

  const { formBtn } = props; //

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'flex-bw'}>
      {/* <SmartForm
        flexRow={4}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...props}
      ></SmartForm> */}

      <SearchForm></SearchForm>

      {formBtn}
    </div>
  );
};

ContractSearchForm.defaultProps = {};

export default ContractSearchForm;
