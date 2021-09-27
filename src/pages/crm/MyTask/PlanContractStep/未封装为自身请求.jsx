import React, { useState } from 'react';
import SmartShowPDF from '@/common/SmartShowPDF';
import MyTaskForm from '@/components/Form/MyTaskForm';
import ClientClueForm from '@/components/Form/ClientClueForm';
import ClientForm from '@/components/Form/ClientForm';
import {
  planContractStepConfig,
  planContractDescConfig,
  myTaskTypeMap,
} from '@/configs';
import { Steps, Descriptions } from 'antd';
import moment from 'moment'; //

const { Step } = Steps;

const PlanContractStep = props => {
  const dataInit = {
    ...props.planStepInfo,
    submitterName: props.planStepInfo?.submitter?.name,
    submitterPhone: props.planStepInfo?.submitter?.phone,
    step: props.planStepInfo?.code?.id - 1 || 0,
    // step: 2,
    createdTime: moment(props.planStepInfo.created_time).format(
      'YYYY-MM-DD HH:mm:ss',
    ),
  };
  console.log(
    ' PlanContractStep ： ',
    props,
    dataInit,
    props.planStepInfo?.code?.id,
  ); //

  const [current, setCurrent] = useState(dataInit.step);
  const onChange = goIndex => {
    console.log('onChange:', goIndex);
    // if (goIndex < completeIndex.current) {
    setCurrent(goIndex);
    // }
  };
  const planContractStep = (
    <Steps
      size={'small'}
      current={current}
      className={`stepWrappper`}
      onChange={onChange}
    >
      {planContractStepConfig.map((v, i) => (
        <Step {...v} key={i}></Step>
      ))}
    </Steps>
  );

  const planContractDesc = (
    <Descriptions>
      {planContractDescConfig.map((v, i) => (
        <Descriptions.Item {...v} key={i}>
          {!v.type && dataInit[v.value]}
          {v.type === 'showPDF' && (
            <SmartShowPDF
              src={
                '/api/v1/console/OMS/contract/static/2021/08/D020-ZBTG-2021-0023N.pdf'
              }
              // src={this.props.init.file}
              // path={
              //   '/console/OMS/contract/static/2021/08/D020-ZBTG-2021-0023N.pdf'
              // }
              // src={`${getPdf}${this.props.extraData.path}.pdf`}
              // path={`${pdfPrefix}${this.props.extraData.path}.pdf`}
            ></SmartShowPDF>
          )}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );

  const clientFormCom = (
    <ClientForm
      {...props}
      action={'detail'}
      // noDisabledContact
    ></ClientForm>
  );

  return (
    <div className={`planContractStepWrappper`}>
      <div className="planStepWrapper">{planContractStep}</div>
      {/* {current === 0 ? <MyTaskForm
        action={'detail'}
      ></MyTaskForm> : planContractDesc} */}
      {current === 0
        ? // <ClientClueForm
          //   {...props}
          //   init={props.init.clientClueRes}
          //   action={'detail'}
          //   noDisabledContact
          // ></ClientClueForm>
          clientFormCom
        : planContractDesc}
    </div>
  );
};

export default PlanContractStep;
