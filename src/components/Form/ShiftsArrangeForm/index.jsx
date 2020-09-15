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


const choiceRadios = [
  { value: '是', key: 'yes',  },
  { value: '否', key: 'no',  },
]


const ShiftsArrangeForm = props => {
  console.log(' ShiftsArrangeForm ： ', props); //

  const {getCapture, showFormModal,  } = props// 

  const config = [
    {
      formType: 'Select', 
      itemProps: {
        label: '选择班组',
      },
    },
    {
      formType: 'DatePicker', 
      itemProps: {
        label: '选择月份',
      },
    },
    {
      formType: 'Radio', 
      itemProps: {
        label: '按法定工作日快速排班',
      },
      radioOptions: choiceRadios,
      opType: 'group',
    },
    
  ];
  




  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'ShiftsArrangeForm'}>
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

ShiftsArrangeForm.defaultProps = {};

export default ShiftsArrangeForm;
