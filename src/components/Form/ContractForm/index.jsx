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
  Upload,
  Result,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig, reportRadioOp, mockFormData } from '@/utils'; //
import UploadCom from '@/components/Widgets/UploadCom';

const normFile = e => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const choiceRadios = [
  { label: '是', value: 'yes', key: 'yes' },
  { label: '否', value: 'no', key: 'no' },
];

export const config = [
  {
    formType: 'rowText',
    // rowText: '基本信息',
    // noRule: true,
    itemProps: {
      label: '基本信息',
    },
  },
  {
    itemProps: {
      label: '所属客户',
      name: ['customer', 'name'],
    },
  },
  // {
  //   itemProps: {
  //     label: '户号',
  //     name: '',
  //   },
  // },
  // {
  //   itemProps: {
  //     label: '电站数量',
  //     name: '',
  //   },
  // },
  {
    itemProps: {
      label: '合同编号',
      name: 'code',
    },
  },
  {
    itemProps: {
      label: '业务主体',
      name: ['business_entity', 'name'],
    },
  },
  {
    itemProps: {
      label: '业务员',
      name: ['salesman', 'nickname'],
    },
  },
  {
    itemProps: {
      label: '合同类型',
      name: 'type',
    },
  },
  {
    formType: 'DatePicker',
    noRule: true,
    itemProps: {
      label: '录入日期',
      name: '录入日期',
    },
  },
  {
    formType: 'DatePicker',
    noRule: true,
    itemProps: {
      label: '生效日期',
      name: 'effective_date',
    },
  },
  {
    formType: 'DatePicker',
    noRule: true,
    itemProps: {
      label: '结束日期',
      name: 'end_date',
    },
  },

  // {
  //   formType: 'rowText',
  //   // rowText: '附件',
  //   // noRule: true,
  //   itemProps: {
  //     label: '附件',
  //     name: '',
  //   },
  // },
  // // {
  // //   noRule: true,
  // //   itemProps: {
  // //     label: '合同附件',
  // //   },
  // // },

  // // // 如果没有给 Form.Item 组件指定 key  会导致报错
  // // // Warning: Each child in a list should have a unique "key" prop.
  // <Form.Item
  //   key={'attach'}
  //   name="upload"
  //   label="合同附件"
  //   valuePropName="fileList"
  //   getValueFromEvent={normFile}
  //   extra="支持上传.DWG文件"
  // >
  //   <Upload name="logo" action="/upload.do" listType="picture">
  //     <Button icon={<UploadOutlined />}>上传文件</Button>
  //   </Upload>
  // </Form.Item>,
  // // UploadCom,

  // {
  //   formType: 'rowText',
  //   // rowText: '其他信息:',
  //   // noRule: true,
  //   itemProps: {
  //     label: '其他信息:',
  //   },
  // },
  // {
  //   formType: 'Radio',
  //   noRule: true,
  //   itemProps: {
  //     label: '是否生成客户报告',
  //   },
  //   radioData: choiceRadios,
  //   opType: 'group',
  // },
];

const init = {
  name: 'zyb',
  role: '巡检人员',
  tel: 'zyb',
  email: 'zyb',
  dep: '巡检运维',
  // password
  // password2
  // select
};

const ContractForm = props => {
  console.log(' ContractForm ： ', props); //

  const { index } = props; //

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  // const formConfig = formatConfig(config);

  return (
    <div className={''}>
      <SmartForm
        config={config}
        // config={configs}
        formProps={formProps}
        // init={mockFormData(formatConfig(config), )}
        // init={{}}

        {...props}
      ></SmartForm>
    </div>
  );
};

ContractForm.defaultProps = {};

export default ContractForm;
