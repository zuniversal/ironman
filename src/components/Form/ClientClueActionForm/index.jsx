import React from 'react';
import SmartForm from '@/common/SmartForm';
import { clientListPlanTypeConfig } from '@/configs';
import useHttp from '@/hooks/useHttp';
import { getList } from '@/services/clientList';
import { getSalesmanList } from '@/services/salemanMangement';
import { getRelatived } from '@/services/client';
import { formatSelectList } from '@/utils';
import { connect } from 'umi';

export const ClientClueApproveForm = connect(({ user }) => ({ user }))(
  props => {
    console.log(' ClientClueApproveForm ： ', props); //
    const { enterprises } = props.user.userInfo;

    const { data: salesmanList, req: getSalesmanListAsync } = useHttp(
      getSalesmanList,
      {
        formatVal: 'nickname',
      },
    );
    // const { data: clientList } = useHttp(() => getRelatived({ get_all: '1' }));

    const config = [
      {
        itemProps: {
          label: '',
          name: 'd_id',
          className: 'hidden',
        },
      },
      {
        itemProps: {
          label: '客户',
          name: 'name',
        },
        comProps: {
          disabled: true,
        },
      },
      {
        noRule: true,
        formType: 'Search',
        selectSearch: e =>
          getSalesmanListAsync(() => getSalesmanList({ keyword: e })),
        selectData: salesmanList,
        itemProps: {
          label: '分配业务员',
          name: 'salesman_id',
        },
      },
      {
        formType: 'Search',
        // selectData: clientList,
        selectData: formatSelectList(enterprises),
        itemProps: {
          label: '服务公司',
          name: 'service_enterprise_id',
        },
      },
    ];

    return <SmartForm config={config} {...props}></SmartForm>;
  },
);
