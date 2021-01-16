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

import { onDutyTypeMap } from '@/configs'; //
import SmartTable from '@/common/SmartTable'; //

const ShiftsTransferTable = props => {
  const {
    showModal,
    edit,
    remove,
    tdClick,
    showTransferDetail,
    showDetail,
  } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      className: 'textCenter',
    },
    {
      title: '交班人',
      dataIndex: 'transfer_team',
    },
    {
      title: '接班人',
      dataIndex: 'recieve_team',
    },
    {
      title: '类型',
      dataIndex: 'type',
      dataMap: onDutyTypeMap,
    },
    {
      title: '交接时间',
      dataIndex: 'handover_time',
    },
  ];

  // const extra = (text, record, index, ) => {
  //   console.log(' text, record, index  ： ', text, record, index); //
  //   return (
  //     <>
  //       <a onClick={() => showDetail({ action: 'detail', record: record.id })}>查看</a>
  //     </>
  //   )
  // };
  const extra = (text, record, index, props) => (
    <>
      {/* <a
        onClick={() => {
          console.log(' propsprops ： ', props); //
          showTransferDetail({
            action: 'detail',
            d_id: record[props.rowKey],
            // [d_item]: record[d_item],
            // record,
          });
        }}
      >
        查看
      </a> */}
      <a
        onClick={() =>
          showDetail({ action: 'detail', d_id: record[props.rowKey] })
        }
      >
        查看
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      noDefault
      {...props}
    ></SmartTable>
  );
};

ShiftsTransferTable.defaultProps = {
  tdClick: () => {},
};

export default ShiftsTransferTable;
