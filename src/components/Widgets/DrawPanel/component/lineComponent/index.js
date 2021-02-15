import React, { useMemo, useEffect } from 'react';
import {
  Form,
  InputNumber,
  Tabs,
  Collapse,
  Row,
  Col,
  Select,
  Input,
  Button,
} from 'antd';
import './index.css';
import { canvas } from '../../index';
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;

const CanvasProps = props => {
  console.log(' CanvasPropsCanvasProps props ： ', props); //
  const { data, onFormValueChange } = props;
  const { lineWidth, dash, strokeStyle, name, fromArrow, toArrow } =
    data?.line || {};

  const [form] = Form.useForm();
  // const { onFormValueChange } = form
  const onFormLayoutChange = (changedValues, allValues) => {
    console.log(
      ' onFormLayoutChange changedValues, allValues,  ： ',
      form,
      props,
      changedValues,
      allValues,
    ); //
    // form.validateFields((err, value) => {
    //   if (err) return;
    //   if (Object.keys(data).length === 0) return;
    //   if (value.lineWidth === lineWidth && value.dash === dash && value.strokeStyle === strokeStyle && value.name === name && value.toArrow === toArrow && value.fromArrow === fromArrow) return;
    //   onFormValueChange(value);
    //   form.resetFields();
    // })

    onFormValueChange(allValues);
  };

  /**
   * 渲染位置和大小的表单
   */

  const renderForm = useMemo(() => {
    return (
      <Row>
        <Col span={12}>
          <Form.Item label="线条样式" name="dash">
            <Select style={{ width: '95%' }}>
              <Option value={0}>_________</Option>
              <Option value={1}>---------</Option>
              <Option value={2}>_ _ _ _ _</Option>
              <Option value={3}>- . - . - .</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="线条类型" name="name">
            <Select style={{ width: '95%' }}>
              <Option value={'curve'}>曲线</Option>
              <Option value={'polyline'}>折线</Option>
              <Option value={'line'}>直线</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="线条颜色" name="strokeStyle">
            <Input type="color" />
          </Form.Item>
        </Col>
        <Col offset={1} span={11}>
          <Form.Item label="线条宽度" name="lineWidth">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="连线边框" name="borderColor">
            <Input type="color" />
          </Form.Item>
        </Col>
        <Col offset={1} span={11}>
          <Form.Item label="边框宽度" name="borderWidth">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col offset={1} span={11}>
          <Form.Item label="透明度（0 - 1）" name="globalAlpha">
            <InputNumber />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="角度" name="gradientAngle">
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>
    );
  }, [lineWidth, dash, name, toArrow, fromArrow, strokeStyle]);

  const renderPosForm = useMemo(() => {
    return (
      <>
        <Row>
          <Col span={12}>
            <Form.Item label="起点x" name={['from', 'x']}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="起点y" name={['from', 'y']}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="终点x" name={['to', 'x']}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="终点y" name={['to', 'y']}>
              <InputNumber />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="起点箭头" name="fromArrow">
              <Select style={{ width: '95%' }}>
                <Option value="">无箭头</Option>
                <Option value="triangleSolid">实心三角形</Option>
                <Option value="triangle">空心三角形</Option>
                <Option value="diamondSolid">实心菱形</Option>
                <Option value="diamond">空心菱形</Option>
                <Option value="circleSolid">实心圆</Option>
                <Option value="circle">空心圆</Option>
                <Option value="line">线型箭头</Option>
                <Option value="lineUp">上单边线箭头</Option>
                <Option value="lineDown">下单边线箭头</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="结束箭头" name="toArrow">
              <Select style={{ width: '95%' }}>
                <Option value="">无箭头</Option>
                <Option value="triangleSolid">实心三角形</Option>
                <Option value="triangle">空心三角形</Option>
                <Option value="diamondSolid">实心菱形</Option>
                <Option value="diamond">空心菱形</Option>
                <Option value="circleSolid">实心圆</Option>
                <Option value="circle">空心圆</Option>
                <Option value="line">线型箭头</Option>
                <Option value="lineUp">上单边线箭头</Option>
                <Option value="lineDown">下单边线箭头</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="起点箭头颜色" name="fromArrowColor">
              <Input type="color" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="终点箭头颜色" name="toArrowColor">
              <Input type="color" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="起点箭头大小" name="fromArrowSize">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="终点箭头大小" name="toArrowSize">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  }, []);

  const renderTextForm = useMemo(() => {
    return (
      <>
        <Row>
          <Col span={12}>
            <Form.Item label="字体" name={['font', 'fontFamily']}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="大小" name={['font', 'fontSize']}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="颜色" name={['font', 'color']}>
              <Input type="color" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="背景" name={['font', 'background']}>
              <Input type="color" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="倾斜" name={['font', 'fontStyle']}>
              <Select style={{ width: '95%' }}>
                {[
                  {
                    id: 'normal',
                    name: '正常',
                  },
                  {
                    id: 'italic',
                    name: '倾斜',
                  },
                ].map((v, i) => (
                  <Option key={i} value={v.id}>
                    {v.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="加粗" name={['font', 'fontWeight']}>
              <Select style={{ width: '95%' }}>
                {[
                  {
                    id: 'normal',
                    name: '正常',
                  },
                  {
                    id: 'bold',
                    name: '加粗',
                  },
                ].map((v, i) => (
                  <Option key={i} value={v.id}>
                    {v.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="水平对齐" name={['font', 'textAlign']}>
              <Select style={{ width: '95%' }}>
                {[
                  {
                    id: 'left',
                    name: '左对齐',
                  },
                  {
                    id: 'center',
                    name: '居中',
                  },
                  {
                    id: 'right',
                    name: '右对齐',
                  },
                ].map((v, i) => (
                  <Option key={i} value={v.id}>
                    {v.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="垂直对齐" name={['font', 'textBaseline']}>
              <Select style={{ width: '95%' }}>
                {[
                  {
                    id: 'top',
                    name: '顶部对齐',
                  },
                  {
                    id: 'middle',
                    name: '居中',
                  },
                  {
                    id: 'bottom',
                    name: '底部对齐',
                  },
                ].map((v, i) => (
                  <Option key={i} value={v.id}>
                    {v.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="行高" name={['font', 'lineHeight']}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="最大行数" name={['font', 'textMaxLine']}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="水平偏移" name={'textOffsetX'}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="垂直偏移" name={'textOffsetY'}>
              <InputNumber />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
    <Form.Item label='内容' name='text' >
      <InputNumber />
    </Form.Item>
  </Col>   */}
        </Row>
      </>
    );
  }, []);

  const renderAnimateForm = useMemo(() => {
    return (
      <>
        <Row>
          {' '}
          <Col span={12}>
            <Form.Item label="动画类型" name={'animateType'}>
              <Select style={{ width: '95%' }}>
                {[
                  {
                    id: 'beads',
                    name: '水珠流动',
                  },
                  {
                    id: 'dot',
                    name: '圆点',
                  },
                  {
                    id: 'comet',
                    name: '彗星',
                  },
                ].map((v, i) => (
                  <Option key={i} value={v.id}>
                    {v.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="颜色" name={'animateColor'}>
              <Input type="color" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="快慢" name={'animateSpan'}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="圆点大小" name={'animateDotSize'}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="循环次数" name={'animateCycle'}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="">
              <Button
                type="primary"
                onClick={() => {
                  data.line.animateStart = Date.now();
                  canvas.animate();
                }}
              >
                开始
              </Button>
              <Col span={12}>
                <Form.Item label="Markdown" name="markdown">
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="原生title" name="title">
                  <InputNumber />
                </Form.Item>
              </Col>
              {/* <Button
    type="primary"
    onClick={() => {
      canvas.pauseAnimate();
    }}
  >
    暂停
  </Button>  
  <Button
    type="primary"
    onClick={() => canvas.stopAnimate()}
  >
    停止
  </Button> */}
            </Form.Item>
          </Col>
          {/* <Col span={12}>
  <Form.Item label='下个动画' name={'nextAnimate'} >
    <Input />
  </Form.Item>
</Col>  */}
        </Row>
      </>
    );
  }, []);

  return (
    <div className="rightArea">
      <Form
        form={form}
        onValuesChange={onFormLayoutChange}
        initialValues={data?.line}
      >
        <Collapse defaultActiveKey={['1', '2', '3', '4', '5']}>
          <Panel header="样式" key="1">
            {renderForm}
          </Panel>

          <Panel header="位置" key="2">
            {renderPosForm}
          </Panel>
          <Panel header="文字" key="3">
            {renderTextForm}
          </Panel>
          <Panel header="动效" key="4">
            {renderAnimateForm}
          </Panel>
          {/* <Panel header="动效" key="5">
            {renderAnimateForm}
          </Panel> */}
        </Collapse>
        {/* <Tabs defaultActiveKey="1">
          <TabPane tab="外观" key="1" style={{ margin: 0 }}>
          </TabPane>
        </Tabs> */}
      </Form>
    </div>
  );
};

export default CanvasProps;
