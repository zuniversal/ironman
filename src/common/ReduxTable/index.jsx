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
import { Input, Button } from 'antd';

import SmartTable from '@/common/SmartTable'; //
import { tips } from '@/utils';

export const TableInput = props => {
  const { text, record, index, keys } = props; //
  // console.log(
  //   ' %c TableInput 组件 ： ',
  //   `color: #333; font-weight: bold`,
  //   props,
  // ); //
  return props.record.isEdit ? (
    <Input
      defaultValue={text}
      onChange={e =>
        props.modifyTableItem({
          action: 'edit',
          value: e.target.value,
          keys: keys,
          text,
          ...record,
          index,
        })
      }
    ></Input>
  ) : (
    text
  );
};

const ReduxTable = props => {
  const { edit, remove, config } = props; //
  console.log(
    ' %c ReduxTable 组件 ： ',
    `color: #333; font-weight: bold`,
    props,
  ); //

  const columns = config.map(v => ({
    title: v.label,
    dataIndex: v.name,
    render: (text, record, index, config) => (
      <div>
        <TableInput
          text={text}
          record={record}
          index={index}
          {...props}
          keys={v.name}
        ></TableInput>
      </div>
    ),
  }));

  columns.push({
    title: '操作',
    dataIndex: 'action',
    className: 'actionCol',
    notTooltip: true,
    render: (text, record, index, config) => (
      <>
        <a
          onClick={() => {
            console.log(' record ：, ', props, record, edit); //
            // const fn = record.id && record.isEdit
            let fn = '';
            if (!record.id) {
              fn = 'addTableItemAsync';
              //  fn = record.isEdit
              //  ? 'editTableItemAsync'
              //  :'addTableItemAsync'
            } else {
              fn = record.isEdit ? 'editTableItemAsync' : 'modifyTableItem';
            }

            // const fn = 'editTableItemAsync';
            props[fn]({
              ...record,
              index,
              d_id: record.id,
              action: 'edit',
              // powerstation: props.init.id,
            });
          }}
        >
          {record.isEdit ? '保存' : '编辑'}
        </a>
        <a
          onClick={() => {
            console.log(' remove record ： ', props, record, index); //
            const removeFn = record.id
              ? 'removeTableItemAsync'
              : 'modifyTableItem';
            // const removeFn = 'removeTableItemAsync';
            props[removeFn]({
              ...record,
              index,
              id: `${record.id}`,
              // action: record.id ? 'remove' : 'localRemove',
              action: 'remove',
            });
          }}
        >
          删除
        </a>
      </>
    ),
  });

  return (
    <SmartTable
      columns={columns}
      noActionCol
      {...props}
      // dataSource={dataSource}
      rowKey={'key'}
      className={'reduxTable modalTable'}
      pagination={false}
      title={() => (
        <div className={`fje`}>
          <Button
            type="primary"
            onClick={() => {
              console.log(
                '  对吗  props.dataSource.filter((v) => v.isEdit).length < 2 ',
                props.dataSource.filter(v => v.isEdit),
              );
              if (props.dataSource.filter(v => v.isEdit).length < 1) {
                props.modifyTableItem({ action: 'add' });
              } else {
                tips('请先保存上一条数据！', 2);
              }
            }}
            className={'add'}
          >
            新增
          </Button>
        </div>
      )}
    ></SmartTable>
  );
};

ReduxTable.defaultProps = {
  dataSource: [],
};

export default ReduxTable; //