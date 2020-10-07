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
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const datas = [
  {
    title: '20200808 10:10',
    description:
      '李四因巡检员身体欠佳原因将任务巡检日期由20200810 调整成20200810',
  },
  {
    title: '20200808 10:10',
    description:
      '李四因巡检员身体欠佳原因将任务巡检日期由20200810 调整成20200810',
  },
];

const InspectMissionDetailForm = props => {
  console.log(' InspectMissionDetailForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '名称',
        name: 'name',
      },
    },
    {
      itemProps: {
        label: '电站',
        name: 'station.name',
      },
    },
    {
      itemProps: {
        label: '当前状态',
        name: 'status',
      },
    },
    {
      itemProps: {
        label: '创建日期',
        name: 'create_time',
      },
    },
    {
      itemProps: {
        label: '客户名称',
        name: 'customer',
      },
    },
    {
      itemProps: {
        label: '领取时间',
        name: 'assign_date',
      },
    },
    {
      itemProps: {
        label: '开始时间',
        name: 'work_date',
      },
    },
    {
      itemProps: {
        label: '完成时间',
        name: 'work_date',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <InspectMissionTimeline datas={datas}></InspectMissionTimeline>
      ),
      itemProps: {
        label: '任务日志',
        name: 'task_log',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' InspectMissionDetailForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        noRuleAll
        isDisabledAll
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

InspectMissionDetailForm.defaultProps = {};

export default InspectMissionDetailForm;
