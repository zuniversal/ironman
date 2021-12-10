import React from 'react';
import './style.less';
import SmartTable from '@/common/SmartTable';
import { history } from 'umi';

const ClientSimpleTable = props => {
  const columns = [
    {
      noCutText: true,
      // width: 400,
      title: '客户 (点击客户显示对应客户资产)',
      dataIndex: 'name',
      detailFn: record =>
        props.getAssetListAsync({
          action: 'getAssetListAsync',
          customer_id: record.value,
          electricity_user_id: `${record.electricity_users[0].id}`,
        }),
    },
  ];

  return (
    <SmartTable
      columns={columns}
      noActionCol
      className="clientSimpleTable"
      {...props}
    ></SmartTable>
  );
};

export default ClientSimpleTable;
