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



const ShiftsTransferForm = props => {
  console.log(' ShiftsTransferForm ： ', props); //

  const {getCapture, showFormModal,  } = props// 

  const config = [
    {
      itemProps: {
        label: '交接班类型',
      },
    },
    {
      itemProps: {
        label: '交班班组',
      },
    },
    {
      formType: 'DatePicker', 
      itemProps: {
        label: '1.接班时间',
      },
    },
    {
      formType: 'TextArea', 
      itemProps: {
        label: '2.值班检查情况',
      },
    },
    {
      itemProps: {
        label: '3.当值电系变动情况',
      },
    },
    {
      itemProps: {
        label: '4.检修工作情况',
      },
    },
    {
    formType: 'Select', 
      itemProps: {
        label: '5.装临时接电线',
      },
    },
    {
      itemProps: {
        label: '6.当值设备检查情况',
      },
    },
    {
      itemProps: {
        label: '7.本站站务工作',
      },
    },
    {
      itemProps: {
        label: '8.工作票情况',
      },
    },
    {
      itemProps: {
        label: '9.交给下一班工作',
      },
    },
    {
      itemProps: {
        label: '10.工作、仪表、工具检查情况',
      },
    },
    {
      itemProps: {
        label: '11.其他事项',
      },
    },
    
  ];
  




  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'shiftsTransferForm'}>
      <div className="fje btnWrapper ">
        {/* <Button type="primary "onClick={() => showFormModal({action: 'export',  })}  >导出数据</Button> */}
        <Button type="primary "onClick={() => {}}  >导出数据</Button>
      </div>

      <SmartForm
        // flexRow={4}
        noPh
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

ShiftsTransferForm.defaultProps = {};

export default ShiftsTransferForm;
