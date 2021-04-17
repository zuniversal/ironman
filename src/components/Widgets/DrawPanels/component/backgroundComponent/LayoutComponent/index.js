import React from 'react';
import { Form, Row, Col, InputNumber, Button } from 'antd';
import { layout } from '@topology/layout';
import { canvas } from '../../../index';
const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};
const Layout = props => {
  console.log(' Layoutprops  ： ', props);
  const [form] = Form.useForm();
  const { validateFields } = form;

  const startLayout = () => {
    console.log(' startLayout ： ', validateFields);
    validateFields()
      .then(value => {
        console.log(
          ' value ： ',
          value,
          layout,
          canvas.updateProps,
          canvas.updateProps,
        );
        if (canvas) {
          console.log(' value ： ', value, canvas.data);
          layout(canvas.data.pens, value);
          canvas.updateProps(true, canvas.data.pens);
        }
      })
      .catch(err => {
        console.log('  err catch  ： ', err);
      });
  };

  return (
    <Form {...formLayout} form={form} className={`bgLayout`}>
      <Form.Item label="最大宽度" name="maxWidth">
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          placeholder="请输入最大宽度"
        />
      </Form.Item>
      <Form.Item label="节点宽度" name="nodeWidth">
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          placeholder="请输入节点宽度"
        />
      </Form.Item>
      <Form.Item label="节点高度" name="nodeHeight">
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          placeholder="请输入节点高度"
        />
      </Form.Item>
      <Form.Item label="水平个数" name="maxCount">
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          placeholder="请输入水平个数"
        />
      </Form.Item>
      <Form.Item label="水平间距" name="spaceWidth">
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          placeholder="请输入水平间距"
        />
      </Form.Item>
      <Form.Item label="垂直间距" name="spaceHeight">
        <InputNumber
          style={{ width: '100%' }}
          min={0}
          placeholder="请输入垂直间距"
        />
      </Form.Item>
      <Button type="primary" onClick={startLayout}>
        开始排版
      </Button>
    </Form>
  );
};

export default Layout;
