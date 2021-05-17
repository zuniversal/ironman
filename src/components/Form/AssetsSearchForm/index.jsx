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
  const [clientSelectList, setclientSelectList] = useState([]);
  const [houseNoSelectList, setHouseNoSelectList] = useState([]);
  const [powerStationSelectList, setPowerStationSelectList] = useState([]);
  const [form] = Form.useForm();

  const { data: clientList } = useHttp(() => getRelatived({ get_all: '1' }), {
    format: res => {
      const data = formatSelectList(res);
      console.log(' AssetsSearchForm data ：', data); //
      const powerStationList = [];
      const houseNoList = [];
      data.forEach(v => houseNoList.push(...v.electricity_users));
      houseNoList.forEach(v => powerStationList.push(...v.stations));
      console.log(
        ' AssetsSearchForm res  data.map v ： ',
        houseNoList,
        powerStationList,
      );
      setHouseNoList(formatSelectList(houseNoList, 'number'));
      setPowerStationList(formatSelectList(powerStationList));
      return data;
    },
  });
  console.log(
    ' AssetsSearchForm   XXX ： ',
    props,
    clientList,
    houseNoList,
    powerStationList,
  );
  const onClientChange = (params, rest) => {
    console.log(' onClientChange  ： ', props, params, rest);
    // const res = clientList.find(v => v.value == params);
    // const formatRes = formatSelectList(res.electricity_users, 'number');
    // console.log(' res  clientList.filter v ： ', res, formatRes);
    // setHouseNoList(formatRes);
    // setPowerStationList([]);
    // setAssetsList([]);
    // getClientAsync({ name: params });
  };
  const onHouseNoChange = (params, rest) => {
    console.log(
      ' onHouseNoChange  ： ',
      params,
      rest,
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
  };
  const onPowerStationChange = (params, rest) => {
    console.log(' onPowerStationChange  ： ', params, rest);
    // getPowerStationAsync(params);
  };

  const config = [
    {
      formType: 'Select',
      selectData: clientList,
      itemProps: {
        label: '客户',
        name: 'customer',
      },
      comProps: {
        onSelect: onClientChange,
      },
    },
    {
      formType: 'Select',
      selectData: houseNoList,
      itemProps: {
        label: '户号',
        name: 'power_number',
      },
      comProps: {
        onSelect: onHouseNoChange,
      },
    },
    {
      formType: 'Select',
      selectData: powerStationList,
      itemProps: {
        label: '电站',
        // name: 'station',
        name: 'powerStation',
      },
      comProps: {
        onSelect: onPowerStationChange,
      },
    },
  ];

  return (
    <div className={'fsb assetsSearchForm '}>
      <SearchForm config={config} propsForm={form} {...props}></SearchForm>
    </div>
  );
};

AssetsSearchForm.defaultProps = {};

export default AssetsSearchForm;
