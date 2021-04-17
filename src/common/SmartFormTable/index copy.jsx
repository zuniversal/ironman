import React, { useEffect, useState } from 'react';
import './style.less';
import { Input, Button } from 'antd';
import SmartTable from '@/common/SmartTable';

export const TableInput = props => {
  const { text, record, index, keys } = props;
  return props.record.isEdit ? (
    <Input
      defaultValue={text}
      onChange={e =>
        props.modifyPowerInfo({
          action: 'edit',
          value: e.target.value,
          // keys: 'outline_number',
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

const SmartFormTable = props => {
  const { showModal, edit, remove, tdClick } = props;
  console.log(
    ' %c SmartFormTable 组件 ： ',
    `color: #333; font-weight: bold`,
    props,
  );
  const [data, setData] = useState([{ key: Math.random() }]);

  const dataSource = data;
  const add = () => {
    console.log(' add   ,   ： ', data);
    setData(data => [...data, { key: Math.random() }]);
  };
  const onChange = (e, params) => {
    const { index, key } = params;
    const { value } = e.target;
    console.log(' onChange   e,   ： ', index, key, e, params, value, data);
    setData(data =>
      data.map((v, i) => ({
        ...(i === index
          ? {
              ...v,
              [key]: value,
            }
          : v),
      })),
    );
  };
  console.log(' data   e,   ： ', data);

  const columns = [
    {
      title: '电源编号',
      dataIndex: 'power_number',
      render: (text, record, index, config) => (
        <TableInput
          text={text}
          record={record}
          index={index}
          {...props}
          keys={'power_number'}
          onChange={onChange}
        ></TableInput>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      className: 'actionCol',
      notTooltip: true,
      render: (text, record, index, config) => (
        <>
          <a
            onClick={() => {
              console.log(' record ：, ', props, record, edit);
              add({
                ...record,
                index,
                action: 'add',
              });
            }}
          >
            新增
          </a>
          <a
            onClick={() => {
              console.log(' remove record ： ', props, record, index);
              remove({
                ...record,
                index,
                action: 'remove',
              });
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  return (
    <SmartTable
      columns={columns}
      noActionCol
      {...props}
      // dataSource={dataSource}
      rowKey={'key'}
      className={'smartFormTable'}
      pagination={false}
      title={() => (
        <div className={`fje`}>
          <Button
            type="primary"
            onClick={() => ({ action: 'add' })}
            className={'add'}
          >
            新增
          </Button>
        </div>
      )}
    ></SmartTable>
  );
};

export default SmartFormTable;
