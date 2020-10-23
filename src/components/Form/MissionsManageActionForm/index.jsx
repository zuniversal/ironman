import React from 'react';
import './style.less';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
} from 'antd';

import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

export const MissionsManageWorkOrderForm = props => {
  console.log(' MissionsManageWorkOrderForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '客户',
        name: '',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '名称',
        name: 'name',
      },
    },
    {
      formType: 'Search',
      selectData: props.userList,
      itemProps: {
        label: '类型',
        name: 'type',
      },
      comProps: {
        // disabled: true,
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '分配给',
        name: '',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageWorkOrderForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageWorkOrderForm.defaultProps = {};

export const MissionsManageContractForm = props => {
  console.log(' MissionsManageContractForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getContractAsync,
      selectData: props.ContractList,
      itemProps: {
        label: '选择合同',
        name: '',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageContractForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageContractForm.defaultProps = {};

export const MissionsManageScheduleForm = props => {
  console.log(' MissionsManageScheduleForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'DatePicker',
      itemProps: {
        label: '选择日期',
        name: '',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageScheduleForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageScheduleForm.defaultProps = {};

const scheduleRadios = [
  { label: '通过', value: 'yes', key: 'yes' },
  { label: '驳回', value: 'no', key: 'no' },
];

export const MissionsManageConfirmScheduleForm = props => {
  console.log(' MissionsManageConfirmScheduleForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Radio',
      radioData: scheduleRadios,
      opType: 'group',
      itemProps: {
        label: '确认排期',
        name: '',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '理由',
        name: '',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsManageConfirmScheduleForm '}>
      <SmartForm
        // flexRow={6}
        // config={config}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageConfirmScheduleForm.defaultProps = {};
