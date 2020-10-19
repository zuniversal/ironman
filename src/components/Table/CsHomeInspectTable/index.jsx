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
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
} from 'antd';

import SmartTable from '@/common/SmartTable'; //

const CsHomeInspectTable = props => {
  console.log(' CsHomeInspectTable  ： ', props); //
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '巡检ID',
    },
    {
      title: '巡检名称',
    },
    {
      title: '巡检状态',
    },
    {
      title: '巡检人',
    },
    {
      title: '完成时间',
    },
    {
      title: '巡检结果',
    },
    {
      title: '是否有缺陷登记',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <div>处理</div>
      <a
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
        查看缺陷
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      extra={extra}
      noDefault
      {...props}
    ></SmartTable>
  );
};

CsHomeInspectTable.defaultProps = {
  tdClick: () => {},
};

export default CsHomeInspectTable;
