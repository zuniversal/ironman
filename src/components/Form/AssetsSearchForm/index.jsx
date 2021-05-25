import React, { useState } from 'react';
import './style.less';
import SmartForm, { SearchForm } from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { formatSelectList, filterObjSame } from '@/utils';
import { getRelatived } from '@/services/client';
import { Form } from 'antd';

const AssetsSearchForm = props => {
  const [houseNoList, setHouseNoList] = useState([]);
  const [powerStationList, setPowerStationList] = useState([]);
  const [clientSelectList, setclientSelectList] = useState(null);
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
              houseno: item.value,
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
  console.log(
    ' %c AssetsSearchForm 组件 this.state, this.props ： ',
    `color: #333; font-weight: bold`,
    props,
    clientSelectList,
    houseNoSelectList,
    houseNoList,
    clientList,
  ); //
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
    console.log(' onFieldChange,  , ： ', props, params, params.value);
    if (params.changeKey === 'customer_id' && !params.value.customer_id) {
      // setHouseNoSelectList(null);
      setclientSelectList(null);
      // setPowerStationSelectList(null);
    } else if (
      params.changeKey === 'electricity_user_id' &&
      !params.value.electricity_user_id
    ) {
      setHouseNoSelectList(null);
      // setclientSelectList(null);
      // setPowerStationSelectList(null);
    }
    // props.onFieldChange(params);
  };
  const onClientChange = (params, item) => {
    console.log(' AssetsSearchForm onClientChange  ： ', params, item);
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
      electricity_user_id: powerStationSelectList[0].value,
      electricity_user_id: powerStationSelectList[0].value,
      station: powerStationSelectList[0].value,
    });
    console.log(' form.getFieldsValue(),  ： ', form.getFieldsValue());
    props.getListAsync(form.getFieldsValue());
  };
  const onHouseNoChange = (params, item) => {
    console.log(
      ' AssetsSearchForm onHouseNoChange  ： ',
      params,
      item,
      houseNoList,
      form.getFieldsValue(),
    );
    // sethouseNoList(setPowerStationList);
    // setAssetsList([]);
    // getHouseNoAsync({ customer_id: params });
    // const res = houseNoList.find(v => v.value == params);
    // console.log(' res  houseNoList.filter v ： ', res);
    // const formatRes = formatSelectList(res.stations, 'name');
    // console.log(' res  houseNoList.filter v ： ', res, formatRes);
    // setPowerStationList(formatRes);

    // setPowerStationSelectList(item.stations);
    const res = clientList.filter(v => v.value == item.clientid);
    console.log(' AssetsSearchForm res  clientList.filter v ： ', res);
    setclientSelectList(res);

    form.setFieldsValue({
      customer_id: item.stations[0].clientid,
      electricity_user_id: item.value,
      station: item.stations[0].value,
    });
    console.log(' form.getFieldsValue(),  ： ', form.getFieldsValue());
    props.getListAsync(form.getFieldsValue());
  };
  const onPowerStationChange = (params, item) => {
    console.log(' onPowerStationChange  ： ', params, item);
    // getPowerStationAsync(params);
  };
  console.log(' houseNoList,  ： ', houseNoList);

  const config = [
    {
      formType: 'Search',
      selectData: clientSelectList || clientList,
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
      selectData: houseNoSelectList || houseNoList,
      itemProps: {
        label: '户号',
        name: 'electricity_user_id',
      },
      comProps: {
        onSelect: onHouseNoChange,
      },
    },
    {
      formType: 'Divider',
      itemProps: {
        label: '',
      },
    },
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
  ];

  return (
    <div className={'fsb assetsSearchForm '}>
      <SearchForm
        config={config}
        propsForm={form}
        {...props}
        onFieldChange={onFieldChange}
      ></SearchForm>
    </div>
  );
};

AssetsSearchForm.defaultProps = {};

export default AssetsSearchForm;
