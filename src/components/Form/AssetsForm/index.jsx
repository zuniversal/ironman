import React, { useState } from 'react';
import './style.less';
import { Button } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import SmartForm from '@/common/SmartForm';
// import AssetsFormTable from 'smartTb/AssetsFormTable';
import UploadCom from '@/components/Widgets/UploadCom';
import useHttp from '@/hooks/useHttp';
import { getRelatived, getClientPower } from '@/services/client';
import { getManufacturerList } from '@/services/monitorManage';
import { formatSelectList, filterObjSame } from '@/utils';
import { getList as getPowerStationList } from '@/services/powerStation';
import { getList as getHouseNoList } from '@/services/houseNo';

const AssetsForm = props => {
  console.log(' AssetsForm ： ', props, config);
  const { action } = props;

  const [houseNoList, setHouseNoList] = useState([]);

  // const formConfig = formatConfig(config);
  const commonParams = {
    format: res => formatSelectList(res, 'name'),
  };
  const { data: powerStationList, req: getPowerStationAsync } = useHttp(
    () => getPowerStationList({}),
    {
      ...commonParams,
    },
  );
  const { data: manufacturerList, req: getManufacturerListAsync } = useHttp(
    getManufacturerList,
    {
      ...commonParams,
      format: res => formatSelectList(res, 'manufacturer'),
    },
  );
  const { data: clientPowerList, req: getClientAsync } = useHttp(
    // () => getRelatived({ get_all: '1' }),
    getClientPower,
    {
      format: res => formatSelectList(res, 'customer_name', 'customer_id'),
      // .map(
      //   ({ customer_address, ...v }) => ({
      //     ...v,
      //     label: `${v.label} - ${customer_address}`,
      //   }),
      // ),
    },
  );
  console.log(' clientPowerList ： ', clientPowerList); //
  // const { data: powerStationList, req: getPowerStationAsync } = useHttp(
  //   getHouseNoList,
  //   {
  //     ...commonParams,
  //     format: res => formatSelectList(res, 'number'),
  //   },
  // );

  const onFieldChange = params => {
    console.log(' onFieldChange  ： ', params);
    const changeKey = Object.keys(params.value)[0];
    console.log('  changeKey ：', changeKey);
    if (changeKey === 'station_id' || changeKey === 'station') {
      const res = powerStationList.find(
        v => v.id == params.value.station || v.id == params.value.station_id,
      );
      console.log(' res  powerStationList.find v ： ', res);
      // console.log(' res  powerStationList.find v ： ', formatSelectList(res ?? [], 'name'),   )
      // setHouseNoList(res.map(v => formatSelectList(v, 'name')))
      // setHouseNoList(formatSelectList(res ?? [], 'name'))
      props.propsForm.setFieldsValue({
        electricity_user: res?.electricity_user?.id,
      });
      // setHouseNoList(res && res.electricity_user ? [{value: `${res.electricity_user.id}`, label: res.electricity_user.number, }] : [])
    }
  };

  const addConfig = [
    {
      // noRule: true,
      formType: 'Search',
      selectSearch: getManufacturerListAsync,
      selectData: manufacturerList,
      itemProps: {
        label: '资产类型',
        name: '',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: <div></div>,
      itemProps: {
        label: ' ',
      },
    },
    {
      // formType: 'Select',
      // noRule: true,
      itemProps: {
        label: '资产名称',
        name: 'name',
      },
    },
    {
      // noRule: true,
      formType: 'Search',
      selectSearch: getManufacturerListAsync,
      selectData: manufacturerList,
      itemProps: {
        label: '制造厂商',
        name: '',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '设备型号',
        name: 'model',
      },
    },
    {
      // noRule: true,
      itemProps: {
        label: '出厂编号',
        name: 'production_code',
      },
    },
    {
      formType: 'InputNumber',
      noRule: true,
      itemProps: {
        label: '额定电压',
        name: 'voltage',
      },
    },
    {
      formType: 'InputNumber',
      noRule: true,
      itemProps: {
        label: '额定电流',
        name: 'electricity',
      },
    },
    {
      formType: 'DatePicker',
      // noRule: true,
      itemProps: {
        label: '出厂日期',
        name: 'production_date',
      },
    },
    {
      formType: 'DatePicker',
      // noRule: true,
      itemProps: {
        label: '投运日期',
        name: 'operation_date',
      },
    },
  ];

  const config2 = [
    {
      noRule: true,
      formType: 'Select',
      selectData: houseNoList,
      itemProps: {
        label: '户号',
        name: 'electricity_user',
        className: 'hidden',
      },
    },
    {
      // formType: 'Search',
      // selectSearch: props.getListAsync,
      // selectData: props.dataList,
      noRule: true,
      itemProps: {
        label: '上级设备',
        name: 'parent_id',
      },
    },
    {
      // formType: 'Select',
      // noRule: true,
      itemProps: {
        label: '设备名称',
        name: 'name',
      },
    },
  ];

  const config = [
    // {
    //   // formType: 'Search',
    //   // selectSearch: props.getHouseNo,
    //   // selectData: props.houseNoList,
    //   itemProps: {
    //     label: '户号',
    //     name: 'nos',
    //   },
    // },
    {
      noRule: true,
      formType: 'Search',
      selectSearch: props.getPowerAsync,
      selectData: props.powerList,
      selectSearch: e =>
        getPowerStationAsync(() => getPowerStationList({ name: e })),
      selectData: powerStationList,
      itemProps: {
        label: '电站',
        name: props.action === 'add' ? 'station_id' : 'station',
      },
    },
    {
      noRule: true,
      formType: 'Select',
      selectData: houseNoList,
      itemProps: {
        label: '户号',
        name: 'electricity_user',
        className: 'hidden',
      },
    },
    // {
    //   formType: 'Divider',
    //   itemProps: {
    //     label: '',
    //     name: '',
    //   },
    // },
    {
      // formType: 'Search',
      // selectSearch: props.getListAsync,
      // selectData: props.dataList,
      noRule: true,
      itemProps: {
        label: '上级设备',
        name: 'parent_id',
      },
    },
    {
      // formType: 'Select',
      // noRule: true,
      itemProps: {
        label: '设备名称',
        name: 'name',
      },
    },
    {
      // noRule: true,
      itemProps: {
        label: '设备编号',
        name: 'code',
      },
    },
    {
      // noRule: true,
      itemProps: {
        label: '出厂号',
        name: 'production_code',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '设备型号',
        name: 'model',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '额定电压',
        name: 'voltage',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '额定电流',
        name: 'electricity',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '变压容量',
        name: 'transformer_capacity',
      },
    },
    {
      formType: 'DatePicker',
      // noRule: true,
      itemProps: {
        label: '出厂日期',
        name: 'production_date',
      },
    },
    {
      formType: 'DatePicker',
      // noRule: true,
      itemProps: {
        label: '投运日期',
        name: 'operation_date',
      },
    },

    <UploadCom
      label={'上传铭牌'}
      key={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={'支持扩展名:pdf、jpg、png'}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
      }}
      init={props.init}
      formAction={props.action}
    ></UploadCom>,
    // <UploadCom label={'上传铭牌'} key={'file'} extra={'支持上传.DWG文件'} name={'file'} ></UploadCom>,
  ];

  // if (action === 'detail') {
  //   config.push(
  //     <AssetsFormTable></AssetsFormTable>
  //   )
  // }

  const configs = config.map(v => ({
    ...v,
    comProps: { className: `${v.className} w-200`, ...v.comProps },
  }));

  const configMap = {
    addConfig,
    config,
  };

  return (
    <SmartForm
      config={configMap[props.formTypes]}
      // config={configs}

      {...props}
      init={{
        electricity_user: null,
        station: null,
        station_id: null,
        ...props.init,
      }}
      onFieldChange={onFieldChange}
    ></SmartForm>
  );
};

export default AssetsForm;
