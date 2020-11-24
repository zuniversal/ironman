import React, { useEffect, useState } from 'react';
import './style.less';
import PropTypes from 'prop-types';
import { Button, Form, Input, Space } from 'antd';
import { ANIMATE, REQUIRE } from '@/constants';

const { bounceIn, slideInDown, flipInX } = ANIMATE;

const SmartFormTable = props => {
  const { edit, remove } = props; //
  console.log(
    ' %c SmartFormTable 组件 ： ',
    `color: #333; font-weight: bold`,
    props,
  ); //

  const { name, config, noRule, noRuleAll, actionCol, onFieldChange } = props; //

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
        console.log(' dataInit  fieldsfields ： ', fields); //
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
              {[...config].map((v, i) => (
                <div className={' headerTd'} key={i}>
                  {`${v.label}`}{' '}
                </div>
              ))}
              <div className={' headerTd'}>
                {!props.hideAdd && (
                  <a
                    className={'add'}
                    onClick={() => {
                      // add('', 0);
                      props.add({});
                      add();
                    }}
                  >
                    新增
                  </a>
                )}
              </div>
            </div>
            <div className="formBody">
              {fields.map((field, i) => {
                // {[
                //   {monitor_a: 'monitor_a',},
                //   {monitor_b: 'monitor_b',},
                //   {monitor_c: 'monitor_c',},
                // ].map(field => {
                console.log(' dataInitdataInitdataInit,  ： ', fields); //
                const formItem = config.map((v, i) => (
                  <Form.Item
                    rules={noRule || noRuleAll ? undefined : rules(v)}
                    {...field}
                    label={''}
                    colon={false}
                    name={[field.name, v.name]}
                    fieldKey={[field.fieldKey, v.name]}
                    key={v.name + field.key}
                    className={'formItems '}
                    {...{
                      wrapperCol: {
                        sm: { span: 24 }, //
                      },
                    }}
                    onValuesChange={(params, rest) => {
                      console.log(' params, rest ： ', params, rest); //
                      // onFieldChange && onFieldChange({ value, formData, form: formControl })
                    }}
                  >
                    {/* <Input className={`w-78 ${flipInX}`} /> */}
                    <Input
                      className={` ${bounceIn}`}
                      placeholder={`请输入${v.label}`}
                    />
                  </Form.Item>
                ));
                return (
                  <div key={field.key} className={'formRow'}>
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
                          onClick={() => {
                            console.log(' save field ： ', fields, field, i); //
                            // props.save({});
                          }}
                        >
                          保存
                        </a>
                      )}
                      <a
                        className={'remove'}
                        onClick={() => {
                          console.log(
                            '  对吗  fields.length ',
                            fields,
                            field,
                            i,
                          );
                          if (fields.length) {
                            remove(field.name);
                            props.remove({ fields, field, i });
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
  actionCol: { name: '操作', label: '操作' },
  actionCol: {},
  name: 'smartFormTableName',
  hideSave: false,
  add: () => {},
  remove: () => {},
  save: () => {},
  onFieldChange: () => {},
};

SmartFormTable.propTypes = {
  config: PropTypes.array,
  actionCol: PropTypes.object,
  name: PropTypes.string,
  hideSave: PropTypes.bool,
  add: PropTypes.func,
  remove: PropTypes.func,
  save: PropTypes.func,
  onFieldChange: PropTypes.func,
};

export default SmartFormTable;
