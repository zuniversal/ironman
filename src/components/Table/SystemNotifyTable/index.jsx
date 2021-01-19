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

const WeakTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '通知',
      dataIndex: 'verb',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'detail',
            d_id: record.id,
          })
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

WeakTable.defaultProps = {
  tdClick: () => {},
};

export default WeakTable;
