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
  DatePicker,
  Divider,
} from 'antd';

import {
  QuestionCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
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
    sm: { span: 6 },
    sm: { span: 0 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    sm: { span: 24 },
  },
};

const selectOptions = (
  <>
    <Option value="male">male</Option>
    <Option value="female">female</Option>
    <Option value="other">other</Option>
  </>
);

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
  };

  return labelMap[key];
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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
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

const DynamicForm = props => {
  console.log(' DynamicForm ： ', props); //
  const {
    key,
    itemProps,
    comProps,
    radioOptions,
    selectOptions,
    customLabel,
    formType = 'Input',
    checkboxContent,
    noRule,
    addText,
    subText,
    name,
    noLabel,
    init,
    extra,
    opType,
    radioData,
    checkboxData,
    selectData,
    CustomCom,
    LabelCom,
  } = props; //

  return (
    <Form.List
      // name="dynamicForm"
      name={name}
      className={'dynamicForm '}
    >
      {(fields, params) => {
        const { add, remove } = params;
        console.log(
          ' params ： ',
          fields.length,
          fields.length === 0,
          fields,
          params,
          itemProps,
        ); //

        // if (fields.length === 0) {
        //   console.log(' add ： ',    )//
        //   add()
        //   add('add', 0)
        // }

        const { label, className } = itemProps;

        // const formItemProps = {
        //   ...itemProps,
        //   className: `dynamicFormItem  `,
        //   rules: noRule ? [] : rules({ items: props, label }),
        // };
        const formItemProps = {
          colon: false,
          ...itemProps,
          className: `dynamicFormItem formItems ${itemProps.className}  `,
          rules: noRule ? undefined : rules({ props, label }),
        };

        if (noLabel) {
          formItemProps.label = '';
        }

        const formLabel = customLabel ? customLabel : getLabel(label, formType);
        // console.log('  formLabel ：', formLabel,  )//

        const realComProps = {
          ...comProps,
          className: ` ${comProps.className} `,
          placeholder: formLabel,
        };
        console.log(' realComProps ： ', realComProps, formItemProps); //

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
          console.log(' selectSearch ： ', props.selectSearch); //
          selectProps.showArrow = false;
          selectProps.optionFilterProp = 'children';
          if (props.selectSearch) {
            selectProps.onSearch = props.selectSearch;
          }
        }
        const selectCom = (
          <Select {...selectProps}>
            {renderSelectOp(selectData, opType)}
            {/* <Option value="male">male</Option>
        <Option value="female">female</Option>
        <Option value="other">other</Option> */}
          </Select>
        );
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
          Select: selectCom,
          Search: selectCom,
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
          MonthPicker: <DatePicker {...realComProps} picker="month" />,
        };

        const formItemCom = formItemMap[formType];
        // console.log(' formItemCom ： ', formItemCom, formItemMap, formType, items, formLabel,  )//

        if (!formItemCom) {
          return <div key={Math.random()}>没有匹配</div>;
        }

        const formItemLayout = layoutObj;
        const fieldsData = fields;

        // if (fields.length === 0) {
        //   console.log(' fieldsDatafieldsData ： ', fieldsData,   )//
        //   fieldsData.push({
        //     name: 'dfiled',
        //     key: 'dynamicField',
        //   })
        // }

        return (
          <div>
            {// [
            //   // {
            //   //   name: 'dfiled',
            //   //   key: 'dynamicField',
            //   // },

            //   // ...(fields.length === 0 ? init : []),
            //   ...fields,
            // ]
            fieldsData.map((field, index) => {
              const fieldKey = name ? name : field.name; //
              console.log(
                ' 动态表单 fieldKey ：',
                fields,
                field,
                name,
                fieldKey,
              ); //

              // if (init) {
              //   init.forEach((v, i) => {
              //     // console.log(' data v ： ', v, i,  )
              //     add(v, 0)
              //   })
              //   // add('手动增加的', 0)
              // } else {
              //   add()
              // }

              const subBtn = (
                <MinusCircleOutlined
                  className="dynamic-delete-button actionBtn "
                  // style={{ margin: '0 8px' }}
                  onClick={() => {
                    remove(field.name);
                  }}
                />
              );

              const actionBtn = (
                <Form.Item
                  // label={'zyb'}

                  noStyle
                >
                  <Button
                    type="dashed"
                    className={'actionBtn addBtn'}
                    onClick={() => {
                      add();
                    }}
                    // style={{ width: '60%' }}
                  >
                    <PlusOutlined /> {addText}
                  </Button>

                  {fields.length > 1 ? (
                    <Button
                      type="dashed"
                      className={'actionBtn subBtn'}
                      onClick={() => {
                        remove(field.name);
                      }}
                      // style={{ width: '60%', marginTop: '20px' }}
                    >
                      <MinusOutlined /> {subText}
                    </Button>
                  ) : null}
                </Form.Item>
              );

              const normalItem = (
                <Form.Item
                  // name={key}
                  // label={label}
                  // rules={rules}
                  // valuePropName="checked"

                  {...formItemLayout}
                  className={'formItems dynamicFormWrapper'}
                  {...formItemProps}
                  {...field}
                  // name={[field.name, 'first']}
                  // name={[field.name, fieldKey]}
                  // key={fieldKey}
                  // name={[name, fieldKey]}
                  // name={name}
                  // name={[field.fieldKey, 'itemKey']}
                  // fieldKey={[field.fieldKey, 'itemFieldKey']}

                  // name={[field.fieldKey, 'itemKey']}// 每个项 对象的 key
                  // fieldKey={[field.fieldKey, 'itemFieldKey']}
                  // name={'itemKey'}//
                  // fieldKey={'itemFieldKey'}

                  // key={field.name}
                  // key={field.key}
                  validateTrigger={['onChange', 'onBlur']}
                >
                  {formItemCom}
                </Form.Item>
              );

              // if (formType === 'DynamicArr') {
              //   console.log(' selectSearch ： ', props.selectSearch,   )//
              //   selectProps.showArrow = false;
              //   selectProps.optionFilterProp = "children";
              //   if (props.selectSearch) {
              //     selectProps.onSearch = props.selectSearch;
              //   }
              // }
              return extra ? (
                <Form.Item
                  // <Form.Item
                  // key= "field19"
                  // label= "field19"

                  key={field.name} // 关键
                  //  label={formLabel}
                  className={'extraRow'}
                >
                  <Form.Item
                    // name= "field19"
                    //  {...rest}
                    // name={field.name}
                    name={[field.name, itemProps.name]}
                    // name={[field.key, 'first']}
                    {...formItemProps}
                    //  rules={rules}
                  >
                    {formItemCom}
                    {/* {extra} */}
                  </Form.Item>
                  <Form.Item className={'formItems '}>{actionBtn}</Form.Item>
                </Form.Item>
              ) : (
                normalItem
              );
            })}
          </div>
        );
      }}
    </Form.List>
  );
};

DynamicForm.defaultProps = {
  addText: '新增',
  subText: '刪除',
  noLabel: true,
};

export default DynamicForm; //
