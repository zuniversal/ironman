import React from 'react';
import './style.less';
import SmartTable from '@/common/SmartTable';

export const FixedCameraConfigTable = props => {
  const columns = [
    {
      title: '摄像头名称',
      dataIndex: '',
    },
    {
      title: '摄像头编号',
      dataIndex: '',
    },
    {
      title: '类型',
      dataIndex: '',
    },
    {
      title: '所属电站',
      dataIndex: '',
    },
    {
      title: '客户',
      dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          props.showFormModal({
            action: 'showVideoAsync',
            d_id: record.id,
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
    {
      title: '摄像头名称',
      dataIndex: '',
    },
    {
      title: '摄像头编号',
      dataIndex: '',
    },
    {
      title: '类型',
      dataIndex: '',
    },
    {
      title: '电工名字',
      dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() => {
          props.showFormModal({
            action: 'showVideoAsync',
            d_id: record.id,
          });
        }}
      >
        查看视频
      </a>
    </>
  );

  return <SmartTable columns={columns} extra={extra} {...props}></SmartTable>;
};
