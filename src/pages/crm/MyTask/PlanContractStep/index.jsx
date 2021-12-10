import React, { useState } from 'react';
import './style.less';
import SmartShowPDF from '@/common/SmartShowPDF';
import MyTaskForm from '@/components/Form/MyTaskForm';
import ClientClueForm from '@/components/Form/ClientClueForm';
import ClientForm from '@/components/Form/ClientForm';
import useHttp from '@/hooks/useHttp';
import {
  getItem as getMyTask,
  getList as getItemByPlanCode,
} from '@/services/myTask';
import { getItem as getClient } from '@/services/client';
import { formatClientDetail } from '@/format/client';
import {
  planContractStepConfig,
  planContractDescConfig,
  myTaskTypeMap,
} from '@/configs';
import { Steps, Descriptions, Spin } from 'antd';
import moment from 'moment'; //

const { Step } = Steps;

const formatMyTask = payload => {
  console.log(' formatMyTask   ,   ： ', payload);
  const formatRes = {
    ...payload,
    submitterName: payload?.submitter?.name,
    submitterPhone: payload?.submitter?.phone,
    step: payload?.code?.id - 1 || 0,
    // step: 2,
    createdTime: moment(payload.created_time).format('YYYY-MM-DD HH:mm:ss'),
  };
  console.log(' formatRes ： ', formatRes); //
  return formatRes;
};

const PlanContractStep = props => {
  // const [dataInit, setDataInit] = useState(null);
  const { code_id } = props;

  const [current, setCurrent] = useState(0);

  const { data: myTaskInfo, req: getMyTaskAsync, isLoading, loading } = useHttp(
    // () => getMyTask({
    //   d_id: props.planStepId,
    // }),
    () =>
      props.code_id
        ? getItemByPlanCode({
            plan_id: props.planStepId,
            code_id: props.code_id,
          })
        : getMyTask({
            d_id: props.planStepId,
          }),
    {
      attr: 'bean',
      format: data => {
        console.log(
          ' getMyTaskAsync PlanContractStep data ： ',
          data,
          props,
          formatMyTask(data),
        ); //
        // props.propsForm.setFieldsValue(setFields);
        if (!Object.keys(data).length) {
          return data;
        }
        getClientAsync(() =>
          getClient({
            d_id: data.customer.customer_id,
          }),
        );
        const datas = formatMyTask(data);
        setCurrent(datas.step);
        console.log(' rest datas ： ', datas); //
        props.propsForm.setFieldsValue({
          contacts: datas.contact,
        });
        // setDataInit(datas)
        return datas;
      },
    },
  );

  const { data: clientInit, req: getClientAsync } = useHttp(
    // () => getClient({
    //   d_id: props.planStepInfo.customer.customer_id,
    // }),
    getClient,
    {
      attr: 'bean',
      format: data => {
        console.log(
          ' getClientAsync PlanContractStep data ： ',
          data,
          props,
          formatClientDetail(data),
        ); //
        const datas = formatClientDetail(data);
        // if (!!Object.keys(myTaskInfo).length) {
        // props.propsForm.setFieldsValue(datas);
        // props.propsForm.setFieldsValue({
        //   ...datas,
        //   // contacts: myTaskInfo.contact,
        // });
        // }
        // return datas;
        const { contacts, ...rest } = datas;
        console.log(' rest ： ', rest); //
        props.propsForm.setFieldsValue(rest);
        return rest;
      },
      noMountFetch: true,
    },
  );

  // const dataInit = {
  //   ...props.planStepInfo,
  //   submitterName: props.planStepInfo?.submitter?.name,
  //   submitterPhone: props.planStepInfo?.submitter?.phone,
  //   step: (props.planStepInfo?.code?.id - 1) || 0,
  //   // step: 2,
  //   createdTime: moment(props.planStepInfo.created_time).format('YYYY-MM-DD HH:mm:ss'),
  // };
  // console.log(' PlanContractStep ： ', props, dataInit, props.planStepInfo?.code?.id); //
  // const [current, setCurrent] = useState(dataInit.step);

  const onChange = goIndex => {
    console.log('onChange:', goIndex);
    // if (goIndex < completeIndex.current) {
    setCurrent(goIndex);
    // }
    // getClientAsync(() => getClient({
    //   d_id: props.planStepInfo.customer.customer_id,
    // }))
    if (goIndex === 0) {
      props.propsForm.setFieldsValue({
        ...clientInit,
        contacts: myTaskInfo.contact,
      });
    }
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
      {planContractDescConfig(current).map((v, i) => (
        <Descriptions.Item {...v} key={i}>
          {!v.type && myTaskInfo[v.value]}
          {v.type === 'showPDF' && (
            <SmartShowPDF
              src={
                '/api/v1/console/OMS/contract/static/2021/08/D020-ZBTG-2021-0023N.pdf'
              }
              src={props.init.file}
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
      init={{
        ...clientInit,
        contacts: myTaskInfo.contact,
      }}
      // noDisabledContact
    ></ClientForm>
  );

  console.log(
    ' isLoading ： ',
    props,
    clientInit,
    myTaskInfo,
    isLoading,
    loading,
  ); //

  return (
    <Spin spinning={isLoading}>
      <div className={`planContractStepWrappper`}>
        <div className="planStepWrapper">{planContractStep}</div>
        {/* {current === 0 ? <MyTaskForm
          action={'detail'}
        ></MyTaskForm> : planContractDesc} */}
        {current === 0 && !!Object.keys(myTaskInfo).length
          ? // <ClientClueForm
            //   {...props}
            //   init={props.init.clientClueRes}
            //   action={'detail'}
            //   noDisabledContact
            // ></ClientClueForm>
            clientFormCom
          : planContractDesc}
      </div>
    </Spin>
  );
};

export default PlanContractStep;
