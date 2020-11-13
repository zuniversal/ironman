import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import UploadCom from '@/components/Widgets/UploadCom'; //

const choiceRadios = [
  { label: '种类1', value: 'yes', key: 'yes' },
  { label: '种类2', value: 'no', key: 'no' },
];

const layoutObj = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 14 },
  labelCol: {
    lg: { span: 7 }, //
  },
  wrapperCol: {
    lg: { span: 17 }, //
  },
};

const twoFormLayouts = {
  labelCol: {
    sm: { span: 12 }, //
  },
  wrapperCol: {
    sm: { span: 12 }, //
  },
};

const WorkOrderTicketForm = props => {
  console.log(' WorkOrderTicketForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const excuteConfig = [
    {
      itemProps: {
        label: '内容',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '是否执行',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '补充内容',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '是否执行',
        name: '',
        className: 'w50',
      },
    },
  ];

  const stationContractConfig = [
    {
      itemProps: {
        label: '时间',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '内容摘要',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '接受汇报人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '现场许可人',
        name: '',
        className: 'w50',
      },
    },
  ];
  const peopleChangeConfig = [
    {
      itemProps: {
        label: '增添人员',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '时间',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作负责人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '离去人员',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '时间',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作负责人',
        name: '',
        className: 'w50',
      },
    },
  ];
  const ticketDelayConfig = [
    {
      itemProps: {
        label: '内容',
        name: '',
        className: 'w50',
      },
    },
  ];
  const workTimeConfig = [
    {
      itemProps: {
        label: '收工时间!',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作负责人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作许可人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '开工时间',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作负责人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作许可人',
        name: '',
        className: 'w50',
      },
    },
  ];
  const reportConfig = [
    {
      itemProps: {
        label: '分票编号',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '汇报结束时间',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '分票工作负责人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '许可工作时间',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '汇报结束时间',
        name: '',
        className: 'w50',
      },
    },
  ];

  const config = [
    {
      itemProps: {
        label: '编号',
        name: 'code',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '电站名称',
        name: ['station', 'name'],
        className: 'w50',
      },
    },
    {
      flexRow: 1,
      formType: 'rowText',
      itemProps: {
        label: '1.工作负责人',
        name: '',
      },
    },
    {
      itemProps: {
        label: '负责人姓名',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '施工班组',
        name: '',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '2.工作内容',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作地点',
        name: 'addr',
        className: 'w50',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '工作内容',
        name: 'job_content',
        // className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '3.计划工作时间',
        name: '',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '开始',
        name: '',
        className: 'w50',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '结束',
        name: '',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '4.安全措施',
        name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label:
          '应拉开关、闸刀，应断开的二次回路、熔丝、继电保护等（包括填写前已拉断的，注明双重名称编号）',
        name: '',
      },
    },
    ...excuteConfig,

    {
      formType: 'rowText',
      itemProps: {
        label: '应装接地线、应合接地闸刀（注明确实地点、名称）',
        name: '',
      },
    },
    ...excuteConfig,
    {
      formType: 'rowText',
      itemProps: {
        label: '应设遮栏、应挂标示牌及防止继电保护误碰误震等措施',
        name: '',
      },
    },
    ...excuteConfig,

    {
      formType: 'TextArea',
      itemProps: {
        label: '补充说明',
        name: 'supplement',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '工作部位电系绘图说明',
        name: 'file',
      },
    },
    <UploadCom
      label={''}
      key={'logo'}
      action={'logo'}
      action={'/api/v1/upload'}
      name={'logo'}
      extra={'支持扩展名:pdf、jpg、jpeg、png'}
      formItemCls={'w50'}
    ></UploadCom>,

    {
      formType: 'rowText',
      itemProps: {
        label: '5.工作人员',
        name: 'file',
      },
    },
    {
      itemProps: {
        label: '总人数',
        name: 'person_num',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '姓名',
        name: 'person_name',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '6.无人值班变电站现场许可人与当值调度（或集控站、中心站）联系',
        name: 'wt_contact',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '7.工作人员变动',
        name: 'wt_person_changes',
      },
    },
    ...peopleChangeConfig,
    {
      formType: 'rowText',
      itemProps: {
        label: '8.工作票延期',
        name: '',
      },
    },
    {
      itemProps: {
        label: '有效期延长至',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作负责人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作许可人',
        name: '',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '9.每日开工和收工时间（使用一天的工作票不必填写）',
        name: 'wt_work_record',
      },
    },
    ...workTimeConfig,
    {
      formType: 'rowText',
      itemProps: {
        label:
          '10.工作总负责人对分票工作负责人许可、汇报记录（非工作总负责人不必填写）',
        name: '',
        className: 'w50',
      },
    },
    ...reportConfig,
    {
      formType: 'rowText',
      itemProps: {
        label: '11.工作票延期',
        name: '',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '结束时间',
        name: 'finish_time',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '12.工作票终结',
        name: '',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '13.备注',
        name: 'remarks',
      },
    },
    {
      itemProps: {
        label: '操作人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '监护人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label:
          '（1）在工作过程中需操作设备时，应核对设备铭牌严格执行监护制度！（在有人值班变电站控制屏上操 作时，应得到值班人员的同意。）',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '操作人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '监护人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '（2）由工作负责人指定专责监护人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '负责监护',
        name: '',
        className: 'w50',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '（3）其他补充安全措施',
        name: '',
        className: 'w50',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '（4）其他事项',
        name: '',
        className: 'w50',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '（5）交任务、交安全确认',
        name: '',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '14.工作票执行完毕印鉴',
        name: '',
      },
    },
    <UploadCom
      label={'工作部位电系绘图说'}
      key={'logo'}
      action={'logo'}
      action={'/api/v1/upload'}
      name={'logo'}
      extra={'支持扩展名:pdf、jpg、jpeg、png'}
      formItemCls={'w50'}
    ></UploadCom>,
    {
      itemProps: {
        label: '检查，执行符合要求/存在问题已向 ',
        name: '',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '15.工作票检查',
        name: '',
      },
    },
    {
      itemProps: {
        label: '本工作票已于',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '检查，执行符合要求/存在问题已向-指出',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '检查人员',
        name: '',
        className: 'w50',
      },
    },
  ].map(v => ({
    ...v,
    comProps: { className: 'w-200', ...v.comProps },
    className: 'w50',
  }));

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' WorkOrderTicketForm '}>
      <SmartForm
        // flexRow={2}
        // flexRow={6}
        config={config}
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
