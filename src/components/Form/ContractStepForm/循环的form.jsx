import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';
import {
  Table,
  Icon,
  notification,
  Modal,
  Button,
  Tag,
  Form,
  Input,
  Row,
  Col,
  Menu,
  Dropdown,
  Steps,
  Divider,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import SmartForm from '@/common/SmartForm'; //
import ContractRelativeForm, {
  clientConfig,
  contractConfig,
  houseNoConfig,
  stationConfig,
} from '@/components/Form/ContractRelativeForm'; //
import { formatConfig } from '@/utils'; //

const { Step } = Steps;

const ContractStepForm = props => {
  const [form, formform] = Form.useForm();

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const [form5] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const completeIndex = useRef(0);

  console.log(' ContractStepForm ： ', props, form, formform); //

  const config1 = formatConfig(clientConfig);
  const config2 = formatConfig(contractConfig);
  const config3 = formatConfig(houseNoConfig);
  const config4 = formatConfig(stationConfig);

  const contractStepConfig = [
    {
      key: 'client',
      title: '客户信息',
      config: config1,
      // formCom: ClientInfoForm,
      // form: Form.useForm()[0],
      form: form1,
    },
    {
      key: 'contract',
      title: '合同信息',
      config: config2,
      // formCom: ContractInfoForm,
      // form: Form.useForm()[0],
      form: form2,
    },
    {
      key: 'houseNo',
      title: '户号信息',
      config: config3,
      // formCom: HouseNoInfoForm,
      // form: Form.useForm()[0],
      form: form3,
    },
    {
      key: 'station',
      title: '电站信息',
      config: config4,
      // formCom: PowerStationInfoForm,
      // form: Form.useForm()[0],
      form: form4,
    },
    // { key: 'complete', title: '完成', Form.useForm()[0]: form5,   },
  ];

  const onChange = goIndex => {
    console.log('onChange:', goIndex, completeIndex.current);
    // if (current > -1 && current < contractStepConfig.length) {
    if (goIndex < completeIndex.current) {
      setCurrent(goIndex);
    }
  };

  const next = async () => {
    console.log(' next ： ', current); //
    const indexs = current + 1;
    setCurrent(indexs);
    if (indexs > completeIndex.current) {
      completeIndex.current = indexs;
    }

    // try {
    //   const res = await propsForm.validateFields();
    //   console.log('  next res await 结果  ：', res); //
    //   setCurrent(current + 1);
    // } catch (error) {
    //   console.log(' next error ： ', error); //
    // }
  };

  const prev = () => {
    console.log(' prev ： ', current); //

    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const propsForm = contractStepConfig[current].form;
  console.log('  propsForm ：', propsForm, contractStepConfig, Form.useForm()); //

  const stepAction = (
    <div className="fje">
      <div className=" ">
        <Button className={'actionBtn m-r-10 '} type="primary" onClick={prev}>
          上一步
        </Button>
        <Button className={'actionBtn m-r-10 '} type="primary" onClick={next}>
          下一步
        </Button>
      </div>
    </div>
  );

  return (
    <div className="contractStepForm  ">
      <Steps
        current={current}
        onChange={onChange}
        // type="navigation"
        className={`stepWrapper`}
      >
        {contractStepConfig.map((v, i) => (
          <Step
            // icon={null}
            // status="finish"
            title={v.title}
            key={v.key}
          />
        ))}
      </Steps>

      {/* {contractStepConfig.map((v, i) => (
        <ContractRelativeForm
          index={current}
          propsForm={propsForm}
          key={v.key}
        />
      ))} */}
      <ContractRelativeForm
        index={current}
        // propsForm={propsForm}
        formConfig={contractStepConfig}
      ></ContractRelativeForm>

      {/* <div className={0 === current ? `${0}` : `${0} hide `}   >
        <SmartForm
          config={contractStepConfig[0].config}
          propsForm={contractStepConfig[0].form}
          {...props}
        ></SmartForm>
      </div>
      <div className={1 === current ? `${1}` : `${1} hide `}   >
        <SmartForm
          config={contractStepConfig[1].config}
          propsForm={contractStepConfig[1].form}
          {...props}
        ></SmartForm>
      </div>
      <div className={2 === current ? `${2}` : `${2} hide `}   >
        <SmartForm
          config={contractStepConfig[2].config}
          propsForm={contractStepConfig[2].form}
          {...props}
        ></SmartForm>
      </div>
      <div className={3 === current ? `${3}` : `${3} hide `}   >
        <SmartForm
          config={contractStepConfig[3].config}
          propsForm={contractStepConfig[3].form}
          {...props}
        ></SmartForm>
      </div> */}

      {/* {contractStepConfig.map((v, i) => <div key={i} className={i === current ? `${i}` : `${i}  `}   >
        <SmartForm
          // config={config}
          // config={formatConfig(config)}
          config={v.config}
          // formProps={formProps}
          // init={init}
          // init={{}}

          // propsForm={propsForm}
          // propsForm={v.form}
          propsForm={Form.useForm()[0]}
          {...props}
        ></SmartForm>
      </div>)} */}

      {current < 4 && stepAction}
    </div>
  );
};

ContractStepForm.defaultProps = {};

export default ContractStepForm;
