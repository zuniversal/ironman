import React from 'react';
import './style.less';
import SmartTable from '@/common/SmartTable';
import { cameraTypeMap } from '@/configs';

const cameraCommonCol = [
  {
    title: '摄像头名称',
    dataIndex: 'name',
  },
  {
    title: '摄像头编号',
    dataIndex: 'deviceSerial',
  },
  {
    title: '平台',
    dataIndex: 'system_name',
    // dataMap: cameraTypeMap,
  },
];

export const FixedCameraConfigTable = props => {
  const columns = [
    ...cameraCommonCol,
    {
      title: '所属电站',
      dataIndex: ['station', 'name'],
    },
    {
      title: '客户',
      dataIndex: ['customer', 'name'],
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          props.getCameraVideoAsync({
            action: 'showCameraVideo',
            d_id: record.id,
            // d_id: 37,
            extraPayload: record,
            type: 1,
          });
        }}
      >
        查看视频
      </a>
    </>
  );

  return <SmartTable columns={columns} extra={extra} {...props}></SmartTable>;
};

export const HeadCameraConfigTable = props => {
  const columns = [
    ...cameraCommonCol,
    {
      title: '电工名字',
      dataIndex: ['user', 'name'],
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          props.getCameraVideoAsync({
            action: 'showCameraVideo',
            d_id: record.id,
            // d_id: 37,
            extraPayload: record,
            type: 1,
          });
        }}
      >
        查看视频
      </a>
    </>
  );

  return <SmartTable columns={columns} extra={extra} {...props}></SmartTable>;
};
