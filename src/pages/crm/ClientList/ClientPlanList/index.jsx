import React, { useState } from 'react';
import './style.less';
import ClientClueForm from '@/components/Form/ClientClueForm';
import { clientListTabConfig, planContractStepConfig } from '@/configs';
import { Tabs, Steps, Button } from 'antd';

const { TabPane } = Tabs;
const { Step } = Steps;

const RenderTabPanes = props => (
  <div className={'tabWrapper'}>
    <Tabs defaultActiveKey="0" onChange={props.onChange} {...props.tabsProps}>
      {props.config.map((v, i) => (
        <TabPane {...v}></TabPane>
      ))}
    </Tabs>
  </div>
);

const RenderStep = props => (
  <Steps
    // current={props.current}
    size={'small'}
    className={`stepWrappper`}
    onChange={props.onChange}
  >
    {props.config.map((v, i) => (
      <Step {...v} key={i}></Step>
    ))}
  </Steps>
);

const RenderVerticalStep = props => {
  // console.log(' RenderVerticalStep   props, ,   ： ', props);
  return (
    <Steps size={'small'} direction="vertical" className={'renderVerticalStep'}>
      {props.config.map((v, i) => (
        <Step
          // title={v.created_time.split('T')[0]}
          // description={v.content}
          // key={i}
          {...v}
        />
      ))}
    </Steps>
  );
};

const ClientPlanList = props => {
  console.log(' ClientPlanList ： ', props);
  const [current, setCurrent] = useState(0);

  const onChange = e => {
    console.log(' onChange e ： ', e); //
    setCurrent(e);
  };

  const operations = (
    <Button type="primary" onClick={props.handlePlan}>
      去处理
    </Button>
  );

  return (
    <div className={' clientPlanList '}>
      <RenderTabPanes
        config={clientListTabConfig}
        onChange={onChange}
        tabsProps={{
          tabBarExtraContent: operations,
        }}
      ></RenderTabPanes>

      <div className={'planStepWrapper '}>
        <RenderStep
          config={planContractStepConfig}
          onChange={onChange}
          current={current}
        ></RenderStep>
      </div>

      <ClientClueForm {...props}></ClientClueForm>

      <div className={'rowTitle itemtitle'}>
        处理记录：
        {/* 地理位置打开{props}次 */}
      </div>

      <RenderVerticalStep
        config={planContractStepConfig}
        onChange={onChange}
        current={current}
      ></RenderVerticalStep>
    </div>
  );
};

export default ClientPlanList;
