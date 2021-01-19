import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';

import SmartTable from '@/common/SmartTable'; //

const MissionsHouseNoTable = props => {
  console.log(
    ' %c MissionsHouseNoTable 组件 this.state, this.props ： ',
    props,
  ); //

  const columns = [
    {
      title: '户号',
      dataIndex: 'number',
      detailFn: record =>
        props.getClientDetailAsync({
          action: 'clientDetailAsync',
          record,
          d_id: record.customer.id,
        }),
      // detailFn: record => props.selectClient({
      //   record,
      // }),
      // props.showItemAsync({
      //   action: 'houseNoDetailAsync',
      //   d_id: record.id,
      // }),
    },
    {
      title: '所属客户',
      dataIndex: ['customer', 'name'],
      detailFn: record =>
        props.getClientDetailAsync({
          action: 'clientDetailAsync',
          record,
          d_id: record.customer.id,
        }),
    },
    {
      title: '地址',
      dataIndex: 'addr',
    },
  ];

  return (
    <SmartTable
      columns={columns}
      rowSelection={null}
      noActionCol
      // pathMap={'missionsManage'}
      pageConfig={{
        size: 'small',
      }}
      onRow={record => {
        return {
          onClick: (event, rest) => {
            console.log(' event, rest, recordrecord ,： ', event, rest, record); //
            props.getClientDetailAsync({
              action: 'clientDetailAsync',
              record,
              d_id: record.customer.id,
            });
          },
        };
      }}
      {...props}
    ></SmartTable>
  );
};

MissionsHouseNoTable.defaultProps = {};

export default MissionsHouseNoTable;
