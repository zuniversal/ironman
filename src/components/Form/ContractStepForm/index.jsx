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

  return (
    <div className="contractStepForm  ">
      <Steps
        current={current}
        onChange={onChange}
        // type="navigation"
      >
        {contractStepConfig.map((v, i) => (
          <Step
            icon={null}
            // status="finish"
            title={v.title}
            key={v.key}
          />
        ))}
      </Steps>

      <ContractRelativeForm></ContractRelativeForm>

      <Button type="primary" onClick={prev}>
        上一步
      </Button>
      <Button type="primary" onClick={next}>
        下一步
      </Button>
    </div>
  );
};

ContractStepForm.defaultProps = {};

export default ContractStepForm;
