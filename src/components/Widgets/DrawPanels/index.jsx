import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import './style.less';
import { Modal, Tabs, Button, DatePicker, Table, Input } from 'antd';
import { connect } from 'umi';

var C2S;
// import 'canvas2svg'//

// import { Topology } from 'topology-core';
// import { Options } from 'topology-core/options';
// import { registerNode } from 'topology-core/middles';

import { Node } from '@topology/core';
import { Topology, registerNode } from '@topology/core';
import { register as registerFlow } from '@topology/flow-diagram';
import { register as registerActivity } from '@topology/activity-diagram';
import { register as registerClass } from '@topology/class-diagram';
import { register as registerSequence } from '@topology/sequence-diagram';
import { register as registerChart } from '@topology/chart-diagram';

import * as FileSaver from 'file-saver';

import reactNodes from './Plugin/React-nodes';
import Header from './Header';
import CanvasContextMenu from './canvasContextMenu';

import NodeComponent from './component/nodeComponent';
import BackgroundComponent from './component/backgroundComponent';
import LineComponent from './component/lineComponent';
import MyComponent from './MyComponent';

// import '@/static/fonts/libs/iconfont.css';
// import customIcons from '@/static/font/iconfont.json';
// import customIcons from './font/iconfont.json';

// import '@/static/fonts/iconfont.css';
// import './font/iconfont.css';
import './fonts/iconfont.css';
import './fonts/libs/iconfont.css';

import { Tools } from './tools';

// import customIcons from './icons.json';
import ltdxIcons from './ltdx.json';
import lteeIcons from './ltee.json';
import './styles/ltdx.css';
import './styles/ltee.css';
import './Plugin/canvas2svg';
import NodeAttrForm from './NodeAttrForm';
import CanvasAttrForm from './CanvasAttrForm';
import LineAttrForm from './LineAttrForm';
import Preview from './Preview'; //

const CustomTools = props => (
  <div>
    <div className={'styles.title title'}>
      自定义组件 ({props.glyphs.length})
    </div>
    <div className={'styles.buttons widget'}>
      {props.glyphs.map((btn, i) => {
        return (
          <a
            key={i}
            className={`iconWidget`}
            title={btn.name}
            draggable={true}
            onDragStart={ev => {
              props.onCustomDrag(ev, {
                ...btn,
                iconFamily: props.font_family,
              });
            }}
          >
            <i
              className={`${props.font_family} icons icon- ${props.css_prefix_text}${btn.font_class}`}
            />
          </a>
        );
      })}
    </div>
  </div>
);

const { TabPane } = Tabs;

const CanvasProps = React.memo(props => {
  console.log(' CanvasProps   props, ,   ： ', props);
  return (
    <div className="tipsWrapper">
      <div className={'tips'}>小提示</div>
      <ul className={'intro'}>
        <li>方向键：控制节点移动5个像素</li>
        <li>Ctrl + 方向键：控制图形移动1个像素</li>
        <li>Ctrl + 鼠标移动：移动整个画布</li>
        <li>鼠标滚轮：缩放</li>
        <li>选中图形一起拖拽</li>
        {/* <li>添加或选中节点，右侧属性支持上传各种图片哦</li> */}
      </ul>
    </div>
  );
});

const DrawTool = React.memo(props => {
  console.log(' DrawTool   props,   ： ', props);
  return Tools.map((item, index) => {
    return (
      <div key={index}>
        <div className={'styles.title title'}>
          {item.group} ({item.children.length})
        </div>
        <div className={'styles.buttons widget'}>
          {item.children.map((btn, i) => {
            return (
              <a
                key={i}
                className={`iconWidget`}
                title={btn.name}
                draggable={true}
                onDragStart={ev => {
                  props.onDrag(ev, btn);
                }}
              >
                {btn.type === 'img' ? (
                  <img src={btn.data.image} className={`iconImg`} />
                ) : (
                  <i className={'iconfont icons ' + btn.icon} />
                )}
              </a>
            );
          })}
        </div>
      </div>
    );
  });
});

const canvasRegister = () => {
  registerFlow();
  registerActivity();
  registerClass();
  registerSequence();
  // registerNode('home', simpleClass, null, null, null);

  // registerNode('echarts', echarts, null, null, null);
  registerChart();
  registerNode('button', reactNodes(Button), null, null, null);
  registerNode('datePicker', reactNodes(DatePicker), null, null, null);
  registerNode('table', reactNodes(Table), null, null, null);
  registerNode('input', reactNodes(Input), null, null, null);

  const Block = props => {
    console.log(' Block   props    ： ', props);
    return <div>自定义</div>;
  };
  registerNode('block', reactNodes(Block), null, null, null);
};

// let canvas
export let canvas = {};
const canvasOptions = {
  rotateCursor: '/img/rotate.cur',
};

const DrawPanel = props => {
  const [data, setData] = useState(null);
  const [event, setEvent] = useState(props.event);

  return <Preview></Preview>;
  const [selected, setState] = useState({
    node: null,
    line: null,
    multi: false,
    nodes: null,
    locked: false,
  });

  const [contextmenu, setContextmenu] = useState({
    position: 'fixed',
    zIndex: '10',
    display: 'none',
    left: '',
    top: '',
    bottom: '',
  });

  console.log(
    ' DrawPanel   props, ,   ： ',
    canvas,
    props,
    data,
    selected,
    contextmenu,
    canvasOptions,
  );

  const onMessage = (event, data) => {
    // console.log(' onMessage ： ', event, data); //
    switch (event) {
      case 'move':
        setState({
          node: null,
          line: null,
          multi: false,
          nodes: null,
          locked: null,
        });
        break;
      case 'node':
      case 'addNode':
        setState({
          node: data,
          line: null,
          multi: false,
          nodes: null,
          locked: data.locked,
        });

        // data.animateFrames = [];
        // data.fillStyle = '';
        // data.rotate = '';
        // const state = Node.cloneState(data);
        // state.rect.x -= 5;
        // state.rect.ex += 5;
        // state.rect.y -= 5;
        // state.rect.ey += 5;
        // state.rect.width += 5;
        // state.rect.height += 10;
        // data.animateFrames.push({
        //   duration: 100,
        //   linear: true,
        //   state: Node.cloneState(state),
        // });
        // data.animateStart = Date.now();
        // canvas.animate();

        break;
      case 'line':
      case 'addLine':
        setState({
          node: null,
          line: data,
          multi: false,
          nodes: null,
          locked: data.locked,
        });
        break;
      case 'multi':
        setState({
          node: null,
          line: null,
          multi: true,
          // nodes: data.nodes.length > 1 ? data.nodes : null,
          nodes: data.length > 1 ? data : null,
          locked: getLocked(data),
        });
        break;
      case 'space':
        setState({
          node: null,
          line: null,
          multi: false,
          nodes: null,
          locked: false,
        });
        break;
      case 'moveOut':
        break;
      case 'moveNodes':
      case 'resizeNodes':
        console.log(' onMessage onMessage resizeNodesresizeNodes  ： '); //
        if (data.length > 1) {
          setState({
            node: null,
            line: null,
            multi: true,
            nodes: data,
            locked: getLocked({ nodes: data }),
          });
        } else {
          setState({
            node: data[0],
            line: null,
            multi: false,
            nodes: null,
            locked: false,
          });
        }
        break;
      case 'resize':
      case 'scale':
      case 'locked':
        console.log(' onMessage onMessage resize  ： '); //
        if (canvas) {
          props.dispatch({
            type: 'canvas/update',
            payload: {
              data: canvas.data,
            },
          });
        }
        break;
    }
    // tslint:disable-next-line:no-console
    // console.log('onMessage:', event, data);
  };

  const onDrag = (event, node) => {
    console.log(' event ： ', event, node); //
    // event.dataTransfer.setData('Text', JSON.stringify(node.data));
    event.dataTransfer.setData(
      'Topology',
      JSON.stringify(node.componentData || node.data),
    );
  };
  const onCustomDrag = (event, node) => {
    console.log(' onCustomDrag event ： ', event, node); //
    // event.dataTransfer.setData('Text', JSON.stringify(node.data));
    const { iconFamily = 'topology' } = node;

    event.dataTransfer.setData(
      'Topology',
      JSON.stringify({
        rect: {
          width: 50,
          height: 50,
        },
        strokeStyle: 'transparent',
        name: 'rectangle',
        icon: String.fromCharCode(+node.unicode_decimal),
        // iconFamily: 'zyb',
        iconFamily,
      }),
    );
  };

  const handlePropsChange = (props, changedValues, allValues) => {
    console.log(' handlePropsChange ： ', props, changedValues, allValues); //
    if (changedValues.node) {
      // 遍历查找修改的属性，赋值给原始Node

      // state.selected.node = Object.assign(state.selected.node, changedValues.node);
      for (const key in changedValues.node) {
        if (Array.isArray(changedValues.node[key])) {
        } else if (typeof changedValues.node[key] === 'object') {
          for (const k in changedValues.node[key]) {
            state.selected.node[key][k] = changedValues.node[key][k];
          }
        } else {
          state.selected.node[key] = changedValues.node[key];
        }
      }
      // 通知属性更新，刷新
      canvas.updateProps(state.selected.node);
    }
  };

  const getTopo = async id => {
    if (!id) {
      handle_new(null);
      return;
    }
    // const data = await get(id);
    const data = {};
    setState({
      data,
    });
    if (data && data.id) {
      canvas.open(data.data);
    }
  };

  const hanleContextMenu = event => {
    event.preventDefault();
    event.stopPropagation();

    if (event.clientY + 360 < document.body.clientHeight) {
      setContextmenu({
        position: 'fixed',
        zIndex: '10',
        display: 'block',
        left: event.clientX + 'px',
        top: event.clientY + 'px',
        bottom: '',
      });
    } else {
      setContextmenu({
        position: 'fixed',
        zIndex: '10',
        display: 'block',
        left: event.clientX + 'px',
        top: '',
        bottom: document.body.clientHeight - event.clientY + 'px',
      });
    }
  };

  const handle_new = data => {
    console.log(' handle_new ： ', data); //
    canvas.open({ nodes: [], lines: [] });
  };

  const handle_open = data => {
    console.log(' handle_open ： ', data); //
    handle_replace(data);
  };

  const handle_replace = data => {
    console.log(' handle_replace ： ', data); //
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = event => {
      console.log(' onchange ： ', event); //
      const elem = event.srcElement || event.target;
      if (elem.files && elem.files[0]) {
        const name = elem.files[0].name.replace('.json', '');
        const reader = new FileReader();
        reader.onload = e => {
          const text = e.target.result + '';
          console.log(' onload ： ', text); //
          try {
            const data = JSON.parse(text);
            console.log(
              ' data ： ',
              data,
              Array.isArray(data.nodes),
              Array.isArray(data.lines),
            ); //
            // if (data && Array.isArray(data.nodes) && Array.isArray(data.lines)) {
            if (data) {
              canvas.open(data);
            }
          } catch (e) {
            return false;
          }
        };
        console.log(' elem ： ', elem.files[0]); //
        reader.readAsText(elem.files[0]);
      }
    };
    input.click();
  };

  const handle_save = data => {
    // FileSaver.saveAs(
    //   new Blob([JSON.stringify(canvas.data)], {
    //     type: 'text/plain;charset=utf-8',
    //   }),
    // );

    const res = new Blob([JSON.stringify(canvas.data)], {
      type: 'text/plain;charset=utf-8',
    });
    console.log('  res ：', res); //
    let reader = new FileReader(); // 创建读取文件对象
    reader.addEventListener('loadend', function() {
      //
      let res = JSON.parse(reader.result); // 返回的数据
      console.log(res, '返回结果数据'); // { name: "小明" }
    });
    reader.readAsText(res, 'utf-8'); // 设置读取的数据以及返回的数据类型为utf-8
    reader.onload = e => {
      console.log(' JSON.parse(reader.result) ： ', JSON.parse(reader.result)); //
    };

    const res2 = FileSaver.saveAs(res, `le5le.topology.json`);
    console.log('  res2 ：', res2); //
  };

  const handle_upload = data => {
    const res = new Blob([JSON.stringify(canvas.data)], {
      type: 'text/plain;charset=utf-8',
    });
    console.log('  res ：', res); //
    let reader = new FileReader(); // 创建读取文件对象
    reader.addEventListener('loadend', function() {
      //
      let res = JSON.parse(reader.result); // 返回的数据
      console.log(res, '返回结果数据'); // { name: "小明" }
    });
    reader.readAsText(res, 'utf-8'); // 设置读取的数据以及返回的数据类型为utf-8
    reader.onload = e => {
      const drawRes = JSON.parse(reader.result);
      console.log(' handle_upload drawRes ： ', drawRes); //
      props.saveDraw(drawRes);
    };

    const res2 = FileSaver.saveAs(res, `le5le.topology.json`);
    console.log('  res2 ：', res2); //
  };

  const handle_savePng = data => {
    canvas.saveAsImage('le5le.topology.png');
  };

  const handle_saveSvg = data => {
    const C2S = window.C2S;
    const ctx = new C2S(canvas.canvas.width + 200, canvas.canvas.height + 200);
    console.log(' C2S ： ', window, C2S, canvas.data, ctx); //
    if (canvas.data.pens) {
      for (const item of canvas.data.pens) {
        item.render(ctx);
      }
    }

    let mySerializedSVG = ctx.getSerializedSvg();
    console.log(' mySerializedSVG ： ', mySerializedSVG); //
    mySerializedSVG = mySerializedSVG.replace(
      '<defs/>',
      `<defs>
        <style type="text/css">
          @font-face {
            font-family: 'topology';
            src: url('http://at.alicdn.com/t/font_1331132_h688rvffmbc.ttf?t=1569311680797') format('truetype');
          }
        </style>
      </defs>`,
    );

    mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x');
    const urlObject = window.URL || window;
    const export_blob = new Blob([mySerializedSVG]);
    const url = urlObject.createObjectURL(export_blob);

    const a = document.createElement('a');
    a.setAttribute('download', 'le5le.topology.svg');
    a.setAttribute('href', url);
    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
  };

  const handle_undo = data => {
    canvas.undo();
  };

  const handle_redo = data => {
    canvas.redo();
  };

  const handle_copy = data => {
    canvas.copy();
  };

  const handle_cut = data => {
    canvas.cut();
  };

  const handle_paste = data => {
    canvas.paste();
  };

  const handle_curve = data => {
    canvas.data.lineName = 'curve';
    props.dispatch({
      type: 'canvas/update',
      payload: {
        data: canvas.data,
      },
    });
  };

  const handle_polyline = data => {
    canvas.data.lineName = 'polyline';
    props.dispatch({
      type: 'canvas/update',
      payload: {
        data: canvas.data,
      },
    });
  };

  const handle_line = data => {
    canvas.data.lineName = 'line';
    props.dispatch({
      type: 'canvas/update',
      payload: {
        data: canvas.data,
      },
    });
  };

  const getLocked = data => {
    let locked = true;
    if (data.nodes && data.nodes.length) {
      for (const item of data.nodes) {
        if (!item.locked) {
          locked = false;
          break;
        }
      }
    }
    if (locked && data.lines) {
      for (const item of data.lines) {
        if (!item.locked) {
          locked = false;
          break;
        }
      }
    }

    return locked;
  };

  const handleEvent = {
    handle_new,
    handle_open,
    handle_replace,
    handle_save,
    handle_upload,
    handle_savePng,
    handle_saveSvg,
    handle_undo,
    handle_redo,
    handle_copy,
    handle_cut,
    handle_paste,
    handle_curve,
    handle_polyline,
    handle_line,
  };
  useEffect(() => {
    console.log(
      ' 副作用 ： ',
      props,
      data,
      selected,
      contextmenu,
      canvasOptions,
    ); //
    if (props.event !== event) {
      console.log(' 不相等 更新 ： '); //
      setEvent(props.event);
      if (handleEvent['handle_' + props.event.event]) {
        handleEvent['handle_' + props.event.event](props.event.data);
      }
    }
  }, [props.event]);

  useEffect(() => {
    console.log(
      ' 副作用 11 ： ',
      props,
      data,
      selected,
      contextmenu,
      canvasOptions,
    ); //
    canvasRegister();
    // return
    canvasOptions.on = onMessage;
    canvas = new Topology('topology-canvas', canvasOptions);
    canvas.grid = true;
    canvas.rule = true;

    document.onclick = event => {
      console.log(' document ： ', event); //
      setContextmenu({
        display: 'none',
        left: '',
        top: '',
        bottom: '',
      });
    };

    // setState({ id: props.location.query.id });
    // getTopo(props.location.query.id);
  }, []);

  /**
   * 当表单数据变化时, 重新渲染canvas
   * @params {object} value - 图形的宽度,高度, x, y等等
   */

  const onHandleFormValueChange = useCallback(
    value => {
      if (selected.node.name === 'echarts') {
        canvas.updateProps(selected.node);
        return;
      }

      const {
        color,
        fontSize,
        fontFamily,

        // rotate,
        // data,
        // lineWidth,
        // strokeStyle,
        // dash,
        // text,
        // seriesFunction,
        ...other
      } = value;
      let changedValues = {
        node: {
          // rect: other,
          font: { color, fontSize, fontFamily },
          ...other,
          // rotate,
          // lineWidth,
          // strokeStyle,
          // dash,
          // text,
          // data,
        },
      };

      if (changedValues.node) {
        // 遍历查找修改的属性，赋值给原始Node
        for (const key in changedValues.node) {
          if (Array.isArray(changedValues.node[key])) {
          } else if (typeof changedValues.node[key] === 'object') {
            for (const k in changedValues.node[key]) {
              selected.node[key][k] = changedValues.node[key][k];
            }
            // selected.node.fillStyle = 'red'
            // selected.node.globalAlpha = '0.3'
          } else {
            // selected.node.iconFamily = 'topology';
            // selected.node.icon = String.fromCharCode(+'59052');
            selected.node[key] = changedValues.node[key];
            // selected.node.xxxxxxxxxxxxxxxxx = 'zyb'
          }
        }
      }
      console.log(
        ' selected.node ： ',
        selected.node,
        value,
        changedValues,
        canvas,
      ); //
      canvas.updateProps(selected.node);
    },
    [selected],
  );

  const onEventValueChange = useCallback(
    value => {
      selected.node.events = value;
      canvas.updateProps(selected.node);
    },
    [selected],
  );

  const onUpdateComponentProps = useCallback(
    data => {
      const { bind, ...value } = data;
      let idx = canvas.data.pens.findIndex(pen => pen.id === selected.node.id);
      canvas.data.pens[idx].data.props = {
        ...canvas.data.pens[idx].data.props,
        ...value,
      };
      canvas.data.pens[idx].data.bind = bind;
      console.log(
        ' onUpdateComponentProps ： ',
        data,
        value,
        canvas.data,
        idx,
        selected.node,
        canvas.data.pens[idx].data,
      ); //
      let reader = new FileReader();
      const result = new Blob([JSON.stringify(canvas.data)], {
        type: 'text/plain;charset=utf-8',
      });
      reader.readAsText(result, 'text/plain;charset=utf-8');
      console.log(' reader ： ', reader, reader.result); //
      reader.onload = e => {
        canvas.open(JSON.parse(reader.result));
      };
    },
    [selected],
  );

  const onUpdateHttpProps = useCallback(
    data => {
      let idx = canvas.data.pens.findIndex(pen => pen.id === selected.node.id);
      canvas.data.pens[idx].data.http = {
        api: data.api,
        type: data.type,
        paramsGetStyle: 'subscribe',
        handleResult: data.handleResult,
        paramsArr: data.keys.map((item, index) => ({
          key: data.paramsKey[index],
          value: data.paramsValue[index],
        })),
      };
      let reader = new FileReader();
      const result = new Blob([JSON.stringify(canvas.data)], {
        type: 'text/plain;charset=utf-8',
      });
      reader.readAsText(result, 'text/plain;charset=utf-8');
      reader.onload = e => {
        canvas.open(JSON.parse(reader.result));
      };
    },
    [selected],
  );

  /**
   * 当线条表单数据变化时, 重新渲染canvas
   * @params {object} value - 图形的宽度,高度, x, y等等
   */

  const onHandleLineFormValueChange = useCallback(
    value => {
      const {
        dash,
        lineWidth,
        strokeStyle,
        name,
        fromArrow,
        toArrow,
        ...other
      } = value;
      const changedValues = {
        // line: { rect: other, lineWidth, dash, strokeStyle, name, fromArrow, toArrow }
        line: {
          ...value,
        },
      };
      console.log(' onHandleLineFormValueChange ： ', selected.line, value); //
      if (changedValues.line) {
        // 遍历查找修改的属性，赋值给原始line
        for (const key in changedValues.line) {
          if (Array.isArray(changedValues.line[key])) {
          } else if (typeof changedValues.line[key] === 'object') {
            // console.log(' 对象属性 ： ', key, value,   )//
            for (const k in changedValues.line[key]) {
              selected.line[key][k] = changedValues.line[key][k];
            }
          } else {
            // console.log(' 普通属性 ： ', key, value,   )//
            selected.line[key] = changedValues.line[key];
          }
        }
      }
      canvas.updateProps(selected.line);
    },
    [selected],
  );

  /**
   * 画布右侧配置区域
   */
  const nodeFormRef = React.createRef();

  const rightAreaConfig = useMemo(() => {
    console.log(' rightAreaConfig selected ： ', selected); //
    // return <NodeAttrForm></NodeAttrForm>

    return {
      node: selected && (
        <NodeComponent
          data={selected}
          onFormValueChange={onHandleFormValueChange}
          onEventValueChange={onEventValueChange}
          onUpdateComponentProps={value => onUpdateComponentProps(value)}
          onUpdateHttpProps={value => onUpdateHttpProps(value)}
          // ref={nodeFormRef}
        />
      ), // 渲染Node节点类型的组件
      node: selected && (
        <NodeAttrForm
          data={selected}
          onFormValueChange={onHandleFormValueChange}
          onEventValueChange={onEventValueChange}
          onUpdateComponentProps={value => onUpdateComponentProps(value)}
          onUpdateHttpProps={value => onUpdateHttpProps(value)}
        ></NodeAttrForm>
      ),
      line: selected && (
        <LineComponent
          data={selected}
          onFormValueChange={onHandleLineFormValueChange}
        />
      ), // 渲染线条类型的组件
      line: selected && (
        <LineAttrForm
          data={selected}
          onFormValueChange={onHandleLineFormValueChange}
        />
      ),
      default: canvas && <BackgroundComponent data={canvas} />, // 渲染画布背景的组件
      default: canvas && <CanvasAttrForm data={canvas} canvas={canvas} />,
    };
  }, [
    selected,
    onHandleFormValueChange,
    onHandleLineFormValueChange,
    onEventValueChange,
    onUpdateComponentProps,
    onUpdateHttpProps,
  ]);

  /**
   * 渲染画布右侧区域操作栏
   */

  const renderRightArea = useMemo(() => {
    let _component = rightAreaConfig.default;
    Object.keys(rightAreaConfig).forEach(item => {
      if (selected[item]) {
        _component = rightAreaConfig[item];
      }
    });
    return _component;
  }, [selected, rightAreaConfig]);

  const sideBarLeft = (
    <div className={'styles.props sideBar sideBarLeft'}>
      {/* <Tabs defaultActiveKey="1">
      <TabPane tab="系统组件" key="1"  > */}
      <div className={`toolWrapper`}>
        <DrawTool onDrag={onDrag}></DrawTool>
        {/* <CustomTools
        onCustomDrag={onCustomDrag}
        font_family={lteeIcons.font_family}
        css_prefix_text={lteeIcons.css_prefix_text}
        glyphs={lteeIcons.glyphs}
      ></CustomTools>
      <CustomTools
        onCustomDrag={onCustomDrag}
        font_family={ltdxIcons.font_family}
        css_prefix_text={ltdxIcons.css_prefix_text}
        glyphs={ltdxIcons.glyphs}
      ></CustomTools> */}
        {/* <CustomTools onCustomDrag={onCustomDrag} font_family={customIcons.font_family} glyphs={customIcons.glyphs} ></CustomTools> */}
      </div>
      {/* </TabPane>
      <TabPane tab="自定义图片" key="2"  >
        <MyComponent />
      </TabPane>
    </Tabs> */}
    </div>
  );

  const canvasContainer = (
    <div
      id="topology-canvas"
      className={'styles.full canvas'}
      onContextMenu={hanleContextMenu}
    />
  );

  const contextMenu = (
    <div style={contextmenu}>
      <CanvasContextMenu
        data={selected}
        canvas={canvas}
        dispatch={props.dispatch}
      />
    </div>
  );

  return (
    <div className="drawContainer">
      <Header></Header>

      <div className="drawPanel">
        {sideBarLeft}

        {canvasContainer}

        <div className={'styles.props sideBar sideBarRight'}>
          {renderRightArea}
          {/* <NodeAttrForm data={selected} ></NodeAttrForm> */}
          {/* <CanvasProps data={selected} onValuesChange={handlePropsChange} /> */}
        </div>

        {/* {contextMenu} */}
      </div>
    </div>
  );
};

// export default DrawPanel;
export default connect(state => ({ event: state.event }))(DrawPanel);
