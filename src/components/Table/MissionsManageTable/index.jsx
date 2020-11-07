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
import { missionsTypeMap, missionsStatusMap } from '@/configs';

const MissionsManageTable = props => {
  console.log(' MissionsManageTable  ： ', props); //
  const {
    showModal,
    edit,
    remove,
    tdClick,
    startWorkOrder,
    linkContract,
    schedule,
    confirmSchedule,
  } = props; //

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      className: 'textCenter',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '客户',
      // dataIndex: 'customer',
      dataIndex: ['customer', 'name'],
    },
    {
      title: '任务类型',
      dataIndex: 'type',
      dataMap: missionsTypeMap,
    },
    {
      title: '关联合同',
      dataIndex: 'contacts',
      // dataIndex: ['contract', 'code'],
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      dataMap: missionsStatusMap,
    },
    {
      title: '发起工单数',
      dataIndex: '',
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
    },
    {
      title: '客户确认',
      dataIndex: 'confirm',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.edit({ action: 'startWorkOrder', d_id: record.id })
        }
      >
        发起工单
      </a>
      {record.status === 'waiting_plan' && (
        <a
          onClick={() =>
            props.edit({
              action: 'schedule',
              d_id: record.id,
              itemDetail: record,
            })
          }
        >
          排期
        </a>
      )}
      {record.status === 'waiting_confirm' && (
        <a
          onClick={() =>
            props.edit({
              action: 'confirmSchedule',
              d_id: record.id,
              itemDetail: record,
            })
          }
        >
          确认排期
        </a>
      )}
      {!record.finished_tag && (
        <a
          onClick={() =>
            props.showFormModal({
              action: 'closeMission',
              d_id: record.id,
              itemDetail: record,
            })
          }
        >
          关闭任务
        </a>
      )}
      <a
        onClick={() =>
          props.edit({
            action: 'linkContract',
            d_id: record.id,
            itemDetail: record,
          })
        }
      >
        关联合同
      </a>

      {(record.type === 'power_construction' ||
        record.type === 'electrical_testing') &&
        record.status !== 'waiting_plan' && (
          <a disabled className={`disabled `}>
            已排期
          </a>
        )}
      {(record.type === 'power_construction' ||
        record.type === 'electrical_testing') &&
        record.status !== 'waiting_plan' &&
          record.status !== 'waiting_confirm' && (
          <a disabled className={`disabled `}>
            已确认排期
          </a>
        )}
      {record.status === 'completed' && (
        <a disabled className={`disabled `}>
          已关闭
        </a>
      )}
    </>
  );

  return (
    <SmartTable
      columns={columns}
      // dataSource={noCalculateList}
      // rowKey={'source_no'}
      extra={extra}
      isQRCode
      noDefault
      {...props}
    ></SmartTable>
  );
};

MissionsManageTable.defaultProps = {
  tdClick: () => {},
};

export default MissionsManageTable;
