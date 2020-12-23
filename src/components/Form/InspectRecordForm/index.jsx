import React, { useEffect, useState } from 'react';
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
  Divider,
} from 'antd';
import SmartForm from '@/common/SmartForm'; //
import SmartImg from '@/common/SmartImg'; //
import InputCom from '@/components/Widgets/InputCom'; //

const { TabPane } = Tabs;

const TabPanes = props => {
  const { tabData } = props; //
  return (
    <div className="w100">
      <Tabs defaultActiveKey="0" onChange={props.onChange}>
        {tabData.map((v, i) => (
          <TabPane
            tab={`${props.tabPrefix}-${v[props.tabItemKey] || '无'}`}
            key={i}
          ></TabPane>
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
  tabItemKey: '',
  tabPrefix: '',
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

  const {
    // power_data = [{}],
    file = [],
  } = props.init;
  const power_data =
    props.init.power_data && props.init.power_data.length > 0
      ? props.init.power_data
      : [{}];
  const tabData = power_data;

  const [dataInit, setDataInit] = useState({
    ...props.init,
    spectIn: power_data[0].spect_in ? power_data[0].spect_in : [],
    spectOut: power_data[0].spect_out ? power_data[0].spect_out : [],
  });
  console.log(' dataInit ： ', dataInit); //

  // const powerData =

  const counterRef = React.useRef();
  const htmlRef = React.useRef();

  const onChange = index => {
    console.log(
      ' onChange   index,   ： ',
      index,
      dataInit,
      power_data,
      power_data[index],
    );
    // props.init.powerData = {
    //   ...power_data[index],
    // };
    setDataInit({
      ...dataInit,
      powerData: power_data[index],
      spectIn: power_data[index].spect_in,
      spectOut: power_data[index].spect_out,
    });
  };

  const onOutLineChange = index => {
    console.log(
      ' onOutLineChange   index,   ： ',
      index,
      dataInit,
      power_data,
      power_data[index],
    );
    // props.init.powerData = {
    //   ...power_data[index],
    // };
    setDataInit({
      ...dataInit,
      powerData: power_data[index],
      spectIn: power_data[index].spect_in,
      spectOut: power_data[index].spect_out,
    });
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
        // name: '',
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
        addonBefore:
          props.init.safety_equirpment?.electroprobe_status || '正常',
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
        addonBefore: props.init.safety_equirpment?.ground_wire || '正常',
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
        addonBefore: props.init.safety_equirpment?.insulating_mat || '正常',
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
        addonBefore: props.init.safety_equirpment?.insulating_gloves || '正常',
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
        addonBefore: props.init.safety_equirpment?.insulating_shoes || '正常',
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
        addonBefore: props.init.safety_equirpment?.extinguisher || '正常',
        // className: 'w-130',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '高压直流电源屏',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '电池电压',
        name: '',
      },
      comProps: {
        suffix: 'V',
      },
    },
    {
      itemProps: {
        label: '控母电压',
        name: '',
      },
      comProps: {
        suffix: 'V',
      },
    },

    {
      formType: 'CustomCom',
      CustomCom: (
        <TabPanes
          tabItemKey={'power_number'}
          tabPrefix={'电源编号'}
          onChange={onChange}
          tabData={power_data}
        ></TabPanes>
      ),
      itemProps: {
        label: '',
        className: 'w100',
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '电压等级',
        // name: ['powerData', 'power_number'],
        name: ['powerData', 'voltage_level'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '总容量',
        // name: ['powerData', 'id'],
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
      formType: 'CustomCom',
      CustomCom: (
        <>
          <Divider className={`divider`} />
          <div className="titleRow">高压进侧线</div>
        </>
      ),
      itemProps: {
        label: '',
        className: 'w100',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '电压表',
        className: 'w100 voltageRowTitle',
      },
    },
    //   {
    //     noRule: true,
    //     itemProps: {
    //       label: '无功1 (07)',
    //       name: ['powerData', 'reactive_power_1'],
    //     },
    //   },
    //   {
    //     noRule: true,
    //     itemProps: {
    //       label: '无功2 (08)',
    //       name: ['powerData', 'reactive_power_2'],
    //     },
    //   },
    //   {
    //     noRule: true,
    //     itemProps: {
    //       label: '实际功率因数',
    //       name: ['powerData', 'real_power_factor'],
    //     },
    //   },

    // },
    {
      noRule: true,
      itemProps: {
        label: 'AB',
        // name: '',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'BC',
        // name: '',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'CA',
        // name: '',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '电流表',
        className: 'w100',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'A',
        // name: '',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'B',
        // name: '',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'C',
        // name: '',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '显示器',
        className: 'w100',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'A',
        // name: '',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'B',
        // name: '',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'C',
        // name: '',
      },
    },

    // 新增
    {
      formType: 'CustomCom',
      CustomCom: (
        <TabPanes
          tabItemKey={'power_number'}
          tabPrefix={'电压出线侧设备'}
          onChange={onOutLineChange}
          tabData={power_data}
        ></TabPanes>
      ),
      itemProps: {
        label: '',
        className: 'w100',
      },
    },

    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '电流表A',
        name: '',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '电流表B',
        name: '',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '电流表C',
        name: '',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },

    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '显示器A',
        name: 'monitor_a',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '显示器B',
        name: 'monitor_b',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '显示器C',
        name: 'monitor_c',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '变压器1',
        className: 'w100',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '运行声音',
        name: 'voice',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '风扇运行',
        name: 'fan',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '温度',
        name: 'temperature',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },

    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '油位及渗漏油',
        name: 'oil_leak',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '干燥剂',
        name: '',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '有无异常',
        name: 'abnormal',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '0.4KV总开关1',
        className: 'w100',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '电压表AB',
        name: '',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '电压表BC',
        name: '',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '电压表CA',
        name: '',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },

    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '电流表A',
        name: 'switch_ia',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '电流表B',
        name: 'switch_ib',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '电流表C',
        name: 'switch_ic',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '有功kWh',
        // name: '',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: 'cosΦ',
        // name: '',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '电容柜1',
        className: 'w100',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '电容柜1',
        name: 'GGJ',
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },

    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '高压进制线',
    //     className: 'w100',
    //   },
    // },

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

    // {
    //   flexRow: 4,
    //   noRule: true,
    //   formType: 'plainText',
    //   itemProps: {
    //     label: '电压表',
    //     ...electricLabelFormLayouts,
    //   },
    //   comProps: {
    //     className: 'w-100',
    //   },
    // },
    // {
    //   noRule: true,
    //   flexRow: 4,
    //   itemProps: {
    //     label: 'AB',
    //     // name: ['powperData', 'spectIn', 'v_ab'],
    //     name: ['spectIn', 'v_ab'],
    //     ...electricFormLayouts,
    //   },
    //   comProps: {
    //     className: 'w-78',
    //   },
    // },
    // {
    //   noRule: true,
    //   flexRow: 4,
    //   itemProps: {
    //     label: 'BC',
    //     // name: ['powperData', 'spectIn', 'v_bc'],
    //     name: ['spectIn', 'v_bc'],
    //     ...electricFormLayouts,
    //   },
    //   comProps: {
    //     className: 'w-78',
    //   },
    // },
    // {
    //   noRule: true,
    //   flexRow: 4,
    //   itemProps: {
    //     label: 'CA',
    //     // name: ['powperData', 'spectIn', 'v_ca'],
    //     name: ['spectIn', 'v_ca'],
    //     ...electricFormLayouts,
    //   },
    //   comProps: {
    //     className: 'w-78',
    //   },
    // },

    // {
    //   flexRow: 4,
    //   noRule: true,
    //   formType: 'Label',
    //   itemProps: {
    //     label: ' ',
    //   },
    //   LabelCom: '显示器',
    // },

    // {
    //   flexRow: 4,
    //   noRule: true,
    //   formType: 'plainText',
    //   itemProps: {
    //     label: '显示器',
    //     ...electricLabelFormLayouts,
    //   },
    //   comProps: {
    //     className: 'w-78',
    //   },
    // },
    // {
    //   noRule: true,
    //   flexRow: 4,
    //   itemProps: {
    //     label: 'A',
    //     // name: ['powperData', 'spectOut', 'monitor_a'],
    //     name: ['spectOut', 'monitor_a'],
    //     ...electricFormLayouts,
    //   },
    //   comProps: {
    //     className: 'w-78',
    //   },
    // },
    // {
    //   noRule: true,
    //   flexRow: 4,
    //   itemProps: {
    //     label: 'B',
    //     // name: ['powperData', 'spectOut', 'monitor_b'],
    //     name: ['spectOut', 'monitor_b'],
    //     ...electricFormLayouts,
    //   },
    //   comProps: {
    //     className: 'w-78',
    //   },
    // },
    // {
    //   noRule: true,
    //   flexRow: 4,
    //   itemProps: {
    //     label: 'C',
    //     // name: ['powperData', 'spectOut', 'monitor_c'],
    //     name: ['spectOut', 'monitor_c'],
    //     ...electricFormLayouts,
    //   },
    //   comProps: {
    //     className: 'w-78',
    //   },
    // },

    // {
    //   formType: 'CustomCom',
    //   CustomCom: <TabPanes onChange={onChange} tabData={power_data}></TabPanes>,
    //   itemProps: {
    //     label: '',
    //     className: 'w100',
    //   },
    // },

    <Form.List name="spectIn" key={'spectIn'}>
      {(fields, { add, remove }) => {
        console.log(' dataInit  fieldsfields ： ', dataInit.spectIn, fields); //
        const spectInConfig = [
          { name: 'v_ab', label: 'AB' },
          { name: 'v_bc', label: 'BC' },
          { name: 'v_ca', label: 'CA' },
        ];

        return (
          <>
            {fields.map(field => {
              const formItem = spectInConfig.map((v, i) => (
                <Form.Item
                  {...field}
                  label={v.label}
                  colon={false}
                  name={[field.name, v.name]}
                  fieldKey={[field.fieldKey, v.name]}
                  className={'formItems '}
                  {...electricFormLayouts}
                >
                  <Input className={'w-78'} disabled />
                </Form.Item>
              ));
              return (
                <Space key={field.key} className={'formList'}>
                  <>
                    <Form.Item
                      label={'电压表'}
                      colon={false}
                      className={'formItems labelItem'}
                      {...electricLabelFormLayouts}
                    ></Form.Item>
                    {formItem}
                  </>
                </Space>
              );
            })}
          </>
        );
      }}
    </Form.List>,
    <Form.List name="spectOut" key={'spectOut'}>
      {(fields, { add, remove }) => {
        console.log(' dataInit  fieldsfields ： ', dataInit.spectOut, fields); //
        const spectOutConfig = [
          { name: 'monitor_a', label: 'A' },
          { name: 'monitor_b', label: 'B' },
          { name: 'monitor_c', label: 'C' },
        ];

        return (
          <>
            {fields.map(field => {
              const formItem = spectOutConfig.map((v, i) => (
                <Form.Item
                  {...field}
                  label={v.label}
                  colon={false}
                  name={[field.name, v.name]}
                  fieldKey={[field.fieldKey, v.name]}
                  className={'formItems '}
                  {...electricFormLayouts}
                >
                  <Input className={'w-78'} disabled />
                </Form.Item>
              ));
              return (
                <Space key={field.key} className={'formList'}>
                  <>
                    <Form.Item
                      label={'显示器'}
                      colon={false}
                      className={'formItems labelItem'}
                      {...electricLabelFormLayouts}
                    ></Form.Item>
                    {formItem}
                  </>
                </Space>
              );
            })}
          </>
        );
      }}
    </Form.List>,

    {
      formType: 'rowText',
      itemProps: {
        label: '热成像图片',
        className: 'w100',
      },
    },
    ...(file.length > 0
      ? [
          {
            formType: 'CustomCom',
            CustomCom: (
              <div>
                {file.map((v, i) => (
                  // <img src={v} className={`hotImg`} key={i} />
                  <SmartImg src={v} key={i} />
                ))}
              </div>
            ),
            itemProps: {
              label: '',
              className: 'w100',
            },
          },
        ]
      : []),
  ];

  const configs = config.map(v => ({
    ...v,
    comProps: { className: 'w-200', ...v.comProps },
  }));
  console.log(' configs  config.map v ： ', configs);

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
        formLayouts={formLayouts}
        noRuleAll
        isDisabledAll
        {...props}
        init={{
          ...dataInit,
          // spectIn: power_data[0].spect_in[0],
          // spectOut: power_data[0].spect_out[0],
        }}
      ></SmartForm>

      {/* {formBtn} */}
    </div>
  );
};

InspectRecordForm.defaultProps = {};

export default InspectRecordForm;
