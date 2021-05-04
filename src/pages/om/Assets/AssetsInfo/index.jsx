import React, { useState } from 'react';
import './style.less';
import { List, Collapse, Tabs } from 'antd';
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

const RenderTabs = props => {
  const onChange = val => {
    console.log(' onChange   ,   ： ', val);
  };
  const onTabClick = val => {
    console.log(' onTabClick   ,   ： ', val);
  };
  return (
    <Tabs defaultActiveKey="1" onChange={onChange}>
      {props.config.map((v, i) => (
        <TabPane {...v}></TabPane>
      ))}
    </Tabs>
  );
};

const RenderList = props => {
  return (
    <List
      size="small"
      bordered
      renderItem={v => (
        <List.Item>
          <div className="label">{v.label}</div>
          <div className="intro">{v.intro}</div>
        </List.Item>
      )}
      {...props}
    />
  );
};

const AssetsInfo = props => {
  const [activeItem, setActiveItem] = useState(0);

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
  return (
    <div className="assetsInfo">
      <div className="title">资产管理</div>
      <div className={`assetsContent`}>
        <Collapse defaultActiveKey={['1']} ghost className={`collapseWrapper`}>
          <Panel header={'xxx电房'} key="1">
            {config.map((v, i) => (
              <div
                onClick={() => {
                  props.showFormModal({
                    action: 'exportDutyData',
                    // d_id: record.id,
                  });
                  setActiveItem(i);
                }}
                className={`item ${i === activeItem ? 'activeLink' : ''}`}
                key={i}
              >
                {v}
              </div>
            ))}
          </Panel>
        </Collapse>

        <div className="assetsInfoWrapper">
          <div className="assetsInfoTabs">
            <RenderTabs config={chestTabConfig}></RenderTabs>
            <RenderTabs config={electricCtrlConfig}></RenderTabs>
          </div>
          <div className="listWrapper">
            <RenderList dataSource={data} header={'相排'}></RenderList>
            <RenderList dataSource={data} header={'地排'}></RenderList>
          </div>
        </div>
      </div>
    </div>
  );
};

AssetsInfo.defaultProps = {
  showFormModal: () => {},
};

export default AssetsInfo;
