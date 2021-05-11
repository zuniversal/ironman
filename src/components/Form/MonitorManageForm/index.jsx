import React, { useState } from 'react';
import './style.less';
import { Button } from 'antd';
import { getList as getAssetsList } from '@/services/assets';
import { getList as getClientList, getRelatived } from '@/services/client';
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
import { formatSelectList, filterObjSame } from '@/utils';

// 下拉项关系  户号跟客户 电站跟户号 设备跟户号 请求数据

const MonitorManageForm = props => {
  console.log(' MonitorManageForm ： ', props);
  // const [ clientList, setClientList ] = useState([])
  const [houseNoList, setHouseNoList] = useState([]);
  const [powerStationList, setPowerStationList] = useState([]);
  // const [ assetsList, setAssetsList ] = useState([])

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
  const { data: clientList, req: getClientAsync } = useHttp(
    () => getRelatived({ get_all: '1' }),
    {
      ...commonParams,
      withArr: noAdd
        ? [
            {
              value: props.init.customer_id,
              label: props.init.customer_name,
            },
          ]
        : [],
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
    http: getAssetsAsync,
    req,
  } = useHttp(getAssetsList, {
    ...commonParams,
    withArr: noAdd
      ? [
          {
            value: props.init.equipment_id,
            label: props.init.equipment_name,
          },
        ]
      : [],
    // noMountFetch: true,
  });
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
  const onClientChange = (params, rest) => {
    console.log(' onClientChange  ： ', params, rest);
    const res = clientList.find(v => v.value == params);
    const formatRes = formatSelectList(res.electricity_users, 'number');
    console.log(' res  clientList.filter v ： ', res, formatRes);
    setHouseNoList(formatRes);
    setPowerStationList([]);
    // setAssetsList([]);
    // getClientAsync({ name: params });
  };
  const onHouseNoChange = params => {
    console.log(
      ' onHouseNoChange  ： ',
      params,
      houseNoList,
      props.propsForm.getFieldsValue(),
    );
    // sethouseNoList(setPowerStationList);
    // setAssetsList([]);
    // getHouseNoAsync({ customer: params });
    const res = houseNoList.find(v => v.value == params);
    console.log(' res  houseNoList.filter v ： ', res);
    const formatRes = formatSelectList(res.stations, 'name');
    console.log(' res  houseNoList.filter v ： ', res, formatRes);
    setPowerStationList(formatRes);
  };
  const onPowerStationChange = params => {
    console.log(' onPowerStationChange  ： ', params);
    // getPowerStationAsync(params);
  };

  const config = [
    {
      noRule: true,
      formType: 'Search',
      // selectSearch: onClientChange,
      // selectData: clientList,
      selectData: filterObjSame(
        [
          ...clientList,
          {
            value: props.init.customer_id,
            label: props.init.customer_name,
          },
        ],
        'value',
      ),
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
      selectData: filterObjSame(
        [
          ...houseNoList,
          {
            value: props.init.electricity_user_id,
            label: props.init.number,
          },
        ],
        'value',
      ),
      itemProps: {
        label: '户号',
        name: 'electricity_user_id',
      },
      comProps: {
        onSelect: onHouseNoChange,
      },
    },
    {
      noRule: true,
      formType: 'Search',
      // selectSearch: onPowerStationChange,
      // selectData: powerStationList,
      selectData: filterObjSame(
        [
          ...powerStationList,
          {
            value: props.init.station_id,
            label: props.init.station_name,
          },
        ],
        'value',
      ),
      itemProps: {
        label: '电站',
        name: 'station_id',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      // selectSearch: getAssetsAsync,
      // selectData: assetsList,
      selectData: filterObjSame(
        [
          ...assetsList,
          {
            value: props.init.equipment_id,
            label: props.init.equipment_name,
          },
        ],
        'value',
      ),
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
      itemProps: {
        label: '额定功率',
        name: 'power',
      },
    },

    {
      noRule: true,
      formType: 'Select',
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
    //   formType: 'Select',
    //   selectData: props.serviceStaffList,
    //   itemProps: {
    //     label: '设备类型',
    //     name: '',
    //   },
    // },
    // // 固定的 厂商   先选厂商 然后带选模型
    // {
    //   formType: 'Select',
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
    //   formType: 'Select',
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
    },
    {
      noRule: true,
      formType: 'Select',
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
          frequency: `${props.init?.frequency ??
            deviceFrequencyConfig[0].value}`,
        }}
        // onFieldChange={onFieldChange}
      ></SmartForm>
    </div>
  );
};

MonitorManageForm.defaultProps = {};

export default MonitorManageForm;
