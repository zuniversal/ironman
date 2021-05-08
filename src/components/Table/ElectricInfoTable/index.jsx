import React, { useState, useEffect } from 'react';
import * as monitorManageServices from '@/services/monitorManage';
import './style.less';

import MonitorManageTable from '@/components/Table/MonitorManageTable';

const ElectricInfoTable = props => {
  const [dataList, setDataList] = useState();
  console.log(' ElectricInfoTableElectricInfoTable,   , ： ', props);
  const getListAsync = async () => {
    const res = await monitorManageServices.getList({
      keyword: props.houseNo,
    });
    console.log(' ElectricInfoTable ElectricInfoTableres,  , ： ', res);
    setDataList(res.list);
  };
  useEffect(() => {
    console.log(' ElectricInfoTableElectricInfoTable, 副作用  , ： ', props);
    // .then(res => {
    //   console.log(' ElectricInfoTableres,  , ： ', res);
    // })
    if (props.houseNo) {
      getListAsync();
    }
  }, [props.houseNo]);
  console.log(' ElectricInfoTableres, dataList , ： ', dataList);

  return (
    <MonitorManageTable
      noDefault
      {...props}
      dataSource={dataList}
    ></MonitorManageTable>
  );
};

ElectricInfoTable.defaultProps = {};

export default ElectricInfoTable;
