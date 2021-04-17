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
import SmartForm from '@/common/SmartForm';
import { AdminForm } from '@/components/Form/ClientForm';
import SuccResult from '@/components/Widgets/SuccResult';
import ContractRelativeForm, {
  clientConfig,
  contractConfig,
  houseNoConfig,
  stationConfig,
} from '@/components/Form/ContractRelativeForm';
import { formatConfig } from '@/utils';

const { Step } = Steps;

const ContractStepForm = props => {
  const [form, formform] = Form.useForm();

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const completeIndex = useRef(0);

  console.log(' ContractStepForm ： ', props, form, formform);

  const completeItem = { key: 'complete', title: '完成' };

  // const config1 = formatConfig(clientConfig)
  // const config2 = formatConfig(contractConfig)
  // const config3 = formatConfig(houseNoConfig)
  // const config4 = formatConfig(stationConfig)

  // const contractStepConfig = [
  //   { key: 'client', title: '客户信息', config: config1, form: form1,    },
  //   { key: 'contract', title: '合同信息', config: config2, form: form2,    },
  //   { key: 'houseNo', title: '户号信息', config: config3, form: form3,    },
  //   { key: 'station', title: '电站信息', config: config4, form: form4,    },
  // ];

  const contractStepConfig = [
    { key: 'client', title: '客户信息', form: form1 },
    { key: 'contract', title: '合同信息', form: form2 },
    { key: 'houseNo', title: '户号信息', form: form3 },
    { key: 'station', title: '电站信息', form: form4 },
  ];

  const onChange = goIndex => {
    console.log('onChange:', goIndex, completeIndex.current);
    // if (current > -1 && current < contractStepConfig.length) {
    if (goIndex < completeIndex.current) {
      setCurrent(goIndex);
    }
  };

  const next = async () => {
    console.log(' next ： ', current);

    const indexs = current + 1;
    setCurrent(indexs);
    if (indexs > completeIndex.current) {
      completeIndex.current = indexs;
    }

    // const getRes = async (v) => {
    //   try {
    //     const res = await v.form.validateFields();
    //     console.log('  contractStepConfig res await 结果  ：', res);
    //   } catch (error) {
    //     console.log(' next error ： ', error);
    //   }

    // }

    // // contractStepConfig.forEach(getRes)
    // const indexs = current + 1
    // if (indexs > completeIndex.current) {
    //   try {
    //     const propsForm = contractStepConfig[current].form
    //     const res = await propsForm.validateFields();
    //     console.log('  next res await 结果  ：', res);
    //     setCurrent(indexs);
    //   } catch (error) {
    //     console.log(' next error ： ', error);
    //   }
    //   completeIndex.current = indexs
    // }
  };

  const onFieldChange = v => {
    console.log(' onFieldChange ： ', v);
  };

  const prev = () => {
    console.log(' prev ： ', current);

    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  // const propsForm = contractStepConfig[current].form
  // console.log('  propsForm ：', propsForm, contractStepConfig, Form.useForm(),  )//

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

  // form1.setFieldsValue({ names: 'Hi, man!' });

  // setTimeout(() => {
  //   console.log('  延时器 ： ',  )
  //   form1
  //   .validateFields()
  //   .then(values => {
  //     console.log(' setTimeout values await 结果  ：', values,  )//
  //   })
  //   .catch(info => {
  //     console.log('  setTimeout Validate Failed:', info);
  //   });
  // }, 6000)

  return (
    <div className="contractStepForm  ">
      <Steps
        current={current}
        onChange={onChange}
        // type="navigation"
        className={`stepWrapper`}
      >
        {[...contractStepConfig, completeItem].map((v, i) => (
          <Step
            // icon={null}
            // status="finish"
            title={v.title}
            key={v.key}
          />
        ))}
      </Steps>

      <ContractRelativeForm
        index={current}
        // propsForm={propsForm}
        formConfigs={contractStepConfig}
        onFieldChange={onFieldChange}
      ></ContractRelativeForm>

      {current === 0 && <AdminForm {...props}></AdminForm>}

      {current === 4 && <SuccResult></SuccResult>}

      {current < 4 && stepAction}
    </div>
  );
};

ContractStepForm.defaultProps = {};

export default ContractStepForm;
