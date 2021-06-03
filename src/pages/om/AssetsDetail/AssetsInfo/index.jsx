import React, { useState, useEffect } from 'react';
import './style.less';
import AssetTree from '../AssetTree';
import AssetsForm from '@/components/Form/AssetsForm';
import { List, Collapse, Tabs, Form, Row, Col } from 'antd';
import { num2Str } from '@/utils';
import { assetFormTypeMap, assetTypeMap } from '@/configs';
const { TabPane } = Tabs;
const { Panel } = Collapse;

const config = ['10kv室内部分', '10kv线路部分', '#1变压器部分', '#2变压器部分'];

const chestTabConfig = [
  {
    tab: '10kVG01进线柜',
    key: '10kVG01进线柜1',
  },
  {
    tab: '10kVG02环网柜',
    key: '10kVG02环网柜1',
  },
  {
    tab: '0kVG03PT柜',
    key: '0kVG03PT柜1',
  },
];

const electricCtrlConfig = [
  {
    tab: '电柜本体',
    key: '电柜本体1',
  },
  {
    tab: '10kV母排',
    key: '10kV母排1',
  },
  {
    tab: '高压断路器',
    key: '高压断路器1',
  },
];

const assetFormConfig = [
  {
    label: '资产类型',
    name: 'type',
    dataMap: assetTypeMap,
  },
  // {
  //   label: '资产名称',
  //   name: 'name',
  // },
  {
    label: '制造厂商',
    name: 'manufacturer',
  },
  {
    label: '设备型号',
    name: 'model',
  },
  {
    label: '出厂编号',
    name: 'production_code',
  },
  {
    label: '额定电压',
    name: 'voltage',
  },
  {
    label: '额定电流',
    name: 'current',
  },
  {
    label: '容量',
    name: 'capacity',
  },
  {
    label: '使用年限',
    name: 'service_life',
  },
  {
    label: '出厂日期',
    name: 'production_date',
  },
  {
    label: '投运日期',
    name: 'operation_date',
  },
];

const RenderTabs = props => {
  console.log(' RenderTabs ： ', props);
  const onChange = val => {
    console.log(' onChange   ,   ： ', val);
  };
  const onTabClick = (val, i) => {
    console.log(' onTabClick   ,   ： ', val, i);
  };
  return (
    // <Tabs defaultActiveKey="1" onChange={props.onChange}>
    <Tabs defaultActiveKey={props.config[0]?.key} onChange={props.onChange}>
      {props.config.map((v, i) => (
        <TabPane {...v}></TabPane>
      ))}
    </Tabs>
  );
};

RenderTabs.defaultProps = {
  data: [],
  config: [],
};

const RenderList = props => {
  console.log(' RenderList ： ', props);
  return (
    <List
      size="small"
      bordered
      split
      column={2}
      grid={{ gutter: 0, column: 2 }}
      renderItem={v => (
        <List.Item>
          <div className="label">{v.label}</div>
          {/* <div className="intro">{v.intro}</div> */}
          <div className="intro">
            {v.dataMap ? v.dataMap[props.data[v.name]] : props.data[v.name]}
          </div>
        </List.Item>
      )}
      {...props}
      header={assetTypeMap[props.data.type]}
    />
  );
};

RenderList.defaultProps = {
  data: {},
};

const AssetsInfo = props => {
  const [activeItem, setActiveItem] = useState(0);
  const [activeKey, setActiveKey] = useState(props.selectItem[0]?.key);
  const selectData =
    props.selectItem?.children?.length > 0
      ? props.selectItem?.children
          ?.find(v => v.key == (activeKey ? activeKey : v.key))
          ?.children.map(v => ({ tab: v.name, key: v.id }))
      : null;
  console.log(' AssetsInfoAssetsInfo ： ', props, activeKey, selectData);

  const data = [
    {
      label: '型号规格',
      intro: '型号规格',
      key: '型号规格1',
    },
    {
      label: '额定电流',
      intro: '额定电流',
      key: '额定电流1',
    },
    {
      label: '额定电压',
      intro: '额定电压',
      key: '额定电压1',
    },
    {
      label: '数量',
      intro: '数量',
      key: '数量1',
    },
    {
      label: '单根长度',
      intro: '单根长度',
      key: '单根长度1',
    },
  ];

  const onChange = (val, oo) => {
    console.log(' onChangeonChange   ,   ： ', val, oo, props, activeKey);
    // const res = props.subAssetTreeList.find((v) => v.key == val)
    // const res = props.assetList.find((v) => v.key == val)
    const selectItem = props.selectItem.children.find(v => v.key == val);
    const selectItemChildren = selectItem.children;
    console.log(
      ' selectItem  props.assetList.find v ： ',
      selectItem,
      selectItemChildren,
    );
    setActiveKey(val);
    let d_id;
    if (selectItem.equipment_data_id) {
      console.log(' 111 ： '); //
      d_id = selectItem.id;
    }
    if (
      selectItem.children.length > 0 &&
      selectItem.children[0]?.equipment_data_id
    ) {
      console.log(' 222 ： '); //
      d_id = selectItem.children[0].id;
    }
    console.log(' d_id ： ', d_id); //
    props.getAssetDetailAsync({
      selectItem: null,
      d_id,
    });
    // props.getAssetDetailAsync({
    //   selectItem: null,
    //   d_id: props.selectItem.id,
    // })
  };

  const onThirdChange = (val, oo) => {
    console.log(' onThirdChange   ,   ： ', val, oo, props, activeKey);
    const selectItemOne = props.selectItem.children.find(
      v => v.key == (activeKey ? activeKey : v.key),
    );
    console.log(' selectItemOne ： ', selectItemOne); //
    const selectItem = selectItemOne.children.find(v => v.key == val);
    console.log(' selectItem ： ', selectItem); //
    let d_id;
    if (selectItem.equipment_data_id) {
      console.log(' 111 ： '); //
      d_id = selectItem.id;
    }
    console.log(' d_id ： ', d_id); //
    props.getAssetDetailAsync({
      selectItem: null,
      d_id,
    });
  };

  // const { type } = form.getFieldsValue();
  const { type } = props.assetDetail;
  // const formatFormItemRes = type ? assetFormTypeMap[type] ?? [] : [];
  const formatFormItemRes = assetFormTypeMap[type] || [];
  const formConfig = [...assetFormConfig, ...formatFormItemRes];
  console.log(
    '  formatFormItemRes ：',
    type,
    formatFormItemRes,
    formConfig,
    props,
  ); //

  const onClick = (selectItem, i) => {
    console.log(
      '  onClickonClick  ：',
      selectItem,
      i,
      props,
      selectItem.equipment_data_id ? '数据' : '无数据',
    );
    let d_id;
    if (selectItem.equipment_data_id) {
      console.log(' 111 ： '); //
      d_id = selectItem.id;
    }
    if (
      selectItem.children.length > 0 &&
      selectItem.children[0]?.equipment_data_id
    ) {
      console.log(' 222 ： '); //
      d_id = selectItem.children[0].id;
    }

    if (
      selectItem.children.length > 0 &&
      selectItem.children[0].children.length > 0 &&
      selectItem.children[0].children[0]?.equipment_data_id
    ) {
      console.log(' 333 ： '); //
      d_id = selectItem.children[0].children[0].id;
    }
    console.log(' d_id ： ', d_id); //
    props.getAssetDetailAsync({
      selectItem,
      d_id,
      subAssetList: selectItem.children,
    });
    setActiveKey(null);
    setActiveItem(i);
  };

  return (
    <div className="assetsInfo">
      <div className="title">资产管理</div>
      <div className={`assetsContent`}>
        {/* <Collapse defaultActiveKey={['1']} ghost className={`collapseWrapper`}>
          <Panel  key="1">
            {props.assetList.map((v, i) => (
              <div
                onClick={() => onClick(v, i)}
                className={`treeRow ${i === activeItem ? 'activeLink' : ''}`}
                key={i}
              >
                {v.title}
              </div>
            ))}
          </Panel>
        </Collapse> */}
        <div className={`collapseWrapper`}>
          <div className={`collapsList`}>
            {props.assetList.map((v, i) => (
              <div
                onClick={() => onClick(v, i)}
                className={`treeRow ${i === activeItem ? 'activeLink' : ''}`}
                key={i}
              >
                {v.title}
              </div>
            ))}
          </div>
        </div>

        {/* <Col span={6} className={``}>
          <AssetTree
            treeData={props.assetList}
            getAssetDetailAsync={props.getAssetDetailAsync}
            setActiveKey={setActiveKey}
          ></AssetTree>
        </Col> */}

        {/* <Col span={18} className={``}> */}
        <div className="assetsInfoWrapper">
          <div className="assetsInfoTabs">
            <RenderTabs
              config={props.subAssetTreeList}
              onChange={onChange}
            ></RenderTabs>
            {/* {selectData.length > 0 ? <RenderTabs config={selectData} onChange={onThirdChange} key={selectData[0].key}  ></RenderTabs> : null} */}
            {selectData ? (
              <RenderTabs
                config={selectData}
                onChange={onThirdChange}
                key={selectData[0]?.key}
              ></RenderTabs>
            ) : null}
            {/* <RenderTabs config={chestTabConfig}></RenderTabs>
              <RenderTabs config={electricCtrlConfig}></RenderTabs> */}
          </div>
          {/* <div className="dfc"> */}
          <div className="listWrapper">
            {/* <RenderList dataSource={data} header={'相排'}></RenderList>
                <RenderList dataSource={data} header={'地排'}></RenderList> */}
            {/* <RenderList dataSource={props.assetDetail} header={'相排'}></RenderList> */}
            {/* {Object.keys(props.assetDetail).length && <AssetsForm
                  init={num2Str(props.assetDetail, ['type'])}
                  propsForm={form}
                  key={props.assetDetail?.id} 
                ></AssetsForm>} */}

            {Object.keys(props.assetDetail).length > 0 && (
              <RenderList
                dataSource={formConfig}
                data={props.assetDetail}
              ></RenderList>
            )}
          </div>

          {/* </div> */}
        </div>
        {/* </Col> */}
      </div>
    </div>
  );
};

export default AssetsInfo;
