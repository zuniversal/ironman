import React from 'react';
import SmartTable from '@/common/SmartTable';

export const ClientListPrivateTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'customer_idid',
    },
    {
      title: '客户名称',
      dataIndex: 'customer_id',
    },
    {
      title: '客户等级',
      dataIndex: 'customer_id',
    },
    {
      title: '客户代表',
      dataIndex: 'customer_id',
    },
    {
      title: '户号数',
      dataIndex: 'customer_id',
    },
    {
      title: '跟进计划',
      dataIndex: 'customer_id',
      render: (text, record, index) => (
        <>
          <a
            onClick={() =>
              props.showFormModal({
                action: 'clientListPlan',
                d_id: record.id,
              })
            }
          >
            计划
          </a>
          <a
            onClick={() =>
              props.showFormModal({
                action: 'clientListPlan',
                d_id: record.id,
              })
            }
          >
            计划
          </a>
        </>
      ),
    },
    {
      title: '客户地址',
      dataIndex: 'customer_id',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'clientListPlan',
            d_id: record.id,
          })
        }
      >
        计划
      </a>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'uploadFile',
            d_id: record.id,
          })
        }
      >
        上传方案
      </a>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'clientListPullContract',
            d_id: record.id,
          })
        }
      >
        拉取合同
      </a>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'clientListRemark',
            d_id: record.id,
          })
        }
      >
        备注
      </a>
      <a disabled className={`disabled `}>
        已分配
      </a>
      <a disabled className={`disabled `}>
        合同签订
      </a>

      <a
        onClick={() =>
          props.showFormModal({
            action: 'clientListAsignPeople',
            d_id: record.id,
          })
        }
      >
        分配
      </a>
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      // noRemove
      {...props}
    ></SmartTable>
  );
};

export const ClientListPublicTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'customer_idid',
    },
    {
      title: '客户名称',
      dataIndex: 'customer_id',
    },
    {
      title: '客户等级',
      dataIndex: 'customer_id',
    },
    {
      title: '客户代表',
      dataIndex: 'customer_id',
    },
    {
      title: '户号数',
      dataIndex: 'customer_id',
    },
    {
      title: '客户地址',
      dataIndex: 'customer_id',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      {record.aa ? (
        <a
          onClick={() =>
            props.showFormModal({
              action: 'clientListAsignPeople',
              d_id: record.id,
            })
          }
        >
          分配
        </a>
      ) : (
        <a disabled className={`disabled `}>
          已分配
        </a>
      )}
      {record.aa ? (
        <a
          onClick={() =>
            props.showFormModal({
              action: 'clientListPlan',
              d_id: record.id,
            })
          }
        >
          计划
        </a>
      ) : (
        <a disabled className={`disabled `}>
          已计划
        </a>
      )}
    </>
  );

  return (
    <SmartTable
      columns={columns}
      extra={extra}
      noRemove
      {...props}
    ></SmartTable>
  );
};
