import React, { useMemo, useEffect, useState } from 'react';
import {
  Form,
  Tabs,
  Row,
  Col,
  Input,
  Collapse,
  Button,
  Switch,
  InputNumber,
} from 'antd';
import './index.css';
// import MQTTComponent from './MQTTComponent';
import LayoutComponent from './LayoutComponent';
import { canvas } from '../../index';
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;
const CanvasProps = props => {
  console.log(' CanvasProps ： ', props, canvas); //
  const { data } = props;
  const { bkColor = '', bkImage = '' } = data;
  const [wsAddress, setWsAddress] = useState(
    'ws://123.207.136.134:9010/ajaxchattest',
  );

  const [form] = Form.useForm();

  useEffect(() => {
    // form.validateFields((err, value) => {
    //   if (err) return;
    //   data.clearBkImg();
    //   data.data.bkColor = value.bkColor;
    //   data.data.bkImage = value.bkImage;
    //   data.render();
    //   form.resetFields();
    // });
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  /**
   * 渲染位置和大小的表单
   */

  const onFormLayoutChange = (value, formData) => {
    console.log(
      ' onFormLayoutChange value, formData,  ： ',
      props,
      value,
      formData,
      canvas,
      data,
    ); //
    const { layout, size } = value;
    // data.clearBkImg();
    const keys = Object.keys(value)[0];
    console.log('  keys  Object.keys(value) ：', keys);
    if (keys === 'scaleTo') {
      canvas.scaleTo(value[keys] / 100);
    } else {
      canvas.data[keys] = value[keys];
    }

    // canvas.data.bkColor = value.bkColor;
    // canvas.data.bkImage = value.bkImage;
    // canvas.data.grid = value.grid
    // canvas.data.gridColor = value.gridColor
    // canvas.data.gridSize = value.gridSize
    // canvas.data.rule = value.rule
    // canvas.data.ruleColor = value.ruleColor
    // canvas.data.locked = value.locked

    // canvas.data = {
    //   ...canvas.data,
    //   ...value,
    // }
    canvas.render();
  };

  const renderForm = useMemo(() => {
    const formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 15 },
    };
    return (
      <Form {...formLayout} form={form} onValuesChange={onFormLayoutChange}>
        <Form.Item label="缩放大小" name="scaleTo">
          <InputNumber formatter={value => `${value}%`} />
        </Form.Item>
        <Form.Item label="背景颜色" name="bkColor">
          <Input type="color" />
        </Form.Item>
        <Form.Item label="背景图片" name="bkImage">
          <TextArea placeholder="请输入图片的地址" />
        </Form.Item>

        <Form.Item label="背景网格" name="grid">
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            onClick={e => {
              console.log(' showGridshowGrid ： ', e, canvas, canvas.showGrid); //
              // canvas.showGrid(e);
            }}
          />
        </Form.Item>
        <Form.Item label="网格颜色" name="gridColor">
          <Input type="color" />
        </Form.Item>
        <Form.Item label="网格大小" name="gridSize">
          <InputNumber />
        </Form.Item>
        <Form.Item label="标尺" name="rule">
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
            onClick={e => {
              console.log(' rule ： ', e, canvas, canvas.showGrid); //
              // canvas.showGrid(e);
            }}
          />
        </Form.Item>
        <Form.Item label="标尺颜色" name="ruleColor">
          <Input type="color" />
        </Form.Item>
        <Form.Item label="禁添图形" name="locked">
          <Switch
            checkedChildren="是"
            unCheckedChildren="否"
            onClick={e => {
              console.log(' rule ： ', e, canvas, canvas.showGrid); //
              // canvas.showGrid(e);
            }}
          />
        </Form.Item>
      </Form>
    );
  }, []);

  /**
   * 发起websocket连接
   */

  const onHandleConnectWS = () => {
    canvas.openSocket(wsAddress);
  };

  return (
    <div className="rightArea">
      <Tabs defaultActiveKey="1" animated={false}>
        <TabPane
          tab="图文设置"
          key="1"
          style={{ margin: 0, position: 'relative' }}
        >
          {renderForm}
        </TabPane>
        {/* <TabPane tab="消息通信" key="2" style={{ margin: 0 }}>
          <Collapse defaultActiveKey={['1', '2']}>
            <Panel header="websocket地址" key="1">
              <TextArea
                placeholder="请输入websocket地址"
                value={wsAddress}
                onChange={(e) => setWsAddress(e.target.value)}
              />
              <Button
                type="primary"
                style={{ width: 265, marginTop: 10 }}
                onClick={() => onHandleConnectWS()}
              >
                测试连接
              </Button>
            </Panel>
            <Panel header="MQTT地址" key="2">
              <MQTTComponent />
            </Panel>
          </Collapse>
        </TabPane> */}
        <TabPane tab="排版布局" key="3" style={{ margin: 0 }}>
          <LayoutComponent />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CanvasProps;
