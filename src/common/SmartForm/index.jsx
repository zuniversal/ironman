import React, { useState } from 'react';
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

import {
  QuestionCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';

import DynamicForm from './DynamicForm'; //
import FormList from './FormList'; //
import NestForm from './NestForm'; //
import ComplexForm from './ComplexForm'; //
import DepForm from './DepForm'; //
import SearchForm from './SearchForm'; //
import ModalForm from './ModalForm'; //
import DateForn from './DateForn'; //

import { INPUT_TXT, SELECT_TXT } from '@/constants'; //

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  // labelCol: {
  //   xs: { span: 24 },
  //   sm: { span: 8 },
  // },
  // wrapperCol: {
  //   xs: { span: 24 },
  //   sm: { span: 16 },
  // },
};
const tailFormItemLayout = {
  // wrapperCol: {
  //   xs: {
  //     span: 24,
  //     offset: 0,
  //   },
  //   sm: {
  //     span: 16,
  //     offset: 8,
  //   },
  // },
};

const formItemLayoutWithOutLabel = {
  // wrapperCol: {
  //   xs: { span: 24, offset: 0 },
  //   sm: { span: 20, offset: 4 },
  // },
};

const SmartForm = (props, state) => {
  const {
    config,
    formProps,
    init,
    children,
    flexRow,
    formBtn,
    isRowBtn,
    className,
    onSubmit,
    onFail,
  } = props; //
  const [form] = Form.useForm();
  console.log(
    ' %c SmartForm 组件 state, props ： ',
    `color: #333; font-weight: bold`,
    state,
    props,
    form,
    config,
    config[config.length - 1],
  ); //

  const onFinish = (values, rest) => {
    console.log(
      'Received values, rest,   of form: ',
      values,
      rest,
      form,
      props,
      onSubmit,
    );
    onSubmit && onSubmit({ values, form });
  };

  // errorFields: Array(5) errors: ["Please input your E-mail!"]
  // name: ["pwd"]
  // values: {pwd: undefined, }

  const onFinishFailed = (errorInfo, rest) => {
    console.log('Failed:', errorInfo, rest, form, onFail);
    onFail && onFail({ err: errorInfo, form });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        ['.comProps', '.org', '.net'].map(domain => `${value}${domain}`),
      );
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  const rules = (params, extra) => {
    console.log(' rules   params, extra,  ,   ： ', params, extra);
    return [
      // {
      //   type: 'pwd',
      //   message: 'The input is not valid E-mail!',
      // },
      {
        required: true,
        message: 'Please input your E-mail!',
      },
    ];
  };

  const [formLayout, setFormLayout] = useState('horizontal');
  // const onFormLayoutChange = ({ layout }) => {
  //   setFormLayout(layout);
  // };

  const layoutObj = {
    // labelCol: { span: 8 },
    // wrapperCol: { span: 14 },
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };
  const rowLayout = {
    // labelCol: { span: 8 },
    // wrapperCol: { span: 14 },
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const formItemLayout = formLayout === 'horizontal' ? layoutObj : null;

  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = (value, rest) => {
    console.log(' onFormLayoutChange value, rest ： ', value, rest); //
    const { layout, size } = value;

    setFormLayout(layout);
    setComponentSize(size);
  };

  const onGenderChange = (value, rest) => {
    console.log(' onGenderChange value, rest ： ', value, rest); //
    switch (value) {
      case 'male':
        form.setFieldsValue({ test: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ test: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ test: 'Hi there!' });
        return;
    }
  };

  // const labelCom = <span>
  //   Nickname
  //   <Tooltip title="What do you want others to call you?">
  //     <QuestionCircleOutlined />
  //   </Tooltip>
  // </span>
  const labelCom = (
    <span>
      Nickname
      <QuestionCircleOutlined />
    </span>
  );

  const selectOptions = (
    <>
      <Option value="male">male</Option>
      <Option value="female">female</Option>
      <Option value="other">other</Option>
    </>
  );

  // const config = [
  //   {
  //     formType: 'Input',
  //     itemProps: {
  //       label: "Test", name: 'test', key: "test", rules: [
  //         {
  //           required: true,
  //           message: 'Please input your E-mail!',
  //         },
  //       ],
  //       // noStyle: true,
  //     },
  //     comProps: {
  //       allowClear: true,

  //     },
  //   },
  //   {
  //     formType: 'Select',
  //     itemProps: {
  //       label: "Select", name: 'select', key: "select", rules: rules(),
  //     },
  //     comProps: {
  //       allowClear: true,
  //       onChange: onGenderChange,
  //       placeholder: "Select a option and change input text above",
  //     },
  //     selectOptions: selectOptions,

  //   },

  //   {
  //     formType: 'Input',
  //     itemProps: {
  //       label: "Email1", name: 'email', key: "email", rules: [
  //         {
  //           type: 'email',
  //           message: 'The input is not valid E-mail!',
  //         },
  //         {
  //           required: true,
  //           message: 'Please input your E-mail!',
  //         },
  //       ],

  //     },
  //     comProps: {

  //     },
  //   },
  //   {
  //     formType: 'Password',
  //     itemProps: {
  //       // label: "pwd",
  //       label: labelCom,
  //       name: 'pwd', key: "pwd", rules: [
  //         // {
  //         //   type: 'password',
  //         //   message: 'The input is not valid E-mail!',
  //         // },
  //         {
  //           required: true,
  //           message: 'Please input your E-mail!',
  //         },
  //       ],

  //     },
  //     comProps: {

  //     },
  //     addonBefore: prefixSelector,
  //   },
  //   {
  //     formType: 'Password',
  //     itemProps: {
  //       label: "Password", name: 'password', key: "password", rules: rules(),

  //     },
  //     comProps: {

  //     },

  //   },
  //   {
  //     formType: 'Cascader',
  //     itemProps: {
  //       label: "Cascader", name: 'cascader', key: "cascader", rules: rules(),
  //       placeholder: "website",

  //     },
  //     comProps: {
  //       options: residences,

  //     },

  //   },
  //   {
  //     formType: 'AutoComplete',
  //     itemProps: {
  //       label: "AutoComplete", name: 'autocomplete', key: "autocomplete", rules: rules(),

  //     },
  //     comProps: {
  //       options: websiteOptions,
  //       onChange: onWebsiteChange,
  //       placeholder: "website",

  //     },

  //   },

  //   {
  //     formType: 'Checkbox',
  //     itemProps: {
  //       label: "Checkbox", name: 'checkbox', key: "checkbox", rules: rules(),
  //       // Warning: [antd: Checkbox] `value` is not a valid prop, do you mean `checked`?
  //       valuePropName: "checked",

  //     },
  //     comProps: {
  //     },
  //     checkboxContent: <div className=''>
  //       I have read the <a href="">agreement</a>
  //     </div>
  //     ,
  //   },
  // ]

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      test: 'Hello world!',
      select: 'zyb',
    });
  };

  // return <Row gutter={24}>{colForm}</Row>

  const formItems = config.map((items, i) => {
    const {
      formType = 'Input',
      checkboxContent,
      itemProps,
      comProps,
      selectOptions,
      customLabel,
      rowText,

      type,
      noRule,
    } = items;

    if (typeof type === 'function') {
      return items;
    }

    const { label } = itemProps;

    const formItemProps = {
      ...itemProps,
      className: 'formItems',
      rules: noRule ? [] : rules(),
    };

    const labelMap = {
      rowText: '',
      Input: INPUT_TXT + label,
      Select: SELECT_TXT + label,
      Password: INPUT_TXT + label,
      Cascader: INPUT_TXT + label,
      AutoComplete: INPUT_TXT + label,
      Checkbox: INPUT_TXT + label,
    };

    const formLabel = customLabel ? customLabel : labelMap[formType]; //
    // console.log('  formLabel ：', formLabel,  )//

    const realComProps = {
      ...comProps,
      placeholder: formLabel,
    };

    const formItemMap = {
      rowText: rowText,
      Input: <Input allowClear {...realComProps} />,
      Select: (
        <Select allowClear {...realComProps}>
          {selectOptions}
        </Select>
      ),
      Password: <Input.Password {...realComProps} />,
      Cascader: <Cascader {...realComProps} />,
      AutoComplete: (
        <AutoComplete {...realComProps}>
          <Input />
        </AutoComplete>
      ),
      Checkbox: <Checkbox {...realComProps}>{checkboxContent}</Checkbox>,
    };

    const formItemCom = formItemMap[formType];
    // console.log(' formItemCom ： ', formItemCom, formItemMap, formType,  )//

    if (!formItemCom) {
      return <div key={Math.random()}>没有匹配</div>;
    }

    if (rowText) {
      // console.log(' formItemProps ： ', formItemProps, formItemCom, formItemMap, formType, rowText,     )//
      return (
        <Form.Item
          // name={key}
          // label={label}
          // rules={rules}
          // valuePropName="checked"
          // {...formItemProps}
          // noStyle
          {...rowLayout}
          {...formItemProps}
        >
          {/* {formItemCom} */}
        </Form.Item>
      );
    }

    if (flexRow) {
      console.log(' flexRowflexRow ： ', flexRow); //
      const colForm = (
        <Col span={flexRow} key={itemProps.key}>
          <Form.Item
            // name={key}
            // label={label}
            // rules={rules}
            // valuePropName="checked"
            // {...formItemProps}
            {...formItemProps}
          >
            {formItemCom}
          </Form.Item>
        </Col>
      );

      return colForm;
    }

    // console.log(' itemProps ： ', formItemCom, formType, items, itemProps, comProps,   )//

    // const formItemProps = {
    //   name: key,
    //   label: label,
    //   rules: rules,
    //   valuePropName: "checked"
    // }

    return (
      <Form.Item
        // name={key}
        // label={label}
        // rules={rules}
        // valuePropName="checked"
        // {...formItemProps}
        className={'formItems'}
        {...formItemProps}
      >
        {formItemCom}
      </Form.Item>
    );
  });

  console.log(' formProps ： ', formProps, formItemLayout, formLayout); //
  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{}}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      scrollToFirstError
      {...formProps}
      className={`smartForm ${className}`}
    >
      {flexRow ? (
        <Row gutter={24}>
          {formItems}

          {/* {formBtn && <Col span={flexRow}  >
          <Form.Item   >
            {formBtn}   
          </Form.Item>
        </Col>} */}
          <Form.Item noStyle>
            {isRowBtn ? <div>{formBtn}</div> : formBtn}
          </Form.Item>
        </Row>
      ) : (
        formItems
      )}

      {children}

      {/* <Form.Item label="Form Layout" name="layout">
        <Radio.Group value={formLayout}>
          <Radio.Button value="horizontal">Horizontal</Radio.Button>
          <Radio.Button value="vertical">Vertical</Radio.Button>
          <Radio.Button value="inline">Inline</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>


      
      <DateForn></DateForn>
      <ModalForm></ModalForm>
      <SearchForm></SearchForm> */}

      {/* 
      <SearchForm></SearchForm>
      <SearchForm></SearchForm>
      <SearchForm></SearchForm>
      <SearchForm></SearchForm>
      <SearchForm></SearchForm> */}
      {/* <DepForm></DepForm> */}
      {/* {ComplexForm()} */}
      {/* <ComplexForm></ComplexForm> */}
      {/* {NestForm()} */}
      {/* <NestForm></NestForm> */}
      {/* {FormList()} */}
      {/* {DynamicForm()} */}
      {/* <DynamicForm></DynamicForm> */}

      {/* <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item> */}
    </Form>
  );
};

SmartForm.defaultProps = {
  config: [],
  init: {},
  formProps: {},
  formBtn: null,
  isRowBtn: false,
  className: '',
};

export default SmartForm;
