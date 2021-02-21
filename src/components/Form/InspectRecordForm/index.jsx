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
  DatePicker,
} from 'antd';
import SmartForm from '@/common/SmartForm'; //
import SmartImg from '@/common/SmartImg'; //
import InputCom from '@/components/Widgets/InputCom'; //
// import SmartExportPdf from '@/common/SmartExportPdf'; //
import useExportPdf from '@/hooks/useExportPdf'; //
import { isDev } from '@/constants';
import {
  voltageLevelConfig,
  normalConfig,
  inspectRecordDateConfig,
} from '@/configs';

const { TabPane } = Tabs;

const TabPanes = props => {
  const { tabData, tab, index = 'index' } = props; //
  console.log(
    ' %c tabData 组件 this.state, this.props ： ',
    `color: #333; font-weight: bold`,
    props,
  ); //
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
  // onChange: () => {},
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

const StatusSelect = props => {
  const { selectData = normalConfig, comProps = {} } = props; //
  return (
    <Form.Item name={props.name} noStyle>
      <Select className="select-before" {...comProps}>
        {selectData.map(v => (
          <Option value={v.value} key={v.value} title={v.label} {...v}>
            {v.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

const formRef = React.createRef();

const inputBefore = (
  <Select defaultValue="正常" className="select-before" disabled>
    <Option value="正常">正常</Option>
  </Select>
);

const createFormList = props => {
  const { config = [], name } = props; //
  console.log(' createFormList   config,   ： ', props, config);
  const spectOutItem = (
    // <Form.List name={name} key={props.name + props.key}>
    <Form.List name={name} key={props.listKey || props.name}>
      {(fields, { add, remove }) => {
        console.log(
          ' inspectRecordform  dataInit  fieldsfields ： ',
          props,
          props.dataInit,
          props.dataInit?.spectOut,
          fields,
        ); //

        return (
          <>
            {fields.map((field, index) => {
              const formItem = config.map((v, i) => {
                const layouts =
                  v.type !== 'rowText'
                    ? v.layouts
                      ? v.layouts
                      : electricFormLayouts
                    : {};

                const formCom = (
                  <Form.Item
                    {...field}
                    key={`${index}-${i}`}
                    label={v.label}
                    colon={false}
                    name={[field.name, v.name]}
                    fieldKey={[field.fieldKey, v.name]}
                    className={`formItems listFormItem  ${
                      v.type !== 'rowText' ? 'ant-col ant-col-8' : ''
                    }`}
                    {...layouts}
                  >
                    <Input className={'w-78'} disabled={props.disabled} />
                  </Form.Item>
                );

                const rowTitleCom = (
                  <div
                    className={`w100  ${v.label ? 'formItems' : ''} ${
                      v.rowTitle ? 'rowTitle' : 'rowItem'
                    }`}
                    key={`${index}-${i}`}
                  >
                    {v.label ? v.label + (index + 1) : ''}
                  </div>
                );

                // return v.type !== 'rowText' && v.type !== 'rowTitle' && v.type !== 'rowDivider' ? (
                //   formCom
                // ) : (
                //   rowTitleCom
                // )
                const formComMap = {
                  rowText: rowTitleCom,
                  rowTitle: rowTitleCom,
                  // rowDivider: <Divider>{[v.titleKey]}</Divider>,
                  // rowDivider: <Divider className={'rowDivider'} key={`${index}-${i}`}>{v.label}</Divider>,
                  rowDivider: (
                    <Divider
                      className={'rowDivider'}
                      key={`${props?.dataInit?.spect_out[index]?.outlineName}-${i}`}
                    >
                      {props?.dataInit?.spect_out[index]?.outlineName}
                    </Divider>
                  ),
                  // rowDivider: <Divider className={'rowDivider'} key={`${index}-${i}`}>{props.rowCom}</Divider>,
                  // rowDivider: v.rowCom,
                };
                const matchItem = formComMap[v.type];
                return matchItem ?? formCom;
                // return v.type !== 'rowText' && !v.rowTitle && !v.rowDivider ? (
                //   formCom
                // ) : (
                //   rowTitleCom
                // )
              });
              return formItem;
            })}
          </>
        );
      }}
    </Form.List>
  );
  return spectOutItem;
};

const mergeData = params => {
  const { dataInit, formValues, tabIndex } = params;
  console.log(' mergeData   ,   ： ', params, dataInit, formValues);
  const setData = {
    ...dataInit,
    ...formValues,
    safety_equirpment: {
      ...dataInit.safety_equirpment,
      ...formValues.safety_equirpment,
    },
    building: {
      ...dataInit.building,
      ...formValues.building,
    },
    customer: {
      ...dataInit.customer,
      ...formValues.customer,
    },
    power_data: dataInit.power_data.map((item, idx) => {
      console.log(' item ： ', item, formValues); //
      const matchItem = idx == tabIndex;
      return {
        ...item,
        ...(matchItem ? formValues?.powerData : {}),
        spect_in: matchItem
          ? item.spect_in?.map((v, i) => ({
              ...v,
              ...(formValues.spectIn ? formValues.spectIn[i] : {}),
            }))
          : item.spect_in,
        spect_out: matchItem
          ? item.spect_out?.map((v, i) => ({
              ...v,
              ...(formValues.spectOut ? formValues.spectOut[i] : {}),
            }))
          : item.spect_out,
      };
    }),
  };
  console.log(' setData ： ', setData); //
  return setData;
};

const handleMaxChange = payload => {
  console.log(' handleMaxChange   payload,   ： ', payload);
  const { aimFor, keys, index, formVal, form, value } = payload;
  const { powerData } = formVal;
  console.log(' powerData ： ', powerData); //
  const maxMDKeys = ['peak_md', 'flat_1_md', 'flat_2_md', 'valley_md'];
  const maxMDArr = maxMDKeys.map(v => powerData[v]).filter(v => v);
  const maxMDVal = Math.max(...maxMDArr);
  const maxMD = maxMDVal * powerData.multiplying_power;
  form.setFieldsValue({
    powerData: {
      ...powerData,
      max_md: maxMD,
      [keys]: value,
    },
  });
};

const InspectRecordForm = props => {
  const { formBtn, init, isExportPDF, formData, ...rest } = props; //
  // const [isEdit, setIsEdit] = useState(false);
  // const {isEdit,  } = props//
  // const isEdit = isDev ? true : props.isEdit;
  const isEdit = props.isEdit;

  // const [ modalExport, setModalExport ] = useState(true)
  const [modalExport, setModalExport] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  console.log(' InspectRecordForm ： ', props, props.init, isEdit, modalExport); //

  // const isExport = isExportPDF || !modalExport
  const isExport = isExportPDF || modalExport;

  const {
    // power_data = [{}],
    // file = [],
    spect_out = [],
  } = props.init;

  const file = props.init.file ? props.init.file : []; //

  const power_data =
    props.init.power_data && props.init.power_data.length > 0
      ? props.init.power_data
      : [{}];
  const tabData = power_data;

  const [dataInit, setDataInit] = useState({
    ...props.init,
    spectIn:
      power_data[0] && power_data[0].spect_in ? power_data[0]?.spect_in : [],
    // spectOut: power_data[0].spect_out ? power_data[0].spect_out : [],
    // spectOut: [props.init.spect_out[0]],
    // spectOut: spect_out.length > 0 ? [spect_out[0]] : [],
    // spectOut: spect_out.length > 0 ? spect_out[0] : {},
    // spectOut: props.init?.spect_out[0],
    // spectOut: spect_out.length > 0 ? spect_out[0] : {},
    spectOut:
      power_data[0] && power_data[0].spect_out ? power_data[0]?.spect_out : [],
    index: 0,
  });
  console.log(
    ' inspectRecordform dataInit ： ',
    file,
    props.propsForm.getFieldsValue(),
    dataInit,
    power_data,
  ); //

  const onChange = index => {
    const formValues = props.propsForm.getFieldsValue();
    console.log(
      ' onChange   index,   ： ',
      tabIndex,
      index,
      dataInit,
      power_data,
      power_data[index],
      formValues,
    );
    // props.init.powerData = {
    //   ...power_data[index],
    // };
    // setDataInit({
    //   index,
    //   ...dataInit,
    //   powerData: power_data[index],
    //   spectIn: power_data[index].spect_in,
    //   spectOut: power_data[index].spect_out,
    // });

    const setData = mergeData({ dataInit, formValues, tabIndex });
    console.log('  setData ：', setData); //

    props.propsForm.setFieldsValue({
      spectIn: [],
      spectOut: [],
    });
    const setFields = {
      // ...dataInit,
      index,
      powerData: dataInit.power_data[index],
      spectIn: [...dataInit.power_data[index].spect_in],
      spectOut: [...dataInit.power_data[index].spect_out],
      // spectOut: index == 0 ? [] : [
      //   ...dataInit.power_data[index].spect_out,
      // ],
      // spectOut: [],
    };
    console.log(
      ' inspectRecordform setFields ：',
      props.propsForm.getFieldsValue(),
      setFields,
      setData,
      setFields.index,
      dataInit,
      setFields.spectOut,
    ); //
    // setDataInit(setFields);
    props.propsForm.setFieldsValue({
      ...setFields,
    });
    setDataInit(setData);
    setTabIndex(index);
  };

  const onInLineChange = index => {
    console.log(
      ' onInLineChange   index,   ： ',
      index,
      dataInit,
      power_data,
      power_data[index],
    );
    setDataInit({
      ...dataInit,
      spectIn: [...powerData.spect_in, ...powerData.spect_in],
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
      // spectOut: [dataInit.spect_out[index]],
      // spectOut: dataInit.spect_out[index],
      spectOut: powerData.spect_out,
    });
  };

  // const counterRef = React.useRef();
  // const htmlRef = React.useRef();

  const spectInVoltageConfig = [
    { name: 'v_ab', label: 'AB' },
    // { label: '电流表A', name: 'id' },
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

  // const spectInDetail = <Form.List name="spectInData" key={'spectIn'}>
  const spectInDetail = (
    <Form.List name={'spectIn'} key={'spectIn'}>
      {(fields, { add, remove }) => {
        console.log(
          ' dataInit  fieldsfields ： ',
          dataInit,
          dataInit.spectIn,
          fields,
          props.propsForm.getFieldsValue(),
        ); //
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
                    <Input className={'w-78'} disabled={!isEdit} />
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

  const spectInConfig = [
    { label: '高压进侧线', name: '', type: 'rowDivider' },
    { label: '高压进侧线', name: '', type: 'rowText' },
    { label: '电压表', name: '', type: 'rowText' },
    ...spectInVoltageConfig,
    { label: '电流表', name: '', type: 'rowText' },
    ...spectInElectricConfig,
    { label: '显示器', name: '', type: 'rowText' },
    ...spectInMonitorConfig,
    { label: '', name: '', type: 'rowText' },
  ];
  const spectInItem = createFormList({
    disabled: !isEdit,
    config: spectInConfig,
    name: 'spectInData',
    name: 'spectIn',
    // name: ['power_data', 'spect_in',],
    key: dataInit?.powerData?.id,
  });

  // const rowCom = (
  //   <Divider className={'rowDivider'}>
  //     {dataInit?.spectOut[tabIndex]?.outlineName}
  //   </Divider>
  // );
  // const rowCom = <Divider className={'rowDivider'} >{'2222'}</Divider>

  const spectOutConfig = [
    // { label: '高压出线侧', name: '', type: 'rowDivider' },
    // { label: '高压进侧线', name: ['outline', 'name'], type: 'rowTitle' },
    // { label: '', name: ['outline', 'name'], layouts: fullFormLayouts, },

    {
      label: '',
      name: '',
      layouts: fullFormLayouts,
      type: 'rowDivider',
      // rowCom,
    },
    { label: '高压出线侧', name: '', type: 'rowText' },
    { label: '电流表A', name: 'o_ia' },
    // { label: '电流表A', name: ['outline', 'id'] },
    { label: '电流表B', name: 'o_ib' },
    { label: '电流表C', name: 'o_ic' },
    { label: '显示器A', name: 'monitor_a' },
    { label: '显示器B', name: 'monitor_b' },
    { label: '显示器C', name: 'monitor_c' },
    { label: '变压器', name: '', type: 'rowText' },
    { label: '运行声音', name: 'voice' },
    { label: '风扇运行', name: 'fan' },
    { label: '温度', name: 'temperature' },
    { label: '油位及渗漏油', name: 'oil_leak' },
    { label: '干燥剂', name: 'dry' },
    { label: '有无异常', name: 'abnormal' },
    { label: 'A相温度', name: 'temperature_a' },
    { label: 'B相温度', name: 'temperature_b' },
    { label: 'C相温度', name: 'temperature_c' },
    { label: '0.4KV总开关', name: '', type: 'rowText' },
    { label: '电压表AB', name: 'switch_v_ab' },
    { label: '电压表BC', name: 'switch_v_bc' },
    { label: '电压表CA', name: 'switch_v_ca' },
    { label: '电流表A', name: 'switch_ia' },
    { label: '电流表B', name: 'switch_ib' },
    { label: '电流表C', name: 'switch_ic' },
    { label: '有功kWh', name: 'power' },
    { label: 'cosΦ', name: 'cos' },
    { label: '电容柜', name: '', type: 'rowText' },
    { label: '电容柜', name: 'GGJ' },
    { label: '', name: '', type: 'rowText' },
  ];
  const spectOutItem = createFormList({
    disabled: !isEdit,
    config: spectOutConfig,
    // name: 'spect_out',
    name: 'spectOut',
    key: dataInit?.powerData?.id,
    // listKey: dataInit?.index,
    listKey: tabIndex,
    // name: ['powerData', 'spectOut',],
    dataInit: dataInit?.power_data[tabIndex],
  });

  const powerDataConfig = [
    { label: '电源编号', name: '', type: 'rowDivider' },
    { label: '电源编号', name: '', type: 'rowTitle' },
    { label: '电压等级', name: 'voltage_level' },
    { label: '总容量', name: 'total_capacity' },
    { label: '实际总容量', name: 'real_capacity' },
    { label: '电表读数', name: '', type: 'rowText' },
    { label: '表号', name: 'meter_number' },
    { label: '倍率', name: 'multiplying_power' },
    // { label: '考核功率因数', name: 'power_factor' },
    // { label: '总有功(02)', name: 'total_active_power' },
    // { label: '峰(03)', name: 'peak' },
    // { label: '平1 (41)', name: 'flat_1' },
    // { label: '平2 (42)', name: 'flat_2' },
    // { label: '谷(05)', name: 'valley' },
    // { label: '峰MD1(61)', name: 'peak_md' },
    // { label: '平1MD(62)', name: 'flat_1_md' },
    // { label: '平2MD(63)', name: 'flat_2_md' },
    // { label: '谷MD(64)', name: 'valley_md' },
    // { label: '最大MD', name: 'max_md' },
    // { label: '本月申报MD', name: 'declare_md' },
    // { label: '无功1(07)', name: 'reactive_power_1' },
    // { label: '无功(08)', name: 'reactive_power_2' },
    // { label: '实际功率因素', name: 'real_power_factor' },
    { label: '', name: '', type: 'rowText' },
  ];

  const powerDataItem = createFormList({
    disabled: !isEdit,
    config: powerDataConfig,
    name: 'power_data',
  });

  const onMaxMdChange = (e, keys) => {
    console.log(
      ' onChange ： ',
      e,
      keys,
      e.target,
      e.target.value,
      props,
      dataInit,
    ); //
    // props.propsForm.setFieldsValue({
    //   // max_md: maxMD,
    //   max_md: 'maxMD',
    // })
    // setDataInit({
    //   // powerData: power_data[index],
    //   // ...dataInit,
    //   powerData: {},
    //   spectIn: [],
    //   spectOut: {
    //     switch_ia: "11111110"
    //   },
    //   electricity_user: '',
    // })

    // const value = e.target.value
    // const formVal = props.propsForm.getFieldsValue()

    // return
    // props.onMaxChange({
    handleMaxChange({
      keys,
      aimFor: 'maxMd',
      value: e.target.value,
      formVal: props.propsForm.getFieldsValue(),
      index: dataInit.index,
      form: props.propsForm,
      setDataInit,
    }); //
  };

  const powerDataDetail = [
    {
      formType: 'CustomCom',
      CustomCom: (
        <TabPanes
          tabItemKey={'power_number'}
          tabPrefix={'电源编号'}
          onChange={onChange}
          tabData={power_data}
          // index={dataInit?.index}
          // index={tabIndex}
          // key={tabIndex}
        ></TabPanes>
      ),
      itemProps: {
        label: '',
        className: 'w100',
      },
    },

    {
      noRule: true,
      formType: 'Search',
      selectData: voltageLevelConfig,
      itemProps: {
        label: '电压等级',
        // name: ['powerData', 'power_number'],
        name: ['powerData', 'voltage_level'],
        // name: ['powerData', 'id'],
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
      comProps: {
        onChange: e => onMaxMdChange(e, 'peak_md'),
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '平1MD(62)',
        name: ['powerData', 'flat_1_md'],
      },
      comProps: {
        onChange: e => onMaxMdChange(e, 'flat_1_md'),
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '平2MD(63)',
        name: ['powerData', 'flat_2_md'],
      },
      comProps: {
        onChange: e => onMaxMdChange(e, 'flat_2_md'),
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '谷MD(64)',
        name: ['powerData', 'valley_md'],
      },
      comProps: {
        onChange: e => onMaxMdChange(e, 'valley_md'),
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '最大MD',
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
        label: '无功1(07)',
        name: ['powerData', 'reactive_power_2'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '无功(08)',
        name: ['powerData', 'reactive_power_1'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '实际功率因素',
        name: ['powerData', 'real_power_factor'],
      },
    },
  ];

  const spectOutItem2 = (
    <Form.List name="spect_out" key={'spect_out'}>
      {(fields, { add, remove }) => {
        return (
          <>
            {fields.map((field, index) => {
              const formItem = spectOutConfig.map((v, i) =>
                v.type !== 'rowText' ? (
                  <Form.Item
                    {...field}
                    key={index + i}
                    label={v.label}
                    colon={false}
                    name={[field.name, v.name]}
                    fieldKey={[field.fieldKey, v.name]}
                    className={`formItems listFormItem  ${
                      v.type !== 'rowText' ? 'ant-col ant-col-8' : ''
                    }`}
                    {...(v.type !== 'rowText' ? electricFormLayouts : {})}
                  >
                    <Input className={'w-78'} disabled />
                  </Form.Item>
                ) : (
                  <div className="w100 formItems rowItem">{v.label}</div>
                ),
              );
              return formItem;
              return (
                <Space
                  key={field.key}
                  className={'formList'}
                  {...electricFormLayouts}
                >
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

  const spectOutDetail = [
    {
      formType: 'CustomCom',
      CustomCom: (
        <TabPanes
          useIndex
          // tabItemKey={'power_number'}
          tabPrefix={'电压出线侧设备'}
          // onChange={onOutLineChange}
          tabData={dataInit.spect_out}
        ></TabPanes>
      ),
      itemProps: {
        label: '',
        className: 'w100',
        ...fullFormLayouts,
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
        label: 'A相温度',
        name: ['spectOut', 'temperature_a'],
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
        label: 'B相温度',
        name: ['spectOut', 'temperature_b'],
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
        label: 'C相温度',
        name: ['spectOut', 'temperature_c'],
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
  ];

  const topConfig = [
    // {
    //   // formType: 'plainText',
    //   // plainText: props.init[name],
    //   // formType: 'TextArea',
    //   itemProps: {
    //     label: '客户名称：',
    //     name: ['customer', 'name'],
    //   },
    // },
    // {
    //   formType: 'CustomCom',
    //   CustomCom: (
    //     // <div className={'w-200 ant-col ant-col-12 '}>
    //     <div className={''}>
    //       {props.init.customer.name}
    //     </div>
    //   ),
    //   itemProps: {
    //     label: '客户名称：',
    //     name: ['customer', 'name'],
    //     className: 'ant-col ant-col-12 clientName',
    //   },
    // },
    {
      formType: 'plainText',
      plainText: props.init?.customer?.name,
      itemProps: {
        label: '客户名称：',
        name: ['customer', 'name'],
      },
      comProps: {
        // className: 'clientName',
      },
    },
    {
      formType: 'plainText',
      plainText: props.init.electricity_user,
      itemProps: {
        label: '户号：',
        name: 'electricity_user',
      },
    },
    {
      // formType: 'plainText',
      // plainText: props.init?.team?.member,
      itemProps: {
        label: '巡检人员：',
        name: ['team', 'member'],
        name: 'inspector',
      },
    },
    {
      formType: 'plainText',
      plainText: props.init.workDate,
      itemProps: {
        label: '巡检时间：',
        // name: ['inspection_task', 'work_date'],
        name: 'workDate',
      },
    },
    {
      formType: 'plainText',
      plainText: props.init.remarks,
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
      formType: 'DatePicker',
      formType: 'CustomCom',
      itemProps: {
        label: '高压试电笔(1年)',
        // name: ['safety_equirpment', 'electroprobe_status'],
        // name: ['safety_equirpment', 'es_check_date'],
        className: 'withBefore',
      },
      comProps: {
        // addonBefore: props.init.safety_equirpment?.electroprobe_status || '正常',
        // addonBefore: <StatusSelect name={['safety_equirpment', 'electroprobe_status']}></StatusSelect>,
        className: 'w-130',
      },
      withFlex: true,
      CustomCom: (
        <div>
          <StatusSelect
            name={['safety_equirpment', 'electroprobe_status']}
            comProps={{ disabled: !isEdit }}
          ></StatusSelect>
          <Form.Item name={['safety_equirpment', 'es_check_date']} noStyle>
            <DatePicker disabled={!isEdit} />
          </Form.Item>
        </div>
      ),
    },
    {
      formType: 'DatePicker',
      formType: 'CustomCom',
      itemProps: {
        label: '接地线(4年)',
        // name: ['safety_equirpment', 'ground_wire'],
        // name: ['safety_equirpment', 'gw_check_date'],
        className: 'withBefore',
      },
      comProps: {
        // addonBefore: props.init.safety_equirpment?.ground_wire || '正常',
        // addonBefore: <StatusSelect name={['safety_equirpment', 'ground_wire']}></StatusSelect>,
        className: 'w-130',
      },
      withFlex: true,
      CustomCom: (
        <div>
          <StatusSelect
            name={['safety_equirpment', 'ground_wire']}
            comProps={{ disabled: !isEdit }}
          ></StatusSelect>
          <Form.Item name={['safety_equirpment', 'gw_check_date']} noStyle>
            <DatePicker disabled={!isEdit} />
          </Form.Item>
        </div>
      ),
    },
    {
      formType: 'DatePicker',
      formType: 'CustomCom',
      itemProps: {
        label: '绝缘毯(4年)',
        // name: ['safety_equirpment', 'insulating_mat'],
        // name: ['safety_equirpment', 'im_check_date'],
        className: 'withBefore',
      },
      comProps: {
        // addonBefore: props.init.safety_equirpment?.insulating_mat || '正常',
        // addonBefore: <StatusSelect name={['safety_equirpment', 'insulating_mat']}></StatusSelect>,
        className: 'w-130',
      },
      withFlex: true,
      CustomCom: (
        <div>
          <StatusSelect
            name={['safety_equirpment', 'insulating_mat']}
            comProps={{ disabled: !isEdit }}
          ></StatusSelect>
          <Form.Item name={['safety_equirpment', 'im_check_date']} noStyle>
            <DatePicker disabled={!isEdit} />
          </Form.Item>
        </div>
      ),
    },
    {
      formType: 'DatePicker',
      formType: 'CustomCom',
      itemProps: {
        label: '绝缘手套(半年)',
        // name: ['safety_equirpment', 'insulating_gloves'],
        // name: ['safety_equirpment', 'ig_check_date'],
        className: 'withBefore',
      },
      comProps: {
        // addonBefore: props.init.safety_equirpment?.insulating_gloves || '正常',
        // addonBefore: <StatusSelect name={['safety_equirpment', 'insulating_gloves']}></StatusSelect>,
        className: 'w-130',
      },
      withFlex: true,
      CustomCom: (
        <div>
          <StatusSelect
            name={['safety_equirpment', 'insulating_gloves']}
            comProps={{ disabled: !isEdit }}
          ></StatusSelect>
          <Form.Item name={['safety_equirpment', 'ig_check_date']} noStyle>
            <DatePicker disabled={!isEdit} />
          </Form.Item>
        </div>
      ),
    },
    {
      formType: 'DatePicker',
      formType: 'CustomCom',
      itemProps: {
        label: '绝缘鞋(半年)',
        // name: ['safety_equirpment', 'insulating_shoes'],
        // name: ['safety_equirpment', 'is_check_date'],
        className: 'withBefore',
      },
      comProps: {
        // addonBefore: props.init.safety_equirpment?.insulating_shoes || '正常',
        // addonBefore: <StatusSelect name={['safety_equirpment', 'insulating_shoes']}></StatusSelect>,
        className: 'w-130',
      },
      withFlex: true,
      CustomCom: (
        <div>
          <StatusSelect
            name={['safety_equirpment', 'insulating_shoes']}
            comProps={{ disabled: !isEdit }}
          ></StatusSelect>
          <Form.Item name={['safety_equirpment', 'is_check_date']} noStyle>
            <DatePicker disabled={!isEdit} />
          </Form.Item>
        </div>
      ),
    },
    {
      formType: 'DatePicker',
      formType: 'CustomCom',
      itemProps: {
        label: '灭火器压力(半年)',
        // name: ['safety_equirpment', 'extinguisher'],
        // name: ['safety_equirpment', 'ex_check_date'],
        className: 'withBefore',
      },
      comProps: {
        // addonBefore: props.init.safety_equirpment?.extinguisher || '正常',
        // addonBefore: <StatusSelect name={['safety_equirpment', 'extinguisher']}></StatusSelect>,
        className: 'w-130',
      },
      withFlex: true,
      CustomCom: (
        <div>
          <StatusSelect
            name={['safety_equirpment', 'extinguisher']}
            comProps={{ disabled: !isEdit }}
          ></StatusSelect>
          <Form.Item name={['safety_equirpment', 'ex_check_date']} noStyle>
            <DatePicker disabled={!isEdit} />
          </Form.Item>
        </div>
      ),
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
  ];

  const config = [
    // ...(isDev ? [] : topConfig),
    ...topConfig,

    ...(isExport ? [powerDataItem] : powerDataDetail),

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
    // ...(isExport
    //   ? [spectInItem]
    //   : [
    //       {
    //         formType: 'CustomCom',
    //         CustomCom: (
    //           <TabPanes
    //             useIndex
    //             tabPrefix={'高压进侧线'}
    //             onChange={onInLineChange}
    //             tabData={dataInit.spectIn}
    //           ></TabPanes>
    //         ),
    //         itemProps: {
    //           label: '',
    //           className: 'w100',
    //           ...fullFormLayouts,
    //         },
    //       },
    //       spectInDetail,
    //     ]),
    // ...(isExport ? [spectOutItem] : spectOutDetail),
    // ...(isExport ? [spectOutItem] : [spectOutItem]),

    // // 新增

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
  console.log(' configs  config.map v ： ', dataInit, configs);

  const formTitle = props.init?.inspection_task?.name;

  const actionBtn = (
    <div className="btnWrapper fje ">
      {/* <Button type="primary" onClick={() => setIsEdit(!isEdit)}> */}
      {/* {false && */}
      {isEdit ? (
        <Button
          type="primary"
          onClick={() => {
            const formValues = props.propsForm.getFieldsValue();
            console.log(' confirmBtn ： ', props, formValues); //
            const { safety_equirpment } = formValues;
            const safetyEquirpment = {
              ...safety_equirpment,
            };
            inspectRecordDateConfig.forEach((v, i) => {
              console.log(' inspectRecordDateConfig v ： ', v, i);
              safetyEquirpment[v] = safety_equirpment[v].format('YYYY-MM-DD');
            });
            const setData = mergeData({ dataInit, formValues, tabIndex });
            const {
              spectIn,
              spectOut,
              spectInData,
              powerData,
              ...rest
            } = setData;
            props.editItemAsync({
              action: 'edit',
              ...rest,
              safety_equirpment: safetyEquirpment,
            });
          }}
        >
          保存
        </Button>
      ) : (
        <Button type="primary" onClick={props.toggleEdit}>
          编辑
        </Button>
      )}
      <Button type="primary" onClick={() => setModalExport(!modalExport)}>
        导出pdf
      </Button>
    </div>
  );

  const finish =
    props.type === 'comExportPdf'
      ? () => {
          setTimeout(() => {
            console.log('  延时器 ： ');
            setModalExport(!modalExport);
          }, 2000);
        }
      : props.toggleExportPDF;
  // const finish = props.type === 'comExportPdf' ? setModalExport : props.toggleExportPDF

  useExportPdf({
    // element: document.getElementsByClassName('inspectRecordForm')[0],
    isExportPDF: isExport,
    element: 'formWrapper',
    // finish: props.toggleExportPDF,
    finish: finish,
    filename: formTitle,
  });

  const confirmBtn = (
    <Button
      className={'m-r-10 '}
      type="primary"
      onClick={e => {
        if (!isEdit) {
          props.onCancel();
          return;
        }
      }}
    >
      确认
    </Button>
  );

  const footerCom = (
    <div className="btnWrapper modalBtn">
      <Button className={'m-r-10 '} onClick={props.onCancel}>
        取消
      </Button>
      {confirmBtn}
    </div>
  );

  return (
    <div
      className={`inspectRecordForm ${isExport ? 'exportPdf' : ''}`}
      // ref={counterRef}
      // key={tabIndex}
    >
      {/* {props.showActionBtn && modalExport ? actionBtn : null} */}
      {props.showActionBtn ? actionBtn : null}
      {/* <SmartExportPdf></SmartExportPdf> */}
      <div className="formWrapper">
        <div className="formTitle">报告：{formTitle}</div>
        <SmartForm
          flexRow={2}
          config={configs}
          formLayouts={formLayouts}
          noRuleAll
          // isDisabledAll
          {...rest}
          // init={{
          //   ...dataInit,
          //   // spectIn: power_data[0].spect_in[0],
          //   // spectOut: power_data[0].spect_out[0],
          //   spectIn: power_data[tabIndex].spect_in,
          //   spectOut: power_data[tabIndex].spect_out,
          // }}
          init={dataInit}
          className={'inspectRecordForm'}
          // formProps={
          //   {
          //     // id: 'inspectRecordForm',
          //   }
          // }
          action={isEdit ? 'edit' : 'detail'}
          // key={props.formKey}
          // key={dataInit?.powerData?.id}
          // key={dataInit?.index}
          // key={dataInit}
          // key={tabIndex}
          // setInit
        ></SmartForm>
      </div>

      {/* {!props.action === 'detail' ? footerCom} */}
      {/* {footerCom} */}
    </div>
  );
};

InspectRecordForm.defaultProps = {};

export default InspectRecordForm;
