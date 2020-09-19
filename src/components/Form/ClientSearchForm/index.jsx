import React from 'react';
import './style.less';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
  Divider,
} from 'antd';

import SmartForm from '@/common/SmartForm'; //
import SearchForm from '@/common/SearchForm'; //
import ProvinceForm from '@/components/Form/ProvinceForm'; //
import { regoins } from '@/configs'; //



const ClientSearchForm = props => {
  console.log(' ClientSearchForm ： ', props); //

  const [form] = Form.useForm();

  const { formBtn } = props; //

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className='clientSearchForm'>
      <ProvinceForm
        propsForm={form}
      ></ProvinceForm>

      {/* <hr className='hrs'  /> */}
      
      <Divider />

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

        {formBtn && formBtn(
          {form,  }
        )}
      </div>
    </div>
  );
};

ClientSearchForm.defaultProps = {};

export default ClientSearchForm;
