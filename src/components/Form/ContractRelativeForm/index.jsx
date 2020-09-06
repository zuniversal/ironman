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
  
} from 'antd';
import {
  UploadOutlined,

} from '@ant-design/icons';

import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const normFile = e => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};


const reportConfig = [
  { value: '是', key: 'key1',  },
  { value: '否', key: 'key2',  },
]

const reportOption = reportConfig.map((v) => <Radio value={v.key} >{v.value}</Radio>)
console.log(' reportOption  reportConfig.map v ： ', reportOption,   )



export const clientConfig = [
  {
    itemProps: {
      label: '是否新客户',
    },
  },


  {
    formType: 'rowText',
    rowText: '基本信息:',
    // noRule: true,
    itemProps: {
      label: '基本信息:',
    },
  },

  {
    itemProps: {
      label: '客户名称',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '客户类型',
    },
  },

  {
    formType: 'Select',
    itemProps: {
      label: '所属行业',
    },
  },

  {
    formType: 'Select',
    itemProps: {
      label: '企业规模',
    },
  },

  {
    formType: 'Select',
    itemProps: {
      label: '资产规模',
    },
  },

  {
    itemProps: {
      label: '总面积',
    },
  },

  {
    itemProps: {
      label: '占地面积',
    },
  },

  {
    itemProps: {
      label: '企业LOGO',
    },
  },

  {
    formType: 'rowText',
    rowText: '位置信息:',
    // noRule: true,
    itemProps: {
      label: '位置信息:',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '省份',
    },
  },

  {
    itemProps: {
      label: '经度',
    },
  },

  {
    itemProps: {
      label: '纬度',
    },
  },

  {
    itemProps: {
      label: '详细地址',
    },
  },

  {
    formType: 'rowText',
    rowText: '管理员信息:',
    // noRule: true,
    itemProps: {
      label: '管理员信息:',
    },
  },

  {
    formType: 'Dynamic',
    itemProps: {
      // label: '用户名',
    },
    comProps: {
      itemProps: {
        label: '用户名',
      },
      comProps: {},
    },
  },

  {
    itemProps: {
      label: '密码',
    },
  },

  {
    itemProps: {
      label: '手机号',
    },
  },

  {
    formType: 'rowText',
    rowText: '其他信息:',
    // noRule: true,
    itemProps: {
      label: '其他信息:',
    },
  },
  {
    itemProps: {
      label: '附件',
    },
  },
];

export const contractConfig = [
  {
    formType: 'rowText',
    rowText: '基本信息:',
    // noRule: true,
    itemProps: {
      label: '基本信息:',
    },
  },
  {
    itemProps: {
      label: '所属客户',
    },
  },
  {
    itemProps: {
      label: '户号',
    },
  },
  {
    itemProps: {
      label: '托管电站数',
    },
  },
  {
    itemProps: {
      label: '合同编号',
    },
  },
  {
    itemProps: {
      label: '业务主体',
    },
  },
  {
    itemProps: {
      label: '业务员',
    },
  },
  {
    itemProps: {
      label: '合同类型',
    },
  },
  {
    formType: 'DatePicker',
    noRule: true,
    itemProps: {
      label: '录入日期',
    },
  },
  {
    formType: 'DatePicker',
    noRule: true,
    itemProps: {
      label: '生效日期',
    },
  },
  {
    formType: 'DatePicker',
    noRule: true,
    itemProps: {
      label: '结束日期',
    },
  },
  {
    formType: 'rowText',
    rowText: '附近:',
    // noRule: true,
    itemProps: {
      label: '附近:',
    },
  },
  // {
  //   noRule: true,
  //   itemProps: {
  //     label: '合同附件',
  //   },
  // },

  // // 如果没有给 Form.Item 组件指定 key  会导致报错
  // // Warning: Each child in a list should have a unique "key" prop.
  // <Form.Item
  //   key={'attach'} 
  //   name="upload"
  //   label="合同附件"
  //   valuePropName="fileList"
  //   getValueFromEvent={normFile}
  //   extra="支持扩展名：.pdf"
  // >
  //   <Upload name="logo" action="/upload.do" listType="picture">
  //     <Button icon={<UploadOutlined />}>上传文件</Button>
  //   </Upload>
  // </Form.Item>,

  {
    formType: 'rowText',
    rowText: '其他信息:',
    // noRule: true,
    itemProps: {
      label: '其他信息:',
    },
  },
  {
    formType: 'Radio',
    noRule: true,
    itemProps: {
      label: '是否生成客户报告',
    },
    radioOptions: reportOption, 
  },
  
  
  
  
];


export const houseNoConfig = [
  {
    formType: 'rowText',
    rowText: '基本信息:',
    // noRule: true,
    itemProps: {
      label: '基本信息:',
    },
  },
  {
    itemProps: {
      label: '客户',
    },
  },
  {
    itemProps: {
      label: '户号',
    },
  },
  {
    itemProps: {
      label: '签约公司',
    },
  },
  {
    itemProps: {
      label: '客户代表',
    },
  },

  {
    formType: 'rowText',
    rowText: '地址信息:',
    // noRule: true,
    itemProps: {
      label: '地址信息:',
    },
  },
  {
    itemProps: {
      label: '用电地址',
    },
  },
  {
    itemProps: {
      label: '经度',
    },
  },
  {
    itemProps: {
      label: '纬度',
    },
  },

  {
    formType: 'rowText',
    rowText: '电气信息:',
    // noRule: true,
    itemProps: {
      label: '电气信息:',
    },
  },
  {
    itemProps: {
      label: '变压器容量',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '电压等级',
    },
  },
  {
    formType: 'Select',
    itemProps: {
      label: '电价类型',
    },
  },
  {
    itemProps: {
      label: '电站数',
    },
  },

]




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

const ContractRelativeForm = props => {
  console.log(' ContractRelativeForm ： ', props); //

  const {index,  } = props// 

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  // const formConfig = formatConfig(config);
  // console.log(' formConfig ： ', formConfig); //
  const config1 = formatConfig(clientConfig)
  const config2 = formatConfig(contractConfig)
  const config3 = formatConfig(houseNoConfig)
  // 
  const configs = [
    config1,
    config2,
    config3,
    config1,
    config2,
  ][index]
  

  return (
    <div className={''}>
      <SmartForm
        // config={config}
        // config={formatConfig(config)}
        config={configs}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...props}
      ></SmartForm>
    </div>
  );
};

ContractRelativeForm.defaultProps = {};

export default ContractRelativeForm;
