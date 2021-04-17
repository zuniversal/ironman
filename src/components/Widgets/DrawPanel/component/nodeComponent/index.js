import React, { useMemo } from 'react';
import {
  Form,
  InputNumber,
  Tabs,
  Collapse,
  Row,
  Col,
  Input,
  Select,
  Tag,
} from 'antd';
import AnimateComponent from './AnimateComponent';
// import EventComponent from './EventComponent';
// import ReactComponent from './ReactComponent';
// import HttpComponent from './HttpComponent';

import './index.less';
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const CanvasProps = props => {
  const {
    data,
    // onEventValueChange,
    // onUpdateComponentProps,
    // onUpdateHttpProps,
  } = props;

  // const { x, y, width, height } = data?.node?.rect || {};
  // const { rotate, text, id } = data?.node || {};
  // const { color, fontSize, fontFamily } = data?.node?.font || {};
  // const extraFields = data.node.data; // 用户自定义数据片段
  const initVal = {
    // x,
    // y,
    // width,
    // height,
    // rotate,
    // text,
    // id,
    // color,
    // fontSize,
    // fontFamily,
    ...data?.node,
  };
  console.log(' CanvasProps ： ', props, initVal);

  /**
   * 渲染位置和大小的表单
   */

  const renderForm = useMemo(() => {
    return (
      <Row>
        <Col span={12}>
          <Form.Item label="X(px)" name={['rect', 'x']}>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Y(px)" name={['rect', 'y']}>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="宽(px)" name={['rect', 'width']}>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="高(px)" name={['rect', 'height']}>
            <InputNumber />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="圆角" name="borderRadius">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="旋转" name="rotate">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="左边距" name="paddingLeft">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="右边距" name="paddingRight">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="上边距" name="paddingTop">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="下边距" name="paddingBottom">
            <InputNumber />
          </Form.Item>
        </Col>
      </Row>
    );
  }, []);

  /**
   * 渲染样式的表单
   */

  const renderStyleForm = useMemo(() => {
    return (
      <Row>
        <Col span={24}>
          <Form.Item label="线条样式" name="dash">
            <Select style={{ width: '95%' }}>
              <Option value={0}>_________</Option>
              <Option value={1}>---------</Option>
              <Option value={2}>_ _ _ _ _</Option>
              <Option value={3}>- . - . - .</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="线条颜色" name="strokeStyle">
            <Input type="color" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="线条宽度" name="lineWidth">
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="背景颜色" name="fillStyle">
            <Input type="color" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="透明度（0 - 1）" name="globalAlpha">
            <InputNumber />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="角度" name="gradientAngle">
            <InputNumber />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="背景样式" name="dash">
            <Select style={{ width: '95%' }}>
              <Option value={0}>纯色背景</Option>
              <Option value={1}>线性渐变</Option>
              <Option value={2}>径向渐变</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="开始颜色" name="gradientFromColor">
            <Input type="color" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="结束颜色" name="gradientToColor">
            <Input type="color" />
          </Form.Item>
        </Col>
      </Row>
    );
  }, []);

  /**
   * 渲染字体的表单
   */

  const renderFontForm = useMemo(() => {
    return (
      <>
        <Row>
          <Col span={12}>
            <Form.Item label="字体类型" name={['font', 'fontFamily']}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="字体大小" name={['font', 'fontSize']}>
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="字体颜色" name={['font', 'color']}>
              <Input type="color" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="背景颜色" name={['font', 'background']}>
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
          <Col span={24}>
            <Form.Item label="内容" name="text">
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  }, []);

  const renderImgForm = useMemo(() => {
    return (
      <>
        <Row>
          <Col span={12}>
            <Form.Item label="图片选择" name="image">
              <Input
              // defaultValue='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="图标icon" name={'icon'}>
              {/* <Input defaultValue={'String.fromCharCode(+'59051')'} /> */}
              <Input
              // defaultValue={'topology-exit1'}
              />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
          <Form.Item label="图标大小" name={'iconSize'} >
            <InputNumber/>
          </Form.Item>
        </Col>   */}
          <Col span={12}>
            <Form.Item label="图标颜色" name={'iconColor'}>
              <Input type="color" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="图标旋转" name={'iconRotate'}>
              <Input type="color" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="宽（px）" name="imageWidth">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="高（px）" name="imageHeight">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="保存图片比例" name="imageRatio">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="图片对齐" name="imageAlign">
              <Select style={{ width: '95%' }}>
                {[
                  {
                    id: 'center',
                    name: '居中',
                  },
                  {
                    id: 'top',
                    name: '上',
                  },
                  {
                    id: 'bottom',
                    name: '下',
                  },
                  {
                    id: 'left',
                    name: '左',
                  },
                  {
                    id: 'right',
                    name: '右',
                  },
                  {
                    id: 'left-top',
                    name: '左上',
                  },
                  {
                    id: 'right-top',
                    name: '右上',
                  },
                  {
                    id: 'left-bottom',
                    name: '左下',
                  },
                  {
                    id: 'right-bottom',
                    name: '右下',
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
                    id: 'center',
                    name: '居中',
                  },
                  {
                    id: 'top',
                    name: '上',
                  },
                  {
                    id: 'bottom',
                    name: '下',
                  },
                  {
                    id: 'left',
                    name: '左',
                  },
                  {
                    id: 'right',
                    name: '右',
                  },
                  {
                    id: 'left-top',
                    name: '左上',
                  },
                  {
                    id: 'right-top',
                    name: '右上',
                  },
                  {
                    id: 'left-bottom',
                    name: '左下',
                  },
                  {
                    id: 'right-bottom',
                    name: '右下',
                  },
                ].map((v, i) => (
                  <Option key={i} value={v.id}>
                    {v.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </>
    );
  }, []);

  const renderTipsForm = useMemo(() => {
    return (
      <>
        <Row>
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
        </Row>
      </>
    );
  }, []);

  /**
   * 渲染元素本身数据
   */

  // const renderDataForm = useMemo(() => {
  //   const formItemLayout = {
  //     labelCol: { span: 4 },
  //     wrapperCol: { span: 20 },
  //   };
  //   return (
  //     <Col>
  //       <Form.Item label="ID">
  //         <span className="ant-form-text">
  //           <Tag color="#f50">{id}</Tag>
  //         </span>
  //       </Form.Item>
  //     </Col>
  //   );
  // }, [id]);

  /**
   * 渲染元素额外数据
   */

  // const renderExtraDataForm = () => {
  //   let value = extraFields;
  //   if (data.node.data && data.node.data.echarts) {
  //     value = data.node.data.echarts.option.seriesFunction;
  //   } else {
  //     value = JSON.stringify(value);
  //   }

  //   return (
  //     <Col>
  //       <Form.Item label="自定义数据字段" name="data">
  //         <TextArea rows={10} />
  //       </Form.Item>
  //     </Col>
  //   );
  // };

  // const renderReactComponent = useMemo(() => {
  //   return (
  //     <ReactComponent
  //       onUpdateComponentProps={(value) => onUpdateComponentProps(value)}
  //       data={data}
  //     />
  //   );
  // }, [onUpdateComponentProps, data]);

  // const renderHttpComponent = useMemo(() => {
  //   return <HttpComponent onUpdateHttpProps={(value) => onUpdateHttpProps(value)}  data={data.node.data.http || {}} />;
  // }, [onUpdateHttpProps, data]);

  const [form] = Form.useForm();
  const onFormLayoutChange = (changedValues, allValues) => {
    console.log(
      ' onFormLayoutChange changedValues, allValues,  ： ',
      props,
      changedValues,
      allValues,
    );
    const { onFormValueChange } = props;
    if (props.data.node.name === 'echarts') {
      props.data.node.data.echarts.option.seriesFunction = changedValues.data;
      onFormValueChange(props.data.node);
      return;
    }
    onFormValueChange(allValues);
  };

  const com = (
    <Collapse defaultActiveKey={['1', '2', '3', '4', '5', '6']}>
      <Panel header="动效" key="4">
        <AnimateComponent canvasData={data} />
      </Panel>
      <Panel header="位置和大小" key="1">
        <Form
          form={form}
          onValuesChange={onFormLayoutChange}
          initialValues={initVal}
        >
          {renderForm}
        </Form>
      </Panel>
      <Panel header="样式" key="2">
        <Form
          form={form}
          onValuesChange={onFormLayoutChange}
          initialValues={initVal}
        >
          {renderStyleForm}
        </Form>
      </Panel>
      <Panel header="文字" key="3">
        <Form
          form={form}
          onValuesChange={onFormLayoutChange}
          initialValues={initVal}
        >
          {renderFontForm}
        </Form>
      </Panel>

      <Panel header="图片" key="5">
        <Form
          form={form}
          onValuesChange={onFormLayoutChange}
          initialValues={initVal}
        >
          {renderImgForm}
        </Form>
      </Panel>
      <Panel header="鼠标提示" key="6">
        <Form
          form={form}
          onValuesChange={onFormLayoutChange}
          initialValues={initVal}
        >
          {renderTipsForm}
        </Form>
      </Panel>
    </Collapse>
  );

  return <div className="rightArea">{com}</div>;

  return (
    <div className="rightArea">
      <Tabs defaultActiveKey="1">
        <TabPane tab="外观" key="1"></TabPane>
        {/* <TabPane tab="动效" key="4"  >
            <AnimateComponent canvasData={data} />
          </TabPane> */}
        {/* <TabPane tab="数据" key="2"  >
            <Collapse defaultActiveKey={['1', '2']}>
              <Panel header="本身数据" key="1">
                {renderDataForm}
              </Panel>
              <Panel header="自定义数据" key="2">
                {renderExtraDataForm()}
              </Panel>
            </Collapse>
          </TabPane> */}

        {/* <TabPane tab="事件" key="3"  >
            <EventComponent canvasData={data} onEventValueChange={onEventValueChange} />
          </TabPane> */}
        {/* <TabPane tab="组件" key="5"  >
            {renderReactComponent}
          </TabPane> */}
        {/* <TabPane tab="http" key="6"  >
            {renderHttpComponent}
          </TabPane> */}
      </Tabs>
    </div>
  );
};

export default CanvasProps;
// export default Form.create({
//   onValuesChange: (props, changedValues, allValues) => {
//     const { onFormValueChange } = props;
//     if(props.data.node.name === 'echarts') {
//       props.data.node.data.echarts.option.seriesFunction = changedValues.data;
//       onFormValueChange(props.data.node);
//       return;
//     }
//     onFormValueChange(allValues);
//   }
// })(CanvasProps);
