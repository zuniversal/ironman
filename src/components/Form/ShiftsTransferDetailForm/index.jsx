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

const choiceRadios = [
  { label: '是', value: 'yes', key: 'yes' },
  { label: '否', value: 'no', key: 'no' },
];

const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 16 }, //
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 }, //
  },
};

const transferDetailConfig = [
  {
    label:
      '1.交接班站班会:纸质文档部分交接与电子文档部分交接同时进行，在文档交接完毕后，进行面对面工作交接。',
  },
  { label: '2.今日工程计划是否已在生产计划发布群中发布，内容及日期是否正确。' },
  { label: '3.维修管控表是否已完成，井完成流转。' },
  { label: '4.昨日工程是否全部完工，是否有工程延续至今日。' },
  { label: '5.昨日抢修是否全部完成，是否需要今日跟进。' },
  { label: '6.今日工程数量是否已完成交接。' },
  { label: '7.今日抢修数量是否已完成交接。' },
  { label: '8.今日工程工作票是否已全部到位,杜绝无票工作。' },
  { label: '9.今日工程工作票是否已准备完毕。' },
  {
    label:
      '10.昨日抢修是否需要出具事故报告，否已在事故报告管控表中填写，是否已出具事故报告并提交。',
  },
  {
    label:
      '11.调度曲面大屏演示内容是否已全部开启到位，并将演示内容放在指定位置。',
  },
  { label: '12.居示厅所有灯光是否开启，屏幕是否开启井播放。' },
  {
    label:
      '13.昨日是否有电试报告需要流转，今日是否有电试报告需要交换，全部流程，井完成电试报告管控表。',
  },
  {
    label:
      '14.昨日是否有电试报告需要流转，今日是否有电试报告需要交换，全部流程，井完成电试报告管控表。',
  },
  { label: '15.接班人个人物品是否已全部排放制定位置(包括水杯)' },
  { label: '16.交接班后个人物品及垃圾是否带走，调度台是否保持整洁。' },
  { label: '17.交接班后个人物品及垃圾是否带走，调度台是否保持整洁。' },
];

const transferRadios = transferDetailConfig.map(v => ({
  formType: 'Radio',
  radioData: choiceRadios,
  itemProps: {
    ...v,
    ...layout,
    className: 'customWidthForm',
  },
}));

const ShiftsTransferDetailForm = props => {
  console.log(' ShiftsTransferDetailForm ： ', props); //

  const { getCapture, showFormModal } = props; //

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
      itemProps: {
        label: '接班班组',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '接班时间',
      },
    },
    // {
    //   formType: 'Radio',
    //   radioData: choiceRadios,
    //   itemProps: {
    //     label: '11.其他事项',
    //   },
    // },
    ...transferRadios,
    {
      itemProps: {
        label: '18.其他重要事情交接',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={'shiftsTransferDetailForm'}>
      <div className="fje btnWrapper ">
        {/* <Button type="primary "onClick={() => showFormModal({action: 'export',  })}  >导出数据</Button> */}
        <Button type="primary " onClick={() => {}}>
          导出数据
        </Button>
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

        noRuleAll
        isDisabledAll
        {...props}
      ></SmartForm>
    </div>
  );
};

ShiftsTransferDetailForm.defaultProps = {};

export default ShiftsTransferDetailForm;