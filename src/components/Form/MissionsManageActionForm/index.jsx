import React, { useState } from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import {
  missionsTypeConfig,
  fullFormLayouts,
  voltageLevelConfig,
  clientTypeConfig,
} from '@/configs';
import { Tabs } from 'antd';
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';
import SmartImg from '@/common/SmartImg';

export const MissionsManageWorkOrderForm = props => {
  console.log(' MissionsManageWorkOrderForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      // formType: 'Search',
      // selectSearch: props.getClientAsync,
      // selectData: props.clientData,
      itemProps: {
        label: '客户',
        name: 'client',
      },
      comProps: {
        disabled: true, //
      },
    },
    {
      itemProps: {
        label: '名称',
        name: 'name',
      },
    },
    {
      formType: 'Search',
      selectData: missionsTypeConfig,
      itemProps: {
        label: '类型',
        name: 'type',
      },
      comProps: {
        // disabled: true,
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '分配给',
        name: 'team_id',
      },
    },
  ];

  return (
    <div className={' MissionsManageWorkOrderForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageWorkOrderForm.defaultProps = {};

export const MissionsManageContractForm = props => {
  console.log(' MissionsManageContractForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getContractAsync,
      selectData: props.contractList,
      itemProps: {
        label: '选择合同',
        name: 'contract_id',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return (
    <div className={' MissionsManageContractForm '}>
      <SmartForm config={config} size={'small'} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageContractForm.defaultProps = {};

export const MissionsManageScheduleForm = props => {
  console.log(' MissionsManageScheduleForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '选择日期',
        name: 'plan_date',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return (
    <div className={' MissionsManageScheduleForm '}>
      <SmartForm config={config} size={'small'} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageScheduleForm.defaultProps = {};

const scheduleRadios = [
  // { label: '通过', value: 'yes', key: 'yes' },
  // { label: '驳回', value: 'no', key: 'no' },
  { label: '通过', value: true, key: 'yes' },
  { label: '驳回', value: false, key: 'no' },
];

export const MissionsManageConfirmScheduleForm = props => {
  console.log(' MissionsManageConfirmScheduleForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'DatePicker',
      noRule: true,
      itemProps: {
        label: '排期日期',
        name: 'plan_date',
      },
      comProps: {
        className: 'w-280',
        disabled: true,
      },
    },
    {
      formType: 'Radio',
      radioData: scheduleRadios,
      itemProps: {
        label: '确认排期',
        className: 'w100',
        name: 'result',
      },
    },
    {
      noRule: true,
      formType: 'TextArea',
      itemProps: {
        label: '理由',
        name: 'reason',
      },
      comProps: {
        className: 'w-280',
      },
    },
  ];

  return (
    <div className={' MissionsManageConfirmScheduleForm '}>
      <SmartForm config={config} size={'small'} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageConfirmScheduleForm.defaultProps = {};

const { TabPane } = Tabs;

const TabPanes = props => {
  const { tabData, activeKey } = props; //
  return (
    <div className="w100">
      <Tabs
        defaultActiveKey="0"
        onChange={props.onChange}
        activeKey={activeKey}
      >
        {tabData.map((v, i) => (
          <TabPane tab={`工单-${i + 1}`} key={i}></TabPane>
        ))}
        {/* <TabPane tab={'工单11'} key="0"></TabPane>
        <TabPane tab={'工单2'} key="1"></TabPane>
        <TabPane tab={'工单2'} key="2"></TabPane>
        <TabPane tab={'工单2'} key="3"></TabPane> */}
      </Tabs>
    </div>
  );
};

TabPanes.defaultProps = {
  tabData: [],
};

const formLayouts15 = {
  labelCol: {
    sm: { span: 4 }, //
  },
  wrapperCol: {
    sm: { span: 20 }, //
  },
};

const formLayouts = {
  labelCol: {
    sm: { span: 8 }, //
  },
  wrapperCol: {
    sm: { span: 16 }, //
  },
};

export const MissionsManageOrderInfoForm = props => {
  console.log(' MissionsManageOrderInfoForm ： ', props); //
  const [tabIndex, setTabIndex] = useState(0);
  console.log(' tabIndex ： ', tabIndex); //

  const { extra } = props.init;
  const { task = {}, file } = props.init;
  const buildFile = file ? file : [];
  const responseFile = task.file ? task.file : [];
  const initData = props.init;
  const onChange = index => {
    console.log(' onChange   index,   ： ', index, extra.order_list);
    props.showItemAsync({
      action: 'workOrderDetailAsync',
      d_id: extra.order_list[index],
      // d_id: [0, 1, 2, 3][index],
      extra: extra,
    });
    setTabIndex(index);
    // props.init.powerData = extra[index];
  };

  const config = [
    {
      formType: 'CustomCom',
      CustomCom: (
        <TabPanes
          onChange={onChange}
          tabData={extra.order_list}
          activeKey={tabIndex}
          key={tabIndex}
        ></TabPanes>
      ),
      itemProps: {
        label: '',
        className: 'w100',
        ...fullFormLayouts,
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '标题:',
        name: 'name',
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '类型:',
        name: 'type',
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '状态:',
        name: 'status',
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    // {
    //   itemProps: {
    //     label: '巡检时间:',
    //     name: '',
    //   },
    //   comProps: {
    //     allowClear: false,
    //     className: 'detailItem w-200',
    //   },
    // },
    {
      itemProps: {
        label: '客户:',
        name: ['task', 'customer', 'name'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '设备ID:',
        name: ['task', 'equipments', 'name'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '反馈信息',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '反馈人:',
        name: ['task', 'contacts'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '反馈电话:',
        name: ['task', 'contacts_phone'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '详细内容:',
        name: ['task', 'describe'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          {/* {createArr(12).map((v, i) => (
            <WeakDetailImg key={i}></WeakDetailImg>
          ))} */}
          {responseFile.map((v, i) => (
            // <img src={v} className={`detailImg`} key={i} />
            <SmartImg src={v} key={i} />
          ))}
        </>
      ),
      itemProps: {
        label: '反馈图片:',
        name: ['task', 'file'],
        className: 'w100',
        ...formLayouts15,
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '派单信息',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '处理人:',
        name: ['team', 'team_headman'],
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '领取时间:',
        name: 'receiving_time',
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      itemProps: {
        label: '处理时间:',
        name: 'commencement_date',
      },
      comProps: {
        allowClear: false,
        className: 'detailItem w-200',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          {/* {createArr(4).map((v, i) => (
            <WeakDetailImg key={i}></WeakDetailImg>
          ))} */}
          {buildFile.map((v, i) => (
            // <img src={v} className={`detailImg`} key={i} />
            <SmartImg src={v} key={i} />
          ))}
        </>
      ),
      itemProps: {
        label: '施工图片:',
        name: 'file',
        className: 'w100',
        ...formLayouts15,
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <InspectMissionTimeline
          datas={props.init?.work_log}
        ></InspectMissionTimeline>
      ),
      itemProps: {
        label: '工单日志:',
        name: 'task_log',
        className: 'ant-col ant-col-12 ',
      },
    },
  ];
  // .map((v) => ({...v, itemProps: {...v.itemProps, colon: true,  }}));

  return (
    <div className={' missionsManageOrderInfoForm '}>
      <SmartForm
        flexRow={2}
        config={config}
        init={initData}
        // init={{}}

        noRuleAll
        isDisabledAll
        formLayouts={formLayouts}
        // {...props}
        key={props.init?.id}
      ></SmartForm>
    </div>
  );
};

MissionsManageOrderInfoForm.defaultProps = {};

export const MissionsClientForm = props => {
  console.log(' MissionsClientForm       ： ', props);

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '客户信息',
      },
    },
    {
      formType: 'plainText',
      plainText: <div className="textInput">{props.init?.name}</div>,
      itemProps: {
        label: '所属客户',
        name: 'name',
      },
    },
    {
      noRule: true,
      formType: 'CustomCom',
      CustomCom: (
        <div>
          {props.init?.contacts?.map((v, i) => (
            <div
              className="adminBox"
              key={i}
              onClick={() => props.setContacter(v)}
            >
              {v.name}-{v.tag}
            </div>
          ))}
        </div>
      ),
      itemProps: {
        label: '客户联系人',
        name: '',
      },
    },
    {
      itemProps: {
        label: '户号地址',
        name: ['electricity_user', 0, 'addr'],
      },
    },
    {
      itemProps: {
        label: '客户代表',
        // name: ['service_staff', 'nickname'],
        name: 'nickname',
      },
    },
    {
      itemProps: {
        label: '客户代表电话',
        name: ['service_staff', 'phone'],
        name: 'phone',
      },
    },
    {
      // formType: 'Search',
      // selectData: clientTypeConfig,
      itemProps: {
        label: '客户类型',
        // name: ['electricityuser', 'type'],
        // name: 'clientType',
        name: 'type',
      },
    },
    {
      itemProps: {
        label: '户号',
        // name: ['electricityuser', 'number'],
        name: 'houseNo',
        name: ['electricity_user', 0, 'number'],
      },
    },
    {
      formType: 'Search',
      selectData: voltageLevelConfig,
      itemProps: {
        label: '电压等级',
        name: ['electricity_user', 0, 'voltage_level'],
      },
    },
    // {
    //   formType: 'plainText',
    //   plainText: <div className="textInput">
    //     {props.init?.address}
    //   </div>,
    //   itemProps: {
    //     label: '详细地址',
    //     name: 'address',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '电话',
    //     name: 'phone',
    //   },
    // },
    {
      itemProps: {
        label: '变压器容量',
        name: 'trasformer_capacity',
        name: ['electricity_user', 0, 'transformer_capacity'],
      },
    },
    {
      itemProps: {
        label: '实际使用容量',
        name: 'trasformer_count',
        name: ['electricity_user', 0, 'real_capacity'],
      },
    },
    // {
    //   itemProps: {
    //     label: '变压器台数',
    //     name: 'trasformer_count',
    //   },
    // },

    // props.showFormModal({
    //   action: 'showPDF',
    //   extraData: {
    //     path: `${record.entry_date.split('-')[0]}/${
    //       record.entry_date.split('-')[1]
    //     }/${record.code}`,
    //   },
    // })

    {
      formType: 'plainText',
      plainText: (
        <div
          className="textInput "
          // onClick={() => props.showFormModal({
          //     action: "showPDF",
          //     // extraData: {path: "2020/12/D042-WDW-2020-0001"},
          //     extraData: {
          //       path: `${record.entry_date.split('-')[0]}/${
          //         record.entry_date.split('-')[1]
          //       }/${record.code}`,
          //     },
          //   })}
        >
          {/* 关联合同 */}
          {props.init?.contract?.map((v, i) => (
            <div
              className="contractItem"
              key={i}
              onClick={() =>
                props.showFormModal({
                  action: 'showPDF',
                  // extraData: {path: "2020/12/D042-WDW-2020-0001"},
                  extraData: {
                    path: `${v?.entry_date.split('-')[0]}/${
                      v?.entry_date.split('-')[1]
                    }/${v.code}`,
                  },
                })
              }
            >
              {v.code}
            </div>
          ))}
        </div>
      ),
      itemProps: {
        label: '关联合同',
        label: '客户合同列表',
        name: 'contract',
      },
    },
    {
      itemProps: {
        label: '服务班组组长',
        // name: ['team', 'team_headman'],
        name: ['team', 0, 'nickname'],
        // name: 'team_headman',
      },
    },
    {
      itemProps: {
        label: '班组组长电话',
        name: ['team', 0, 'phone'],
        // name: 'tel',
      },
    },
  ].map(v => ({
    ...v,
    comProps: { className: 'w-240', ...v.comProps },
  }));

  return (
    <div className={' missionsClientForm '}>
      <SmartForm config={config} noRuleAll isDisabledAll {...props}></SmartForm>
    </div>
  );
};

MissionsClientForm.defaultProps = {};

export const MissionsSimpleClientForm = props => {
  console.log(' MissionsSimpleClientForm       ： ', props);

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '客户信息',
      },
    },
    {
      itemProps: {
        label: '所属客户',
        name: 'name',
      },
    },
    // {
    //   formType: 'plainText',
    //   plainText: <div className="textInput">
    //     {props.init?.address}
    //   </div>,
    //   itemProps: {
    //     label: '详细地址',
    //     name: 'address',
    //   },
    // },
    {
      noRule: true,
      itemProps: {
        label: '详细地址',
        name: 'address',
      },
    },
    {
      itemProps: {
        label: '客户代表',
        name: ['service_staff', 'nickname'],
      },
    },
    {
      itemProps: {
        label: '客户代表电话',
        name: ['service_staff', 'phone'],
      },
    },
  ].map(v => ({
    ...v,
    comProps: { className: 'w-240', ...v.comProps },
  }));

  return (
    <div className={' missionsSimpleClientForm '}>
      <SmartForm config={config} {...props}></SmartForm>
    </div>
  );
};

MissionsSimpleClientForm.defaultProps = {};
