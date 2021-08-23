import React, { useState, useEffect } from 'react';
import './style.less';
import useHttp from '@/hooks/useHttp';
import {
  getManufacturerList,
  getList as getMonitorPointList,
} from '@/services/monitorManage';
import {
  getList as getClientList,
  getRelatived,
  getClientPower,
} from '@/services/client';
import { getPowerInfo, getElectricOutlineList } from '@/services/powerStation';
import { getTransformer } from '@/services/assets';
import SmartForm from '@/common/SmartForm';
import {
  monitorDeviceStatusConfig,
  networkTypeConfig,
  changeNumberProps,
} from '@/configs';
import { formatSelectList, filterObjSame, tips, getItem } from '@/utils';
import UploadCom from '@/components/Widgets/UploadCom';
import dayjs from 'dayjs';
import moment from 'moment';

const url = '/api/v1/console/monitor/devices/record/upload';

const MonitorApprovalForm = props => {
  const [houseNoList, setHouseNoList] = useState(
    props.init.electricity_user_id
      ? [
          {
            value: `${props.init.electricity_user_id}`,
            label: props.init.number,
          },
        ]
      : [],
  );
  const [powerNumberList, setPowerNumberList] = useState(
    props.init.electrical_info_id
      ? [
          {
            value: `${props.init.electrical_info_id}`,
            label: props.init.power_number,
          },
        ]
      : [],
  );
  const [outlineList, setOutlineList] = useState([]);
  const [meterNumberList, setMeterNumberList] = useState([]);

  const { imei } = props.init; //

  const noAdd = props.action !== 'add';

  const commonParams = {
    init: [],
    format: res => formatSelectList(res),
  };
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
  const { data: manufacturerList, req: getManufacturerListAsync } = useHttp(
    getManufacturerList,
    {
      ...commonParams,
      format: res => formatSelectList(res, 'manufacturer'),
    },
  );
  const { data: powerInfoList, req: getPowerInfoListAsync } = useHttp(
    getPowerInfo,
    {
      ...commonParams,
      format: res => formatSelectList(res, 'power_number'),
    },
  );

  const { data: transformerList, req: getTransformerAsync } = useHttp(
    () =>
      getTransformer({
        electricity_user_id: props.init.electricity_user_id,
      }),
    {
      ...commonParams,
      format: res =>
        formatSelectList(res).map(v => ({
          ...v,
          label: `${v.label} - 容量:${v.capacity} - ${
            v.is_bind ? '已' : '未'
          }绑定`,
          style: v.is_bind
            ? {
                background: '#ff0d0d',
                color: 'white',
              }
            : null,
        })),
      // noMountFetch,
    },
  );

  const {
    data: electricOutlineList,
    req: getElectricOutlineListAsync,
  } = useHttp(
    () =>
      getElectricOutlineList({
        ele_info: props.init.electrical_info_id,
      }),
    {
      format: res => formatSelectList(res),
      ifReq: props.init.electrical_info_id,
    },
  );
  console.log(' electricOutlineList ： ', electricOutlineList); //

  const manufacturerModelList = [];
  manufacturerList.forEach(v =>
    manufacturerModelList.push(...formatSelectList(v.models)),
  );
  const clientPowerList = [];

  // const clientList = formatSelectList(clientPowerList, 'customer_name', 'customer_id')
  console.log(
    ' MonitorApprovalForm ： ',
    transformerList,
    clientPowerList,
    clientList,
    props,
    manufacturerModelList,
    meterNumberList,
  );

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
    setMeterNumberList([]);
    setOutlineList([]);
    props.propsForm.setFieldsValue({
      electricity_user_id: null,
      electrical_info_id: null,
      outline_id: null,
    });
  };

  const onHouseNoChange = params => {
    console.log(
      ' onHouseNoChange2onHouseNoChange2  ： ',
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
    const formatMeterRes = formatSelectList(
      res,
      'meter_number',
      'electrical_info_id',
    );
    const formatOutlineRes = formatSelectList(
      res,
      'outline_name',
      'outline_id',
    );
    console.log(
      ' res  onHouseNoChange2 houseNoList.filter v ： ',
      res,
      formatRes,
      formatMeterRes,
      formatOutlineRes,
    );
    setPowerNumberList(formatRes);
    setMeterNumberList(formatMeterRes);
    setOutlineList(formatOutlineRes);
  };
  const onHouseNoChangeHandle = (params, houseNoList) => {
    console.log(
      ' onHouseNoChangeHandle 方法 ： ',
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
    const formatMeterRes = formatSelectList(
      res,
      'meter_number',
      'electrical_info_id',
    );
    console.log(
      ' onHouseNoChangeHandle formatMeterRes 户号 ： ',
      formatMeterRes,
    ); //
    const formatOutlineRes = formatSelectList(
      res,
      'outline_name',
      'outline_id',
    );
    console.log(
      ' res  onHouseNoChangeHandle houseNoList.filter v ： ',
      res,
      formatRes,
      formatMeterRes,
      formatOutlineRes,
    );
    setPowerNumberList(formatRes);
    setMeterNumberList(formatMeterRes);
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
    electricOutlineList,
  );

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

  const showPowerNumber = () => {
    const { electrical_info_id } = props.propsForm.getFieldsValue();
    if (!electrical_info_id) {
      tips('请选择后再查看详情！', 2);
      return;
    }
    const res = powerInfoList.filter(v => v.id == electrical_info_id);
    console.log(' res  electrical_info_id.filter v ： ', res, powerInfoList);
    props.showItemAsync({
      action: 'powerNumberDetailAsync',
      extraData: {
        dataSource: res,
        noActionCol: true,
      },
      noReq: true,
    });
  };
  const showMeterNumber = () => {
    const { electrical_info_id } = props.propsForm.getFieldsValue();
    if (!electrical_info_id) {
      tips('请选择后再查看详情！', 2);
      return;
    }
    const res = powerInfoList.filter(v => v.id == electrical_info_id);
    console.log(
      ' res  electrical_info_id.filter v ： ',
      res,
      powerInfoList,
      electrical_info_id,
    );
    props.showItemAsync({
      action: 'meterNumberDetailAsync',
      d_id: electrical_info_id,
    });
  };

  const config = [
    {
      noRule: true,
      itemProps: {
        label: '工程编号',
        name: 'order_code',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: filterObjSame(
        [
          {
            value: props.init.customer_id,
            label: props.init.customer_name,
          },
          ...clientList,
        ],
        'value',
      ),
      itemProps: {
        label: '客户',
        name: 'customer_id',
      },
      comProps: {
        onSelect: onClientChange,
        dropdownClassName: 'monitorApprovalClientSelect',
      },
      extra: (
        <a
          onClick={() => {
            if (!props.propsForm.getFieldsValue().customer_id) {
              tips('请选择后再查看详情！', 2);
              return;
            }
            props.propsForm.getFieldsValue().customer_id &&
              props.showItemAsync({
                action: 'clientDetailAsync',
                d_id: props.propsForm.getFieldsValue().customer_id,
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
      formType: 'Search',
      // selectData: houseNoList.length > 0 ? houseNoList : props.init.electricity_user_id ? [{
      //     value: props.init.electricity_user_id,
      //     label: props.init.number,
      //   }] : [],
      selectData: houseNoList,
      itemProps: {
        label: '户号',
        name: 'electricity_user_id',
      },
      comProps: {
        onSelect: onHouseNoChange,
      },
      extra: (
        <a
          onClick={() => {
            if (!props.propsForm.getFieldsValue().electricity_user_id) {
              tips('请选择后再查看详情！', 2);
              return;
            }
            props.propsForm.getFieldsValue().electricity_user_id &&
              props.showItemAsync({
                action: 'houseNoDetailAsync',
                d_id: props.propsForm.getFieldsValue().electricity_user_id,
              });
          }}
          // onClick={() =>  props.propsForm.getFieldsValue().customer_id && props.showItemAsync({ action: 'houseNoDetailAsync',
          // d_id: props.propsForm.getFieldsValue().electricity_user_id, })}
          className="m-l-5"
        >
          查看详情
        </a>
      ),
    },
    // {
    //   noRule: true,
    //   formType: 'Search',
    //   // selectData: powerNumberList.length > 0 ? powerNumberList : [
    //   //   {
    //   //     value: props.init.electrical_info_id,
    //   //     label: props.init.power_number,
    //   //   },
    //   // ],
    //   selectData: powerNumberList,
    //   itemProps: {
    //     label: '电站',
    //     label: '电源编号',
    //     name: 'electrical_info_id',
    //   },
    //   comProps: {
    //     onSelect: onPowerNumberChange,
    //   },
    //   extra: (
    //     <a
    //       // onClick={() => props.propsForm.getFieldsValue().customer_id && props.showItemAsync({ action: 'powerNumberDetailAsync',
    //       // d_id: props.propsForm.getFieldsValue().customer_id, })}
    //       onClick={showPowerNumber}
    //       className="m-l-5"
    //     >
    //       查看详情
    //     </a>
    //   ),
    // },
    {
      noRule: true,
      formType: 'Search',
      selectData: meterNumberList,
      itemProps: {
        label: '电表号',
        name: 'electrical_info_id',
      },
      comProps: {
        onSelect: onPowerNumberChange,
      },
      extra: (
        <a onClick={showMeterNumber} className="m-l-5">
          查看详情
        </a>
      ),
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: filterObjSame(
        [
          ...outlineList,
          ...electricOutlineList,
          // {
          //   value: props.init.outline_id,
          //   label: props.init.outline_id,
          // },
        ],
        'value',
      ),
      selectData: outlineList.length > 0 ? outlineList : electricOutlineList,
      selectData: outlineList,
      itemProps: {
        label: '出线侧',
        name: 'outline_id',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: filterObjSame([...transformerList], 'value'),
      itemProps: {
        label: '变压器',
        name: 'equipment_id',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '变压器编号',
        name: 'trans_number',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '变压器容量',
        name: 'trans_capacity',
      },
      comProps: {
        suffix: 'KVA',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '设备编码',
        name: 'imei',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '设备编码',
        name: 'device_id',
        className: 'hidden',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectSearch: getManufacturerListAsync,
      selectData: manufacturerList,
      itemProps: {
        label: '厂商',
        name: 'manufacturer',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: manufacturerModelList,
      itemProps: {
        label: '版本号',
        name: 'model',
      },
      comProps: {
        disabled: true,
      },
    },

    {
      noRule: true,
      itemProps: {
        label: 'ICCID号',
        name: 'iccid',
      },
      comProps: {
        disabled: true,
      },
    },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '电表号',
    //     name: 'meter_number',
    //   },
    // },
    {
      noRule: true,
      itemProps: {
        label: '点位名称',
        name: 'name',
      },
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
      itemProps: {
        label: '施工人员',
        // name: 'user',
        name: 'worker_name',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      formType: 'DatePicker',
      itemProps: {
        label: '提交时间',
        name: 'updated_time',
      },
    },

    <UploadCom
      label={'设备标签图片'}
      key={'device_img'}
      action={`${url}?imei=${imei}&file_id=device_img`}
      name={'device_img'}
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
      key={'meter_img'}
      action={`${url}?imei=${imei}&file_id=meter_img`}
      name={'meter_img'}
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
      key={'trans_nameplate_img'}
      action={`${url}?imei=${imei}&file_id=trans_nameplate_img`}
      name={'trans_nameplate_img'}
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
      key={'complete_img'}
      action={`${url}?imei=${imei}&file_id=complete_img`}
      name={'complete_img'}
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
      key={'data_img'}
      action={`${url}?imei=${imei}&file_id=data_img`}
      name={'data_img'}
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
      key={'other_img'}
      action={`${url}?imei=${imei}&file_id=other_img`}
      name={'other_img'}
      extra={null}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
      }}
      init={props.init}
      formAction={props.action}
      noRule
    ></UploadCom>,
  ];

  // const userInfo = getItem('userInfo');

  const {
    manufacturer,
    customer_id,
    equipment_id,
    outline_id,
    electricity_user_id,
    electrical_info_id,
    model,
    updated_time,
  } = props.init;

  return (
    <SmartForm
      config={config}
      {...props}
      init={{
        ...props.init,
        outline_id: outline_id ? `${outline_id}` : null,
        customer_id: customer_id ? `${customer_id}` : null,
        electricity_user_id: electricity_user_id
          ? `${electricity_user_id}`
          : null,
        electrical_info_id: electrical_info_id ? `${electrical_info_id}` : null,
        equipment_id: equipment_id ? `${equipment_id}` : null,
        manufacturer: manufacturer ? `${manufacturer}` : null,
        model: model ? `${model}` : null,
        updated_time: updated_time ? moment(updated_time) : null,
        // updated_time: updated_time ? dayjs(updated_time) : null,
        // user: userInfo?.nickname,
      }}
      className={`monitorApprovalForm`}
    ></SmartForm>
  );
};

MonitorApprovalForm.defaultProps = {};

export default MonitorApprovalForm;
