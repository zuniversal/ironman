import React, { useState } from 'react';
import './style.less';
import { Input, Row, Col, } from 'antd';
import SmartForm, {SearchForm} from '@/common/SmartForm';
import SmartTable from '@/common/SmartTable';
import useHttp from '@/hooks/useHttp';
import { getSearchList } from '@/services/userManage';
import { formatSelectList } from '@/utils';

const SalemanMangementUserTable = props => {
  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'username',
    },
  ];

  return <SmartTable
    columns={columns}
    rowSelection={null}
    // noActionCol
    noDefault
    pageConfig={{
      size: 'small',
    }}
    {...props}
  ></SmartTable>;
};

export const SalemanMangementUserForm = props => {
  console.log(' SalemanMangementUserForm ： ', props);
  const { data: userList, } = useHttp(getSearchList, {
    format: res => {
      console.log(' userList resres  ,   ： ', res);
      const datas = res.map(v => ({...v, ...v.account, }))
      return formatSelectList(datas, 'nickname',  )
    },
  });

  console.log(' userList xx  ,   ： ', userList);

  const config = [
    {
      noLabel: true,
      formType: 'Search',
      selectData: userList,
      itemProps: {
        label: '用户',
        name: 'id',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
      // comProps: {
      //   className: 'w-280',
      // },
    },
  ];

  return <SearchForm config={config} {...props}></SearchForm>;
  return <SmartForm config={config} size={'small'} {...props}></SmartForm>;
};

export const SalemanMangementImportForm = props => {
  console.log(' SalemanMangementImportForm    ,   ： ', props   )
  const [ filterList, setFilterList ] = useState()
    
  const { data: userList, loading } = useHttp(getSearchList, {
    format: res => {
      console.log(' userList resres  ,   ： ', res);
      const flattenData = res.map(v => ({...v, ...v.account, }))
      const data = formatSelectList(flattenData, 'nickname',  )
      setFilterList(data)
      return data
    },
  });

  const onSearchChange = e => {
    console.log(' onSearchChange   e,   ： ', e, e.target.value, userList, );
    const data = userList.filter(v => v.username?.includes(e.target.value) || v.nickname?.includes(e.target.value))
    console.log(' data  state.filter v ： ', data,   )
    setFilterList(data)
  };

  const {importUser, removeUser} =  props

  const tableProps = {
    dataSource: props.importUserList, 
    extra: (text, record, index, props) => (
      <>
        <a
          onClick={() => removeUser({text, record, index, props})}
        >
          删除
        </a>
      </>
    ),
  }

  const userTableProps = {
    dataSource: filterList, 
    loading: !userList.length,
    extra: (text, record, index, props) => (
      <>
        <a
          onClick={() => importUser({text, record, index, props})}
        >
          导入
        </a>
      </>
    ),
  }

  const userTable = (
    <>
      <div className="">用户列表</div>
      <Input
        onChange={onSearchChange}
        // onPressEnter={props.onChange}
        ph={'关键字回车搜索'}
        // defaultValue={props.tableProps?.searchInfo?.keyword}
      ></Input>
      {/* <SalemanMangementUserForm></SalemanMangementUserForm> */}
      <SalemanMangementUserTable {...userTableProps}></SalemanMangementUserTable>
    </>
  );

  return <div className="importFormWrapper">
    <Row gutter={[10, 0]}>
      <Col span={12}>
        <div className="">要导入的用户列表</div>
        <SalemanMangementUserTable {...tableProps}></SalemanMangementUserTable>
      </Col>
      <Col span={12}>
        {userTable}
      </Col>
    </Row>
  </div>
};
