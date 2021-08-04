import React, { useEffect } from 'react';
import SmartForm from '@/common/SmartForm';
import { planContractStepConfig, planContractDescConfig } from '@/configs';
import { Steps, Descriptions } from 'antd';

const { Step } = Steps;

const PlanContractStep = props => {
  console.log(' PlanContractStep ： ', props); //

  const planContractStep = (
    <Steps current={1}>
      {planContractStepConfig.map((v, i) => (
        <Step {...v} key={i}></Step>
      ))}
    </Steps>
  );

  const planContractDesc = (
    <Descriptions title="User Info">
      {planContractDescConfig.map((v, i) => (
        <Descriptions.Item {...v} key={i}></Descriptions.Item>
      ))}
    </Descriptions>
  );

  return (
    <div className={`planContractStepWrappper`}>
      {planContractStep}
      {planContractDesc}
    </div>
  );
};

export default PlanContractStep;
