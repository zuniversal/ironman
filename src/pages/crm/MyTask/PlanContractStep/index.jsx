import React, { useState } from 'react';
import './style.less';
import SmartShowPDF from '@/common/SmartShowPDF';
import MyTaskForm from '@/components/Form/MyTaskForm';
import { planContractStepConfig, planContractDescConfig } from '@/configs';
import { Steps, Descriptions } from 'antd';

const { Step } = Steps;

const PlanContractStep = props => {
  console.log(' PlanContractStep ： ', props); //

  const [current, setCurrent] = useState(0);
  const onChange = goIndex => {
    console.log('onChange:', goIndex);
    // if (goIndex < completeIndex.current) {
    setCurrent(goIndex);
    // }
  };
  const planContractStep = (
    <Steps current={current} className={`stepWrappper`} onChange={onChange}>
      {planContractStepConfig.map((v, i) => (
        <Step {...v} key={i}></Step>
      ))}
    </Steps>
  );

  const planContractDesc = (
    <Descriptions>
      {planContractDescConfig.map((v, i) => (
        <Descriptions.Item {...v} key={i}>
          {/* {v.type === 'showPDF' && <SmartShowPDF
            src={'/api/v1/console/OMS/contract/static/2021/08/D020-ZBTG-2021-0023N.pdf'}
            path={'/console/OMS/contract/static/2021/08/D020-ZBTG-2021-0023N.pdf'}
            // src={`${getPdf}${this.props.extraData.path}.pdf`}
            // path={`${pdfPrefix}${this.props.extraData.path}.pdf`}
          ></SmartShowPDF>} */}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );

  return (
    <div className={`planContractStepWrappper`}>
      {planContractStep}
      {/* {current === 0 ? <MyTaskForm></MyTaskForm> : planContractDesc} */}
    </div>
  );
};

export default PlanContractStep;
