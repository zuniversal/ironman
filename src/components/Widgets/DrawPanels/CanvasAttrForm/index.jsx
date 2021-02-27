import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import { halfFormLayouts } from '@/configs'; //
import { layout } from '@topology/layout';
import { canvas } from '../index';

const animateTypeconfig = [
  {
    value: 'upDown',
    label: '上下跳动',
  },
  {
    value: 'leftRight',
    label: '左右跳动',
  },
  {
    value: 'heart',
    label: '心跳',
  },
  {
    value: 'success',
    label: '成功',
  },
  {
    value: 'warning',
    label: '警告',
  },
  {
    value: 'show',
    label: '炫耀',
  },
];

const CanvasAttrForm = props => {
  console.log(' CanvasAttrForm   props, ,   ： ', props, canvas);
  // const {canvas,  } = props

  const onFormLayoutChange = params => {
    console.log(
      ' onFormLayoutChange   params,   ： ',
      params,
      canvas,
      canvas.data.pens,
    );
    const { value } = params;
    const keys = Object.keys(value)[0];
    console.log('  keys  Object.keys(value) ：', keys);
    if (keys === 'scaleTo') {
      console.log('  keys  scaleTo  ：', value[keys] / 100);
      canvas.scaleTo(value[keys] / 100);
    } else if (keys === 'allColor') {
      console.log('  keys  allColor  ：', value[keys]);
      canvas.data.pens.forEach((v, i) => {
        v.animatePlay = false;
        v.strokeStyle = value[keys];
        v.iconColor = value[keys];
        canvas.render();
        // v.animatePlay = true
      });
    } else {
      canvas.data[keys] = value[keys];
    }
    canvas.render();
    // layout(canvas.data.pens, {bkColor: '#000000', grid: false,   });
    // canvas.updateProps(true, canvas.data.pens);
    // if (canvas) {
    //   console.log(' value ： ', params.value, canvas.data); //
    //   layout(canvas.data.pens, params.value);
    //   canvas.updateProps(true, canvas.data.pens);
    // }
  };

  const config = [
    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '画布设置',
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '最大宽度',
    //     value: 'maxWidth',
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '节点宽度',
    //     value: 'nodeWidth',
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '节点高度',
    //     value: 'nodeHeight',
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '水平个数',
    //     value: 'maxCount',
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '水平间距',
    //     value: 'spaceWidth',
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '垂直间距',
    //     value: 'spaceHeight',
    //   },
    // },

    {
      formType: 'rowText',
      itemProps: {
        label: '排版布局',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '缩放大小',
        name: 'scaleTo',
      },
    },
    {
      // formType: 'TextArea',
      itemProps: {
        label: '背景图片',
        name: 'bkImage',
      },
    },

    {
      itemProps: {
        label: '背景颜色',
        name: 'bkColor',
      },
      comProps: {
        type: 'color',
      },
    },

    {
      formType: 'Switch',
      itemProps: {
        label: '背景网格',
        name: 'grid',
      },
    },
    {
      itemProps: {
        label: '网格颜色',
        name: 'gridColor',
      },
      comProps: {
        type: 'color',
      },
    },

    {
      formType: 'InputNumber',
      itemProps: {
        label: '网格大小',
        name: 'gridSize',
      },
    },

    {
      itemProps: {
        label: '标尺颜色',
        name: 'ruleColor',
      },
      comProps: {
        type: 'color',
      },
    },
    {
      formType: 'Switch',
      itemProps: {
        label: '标尺',
        name: 'rule',
      },
    },
    {
      itemProps: {
        label: '整体颜色',
        name: 'allColor',
      },
      comProps: {
        type: 'color',
      },
    },

    {
      formType: 'Switch',
      itemProps: {
        label: '锁定拖动',
        name: 'locked',
      },
    },
  ];

  return (
    <div className="canvasAttrForm attrFormWrapper">
      <div className={`attr`}>
        <SmartForm
          config={config.map(v => ({
            ...v,
            itemProps: {
              ...v.itemProps,
              className: v.formType === 'rowText' ? 'w100' : 'w-90',
            },
            comProps: {
              ...(v.comProps ?? {}),
              size: 'small',
              className: v.formType === 'Switch' ? '' : 'w-90',
            },
          }))}
          noRuleAll
          flexRow={2}
          layout={'vertical'}
          formLayouts={halfFormLayouts}
          init={props.canvas}
          onFieldChange={onFormLayoutChange}
        ></SmartForm>
      </div>
    </div>
  );
};

export default CanvasAttrForm;
