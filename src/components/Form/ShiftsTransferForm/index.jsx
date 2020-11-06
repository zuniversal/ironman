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
import InputCom from '@/components/Widgets/InputCom'; //
import { regoins } from '@/configs'; //
import { formatConfig, reportRadioOp } from '@/utils'; //

const ticketConfig = [
  { name: 'ing', left: '执行中', right: '张' },
  { name: 'end', left: '结束', right: '张' },
  { name: 'no', left: '未执行', right: '张' },
];

const ShiftsTransferForm = props => {
  console.log(' ShiftsTransferForm ： ', props); //

  const { getCapture, showFormModal } = props; //

  const config = [
    {
      itemProps: {
        label: '交接班类型',
        name: 'type',
      },
    },
    {
      itemProps: {
        label: '交班班组',
        name: 'transfer_team',
      },
    },
    {
      itemProps: {
        label: '接班班组',
        name: 'recieve_team',
      },
    },
    {
      // formType: 'DatePicker',
      itemProps: {
        label: '1.接班时间',
        name: 'handover_time',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '2.值班检查情况',
        name: 'inspect',
      },
    },
    {
      itemProps: {
        label: '3.当值电系变动情况',
        name: 'changes',
      },
    },
    {
      itemProps: {
        label: '4.检修工作情况',
        name: 'overhaul',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          <InputCom disabled right={'付'}></InputCom>
        </>
      ),
      itemProps: {
        label: '5.装临时接电线',
        name: 'work_situation',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          <InputCom disabled right={'付'}></InputCom>
        </>
      ),
      itemProps: {
        label: '接地闸刀推上',
        name: '',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          <InputCom disabled right={'把'}></InputCom>
        </>
      ),
      itemProps: {
        label: '加保安锁',
        name: '',
      },
    },
    {
      itemProps: {
        label: '6.当值设备检查情况',
        name: 'equipment_inspect',
      },
    },
    {
      itemProps: {
        label: '7.本站站务工作',
        name: 'station_work',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          {ticketConfig.map((v, i) => (
            <InputCom disabled {...v} key={i}></InputCom>
          ))}
        </>
      ),
      itemProps: {
        label: '8.工作票情况',
        name: '',
      },
    },
    {
      itemProps: {
        label: '9.交给下一班工作',
        name: '',
      },
    },
    {
      itemProps: {
        label: '10.工作、仪表、工具检查情况',
        name: 'tool_check',
      },
    },
    {
      itemProps: {
        label: '11.其他事项',
        name: 'other',
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
        {/* <Button type="primary " onClick={() => {}}>
          导出数据
        </Button> */}
      </div>

      <SmartForm
        // flexRow={4}
        noPh
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        isDisabledAll
        {...props}
      ></SmartForm>
    </div>
  );
};

ShiftsTransferForm.defaultProps = {};

export default ShiftsTransferForm;
