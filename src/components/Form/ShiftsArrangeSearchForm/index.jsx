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
} from 'antd';

import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'//
import { formatConfig, reportRadioOp,  } from '@/utils'//




const ShiftsArrangeSearchForm = props => {
  console.log(' ShiftsArrangeSearchForm ： ', props); //

  const {getCapture, showFormModal,  } = props// 

  const config = [
    {
      formType: 'Select', 
      itemProps: {
        label: '班组',
      },
    },
    {
      formType: 'DatePicker', 
      itemProps: {
        label: '月份',
      },
    },
    
  ];
  




  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'ShiftsArrangeSearchForm'}>
      <div className="fje btnWrapper ">
        {/* <Button type="primary "onClick={() => showFormModal({action: 'export',  })}  >导出数据</Button> */}
        <Button type="primary "onClick={() => {}}  >导出数据</Button>
      </div>

      <SmartForm
        // flexRow={4}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}
        // init={{
        //   key9: regoins,
        // }}
        {...props}
      ></SmartForm>
    </div>
  );
};

ShiftsArrangeSearchForm.defaultProps = {};

export default ShiftsArrangeSearchForm;
