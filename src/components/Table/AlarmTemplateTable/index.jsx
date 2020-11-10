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

const AlarmTemplateTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '名称',
    },

    // {
    //   title: 'id',
    // },
    // {
    //   title: '通知方法',
    // },
  ];

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}

      {...props}
    ></SmartTable>
  );
};

AlarmTemplateTable.defaultProps = {
  tdClick: () => {},
};

export default AlarmTemplateTable;
