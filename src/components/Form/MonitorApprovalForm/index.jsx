import React, { useState } from 'react';
import './style.less';
import useHttp from '@/hooks/useHttp';
import {
  getManufacturerList,
  getList as getMonitorPointList,
} from '@/services/monitorManage';
import { getList as getClientList, getRelatived } from '@/services/client';
import SmartForm from '@/common/SmartForm';
import { monitorDeviceStatusConfig, networkTypeConfig } from '@/configs';
import { formatSelectList, filterObjSame } from '@/utils';
import UploadCom from '@/components/Widgets/UploadCom';

const MonitorApprovalForm = props => {
  const [houseNoList, setHouseNoList] = useState([]);
  const [powerStationList, setPowerStationList] = useState([]);

  const noAdd = props.action !== 'add';
  const commonParams = {
    init: [],
    format: res => formatSelectList(res),
  };
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
  const { data: manufacturerList, req: getManufacturerListAsync } = useHttp(
    getManufacturerList,
    {
      ...commonParams,
      format: res => formatSelectList(res, 'manufacturer'),
    },
  );

  const manufacturerModelList = [];
  manufacturerList.forEach(v =>
    manufacturerModelList.push(...formatSelectList(v.models)),
  );
  console.log(' MonitorApprovalForm ： ', props, manufacturerModelList);

  const onClientChange = (params, rest) => {
    console.log(' onClientChange  ： ', params, rest);
    const res = clientList.find(v => v.value == params);
    const formatRes = formatSelectList(res.electricity_users, 'number');
    console.log(' res  clientList.filter v ： ', res, formatRes);
    setHouseNoList(formatRes);
    setPowerStationList([]);
  };
  const onHouseNoChange = params => {
    console.log(
      ' onHouseNoChange  ： ',
      params,
      houseNoList,
      props.propsForm.getFieldsValue(),
    );
    const res = houseNoList.find(v => v.value == params);
    console.log(' res  houseNoList.filter v ： ', res);
    const formatRes = formatSelectList(res.stations, 'name');
    console.log(' res  houseNoList.filter v ： ', res, formatRes);
    setPowerStationList(formatRes);
  };

  const config = [
    {
      itemProps: {
        label: '工程编号',
        name: '',
      },
    },
    {
      formType: 'Search',
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
      formType: 'Search',
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
      formType: 'Search',
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
      itemProps: {
        label: '设备编码',
        name: '',
      },
    },
    {
      formType: 'Search',
      selectSearch: getManufacturerListAsync,
      selectData: manufacturerList,
      itemProps: {
        label: '厂商',
        name: 'manufacturer',
      },
    },
    {
      itemProps: {
        label: '版本号',
        name: '',
      },
    },

    <UploadCom
      label={'设备标签图片'}
      key={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={null}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
      }}
      init={props.init}
      formAction={props.action}
    ></UploadCom>,
    <UploadCom
      label={'设备标签图片'}
      key={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={null}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
      }}
      init={props.init}
      formAction={props.action}
    ></UploadCom>,
    <UploadCom
      label={'电表图片'}
      key={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={null}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
      }}
      init={props.init}
      formAction={props.action}
    ></UploadCom>,
    <UploadCom
      label={'变压器铭牌'}
      key={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={null}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
      }}
      init={props.init}
      formAction={props.action}
    ></UploadCom>,
    <UploadCom
      label={'安装完成整体照'}
      key={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={null}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
      }}
      init={props.init}
      formAction={props.action}
    ></UploadCom>,
    <UploadCom
      label={'监控数据截图'}
      key={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={null}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
      }}
      init={props.init}
      formAction={props.action}
    ></UploadCom>,
    <UploadCom
      label={'其他'}
      key={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={null}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
      }}
      init={props.init}
      formAction={props.action}
    ></UploadCom>,

    {
      itemProps: {
        label: 'ICCID号',
        name: '',
      },
    },
    {
      itemProps: {
        label: '电表号',
        name: '',
      },
    },
    {
      itemProps: {
        label: '出线侧',
        name: '',
      },
    },
    {
      itemProps: {
        label: '变压器编号',
        name: '',
      },
    },
    {
      itemProps: {
        label: '变压器容量',
        name: '',
      },
    },
    {
      itemProps: {
        label: '点位名称',
        name: '',
      },
    },
    {
      itemProps: {
        label: '流变',
        name: '',
      },
    },
    {
      itemProps: {
        label: '压变',
        name: '',
      },
    },
    {
      itemProps: {
        label: '施工人员',
        name: '',
      },
      comProps: {
        disable: true,
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '提交时间',
        name: '',
      },
    },
  ];

  return (
    <SmartForm
      config={config}
      {...props}
      init={{
        ...props.init,
      }}
    ></SmartForm>
  );
};

MonitorApprovalForm.defaultProps = {};

export default MonitorApprovalForm;
