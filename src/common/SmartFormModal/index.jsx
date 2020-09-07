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
} from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import SmartForm from '@/common/SmartForm'; //
import SmartModal from '@/common/SmartModal'; //
import { regoins } from '@/configs'; //

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
  // {
  //   formType: 'Dynamic',
  //   itemProps: {
  //     // label: '用户名',
  //     // label: ' ',
  //     className: 'noMBottom',
  //   },
  //   comProps: {
  //     key: 'userName',
  //     // formType: 'Select',
  //     itemProps: {
  //       label: '用户名',
  //     },
  //     comProps: {},

  //   },
  // },
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

const ClientFormModal = props => {
  const [form] = Form.useForm();
  console.log(' ClientFormModal ： ', props, form); //

  const {
    // modalProps,
    // formsProps,

    show,
    onOk,
    onCancel,
    onSubmit,
    onFail,

    config,
  } = props; //

  // const formConfig = config.map((v, i) => ({ ...v, itemProps:  v.formType === 'rowText' ? {...v.itemProps} : {...v.itemProps, key: `key{i}`, name: `name${i}`, },    }))
  // const formConfig = config.map((v, i) => ({ ...v, itemProps:  {...v.itemProps, key: `key{i}`, name: `name${i}`, noRule: v.formType === 'rowText',   },   }))
  const formConfig = config.map((v, i) => ({
    ...v,
    // itemProps: { ...v.itemProps, key: `key${i}`, name: `name${i}` },
    // itemProps: v.rowText || typeof type === 'function' ? { ...v.itemProps, key: `key${i}`,  } : { ...v.itemProps, key: `key${i}`, name: `name${i}` },
    itemProps:
      v.rowText || v.formType === 'Dynamic'
        ? { ...v.itemProps, key: `key${i}` }
        : { ...v.itemProps, key: `key${i}`, name: `name${i}` },
  }));
  // console.log(' formConfig  config.map v ： ', formConfig,   )

  const handleOk = e => {
    console.log(' handleOk   e, ,   ： ', e);

    // form
    // .validateFields()
    // .then(values => {
    //   console.log('  values await 结果  ：', values,  )//
    //   form.resetFields();
    //   // onCreate(values);
    // })
    // .catch(info => {
    //   console.log('Validate Failed:', info);
    // });

    onOk && onOk({ e, form });
  };

  return (
    <div className={''}>
      <SmartModal
        // {...modalProps}

        show={show}
        onOk={handleOk}
        onCancel={onCancel}
      >
        <SmartForm
          // flexRow={4}
          config={formConfig}
          // formProps={formProps}
          // init={init}
          // init={{}}
          init={{
            key9: regoins,
          }}
          // {...formsProps}
          propsForm={form}
          onSubmit={onSubmit}
          onFail={onFail}
        ></SmartForm>
      </SmartModal>
    </div>
  );
};

ClientFormModal.defaultProps = {
  config: [],
};

export default ClientFormModal;
