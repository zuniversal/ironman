import React, { useEffect } from 'react';
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
  Tabs,
} from 'antd';
import SmartForm from '@/common/SmartForm'; //
import InputCom from '@/components/Widgets/InputCom'; //

const { TabPane } = Tabs;

const TabPanes = props => {
  const { tabData } = props; //
  return (
    <div className="w100">
      <Tabs defaultActiveKey="1" onChange={props.onChange}>
        {tabData.map((v, i) => (
          <TabPane tab={`电源编号-${v.power_number}`} key={i}></TabPane>
        ))}
        {/* <TabPane tab={'电源编号1'} key="1">
      </TabPane>
      <TabPane tab={'电源编号2'} key="2">
      </TabPane> */}
      </Tabs>
    </div>
  );
};

TabPanes.defaultProps = {
  tabData: [],
};

const formLayouts = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 9 }, //
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 }, //
  },
};

const subFormLayouts = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }, //
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }, //
  },
};

const weatherFormLayouts = {
  labelCol: {
    sm: { span: 18 }, //
  },
  wrapperCol: {
    sm: { span: 6 }, //
  },
};

const electricLabelFormLayouts = {
  labelCol: {
    sm: { span: 19 }, //
  },
  wrapperCol: {
    sm: { span: 5 }, //
  },
};

const electricFormLayouts = {
  // labelCol: {
  //   sm: { span: 1 }, //
  // },
  // wrapperCol: {
  //   sm: { span: 23 }, //
  // },
  labelCol: {
    sm: { span: 10 }, //
  },
  wrapperCol: {
    sm: { span: 14 }, //
  },
};

const formRef = React.createRef();

const inputBefore = (
  <Select defaultValue="正常" className="select-before" disabled>
    <Option value="正常">正常</Option>
  </Select>
);

const InspectRecordForm = props => {
  console.log(' InspectRecordForm ： ', props, props.init); //
  const { formBtn, init, ...rest } = props; //

  const { power_data } = props.init;
  const tabData = power_data;
  // const powerData =

  const counterRef = React.useRef();
  const htmlRef = React.useRef();

  const onChange = index => {
    console.log(' onChange   index,   ： ', index, power_data);
    props.init.powerData = {
      ...power_data[index],
    };
  };

  const config = [
    {
      // formType: 'plainText',
      // plainText: props.init[name],
      itemProps: {
        label: '客户名称：',
        name: ['customer', 'name'],
      },
    },
    {
      // formType: 'plainText',
      // plainText: props.init[name],
      itemProps: {
        label: '户号：',
        name: 'electricity_user',
      },
    },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '电压等级',
    //     name: '',
    //   },
    //   comProps: {
    //     disabled: true,
    //   },
    // },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '总存量',
    //     name: '',
    //   },
    //   comProps: {
    //     disabled: true,
    //   },
    // },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '电源编号',
    //     name: '',
    //   },
    //   comProps: {
    //     disabled: true,
    //   },
    // },
    {
      // formType: 'plainText',
      // plainText: props.init[name],
      itemProps: {
        label: '巡检人员：',
        name: ['team', 'member'],
      },
    },
    {
      // formType: 'plainText',
      // plainText: props.init[name],
      itemProps: {
        label: '巡检时间：',
        name: ['inspection_task', 'work_date'],
      },
    },
    {
      // formType: 'plainText',
      // plainText: props.init[name],
      itemProps: {
        label: '备注：',
        name: 'remarks',
      },
    },
    {
      formType: 'plainText',
      plainText: '',
      itemProps: {
        label: ' ',
      },
      comProps: {
        // labelCol: {
        //   sm: { span: 9 }, //
        // },
        // wrapperCol: {
        //   sm: { span: 15 }, //
        // },
      },
    },
    {
      flexRow: 4,
      itemProps: {
        label: '温度',
        name: 'temperature',
        ...weatherFormLayouts,
      },
      comProps: {
        className: 'w-100',
      },
    },
    {
      flexRow: 3,
      itemProps: {
        label: '湿度',
        name: 'humidity',
        ...weatherFormLayouts,
      },
      comProps: {
        className: 'w-100',
      },
    },
    {
      flexRow: 3,
      itemProps: {
        label: '天气',
        name: 'weather',
        ...weatherFormLayouts,
      },
      comProps: {
        className: 'w-100',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '房屋土建1',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '电缆沟及盖板',
        name: ['building', 'cable_conduit_status'],
      },
    },
    {
      itemProps: {
        label: '护网',
        name: ['building', 'frame_status'],
      },
    },
    {
      itemProps: {
        label: '地面裂縫',
        name: ['building', 'ground_status'],
      },
    },
    {
      itemProps: {
        label: '门窗',
        name: ['building', 'window_status'],
      },
    },
    {
      itemProps: {
        label: '房屋渗水',
        name: ['building', 'house_status'],
      },
    },
    {
      itemProps: {
        label: '电缆夹屋孔洞',
        name: ['building', 'cable_holes_status'],
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '安全工器具状况/上次试验日期',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '高压试电笔(1年)',
        // name: ['safety_equirpment', 'electroprobe_status'],
        name: ['safety_equirpment', 'es_check_date'],
        className: 'withBefore',
      },
      comProps: {
        addonBefore: props.init.safety_equirpment?.electroprobe_status,
        // className: 'w-130',
      },
    },
    {
      itemProps: {
        label: '接地线(4年)',
        // name: ['safety_equirpment', 'ground_wire'],
        name: ['safety_equirpment', 'gw_check_date'],
        className: 'withBefore',
      },
      comProps: {
        addonBefore: props.init.safety_equirpment?.ground_wire,
        // className: 'w-130',
      },
    },
    {
      itemProps: {
        label: '绝缘毯(4年)',
        // name: ['safety_equirpment', 'insulating_mat'],
        name: ['safety_equirpment', 'im_check_date'],
        className: 'withBefore',
      },
      comProps: {
        addonBefore: props.init.safety_equirpment?.insulating_mat,
        // className: 'w-130',
      },
    },
    {
      itemProps: {
        label: '绝缘手套(半年)',
        // name: ['safety_equirpment', 'insulating_gloves'],
        name: ['safety_equirpment', 'ig_check_date'],
        className: 'withBefore',
      },
      comProps: {
        addonBefore: props.init.safety_equirpment?.insulating_gloves,
        // className: 'w-130',
      },
    },
    {
      itemProps: {
        label: '绝缘鞋(半年)',
        // name: ['safety_equirpment', 'insulating_shoes'],
        name: ['safety_equirpment', 'is_check_date'],
        className: 'withBefore',
      },
      comProps: {
        addonBefore: props.init.safety_equirpment?.insulating_shoes,
        // className: 'w-130',
      },
    },
    {
      itemProps: {
        label: '灭火器压力(半年)',
        // name: ['safety_equirpment', 'extinguisher'],
        name: ['safety_equirpment', 'ex_check_date'],
        className: 'withBefore',
      },
      comProps: {
        addonBefore: props.init.safety_equirpment?.extinguisher,
        // className: 'w-130',
      },
    },

    {
      formType: 'CustomCom',
      CustomCom: <TabPanes onChange={onChange} tabData={power_data}></TabPanes>,
      itemProps: {
        label: '',
        className: 'w100',
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '电压等级',
        name: ['powerData', 'voltage_level'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '总容量',
        name: ['powerData', 'total_capacity'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '实际总容量',
        name: ['powerData', 'real_capacity'],
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '电表读数',
        className: 'w100',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '表号',
        name: ['powerData', 'meter_number'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '倍率',
        name: ['powerData', 'multiplying_power'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '考核功率因数',
        name: ['powerData', 'power_factor'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '总有功(02)',
        name: ['powerData', 'total_active_power'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '峰(03)',
        name: ['powerData', 'peak'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '平1 (41)',
        name: ['powerData', 'flat_1'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '平2 (42)',
        name: ['powerData', 'flat_2'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '谷(05)',
        name: ['powerData', 'valley'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '峰MD1(61)',
        name: ['powerData', 'peak_md'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '平1MD(62)',
        name: ['powerData', 'flat_1_md'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '平2MD(63)',
        name: ['powerData', 'flat_2_md'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '谷MD(64)',
        name: ['powerData', 'valley_md'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '最大MD ',
        name: ['powerData', 'max_md'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '本月申报MD',
        name: ['powerData', 'declare_md'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '无功1 (07)',
        name: ['powerData', 'reactive_power_1'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '无功2 (08)',
        name: ['powerData', 'reactive_power_2'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '实际功率因数',
        name: ['powerData', 'real_power_factor'],
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '高压进制线',
        className: 'w100',
      },
    },

    // {
    //   flexRow: 4,
    //   noRule: true,
    //   formType: 'Label',
    //   itemProps: {
    //     label: ' ',
    //     ...weatherFormLayouts,
    //   },
    //   comProps: {
    //     className: 'w-100',
    //   },
    //   LabelCom: '电压表',
    // },
    {
      flexRow: 4,
      noRule: true,
      formType: 'plainText',
      itemProps: {
        label: '电压表',
        ...electricLabelFormLayouts,
      },
      comProps: {
        className: 'w-100',
      },
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'AB',
        // name: ['powperData', 'spectIn', 'v_ab'],
        name: ['spectIn', 'v_ab'],
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-78',
      },
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'BC',
        // name: ['powperData', 'spectIn', 'v_bc'],
        name: ['spectIn', 'v_bc'],
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-78',
      },
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'CA',
        // name: ['powperData', 'spectIn', 'v_ca'],
        name: ['spectIn', 'v_ca'],
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-78',
      },
    },

    // {
    //   flexRow: 4,
    //   noRule: true,
    //   formType: 'Label',
    //   itemProps: {
    //     label: ' ',
    //   },
    //   LabelCom: '显示器',
    // },
    {
      flexRow: 4,
      noRule: true,
      formType: 'plainText',
      itemProps: {
        label: '显示器',
        ...electricLabelFormLayouts,
      },
      comProps: {
        className: 'w-78',
      },
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'A',
        // name: ['powperData', 'spectOut', 'monitor_a'],
        name: ['spectOut', 'monitor_a'],
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-78',
      },
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'B',
        // name: ['powperData', 'spectOut', 'monitor_b'],
        name: ['spectOut', 'monitor_b'],
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-78',
      },
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'C',
        // name: ['powperData', 'spectOut', 'monitor_c'],
        name: ['spectOut', 'monitor_c'],
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-78',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '热成像功能',
        className: 'w100',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: <img src={init.file} className={`hotImg`} />,
      itemProps: {
        label: '',
      },
    },
  ];

  const configs = config.map(v => ({
    ...v,
    comProps: { className: 'w-200', ...v.comProps },
  }));
  console.log(' configs  config.map v ： ', configs);

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  const doPrint = () => {
    console.log(' doPrint   ,   ： ', counterRef);
    // const newStr = counterRef.current.innerHTML;
    // document.body.innerHTML = newStr;
    // htmlRef.current = document.body.innerHTML;
    window.print();
  };

  // useEffect(() => {
  //   const {matchMedia, } = window
  //   const mediaQueryList = matchMedia('print')
  //   console.log(' InspectRecordForm  useEffect ： ', mediaQueryList, );
  //   if (matchMedia) {
  //     console.log(' InspectRecordForm matchMediamatchMedia ： ', matchMedia,  )
  //     mediaQueryList.addListener(mql => {
  //       console.log(' InspectRecordForm mql ： ', mql, mql.matches, counterRef,  )
  //       if (mql.matches) {

  //       }
  //       if (!mql.matches) {
  //         console.log(' InspectRecordForm mql 关闭 ： ', mql, mql.matches, counterRef,  )
  //         // console.log(' this.close ： ', this.close,  )
  //         // this.close()
  //         document.body.innerHTML = htmlRef.current
  //       }
  //     })
  //   }
  // }, [])

  return (
    <div className={' inspectRecordForm '} ref={counterRef}>
      {/* <Button type="primary" onClick={doPrint}>
        导出
      </Button> */}
      <SmartForm
        flexRow={2}
        config={configs}
        formProps={formProps}
        // init={init}
        // init={{}}
        init={{
          ...init,
          // spectIn: power_data[0].spect_in[0],
          // spectOut: power_data[0].spect_out[0],
        }}
        formLayouts={formLayouts}
        noRuleAll
        isDisabledAll
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

InspectRecordForm.defaultProps = {};

export default InspectRecordForm;
