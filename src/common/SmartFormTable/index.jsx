import React, { useEffect, useState } from 'react';
import './style.less';
import PropTypes from 'prop-types';
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
  TreeSelect,
} from 'antd';
import { ANIMATE, REQUIRE } from '@/constants';
import { tips, renderSelectOp, renderCheckboxOp, renderRadioOp } from '@/utils';

const { bounceIn, slideInDown, flipInX } = ANIMATE;

const useFormItem = props => {
  const {
    formType = 'Input',
    // formType,
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

    isDisabledAll,
  } = props;

  const realComProps = {
    // className: 'w-320',
    ...comProps,
    // placeholder: placeholder,
  };

  const selectProps = {
    allowClear: true,
    ...realComProps,
    filterOption: true,
    showSearch: true,
  };
  const selectCom = (
    <Select {...selectProps}>{renderSelectOp(selectData, opType)}</Select>
  );

  const formItemMap = {
    // Label: LabelCom,
    // CustomCom: CustomCom,
    plainText: <span className={`plainText`}>{plainText}</span>,
    Divider: <Divider />,
    Input: <Input allowClear maxLength={32} {...realComProps} />,
    InputNumber: <InputNumber allowClear maxLength={32} {...realComProps} />,
    // InputCompact: <Input allowClear maxLength={32} {...realComProps} />,
    TextArea: (
      <Input.TextArea
        autoSize={{
          minRows: 3,
          // maxRows: 5
        }}
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
    RangePicker: (
      <DatePicker.RangePicker format={'YYYY/MM/DD'} {...realComProps} />
    ),
    TreeSelect: (
      <TreeSelect
        treeDefaultExpandAll
        allowClear
        showSearch
        // filterTreeNode={false}
        treeNodeFilterProp={'label'}
        {...realComProps}
      ></TreeSelect>
    ),
  };

  const formItemCom = formItemMap[formType];
  // console.log(' useFormItem   ,   ： ', props, formType, formItemCom  )
  return formItemCom;
};

const SmartFormTable = props => {
  const { edit, remove } = props;
  console.log(
    ' %c SmartFormTable 组件 ： ',
    `color: #333; font-weight: bold`,
    props,
  );

  const {
    name,
    config,
    noRule,
    noRuleAll,
    actionCol,
    onFieldChange,
    data,
  } = props;
  const [configs, setConfigs] = useState(config);

  const rules = (params, extra) => {
    const { items, label, formType } = params;
    // const message = getLabel(label, formType);
    // console.log(' rules   params, extra,  ,   ： ', params, extra, message, label, formType,  );
    return [
      {
        required: true,
        message: label + REQUIRE,
      },
    ];
  };

  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        console.log(' dataInit  fieldsfields ： ', fields);
        // const config = [
        //   { name: 'monitor_a', label: 'A' },
        //   { name: 'monitor_b', label: 'B' },
        //   { name: 'monitor_c', label: 'C' },
        // ];

        return (
          <div className={`formListTable smartFormTable`}>
            <div className="headerWrapper">
              {/* {config.map((v, i) => <Form.Item
              label={`显示器${v.name}`} 
              colon={false}
              className={'formItems headerTd'}
              {...{
                labelCol: {
                  sm: { span: 24 }, //
                },}}
            >
            </Form.Item>)} */}
              {/* {[...config, actionCol].map((v, i) => ( */}
              {[...configs].map((v, i) => (
                <div className={`headerTd ${v.hidden ? 'hidden' : ''}`} key={i}>
                  {`${v.label}`}{' '}
                </div>
              ))}
              <div className={`headerTd`}>
                {!props.hideAdd && (
                  <a
                    className={'add'}
                    onClick={() => {
                      // add('', 0);
                      console.log(' adddatasdatas ： ', configs, data);
                      if (
                        data.filter(v => v.editing).length > 0 ||
                        data.length === 0
                      ) {
                        props.add({});
                        props.modifyTableItem({ action: 'add' });
                        add();
                      } else {
                        tips('请先保存上一条数据！', 2);
                      }
                    }}
                  >
                    新增
                  </a>
                )}
              </div>
            </div>
            <div className="formBody">
              {fields.map((field, i) => {
                {
                  /* {props.datas.map((field, i) => { */
                }
                // {[
                //   {monitor_a: 'monitor_a',},
                //   {monitor_b: 'monitor_b',},
                //   {monitor_c: 'monitor_c',},
                // ].map(field => {
                console.log(
                  ' dataInitdataInitdataInit,  ： ',
                  props,
                  fields,
                  configs,
                );
                const formItem = configs.map(({ editing, ...v }, index) => (
                  <Form.Item
                    rules={noRule || noRuleAll ? undefined : rules(v)}
                    {...field}
                    // {...v}
                    label={''}
                    colon={false}
                    name={[field.name, v.name]}
                    fieldKey={[field.fieldKey, v.name]}
                    // 重要 如果不唯一 删除后 会导致无法保持每行输入框等的值
                    key={v.name + field.key}
                    className={`formItems ${v.hidden ? 'hidden' : ''}`}
                    {...{
                      wrapperCol: {
                        sm: { span: 24 }, //
                      },
                    }}
                    // onValuesChange={(params, rest) => {
                    //   console.log(' params, rest ： ', params, rest);
                    //   // onFieldChange && onFieldChange({ value, formData, form: formControl })
                    // }}
                  >
                    {/* 注意 不能包裹元素 否则会导致表单值无效 */}

                    {/* <Input className={`w-78 ${flipInX}`} /> */}
                    {/* {editing ? ( */}
                    {/* <Input
                      className={` ${bounceIn}`}
                      placeholder={`请输入${v.label}`}
                    /> */}
                    {useFormItem(v)}
                    {/* ) : (
                      props.data[i] ? props.data[i][v.name] : '222'
                    )} */}
                  </Form.Item>
                ));
                return (
                  <div
                    key={field.key}
                    // key={i}
                    className={'formRow'}
                  >
                    {formItem}
                    <Form.Item
                      colon={false}
                      {...{
                        wrapperCol: {
                          sm: { span: 24 }, //
                        },
                      }}
                      className={'formItems actionCol'}
                    >
                      {!props.hideSave && (
                        <a
                          className={'add'}
                          onClick={async () => {
                            // try {
                            //   const res = await props.form.validateFields();
                            // console.log('  res await 结果  ：', res, res.values);
                            // console.log('  resresres ：', res,  )//
                            const datas = props.form.getFieldValue(name);
                            console.log(
                              ' save field ： ',
                              fields,
                              field,
                              i,
                              name,
                              datas,
                            );
                            props.save({ data: datas[i], datas, i });
                            // } catch (error) {
                            //   console.log(' errorerror ： ', error);
                            // }
                          }}
                        >
                          保存
                        </a>
                      )}
                      <a
                        className={'remove'}
                        onClick={() => {
                          if (fields.length > 1) {
                            remove(field.name);
                            // const datas = props.form.getFieldValue(name);
                            // props.remove({
                            //   data: datas[i],
                            //   datas,
                            //   i,
                            //   fields,
                            //   field,
                            // });
                          } else {
                            tips('至少需要一条数据！', 2);
                          }
                        }}
                      >
                        删除
                      </a>
                    </Form.Item>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </Form.List>
  );
};

SmartFormTable.defaultProps = {
  config: [],
  data: [],
  actionCol: { name: '操作', label: '操作' },
  actionCol: {},
  name: 'smartFormTableName',
  hideSave: false,
  add: () => {},
  remove: () => {},
  save: () => {},
  onFieldChange: () => {},
  modifyTableItem: () => {},
};

SmartFormTable.propTypes = {
  config: PropTypes.array,
  data: PropTypes.array,
  actionCol: PropTypes.object,
  name: PropTypes.string,
  hideSave: PropTypes.bool,
  add: PropTypes.func,
  remove: PropTypes.func,
  save: PropTypes.func,
  onFieldChange: PropTypes.func,
  modifyTableItem: PropTypes.func,
};

export default SmartFormTable;
// export default React.memo(SmartFormTable, () => false)
