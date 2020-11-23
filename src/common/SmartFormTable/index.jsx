import React, { useEffect, useState } from 'react';
import './style.less';
import PropTypes from 'prop-types';
import { Button, Form, Input, Space } from 'antd';
import { ANIMATE } from '@/constants';

const { bounceIn, slideInDown, flipInX } = ANIMATE;

const SmartFormTable = props => {
  const { edit, remove } = props; //
  console.log(
    ' %c SmartFormTable 组件 ： ',
    `color: #333; font-weight: bold`,
    props,
  ); //

  const { name, config } = props; //

  return (
    <Form.List
      name={name}
      // key={}
    >
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
              {[...config, { name: '操作', label: '操作' }].map((v, i) => (
                <div className={' headerTd'} key={i}>
                  {`${v.label}`}{' '}
                </div>
              ))}
            </div>
            <div className="formBody">
              {fields.map(field => {
                // {[
                //   {monitor_a: 'monitor_a',},
                //   {monitor_b: 'monitor_b',},
                //   {monitor_c: 'monitor_c',},
                // ].map(field => {
                console.log(' dataInitdataInitdataInit,  ： ', fields); //
                const formItem = config.map((v, i) => (
                  <Form.Item
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
                  >
                    {/* <Input className={`w-78 ${flipInX}`} /> */}
                    <Input className={` ${bounceIn}`} />
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
                      {/* <a
                        onClick={() => add()}
                      >
                        新增{field.key}
                      </a> */}
                      <a
                        className={'add'}
                        onClick={() => {
                          // add('', 0);
                          add();
                        }}
                      >
                        新增
                      </a>
                      <a
                        className={'remove'}
                        onClick={() => {
                          remove(field.name);
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
  name: 'smartFormTableName',
};

SmartFormTable.propTypes = {
  config: PropTypes.array,
  name: PropTypes.string,
};

export default SmartFormTable;
