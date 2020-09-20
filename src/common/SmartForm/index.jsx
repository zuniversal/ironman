import React, { useState, isValidElement,  } from 'react';
import PropTypes from 'prop-types'
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
  DatePicker,
  Divider,


} from 'antd';
import moment from 'moment'

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

import { INPUT_TXT, SELECT_TXT, REQUIRE } from '@/constants'; //
import { mockFormData, renderSelectOp, renderRadioOp,   } from '@/utils'; //

const { TextArea } = Input
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const layoutObj = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 14 },
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },// 
    sm: { span: 7 },// 
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },// 
    sm: { span: 17 },// 
  },
};
const noLabelLayout = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 14 },
  labelCol: {
    // xs: { span: 24 },
    sm: { span: 0 },
  },
  wrapperCol: {
    // xs: { span: 24 },
    sm: { span: 24 },
  },
};
const rowLayout = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 14 },
  labelCol: {
    xs: { span: 24 },
    // sm: { span: 4 },
    sm: { span: 0 },
  },
  wrapperCol: {
    xs: { span: 24 },
    // sm: { span: 20 },
    sm: { span: 24 },
  },
};

export const getLabel = (label, key) => {
  const labelMap = {
    rowText: '',
    Input: INPUT_TXT + label,
    TextArea: INPUT_TXT + label,
    Select: SELECT_TXT + label,
    Password: INPUT_TXT + label,
    Cascader: INPUT_TXT + label,
    AutoComplete: INPUT_TXT + label,
    Checkbox: INPUT_TXT + label,
    Radio: SELECT_TXT + label,
    DatePicker: SELECT_TXT + label,
  };

  return labelMap[key];
};


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






/* 
  抽象表单组件为通用型表单 封装带有相关默认通用操作 
  支持表单配置形式传入 与 原来的直接传入表单组件形式
  
  尚未开发完 根据项目持续完善 

*/


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
    onFieldChange,
    propsForm,
    isMockData,
    action,
    noPh,

  } = props; //

  console.log(
    ' %c SmartForm 组件 state, props ： ',
    `color: #333; font-weight: bold`,
    state,
    props,
    config,
    config[config.length - 1],
  ); //

  const [ initData, setInitData ] = useState(() => {
    const dynamicFields = config.filter((v) => v.formType === 'Dynamic').map((v) => v.itemProps.key)
    const obj = {}
    dynamicFields.forEach((v) => obj[v] = ['',  ])
    console.log(' 惰性初始state   ： ', obj, dynamicFields,  )
    return obj
  })
    

  // const initialValues = (isMockData && action === 'edit') ? mockFormData(config, ) : {}
  const initialValues = Object.keys(init).length ? init : (isMockData && action === 'edit') ? mockFormData(config, init, ) : initData
  // const initialValues = Object.keys(init).length ? init : (isMockData ) ? mockFormData(config, init, ) : {}
  console.log(' SmartForm initialValues ： ', props, initialValues, action, action === 'edit',  )// 
  // const initialValues = init ? init : {}
  // const initialValues = { field2: 'zyb',    }

  // const [form] = Form.useForm(initialValues, );// 不行 
  const [form] = Form.useForm();
  const formControl = propsForm ? propsForm : form; //
  // const formControl = form; //

  
  // setTimeout(() => {
  //   console.log('  延时器 ： ',  )
  //   form
  //   .validateFields()
  //   .then(values => {
  //     console.log('  values await 结果  ：', values,  )//
  //     form.resetFields();
  //     // onCreate(values);
  //   })
  //   .catch(info => {
  //     console.log('Validate Failed:', info);
  //   });
  // }, 2000)
  



  const onFinish = (values, rest) => {
    console.log(
      'Received values, rest,   of form: ',
      values,
      rest,
      form,
      props,
      onSubmit,
    );
    
    // onSubmit && onSubmit({ values, form });
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
    const { items, label, formType } = params;
    const message = getLabel(label, formType);
    // console.log(' rules   params, extra,  ,   ： ', params, extra, message, label, formType,  );

    return [
      // {
      //   type: 'pwd',
      //   message: 'The input is not valid E-mail!',
      // },
      {
        required: true,
        message: label + REQUIRE,
      },
    ];
  };

  const [formLayout, setFormLayout] = useState('horizontal');
  // const onFormLayoutChange = ({ layout }) => {
  //   setFormLayout(layout);
  // };

  const formItemLayout = formLayout === 'horizontal' ? layoutObj : null;

  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = (value, rest) => {
    console.log(' onFormLayoutChange value, rest ： ', value, rest); //
    const { layout, size } = value;

    onFieldChange && onFieldChange({ value,  });

    // setFormLayout(layout);
    // setComponentSize(size);
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

  const formItems = config.map((item, i) => {
    const items = { formType: 'Input', ...item };
    const {
      formType = 'Input',
      checkboxContent,
      itemProps,
      comProps,
      radioOptions,
      selectOptions,
      customLabel,
      rowText,
      extra,
      type,
      noRule,
      radioData = [], 
      selectData = [], 
      opType, 
      haveDivider,
       
    } = items;
    
    // if (typeof type === 'function') {
    if (isValidElement(items)) {
      return items;
    }

    const { label,  } = itemProps;
    const itemPropsCls = itemProps.className


    const formItemCommonProps = {
      colon: false,  
      ...itemProps,
      
    }
    // if (formType === 'Dynamic') {
    //   console.log(' formTypeformType ： ', formItemCommonProps, formType, formType === 'Dynamic'    )// 
    //   formItemCommonProps.className = `dynamicRow ${formItemCommonProps.className}  `
    // }

    const formItemNoRuleProps = {
      ...formItemCommonProps,
      className: `formItems rowText ${itemPropsCls}  `,
    };
    const formItemProps = {
      ...formItemCommonProps,
      className: `formItems ${itemPropsCls}  `,
      rules: noRule ? undefined : rules({ items, label }),
    };


    const formLabel = customLabel ? customLabel : getLabel(label, formType);
    // console.log('  formLabel ：', formLabel,  )//

    const placeholder = noPh ? '' : formLabel//  
    // console.log('  placeholder ：', placeholder,  )

    const realComProps = {
      className: 'w-320',
      ...comProps,
      placeholder: placeholder,
    };
    const dynamicComProps = {
      className: 'w-320',
      ...comProps,
      // comProps: {...comProps, className: `${comProps.className} dynamiRow` },
      placeholder: placeholder,
      name: formItemProps.key,
      init: initialValues[comProps?.key],
      
    };
    // console.log(' realComProps11 ： ', realComProps, itemProps, formItemProps, comProps,    )// 



    
    const renderRadioOptions = renderRadioOp(radioData, opType, )
    const renderSelectOptions = renderSelectOp(selectData, opType, )


    const formItemMap = {
      rowText: label,
      Divider: <Divider  />,
      Input: <Input allowClear {...realComProps} />,
      TextArea: <TextArea
        autoSize={{ minRows: 3, maxRows: 5 }}
        allowClear {...realComProps}
      />,
      Select: <Select allowClear {...realComProps}
        filterOption
        showSearch
      >
        {renderSelectOptions}
        {/* <Option value="male">male</Option>
        <Option value="female">female</Option>
        <Option value="other">other</Option> */}
      </Select>,
      Password: <Input.Password {...realComProps} />,
      Cascader: <Cascader {...realComProps} />,
      AutoComplete: (
        <AutoComplete {...realComProps}>
          <Input />
        </AutoComplete>
      ),
      Checkbox: <Checkbox {...realComProps}>{checkboxContent}</Checkbox>,
      CheckboxGroup: <Checkbox.Group {...realComProps}  />,
      Radio:  <Radio.Group>
        {/* <Radio value="item">item</Radio> */}
        {renderRadioOptions}
      </Radio.Group>,
      DatePicker: <DatePicker {...realComProps} />,

      Dynamic: <DynamicForm {...dynamicComProps}   ></DynamicForm>,
    };

    const formItemCom = formItemMap[formType];
    // console.log(' formItemCom ： ', formItemCom, formItemMap, formType, items, formLabel,  )//

    if (!formItemCom) {
      return <div key={Math.random()}>没有匹配</div>;
    }

    if (formType === 'Divider') {
      return (
        <Form.Item
          labelAlign={'left'}
          {...rowLayout}
          {...formItemNoRuleProps}
        >
          <Divider />
        </Form.Item>
      );
    }

    if (formType === 'rowText') {
      // console.log(
      //   ' rowText formItemProps ： ',
      //   formItemProps,
      //   formItemCom,
      //   formItemMap,
      //   formType,
      //   rowLayout,
      //   formItemNoRuleProps,
      // ); //
      return (
        <Form.Item
          // name={key}
          // label={label}
          // rules={rules}
          // valuePropName="checked"
          // {...formItemProps}
          // noStyle
          labelAlign={'left'}
          {...rowLayout}
          {...formItemNoRuleProps}
        >
          {formItemCom}
        </Form.Item>
      );
    }

    if (flexRow) {
      // console.log(' flexRowflexRow ： ', flexRow); //
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

    const normalItem = <Form.Item
      // name={key}
      // label={label}
      // rules={rules}
      // valuePropName="checked"
      // {...formItemProps}
      // className={`formItems ${className}  `}

      {...formItemProps}
      // {...(formType === 'Dynamic' ? formItemNoRuleProps : formItemProps)}
      // {...(formType === 'Dynamic' ? rowLayout : {})}
    >
      {formItemCom} 
      {/* 注意 不能有别的内容 否则初始值设置无效  */}
      {/* {extra} */}
    </Form.Item>

      
    if (extra) {
      // console.log(' extra ： ', extra, formItemProps,  )// 
      const {label, key, rules, ...rest } = formItemProps
      
      return <Form.Item
        // key= "field19"
        // label= "field19"

        key={key}
        label={label}
        // rules={rules}
        className={'extraRow'} 
      >
        <Form.Item
            // name= "field19"
            {...rest}
            rules={rules}
          
          >
          {formItemCom} 
          {/* {extra} */}
        </Form.Item>
        <Form.Item>
          {extra} 
        </Form.Item>
      </Form.Item>

    }

    

    // console.log(' itemProps ： ', formItemCom, formType, items, itemProps, comProps,   )//

    // const formItemProps = {
    //   name: key,
    //   label: label,
    //   rules: rules,
    //   valuePropName: "checked"
    // }


    // console.log(' formItemProps ： ', formItemProps,  )// 
    return (
      normalItem
    );
  });


  // console.log(' formProps ： ', form, formProps, formItemLayout, formLayout, initialValues,    ); //
  return (
    <Form
      preserve={false}
      {...formItemLayout}
      // layout={formLayout}
      form={formControl}
      name="smartForm"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      // initialValues={{}}
      initialValues={initialValues}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      scrollToFirstError
      {...formProps}
      className={`smartForm ${className}`}
      // layout="inline"
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
  className: '',
  config: [],// 表单配置项
  flexRow: 0,// 弹性布局值
  isRowBtn: false,// 是否显示横向表单按钮
  init: {},// 表单初始值
  // formProps: {},  
  isMockData: false,  
  isMockData: true,  // 是否使用 mock 数据
  action: '',  // 表单的操作行为
  noPh: false, // 是否显示表单项的 placeholder 文本 

  
};

SmartForm.propTypes = {
  className: PropTypes.string,
  config: PropTypes.array,
  flexRow: PropTypes.number,
  isRowBtn: PropTypes.bool,
  init: PropTypes.object,
  // formProps: PropTypes.object,
  isMockData: PropTypes.bool,
  noPh: PropTypes.bool,
  action: PropTypes.string,

}

export default SmartForm;
