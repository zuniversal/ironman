import React, { useState, useEffect } from 'react';
import './style.less';
import { Button } from 'antd';
import { getList as getAssetsList } from '@/services/assets';
import {
  getList as getClientList,
  getRelatived,
  getClientPower,
} from '@/services/client';
import { getList as getHouseNoList } from '@/services/houseNo';
import { getList as getPowerStationList } from '@/services/powerStation';
import { getManufacturerList } from '@/services/monitorManage';
import { getList as getMonitorDeviceList } from '@/services/monitorDevice';
import { getList as getAlarmTemplateList } from '@/services/alarmTemplate';

import SmartForm from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import {
  manufacturerConfig,
  monitorDeviceStatusConfig,
  deviceFrequencyConfig,
  changeNumberProps,
} from '@/configs';
import { formatSelectList, filterObjSame, tips, num2Str } from '@/utils';

// 下拉项关系  户号跟客户 电站跟户号 设备跟户号 请求数据

const MonitorManageForm = props => {
  console.log(' MonitorManageForm ： ', props);
  // const [ clientList, setClientList ] = useState([])
  const [houseNoList, setHouseNoList] = useState([]);
  const [powerStationList, setPowerStationList] = useState([]);
  // const [ assetsList, setAssetsList ] = useState([])

  // const [powerNumberList, setPowerNumberList] = useState(props.init.electrical_info_id ? [
  //       {
  //         value: props.init.electrical_info_id,
  //         label: props.init.power_number,
  //       },
  //     ] : []);
  const [powerNumberList, setPowerNumberList] = useState([]);
  const [outlineList, setOutlineList] = useState([]);

  // const getClientAsync = async (params, ) => {
  //   const res = await getClientList({params: params})
  //   console.log(' getClientAsync  ： ', params, res,     )
  // }
  // const getPowerStationAsync = async (params, ) => {
  //   const res = await getPowerStationList({params: params})
  //   console.log(' getPowerStationAsync  ： ', params, res,     )
  // }
  // const getHouseNoAsync = async (params, ) => {
  //   const res = await getHouseNoList({params: params})
  //   console.log(' getHouseNoAsync  ： ', params, res,     )
  // }
  // const getAssetsAsync = async (params, ) => {
  //   const res = await getAssetsList({params: params})
  //   console.log(' getAssetsAsync  ： ', params, res,     )
  // }

  const noAdd = props.action !== 'add';
  const formVals = props.propsForm.getFieldsValue();
  const commonParams = {
    init: [],
    format: res => formatSelectList(res, 'name'),
  };

  const { data: manufacturerList, req: getManufacturerListAsync } = useHttp(
    getManufacturerList,
    {
      ...commonParams,
      format: res => formatSelectList(res, 'manufacturer'),
    },
  );
  const { data: alarmTemplateList, req: getalarmTemplateAsync } = useHttp(
    () =>
      getAlarmTemplateList({
        // get_all: '1',
      }),
    {
      ...commonParams,
    },
  );
  const { data: monitorDeviceList, req: getMonitorDeviceAsync } = useHttp(
    () =>
      getMonitorDeviceList({
        unbound: '1',
        // get_all: '1',
      }),
    {
      ...commonParams,
      format: res => formatSelectList(res, 'imei', 'id'),
    },
  );
  // const { data: clientList, req: getClientAsync } = useHttp(
  //   () => getRelatived({ get_all: '1' }),
  //   {
  //     ...commonParams,
  //     withArr: noAdd
  //       ? [
  //           {
  //             value: props.init.customer_id,
  //             label: props.init.customer_name,
  //           },
  //         ]
  //       : [],
  //   },
  // );
  const { data: clientList, req: getClientAsync } = useHttp(
    // () => getRelatived({ get_all: '1' }),
    getClientPower,
    {
      ...commonParams,
      // withArr: noAdd
      //   ? [
      //       {
      //         value: props.init.customer_id,
      //         label: props.init.customer_name,
      //       },
      //     ]
      //   : [],
      // format: res => formatSelectList(res).map(({address, ...v}) => ({...v, label: `${v.label} - ${address}`})),
      format: res =>
        formatSelectList(res, 'customer_name', 'customer_id').map(
          ({ customer_address, ...v }) => ({
            ...v,
            label: `${v.label} - ${customer_address}`,
          }),
        ),
    },
  );

  // const { data: clientList, req: getClientAsync, } = useHttp(getClientList, {
  //   ...commonParams,
  //   withArr: noAdd
  //     ? [
  //         {
  //           value: props.init.customer_id,
  //           label: props.init.customer_name,
  //         },
  //       ]
  //     : [],
  // });
  // const {
  //   data: powerStationList,
  //   setData: setPowerStationList,
  //   http: getPowerStationAsync, req,
  // } = useHttp(getPowerStationList, {
  //   ...commonParams,
  //   withArr: noAdd
  //     ? [
  //         {
  //           value: props.init.station_id,
  //           label: props.init.station_name,
  //         },
  //       ]
  //     : [],
  //   // noMountFetch: true,
  // });
  // console.log(' powerStationList ： ', powerStationList);
  // const {
  //   data: houseNoList,
  //   setData: setHouseNoList,
  //   http: getHouseNoAsync, req,
  // } = useHttp(getHouseNoList, {
  //   ...commonParams,
  //   withArr: noAdd
  //     ? [
  //         {
  //           value: props.init.electricity_user_id,
  //           label: props.init.number,
  //         },
  //       ]
  //     : [],
  //   format: res => formatSelectList(res, 'number'),
  //   // noMountFetch: true,
  // });
  const {
    data: assetsList,
    setData: setAssetsList,
    req: getAssetsListAsync,
  } = useHttp(
    () =>
      getAssetsList({
        customer_id: props.init.customer_id,
        electricity_user_id: props.init.electricity_user_id,
      }),
    {
      ...commonParams,
      withArr:
        noAdd && props.init.equipment_id
          ? [
              {
                value: `${props.init.equipment_id}`,
                label: props.init.equipment_name,
              },
            ]
          : [],
      noMountFetch: !props.init.customer_id,
    },
  );
  console.log(' assetsList ： ', assetsList); //
  // // console.log(' houseNoList, getHouseNoAsync,  ： ', houseNoList, getHouseNoAsync,   )//

  const onFieldChange = params => {
    console.log(' onFieldChange  ： ', params);
    const changeKey = Object.keys(params.value)[0];
    console.log('  changeKey ：', changeKey);
    if (changeKey === 'electricity_user_id') {
      getHouseNoAsync({ customer: formVals.customer_id, params });
    } else if (changeKey === 'station_id') {
      getPowerStationAsync({ name: params });
    } else if (changeKey === 'equipment_id') {
      // getAssetsAsync({ station, name: params, })
    }
  };
  const onManufacturerChange = params => {
    console.log(' onManufacturerChange  ： ', params);
  };
  // const onClientChange = (val, item) => {
  //   console.log(' onClientChange  ： ', val, item);
  //   const res = clientList.find(v => v.value == val);
  //   const formatRes = formatSelectList(res.electricity_users, 'number');
  //   const formatRes = formatSelectList(
  //     res,
  //     'number',
  //     'electricity_user_id',
  //   )
  //   console.log(' res  clientList.filter v ： ', res, formatRes);
  //   setHouseNoList(formatRes);
  //   setPowerStationList([]);
  //   setOutlineList([]);
  //   props.propsForm.setFieldsValue({
  //     electricity_user_id: item[0]?.value,
  //     station_id: null,
  //     equipment_id: null,
  //   });
  //   // setAssetsList([]);
  //   // getClientAsync({ name: params });
  // };
  // const onHouseNoChange = params => {
  //   console.log(
  //     ' onHouseNoChange  ： ',
  //     params,
  //     houseNoList,
  //     props.propsForm.getFieldsValue(),
  //   );
  //   // sethouseNoList(setPowerStationList);
  //   // setAssetsList([]);
  //   // getHouseNoAsync({ customer: params });
  //   const res = houseNoList.find(v => v.value == params);
  //   console.log(' res  houseNoList.filter v ： ', res);
  //   const formatRes = formatSelectList(res.stations, 'name');
  //   console.log(' res  houseNoList.filter v ： ', res, formatRes);
  //   setPowerStationList(formatRes);
  //   props.propsForm.setFieldsValue({
  //     station_id: null,
  //   });
  //   const { customer_id, electricity_user_id, } = props.propsForm.getFieldsValue()
  //   if (customer_id && electricity_user_id) {
  //     getAssetsListAsync(() => getAssetsList({customer_id, electricity_user_id, }))
  //   }
  // };

  const onClientChange = (params, rest) => {
    console.log(' onClientChange  ： ', clientList, params, rest);
    // const res = clientList.find(v => v.value == params);
    // const formatRes = formatSelectList(res.electricity_users, 'number').map((v) => ({...v, label: `${v.label} - ${v.addr}`}));
    const res = clientList.filter(v => v.value == params);
    const formatRes = formatSelectList(
      res,
      'number',
      'electricity_user_id',
    ).map(v => ({ ...v, label: `${v.label} - ${v.electricity_user_addr}` }));
    console.log(' res  clientList.filter v ： ', res, formatRes);
    setHouseNoList(formatRes);
    setPowerNumberList([]);
    setOutlineList([]);
    props.propsForm.setFieldsValue({
      electricity_user_id: null,
      electrical_info_id: null,
      outline_id: null,
    });
  };

  const onHouseNoChange = params => {
    console.log(
      ' onHouseNoChange  ： ',
      params,
      houseNoList,
      props.propsForm.getFieldsValue(),
    );
    // const res = houseNoList.find(v => v.value == params);
    // console.log(' res  houseNoList.filter v ： ', res);
    // const formatRes = formatSelectList(res.stations, 'name');
    const res = houseNoList.filter(v => v.value == params);
    const formatRes = formatSelectList(
      res,
      'power_number',
      'electrical_info_id',
    );
    const formatOutlineRes = formatSelectList(
      res,
      'outline_name',
      'outline_id',
    );
    console.log(
      ' res  houseNoList.filter v ： ',
      res,
      formatRes,
      formatOutlineRes,
    );
    setPowerNumberList(formatRes);
    setOutlineList(formatOutlineRes);
  };
  const onHouseNoChangeHandle = (params, houseNoList) => {
    console.log(
      ' onHouseNoChange  ： ',
      params,
      houseNoList,
      props.propsForm.getFieldsValue(),
    );
    // const res = houseNoList.find(v => v.value == params);
    // console.log(' res  houseNoList.filter v ： ', res);
    // const formatRes = formatSelectList(res.stations, 'name');
    const res = houseNoList.filter(v => v.value == params);
    const formatRes = formatSelectList(
      res,
      'power_number',
      'electrical_info_id',
    );
    const formatOutlineRes = formatSelectList(
      res,
      'outline_name',
      'outline_id',
    );
    console.log(
      ' res  houseNoList.filter v ： ',
      res,
      formatRes,
      formatOutlineRes,
    );
    setPowerNumberList(formatRes);
    setOutlineList(formatOutlineRes);
  };

  useEffect(() => {
    console.log(' 副作用 clientList  ： ', clientList, noAdd, props.init); //
    if (noAdd) {
      const res = clientList.filter(v => v.value == props.init.customer_id);
      const formatRes = formatSelectList(
        res,
        'number',
        'electricity_user_id',
      ).map(v => ({ ...v, label: `${v.label} - ${v.electricity_user_addr}` }));
      console.log(' res  clientList.filter v ： ', res, formatRes);
      setHouseNoList(formatRes);
      onHouseNoChangeHandle(props.init.electricity_user_id, formatRes);
    }
  }, [clientList, noAdd]);

  console.log(
    ' onHouseNoChangeonHouseNoChange  res  clientList.filter v ： ',
    clientList,
    houseNoList,
    powerNumberList,
    outlineList,
  );

  clientList.forEach((v, i) => {
    if (v.customer_id == 58361) {
      console.log(
        ' clientListclientList v ： ',
        v,
        i,
        v.customer_id == 58361,
        v.customer_id,
        houseNoList,
      );
    }
  });

  const onPowerNumberChange = params => {
    console.log(
      ' onPowerNumberChange   params,   ： ',
      params,
      powerNumberList,
      outlineList,
    );
    const res = powerNumberList.filter(v => v.value == params);
    console.log(' resres ： ', res); //
    const formatRes = formatSelectList(res, 'outline_name', 'outline_id');
    console.log(' res  clientList.filter v ： ', res, formatRes);
    setOutlineList(formatRes);
  };

  const config = [
    {
      noRule: true,
      formType: 'Search',
      // selectSearch: onClientChange,
      selectData: clientList,
      // selectData: filterObjSame(
      //   [
      //     ...clientList,
      //     {
      //       value: props.init.customer_id,
      //       label: props.init.customer_name,
      //     },
      //   ],
      //   'value',
      // ),
      itemProps: {
        label: '客户',
        name: 'customer_id',
      },
      comProps: {
        onSelect: onClientChange,
      },
    },
    {
      noRule: true,
      formType: 'Search',
      // selectSearch: onHouseNoChange,
      // selectData: [
      //   ...houseNoList,
      //   ...noAdd ? [{
      //     value: props.init.customer_id,
      //     label: props.init.customer_name,
      //   }] : [],
      // ],
      // selectData: filterObjSame(
      //   [
      //     ...houseNoList,
      //     {
      //       value: props.init.electricity_user_id,
      //       label: props.init.number,
      //     },
      //   ],
      //   'value',
      // ),
      selectData: houseNoList,
      itemProps: {
        label: '户号',
        name: 'electricity_user_id',
      },
      comProps: {
        onSelect: onHouseNoChange,
      },
    },
    // {
    //   noRule: true,
    //   formType: 'Search',
    //   // selectSearch: onPowerStationChange,
    //   // selectData: powerStationList,
    //   selectData: filterObjSame(
    //     [
    //       ...powerStationList,
    //       {
    //         value: props.init.station_id,
    //         label: props.init.station_name,
    //       },
    //     ],
    //     'value',
    //   ),
    //   itemProps: {
    //     label: '电站',
    //     name: 'station_id',
    //   },
    // },

    {
      noRule: true,
      formType: 'Search',
      selectData: powerNumberList,
      itemProps: {
        label: '电站',
        label: '电源编号',
        name: 'electrical_info_id',
      },
      comProps: {
        onSelect: onPowerNumberChange,
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: outlineList,
      itemProps: {
        label: '出线侧',
        name: 'outline_id',
      },
    },

    {
      noRule: true,
      formType: 'Search',
      // selectSearch: getAssetsAsync,
      selectData: assetsList,
      // selectData: filterObjSame(
      //   [
      //     ...assetsList,
      //     {
      //       value: props.init.equipment_id,
      //       label: props.init.equipment_name,
      //     },
      //   ],
      //   'value',
      // ),
      itemProps: {
        label: '关联客户设备',
        name: 'equipment_id',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '监控点名称',
        name: 'name',
      },
      // extra: (
      //   <Button
      //     type="primary"
      //     onClick={() => {
      //     }}
      //     className="m-l-5"
      //   >
      //     新增
      //   </Button>
      // ),
    },

    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '额定功率',
        name: 'power',
      },
    },

    {
      noRule: true,
      formType: 'Search',
      // selectSearch: getMonitorDeviceAsync,
      selectData: [
        ...monitorDeviceList,
        {
          value: props.init.device_id,
          label: props.init.imei,
        },
      ],
      itemProps: {
        label: '设备编码',
        label: '监控设备',
        name: 'device_id',
      },
    },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '设备名称',
    //     name: '',
    //   },
    // },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: 'IMEI号',
    //     name: 'imei',
    //   },
    // },
    // {
    //   formType: 'Search',
    //   selectData: props.serviceStaffList,
    //   itemProps: {
    //     label: '设备类型',
    //     name: '',
    //   },
    // },
    // // 固定的 厂商   先选厂商 然后带选模型
    // {
    //   formType: 'Search',
    //   selectData: manufacturerConfig,
    //   itemProps: {
    //     label: '品牌',
    //     label: '厂商',
    //     name: 'manufacturer',
    //   },
    //   comProps: {
    //     onChange: onManufacturerChange,
    //   },
    // },
    // {
    //   formType: 'Search',
    //   selectData: monitorDeviceStatusConfig,
    //   itemProps: {
    //     label: '状态',
    //     name: 'status',
    //   },
    // },
    {
      noRule: true,
      formType: 'Search',
      // selectSearch: getalarmTemplateAsync,
      selectData: alarmTemplateList,
      itemProps: {
        label: '告警策略',
        label: '告警模板',
        name: 'template_id',
      },
      extra: (
        <a
          onClick={() => {
            if (!props.propsForm.getFieldsValue().template_id) {
              tips('请选择后再查看详情！', 2);
              return;
            }
            props.propsForm.getFieldsValue().template_id &&
              props.showItemAsync({
                action: 'alarmTemplateDetailAsync',
                d_id: props.propsForm.getFieldsValue().template_id,
              });
          }}
          className="m-l-5"
        >
          查看详情
        </a>
      ),
    },
    {
      noRule: true,
      formType: 'Select',
      itemProps: {
        label: '告警通知手机号',
        name: 'phone_list',
        extra: 'Tips: 键盘回车即可保存手机号到框中，可连续输入多个！',
      },
      comProps: {
        mode: 'tags',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: deviceFrequencyConfig,
      itemProps: {
        label: '上传频率',
        name: 'frequency',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '压变',
        name: 'voltage_ratio',
      },
      comProps: {
        ...changeNumberProps,
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '流变',
        name: 'current_ratio',
      },
      comProps: {
        ...changeNumberProps,
      },
    },
    {
      noRule: true,
      formType: 'TextArea',
      itemProps: {
        label: '说明',
        name: 'comments',
      },
    },
  ];

  const configs = !props.isInsertForm
    ? config
    : config.map(v => ({
        ...v,
        comProps: { className: 'w-240', ...v.comProps },
      }));

  return (
    <div className={'monitorManageForm '}>
      <SmartForm
        config={configs}
        {...props}
        init={{
          template_id: null,
          comments: null,
          ...props.init,
          frequency: `${
            props.init.frequency
              ? props.init.frequency
              : deviceFrequencyConfig[0].value
          }`,
          ...num2Str(props.init, ['template_id']),
        }}
        // onFieldChange={onFieldChange}
      ></SmartForm>
    </div>
  );
};

MonitorManageForm.defaultProps = {};

export default MonitorManageForm;
