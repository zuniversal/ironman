import React, { useEffect } from 'react';
import { SearchForm } from '@/common/SmartForm';
import useHttp from '@/hooks/useHttp';
import { getServiceStaff } from '@/services/userManage';
import { getList } from '@/services/clientList';
import { clientClueLevelConfig } from '@/configs';
import { formatSelectList } from '@/utils';
import { history } from 'umi';
import { Form } from 'antd';

const ClientListSearchForm = props => {
  const [form] = Form.useForm();
  const { data: serviceStaffList, req: getServiceStaffAsync } = useHttp(
    getServiceStaff,
    {
      format: res => formatSelectList(res, 'nickname'),
    },
  );

  useEffect(() => {
    console.log(
      ' %c ClientListSearchForm 组件 this.state, this.props ： ',
      `color: #333; font-weight: bold`,
      props,
      history,
      history.location.query.saleId,
    ); //
    if (history.location.query.saleId) {
      props.getListAsync({
        service_staff: history.location.query.saleId,
      });
      form.setFieldsValue({
        service_staff: history.location.query.saleId,
      });
    }
  }, [history.location.query.saleId]);

  const config = [
    {
      formType: 'Search',
      selectData: clientClueLevelConfig,
      itemProps: {
        label: '客户等级',
        name: 'level',
      },
    },
    {
      formType: 'Search',
      selectData: serviceStaffList,
      itemProps: {
        label: '客户代表',
        name: 'service_staff',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '关键字',
        name: 'keyword',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return <SearchForm config={config} propsForm={form} {...props}></SearchForm>;
};

export default ClientListSearchForm;
