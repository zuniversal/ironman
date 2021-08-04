import React from 'react';
import SmartTable from '@/common/SmartTable';

const SalemanMangementTable = props => {
  const columns = [
    {
      title: '人员编号',
      // dataIndex: '',
    },
    {
      title: '姓名',
      // dataIndex: '',
      // dataIndex: '',
      // detailFn: record =>
      //   props.showItemAsync({
      //     action: 'clientDetailAsync',
      //     d_id: record.customer.id,
      //   }),
    },
    {
      title: '所属子公司',
      // dataIndex: '',
    },
    {
      title: '性别',
      // dataIndex: '',
    },
    {
      title: '手机',
      // dataIndex: '',
    },
    {
      title: '角色',
      // dataIndex: '',
    },
    {
      title: '邮箱',
      // dataIndex: '',
    },
    {
      title: '状态',
      // dataIndex: '',
    },
  ];

  const extra = (text, record, index, props) => (
    <>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'responsibleClientAsync',
            d_id: record.id,
          })
        }
      >
        查看客户
      </a>
      <a
        onClick={() =>
          props.showFormModal({
            action: 'noEffect',
            d_id: record.id,
          })
        }
      >
        失效
      </a>
    </>
  );

  return <SmartTable columns={columns} extra={extra} {...props}></SmartTable>;
};

export default SalemanMangementTable;
