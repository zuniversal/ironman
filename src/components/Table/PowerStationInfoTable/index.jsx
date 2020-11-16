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

export const PowerStationDetailTable = props => {
  const { showModal, edit, remove, tdClick } = props; //
  const [powerData, setPowerData] = useState([{ key: Math.random() }]);

  const dataSource = powerData;
  const add = () => {
    console.log(' add   ,   ： ', powerData);
    setPowerData(powerData => [...powerData, { key: Math.random() }]);
  };
  const onChange = (e, params) => {
    const { index, key } = params;
    const { value } = e.target;
    console.log(
      ' onChange   e,   ： ',
      index,
      key,
      e,
      params,
      value,
      powerData,
    );
    setPowerData(powerData =>
      powerData.map((v, i) => ({
        ...(i === index
          ? {
              ...v,
              [key]: value,
            }
          : v),
      })),
    );
  };
  console.log(' powerData   e,   ： ', powerData);
  const inputRender = (text, record, index, config) => (
    <Input
      onChange={e => onChange(e, { text, record, index, key: 'power_number' })}
    ></Input>
  );

  const columns = [
    {
      title: '电源编号',
      dataIndex: 'power_number',
      render: (text, record, index, config) => (
        <Input
          onChange={e =>
            onChange(e, { text, record, index, key: 'power_number' })
          }
        ></Input>
      ),
    },
    {
      title: '电表号',
      dataIndex: 'meter_number',
      render: (text, record, index, config) => (
        <Input
          onChange={e => onChange(e, { text, record, index, key: 'biao' })}
        ></Input>
      ),
    },
    {
      title: '进线名称',
      dataIndex: 'incoming_line_name',
      render: (text, record, index, config) => (
        <Input
          onChange={e =>
            onChange(e, { text, record, index, key: 'incoming_line_name' })
          }
        ></Input>
      ),
    },
    {
      title: '倍率',
      dataIndex: 'magnification',
      render: (text, record, index, config) => (
        <Input
          onChange={e =>
            onChange(e, { text, record, index, key: 'magnification' })
          }
        ></Input>
      ),
    },
    {
      title: '装接容量',
      dataIndex: 'transformer_capacity',
      render: (text, record, index, config) => (
        <Input
          onChange={e =>
            onChange(e, { text, record, index, key: 'transformer_capacity' })
          }
        ></Input>
      ),
    },
    {
      title: '实际容量',
      dataIndex: 'real_capacity',
      render: (text, record, index, config) => (
        <Input
          onChange={e =>
            onChange(e, { text, record, index, key: 'real_capacity' })
          }
        ></Input>
      ),
    },
    {
      title: '出线侧设备数',
      dataIndex: 'outline_number',
      render: (text, record, index, config) => (
        <Input
          onChange={e =>
            onChange(e, { text, record, index, key: 'outline_number' })
          }
        ></Input>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record, index, config) => (
        <>
          <a
            onClick={() => {
              console.log(' record ： ', props, record, edit); //
              props.editPowerInfo({
                action: 'add',
                ...record,
              });
            }}
          >
            编辑
          </a>
          <a onClick={() => editPowerInfo({ action: 'remove', ...record })}>
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
      dataSource={dataSource}
      rowKey={'key'}
      className={'powerStationDetailTable'}
      // rowLength={3}
      title={() => (
        <div className={`fje`}>
          <Button type="primary" onClick={add} className={'add'}>
            新增电源
          </Button>
          <Button type="primary" onClick={() => props.save(dataSource)}>
            保存
          </Button>
        </div>
      )}
    ></SmartTable>
  );
};
