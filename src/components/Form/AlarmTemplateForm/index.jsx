import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import { notifyTypeConfig } from '@/configs';

const AlarmTemplateForm = props => {
  console.log(' AlarmTemplateForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '基本信息',
    //   },
    // },
    {
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
      formType: 'Checkbox',
      itemProps: {
        label: '通知方式',
        name: 'notification_type',
      },
      checkboxData: notifyTypeConfig,
    },
    {
      itemProps: {
        label: '备注',
        name: 'comments',
      },
    },

    {
      itemProps: {
        label: '字段',
        name: ['role', 'fields'],
      },
    },
    {
      itemProps: {
        label: '区间',
        name: ['role', 'range'],
      },
    },
    {
      itemProps: {
        label: '持续时间',
        name: ['role', 'duration'],
      },
    },
    {
      itemProps: {
        label: '阈值',
        name: ['role', 'threshold'],
      },
    },

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
    //     label: '电流阈值',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '电流过低',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '电流过高',
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
    //     label: '电压阈值',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '电压过低',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '电压过高',
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
    <div className={' AlarmTemplateForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

AlarmTemplateForm.defaultProps = {};

export default AlarmTemplateForm;
