import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import ProvinceForm, {
  provinceFormConfig,
} from '@/components/Form/ProvinceForm';
import useHttp from '@/hooks/useHttp';
import { formatSelectList } from '@/utils';
import { getList as getHouseNoList } from '@/services/houseNo';

const PowerStationSearchForm = props => {
  console.log(' PowerStationSearchForm ： ', props);

  const { data: houseNoList, req: getHouseNoListAsync } = useHttp(
    // () => {
    //   console.log(' houseNoList1111 ： ', );
    //   getHouseNoList()
    // },
    getHouseNoList,
    {
      format: res => formatSelectList(res, 'number', 'number'),
    },
  );

  const config = [
    {
      // formType: 'Search',
      // selectSearch: props.getPowerAsync,
      // selectData: props.powerList,
      itemProps: {
        label: '电站名称',
        name: 'name',
        // className: 'w50',
      },
      // searchSuffix: true,
    },
    {
      itemProps: {
        label: '客户名称',
        name: 'customer_name',
      },
    },
    // {
    //   formType: 'Search',
    //   selectData: houseNoList,
    //   itemProps: {
    //     label: '户号',
    //     name: 'ele_user',
    //   },
    // },
    {
      itemProps: {
        label: '户号',
        name: 'ele_user',
      },
    },
    ...provinceFormConfig(props),
    // {
    //   formType: 'Divider',
    //   itemProps: {
    //     label: '',
    //   },
    // },
  ];

  return (
    <div className={'fsb  '}>
      <SearchForm config={config} noRuleAll {...props}></SearchForm>
    </div>
  );
};

PowerStationSearchForm.defaultProps = {};

export default PowerStationSearchForm;
