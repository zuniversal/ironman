import React from 'react';
import './style.less';
import { Form, Select } from 'antd';
import SmartForm from '@/common/SmartForm';
import SmartFormTable from '@/common/SmartFormTable';
import InputCom from '@/components/Widgets/InputCom';
import UploadCom from '@/components/Widgets/UploadCom';
import { renderSelectOp } from '@/utils';
import {
  workTicketPeopleChangeConfig,
  workTicketExcuteConfig,
} from '@/configs';

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
  const excuteConfig = [
    {
      itemProps: {
        label: '内容',
        name: 'content',
        className: 'w50',
      },
    },
    {
      formType: 'Search',
      selectData: workTicketExcuteConfig,
      itemProps: {
        label: '是否执行',
        name: 'done',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '补充内容',
        name: 'supplement_content',
        className: 'w50',
      },
    },
    {
      formType: 'Search',
      selectData: workTicketExcuteConfig,
      itemProps: {
        label: '是否执行',
        name: 'supplement_done',
        className: 'w50',
      },
    },
  ];

  const stationContractConfig = [
    {
      itemProps: {
        label: '时间',
        name: 'time',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '内容摘要',
        name: 'content',
        className: 'w50',
      },
    },

    // user
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '接受汇报人',
        name: 'contact_person',
        className: 'w50',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '现场许可人',
        name: 'licensor',
        className: 'w50',
      },
    },
  ];
  const peopleAddConfig = [
    // 新增 type：1  id
    // user
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
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
      comProps: {
        showTime: true,
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '工作负责人',
        name: 'licensor',
        className: 'w50',
      },
    },
  ];
  const peopleSubConfig = [
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '离去人员',
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
      comProps: {
        showTime: true,
      },
    },
    {
      itemProps: {
        label: '工作负责人',
        name: 'licensor',
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
      formType: 'DatePicker',
      itemProps: {
        label: '收工时间',
        name: 'finish_time',
        className: 'w50',
      },
      comProps: {
        showTime: true,
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '工作负责人',
        name: 'person_liable',
        className: 'w50',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
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
      comProps: {
        showTime: true,
      },
    },
    // {
    //   formType: 'Search',
    //   selectSearch: props.getUserAsync,
    //   selectData: props.userList,
    //   itemProps: {
    //     label: '工作负责人',
    //     name: 'person_liable2',
    //     className: 'w50',
    //   },
    // },
    // {
    //   formType: 'Search',
    //   selectSearch: props.getUserAsync,
    //   selectData: props.userList,
    //   itemProps: {
    //     label: '工作许可人',
    //     name: 'licensor2',
    //     className: 'w50',
    //   },
    // },
  ];
  const reportConfig = [
    {
      itemProps: {
        label: '分票编号',
        name: 'code',
        className: 'w50',
      },
    },
    // 组名
    {
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '班组',
        name: 'team_id',
        className: 'w50',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '分票工作负责人',
        name: 'person_liable',
        className: 'w50',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '许可工作时间',
        name: 'permit_time',
        className: 'w50',
      },
      comProps: {
        showTime: true,
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '汇报结束时间',
        name: 'finish_time',
        className: 'w50',
      },
      comProps: {
        showTime: true,
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
    // 电站
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
    // user
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '负责人姓名',
        name: 'person_liable',
        className: 'w50',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
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
    ,
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
      comProps: {
        showTime: true,
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '至',
        name: 'plan_end_time',
        className: 'w50',
      },
      comProps: {
        showTime: true,
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '4.安全措施',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label:
          '应拉开关、闸刀，应断开的二次回路、熔丝、继电保护等（包括填写前已拉断的，注明双重名称编号）',
      },
    },
    // ...excuteConfig,
    <SmartFormTable
      config={excuteConfig.map(v => ({ ...v, ...v.itemProps }))}
      name="switch"
      key={'switch'}
    />,
    {
      formType: 'rowText',
      itemProps: {
        label: '应装接地线、应合接地闸刀（注明确实地点、名称）',
      },
    },
    // ...excuteConfig,
    <SmartFormTable
      config={excuteConfig.map(v => ({ ...v, ...v.itemProps }))}
      name="ground_wire"
      key={'ground_wire'}
    />,
    {
      formType: 'rowText',
      itemProps: {
        label: '应设遮栏、应挂标示牌及防止继电保护误碰误震等措施',
      },
    },
    // ...excuteConfig,
    <SmartFormTable
      config={excuteConfig.map(v => ({ ...v, ...v.itemProps }))}
      name="warning_sign"
      key={'warning_sign'}
    />,

    {
      formType: 'TextArea',
      itemProps: {
        label: '补充说明',
        name: 'supplement',
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
        label: '工作部位电系绘图说明',
      },
    },
    // <UploadCom
    //   label={' '}
    //   key={'file'}
    //   action={'/api/v1/upload'}
    //   name={'file'}
    //   extra={'支持扩展名:pdf、jpg、jpeg、png'}
    //   formItemCls={'w50'}
    // ></UploadCom>,

    {
      formType: 'rowText',
      itemProps: {
        label: '5.工作人员',
      },
    },
    // user
    {
      formType: 'InputNumber',
      itemProps: {
        label: '总人数',
        name: 'person_num',
        className: 'w50',
      },
    },
    // 手输
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '姓名',
        name: 'person_name',
        className: 'w50',
      },
      comProps: {
        mode: 'multiple',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '6.无人值班变电站现场许可人与当值调度（或集控站、中心站）联系',
        // name: 'wt_contact',
      },
    },
    // ...stationContractConfig,
    <SmartFormTable
      config={stationContractConfig.map(v => ({ ...v, ...v.itemProps }))}
      name="wt_contact"
      key={'wt_contact'}
    />,
    {
      formType: 'rowText',
      itemProps: {
        label: '7.工作人员变动',
        // name: 'wt_person_changes',
      },
    },
    // ...peopleChangeConfig,
    <SmartFormTable
      config={peopleAddConfig.map(v => ({ ...v, ...v.itemProps }))}
      name="wt_person_changes1"
      key={'wt_person_changes1'}
    />,
    <SmartFormTable
      config={peopleSubConfig.map(v => ({ ...v, ...v.itemProps }))}
      name="wt_person_changes0"
      key={'wt_person_changes0'}
    />,
    {
      formType: 'rowText',
      itemProps: {
        label: '8.工作票延期',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '有效期延长至',
        name: 'delay',
        className: 'w50',
      },
      comProps: {
        showTime: true,
      },
    },
    // 都写 person_liable 一样值
    {
      itemProps: {
        label: '工作负责人',
        name: 'person_liableSame1',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '工作许可人',
        name: 'person_liableSame2',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '9.每日开工和收工时间（使用一天的工作票不必填写）',
        // name: 'wt_work_record',
      },
    },
    // ...workTimeConfig,
    <SmartFormTable
      config={workTimeConfig.map(v => ({ ...v, ...v.itemProps }))}
      name="wt_work_record"
      key={'wt_work_record'}
    />,
    {
      formType: 'rowText',
      itemProps: {
        label:
          '10.工作总负责人对分票工作负责人许可、汇报记录（非工作总负责人不必填写）',
        // name: '',
      },
    },
    // ...reportConfig,
    <SmartFormTable
      config={reportConfig.map(v => ({ ...v, ...v.itemProps }))}
      name="wt_child_ticket"
      key={'wt_child_ticket'}
    />,
    {
      formType: 'rowText',
      itemProps: {
        label: '11.工作结束',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '结束时间',
        name: 'finish_time',
        className: 'w50',
      },
      comProps: {
        showTime: true,
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '12.工作票终结',
      },
    },
    // the_end
    {
      formType: 'CustomCom',
      CustomCom: (
        <div className={`infoRow`}>
          接地线<InputCom name={'the_end1'}></InputCom>号共
          <InputCom name={'the_end2'}></InputCom>组
        </div>
      ),
      itemProps: {
        label: '',
        className: 'w50',
        ...fullFormLayouts,
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <div className={`infoRow`}>
          接地闸刀<InputCom name={'the_end3'}></InputCom>等共
          <InputCom name={'the_end4'}></InputCom>副
          <Form.Item
            className={'formItems selectFormItem '}
            name={'the_end5'}
            // label={}
            colon={false}
          >
            <Select
              {...{
                allowClear: true,
                // ...realComProps,
                filterOption: true,
                showSearch: true,
              }}
              className={'inputCom w-280  '}
            >
              {renderSelectOp(workTicketPeopleChangeConfig)}
            </Select>
          </Form.Item>
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
        label: '13.备注',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label:
          '在工作过程中需操作设备时，应核对设备铭牌严格执行监护制度！（在有人值班变电站控制屏上操 作时，应得到值班人员的同意。）',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '由工作负责人指定：',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '操作人',
        name: 'equipment_operate1',
        className: 'w50',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '监护人',
        name: 'equipment_operate2',
        className: 'w50',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '（2）由工作负责人指定',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '专责监护人',
        name: 'matter1',
        className: 'w50',
      },
    },
    {
      itemProps: {
        label: '负责监护',
        name: 'matter2',
        className: 'w50',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '（3）其他补充安全措施',
        name: 'safety_measure',
        className: 'w100',
        ...layout15,
      },
      comProps: {
        autoSize: {
          minRows: 3,
        },
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '（4）其他事项',
        name: 'other',
        className: 'w100',
        ...layout15,
      },
      comProps: {
        autoSize: {
          minRows: 3,
        },
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '（5）交任务、交安全确认',
        name: 'confirm',
        className: 'w100',
        ...layout15,
      },
      comProps: {
        autoSize: {
          minRows: 3,
        },
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
        label: '工作人员',

        // 不知道
        name: '不知道',
        className: 'w50',
      },
      comProps: {
        // className: 'textAreaCls',
        autoSize: {
          minRows: 3,
        },
      },
    },

    // 盖章 位置
    {
      formType: 'rowText',
      itemProps: {
        label: '14.工作票执行完毕印鉴',
      },
    },
    // <UploadCom
    //   label={'文件'}
    //   key={'logo'}
    //   action={'/api/v1/upload'}
    //   name={'logo'}
    //   extra={'支持扩展名:pdf、jpg、png'}
    //   formItemCls={'w50'}
    // ></UploadCom>,
    {
      formType: 'rowText',
      itemProps: {
        label: '15.工作票检查',
      },
    },
    // {
    //   itemProps: {
    //     label: '本工作票已于',
    //     name: '',
    //     className: 'w50',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '检查，执行符合要求/存在问题已向-指出',
    //     name: '',
    //     className: 'w50',
    //   },
    // },

    // user
    {
      formType: 'CustomCom',
      CustomCom: (
        <div className={`infoRow`}>
          本工作票已于<InputCom name={'checkTime'}></InputCom>
          检查，执行符合要求/存在问题已向
          <InputCom name={'checkPointTo'}></InputCom>
          指出
        </div>
      ),
      itemProps: {
        label: '',
        className: 'w100',
        ...fullFormLayouts,
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '检查人员',
        name: 'checkMan',
        className: 'w50',
      },
    },
  ].map(v => ({
    className: 'w50',
    ...v,
    comProps: { className: 'w-200', ...v.comProps },
  }));

  return (
    <div className={' workOrderTicketForm '}>
      <SmartForm
        config={config}
        formLayouts={formLayouts}
        {...props}
        init={{
          ...props.init,
          type: 0,
          switch: [{}],
          ground_wire: [{}],
          warning_sign: [{}],
          wt_contact: [{}],
          wt_person_changes1: [{}],
          wt_person_changes0: [{}],
          wt_work_record: [{}],
          wt_child_ticket: [{}],
        }}
      ></SmartForm>
    </div>
  );
};

WorkOrderTicketForm.defaultProps = {};

export default WorkOrderTicketForm;
