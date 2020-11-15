import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import InputCom from '@/components/Widgets/InputCom'; //
import UploadCom from '@/components/Widgets/UploadCom'; //

const layout12 = {
  labelCol: {
    sm: { span: 4 }, //
    sm: { span: 6 }, //
    sm: { span: 10 }, //
  },
  wrapperCol: {
    sm: { span: 20 }, //
    sm: { span: 18 }, //
    sm: { span: 14 }, //
  },
};

const layout15 = {
  labelCol: {
    sm: { span: 4 }, //
    sm: { span: 6 }, //
    sm: { span: 5 }, //
  },
  wrapperCol: {
    sm: { span: 20 }, //
    sm: { span: 18 }, //
    sm: { span: 19 }, //
  },
};

const formLayouts = {
  labelCol: {
    sm: { span: 8 }, //
    sm: { span: 10 }, //
  },
  wrapperCol: {
    sm: { span: 16 }, //
    sm: { span: 14 }, //
  },
};

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

const fullFormLayouts = {
  labelCol: {
    sm: { span: 0 }, //
  },
  wrapperCol: {
    sm: { span: 24 }, //
  },
};

const radioData = [
  { label: '带电工作票', value: 0, key: 'yes' },
  { label: '不带电工作票', value: 1, key: 'no' },
];

const WorkOrderTicketForm = props => {
  console.log(' WorkOrderTicketForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const peopleChangeConfig = [
    {
      itemProps: {
        label: '增添人员',
        name: 'person',
        className: 'w50',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '时间',
        name: 'time',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作负责人',
        name: 'licensor',
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
      formType: 'DatePicker',
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
  const workTimeConfig = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '收工时间',
        name: 'finish_time',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作负责人',
        name: 'finish_time',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作许可人',
        name: 'licensor',
        className: 'w50',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '开工时间',
        name: 'start_time',
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

  const transferConfig = [
    {
      itemProps: {
        label: '工作地点',
        name: 'addr',
        className: 'w50',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '开始工作',
        name: 'addr',
        className: 'w50',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '结束工作',
        name: 'addr',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作负责人',
        name: 'addr',
        className: 'w50',
      },
    },
  ];

  const config = [
    {
      formType: 'Radio',
      radioData: radioData,
      itemProps: {
        label: '类型',
        name: 'type',
      },
    },
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
        name: 'station_id',
        className: 'w50',
      },
    },
    {
      flexRow: 1,
      formType: 'rowText',
      itemProps: {
        label: '1.工作负责人',
      },
    },
    {
      itemProps: {
        label: '负责人姓名',
        name: 'person_liable',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '施工班组',
        name: 'team_id',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '2.工作内容',
        // className: 'w100',
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
        className: 'w50',
        // className: 'w100 aa',
        // ...layout12,
      },
      comProps: {
        // className: 'textAreaCls',
        autoSize: {
          minRows: 3,
        },
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '3.计划工作时间',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '自',
        name: 'plan_start_time',
        className: 'w50',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '至',
        name: 'plan_end_time',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '4.工作条件（带电或不带电，或邻近带电及保留带电设备名称）',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: ' ',
        name: 'work_conditions',
        className: 'w50',
      },
      comProps: {
        // className: 'textAreaCls',
        autoSize: {
          minRows: 3,
        },
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '5.工作中应注意事项（安全措施）',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: ' ',
        name: 'work_conditions',
        className: 'w50',
      },
      comProps: {
        // className: 'textAreaCls',
        autoSize: {
          minRows: 3,
        },
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: ' ',
      },
    },

    {
      formType: 'Select',
      itemProps: {
        label: '签发人员',
        name: 'plan_start_time',
        className: 'w50',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '签发时间',
        name: 'plan_end_time',
        className: 'w50',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '6.本工作票1至5项内容已了解无疑 。',
      },
    },
    {
      itemProps: {
        label: '工作负责人',
        name: 'person_num',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作许可人',
        name: 'person_name',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '7、工作班人员，不包含工作负责人',
      },
    },
    {
      formType: 'Select',
      itemProps: {
        label: '工作班人员',
        // name: '',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label:
          '8.补充安全措施(在现场查看后应采取的补充安全措施，并在站班会上布置)',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: ' ',
        name: 'work_conditions',
        className: 'w50',
      },
      comProps: {
        // className: 'textAreaCls',
        autoSize: {
          minRows: 3,
        },
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: ' ',
      },
    },

    {
      formType: 'DatePicker',
      itemProps: {
        label: '9、许可开始工作时间',
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
      formType: 'rowText',
      itemProps: {
        label: '10、负责人变动',
      },
    },
    {
      itemProps: {
        label: '原负责人',
        name: '',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '离去，变更为',
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
      formType: 'DatePicker',
      itemProps: {
        label: '时间',
        name: '',
        className: 'w50',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '11.工作人员变动',
        name: '',
      },
    },
    ...peopleChangeConfig,

    {
      formType: 'rowText',
      itemProps: {
        label: '12.每日开工和收工时间（使用一天的工作票不必填写）',
      },
    },
    ...workTimeConfig,

    {
      formType: 'rowText',
      itemProps: {
        label: '13.工作票延期',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <div className={`infoRow`}>
          有效期延长至<InputCom name={''}></InputCom>工作许可人
          <InputCom name={''}></InputCom>日期<InputCom name={''}></InputCom>
        </div>
      ),
      itemProps: {
        label: '',
        className: 'w50',
        ...fullFormLayouts,
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '14、工作转移',
      },
    },
    ...transferConfig,

    {
      formType: 'rowText',
      itemProps: {
        label: '15、备注',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '（1）其他事项',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: ' ',
        name: 'remarks',
        className: 'w50',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '（2）交任务、交安全确认',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label:
          '我对工作负责人布置的本施工项目安全措施已明白无误，所有安全措施已能确保我的工作安全。',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: ' ',
        name: 'remarks',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: ' ',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '16.工作票终结',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <div className={``}>
          全部工作于<InputCom name={''}></InputCom>
          结束。工作班人员已全部撤离，材料工具已清理完毕，工作票已终结，工作
          <InputCom name={''}></InputCom>
        </div>
      ),
      itemProps: {
        label: '',
        // className: 'w50',
        ...fullFormLayouts,
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '17. 工作票执行完毕印鉴',
        name: '',
      },
    },
    <UploadCom
      label={'文件'}
      key={'logo'}
      action={'logo'}
      action={'/api/v1/upload'}
      name={'logo'}
      extra={'支持扩展名:pdf、jpg、png'}
      formItemCls={'w50'}
    ></UploadCom>,

    {
      formType: 'rowText',
      itemProps: {
        label: '15.工作票检查',
        name: '',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <div className={`infoRow`}>
          本工作票已于<InputCom name={''}></InputCom>
          检查，执行符合要求/存在问题已向<InputCom name={''}></InputCom>指出
        </div>
      ),
      itemProps: {
        label: '',
        className: 'w50',
        ...fullFormLayouts,
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
    className: 'w50',
    ...v,
    comProps: { className: 'w-200', ...v.comProps },
  }));

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' workOrderTicketForm '}>
      <SmartForm
        // flexRow={2}
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        formLayouts={formLayouts}
        {...rest}
        init={{
          ...props.init,
          type: 0,
        }}
      ></SmartForm>

      {/* {formBtn} */}
    </div>
  );
};

WorkOrderTicketForm.defaultProps = {};

export default WorkOrderTicketForm;
