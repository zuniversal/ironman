import React, { useState } from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import { dayHours } from '@/configs';
import useHttp from '@/hooks/useHttp';
import { formatSelectList, filterObjSame } from '@/utils';
import { getRelatived,  } from '@/services/client';
import { getList as getPowerStationList } from '@/services/powerStation';

const InspectMissionForm = props => {
  console.log(' InspectMissionForm ： ', props);
  const { formBtn, ...rest } = props;

  const [stationList, setStationList] = useState([]);
  
  const commonParams = {
    init: [],
    format: res => formatSelectList(res, 'name'),
  };
  const { data: clientList, req: getClientAsync } = useHttp(
    () => getRelatived({ get_all: '1' }),
    {
      ...commonParams,
      withArr: props.action !== 'add'
        ? [
            {
              value: props.init.customer_id,
              label: props.init.customer_name,
            },
          ]
        : [],
    },
  );
  const {
    data: powerStationList,
    req: getPowerStationAsync,
  } = useHttp(getPowerStationList, {
    ...commonParams,
    withArr: props.action !== 'add'
      ? [
          // {
          //   value: props.init.station_id,
          //   label: props.init.station_name,
          // },
        ]
      : [],
  });
  console.log(' powerStationList ： ', powerStationList);

  const onClientChange = (params, rest) => {
    console.log(' onClientChange  ： ', params, rest);
    const res = clientList.find(v => v.value == params);
    const formatRes = formatSelectList(res.electricity_users.map(v => v.stations[0]));
    console.log(' res  clientList.filter v ： ', res, formatRes);
    props.propsForm.setFieldsValue({
      station_id: null,
    });
    setStationList(formatRes);
  };

  const onPowerStationChange = (params, rest) => {
    console.log(' onPowerStationChange  ： ', params, rest);
    const res = powerStationList.find(v => v.id == params)?.customer;
    console.log(' res  onPowerStationChange.filter v ： ', res, );
    // if (res && stationList.length == 0) {
    if (res) {
      props.propsForm.setFieldsValue({
        customer_id: `${res.id}`,
      });
    }
  };

  const config = [
    {
      // formType: 'Search',
      // selectSearch: props.getClientAsync,
      // selectData: props.clientList,
      formType: 'Search',
      selectData: clientList,
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
      selectSearch: props.getPowerAsync,
      selectSearch: e =>
        getPowerStationAsync(() => getPowerStationList({ name: e })),
      selectData: filterObjSame(
        [
          // ...stationList.length ? stationList : powerStationList,
          ...stationList,
          ...powerStationList,
          // {
          //   value: props.init.station_id,
          //   label: props.init.customer_name,
          // },
        ],
        'value',
      ),
      itemProps: {
        label: '电站',
        name: 'station_id',
      },
      comProps: {
        onSelect: onPowerStationChange,
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '班组',
        name: 'team_id',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '执行日期',
        name: 'work_date',
      },
    },
    {
      formType: 'Search',
      selectData: dayHours,
      itemProps: {
        label: '执行时间',
        name: 'work_time',
      },
      // comProps: {
      //   mode: 'multiple',
      // },
    },
  ];

  return (
    <div className={' InspectMissionForm '}>
      <SmartForm config={config} {...rest}></SmartForm>
    </div>
  );
};

InspectMissionForm.defaultProps = {};

export default InspectMissionForm;
