import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const SearchKwForm = props => {
  console.log(' SearchKwForm ： ', props); //
  const { formBtn, className, keyword, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline'
  };

  const config = [
    {
      // formType: 'Select',
      itemProps: {
        label: '',
        name: keyword,
      },
      searchSuffix: true,
    },
  ];

  return (
    <div className={`fsb searchKwForm ${className}`}>
      <SearchForm
        // flexRow={4}
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}
        noRuleAll
        // {...rest}
        {...props}
      ></SearchForm>

      {/* {formBtn} */}
    </div>
  );
};

SearchKwForm.defaultProps = {
  className: '',
  keyword: 'keyword',
};

SearchKwForm.propTypes = {
  className: PropTypes.string,
  keyword: PropTypes.string,
};

export default SearchKwForm;
