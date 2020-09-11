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
  Result,
  Typography,
  Divider,
  
} from 'antd';
import { SmileOutlined, CloseCircleOutlined,  } from '@ant-design/icons';

import SmartForm from '@/common/SmartForm'; //
import SmartModal from '@/common/SmartModal'; //
import { regoins } from '@/configs'; //

const { Paragraph, Text } = Typography;

export const config = [
  {
    formType: 'rowText',
    rowText: '基本信息:',
    noRule: true,
    itemProps: {
      label: '基本信息:',
      key: 'rowText',
    },
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '客户名称',
    },
    comProps: {},
  },
  {
    formType: 'Select',
    itemProps: {
      label: '客户类型',
    },
    comProps: {},
  },
  {
    formType: 'Select',
    itemProps: {
      label: '所属行业',
    },
    comProps: {},
  },
  {
    formType: 'Select',
    itemProps: {
      label: '企业规模',
    },
    comProps: {},
  },
  {
    formType: 'Select',
    itemProps: {
      label: '资产规模',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '总面积',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '占地面积',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '企业LOGO',
    },
    comProps: {},
  },

  {
    formType: 'rowText',
    rowText: '位置信息',
    noRule: true,
    itemProps: {
      label: '位置信息',
      key: 'rowText',
    },
  },
  {
    formType: 'Cascader',
    itemProps: {
      label: '区域',
    },
    comProps: {
      options: regoins,
    },
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '详细地址',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '经度',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '纬度',
    },
    comProps: {},
  },

  {
    formType: 'rowText',
    rowText: '管理员信息',
    noRule: true,
    itemProps: {
      label: '管理员信息',
      key: 'rowText',
    },
  },
  {
    formType: 'Dynamic',
    itemProps: {
      // label: '用户名',
      // label: ' ',
      className: 'noMBottom',
    },
    comProps: {
      // key: 'userName',
      // formType: 'Select',
      itemProps: {
        label: '用户名',
      },
      comProps: {},
    },
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '密码',
    },
    comProps: {},
  },
  {
    // formType: 'Select',
    itemProps: {
      label: '手机号',
    },
    comProps: {},
  },

  {
    formType: 'rowText',
    rowText: '其他信息',
    noRule: true,
    itemProps: {
      label: '其他信息',
      key: 'rowText',
    },
  },

  // {
  //   // formType: 'Select',
  //   itemProps: {
  //     label: '下属户号',
  //   },
  //   comProps: {},
  // },

  <Form.Item label="下属户号" key={'captcha'} className={'noMBottom'}>
    <Row gutter={8}>
      <Col span={12}>
        <Form.Item
          name="houseNo"
          // label="下属户号"
          key={'houseNo'}
          rules={[
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Button>生成客户画像</Button>
      </Col>
    </Row>
  </Form.Item>,

  {
    formType: 'Select',
    itemProps: {
      label: '附件',
    },
    comProps: {},
  },
];


export const ErrorInfo = (props) => {
  return <div className="errorInfo">
    <Divider></Divider>
    <div className={'errText'}  >错误信息</div>
    <div className={'errorRow'}  >
      <CloseCircleOutlined  className={'closeIcon'} /> 
      <span className="errorText">与公司名称不符</span>
    </div>
    <div className={'errorRow'}  >
      <CloseCircleOutlined  className={'closeIcon'} /> 
      <span className="errorText">与公司名称不符</span>
    </div>
    <div className="btnWrapper">
      <Button key="buy">返回列表</Button>
      <Button type="primary" >重新导入</Button>
    </div>
  </div> 
}





const ResultModal = props => {
  const [form] = Form.useForm();
  console.log(' ResultModal ： ', props, form); //

  const { show, onOk, onCancel, onSubmit, onFail, modalProps, resProps,  } = props; //

  // const onOk = e => {
  //   console.log(' onOk   e, ,   ： ', e);

  //   onOk && onOk({ e, form });
  // };

  const {status = 'succ', children,  } = resProps

  const statusMap = {
    succ: 'success',
    success: 'success',
    error: 'error',
  }[status]

  console.log(' statusMap ： ', statusMap, status,  )// 
  

  return <SmartModal 
    width={'400px'}
    footer={null}
    className={`resultModal ${statusMap} `} 
    {...modalProps}

  >
    <Result
      // status={statusMap}
      subTitle="subTitle"
      {...resProps} 
      
    > 
      {children}
    </Result>
  </SmartModal>;
};

ResultModal.defaultProps = {
  
  
};

export default ResultModal;
