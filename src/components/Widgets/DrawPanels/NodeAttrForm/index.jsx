import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import { halfFormLayouts, powerPointItemConfig } from '@/configs';
import { Node } from '@topology/core';
import { canvas } from '../index';
import {
  animateTypeConfig,
  lineTypeConfig,
  bgConfig,
  fontStyleConfig,
  fontWeightConfig,
  fontHorizontalConfig,
  fontVerticalConfig,
  imgAlignConfig,
} from '../configs';

const NodeAttrForm = props => {
  console.log(' NodeAttrForm   props, ,   ： ', props);
  const { node } = props.data;

  const pointConfig = [
    {
      formType: 'rowText',
      itemProps: {
        label: '绑定监控点',
      },
    },
    {
      formType: 'Select',
      selectData: props.powerPointList,
      itemProps: {
        label: '检测点',
        name: ['data', 'powerPoint'],
      },
      comProps: {
        // onSelect: ,
        // mode: 'multiple',
        className: 'powerPoint',
      },
      flexRow: 1,
    },
    {
      formType: 'Select',
      selectData: powerPointItemConfig,
      itemProps: {
        label: '检测字段',
        name: ['data', 'powerPointKey'],
      },
      comProps: {
        // onSelect: ,
        mode: 'multiple',
        className: 'powerPoint',
      },
      flexRow: 1,
    },
  ];

  const onHandleStyleSelectChange = e => {
    console.log(' onHandleStyleSelectChange ： ', node, canvas);
    // node.initAnimate()
    node.animateFrames = [];
    node.fillStyle = '';
    node.rotate = '';
    const state = Node.cloneState(node);
    switch (e) {
      case 'upDown':
        state.rect.y -= 10;
        state.rect.ey -= 10;
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state),
        });
        node.animateStart = Date.now();
        break;
      case 'leftRight':
        state.rect.x -= 10;
        state.rect.ex -= 10;
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state),
        });

        state.rect.x += 20;
        state.rect.ex += 20;
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state),
        });
        node.animateStart = Date.now();
        break;
      case 'heart':
        state.rect.x -= 5;
        state.rect.ex += 5;
        state.rect.y -= 5;
        state.rect.ey += 5;
        state.rect.width += 5;
        state.rect.height += 10;
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state),
        });
        node.animateStart = Date.now();
        break;
      case 'success':
        state.strokeStyle = '#237804';
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state),
        });
        state.strokeStyle = '#237804';
        state.fillStyle = '#389e0d22';
        node.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(state),
        });
        node.animateStart = Date.now();
        break;
      case 'warning':
        state.strokeStyle = '#fa8c16';
        state.dash = 2;
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state),
        });
        state.fillStyle = '#fa8c16';
        state.dash = 0;
        node.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(state),
        });
        node.animateStart = Date.now();
        break;
      case 'show':
        state.rotate = -10;
        node.animateFrames.push({
          duration: 100,
          linear: true,
          state: Node.cloneState(state),
        });
        state.rotate = 10;
        node.animateFrames.push({
          duration: 300,
          linear: true,
          state: Node.cloneState(state),
        });
        node.animateStart = Date.now();
        break;
      default:
        break;
    }

    node.animateDuration = 0;
    for (const item of node.animateFrames) {
      node.animateDuration += item.duration;
    }
    node.animatePlay = true;
    // node.startAnimate();
  };

  const onHandleSwitchChange = e => {
    console.log(' onHandleSwitchChange ： ', node, canvas);
    if (e) {
      node.animateStart = Date.now();
      canvas.animate();
    } else {
      node.animateStart = 0;
    }
  };
  const onHandlePlayChange = e => {
    console.log(' onHandlePlayChange ： ', e, node, canvas);
    if (e) {
      node.animateStart = Date.now();
      node.animatePlay = true;
      canvas.animate();
    } else {
      node.initAnimate();
      node.animateStart = 0;
      node.animatePlay = false;
    }
  };

  const animateConfig = [
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '动画时长',
    //     name: 'animateDuration',
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '循环次数',
    //     name: 'animateCycle',
    //   },
    // },
    // {
    //   label: '下个动画',
    //   name: 'nextAnimate',
    // },
    {
      formType: 'Select',
      selectData: animateTypeConfig,
      itemProps: {
        label: '特效',
        name: 'animateType',
      },
      comProps: {
        onSelect: onHandleStyleSelectChange,
      },
    },
    {
      formType: 'Switch',
      itemProps: {
        label: '播放',
        name: 'start',
      },
      comProps: {
        onChange: onHandleSwitchChange,
      },
    },
    {
      formType: 'Switch',
      itemProps: {
        label: '自动播放',
        name: 'animatePlay',
      },
      comProps: {
        onChange: onHandlePlayChange,
      },
    },
  ];

  const styleConfig = [
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: 'X(px)',
    //     name: ['rect', 'x'],
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: 'Y(px)',
    //     name: ['rect', 'y'],
    //   },
    // },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '宽(px)',
        name: ['rect', 'width'],
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '高(px)',
        name: ['rect', 'height'],
      },
    },

    {
      formType: 'InputNumber',
      itemProps: {
        label: '圆角',
        name: 'borderRadius',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '旋转',
        name: 'rotate',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '左边距',
        name: 'paddingLeft',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '右边距',
        name: 'paddingRight',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '上边距',
        name: 'paddingTop',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '下边距',
        name: 'paddingBottom',
      },
    },
  ];

  const lineConfig = [
    {
      formType: 'Select',
      selectData: lineTypeConfig,
      itemProps: {
        label: '线条样式',
        name: 'dash',
      },
    },
    {
      itemProps: {
        label: '线条颜色',
        name: 'strokeStyle',
      },
      comProps: {
        type: 'color',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '线条宽度',
        name: 'lineWidth',
      },
    },
    {
      itemProps: {
        label: '背景颜色',
        name: 'fillStyle',
      },
      comProps: {
        type: 'color',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '透明度（0 - 1）',
        name: 'globalAlpha',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '角度',
        name: 'gradientAngle',
      },
    },
    // {
    //   itemProps: {
    //     label: '背景颜色',
    //     name: 'fillStyle',
    //   },
    // },
    {
      itemProps: {
        label: '开始颜色',
        name: 'gradientFromColor',
      },
      comProps: {
        type: 'color',
      },
    },
    {
      itemProps: {
        label: '结束颜色',
        name: 'gradientToColor',
      },
      comProps: {
        type: 'color',
      },
    },
  ];

  const textConfig = [
    // {
    //   itemProps: {
    //     label: '字体类型',
    //     name: ['font', 'fontFamily'],
    //   },
    // },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '字体大小',
        name: ['font', 'fontSize'],
      },
    },
    {
      itemProps: {
        label: '字体颜色',
        name: ['font', 'color'],
      },
      comProps: {
        type: 'color',
      },
    },

    {
      itemProps: {
        label: '背景颜色',
        name: ['font', 'background'],
      },
      comProps: {
        type: 'color',
      },
    },
    {
      formType: 'Select',
      selectData: fontStyleConfig,
      itemProps: {
        label: '倾斜',
        name: ['font', 'fontStyle'],
      },
    },

    {
      formType: 'Select',
      selectData: fontWeightConfig,
      itemProps: {
        label: '加粗',
        name: ['font', 'fontWeight'],
      },
    },
    {
      formType: 'Select',
      selectData: fontHorizontalConfig,
      itemProps: {
        label: '水平对齐',
        name: ['font', 'textAlign'],
      },
    },

    {
      formType: 'Select',
      selectData: fontVerticalConfig,
      itemProps: {
        label: '垂直对齐',
        name: ['font', 'textBaseline'],
      },
    },

    {
      formType: 'InputNumber',
      itemProps: {
        label: '行高',
        name: ['font', 'lineHeight'],
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '最大行数',
        name: ['font', 'textMaxLine'],
      },
    },

    {
      formType: 'InputNumber',
      itemProps: {
        label: '水平偏移',
        name: 'textOffsetX',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '垂直偏移',
        name: 'textOffsetY',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '内容',
        name: 'text',
      },
    },
  ];

  const imgConfig = [
    {
      itemProps: {
        label: '图片选择',
        name: 'image',
      },
    },

    {
      itemProps: {
        label: '图标icon',
        name: 'icon',
      },
    },
    {
      itemProps: {
        label: '图标大小',
        name: 'iconSize',
      },
    },

    {
      itemProps: {
        label: '图标颜色',
        name: 'iconColor',
      },
      comProps: {
        type: 'color',
      },
    },

    {
      itemProps: {
        label: '图标旋转',
        name: 'iconRotate',
      },
    },

    {
      formType: 'InputNumber',
      itemProps: {
        label: '宽（px）',
        name: 'imageWidth',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '高（px）',
        name: 'imageHeight',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '保存图片比例',
        name: 'imageRatio',
      },
    },

    {
      formType: 'Select',
      selectData: imgAlignConfig,
      itemProps: {
        label: '图片对齐',
        name: 'imageAlign',
      },
    },

    {
      itemProps: {
        label: 'Markdown',
        name: 'markdown',
      },
    },
    {
      itemProps: {
        label: '原生title',
        name: 'title',
      },
    },
  ];

  const formItemConfig = [
    ...pointConfig,
    {
      formType: 'rowText',
      itemProps: {
        label: '动效',
      },
    },
    ...animateConfig,
    {
      formType: 'rowText',
      itemProps: {
        label: '位置和大小',
      },
    },
    ...styleConfig,
    {
      formType: 'rowText',
      itemProps: {
        label: '样式',
      },
    },
    ...lineConfig,
    {
      formType: 'rowText',
      itemProps: {
        label: '文字',
      },
    },
    ...textConfig,
    {
      formType: 'rowText',
      itemProps: {
        label: '图片',
      },
    },
    ...imgConfig,
    // {
    //   label: '鼠标提示',
    //   config: '',
    // },
    // {
    //   label: '本身数据',
    //   config: '',
    // },
    // {
    //   label: '自定义数据',
    //   config: '',
    // },
  ];

  const onFormLayoutChange = params => {
    console.log(' onFormLayoutChange params,  ： ', props, params);
    const { onFormValueChange } = props;
    if (props.data.node.name === 'echarts') {
      props.data.node.data.echarts.option.seriesFunction = params.data;
      onFormValueChange(props.data.node);
      return;
    }
    // onFormValueChange(params.formData);
    onFormValueChange({
      ...params.formData,
      // text: 'zzzzzz\nsssss\n' + `aaa\n`,
    });
  };

  // const formItems = formItemConfig.map((v, i) => (
  //   <div className={`attr`} key={i}>
  //     <div className="title">{v.label}</div>
  //     {/* {v.config.map((item, i) => (
  //       <div className={`attr`} key={i}>
  //         <div className="label">{item.label}</div>
  //       </div>
  //     ))} */}
  //     <SmartForm config={v.config.map((v) => ({
  //       ...v,
  //       itemProps: {
  //         ...v.itemProps, className: 'w-90',
  //       },
  //       comProps: {
  //         ...v.comProps ?? {}, size: 'small',
  //         className: 'w-90',
  //       }}))}
  //       noRuleAll
  //       flexRow={2}
  //       layout={'vertical'}
  //       formLayouts={halfFormLayouts}
  //       init={props.data?.node}
  //       onFieldChange={onFormLayoutChange}
  //       key={i}
  //     ></SmartForm>
  //   </div>
  // ))

  return (
    <div className="nodeAttrForm attrFormWrapper">
      <div className={`attr`}>
        <SmartForm
          config={formItemConfig.map(v => ({
            ...v,
            itemProps: {
              ...v.itemProps,
              className: `${v.formType === 'rowText' ? 'w100' : 'w-90'} ${
                v.itemProps ? v.itemProps.className : ''
              } `,
            },
            comProps: {
              ...(v.comProps ?? {}),
              size: 'small',
              className: `w-90 ${v.comProps ? v.comProps.className : ''} `,
            },
          }))}
          noRuleAll
          flexRow={2}
          layout={'vertical'}
          formLayouts={halfFormLayouts}
          init={props.data?.node}
          onFieldChange={onFormLayoutChange}
          key={props.data.node?.id}
        ></SmartForm>
      </div>

      {/* {formItems} */}
    </div>
  );
};

export default NodeAttrForm;
