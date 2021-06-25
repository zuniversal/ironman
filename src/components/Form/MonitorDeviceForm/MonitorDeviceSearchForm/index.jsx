import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import { weakStatusConfig } from '@/configs';
import { Form } from 'antd';
import useHttp from '@/hooks/useHttp';
import { formatSelectList } from '@/utils';
import { getManufacturerList } from '@/services/monitorManage';

const MonitorDeviceSearchForm = props => {
  console.log(' MonitorDeviceSearchForm ： ', props);
  const [form] = Form.useForm();

  const { data: manufacturerList, req: getManufacturerListAsync } = useHttp(
    getManufacturerList,
    {
      format: res => formatSelectList(res, 'manufacturer'),
    },
  );
  const manufacturerModelList = [];
  const manufacturerModelListFilter = [];
  manufacturerList.forEach(v =>
    manufacturerModelList.push(
      ...formatSelectList(v.models.map(item => ({ ...item, parent: v.value }))),
    ),
  );
  const { manufacturer } = form.getFieldsValue();
  console.log(
    ' MonitorDeviceSearchForm ： ',
    props,
    manufacturerModelList,
    manufacturer,
    form,
  );
  const onManufacturerChange = (params, rest) => {
    console.log(' onManufacturerChange  ： ', params, rest);
    form.setFieldsValue({
      model: null,
    });
  };

  const config = [
    {
      formType: 'Search',
      selectData: manufacturerList,
      itemProps: {
        label: '厂商',
        name: 'manufacturer',
      },
      comProps: {
        onSelect: onManufacturerChange,
      },
    },
    {
      formType: 'Search',
      selectData: manufacturer
        ? manufacturerModelList.filter(v => v.parent === manufacturer)
        : manufacturerModelList,
      itemProps: {
        label: '型号',
        name: 'model',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: 'IMEI号、sim号',
        name: 'keyword',
      },
      comProps: {
        className: 'lastFormItem',
      },
      searchSuffix: true,
    },
  ];

  return (
    <div className={' monitorDeviceSearchForm '}>
      <SearchForm config={config} {...props} propsForm={form}></SearchForm>
    </div>
  );
};

export default MonitorDeviceSearchForm;
