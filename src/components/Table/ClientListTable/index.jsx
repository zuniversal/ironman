import React from 'react';
import SmartTable from '@/common/SmartTable';
import { clientClueLevelMap } from '@/configs';

export const ClientListPrivateTable = props => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '客户名称',
      dataIndex: 'name',
    },
    {
      title: '客户等级',
      dataIndex: 'level',
      dataMap: clientClueLevelMap,
    },
    {
      title: '客户代表',
      // dataIndex: '',
    },
    {
      title: '户号数',
      dataIndex: 'ele_user_count',
    },
    {
      title: '跟进计划',
      dataIndex: 'district',
      // render: (text, record, index) => (
      //   <>
      //     <a
      //       onClick={() =>
      //         props.showFormModal({
      //           action: 'addClientPlanAsync',
      //           d_id: record.id,
      //         })
      //       }
      //     >
      //       计划
      //     </a>
      //     <a
      //       onClick={() =>
      //         props.showFormModal({
      //           action: 'addClientPlanAsync',
      //           d_id: record.id,
      //         })
      //       }
      //     >
      //       计划
      //     </a>
      //   </>
      // ),
      detailFn: record =>
        // props.showItemAsync({
        //   action: 'clientPlanDetailAsync',
        //   d_id: record.id,
        // }),
        props.getClientPlanDetailAsync({
          action: 'getClientPlanDetailAsync',
          customer_id: record.id,
        }),
    },
    {
      title: '客户地址',
      dataIndex: 'address',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'addClientPlanAsync',
            customer_id: record.id,
            // record,
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
            action: 'getClientPlanDetailAsync',
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
      dataIndex: 'id',
    },
    {
      title: '客户名称',
      dataIndex: 'name',
    },
    {
      title: '客户等级',
      dataIndex: 'level',
      dataMap: clientClueLevelMap,
    },
    {
      title: '客户代表',
      // dataIndex: '',
    },
    {
      title: '户号数',
      dataIndex: 'ele_user_count',
    },
    {
      title: '客户地址',
      dataIndex: 'address',
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
              action: 'addClientPlanAsync',
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
