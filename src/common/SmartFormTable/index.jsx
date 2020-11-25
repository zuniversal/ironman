import React, { useEffect, useState } from 'react';
import './style.less';
import PropTypes from 'prop-types';
import { Button, Form, Input, Space } from 'antd';
import { ANIMATE, REQUIRE } from '@/constants';
import { tips } from '@/utils';

const { bounceIn, slideInDown, flipInX } = ANIMATE;

const SmartFormTable = props => {
  const { edit, remove } = props; //
  console.log(
    ' %c SmartFormTable 组件 ： ',
    `color: #333; font-weight: bold`,
    props,
  ); //

  const {
    name,
    config,
    noRule,
    noRuleAll,
    actionCol,
    onFieldChange,
    data,
  } = props; //
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
                      console.log(' adddatasdatas ： ', configs, data); //
                      if (data.filter(v => v.editing).length > 0) {
                        props.add({});
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
                console.log(' dataInitdataInitdataInit,  ： ', fields); //
                const formItem = configs.map(({ editing, ...v }, index) => (
                  <Form.Item
                    rules={noRule || noRuleAll ? undefined : rules(v)}
                    {...field}
                    {...v}
                    label={''}
                    colon={false}
                    name={[field.name, v.name]}
                    fieldKey={[field.fieldKey, v.name]}
                    key={v.name + field.key}
                    className={`formItems ${v.hidden ? 'hidden' : ''}`}
                    {...{
                      wrapperCol: {
                        sm: { span: 24 }, //
                      },
                    }}
                    // onValuesChange={(params, rest) => {
                    //   console.log(' params, rest ： ', params, rest); //
                    //   // onFieldChange && onFieldChange({ value, formData, form: formControl })
                    // }}
                  >
                    {/* <Input className={`w-78 ${flipInX}`} /> */}
                    {editing ? (
                      <div className={` xxx`}>
                        <Input
                          className={` ${bounceIn}`}
                          placeholder={`请输入${v.label}`}
                        />
                      </div>
                    ) : (
                      props.data[i][v.name]
                    )}
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
                          onClick={async () => {
                            // try {
                            //   const res = await props.form.validateFields();
                            // console.log('  res await 结果  ：', res, res.values); //
                            // console.log('  resresres ：', res,  )//
                            const datas = props.form.getFieldValue(name);
                            console.log(
                              ' save field ： ',
                              fields,
                              field,
                              i,
                              name,
                              datas,
                            ); //
                            props.save({ data: datas[i], datas, i });
                            // } catch (error) {
                            //   console.log(' errorerror ： ', error); //
                            // }
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
                          if (fields.length > 1) {
                            remove(field.name);
                            const datas = props.form.getFieldValue(name);
                            props.remove({
                              data: datas[i],
                              datas,
                              i,
                              fields,
                              field,
                            });
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
// export default React.memo(SmartFormTable, () => false)
