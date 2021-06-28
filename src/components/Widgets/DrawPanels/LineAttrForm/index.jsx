import React from 'react';
import './style.less';
import { Button, Form } from 'antd';
import SmartForm from '@/common/SmartForm';
import { halfFormLayouts } from '@/configs';
import { layout } from '@topology/layout';
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
  linkTypeConfig,
  linkAnimateConfig,
  fromArrowConfig,
  toArrowConfig,
} from '../configs';
import { useEffect } from 'react';

const LineAttrForm = React.memo(props => {
  console.log(' LineAttrForm   props, ,   ： ', props);
  const [form] = Form.useForm();
  const { data, onFormValueChange } = props;

  const onFormLayoutChange = params => {
    console.log(' onFormLayoutChange   params,   ： ', params, canvas);
    const { value } = params;
    const keys = Object.keys(value)[0];
    onFormValueChange(params.formData);
  };

  // useEffect(() => {
  //   const formValues = form.getFieldsValue();
  //   console.log(' LineAttrForm formValues ： ', formValues, props )//
  //   onFormValueChange({
  //     ...formValues,
  //     toArrow: '',
  //   });
  // }, [])

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '样式',
      },
    },
    {
      formType: 'Select',
      selectData: lineTypeConfig,
      itemProps: {
        label: '线条样式',
        name: 'dash',
      },
    },
    {
      formType: 'Select',
      selectData: linkTypeConfig,
      itemProps: {
        label: '连线类型',
        name: 'name',
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
        label: '连线边框',
        name: 'borderColor',
      },
      comProps: {
        type: 'color',
      },
    },
    {
      itemProps: {
        label: '边框宽度',
        name: 'borderWidth',
      },
    },
    {
      itemProps: {
        label: '透明度（0-1）',
        name: 'globalAlpha',
      },
    },
    {
      itemProps: {
        label: '角度',
        name: 'gradientAngle',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '位置',
      },
    },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '起点x',
    //     name: ['from', 'x'],
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '起点y',
    //     name: ['from', 'y'],
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '终点x',
    //     name: ['to', 'x'],
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '终点y',
    //     name: ['to', 'y'],
    //   },
    // },
    {
      formType: 'Select',
      selectData: fromArrowConfig,
      itemProps: {
        label: '起点箭头',
        name: 'fromArrow',
      },
    },
    {
      formType: 'Select',
      selectData: toArrowConfig,
      itemProps: {
        label: '结束箭头',
        name: 'toArrow',
      },
    },
    {
      itemProps: {
        label: '起点箭头颜色',
        name: 'fromArrowColor',
      },
      comProps: {
        type: 'color',
      },
    },
    {
      itemProps: {
        label: '终点箭头颜色',
        name: 'toArrowColor',
      },
      comProps: {
        type: 'color',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '起点箭头大小',
        name: 'fromArrowSize',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '终点箭头大小',
        name: 'toArrowSize',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '动效',
      },
    },
    {
      formType: 'Select',
      selectData: linkAnimateConfig,
      itemProps: {
        label: '动画类型',
        name: 'animateType',
      },
    },
    {
      itemProps: {
        label: '颜色',
        name: 'animateColor',
      },
      comProps: {
        type: 'color',
      },
    },
    {
      itemProps: {
        label: '快慢',
        name: 'animateSpan',
      },
    },
    {
      itemProps: {
        label: '圆点大小',
        name: 'animateDotSize',
      },
    },
    {
      itemProps: {
        label: '循环次数',
        name: 'animateCycle',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <Button
          type="primary"
          onClick={() => {
            data.line.animateStart = Date.now();
            canvas.animate();
          }}
        >
          开始
        </Button>
      ),
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '文字',
      },
    },
    {
      itemProps: {
        label: '字体',
        name: ['font', 'fontFamily'],
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '大小',
        name: ['font', 'fontSize'],
      },
    },
    {
      itemProps: {
        label: '颜色',
        name: ['font', 'color'],
      },
      comProps: {
        type: 'color',
      },
    },
    {
      itemProps: {
        label: '背景',
        name: ['font', 'background'],
      },
    },
    {
      formType: 'Select',
      selectData: fontStyleConfig,
      itemProps: {
        itemProps: {
          label: '倾斜',
          name: ['font', 'fontStyle'],
        },
      },
    },

    {
      formType: 'Select',
      selectData: fontWeightConfig,
      itemProps: {
        itemProps: {
          label: '加粗',
          name: ['font', 'fontWeight'],
        },
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

  return (
    <div className="lineAttrForm attrFormWrapper">
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
          init={data?.line}
          onFieldChange={onFormLayoutChange}
          propsForm={form}
        ></SmartForm>
      </div>
    </div>
  );
});

export default LineAttrForm;
