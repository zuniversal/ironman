import React, { useState, useEffect, isValidElement } from 'react';
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

import DynamicForm from './DynamicForm/index.jsx'; //
import DynamicItem from './DynamicItem/index.jsx'; //
import { INPUT_TXT, SELECT_TXT, REQUIRE, ANIMATE } from '@/constants'; //
import {
  mockFormData,
  renderSelectOp,
  renderRadioOp,
  formatConfig,
  renderCheckboxOp,
} from '@/utils'; //
import debounce from 'lodash/debounce';

const { bounceIn, slideInDown } = ANIMATE;

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
// Warning: [antd: Form.Item] `children` is array of render props cannot have `name`.
// 注意 form 表单里的组件不能是数组
const layoutObj = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 14 },
  labelCol: {
    // xs: { span: 24 },
    sm: { span: 6 }, //
    xs: { span: 7 }, //
    sm: { span: 7 }, //
    md: { span: 7 }, //
    lg: { span: 7 }, //
  },
  wrapperCol: {
    // xs: { span: 24 },
    sm: { span: 18 }, //
    xs: { span: 17 }, //
    sm: { span: 17 }, //
    md: { span: 17 }, //
    lg: { span: 17 }, //
  },
};
const smallLayout = {
  labelCol: {
    // xs: { span: 24 },
    sm: { span: 5 }, //
  },
  wrapperCol: {
    // xs: { span: 24 },
    sm: { span: 19 }, //
  },
};
const noLabelLayout = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 14 },
  labelCol: {
    xs: { span: 24 },
    sm: { span: 0 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const rowLayout = {
  // labelCol: { span: 8 },
  // wrapperCol: { span: 14 },
  labelCol: {
    // xs: { span: 24 },
    // sm: { span: 4 },
    sm: { span: 0 },
  },
  wrapperCol: {
    // xs: { span: 24 },
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
    Search: SELECT_TXT + label,
    Password: INPUT_TXT + label,
    Cascader: INPUT_TXT + label,
    AutoComplete: INPUT_TXT + label,
    Checkbox: INPUT_TXT + label,
    Radio: SELECT_TXT + label,
    DatePicker: SELECT_TXT + label,
    MonthPicker: SELECT_TXT + label,
    // RangePicker: SELECT_TXT + label,
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
    noLabelLayout,
  } = props; //

  const configs = isFormat
    ? formatConfig(config, { isSearchForm, isDisabledAll })
    : config; //

  const [initData, setInitData] = useState(() => {
    const dynamicFields = configs.filter(
      v => v.formType === 'Dynamic' || v.formType === 'DynamicItem',
    );
    // .map(v => v.itemProps.name);
    const obj = {};
    const dynamicInitMap = {
      Dynamic: [{}],
      DynamicItem: [''],
    };
    dynamicFields.forEach(
      v => (obj[v.itemProps.name] = dynamicInitMap[v.formType]),
    );
    console.log(' 惰性初始state   ： ', configs, obj, dynamicFields);
    return obj;
  });

  // // const initialValues = (isMockData && action === 'edit') ? mockFormData(configs, ) : {}
  const initialValues = Object.keys(init).length
    ? init
    : // : isMockData && (action && action !== 'add')
    isMockData && true
    ? mockFormData(configs, init)
    : initData;
  // const initialValues = mockFormData(configs, init);
  // const initialValues = Object.keys(init).length ? init : (isMockData ) ? mockFormData(configs, init, ) : {}
  // const initialValues = init ? init : {}
  // const initialValues = { field2: 'zyb',    }

  // console.log(' initialValues, init, initData ： ', initialValues, init, initData,  )//

  // const [form] = Form.useForm(initialValues, );// 不行
  const [form] = Form.useForm();
  const formControl = propsForm ? propsForm : form; //
  // const formControl = form; //

  useEffect(() => {
    console.log(' useEffect 更新 ： ', init, formControl); //
    // updateInit(init)
    formControl.setFieldsValue(init);
  }, [init]);

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

  let formItemLayout =
    formLayout === 'horizontal'
      ? size === 'small'
        ? smallLayout
        : formLayouts
      : null;

  if (noLabelLayout) {
    formItemLayout = noLabelLayout;
  }

  const isInline = {
    layout: isSearchForm ? 'inline' : 'horizontal',
  };

  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = (value, formData) => {
    console.log(' onFormLayoutChange value, formData,  ： ', value, formData); //
    const { layout, size } = value;

    onFieldChange && onFieldChange({ value, formData });

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
      // selectSearch = () => {},
      selectSearch,
      opType,
      haveDivider,
      isSearchForm,
      searchSuffix,
      CustomCom,
      PropsCom,
      noLabel,
      LabelCom,
      plainText,
    } = items;

    const flexRows = items.flexRow ? items.flexRow : flexRow; //

    // if (typeof type === 'function') {
    if (isValidElement(items)) {
      return items;
    }

    if ((!formType || formType === 'Input') && isSearchForm) {
      items.comProps.onPressEnter = props.getList; // ;
    }

    const { label } = itemProps;
    const itemPropsCls =
      itemProps.className +
      `${i === configs.length - 1 ? ' lastFormItem' : ''}`;

    const formItemCommonProps = {
      colon: false,
      ...itemProps,
    };

    if (noLabel) {
      formItemCommonProps.label = '';
    }
    // if (
    //   formType === 'Radio' ||
    //   formType === 'Switch' ||
    //   formType === 'Checkbox'
    // ) {
    //   console.log(
    //     ' formItemCommonPropsformItemCommonPropsformItemCommonProps ： ',
    //     formType,
    //   ); //
    //   // formItemCommonProps.valuePropName = `checked`;
    // }

    // if (formType === 'Dynamic') {
    //   console.log(' formTypeformType ： ', formItemCommonProps, formType, formType === 'Dynamic'    )//
    //   formItemCommonProps.className = `dynamicRow ${formItemCommonProps.className}  `
    // }

    const formItemDividerProps = {
      ...formItemCommonProps,
      className: `formItems w100 ${bounceIn} ${itemPropsCls}  `,
    };
    const formItemNoRuleProps = {
      ...formItemCommonProps,
      className: `formItems rowText ${bounceIn} ${itemPropsCls}  `,
    };
    const formItemProps = {
      rules: noRule || noRuleAll ? undefined : rules({ items, label }),
      ...formItemCommonProps,
      className: `formItems ${bounceIn} ${itemPropsCls}  `,
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
      // comProps.wrapperCol = {
      //   sm: { span: 10 },
      // };
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
      isDisabledAll,
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

    const onChange = e => {
      console.log(' onChange   e,  ,   ： ', e);
    };
    const onSearch = e => {
      console.log(' onSearch   e,  ,   ： ', e);
    };
    const onSelect = e => {
      console.log(' onSelect   e,  ,   ： ', e);
    };

    const selectProps = {
      allowClear: true,
      ...realComProps,
      filterOption: true,
      showSearch: true,
      // onChange: onChange,
      // onSearch: onSearch,
      // onSelect: onSelect,
    };
    if (formType === 'Search') {
      // selectProps.showArrow = false;
      // selectProps.labelInValue = true;
      selectProps.optionFilterProp = 'children';
      console.log(' selectSearch ： ', selectProps, item.selectSearch); //
      if (item.selectSearch) {
        // Select 添加 showSearch 属性可以实现搜索功能，但是这个搜索是搜的Select的value值的,但是value值在页面上是看不到的
        selectProps.onSearch = debounce(item.selectSearch, 500);
        // selectProps.onSearch = item.selectSearch
      }
    }
    const selectCom = (
      <Select {...selectProps}>{renderSelectOp(selectData, opType)}</Select>
    );

    const formItemMap = {
      rowText: label,
      Label: LabelCom,
      CustomCom: CustomCom,
      plainText: <span className={`plainText`}>{plainText}</span>,
      Divider: <Divider />,
      Input: <Input allowClear maxLength={32} {...realComProps} />,
      // InputCompact: <Input allowClear maxLength={32} {...realComProps} />,
      TextArea: (
        <TextArea
          autoSize={{ minRows: 3, maxRows: 5 }}
          allowClear
          {...realComProps}
        />
      ),
      Select: selectCom,
      Search: selectCom,
      Password: <Input.Password {...realComProps} />,
      Cascader: <Cascader {...realComProps} />,
      AutoComplete: (
        <AutoComplete {...realComProps}>
          <Input />
        </AutoComplete>
      ),
      // Checkbox: <Checkbox {...realComProps}>{checkboxContent}</Checkbox>,
      // CheckboxGroup: <Checkbox.Group {...realComProps} />,
      Checkbox: renderCheckboxOp(checkboxData, { opType, isDisabledAll }),
      Radio: renderRadioOp(radioData, { opType, isDisabledAll }),
      DatePicker: <DatePicker {...realComProps} />,
      MonthPicker: <DatePicker {...realComProps} picker="month" />,
      RangePicker: <RangePicker format={'YYYY/MM/DD'} {...realComProps} />,

      Dynamic: <DynamicForm {...dynamicComProps}></DynamicForm>,
      DynamicItem: <DynamicItem {...dynamicComProps}></DynamicItem>,
    };

    const formItemCom = formItemMap[formType];
    if (formType === 'PropsCom') {
      return (
        <Form.Item labelAlign={'left'} {...rowLayout} {...formItemNoRuleProps}>
          {PropsCom(props)}
        </Form.Item>
      );
    }

    if (!formItemCom) {
      return <div key={Math.random()}>没有匹配</div>;
    }

    if (formType === 'Divider') {
      return (
        <Form.Item labelAlign={'left'} {...rowLayout} {...formItemDividerProps}>
          <Divider />
        </Form.Item>
      );
    }

    if (formType === 'rowText') {
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

    // Warning: [antd: Form.Item] `name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.
    // 注意 自定义的不带 name 的展示型 Form.Item 项不要带 name 属性 不然报错
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
    return normalItem;
  });

  return (
    <>
      <Form
        preserve={false}
        {...formItemLayout}
        // layout={formLayout}
        {...isInline}
        form={formControl}
        name={name}
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
        // ${isSearchForm ? slideInDown : ''}
        className={`
          smartForm 
          ${className} 
          
          ${size === 'small' ? 'small' : ''} 
          ${searchRight ? 'searchRight' : ''}  `}
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
  name: 'smartForm',
  className: '',
  config: [], // 表单配置项
  flexRow: 0, // 弹性布局值
  isRowBtn: false, // 是否显示横向表单按钮
  init: {}, // 表单初始值
  // formProps: {},
  isMockData: false,
  // isMockData: true, // 是否使用 mock 数据
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
  name: PropTypes.string,
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
  return <SmartForm noRule isSearchForm {...props}></SmartForm>;
};
