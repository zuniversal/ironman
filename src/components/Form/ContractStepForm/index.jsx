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
import ContractRelativeForm from '@/components/Form/ContractRelativeForm'; //

const { Step } = Steps;

const contractStepConfig = [
  { key: 'client', title: '客户信息', description: '' },
  { key: 'contract', title: '合同信息', description: '' },
  { key: 'houseNo', title: '户号信息', description: '' },
  { key: 'station', title: '电站信息', description: '' },
  { key: 'complete', title: '完成', description: '' },
];

const ContractStepForm = props => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);

  console.log(' ContractStepForm ： ', props, form); //

  const onChange = current => {
    console.log('onChange:', current);
    setCurrent(current);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };


  const stepAction = <div className='fje'  >
    <div className=' '  >
      <Button className={'actionBtn m-r-10 '}  type="primary" onClick={prev}>
        上一步
      </Button>
      <Button className={'actionBtn m-r-10 '}  type="primary" onClick={next}>
        下一步
      </Button>
    </div>
  </div>




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

      <ContractRelativeForm
        index={current}
        
      ></ContractRelativeForm>

      {current < 4 && stepAction}

    </div>
  );
};

ContractStepForm.defaultProps = {};

export default ContractStepForm;
