import React from 'react';
import './style.less';
import { Form, InputNumber } from 'antd';
import SmartForm from '@/common/SmartForm';
import { notifyTypeConfig, fullFormLayouts } from '@/configs';

const defRule = {
  role: {
    // 0: {fields: 'current', range: {0: null, 1: null}, duration: null},
    // 1: {fields: 'voltage', range: {0: null, 1: null}, duration: null},
    // 2: {fields: 'load', threshold: null, duration: null},
    one: { fields: 'current', range: { 0: null, 1: null }, duration: null },
    two: { fields: 'voltage', range: { 0: null, 1: null }, duration: null },
    three: { fields: 'load', threshold: null, duration: null },
  },
};

const layoutObj = {
  labelCol: {
    sm: { span: 7 }, //
  },
  wrapperCol: {
    sm: { span: 17 }, //
  },
};

// const checkboxData = [{ label: '', value: true, key: 'true' }];
const checkboxData = { label: '', value: 1, key: 'true' };

const AlarmTemplateForm = props => {
  console.log(' AlarmTemplateForm ： ', props);
  const { formBtn, ...rest } = props;

  const ruleConfig = [
    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '电流阈值',
    //   },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '字段',
    //     name: ['role', 'one', 'fields'],
    //     className: 'hidden',
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '电流过低',
    //     name: ['role', 'one', 'range', '0'],
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '电流过高',
    //     name: ['role', 'one', 'range', '1'],
    //   },
    // },
    // {
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '持续',
    //     name: ['role', 'one', 'duration'],
    //   },
    // },
    // {
    //   noRule: true,
    //   formType: 'Checkbox',
    //   checkboxData: checkboxData,
    //   opType: 'item',
    //   itemProps: {
    //     label: '是否发送短信',
    //     name: ['role', 'one', 'send'],
    //     valuePropName: 'checked',
    //   },
    // },

    {
      formType: 'rowText',
      itemProps: {
        label: '电压阈值',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '字段',
        name: ['role', 'two', 'fields'],
        className: 'hidden',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '电压过低',
        name: ['role', 'two', 'range', '0'],
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '电压过高',
        name: ['role', 'two', 'range', '1'],
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '持续',
        name: ['role', 'two', 'duration'],
      },
    },

    {
      noRule: true,
      formType: 'Checkbox',
      checkboxData: checkboxData,
      opType: 'item',
      itemProps: {
        label: '是否发送短信',
        name: ['role', 'two', 'send'],
        valuePropName: 'checked',
      },
    },
    // {
    //   formType: 'CheckboxItem',
    //   itemProps: {
    //     label: '是否发送短信',
    //     name: 'send',
    //     valuePropName: "checked"
    //   },
    // },

    {
      formType: 'rowText',
      itemProps: {
        label: '负载',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '字段',
        name: ['role', 'three', 'fields'],
        className: 'hidden',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '阈值',
        name: ['role', 'three', 'threshold'],
        extra: '范围 0 ~ 1',
      },
      comProps: {
        min: 0,
        max: 1,
        step: 0.01,
        precision: 2,
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '持续时间',
        name: ['role', 'three', 'duration'],
      },
    },
    {
      noRule: true,
      formType: 'Checkbox',
      checkboxData: checkboxData,
      opType: 'item',
      itemProps: {
        label: '是否发送短信',
        name: ['role', 'three', 'send'],
        valuePropName: 'checked',
      },
    },
  ];
  //

  // const formList = (
  //   <Form.List name="spect_out" key={'spectIn'}>
  //     {(fields, { add, remove }) => {
  //       console.log(' dataInit  fieldsfields ： ', fields);
  //       return (
  //         <>
  //           {fields.map(field => {
  //             const formItem = ruleConfig.map(v => ({...v, comProps: v.comProps ?? {},})).map((v, i) => (
  //               <Form.Item
  //                 {...field}
  //                 {...v.itemProps}
  //                 colon={false}
  //                 name={[field.name, ...v.itemProps.name]}
  //                 fieldKey={[field.fieldKey, v.itemProps.name]}
  //                 className={'formItems '}
  //                 {...layoutObj}
  //               >
  //                 <InputNumber className={'w-320'} {...v.comProps}  />
  //               </Form.Item>
  //             ));
  //             return formItem
  //             return (
  //               <Form.Item
  //                 colon={false}
  //                 key={index + field.key}
  //                 className={'formItems labelItem'}
  //                 {...v.comProps}
  //               ></Form.Item>
  //             );
  //           })}
  //         </>
  //       );
  //     }}
  //   </Form.List>
  // );

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息',
      },
    },
    {
      // noRule: true,
      itemProps: {
        label: '名称',
        name: 'name',
      },
    },
    // {
    //   formType: 'Select',
    //   selectData: notifyTypeConfig,
    //   itemProps: {
    //     label: '通知方式',
    //     name: 'notification_type',
    //   },
    // },
    {
      formType: 'Select',
      selectData: notifyTypeConfig,
      // formType: 'Checkbox',
      // checkboxData: notifyTypeConfig,
      itemProps: {
        label: '通知方式',
        name: 'notification_type',
      },
      comProps: {
        mode: 'multiple',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '备注',
        name: 'comments',
      },
    },
    ...ruleConfig,

    // {
    //   formType: 'CustomCom',
    //   CustomCom: (
    //     formList
    //   ),
    //   itemProps: {
    //     label: '',
    //     className: 'w100',
    //     ...fullFormLayouts,
    //   },
    // },

    // {
    //   itemProps: {
    //     label: '字段',
    //     name: ['role', 'fields'],
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '区间',
    //     name: ['role', 'range'],
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '持续时间',
    //     name: ['role', 'duration'],
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '阈值',
    //     name: ['role', 'threshold'],
    //   },
    // },

    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '电气告警条件',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '设备状态',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '持续',
    //     name: '',
    //   },
    // },
    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '能耗阈值',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '能耗过低',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '能耗过高',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '持续',
    //     name: '',
    //   },
    // },

    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '湿度阈值',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '湿度过低',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '湿度过高',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '持续',
    //     name: '',
    //   },
    // },
    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '温度阈值',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '温度过低',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '温度过高',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '持续',
    //     name: '',
    //   },
    // },
  ];

  return (
    <div className={'alarmTemplateForm '}>
      <SmartForm
        config={config}
        {...props}
        init={{
          ...defRule,
          comments: null,
          ...props.init,
          // spect_out: [
          //   {}
          // ],
        }}
      ></SmartForm>
    </div>
  );
};

AlarmTemplateForm.defaultProps = {};

export default AlarmTemplateForm;
