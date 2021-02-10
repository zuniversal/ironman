import React, { useState, useEffect } from 'react';
import './style.less';
import { Modal, Tabs, Button, DatePicker, Table, Input } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { connect } from 'umi';

import { Tools } from './tools';
import reactNodes from './Plugin/React-nodes';

import * as FileSaver from 'file-saver';
var C2S;

// import { Topology } from 'topology-core';
// import { Options } from 'topology-core/options';
// import { registerNode } from 'topology-core/middles';
import { Topology, registerNode } from '@topology/core';
import { register as registerFlow } from '@topology/flow-diagram';

import { register as registerActivity } from '@topology/activity-diagram';
import { register as registerClass } from '@topology/class-diagram';
import { register as registerSequence } from '@topology/sequence-diagram';
import { register as registerChart } from '@topology/chart-diagram';

import CanvasContextMenu from './canvasContextMenu';
import Header from './Header';

const CanvasProps = props => {
  console.log(' CanvasProps   props, ,   ： ', props);
  return (
    <div className="tipsWrapper">
      <div className={'tips'}>小提示</div>
      <ul className={'intro'}>
        <li>方向键：控制节点移动5个像素</li>
        <li>Ctrl + 方向键：控制节点移动1个像素</li>
        <li>Ctrl + 鼠标移动：移动整个画布</li>
        <li>Ctrl + 鼠标滚轮：缩放</li>
        <li>添加或选中节点，右侧属性支持上传各种图片哦</li>
      </ul>
    </div>
  );
};

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
};

// let canvas
let canvas = {};
const canvasOptions = {
  rotateCursor: '/img/rotate.cur',
};

const DrawPanel = props => {
  const [id, setId] = useState('');
  const [data, setData] = useState(null);
  const [event, setEvent] = useState(props.event);

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
    console.log(' onMessage ： ', event, data); //
    switch (event) {
      case 'node':
      case 'addNode':
        setState({
          node: data,
          line: null,
          multi: false,
          nodes: null,
          locked: data.locked,
        });
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
    event.dataTransfer.setData('Text', JSON.stringify(node.data));
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
    FileSaver.saveAs(
      new Blob([JSON.stringify(canvas.data)], {
        type: 'text/plain;charset=utf-8',
      }),
      `le5le.topology.json`,
    );
  };

  const handle_savePng = data => {
    canvas.saveAsImage('le5le.topology.png');
  };

  const handle_saveSvg = data => {
    const ctx = new C2S(canvas.canvas.width + 200, canvas.canvas.height + 200);
    for (const item of canvas.data.nodes) {
      item.render(ctx);
    }

    for (const item of canvas.data.lines) {
      item.render(ctx);
    }

    let mySerializedSVG = ctx.getSerializedSvg();
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

  const handle_parse = data => {
    canvas.parse();
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
    handle_savePng,
    handle_saveSvg,
    handle_undo,
    handle_redo,
    handle_copy,
    handle_cut,
    handle_parse,
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
    canvasOptions.on = onMessage;
    canvas = new Topology('topology-canvas', canvasOptions);

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

  return (
    <div className="drawContainer">
      <Header></Header>

      <div className="drawPanel">
        <div className={'styles.props sideBar sideBarLeft'}>
          {Tools.map((item, index) => {
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
                          onDrag(ev, btn);
                        }}
                      >
                        <i className={'iconfont ' + btn.icon} />
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div
          id="topology-canvas"
          className={'styles.full canvas'}
          onContextMenu={hanleContextMenu}
        />

        <div className={'styles.props sideBar sideBarRight'}>
          <CanvasProps data={selected} onValuesChange={handlePropsChange} />
        </div>

        <div style={contextmenu}>
          <CanvasContextMenu
            data={selected}
            canvas={canvas}
            dispatch={props.dispatch}
          />
        </div>
      </div>
    </div>
  );
};

// export default DrawPanel;
export default connect(state => ({ event: state.event }))(DrawPanel);
