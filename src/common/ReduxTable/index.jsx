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
  const { text, record, index, keys, config } = props; //
  // console.log(
  //   ' %c TableInput 组件 ： ',
  //   `color: #333; font-weight: bold`,
  //   props,
  // ); //
  // return props.record.isEdit && config.noEdit ? (
  return props.record.isEdit && keys !== 'id' ? (
    <Input
      allowClear
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
  const { edit, remove, config, isDisabledAll } = props; //
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
          config={config}
        ></TableInput>
      </div>
    ),
  }));

  if (!isDisabledAll) {
    columns.push({
      title: '操作',
      dataIndex: 'action',
      className: 'actionCol',
      notTooltip: true,
      render: (text, record, index, config) => (
        <>
          {!props.hideSaveEdit && (
            <a
              onClick={() => {
                console.log(' record ：, ', props, config, record, edit); //
                if (isDisabledAll) {
                  return;
                }

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
          )}
          <a
            onClick={() => {
              console.log(' remove record ： ', props, record, index); //
              if (isDisabledAll) {
                return;
              }
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
  }

  return (
    <SmartTable
      columns={columns}
      noActionCol
      {...props}
      // dataSource={dataSource}
      rowKey={'key'}
      className={'reduxTable modalTable'}
      pagination={false}
      rowSelection={null}
      title={() => {
        return (
          <div className={`fje`}>
            {props.titleCom}
            {!isDisabledAll && !props.hideAdd && (
              <Button
                type="primary"
                onClick={() => {
                  console.log(
                    '  对吗  props.dataSource.filter((v) => v.isEdit).length < 2 ',
                    props.dataSource,
                    props,
                  );
                  if (isDisabledAll) {
                    return;
                  }
                  if (props.noLimitAdd) {
                    props.modifyTableItem({ action: 'add' });
                    return;
                  }
                  if (props.dataSource.filter(v => v.isEdit).length < 1) {
                    props.modifyTableItem({ action: 'add' });
                  } else {
                    tips('请先保存上一条数据！', 2);
                  }
                }}
                className={'add'}
              >
                {props.addText}
              </Button>
            )}
          </div>
        );
      }}
    ></SmartTable>
  );
};

ReduxTable.defaultProps = {
  dataSource: [],
  noLimitAdd: false,
  hideAdd: false,
  hideSaveEdit: false,
  modifyTableItem: () => {},
  addText: '新增',
};

export default ReduxTable; //
