import React from 'react';
import SmartTable from '@/common/SmartTable';
import { cameraSystemMap } from '@/configs';

const PlatformConfigTable = props => {
  const columns = [
    {
      title: '平台名称',
      dataIndex: 'name',
    },
    {
      title: '平台类型',
      dataIndex: 'system',
      dataMap: cameraSystemMap,
    },
    // {
    //   title: '平台地址',
    //   dataIndex: '',
    //   // detailFn: record => props.showItemAsync({
    //   //     action: 'clientDetailAsync',
    //   //     d_id: record.id,
    //   //   }),
    // },
  ];

  return (
    <SmartTable
      columns={columns}
      //  noActionCol
      {...props}
    ></SmartTable>
  );
};

export default PlatformConfigTable;
