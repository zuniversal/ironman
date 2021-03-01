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
import { contractTypeMap } from '@/configs';

const ContractTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '所属客户',
      dataIndex: ['customer', 'name'],
      noCutText: true,
      width: 300,
      detailFn: record =>
        props.showItemAsync({
          action: 'clientDetailAsync',
          d_id: record.customer.id,
        }),
    },
    {
      title: '合同编号',
      dataIndex: 'code',
      detailFn: record =>
        props.showItemAsync({
          action: 'contractDetailAsync',
          d_id: record.id,
          id: record.id,
        }),
    },
    {
      title: '业务主体',
      dataIndex: 'business_entity',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'missionsManageDetailAsync',
      //     d_id: record.task.id,
      //   }),
      // link: true,
    },
    {
      title: '业务员',
      dataIndex: ['salesman', 'nickname'],
    },
    {
      title: '合同类型',
      dataIndex: 'type',
      dataMap: contractTypeMap,
    },
    // {
    //   title: '生效日期',
    //   dataIndex: 'entry_date',
    // },
    {
      title: '生效日期',
      dataIndex: 'effective_date',
    },

    {
      title: '失效日期',
      dataIndex: 'end_date',
    },

    // {
    //   title: '户号',
    //   dataIndex: 'customer_id',
    // },
    // {
    //   title: '电站数量',
    //   dataIndex: 'field8',
    // },

    // {
    //   noFilter: true,
    //   title: '操作',
    //   className: 'actionCol',
    //   render: (text, record, index) => {
    //     // console.log(' text, record, index ： ', text, record, index,  )//
    //     return (
    //       <span>
    //         <a onClick={() => showModal('edit', record)}>编辑</a>
    //         <a onClick={() => showModal('remove', record)}>删除</a>
    //       </span>
    //     );
    //   },
    // },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'showPDF',
            extraData: {
              path: `${record.entry_date.split('-')[0]}/${
                record.entry_date.split('-')[1]
              }/${record.code}`,
            },
          })
        }
      >
        查看PDF
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      {...props}
      extra={extra}
      noDefault
    ></SmartTable>
  );
};

ContractTable.defaultProps = {
  // showModal: () => {},
  tdClick: () => {},
  // remove: () => {},
};

export default ContractTable;
