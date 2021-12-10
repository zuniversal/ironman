import React, { useState } from 'react';
import SmartForm from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { getRelatived } from '@/services/client';
import { getDeviceEntityList } from '@/services/cameraConfig';
import { getList as getPlaftformConfigList } from '@/services/platformConfig';
import { tips, formatSelectList } from '@/utils';
import {
  cameraDeviceConfig,
  cameraTypeConfig,
  cameraSystemConfig,
  CAMERA2,
} from '@/configs';

const CameraConfigForm = props => {
  const [powerStationList, setPowerStationList] = useState([]);
  const [isChange, setIsChange] = useState(false);

  const { data: clientList } = useHttp(() => getRelatived({ get_all: '1' }));
  const { data: deviceEntityList, req: getDeviceEntityListAsync } = useHttp(
    () =>
      getDeviceEntityList({
        //   system: 2,
        //   customer_id: 5773,
        system_id: props.init.system,
      }),
    // getDeviceEntityList,
    {
      format: res =>
        res
          ? res.map(v => ({ label: v.deviceName, value: v.deviceSerial }))
          : [],
      noMountFetch: props.action === 'add',
    },
  );

  const {
    data: plaftformConfigList,
    req: getPlaftformConfigListAsync,
  } = useHttp(getPlaftformConfigList, {
    format: res => formatSelectList(res),
  });
  console.log(
    ' CameraConfigForm clientListclientList ： ',
    props,
    deviceEntityList,
    clientList,
    powerStationList,
    plaftformConfigList,
  ); //

  const getDeviceEntityListReq = system_id => {
    // const formData = props.propsForm.getFieldsValue();
    // const { system, customer_id } = formData;
    // console.log(
    //   ' getDeviceEntityListReq   ,   ： ',
    //   val,
    //   system,
    //   customer_id,
    //   formData,
    // );
    // if (system && customer_id) {
    if (system) {
      getDeviceEntityListAsync(() =>
        getDeviceEntityList({
          // system: 2,
          // customer_id: 5773,
          system_id,
          // customer_id,
          // customer_id: 5773,
        }),
      );
    }
  };

  const onClientChange = (val, item) => {
    console.log(' onClientChange   val, item,   ： ', val, item);
    const powerStationSelectList = [];
    item.electricity_users.forEach(v =>
      powerStationSelectList.push(...formatSelectList(v.stations)),
    );
    console.log(' powerStationSelectList ： ', powerStationSelectList); //
    setPowerStationList(powerStationSelectList);
    // getDeviceEntityListReq(val);
    props.propsForm.setFieldsValue({
      station_id: item.electricity_users[0]?.stations[0]?.id
        ? `${item.electricity_users[0]?.stations[0]?.id}`
        : null,
    });
    setIsChange(true);
  };
  const onSystemChange = (val, item) => {
    console.log(' onSystemChange   val, item,   ： ', val, item);
    // getDeviceEntityListReq(item.system);
    // getDeviceEntityListReq(item.id);
    getDeviceEntityListReq(val);
    props.propsForm.setFieldsValue({
      deviceSerial: null,
    });
  };
  const onDeviceChange = (val, item) => {
    console.log(' onDeviceChange   val, item,   ： ', val, item);
    if (item) {
      props.propsForm.setFieldsValue({
        deviceName: item.label,
      });
    }
  };

  const fixedCameraCol = [
    {
      formType: 'Search',
      selectData: clientList,
      itemProps: {
        label: '所属客户',
        name: 'customer_id',
      },
      comProps: {
        onChange: onClientChange,
      },
    },
    {
      formType: 'Search',
      selectData: [
        ...powerStationList,
        ...(!isChange && props.action === 'edit' && props.init.station
          ? [
              {
                value: props.init.station_id,
                label: props.init.station.name,
              },
            ]
          : []),
      ],
      itemProps: {
        label: '所属电站',
        name: 'station_id',
      },
    },
  ];

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息',
      },
      comProps: {
        disabled: props.action === 'edit',
      },
    },
    // {
    //   formType: 'Search',
    //   selectData: cameraTypeConfig,
    //   itemProps: {
    //     label: '摄像头类型',
    //     name: 'type',
    //   },
    // },
    {
      itemProps: {
        label: '摄像头名称',
        name: 'name',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '关联摄像头',
      },
    },
    {
      formType: 'Search',
      // selectData: cameraSystemConfig,
      selectData: plaftformConfigList,
      itemProps: {
        label: '选择平台',
        // name: props.action === 'edit' ? 'video_system' : 'system',
        name: 'system',
      },
      comProps: {
        onChange: onSystemChange,
      },
    },
    {
      formType: 'Search',
      selectData: deviceEntityList,
      itemProps: {
        label: '摄像头编号',
        label: '关联摄像头',
        name: 'deviceSerial',
      },
      comProps: {
        onChange: onDeviceChange,
      },
      extra: (
        <a
          onClick={() => {
            const { system, deviceSerial } = props.propsForm.getFieldsValue();
            if (!(system && deviceSerial)) {
              tips('请选择平台和关联摄像头后再摄像头名称！', 2);
              return;
            }
            const channelVal = plaftformConfigList.find(v => v.value == system)
              .system;
            const channelMap = {
              1: 0,
              2: 1,
            };
            const channel = channelMap[channelVal];
            console.log(
              ' showCameraVideo   system,   ： ',
              system,
              deviceEntityList,
              plaftformConfigList,
              channel,
              channelVal,
            );
            // return
            props.getVideoPreviewAsync({
              action: 'showCameraVideo',
              system_id: system,
              deviceSerial,
              channel,
              // extraPayload: record,
              type: 1,
            });
          }}
          className="m-l-5"
        >
          视频预览
        </a>
      ),
    },
    {
      itemProps: {
        label: '摄像头名称',
        name: 'deviceName',
        className: 'hidden',
      },
      comProps: {
        disabled: true,
      },
    },
    ...(props.type === CAMERA2 ? fixedCameraCol : []),
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

export default CameraConfigForm;
