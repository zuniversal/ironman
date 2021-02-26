import React, { useState } from 'react';
import './style.less';
import { getList as getAssetsList } from '@/services/assets';
import { getList as getClientList } from '@/services/client';
import { getList as getHouseNoList } from '@/services/houseNo';
import { getList as getPowerStationList } from '@/services/powerStation';

import SmartForm from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { manufacturerConfig, monitorDeviceStatusConfig } from '@/configs';
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

  const commonParams = {
    init: [],
    format: res => formatSelectList(res, 'name'),
  };
  const { data: clientList, req: getClientAsync } = useHttp(getClientList, {
    ...commonParams,
  });
  const { data: powerStationList, req: getPowerStationAsync } = useHttp(
    getPowerStationList,
    {
      ...commonParams,
      // noMountFetch: true,
    },
  );
  const { data: houseNoList, req: getHouseNoAsync } = useHttp(getClientList, {
    ...commonParams,
    // noMountFetch: true,
  });
  const { data: assetsList, req: getAssetsAsync } = useHttp(getAssetsList, {
    ...commonParams,
    // noMountFetch: true,
  });
  // console.log(' houseNoList, getHouseNoAsync,  ： ', houseNoList, getHouseNoAsync,   )//

  const onManufacturerChange = params => {
    console.log(' onManufacturerChange  ： ', params);
  };
  const onHouseNoChange = params => {
    console.log(' onHouseNoChange  ： ', params);
  };
  const onPowerStationChange = params => {
    console.log(' onPowerStationChange  ： ', params);
  };

  const config = [
    {
      formType: 'Search',
      selectSearch: params => getHouseNoAsync({ customer: params }),
      selectData: houseNoList,
      itemProps: {
        label: '户号',
        name: 'electricity_user_id',
      },
      comProps: {
        onChange: onHouseNoChange,
      },
    },
    {
      formType: 'Search',
      selectSearch: getPowerStationAsync,
      selectData: powerStationList,
      itemProps: {
        label: '电站',
        name: 'station_id',
      },
      comProps: {
        onChange: onPowerStationChange,
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
    {
      noRule: true,
      itemProps: {
        label: '设备编码',
        name: 'device_id',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '设备名称',
        name: '',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'IMEI号',
        name: 'imei',
      },
    },
    {
      formType: 'Select',
      selectData: props.serviceStaffList,
      itemProps: {
        label: '设备类型',
        name: '',
      },
    },
    // 固定的 厂商   先选厂商 然后带选模型
    {
      formType: 'Select',
      selectData: manufacturerConfig,
      itemProps: {
        label: '品牌',
        label: '厂商',
        name: 'manufacturer',
      },
      comProps: {
        onChange: onManufacturerChange,
      },
    },
    {
      formType: 'Search',
      // selectSearch: props.getPowerStationList,
      selectData: props.serviceStaffList,
      itemProps: {
        label: '告警策略',
        name: '',
      },
    },
    {
      formType: 'Select',
      selectData: monitorDeviceStatusConfig,
      itemProps: {
        label: '状态',
        name: 'status',
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
    <div className={' MonitorManageForm '}>
      <SmartForm config={configs} {...props}></SmartForm>
    </div>
  );
};

MonitorManageForm.defaultProps = {};

export default MonitorManageForm;
