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

const VisitManageRecordTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: '',
    },
    {
      title: '客户',
      dataIndex: '',
    },
    {
      title: '客户名称',
      dataIndex: '',
    },
    {
      title: '客户电话',
      dataIndex: '',
    },
    {
      title: '类型',
      dataIndex: '',
    },
    {
      title: '客服',
      dataIndex: '',
    },
    {
      title: '关联任务id',
      dataIndex: '',
    },
    {
      title: '开始时间',
      dataIndex: '',
    },
    {
      title: '完成日期',
      dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'complete',
            d_id: record.id,
          })
        }
      >
        查看结果
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

VisitManageRecordTable.defaultProps = {
  tdClick: () => {},
};

export default VisitManageRecordTable;
