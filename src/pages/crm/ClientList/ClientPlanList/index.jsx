import React, { useState, useEffect } from 'react';
import './style.less';
import ClientClueForm from '@/components/Form/ClientClueForm';
import ClientForm from '@/components/Form/ClientForm';
import PlanContractStep from '@/pages/crm/MyTask/PlanContractStep';
import {
  clientListTabConfig,
  planContractStepConfig,
  planListInfoDescConfig,
  clientListPlanTypeMap,
} from '@/configs';
import { Tabs, Steps, Button, Descriptions } from 'antd';

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

const formatData = props => {
  // console.log(' formatData   ,   ： ', props,  )
  if (!props.plan_code) {
    return props;
  }
  return {
    ...props,
    planType: clientListPlanTypeMap[props.type],
    planTime: props.plan_code[0].duration + ' 天',
    contractTime: props.plan_code[1].duration + ' 天',
    signTime: props.plan_code[2].duration + ' 天',
  };
};

const ClientPlanList = props => {
  console.log(' ClientPlanList ： ', props);
  const params = formatData(props.clientPlanList[0]);
  const [dataInit, setDataInit] = useState(params);
  const [current, setCurrent] = useState(props.clientPlanList[0].id);

  useEffect(() => {
    console.log(' ClientPlanList useEffect v ： ', props); //
    props.propsForm.setFieldsValue(props.init);
  }, [props.init.id]);

  const onTabChange = v => {
    console.log(' onTabChange v ： ', v); //
    const matchItem = props.clientPlanList.find(item => item.id == v);
    console.log(' matchItem  props.clientPlanList.find v ： ', matchItem);
    setDataInit(formatData(matchItem));
    setCurrent(v);
    // props.getClientAsync({
    //   d_id: matchItem.customer.customer_id,
    // });
    // props.getClientClueAsync({
    //   d_id: v,
    // });
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

  const planInfoDesc = (
    <Descriptions>
      {planListInfoDescConfig.map((v, i) => (
        <Descriptions.Item {...v} key={i}>
          {dataInit[v.value]}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );

  return (
    <div className={' clientPlanList '}>
      <RenderTabPanes
        config={props.clientPlanList.map((v, i) => ({
          tab: v.name,
          key: v.id,
          // key: v.customer.customer_id,
          value: v.customer.customer_id,
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
        tabsProps={
          {
            // tabBarExtraContent: operations,
          }
        }
      ></RenderTabPanes>

      {planInfoDesc}

      {/* <div className={'planStepWrapper '}>
        <RenderStep
          config={planContractStepConfig}
          onChange={onStepChange}
          current={current}
        ></RenderStep>
      </div> */}

      {/* {Object.keys(props.init).length > 0 && ( */}
      <PlanContractStep
        {...props}
        action={'detail'}
        planStepId={current}
        // planStepId={3}
        planStepId={dataInit.id}
        code_id={dataInit.plan_code[0].code_id}
        // key={props.init.id}
      ></PlanContractStep>

      {/* {current === 0 && <ClientForm 
        {...props}
        action={'detail'}
        // key={props.init.id} 
      ></ClientForm>} */}

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
