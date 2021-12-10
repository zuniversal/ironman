import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm';
import InputCom from '@/components/Widgets/InputCom';
import { regoins } from '@/configs';
import { formatConfig, reportRadioOp } from '@/utils';

const ticketConfig = [
  {
    name: 'executing',
    left: '执行中',
    right: '张',
    wrapperClass: 'formItems ',
  },
  { name: 'finished', left: '结束', right: '张', wrapperClass: 'formItems ' },
  { name: 'unExecuted', left: '未执行', right: '张' },
];

const ShiftsTransferHandInForm = props => {
  const { getCapture, showFormModal } = props;

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
          <InputCom disabled name={'wire'} right={'付'}></InputCom>
        </>
      ),
      itemProps: {
        label: '5.装临时接电线',
        // name: 'work_situation',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          <InputCom disabled name={'knife'} right={'付'}></InputCom>
        </>
      ),
      itemProps: {
        label: '接地闸刀推上',
        // name: 'work_situation',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          <InputCom disabled name={'lock'} right={'把'}></InputCom>
        </>
      ),
      itemProps: {
        label: '加保安锁',
        // name: 'work_situation',
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
        name: 'work_ticket',
      },
    },
    {
      itemProps: {
        label: '9.交给下一班工作',
        name: 'handover_work',
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

  return (
    <div className={'ShiftsTransferHandInForm'}>
      <SmartForm noPh config={config} isDisabledAll {...props}></SmartForm>
    </div>
  );
};

ShiftsTransferHandInForm.defaultProps = {};

export default ShiftsTransferHandInForm;
