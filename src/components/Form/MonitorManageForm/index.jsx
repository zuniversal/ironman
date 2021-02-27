import React, { useState } from 'react';
import './style.less';
import { getList as getAssetsList } from '@/services/assets';
import { getList as getClientList } from '@/services/client';
import { getList as getHouseNoList } from '@/services/houseNo';
import { getList as getPowerStationList } from '@/services/powerStation';
import { getManufacturerList } from '@/services/monitorManage';
import { getList as getMonitorDeviceList } from '@/services/monitorDevice';

import SmartForm from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import {
  manufacturerConfig,
  monitorDeviceStatusConfig,
  deviceFrequencyConfig,
} from '@/configs';
import { formatSelectList } from '@/utils';

// 下拉项关系  户号跟客户 电站跟户号 设备跟户号 请求数据

const MonitorManageForm = props => {
  console.log(' MonitorManageForm ： ', props);
  // const [ clientList, setClientList ] = useState([])
  // const [ houseNoList, setHouseNoList ] = useState()
  // const [ assetsList, setAssetsList ] = useState()

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
    },
  );
  const { data: clientList, req: getClientAsync } = useHttp(getClientList, {
    ...commonParams,
    withArr: noAdd
      ? [
          {
            value: props.init.customer_id,
            label: props.init.customer_name,
          },
        ]
      : [],
  });
  const {
    data: powerStationList,
    setData: setPowerStationList,
    req: getPowerStationAsync,
  } = useHttp(getPowerStationList, {
    ...commonParams,
    withArr: noAdd
      ? [
          {
            value: props.init.station_id,
            label: props.init.station_name,
          },
        ]
      : [],
    // noMountFetch: true,
  });
  console.log(' powerStationList ： ', powerStationList); //
  const {
    data: houseNoList,
    setData: setHouseNoList,
    req: getHouseNoAsync,
  } = useHttp(getHouseNoList, {
    ...commonParams,
    withArr: noAdd
      ? [
          {
            value: props.init.electricity_user_id,
            label: props.init.number,
          },
        ]
      : [],
    format: res => formatSelectList(res, 'number'),
    // noMountFetch: true,
  });
  const {
    data: assetsList,
    setData: setAssetsList,
    req: getAssetsAsync,
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
  // console.log(' houseNoList, getHouseNoAsync,  ： ', houseNoList, getHouseNoAsync,   )//

  const onFieldChange = params => {
    console.log(' onFieldChange  ： ', params);
    const changeKey = Object.keys(params.value)[0];
    console.log('  changeKey ：', changeKey); //
    // if (changeKey === 'electricity_user_id') {
    //   getHouseNoAsync({ customer: formVals.customer_id, params })
    // } else if (changeKey === 'station_id') {
    //   getPowerStationAsync({ name: params, })
    // } else if (changeKey === 'equipment_id') {
    //   // getAssetsAsync({ station, name: params, })
    // }
  };
  const onManufacturerChange = params => {
    console.log(' onManufacturerChange  ： ', params);
  };
  const onClientChange = params => {
    console.log(' onClientChange  ： ', params);
    setHouseNoList([]);
    setPowerStationList([]);
    setAssetsList([]);
    getClientAsync({ name: params });
  };
  const onHouseNoChange = params => {
    console.log(
      ' onHouseNoChange  ： ',
      params,
      formVals,
      props.propsForm.getFieldsValue(),
    );
    setPowerStationList([]);
    setAssetsList([]);
    getHouseNoAsync({ customer: params });
  };
  const onPowerStationChange = params => {
    console.log(' onPowerStationChange  ： ', params);
    getPowerStationAsync(params);
  };

  const config = [
    {
      formType: 'Search',
      selectSearch: onClientChange,
      selectData: clientList,
      itemProps: {
        label: '客户',
        name: 'customer_id',
      },
    },
    {
      formType: 'Search',
      selectSearch: onHouseNoChange,
      selectData: houseNoList,
      itemProps: {
        label: '户号',
        name: 'electricity_user_id',
      },
    },
    {
      formType: 'Search',
      selectSearch: onPowerStationChange,
      selectData: powerStationList,
      itemProps: {
        label: '电站',
        name: 'station_id',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectSearch: getAssetsAsync,
      selectData: assetsList,
      itemProps: {
        label: '关联客户设备',
        name: 'equipment_id',
      },
    },
    {
      itemProps: {
        label: '监控点名称',
        name: 'name',
      },
    },
    // {
    //   noRule: true,
    //   formType: 'Search',
    //   selectSearch: getAssetsAsync,
    //   selectData: assetsList,
    //   itemProps: {
    //     label: '设备编码',
    //     label: '监控设备',
    //     name: 'device_id',
    //   },
    // },
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
    //   formType: 'Search',
    //   // selectSearch: props.getPowerStationList,
    //   selectData: props.serviceStaffList,
    //   itemProps: {
    //     label: '告警策略',
    //     name: '',
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
      formType: 'Select',
      selectData: deviceFrequencyConfig,
      itemProps: {
        label: '上传频率',
        name: 'frequency',
      },
    },
    {
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
          ...props.init,
          frequency: deviceFrequencyConfig[0].value,
        }}
        onFieldChange={onFieldChange}
      ></SmartForm>
    </div>
  );
};

MonitorManageForm.defaultProps = {};

export default MonitorManageForm;
