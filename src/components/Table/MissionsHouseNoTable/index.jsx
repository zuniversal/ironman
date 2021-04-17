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

import SmartTable from '@/common/SmartTable';

const MissionsHouseNoTable = props => {
  console.log(
    ' %c MissionsHouseNoTable 组件 this.state, this.props ： ',
    props,
  );

  const columns = [
    {
      title: '所属客户',
      // dataIndex: ['customer', 'name'],
      dataIndex: 'name',
      className: 'linkTd',
      // detailFn: record =>
      //   props.getClientDetailAsync({
      //     action: 'clientDetailAsync',
      //     record,
      //     d_id: record.customer.id,
      //   }),
    },
    {
      title: '户号',
      dataIndex: 'number',
      className: 'linkTd',
      // detailFn: record =>
      //   props.getClientDetailAsync({
      //     action: 'clientDetailAsync',
      //     record,
      //     d_id: record.customer.id,
      //   }),
      // detailFn: record => props.selectClient({
      //   record,
      // }),
      // props.showItemAsync({
      //   action: 'houseNoDetailAsync',
      //   d_id: record.id,
      // }),
    },
    {
      title: '地址',
      dataIndex: 'addr',
      // dataIndex: ['enterprise', 'address'],
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
      rowKey={'customer_id'}
      onRow={record => {
        return {
          onClick: (event, rest) => {
            console.log(' event, rest, recordrecord ,： ', event, rest, record);
            props.getClientDetailAsync({
              // props.getClientItemAsync({
              action: 'clientDetailAsync',
              // record,
              // d_id: record.customer.id,
              // d_id: record.id,
              d_id: record.customer_id,
              ele_user_id: record.ele_user_id,
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
