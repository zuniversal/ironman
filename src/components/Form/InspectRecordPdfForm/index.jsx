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
import SmartExportPdf from '@/common/SmartExportPdf'; //

const { TabPane } = Tabs;

const TabPanes = props => {
  const { tabData, tab } = props; //
  return (
    <div className="w100">
      <Tabs defaultActiveKey="0" onChange={props.onChange}>
        {tabData.map((v, i) => (
          <TabPane
            tab={`${props.tabPrefix}-${
              props.useIndex ? i + 1 : v[props.tabItemKey]
            }`}
            // tab={`${props.tabPrefix}-${v[props.tabItemKey] || '无'}`}
            // tab={tab}
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

const fullFormLayouts = {
  labelCol: {
    sm: { span: 0 }, //
  },
  wrapperCol: {
    sm: { span: 24 }, //
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
    // spectOut: power_data[0].spect_out ? power_data[0].spect_out : [],
    spectOut: props.init.spect_out,
  });
  console.log(' dataInit ： ', dataInit, power_data); //

  // const powerData =
  setTimeout(() => {
    console.log('  延时器 ： ');
  }, 2000);

  const counterRef = React.useRef();
  const htmlRef = React.useRef();

  const spectInVoltageConfig = [
    { name: 'v_ab', label: 'AB' },
    { name: 'v_bc', label: 'BC' },
    { name: 'v_ca', label: 'CA' },
  ];
  const spectInElectricConfig = [
    { name: 'i_ab', label: 'A' },
    { name: 'i_bc', label: 'B' },
    { name: 'i_ca', label: 'C' },
  ];
  const spectInMonitorConfig = [
    { name: 'monitor_a', label: 'A' },
    { name: 'monitor_b', label: 'B' },
    { name: 'monitor_c', label: 'C' },
  ];
  const spectInBatchConfig = [
    { label: '电压表', config: spectInVoltageConfig },
    { label: '电流表', config: spectInElectricConfig },
    { label: '显示器', config: spectInMonitorConfig },
  ];

  const spectInItem = (
    <Form.List name="spectInData" key={'spectIn'}>
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
              return spectInBatchConfig.map((item, index) => {
                // const formItem = spectInConfig.map((v, i) => (
                const formItem = item.config.map((v, i) => (
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
                  <Space key={index + field.key} className={'formList'}>
                    <>
                      <Form.Item
                        // label={'电压表'}
                        label={item.label}
                        colon={false}
                        className={'formItems labelItem'}
                        {...electricLabelFormLayouts}
                      ></Form.Item>
                      {formItem}
                    </>
                  </Space>
                );
              });
            })}
          </>
        );
      }}
    </Form.List>
  );

  const spectOutItem = (
    <Form.List name="spect_out" key={'spectIn'}>
      {(fields, { add, remove }) => {
        console.log(' dataInit  fieldsfields ： ', dataInit.spectIn, fields); //
        const spectOutConfig = [
          { label: '电流表A', name: 'switch_ia' },
          { label: '电流表B', name: 'switch_ib' },
          { label: '电流表C', name: 'switch_ic' },
          { label: '显示器A', name: 'monitor_a' },
          { label: '显示器B', name: 'monitor_b' },
          { label: '显示器C', name: 'monitor_c' },
          { label: '运行声音', name: 'voice' },
          { label: '风扇运行', name: 'fan' },
          { label: '温度', name: 'temperature' },
          { label: '油位及渗漏油', name: 'oil_leak' },
          { label: '干燥剂', name: 'dry' },
          { label: '有无异常', name: 'abnormal' },
          { label: '电压表AB', name: 'switch_v_ab' },
          { label: '电压表BC', name: 'switch_v_bc' },
          { label: '电压表CA', name: 'switch_v_ca' },
          { label: '电流表A', name: 'o_ia' },
          { label: '电流表B', name: 'o_ib' },
          { label: '电流表C', name: 'o_ic' },
          { label: '电流表C', name: 'o_ic' },
          { label: '电容柜1', name: 'GGJ' },
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
                <Space key={index + field.key} className={'formList'}>
                  <>
                    <Form.Item
                      // label={'电压表'}
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
    </Form.List>
  );

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
      // spectOut: power_data[index].spect_out,
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
      // spectOut: power_data[index].spect_out,
      // spectOut: dataInit.spect_out[index],
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
        // name: ['inspection_task', 'work_date'],
        name: 'workDate',
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
        name: 'battery_voltage',
      },
      comProps: {
        suffix: 'V',
      },
    },
    {
      itemProps: {
        label: '控母电压',
        name: 'direct_voltage',
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

    // {
    //   formType: 'CustomCom',
    //   CustomCom: (
    //     <TabPanes
    //       useIndex
    //       tabPrefix={'高压进侧线'}
    //       onChange={onOutLineChange}
    //       tabData={dataInit.spectIn}
    //     ></TabPanes>
    //   ),
    //   itemProps: {
    //     label: '',
    //     className: 'w100',
    //     ...fullFormLayouts,
    //   },
    // },
    spectInItem,

    spectOutItem,

    // // 新增
    // {
    //   formType: 'CustomCom',
    //   CustomCom: (
    //     <TabPanes
    //       useIndex
    //       // tabItemKey={'power_number'}
    //       tabPrefix={'电压出线侧设备'}
    //       onChange={onOutLineChange}
    //       tabData={dataInit.spectOut}
    //     ></TabPanes>
    //   ),
    //   itemProps: {
    //     label: '',
    //     className: 'w100',
    //     ...fullFormLayouts,
    //   },
    // },

    {
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '电流表A',
        name: ['spectOut', 'switch_ia'],
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
        name: ['spectOut', 'switch_ib'],
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
        name: ['spectOut', 'switch_ic'],
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
        name: ['spectOut', 'monitor_a'],
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
        name: ['spectOut', 'monitor_b'],
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
        name: ['spectOut', 'monitor_c'],
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
        name: ['spectOut', 'voice'],
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
        name: ['spectOut', 'fan'],
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
        name: ['spectOut', 'temperature'],
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
        name: ['spectOut', 'oil_leak'],
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
        name: ['spectOut', 'dry'],
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
        name: ['spectOut', 'abnormal'],
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
        name: ['spectOut', 'switch_v_ab'],
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
        name: ['spectOut', 'switch_v_bc'],
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
        name: ['spectOut', 'switch_v_ca'],
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
        name: ['spectOut', 'o_ia'],
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
        name: ['spectOut', 'o_ib'],
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
        name: ['spectOut', 'o_ic'],
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
        name: 'power',
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
        name: 'cos',
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
        name: ['spectOut', 'GGJ'],
        ...electricFormLayouts,
      },
      comProps: {
        className: 'w-96',
      },
    },

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

  return (
    <div className={' inspectRecordForm '} ref={counterRef}>
      {/* <SmartExportPdf></SmartExportPdf> */}
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
        className={'inspectRecordForm'}
      ></SmartForm>
    </div>
  );
};

InspectRecordForm.defaultProps = {};

export default InspectRecordForm;
