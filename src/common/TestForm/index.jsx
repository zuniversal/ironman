import React, { useState, isValidElement } from 'react';
import PropTypes from 'prop-types';
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
import moment from 'moment';

import {
  QuestionCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import DynamicForm from './DynamicForm'; //
import { INPUT_TXT, SELECT_TXT, REQUIRE } from '@/constants'; //
import {
  mockFormData,
  renderSelectOp,
  renderRadioOp,
  formatConfig,
  renderCheckboxOp,
} from '@/utils'; //

const { TextArea } = Input;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const layoutObj = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 14 },
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }, //
    sm: { span: 7 }, //
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }, //
    sm: { span: 17 }, //
  },
};
const smallLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }, //
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }, //
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
    formLayouts,
    isSearchForm,
    isFormat,
    noBtnBlock,
    searchRight,
    isDisabledAll,
    noRuleAll,
    size,
  } = props; //

  const configs = isFormat
    ? formatConfig(config, { isSearchForm, isDisabledAll })
    : config; //
  console.log('  configs ：', configs); //

  console.log(
    ' %c SmartForm 组件 state, props ： ',
    `color: #333; font-weight: bold`,
    state,
    props,
    configs,
    configs[configs.length - 1],
  ); //

  const [initData, setInitData] = useState(() => {
    const dynamicFields = configs
      .filter(v => v.formType === 'Dynamic')
      .map(v => v.itemProps.key);
    const obj = {};
    dynamicFields.forEach(v => (obj[v] = ['']));
    console.log(' 惰性初始state   ： ', obj, dynamicFields);
    return obj;
  });

  // const initialValues = (isMockData && action === 'edit') ? mockFormData(configs, ) : {}
  const initialValues = Object.keys(init).length
    ? init
    : // : isMockData && (action && action !== 'add')
    isMockData && true
    ? mockFormData(configs, init)
    : initData;
  // const initialValues = Object.keys(init).length ? init : (isMockData ) ? mockFormData(configs, init, ) : {}
  console.log(
    ' SmartForm initialValues ： ',
    props,
    initialValues,
    action,
    action === 'edit',
  ); //
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

  // const [formLayout, setFormLayout] = useState('horizontal');
  const formLayoutType = isSearchForm ? 'inline' : 'horizontal';
  const [formLayout, setFormLayout] = useState(
    isSearchForm ? 'inline' : 'horizontal',
  );
  // const onFormLayoutChange = ({ layout }) => {
  //   setFormLayout(layout);
  // };

  const formItemLayout =
    formLayout === 'horizontal'
      ? size === 'small'
        ? smallLayout
        : formLayouts
      : null;
  const isInline = {
    layout: isSearchForm ? 'inline' : 'horizontal',
  };

  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = (value, rest) => {
    console.log(' onFormLayoutChange value, rest ： ', value, rest); //
    const { layout, size } = value;

    onFieldChange && onFieldChange({ value });

    // setFormLayout(layout);
    // setComponentSize(size);
  };

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

  const formItems = configs.map((item, i) => {
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
      checkboxData = [],
      selectData = [],
      opType,
      haveDivider,
      isSearchForm,
      searchSuffix,
      CustomCom,
      noLabel,
      LabelCom,
    } = items;

    const flexRows = items.flexRow ? items.flexRow : flexRow; //

    // if (typeof type === 'function') {
    if (isValidElement(items)) {
      return items;
    }

    const { label } = itemProps;
    const itemPropsCls =
      itemProps.className +
      `${i === configs.length - 1 ? ' lastFormItem' : ''}`;

    const formItemCommonProps = {
      colon: false,
      ...itemProps,
    };
    if (
      formType === 'Radio' ||
      formType === 'Switch' ||
      formType === 'Checkbox'
    ) {
      console.log(
        ' formItemCommonPropsformItemCommonPropsformItemCommonProps ： ',
        formType,
      ); //
      // formItemCommonProps.valuePropName = `checked`;
    }

    // if (formType === 'Dynamic') {
    //   console.log(' formTypeformType ： ', formItemCommonProps, formType, formType === 'Dynamic'    )//
    //   formItemCommonProps.className = `dynamicRow ${formItemCommonProps.className}  `
    // }

    const formItemDividerProps = {
      ...formItemCommonProps,
      className: `formItems w100 ${itemPropsCls}  `,
    };
    const formItemNoRuleProps = {
      ...formItemCommonProps,
      className: `formItems rowText ${itemPropsCls}  `,
    };
    const formItemProps = {
      ...formItemCommonProps,
      className: `formItems ${itemPropsCls}  `,
      rules: noRule || noRuleAll ? undefined : rules({ items, label }),
    };

    const formLabel = customLabel ? customLabel : getLabel(label, formType);
    // console.log('  formLabel ：', formLabel,  )//

    const placeholder = noPh ? '' : formLabel; //
    // conso
    if (searchSuffix) {
      comProps.suffix = <SearchOutlined className="searchIcon" />;
    }
    if (noLabel) {
      console.log(' noLabel ： '); //
      comProps.wrapperCol = {
        sm: { span: 10 },
      };
    }

    const realComProps = {
      // className: 'w-320',
      ...comProps,
      placeholder: placeholder,
    };
    const dynamicComProps = {
      // className: 'w-320',
      ...comProps,
      // comProps: {...comProps, className: `${comProps.className} dynamiRow` },
      placeholder: placeholder,
      name: formItemProps.key,
      init: initialValues[comProps?.key],
    };

    // console.log(
    //   ' realComProps11 ： ',
    //   realComProps,
    //   itemProps,
    //   formItemProps,
    //   comProps,
    //   initialValues,
    //   formItemLayout,
    // ); //

    // const renderRadioOptions = renderRadioOp(radioData, opType, )
    // const renderSelectOptions = renderSelectOp(selectData, opType, )

    const formItemMap = {
      rowText: label,
      Label: LabelCom,
      CustomCom: CustomCom,
      Divider: <Divider />,
      Input: <Input allowClear {...realComProps} />,
      TextArea: (
        <TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          allowClear
          {...realComProps}
        />
      ),
      Select: (
        <Select allowClear {...realComProps} filterOption showSearch>
          {renderSelectOp(selectData, opType)}
          {/* <Option value="male">male</Option>
        <Option value="female">female</Option>
        <Option value="other">other</Option> */}
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
      // CheckboxGroup: <Checkbox.Group {...realComProps} />,
      Checkbox: renderCheckboxOp(checkboxData, opType),
      Radio: renderRadioOp(radioData, opType),
      DatePicker: <DatePicker {...realComProps} />,

      Dynamic: <DynamicForm {...dynamicComProps}></DynamicForm>,
    };

    const formItemCom = formItemMap[formType];
    // console.log(' formItemCom ： ', formItemCom, formItemMap, formType, items, formLabel,  )//

    if (!formItemCom) {
      return <div key={Math.random()}>没有匹配</div>;
    }

    if (formType === 'Divider') {
      console.log(' DividerDividerDivider ： ', formItemCom); //
      return (
        <Form.Item labelAlign={'left'} {...rowLayout} {...formItemDividerProps}>
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

    if (flexRows && formType !== 'rowText' && formType !== 'CustomCom') {
      const colForm = (
        <Col span={24 / Number(flexRows)} key={itemProps.key}>
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

    const normalItem = (
      <Form.Item
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
    );

    if (extra) {
      // console.log(' extra ： ', extra, formItemProps,  )//
      const { label, key, rules, ...rest } = formItemProps;

      return (
        <Form.Item
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
          <Form.Item>{extra}</Form.Item>
        </Form.Item>
      );
    }

    // console.log(' itemProps ： ', formItemCom, formType, items, itemProps, comProps,   )//

    // const formItemProps = {
    //   name: key,
    //   label: label,
    //   rules: rules,
    //   valuePropName: "checked"
    // }

    console.log(
      ' formItemProps ： ',
      formItemProps,
      normalItem,
      initialValues,
      init,
      action,
    ); //
    return normalItem;
  });

  // console.log(' formProps ： ', form, formProps, formItemLayout, formLayout, initialValues,    ); //
  return (
    <>
      <Form
        preserve={false}
        {...formItemLayout}
        // layout={formLayout}
        {...isInline}
        form={formControl}
        name="smartForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // initialValues={{}}
        // initialValues={initialValues}
        initialValues={{
          ...initialValues,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        scrollToFirstError
        {...formProps}
        className={`smartForm ${className} ${
          searchRight ? 'searchRight' : ''
        } `}
        // layout="inline"
      >
        {flexRow ? (
          <Row gutter={24}>
            {formItems}

            {/* {formBtn && <Col span={flexRows}  >
            <Form.Item   >
              {formBtn}   
            </Form.Item>
          </Col>} */}
            {/* <Form.Item noStyle>
              {isRowBtn ? <div>{formBtn}</div> : formBtn}
            </Form.Item> */}
          </Row>
        ) : (
          <>
            {formItems}
            <div className={'btnBlock'}>{formBtn && formBtn({ form })}</div>
          </>
        )}
        {/* <Row gutter={24} className={'w100'}  >
          <>
            {formItems}
            <div className={'btnBlock'}  >
              {formBtn && formBtn({ form })}
            </div>
          </>
        </Row> */}

        {children}
      </Form>
      {/* {formBtn && formBtn({ form })} */}
    </>
  );
};

SmartForm.defaultProps = {
  className: '',
  config: [], // 表单配置项
  flexRow: 0, // 弹性布局值
  isRowBtn: false, // 是否显示横向表单按钮
  init: {}, // 表单初始值
  // formProps: {},
  isMockData: false,
  isMockData: true, // 是否使用 mock 数据
  noBtnBlock: false,
  searchRight: false,
  action: '', // 表单的操作行为
  noPh: false, // 是否显示表单项的 placeholder 文本
  formLayouts: layoutObj, // 表单的布局配置
  isSearchForm: false, // 是否使用搜索型表单
  isFormat: true,
  isDisabledAll: false,
  noRuleAll: false,
  size: '',
};

SmartForm.propTypes = {
  className: PropTypes.string,
  config: PropTypes.array,
  flexRow: PropTypes.number,
  isRowBtn: PropTypes.bool,
  init: PropTypes.object,
  // formProps: PropTypes.object,
  isMockData: PropTypes.bool,
  noBtnBlock: PropTypes.bool,
  searchRight: PropTypes.bool,
  noPh: PropTypes.bool,
  action: PropTypes.string,
  formLayouts: PropTypes.object,
  isSearchForm: PropTypes.bool,
  isFormat: PropTypes.bool,
  isDisabledAll: PropTypes.bool,
  noRuleAll: PropTypes.bool,
  size: PropTypes.string,
};

export default SmartForm;

// 带有默认属性的搜索型表单组件

// export const SearchForm = props => React.cloneElement(SmartForm, {
//   isSearchForm: true,
//   ...props,
// })
export const SearchForm = props => {
  console.log(' SearchFormSearchForm ：', props); //
  return <SmartForm {...props} noRule isSearchForm></SmartForm>;
};