import React, { useState } from 'react';
import './style.less';
import SmartForm, { SearchForm } from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { formatSelectList, filterObjSame } from '@/utils';
import { getRelatived, getClientPower } from '@/services/client';
import { Form } from 'antd';

const AssetsSearchForm = props => {
  console.log(
    ' %c AssetsSearchForm 组件 this.state, this.props ： ',
    `color: #333; font-weight: bold`,
    props,
  ); //
  const [houseNoList, setHouseNoList] = useState([]);
  const [powerStationList, setPowerStationList] = useState([]);
  const [clientSelectList, setclientSelectList] = useState([]);
  const [houseNoSelectList, setHouseNoSelectList] = useState(null);
  const [powerStationSelectList, setPowerStationSelectList] = useState(null);
  const [form] = Form.useForm();

  const { data: clientList } = useHttp(() => getRelatived({ get_all: '1' }), {
    format: res => {
      const data = formatSelectList(res).map(v => ({
        ...v,
        electricity_users: formatSelectList(v.electricity_users, 'number').map(
          item => ({
            ...item,
            clientid: v.value,
            stations: formatSelectList(item.stations).map(items => ({
              ...items,
              clientid: v.value,
              houseno: item.number,
            })),
          }),
        ),
      }));
      // console.log(' AssetsSearchForm data ：', data); //
      const powerStationList = [];
      const houseNoList = [];
      data.forEach(v => houseNoList.push(...v.electricity_users));
      houseNoList.forEach(v => powerStationList.push(...v.stations));
      setHouseNoList(houseNoList);
      setPowerStationList(powerStationList);
      return data;
    },
  });
  // console.log(
  //   ' AssetsSearchForm   XXX ： ',
  //   props,
  //   clientList,
  //   houseNoList,
  //   powerStationList,
  //   houseNoSelectList,
  //   powerStationSelectList,
  // );
  const onFieldChange = params => {
    console.log(' onFieldChange,  , ： ', params);
    if (params.changeKey === 'customer' && !params.value.customer) {
      setHouseNoSelectList(null);
      setPowerStationSelectList(null);
    } else if (
      params.changeKey === 'power_number' &&
      !params.value.power_number
    ) {
      setHouseNoSelectList(null);
      setPowerStationSelectList(null);
    }
    props.onFieldChange(params);
  };
  const onClientChange = (params, item) => {
    console.log(' onClientChange  ： ', params, item);
    // const res = clientList.find(v => v.value == params);
    // const formatRes = formatSelectList(res.electricity_users, 'number');
    // console.log(' res  clientList.filter v ： ', res, formatRes);
    // setHouseNoList(formatRes);
    // setPowerStationList([]);
    // setAssetsList([]);
    // getClientAsync({ name: params });
    const powerStationSelectList = [];
    item.electricity_users.forEach(v =>
      powerStationSelectList.push(...v.stations),
    );
    console.log(
      ' houseNoSelectList, powerStationSelectList ： ',
      powerStationSelectList,
    ); //
    setHouseNoSelectList(item.electricity_users);
    setPowerStationSelectList(powerStationSelectList);
    form.setFieldsValue({
      power_number: powerStationSelectList[0].houseno,
      station: powerStationSelectList[0].value,
    });
  };
  const onHouseNoChange = (params, item) => {
    console.log(
      ' onHouseNoChange  ： ',
      params,
      item,
      houseNoList,
      form.getFieldsValue(),
    );
    // sethouseNoList(setPowerStationList);
    // setAssetsList([]);
    // getHouseNoAsync({ customer: params });
    // const res = houseNoList.find(v => v.value == params);
    // console.log(' res  houseNoList.filter v ： ', res);
    // const formatRes = formatSelectList(res.stations, 'name');
    // console.log(' res  houseNoList.filter v ： ', res, formatRes);
    // setPowerStationList(formatRes);
    setPowerStationSelectList(item.stations);
    form.setFieldsValue({
      customer: item.stations[0].clientid,
      power_number: item.stations[0].houseno,
      station: item.stations[0].value,
    });
  };
  const onPowerStationChange = (params, item) => {
    console.log(' onPowerStationChange  ： ', params, item);
    // getPowerStationAsync(params);
  };

  const { data: clientPowerList, req: getClientAsync } = useHttp(
    getClientPower,
    {
      format: res => formatSelectList(res, 'customer_name', 'customer_id'),
    },
  );
  // console.log('    clientPowerList ： ', clientPowerList);

  const onClientSelect = (params, item) => {
    console.log(' onClientSelect  ： ', params, item);
    props.getListAsync({
      electricity_user_id: item.electricity_user_id,
      customer_id: item.customer_id,
    });
  };

  const config = [
    // {
    //   formType: 'Select',
    //   selectData: clientList,
    //   itemProps: {
    //     label: '客户',
    //     name: 'customer',
    //   },
    //   comProps: {
    //     onSelect: onClientChange,
    //   },
    // },
    // {
    //   formType: 'Select',
    //   selectData: houseNoSelectList ?? houseNoList,
    //   itemProps: {
    //     label: '户号',
    //     name: 'power_number',
    //   },
    //   comProps: {
    //     onSelect: onHouseNoChange,
    //   },
    // },
    // {
    //   formType: 'Select',
    //   selectData: powerStationSelectList ?? powerStationList,
    //   itemProps: {
    //     label: '电站',
    //     name: 'station',
    //   },
    //   comProps: {
    //     onSelect: onPowerStationChange,
    //   },
    // },
    {
      formType: 'Search',
      selectData: clientPowerList,
      itemProps: {
        label: '客户',
        name: 'customer_id',
      },
      comProps: {
        onSelect: onClientSelect,
      },
    },
    {
      formType: 'Divider',
      itemProps: {
        label: '',
      },
    },
  ];

  return (
    <div className={'fsb assetsSearchForm '}>
      <SearchForm
        config={config}
        propsForm={form}
        {...props}
        // key={props.init}
        // onFieldChange={onFieldChange}
      ></SearchForm>
    </div>
  );
};

AssetsSearchForm.defaultProps = {};

export default AssetsSearchForm;
