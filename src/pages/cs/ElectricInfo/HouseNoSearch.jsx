import React, { useState } from 'react';
import './style.less';
import useHttp from '@/hooks/useHttp';
import { getList as getHouseNoList } from '@/services/houseNo';
import { getClientPower, getRelatived } from '@/services/client';
import { formatSelectList, filterObjSame, getItem } from '@/utils';
import SearchForm from '@/common/SearchForm';
import PageTitle from '@/components/Widgets/PageTitle';
import { history } from 'umi';
import { Button, Tabs } from 'antd';
const { TabPane } = Tabs;

const HouseNoSearch = props => {
  const { customer_id } = history.location.query;
  console.log(
    ' %c HouseNoSearclich 组件 this.state, this.props ： ',
    `color: #333; font-weight: bold`,
    props,
    customer_id,
    history,
  ); //
  const [val, setVal] = useState();

  // const { data: houseNoLList, req: getHouseNoListAsync } = useHttp(
  //   getHouseNoList,
  //   {
  //     format: res => formatSelectList(res, 'number'),
  //   },
  // );

  // const { data: clientPowerList, req: getClientAsync } = useHttp(
  //   getClientPower,
  //   {
  //     ...commonParams,
  //     format: res =>
  //       formatSelectList(
  //         res,
  //         'number',
  //         'electricity_user_id',
  //       )
  //   },monitorManage
  // );
  // const customer = getItem('userInfo')?.user?.nickname
  // const { data: clientPowerList, req: getClientAsync } = useHttp(
  //   () => getRelatived({ get_all: '1', customer,  }),
  //   {
  //     format: res => formatSelectList(res.map(v => v.electricity_users[0]), 'number'),
  //   },
  // );
  // console.log(' clientPowerList ： ', clientPowerList,  )//
  const searchForm = (
    <SearchForm
      // selectData={houseNoLList}
      selectData={props.data}
      // selectData={clientPowerList}
      onChange={val => {
        console.log(' onChange ： ', val); //
        // const res = clientPowerList.find((v) => v.value == val)
        const res = props.data.find(v => v.value == val);
        console.log(' res  clientPowerList.find v ： ', res);
        // props.onChange({stationList: formatSelectList(res.stations).map(v => ({text: v.label, type: v.value,})),})
        props.onChange({ stationList: res.stations, houseNo: res.label });
        setVal(val);
      }}
      // onSearch={(number, ) => {
      //   console.log(' onSearch ： ', number, ); //
      //   getHouseNoListAsync(() => getHouseNoList({number}))
      // }}
      value={props.value}
      // {...props}
    ></SearchForm>
  );

  const onChange = val => {
    console.log(' onChange   ,   ： ', val);
    const res = props.data.find(v => v.value == val);
    console.log(' res  clientPowerList.find v ： ', res);
    // props.onChange({stationList: formatSelectList(res.stations).map(v => ({text: v.label, type: v.value,})),})
    props.onChange({ stationList: res.stations, houseNo: res.label });
    setVal(val);
  };
  const tabs = (
    <Tabs defaultActiveKey="1" onChange={onChange} className={`houseNoTabs`}>
      {props.data.map((v, i) => (
        <TabPane tab={v.label} key={v.value}></TabPane>
      ))}
    </Tabs>
  );

  return (
    <PageTitle title={'用电户号'} className="w100">
      <div className="fsb w100">
        {tabs}
        {/* {searchForm} */}

        {/* {customer_id && (
          <Button type="primary" onClick={history.goBack}>
            返回
          </Button>
        )} */}
      </div>
    </PageTitle>
  );
};

HouseNoSearch.defaultProps = {};

export default HouseNoSearch;
