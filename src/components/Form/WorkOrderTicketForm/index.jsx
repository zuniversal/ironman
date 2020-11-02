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
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const choiceRadios = [
  { label: '种类1', value: 'yes', key: 'yes' },
  { label: '种类2', value: 'no', key: 'no' },
];

const WorkOrderTicketForm = props => {
  console.log(' WorkOrderTicketForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '编号',
        name: 'code',
      },
    },
    {
      itemProps: {
        label: '电站名称',
        name: ['station', 'name'],
      },
    },
    {
      itemProps: {
        label: '负责人姓名',
        name: '',
      },
    },
    {
      itemProps: {
        label: '施工班组',
        name: '',
      },
    },
    {
      itemProps: {
        label: '工作地点',
        name: 'addr',
      },
    },
    {
      itemProps: {
        label: '工作内容',
        name: 'job_content',
      },
    },
    {
      itemProps: {
        label: '计划工作时间',
        name: '',
      },
    },
    {
      itemProps: {
        label: '安全措施',
        name: 'protective_measure',
      },
    },
    {
      itemProps: {
        label: '应装接地线、应合接地闸刀（注明确实地点、名称）',
        name: '',
      },
    },
    {
      itemProps: {
        label: '应设遮栏、应挂标示牌及防止继电保护误碰误震等措施',
        name: '',
      },
    },
    {
      itemProps: {
        label: '补充说明',
        name: 'supplement',
      },
    },
    {
      itemProps: {
        label: '工作部位电系绘图说明',
        name: 'file',
      },
    },
    {
      itemProps: {
        label: '总人数',
        name: 'person_num',
      },
    },
    {
      itemProps: {
        label: '姓名',
        name: 'person_name',
      },
    },
    {
      itemProps: {
        label: '无人值班变电站现场许可人与当值调度（或集控站、中心站）联系',
        name: 'wt_contact',
      },
    },
    {
      itemProps: {
        label: '工作人员变动',
        name: 'wt_person_changes',
      },
    },
    {
      itemProps: {
        label: '有效期延长至',
        name: '',
      },
    },
    {
      itemProps: {
        label: '工作负责人',
        name: '',
      },
    },
    {
      itemProps: {
        label: '工作许可人',
        name: '',
      },
    },
    {
      itemProps: {
        label: '每日开工和收工时间（使用一天的工作票不必填写）',
        name: 'wt_work_record',
      },
    },
    {
      itemProps: {
        label:
          '工作总负责人对分票工作负责人许可、汇报记录（非工作总负责人不必填写）',
        name: '',
      },
    },
    {
      itemProps: {
        label: '结束时间',
        name: 'finish_time',
      },
    },
    {
      itemProps: {
        label: '工作票终结',
        name: '',
      },
    },
    {
      itemProps: {
        label: '备注',
        name: 'remarks',
      },
    },
    {
      itemProps: {
        label: '操作人',
        name: '',
      },
    },
    {
      itemProps: {
        label: '监护人',
        name: '',
      },
    },
    {
      itemProps: {
        label: '由工作负责人指定专责监护人',
        name: '',
      },
    },
    {
      itemProps: {
        label: '负责监护',
        name: '',
      },
    },
    {
      itemProps: {
        label: '其他补充安全措施',
        name: '',
      },
    },
    {
      itemProps: {
        label: '其他事项',
        name: '',
      },
    },
    {
      itemProps: {
        label: '交任务、交安全确认',
        name: '',
      },
    },
    {
      itemProps: {
        label: '工作票执行完毕印鉴',
        name: '',
      },
    },
    {
      itemProps: {
        label: '本工作票已于',
        name: '',
      },
    },
    {
      itemProps: {
        label: '检查，执行符合要求/存在问题已向 ',
        name: '',
      },
    },
    {
      itemProps: {
        label: '检查人员',
        name: '',
      },
    },
    {
      itemProps: {
        label: '',
        name: '',
      },
    },
    {
      itemProps: {
        label: '',
        name: '',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' WorkOrderTicketForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

WorkOrderTicketForm.defaultProps = {};

export default WorkOrderTicketForm;
