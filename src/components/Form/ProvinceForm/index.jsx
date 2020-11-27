import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { regoins, province, site, city } from '@/configs'; //
// import regoins from '@/configs/regions.js'; //
import { formatConfig, reportRadioOp } from '@/utils'; //

export const config = props => [
  {
    formType: 'Search',
    // selectSearch: params => props.getDistrictAsync({ province: params }),
    selectData: props.provinceList,
    // selectData: province,
    noRule: true,
    itemProps: {
      label: '省',
      name: 'province',
      // key: 'province',
    },
    comProps: {
      className: 'w-200',
    },
    // customLabel: '自定义customLabel',
  },
  {
    formType: 'Search',
    // selectSearch: params => props.getDistrictAsync({ city: params }),
    selectData: props.citytList,
    // selectData: city,
    noRule: true,
    itemProps: {
      label: '市',
      name: 'city',
      // key: 'city',
    },
    comProps: {
      className: 'w-200',
    },
  },
  {
    formType: 'Search',
    // selectSearch: props.getDistrictAsync,
    selectData: props.countryList,
    // selectData: site,
    noRule: true,
    itemProps: {
      label: '县',
      name: 'area',
      // key: 'site',
    },
    comProps: {
      className: 'w-200',
    },
  },

  // <Form.Item
  //   name="email"
  //   label="E-mail"
  //   key={'email'}
  //   rules={[
  //     {
  //       type: 'email',
  //       message: 'The input is not valid E-mail!',
  //     },
  //     {
  //       required: true,
  //       message: 'Please input your E-mail!',
  //     },
  //   ]}
  // >
  //   <Input />
  // </Form.Item>,

  // {
  //   formType: 'Select',
  //   itemProps: {
  //     label: "Select", name: 'select', key: "select", rules: rules(),
  //   },
  //   comProps: {
  //     allowClear: true,
  //     onChange: onGenderChange,
  //     placeholder: "Select a option and change input text above",
  //   },
  //   selectOptions: selectOptions,

  // },
];

const init = {
  name: 'zyb',
  role: '巡检人员',
  tel: 'zyb',
  email: 'zyb',
  dep: '巡检运维',
  // password
  // password2
  // select
};

const ProvinceForm = props => {
  console.log(' ProvinceForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    layout: 'inline',
  };

  return (
    <div className={' provinceForm '}>
      <SearchForm
        // flexRow={8}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SearchForm>

      {formBtn}
    </div>
  );
};

ProvinceForm.defaultProps = {};

export default ProvinceForm;
