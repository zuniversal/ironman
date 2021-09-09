import React, { useState, useEffect } from 'react';
import './style.less';
import ClientClueForm from '@/components/Form/ClientClueForm';
import PlanContractStep from '@/pages/crm/MyTask/PlanContractStep';
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
          key={i}
          {...v}
        />
      ))}
    </Steps>
  );
};

const ClientPlanList = props => {
  console.log(' ClientPlanList ： ', props);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    console.log(' ClientPlanList useEffect v ： ', props); //
    props.propsForm.setFieldsValue(props.init);
  }, [props.init.id]);

  const onTabChange = v => {
    console.log(' onTabChange v ： ', v); //
    props.getClientClueAsync({
      d_id: v,
    });
  };

  const onStepChange = e => {
    console.log(' onStepChange e ： ', e); //
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
        config={props.clientPlanList.map((v, i) => ({
          tab: v.name,
          key: v.id,
          value: v.id,
        }))}
        // config={[
        //   {
        //     tab: 'v.name',
        //     key: 14,
        //     value: 14,
        //   },
        //    {
        //     tab: 'v.name',
        //     key: 13,
        //     value: 13,
        //   }
        // ]}
        onChange={onTabChange}
        tabsProps={{
          tabBarExtraContent: operations,
        }}
      ></RenderTabPanes>

      {/* <div className={'planStepWrapper '}>
        <RenderStep
          config={planContractStepConfig}
          onChange={onStepChange}
          current={current}
        ></RenderStep>
      </div> */}

      {/* {Object.keys(props.init).length > 0 && <ClientClueForm 
        {...props}
        action={'detail'}
        // key={props.init.id} 
      ></ClientClueForm>} */}
      {Object.keys(props.init).length > 0 && (
        <PlanContractStep
          {...props}
          action={'detail'}
          // key={props.init.id}
        ></PlanContractStep>
      )}

      <div className={'rowTitle itemtitle'}>
        处理记录：
        {/* 地理位置打开{props}次 */}
      </div>

      <RenderVerticalStep
        config={planContractStepConfig}
        onChange={onStepChange}
        current={current}
      ></RenderVerticalStep>
    </div>
  );
};

export default ClientPlanList;
