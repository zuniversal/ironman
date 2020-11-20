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

export const DeviceInfoTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '设备编号',
      dataIndex: '',
    },
    {
      title: '设备名称',
      dataIndex: '',
    },
    {
      // title: '电压容量',
      title: '变压容量',
      dataIndex: '',
    },
    {
      title: '实际使用用量',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
  ];

  return (
    <SmartTable
      noActionCol
      columns={columns}
      rowLength={1}
      {...props}
    ></SmartTable>
  );
};

export const WatchInfoTable = props => {
  const { showModal, edit, remove, tdClick } = props; //

  const columns = [
    {
      title: '监控点编号',
      dataIndex: '',
    },
    {
      title: '监控点名称',
      dataIndex: '',
    },
    {
      // title: '统计数量',
      // render: (text, record, index) => <a onClick={() => tdClick({action: 'detail'})}>{text}</a>,
      title: '监控设备',
      dataIndex: '',
    },
    {
      title: '状态',
      dataIndex: '',
    },
    {
      title: '备注',
      dataIndex: '',
    },
  ];

  return (
    <SmartTable
      noActionCol
      columns={columns}
      rowLength={1}
      {...props}
    ></SmartTable>
  );
};

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

export const PowerStationDetailTable = props => {
  const { showModal, edit, remove, tdClick } = props; //
  console.log(
    ' %c PowerStationDetailTable 组件 ： ',
    `color: #333; font-weight: bold`,
    props,
  ); //
  // const [powerData, setPowerData] = useState([{ key: Math.random() }]);

  // const dataSource = powerData;
  // const add = () => {
  //   console.log(' add   ,   ： ', powerData);
  //   setPowerData(powerData => [...powerData, { key: Math.random() }]);
  // };
  // const onChange = (e, params) => {
  //   const { index, key } = params;
  //   const { value } = e.target;
  //   console.log(
  //     ' onChange   e,   ： ',
  //     index,
  //     key,
  //     e,
  //     params,
  //     value,
  //     powerData,
  //   );
  //   setPowerData(powerData =>
  //     powerData.map((v, i) => ({
  //       ...(i === index
  //         ? {
  //             ...v,
  //             [key]: value,
  //           }
  //         : v),
  //     })),
  //   );
  // };
  // console.log(' powerData   e,   ： ', powerData);

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
        ></TableInput>
      ),
    },
    {
      title: '电表号',
      dataIndex: 'meter_number',
      render: (text, record, index, config) => (
        <TableInput
          text={text}
          record={record}
          index={index}
          {...props}
          keys={'meter_number'}
        ></TableInput>
      ),
    },
    {
      title: '进线名称',
      dataIndex: 'incoming_line_name',
      render: (text, record, index, config) => (
        <TableInput
          text={text}
          record={record}
          index={index}
          {...props}
          keys={'incoming_line_name'}
        ></TableInput>
      ),
    },
    {
      title: '倍率',
      dataIndex: 'magnification',
      render: (text, record, index, config) => (
        <TableInput
          text={text}
          record={record}
          index={index}
          {...props}
          keys={'magnification'}
        ></TableInput>
      ),
    },
    {
      title: '装接容量',
      dataIndex: 'transformer_capacity',
      render: (text, record, index, config) => (
        <TableInput
          text={text}
          record={record}
          index={index}
          {...props}
          keys={'transformer_capacity'}
        ></TableInput>
      ),
    },
    {
      title: '实际容量',
      dataIndex: 'real_capacity',
      render: (text, record, index, config) => (
        <TableInput
          text={text}
          record={record}
          index={index}
          {...props}
          keys={'real_capacity'}
        ></TableInput>
      ),
    },
    {
      title: '出线侧设备数',
      dataIndex: 'outline_number',
      render: (text, record, index, config) => (
        <TableInput
          text={text}
          record={record}
          index={index}
          {...props}
          keys={'outline_number'}
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
              console.log(' record ：, ', props, record, edit); //
              // const fn = record.id && record.isEdit
              let fn = '';
              if (!record.id) {
                fn = 'addPowerInfoAsync';
                //  fn = record.isEdit
                //  ? 'editPowerInfoAsync'
                //  :'addPowerInfoAsync'
              } else {
                fn = record.isEdit ? 'editPowerInfoAsync' : 'modifyPowerInfo';
              }

              // const fn = 'editPowerInfoAsync';
              props[fn]({
                ...record,
                index,
                d_id: record.id,
                action: 'edit',
                powerstation: props.init.id,
              });
            }}
          >
            {record.isEdit ? '保存' : '编辑'}
          </a>
          <a
            onClick={() => {
              console.log(' remove record ： ', props, record, index); //
              const removeFn = record.id
                ? 'removePowerInfoAsync'
                : 'modifyPowerInfo';
              // const removeFn = 'removePowerInfoAsync';
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
    },
  ];

  return (
    <SmartTable
      columns={columns}
      noActionCol
      {...props}
      // dataSource={dataSource}
      rowKey={'key'}
      className={'powerStationDetailTable modalTable'}
      // rowLength={3}
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
                props.modifyPowerInfo({ action: 'add' });
              } else {
                tips('请先保存上一条数据！', 2);
              }
            }}
            className={'add'}
          >
            新增电源
          </Button>
          {/* <Button type="primary" onClick={() => props.savePowerInfoAsync(dataSource)}> */}
          {/* <Button type="primary" onClick={props.addPowerInfoAsync}>
            保存
          </Button> */}
        </div>
      )}
    ></SmartTable>
  );
};
