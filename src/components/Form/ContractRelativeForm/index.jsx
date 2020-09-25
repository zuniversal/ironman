import React from 'react';
import PropTypes from 'prop-types'
import './style.less';
import {
  Form,
  Button,
  Upload,
  Result,
  Tabs 

} from 'antd';

import {
  UploadOutlined,
  PlusOutlined,
  
} from '@ant-design/icons';

import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig, reportRadioOp,  } from '@/utils'//


const { TabPane } = Tabs;

const normFile = e => {
  console.log('Upload event', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};



const choiceRadios = [
  { label: '是', value: 'yes', key: 'yes',  },
  { label: '否', value: 'no', key: 'no',  },
]


export const clientConfig = [
  {
    itemProps: {
      label: '是否新客户',
    },
  },


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
    // rowText: '位置信息',
    // noRule: true,
    itemProps: {
      label: '位置信息',
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
    // rowText: '管理员信息',
    // noRule: true,
    itemProps: {
      label: '管理员信息',
    },
  },

  {
    formType: 'Dynamic',
    itemProps: {
      // label: '',
      label: '用户名',
    },
    comProps: {
      itemProps: {
        label: '用户名',
      },
      comProps: {
        className: 'w-320',  
      },
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
    // rowText: '其他信息',
    // noRule: true,
    itemProps: {
      label: '其他信息',
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
    // rowText: '基本信息',
    // noRule: true,
    itemProps: {
      label: '基本信息',
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
    // rowText: '附件',
    // noRule: true,
    itemProps: {
      label: '附件',
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
  <Form.Item
    key={'attach'} 
    name="upload"
    label="合同附件"
    valuePropName="fileList"
    getValueFromEvent={normFile}
    extra="支持扩展名：.pdf"
  >
    <Upload name="logo" action="/upload.do" listType="picture">
      <Button icon={<UploadOutlined />}>上传文件</Button>
    </Upload>
  </Form.Item>,

  {
    formType: 'rowText',
    // rowText: '其他信息',
    // noRule: true,
    itemProps: {
      label: '其他信息',
    },
  },
  {
    formType: 'Radio',
    noRule: true,
    itemProps: {
      label: '是否生成客户报告',
    },
    radioData: choiceRadios,
    opType: 'group',
  },
  
  
  
];


export const houseNoConfig = [
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
    // rowText: '地址信息',
    // noRule: true,
    itemProps: {
      label: '地址信息',
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
    // rowText: '电气信息',
    // noRule: true,
    itemProps: {
      label: '电气信息',
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





export const stationConfig = [
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
    },
  },
  {
    itemProps: {
      label: '户号',
    },
  },
  
  {
    itemProps: {
      label: '电站名称',
    },
  },
  
  {
    itemProps: {
      label: '托管电站数',
    },
  },


  {
    formType: 'rowText',
    // rowText: '电气信息',
    // noRule: true,
    itemProps: {
      label: '电气信息',
    },
  },
  {
    itemProps: {
      label: '电源编号',
    },
  },
  
  {
    itemProps: {
      label: '进线名称',
    },
  },
  
  {
    itemProps: {
      label: '电压等级',
    },
  },
  
  {
    itemProps: {
      label: '倍率',
    },
  },


  {
    itemProps: {
      label: '电表号',
    },
  },
  {
    itemProps: {
      label: '电价类型',
    },
  },
  {
    itemProps: {
      label: '电功率考核因数',
    },
  },
  {
    itemProps: {
      label: '计费方式',
    },
  },
  
  
  {
    itemProps: {
      label: '变压器容童',
    },
  },
  

  {
    formType: 'rowText',
    // rowText: '设备信息',
    // noRule: true,
    itemProps: {
      label: '设备信息',
    },
  },
  {
    itemProps: {
      label: '请筛选设备',
    },
  },

  {
    formType: 'rowText',
    // rowText: '监控信息',
    // noRule: true,
    itemProps: {
      label: '监控信息',
    },
  },
  
  {
    itemProps: {
      label: '请筛选监控点',
    },
  },

  // {
  //   formType: 'rowText',
  //   // rowText: '一次电气图',
  //   // noRule: true,
  //   itemProps: {
  //     label: '一次电气图',
  //   },
  // },
  <Form.Item
    key={'attach'} 
    name="upload"
    label="一次电气图"
    valuePropName="fileList"
    getValueFromEvent={normFile}
    extra="支持扩展名：.pdf"
  >
    <Upload name="logo" action="/upload.do" 
      listType="picture-card"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
      {/* <Button icon={<UploadOutlined />}>上传</Button> */}
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    </Upload>
  </Form.Item>,
]



export const SuccResult = props => {

  return <Result
    status="success"
    title="关联新增成功"
    // subTitle="subTitle"
    extra={[
      <Button type="primary" key="console">
        返回合同列表
      </Button>,
    ]}
  
  /> 
}


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

  const {index, propsForm, formConfigs, } = props// 

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  // const formConfigs = formatConfig(config);
  // console.log(' formConfigs ： ', formConfigs); //
  const config1 = formatConfig(clientConfig)
  const config2 = formatConfig(contractConfig)
  const config3 = formatConfig(houseNoConfig)
  const config4 = formatConfig(stationConfig)
  // 
  const configArr = [
    config1,
    config2,
    config3,
    config4,
  ]
  
  const configs = configArr[index]
  

  return (
    <div className={''}>
      {formConfigs.map((v, i) => <div key={i} className={i === index ? `${i}` : `${i} hide `}   >
        <SmartForm
          // config={config}
          // config={formatConfig(config)}
          // config={v}
          // config={v.config}
          config={configArr[i]}
          formProps={formProps}
          // init={init}
          // init={{}}

          // propsForm={propsForm}
          // propsForm={formConfigs[index].form}
          propsForm={v.form}
          // propsForm={Form.useForm()[0]}
          {...props}
        ></SmartForm>
      </div>)}



    </div>
  );
};


ContractRelativeForm.defaultProps = {
  formConfigs: [],


};

ContractRelativeForm.propTypes = {
  formConfigs: PropTypes.array,
  

}

export default ContractRelativeForm;
