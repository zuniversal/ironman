import React, { useEffect } from 'react';
import useHttp from '@/hooks/useHttp';
import {
  getManufacturerList,
  getList as getMonitorPointList,
} from '@/services/monitorManage';
import SmartForm from '@/common/SmartForm';
import { voltageLevelConfig } from '@/configs';
import { formatSelectList } from '@/utils';

const OutlineForm = props => {
  console.log(' OutlineForm ： ', props); //
  // const { data: monitorPointList, req: getMonitorPointListAsync } = useHttp(
  //   () =>
  //     getMonitorPointList({
  //       get_all: '1',
  //     }),
  //   {
  //   },
  // );

  useEffect(() => {
    console.log(' OutlineForm 副作用 ： ', props); //
  }, [props.powerNumberList]);

  const config = [
    {
      noRule: true,
      colCls: 'hidden',
      itemProps: {
        label: '出线侧编号',
        name: 'id',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '出线侧名称',
        name: 'name',
      },
    },
    {
      formType: 'Search',
      selectData: props.powerNumberList,
      itemProps: {
        label: '电源编号',
        name: 'power_number',
      },
    },
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

export default OutlineForm;
